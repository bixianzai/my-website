## Context

项目使用 React + TypeScript + Vite + Tailwind CSS，已配置明亮/暗黑模式（CSS 变量 + `prefers-color-scheme: dark`）。当前 App.tsx 为空壳，需要从 Hero Section 开始构建页面内容。

## Goals / Non-Goals

**Goals:**
- 实现全屏高度（100svh）的 Hero 区域
- 居中展示姓名、职业、一句话介绍
- CSS 渐变作为背景底层，Canvas 绘制粒子叠加层
- 渐变色彩和粒子颜色跟随系统亮暗模式自动切换

**Non-Goals:**
- 不做任何动画效果（粒子静止，无入场动画）
- 不做导航栏
- 不做后端 API 调用
- 不做响应式以外的布局变体

## Decisions

### 1. 组件拆分：Hero + HeroParticles

Hero 组件负责布局与文字内容，HeroParticles 组件封装 Canvas 粒子绘制逻辑。拆分理由：
- Canvas 绘制逻辑独立，便于后续按需替换粒子效果
- Hero 组件保持简洁，只关心布局

### 2. Canvas 粒子实现方式

使用 `useRef` 持有 Canvas 引用，`useEffect` 中初始化粒子数组并绘制。粒子随机分布、无动画（符合 out-of-scope 约束）。窗口 resize 时重新计算粒子位置。

替代方案考虑：CSS `background-image` 多个 radial-gradient 模拟粒子 — 但灵活性差，难以精确控制粒子密度，选用 Canvas。

### 3. 暗色模式检测

使用 CSS `prefers-color-scheme` 媒体查询 + `window.matchMedia('(prefers-color-scheme: dark)')` 在 JS 中监听，Canvas 根据当前模式切换粒子颜色和渐变底色。与项目现有的 CSS 变量方案保持一致。

替代方案考虑：Tailwind `dark:` 类名切换 — 但 Canvas 绘制在 JS 中，无法直接使用 CSS 类，需通过 JS API 获取当前模式。

### 4. 渐变背景

使用 Tailwind 的渐变 utility（`bg-gradient-to-b`），配合 `dark:` 前缀实现模式切换。暗色模式下使用深紫-黑色调，亮色模式下使用浅紫-白色调。

## Risks / Trade-offs

- **Canvas 与 SSR 兼容性**: 当前项目为 CSR（Vite SPA），无 SSR 风险
- **粒子密度适配**: 固定粒子数在不同屏幕尺寸下视觉效果不一致 → 根据 `window.innerWidth` 动态计算粒子数量
- **性能**: 粒子数量过多可能影响低端设备 → 上限控制在 100 个粒子以内
