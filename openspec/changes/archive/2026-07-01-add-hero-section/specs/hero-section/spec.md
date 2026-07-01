## ADDED Requirements

### Requirement: Hero Section 全屏展示

系统 SHALL 在页面顶部渲染一个全屏高度（100svh）的 Hero 区域，将用户姓名、职业和一句话介绍居中展示。

#### Scenario: 用户访问网站首页
- **WHEN** 用户打开网站
- **THEN** 页面首屏显示全屏高度的 Hero 区域
- **THEN** 姓名、职业和介绍文字在 Hero 区域水平和垂直居中

#### Scenario: 视口高度变化
- **WHEN** 用户调整浏览器窗口高度
- **THEN** Hero 区域高度始终占满视口（100svh）

### Requirement: CSS 渐变背景

系统 SHALL 为 Hero 区域提供 CSS 渐变背景，在明亮模式下使用浅色渐变，暗黑模式下使用深色渐变。

#### Scenario: 明亮模式下的渐变
- **WHEN** 系统处于明亮模式（prefers-color-scheme: light）
- **THEN** Hero 背景显示浅色 CSS 渐变

#### Scenario: 暗黑模式下的渐变
- **WHEN** 系统处于暗黑模式（prefers-color-scheme: dark）
- **THEN** Hero 背景显示深色 CSS 渐变

### Requirement: Canvas 粒子叠加层

系统 SHALL 在渐变背景之上叠加一个 Canvas 粒子层，粒子随机分布在整个 Hero 区域中，且不执行任何动画。

#### Scenario: 粒子渲染
- **WHEN** Hero 组件挂载
- **THEN** Canvas 覆盖整个 Hero 区域
- **THEN** Canvas 中渲染随机分布的静态粒子

#### Scenario: 窗口尺寸变化
- **WHEN** 用户调整浏览器窗口大小
- **THEN** Canvas 尺寸同步更新
- **THEN** 粒子位置重新计算以适应新尺寸

#### Scenario: 暗色模式粒子颜色
- **WHEN** 系统处于暗黑模式
- **THEN** 粒子使用浅色以在深色背景上可见

#### Scenario: 明亮模式粒子颜色
- **WHEN** 系统处于明亮模式
- **THEN** 粒子使用深色或半透明色以在浅色背景上可见

### Requirement: 暗色模式响应

系统 SHALL 监听系统级 `prefers-color-scheme` 变化，当用户切换系统主题时，Canvas 粒子颜色和 CSS 渐变同步切换。

#### Scenario: 运行时主题切换
- **WHEN** 用户在操作系统中从明亮模式切换到暗黑模式（或反之）
- **THEN** Hero 渐变背景立即更新
- **THEN** Canvas 粒子颜色立即更新
