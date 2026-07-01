## Context

当前项目是基于 React 19 + TypeScript + Vite 8 的单页应用，使用 Tailwind CSS v4 作为样式框架。应用没有路由系统，所有内容在 `App.tsx` 中按 section 垂直排列。目前缺少站内导航，用户到达页面后无法快速了解网站结构或跳转到特定区域。

设计范围：新增一个固定在页面顶部的导航栏组件，通过原生锚点链接实现 section 间的平滑滚动。

## Goals / Non-Goals

**Goals:**
- 导航栏固定在视口顶部，不随页面滚动而消失
- 左侧展示个人品牌名称（文字，作为 logo 的替代）
- 右侧三个导航链接：首页、项目、联系我
- 点击链接平滑滚动到页面中对应的 section
- 页面滚动时导航栏背景添加模糊效果（backdrop-blur），增强层次感
- 适配明亮/暗黑模式

**Non-Goals:**
- 不做搜索功能
- 不做多级下拉菜单
- 不做用户登录和注册
- 不引入 React Router 或其他路由库
- 不改变现有 Hero section 的行为和样式

## Decisions

### 1. 导航实现方式：原生锚点 + `scroll-behavior: smooth`

**选择**：使用 HTML 原生 `<a href="#section-id">` 锚点链接，配合 CSS `scroll-behavior: smooth` 实现平滑滚动。

**替代方案**：`scrollIntoView({ behavior: 'smooth' })` JS API 或第三方滚动库。

**理由**：原生锚点方式零依赖、无 JS 开销、浏览器兼容性好、对 SEO 友好。`scroll-behavior: smooth` 在 `html` 元素上设置一次即可全局生效。无需引入 `react-router` 或自定义滚动逻辑。

### 2. 导航栏固定方式：CSS `position: fixed` / `sticky`

**选择**：使用 `position: fixed` + `top: 0` + `z-index` 将导航栏固定在视口顶部。

**替代方案**：`position: sticky`。

**理由**：`fixed` 确保导航栏始终可见且不占用文档流空间。`sticky` 依赖父容器边界，在简单单页布局中 `fixed` 更直观可控。

### 3. 背景模糊：Tailwind `backdrop-blur` + 滚动状态检测

**选择**：使用 Tailwind 的 `backdrop-blur-md` 工具类。通过 JS `scroll` 事件监听页面滚动位置，当 `window.scrollY > 0` 时添加模糊和背景色，滚动回顶部时恢复透明。

**替代方案**：纯 CSS `@supports (backdrop-filter: blur())` 或 CSS `animation-timeline: scroll()`。

**理由**：Tailwind v4 原生支持 `backdrop-blur`，结合 `useEffect` + `scroll` 事件可以在滚动时动态切换样式。CSS scroll-driven animation 兼容性尚不成熟（Safari 仅部分支持），暂不采用。

### 4. 组件架构：独立 `NavBar.tsx` 组件

**选择**：在 `src/components/NavBar.tsx` 中创建独立的导航栏组件，在 `App.tsx` 中引入并置于 `<Hero />` 之前。

**理由**：单一职责原则，NavBar 逻辑独立于其他组件。后续可单独测试和维护。

### 5. 样式方案：Tailwind 工具类为主

**选择**：主要使用 Tailwind v4 工具类编写导航栏样式，仅必要时补充少量自定义 CSS。

**理由**：Tailwind v4 的 `fixed`、`flex`、`backdrop-blur`、`transition` 等工具类已能满足需求，保持与项目现有样式方案一致。

## Risks / Trade-offs

- **[固定导航遮挡内容] →** 导航栏高度约 56-64px，Hero 使用 `h-svh`，在小屏幕上导航可能遮挡 Hero 底部少量内容。通过给 body 添加 `scroll-padding-top` 确保锚点滚动后 section 不被遮挡。
- **[backdrop-blur 性能] →** `backdrop-filter: blur()` 在低性能设备上可能影响滚动流畅度。只在 `scrollY > 0` 时启用模糊，且使用 `will-change: transform` 提升合成层性能。
- **[页面尚无 项目/联系我 section] →** 为二者创建占位 section（带 id 属性），内容留空或填最小占位内容，后续变更中再丰富。
