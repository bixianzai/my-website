## ADDED Requirements

### Requirement: 从 API 获取建议

系统 SHALL 从前端 `SuggestionPanel` 组件调用 `POST /api/suggestions` 获取 AI 生成的学习建议，替代静态 mock 数据。

#### Scenario: 已登录用户获取建议
- **WHEN** 已登录用户打开 Dashboard 学习数据页面
- **THEN** `SuggestionPanel` 自动调用 `/api/suggestions` 获取个性化建议
- **THEN** 加载期间显示骨架屏占位
- **THEN** 加载完成后渲染建议卡片列表

#### Scenario: 未登录用户查看建议
- **WHEN** 未登录用户查看建议面板
- **THEN** 面板显示提示："登录后获取 AI 个性化学习建议"
- **THEN** 不发起 API 请求

#### Scenario: API 返回降级数据
- **WHEN** API 返回 `fallback: true` 且建议列表为空
- **THEN** 面板显示："暂时无法生成建议，请稍后刷新"

### Requirement: 刷新建议

系统 SHALL 提供刷新按钮，允许用户手动触发建议重新生成。

#### Scenario: 点击刷新
- **WHEN** 用户点击建议面板的"刷新建议"按钮
- **THEN** 系统重新调用 `/api/suggestions` 获取新一批建议
- **THEN** 按钮在加载期间显示加载动画并禁用

#### Scenario: 刷新频率限制
- **WHEN** 用户在上一次刷新后 30 秒内再次点击刷新
- **THEN** 按钮保持禁用状态，显示倒计时

### Requirement: 跳转 AI 对话

系统 SHALL 在每条建议卡片上提供"聊聊这个"入口，点击后跳转到 AI 对话页面并自动填入相关提示。

#### Scenario: 点击聊聊这个
- **WHEN** 用户点击建议卡片上的"聊聊这个"链接
- **THEN** 页面导航到 `/dashboard/chat`
- **THEN** 聊天输入框预填入包含建议标题的消息文本
