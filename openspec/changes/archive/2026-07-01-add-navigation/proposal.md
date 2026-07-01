## Why

个人品牌站目前缺少站内导航，用户无法快速定位到不同内容区域。添加顶部导航栏可以让访问者一目了然地了解网站结构，并通过平滑滚动快速跳转到首页、项目和联系方式等关键区域。

## What Changes

- 新增固定在页面顶部的导航栏组件（`NavBar`），在页面滚动时始终保持可见
- 导航栏左侧展示个人品牌名称/logo
- 导航栏右侧包含三个链接：首页、项目、联系我
- 点击导航链接时平滑滚动到页面中对应的 section
- 导航栏在页面滚动时添加背景模糊（backdrop-blur）效果，提升视觉层次感
- 为 项目 和 联系我 创建对应的占位 section，作为导航链接的滚动目标

## Capabilities

### New Capabilities
- `navigation-bar`: 固定在页面顶部的导航栏，包含品牌标识（左侧）和站内导航链接（右侧），支持平滑滚动到对应 section，滚动时显示背景模糊效果
- `page-sections`: 页面中各内容区域（section）的锚点标识，作为导航栏链接的平滑滚动目标

### Modified Capabilities
<!-- None - existing specs (hero-section) are unchanged -->

## Impact

- `src/components/NavBar.tsx` — 新增导航栏组件
- `src/App.tsx` — 添加 NavBar 组件，为现有 section 添加 id 属性，新增 projects 和 contact 占位 section
- `src/index.css` 或组件级样式 — 导航栏样式和滚动行为（`scroll-behavior: smooth`）
