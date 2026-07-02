## Context

当前系统已有 DeepSeek AI 对话（`routes/chat.py`），使用用户画像（等级、连续天数、累计时长）生成个性化回复。AI 学习建议面板（`SuggestionPanel`）目前渲染 5 条静态 mock 数据，与 AI 能力完全割裂。需要新增一个 API 端点复用 DeepSeek，输出结构化 JSON 而非流式文本。

## Goals / Non-Goals

**Goals:**
- 新增 `POST /api/suggestions`，调用 DeepSeek 生成结构化建议
- 前端 `SuggestionPanel` 对接 API，移除 mock 数据依赖
- 建议卡片增加刷新按钮和跳转 AI 对话入口
- AI 调用失败时优雅降级（返回空数组，不报错）

**Non-Goals:**
- 不修改现有聊天端点
- 不新增数据库模型
- 不做建议历史/缓存（每次请求实时生成）
- 不做前端刷新频率限制（30s 前端倒计时足够简单）

## Decisions

### Decision 1: 独立端点 vs 复用 /chat
**选择：独立端点 `POST /api/suggestions`**

理由：
- `/chat` 是流式 SSE，建议面板需要一次性 JSON 响应
- 不同的 system prompt 设计（建议面板要结构化 JSON，聊天要自然语言）
- 职责分离，后续可独立优化（如缓存、A/B 测试）

### Decision 2: JSON 解析 + 校验
**选择：在 Python 层 `json.loads()` 解析 AI 响应，逐字段校验**

理由：
- DeepSeek 可能返回不合规 JSON（如多了一个逗号、带了 markdown 代码块标记）
- 需要 `try/except` + regex 清理（去掉 ` ```json ` 包裹）
- 校验后过滤不合规条目，不整体失败

替代方案：Pydantic 模型校验。未采用因为 AI 输出不可靠，宽松解析更好。

### Decision 3: Prompt 设计策略
**选择：结构化 system prompt + 紧凑用户画像**

```python
SYSTEM_PROMPT = """你是学习建议生成器。基于用户学习数据，推荐最多5条学习建议。
严格返回JSON数组格式，不要其他文字：
[{"title":"...","type":"course|article|practice","difficulty":"easy|medium|hard","duration":分钟数,"reason":"因为你..."}]
type根据内容选择: 视频/在线课程用course, 文字阅读用article, 动手练习用practice。
difficulty根据建议难度: 基础内容easy, 进阶内容medium, 挑战内容hard。
duration是预计完成分钟数(10-180)。
reason是一句话个性化理由，以"因为你"开头。"""
```

### Decision 4: 前端路由：建议 → 聊天
**选择：通过 URL query parameter 传递预填消息**

`<Link to="/dashboard/chat?q=聊聊这个建议：React 19 Server Components">`

`ChatPage` 读取 `useSearchParams()` 获取 `q` 参数，自动填入输入框。

## Risks / Trade-offs

| 风险 | 缓解 |
|------|------|
| DeepSeek 返回格式不合法 | 正则提取 JSON + 逐条字段校验 + 空数组降级 |
| API 响应慢（3-5s） | 前端骨架屏 + 30s 刷新冷却避免用户频繁点击 |
| Token 消耗（每次 ~500 tokens） | 前端 30s 冷却限制，按日活 10 人估算日耗 ~5000 tokens |
| AI 建议内容质量不稳定 | 非关键路径，降级为空不影响页面其他模块 |
