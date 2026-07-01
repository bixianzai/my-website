# Navigation Bar

## Purpose

固定在页面顶部的导航栏组件，提供品牌标识展示和站内导航链接，支持平滑滚动和背景模糊效果。

## Requirements

### Requirement: 导航栏固定定位

系统 SHALL 在页面顶部渲染一个固定定位的导航栏，在页面滚动时始终保持可见。

#### Scenario: 导航栏始终可见
- **WHEN** 用户访问网站
- **THEN** 导航栏固定在视口顶部
- **THEN** 导航栏宽度占满整个视口

#### Scenario: 页面滚动时导航栏保持固定
- **WHEN** 用户向下滚动页面
- **THEN** 导航栏始终保持在视口顶部不消失

### Requirement: 品牌标识展示

系统 SHALL 在导航栏左侧展示个人品牌标识，支持显示文字名称。

#### Scenario: 显示个人名称
- **WHEN** 导航栏渲染
- **THEN** 导航栏左侧显示个人品牌名称文字
- **THEN** 名称文字可点击，点击后滚动回页面顶部

### Requirement: 导航链接

系统 SHALL 在导航栏右侧展示三个站内导航链接：首页、项目、联系我。

#### Scenario: 导航链接展示
- **WHEN** 导航栏渲染
- **THEN** 导航栏右侧依次显示"首页"、"项目"、"联系我"三个链接

#### Scenario: 点击导航链接平滑滚动
- **WHEN** 用户点击导航栏中的任意链接
- **THEN** 页面平滑滚动到对应的 section 区域
- **THEN** 滚动动画为平滑过渡而非瞬间跳转

### Requirement: 滚动背景模糊效果

系统 SHALL 在页面滚动离开顶部后为导航栏添加背景模糊效果。

#### Scenario: 页面在顶部时导航栏透明
- **WHEN** 页面滚动位置处于顶部（scrollY = 0）
- **THEN** 导航栏背景为透明或半透明，无模糊效果

#### Scenario: 页面滚动后导航栏模糊
- **WHEN** 用户向下滚动页面（scrollY > 0）
- **THEN** 导航栏背景添加模糊效果（backdrop-blur）
- **THEN** 导航栏背景色变为半透明以增强可读性

### Requirement: 明暗模式适配

系统 SHALL 根据系统主题自动切换导航栏的配色方案。

#### Scenario: 明亮模式
- **WHEN** 系统处于明亮模式（prefers-color-scheme: light）
- **THEN** 导航栏文字和背景使用明亮模式配色

#### Scenario: 暗黑模式
- **WHEN** 系统处于暗黑模式（prefers-color-scheme: dark）
- **THEN** 导航栏文字和背景使用暗黑模式配色
