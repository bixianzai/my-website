## ADDED Requirements

### Requirement: CTA 按钮引导

系统 SHALL 在 Hero Section 中展示一个 CTA 按钮，引导用户滚动到项目展示区。

#### Scenario: CTA 按钮展示
- **WHEN** 用户访问网站首页
- **THEN** Hero Section 的文字下方显示一个 CTA 按钮
- **THEN** 按钮文案为"查看项目"或类似的行动号召文字

#### Scenario: 点击 CTA 按钮
- **WHEN** 用户点击 CTA 按钮
- **THEN** 页面平滑滚动到项目展示区（`#projects`）
