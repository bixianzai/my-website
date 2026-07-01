## 1. 全局样式配置

- [x] 1.1 在 `src/index.css` 中为 `html` 元素添加 `scroll-behavior: smooth` 和 `scroll-padding-top`（留出导航栏高度）

## 2. NavBar 组件

- [x] 2.1 创建 `src/components/NavBar.tsx`，实现固定顶部导航栏（`position: fixed`）
- [x] 2.2 导航栏左侧展示个人品牌名称"Alex Chen"（可点击，滚动回顶部）
- [x] 2.3 导航栏右侧展示三个链接：首页（`#home`）、项目（`#projects`）、联系我（`#contact`）
- [x] 2.4 使用 `useEffect` + `scroll` 事件监听页面滚动，`scrollY > 0` 时添加 `backdrop-blur` 和半透明背景
- [x] 2.5 适配明亮/暗黑模式（使用 Tailwind 的 `dark:` 变体或 CSS 变量）
- [x] 2.6 导航栏使用 Tailwind 工具类编写样式，与项目风格保持一致

## 3. 页面 Section 整合

- [x] 3.1 在 `App.tsx` 中引入 `<NavBar />`，置于 `<Hero />` 之前
- [x] 3.2 为 Hero section 外层包裹添加 `id="home"` 属性
- [x] 3.3 创建 `id="projects"` 的占位 section（包含标题和简要占位内容）
- [x] 3.4 创建 `id="contact"` 的占位 section（包含标题和简要占位内容）

## 4. 验证

- [x] 4.1 验证导航栏固定在页面顶部，滚动时不消失
- [x] 4.2 验证页面滚动后导航栏出现背景模糊效果
- [x] 4.3 验证点击每个导航链接可平滑滚动到对应 section
- [x] 4.4 验证在明亮和暗黑模式下导航栏配色正常
