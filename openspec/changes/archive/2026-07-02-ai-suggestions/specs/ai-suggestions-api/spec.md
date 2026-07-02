## ADDED Requirements

### Requirement: AI 建议生成端点

系统 SHALL 在 `POST /api/suggestions` 端点接收请求，调用 DeepSeek API 生成结构化学习建议。

#### Scenario: 成功生成建议
- **WHEN** 已登录用户请求 `POST /api/suggestions`
- **THEN** 系统调用 DeepSeek API，传入包含用户画像（等级、连续天数、累计时长）、学习目标列表、近 7 天学习时长的 prompt
- **THEN** DeepSeek 返回结构化 JSON 数组，每项包含 `title`、`type`（course/article/practice）、`difficulty`（easy/medium/hard）、`duration`（分钟）、`reason`（个性化推荐理由）
- **THEN** 返回的数组最多包含 5 条建议

#### Scenario: AI 调用失败降级
- **WHEN** DeepSeek API 返回错误或超时
- **THEN** 系统返回 HTTP 200，但 `suggestions` 为空数组，`fallback` 字段为 `true`
- **THEN** 不返回 HTTP 5xx 错误

#### Scenario: 未登录请求
- **WHEN** 未认证用户请求 `POST /api/suggestions`
- **THEN** 系统返回 HTTP 401

### Requirement: 建议数据结构

系统 SHALL 保证 AI 返回的建议遵循约定格式。

#### Scenario: 字段完整性
- **WHEN** DeepSeek 返回建议数据
- **THEN** 每条建议包含必填字段：`title`（建议标题）、`type`（course/article/practice）、`difficulty`（easy/medium/hard）、`duration`（整数，分钟）、`reason`（个性化理由）
- **THEN** 缺失必填字段的建议会被过滤丢弃

#### Scenario: 类型校验
- **WHEN** DeepSeek 返回的 `type` 不在 `course/article/practice` 范围内
- **THEN** 该条建议被过滤丢弃

### Requirement: Prompt 设计

系统 SHALL 使用包含用户上下文的结构化 prompt 调用 DeepSeek。

#### Scenario: Prompt 包含用户画像
- **WHEN** 系统构造 DeepSeek prompt
- **THEN** prompt 包含：用户等级、连续学习天数、累计学习时长、当前目标列表（标题和完成状态）、近 7 天每日学习时长、目标完成率
- **THEN** prompt 要求以 JSON 数组格式返回，每条建议包含指定字段
