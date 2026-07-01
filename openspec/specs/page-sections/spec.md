# Page Sections

## Purpose

定义页面中各内容区域的锚点标识，作为导航栏链接的平滑滚动目标。

## Requirements

### Requirement: 页面内容区域锚点

系统 SHALL 为首页、项目和联系我三个内容区域提供对应的 section 锚点，作为导航栏链接的滚动目标。

#### Scenario: 首页区域
- **WHEN** 用户访问网站
- **THEN** 页面顶部存在 id 为 "home" 的内容区域（Hero section）
- **THEN** 点击"首页"导航链接后页面滚动到该区域

#### Scenario: 项目区域
- **WHEN** 用户访问网站
- **THEN** 页面中存在 id 为 "projects" 的内容区域
- **THEN** 点击"项目"导航链接后页面滚动到该区域

#### Scenario: 联系我区域
- **WHEN** 用户访问网站
- **THEN** 页面中存在 id 为 "contact" 的内容区域
- **THEN** 点击"联系我"导航链接后页面滚动到该区域
