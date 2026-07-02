## Purpose

Project showcase section with card-based layout displaying project screenshots, descriptions, and GitHub links.

## Requirements

### Requirement: 项目卡片展示

系统 SHALL 在项目展示区以卡片式布局展示至少 4 个项目。

#### Scenario: 项目卡片内容
- **WHEN** 用户滚动到项目展示区
- **THEN** 每个项目卡片显示项目截图、项目名称、项目简介和 GitHub 链接

#### Scenario: 卡片数量
- **WHEN** 项目展示区渲染
- **THEN** 至少展示 4 张项目卡片

#### Scenario: 响应式布局
- **WHEN** 用户在桌面端访问
- **THEN** 卡片以多列网格布局展示
- **WHEN** 用户在移动端访问
- **THEN** 卡片以单列布局展示

### Requirement: 卡片悬浮特效

系统 SHALL 在鼠标悬浮于项目卡片上时展示微缩放和阴影提升效果。

#### Scenario: 鼠标悬浮
- **WHEN** 用户将鼠标移到项目卡片上
- **THEN** 该卡片轻微放大（scale 1.03 左右）
- **THEN** 该卡片阴影增强

#### Scenario: 鼠标离开
- **WHEN** 用户将鼠标移出项目卡片
- **THEN** 卡片恢复原始大小和阴影

### Requirement: GitHub 链接

系统 SHALL 为每张项目卡片提供可点击的 GitHub 链接。

#### Scenario: 点击 GitHub 链接
- **WHEN** 用户点击项目卡片中的 GitHub 链接
- **THEN** 在新标签页中打开对应的 GitHub 仓库页面
