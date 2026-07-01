## 1. HeroParticles — Canvas 粒子层

- [x] 1.1 创建 `src/components/HeroParticles.tsx`，接收 `isDark: boolean` prop
- [x] 1.2 使用 `useRef` 持有 Canvas 引用，`useEffect` 中初始化粒子数组（随机位置，数量根据窗口宽度动态计算，上限 100）
- [x] 1.3 监听 `resize` 事件更新 Canvas 尺寸并重新绘制粒子
- [x] 1.4 监听 `prefers-color-scheme` 变化，粒子颜色在亮/暗模式间切换
- [x] 1.5 Canvas 使用绝对定位覆盖父容器，`pointer-events-none`

## 2. Hero 组件 — 布局与文字

- [x] 2.1 创建 `src/components/Hero.tsx`，使用 Tailwind `h-svh` 实现全屏高度
- [x] 2.2 使用 `bg-gradient-to-b` + `dark:` 前缀实现亮/暗模式渐变背景
- [x] 2.3 居中布局（`flex items-center justify-center`），展示姓名（`h1`）、职业（`h2`）、一句话介绍（`p`）
- [x] 2.4 在 Hero 中引入 HeroParticles 作为背景叠加层
- [x] 2.5 检测 `prefers-color-scheme` 并向 HeroParticles 传递 `isDark` 状态

## 3. 集成到 App.tsx

- [x] 3.1 在 `src/App.tsx` 中引入 Hero 组件，放置在页面顶部
- [x] 3.2 验证亮/暗模式切换时渐变背景和粒子颜色同步更新
- [x] 3.3 验证窗口 resize 时粒子自适应
