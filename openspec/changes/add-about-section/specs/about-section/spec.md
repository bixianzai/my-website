## ADDED Requirements

### Requirement: 个人照片展示

系统 SHALL 在关于我区域的左侧展示一张个人照片。

#### Scenario: 照片展示
- **WHEN** 用户滚动到关于我区域
- **THEN** 左侧显示一张个人照片
- **THEN** 照片使用圆角矩形样式

#### Scenario: 移动端布局
- **WHEN** 用户在移动端访问
- **THEN** 照片在文字上方居中显示

### Requirement: 个人简介文字

系统 SHALL 在关于我区域的右侧展示 3 段个人简介文字。

#### Scenario: 简介展示
- **WHEN** 用户滚动到关于我区域
- **THEN** 右侧展示 3 段个人简介文字

#### Scenario: 桌面端并排布局
- **WHEN** 用户在桌面端访问
- **THEN** 照片在左，简介文字在右，并排展示

### Requirement: 品牌标签

系统 SHALL 在简介文字下方展示品牌标签"麻豆传媒"。

#### Scenario: 标签展示
- **WHEN** 关于我区域渲染
- **THEN** 文字区域下方显示品牌标签"麻豆传媒"
- **THEN** 标签使用 pill/badge 样式
