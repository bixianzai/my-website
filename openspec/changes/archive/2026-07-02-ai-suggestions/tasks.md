## 1. 后端 API

- [x] 1.1 新增 `server/routes/suggestions.py`，实现 `POST /api/suggestions` 端点
- [x] 1.2 构造结构化 system prompt + 用户画像 prompt，调用 DeepSeek API
- [x] 1.3 解析 AI 返回的 JSON（正则清理 markdown 代码块），逐字段校验
- [x] 1.4 AI 调用失败时优雅降级，返回 `{suggestions:[], fallback:true}`
- [x] 1.5 在 `server/main.py` 注册 suggestions router

## 2. 前端建议面板

- [x] 2.1 改造 `SuggestionPanel.tsx`：从 props 接收建议改为调用 API
- [x] 2.2 添加加载骨架屏和空状态（未登录提示 / 降级提示）
- [x] 2.3 添加"刷新建议"按钮，30 秒冷却 + 加载动画
- [x] 2.4 每条建议卡片添加"聊聊这个 →"链接，跳转 AI 对话页

## 3. 前端集成

- [x] 3.1 更新 `DashboardHome.tsx`：移除 `mockSuggestions` 导入，`SuggestionPanel` 不再传 props
- [x] 3.2 更新 `ChatPage.tsx`：读取 URL `?q=` 参数，自动填入输入框并发送

## 4. 验证

- [x] 4.1 手动测试：登录后打开 Dashboard，建议面板加载 AI 建议
- [x] 4.2 手动测试：点击"刷新建议"，新建议替换旧建议
- [x] 4.3 手动测试：点击"聊聊这个"，跳转 AI 对话并预填消息
- [x] 4.4 手动测试：未登录状态，建议面板显示登录提示
- [x] 4.5 TypeScript 编译 + Vite 构建无报错
