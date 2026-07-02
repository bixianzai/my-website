## Why

当前 Dashboard 的 AI 学习建议面板使用 5 条静态 mock 数据，对所有用户显示相同内容。用户已经拥有 DeepSeek AI 对话系统且已在对话中基于用户画像（等级、连续天数、累计时长）提供个性化建议。将两者桥接，让建议面板真正"AI 驱动"，每条建议基于用户真实学习数据生成。

## What Changes

- 新增 `POST /api/suggestions` 端点，调用 DeepSeek API 生成结构化建议
- 前端 `SuggestionPanel` 改为从 API 获取建议，移除 mock 数据依赖
- 建议卡片增加 "刷新建议" 按钮和 "聊聊这个 →" 跳转 AI 对话入口
- 建议包含个性化理由（"因为你最近..."），让用户理解推荐逻辑

## Capabilities

### New Capabilities
- `ai-suggestions-api`: 后端 API，接收用户画像数据，调用 DeepSeek 生成最多 5 条结构化学习建议，返回 JSON 数组
- `ai-suggestions-ui`: 前端面板改造，从 API 获取建议，支持刷新和跳转对话

### Modified Capabilities
<!-- None — this is a new feature, no existing specs change -->

## Impact

| 层面 | 影响 |
|------|------|
| 后端 | 新增 `routes/suggestions.py`，注册到 `main.py` |
| 前端 | 修改 `SuggestionPanel.tsx`、`DashboardHome.tsx`（移除 mock 导入） |
| API | 新增 `POST /api/suggestions` |
| 外部依赖 | 使用现有 DeepSeek API，无新增依赖 |
| 数据 | 无新增模型，无需迁移 |
