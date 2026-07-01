## Context

当前 Hero Section 仅展示姓名、职业和介绍文字，缺少明确的行动引导（Call to Action）。同时项目展示区（`#projects`）目前为占位内容。本次变更将：
1. 在 Hero 中添加 CTA 按钮，引导用户滚动到项目区
2. 用真实的卡片式项目展示替换占位内容

技术栈：React 19 + TypeScript + Tailwind CSS v4，单页无路由，所有内容垂直排列。项目数据为静态内容（个人作品集），无需后端 API。

## Goals / Non-Goals

**Goals:**
- Hero Section 新增 CTA 按钮，点击后平滑滚动到 `#projects`
- 项目展示区使用响应式卡片布局（桌面 2-3 列，移动端 1 列）
- 每张卡片展示：项目截图、名称、简介、GitHub 链接
- 至少 4 张项目卡片
- 鼠标悬浮时卡片微缩放（1.02-1.04x）+ 阴影提升
- 适配明暗模式

**Non-Goals:**
- 不做项目详情页
- 不做项目搜索
- 不引入外部 CMS 或数据源
- 不做卡片进入视口的滚动动画
- 不修改 Hero 现有的渐变背景和粒子效果

## Decisions

### 1. 卡片布局：CSS Grid + Tailwind

**选择**：使用 CSS Grid（`grid-cols-1 md:grid-cols-2 lg:grid-cols-3`）实现响应式卡片布局。

**替代方案**：Flexbox wrap、Masonry 布局。

**理由**：Grid 天然支持等宽卡片对齐，响应式断点清晰。Tailwind v4 原生支持 grid 工具类。不引入额外布局库。3 列布局在桌面端可容纳 4-6 张卡片而不显拥挤。

### 2. 项目数据：静态 TypeScript 数组

**选择**：在 `ProjectSection.tsx` 中定义静态数据数组，每项包含 `image`、`title`、`description`、`githubUrl`。

**理由**：个人品牌站项目数量有限，无需数据库或 CMS。数据与组件同文件便于维护，后续可提取到独立 data 文件。零运行时开销。

### 3. 项目截图：本地 `src/assets/` 管理

**选择**：将项目截图放在 `src/assets/projects/` 目录下，通过 Vite 的 `import` 引用获得 hash 文件名。

**理由**：Vite 自动处理图片资源的打包和缓存。无外部图片依赖，构建稳定。图片建议尺寸 640×360（16:9），使用 WebP 格式控制体积。

### 4. Hover 特效：CSS `transform: scale` + `box-shadow` 过渡

**选择**：使用 Tailwind 的 `hover:scale-[1.03]` + `hover:shadow-lg` + `transition-all duration-300`。

**替代方案**：`translateY(-4px)` 上浮效果、border glow、Canvas 粒子等。

**理由**：微缩放 + 阴影是最经典且低成本的卡片 hover 效果，性能好，不需要 JS。`scale(1.03)` 微妙而不突兀。

### 5. CTA 按钮：原生锚点 `<a href="#projects">`

**选择**：在 Hero 中添加 `<a href="#projects">` 按钮，样式与现有 `scroll-behavior: smooth` 配合实现平滑滚动。

**理由**：与导航栏相同的锚点机制，零 JS。按钮样式使用 Tailwind 工具类，与现有 Hero 文字风格协调。

### 6. 组件架构：独立 `ProjectSection.tsx` + 内联数据

**选择**：`src/components/ProjectSection.tsx` 包含组件逻辑和项目数据。未来数据增多时可提取到 `src/data/projects.ts`。

**理由**：单一职责，项目展示逻辑自包含。数据量与组件同级便于快速迭代。

## Risks / Trade-offs

- **[项目图片缺失] →** 首批使用占位图或纯色占位背景。后续替换为真实截图时仅需更新 import 路径。
- **[4 张卡片在移动端过长] →** 单列布局下 4 张卡片需滚动。使用合理的垂直间距（`gap-8`），移动端体验可接受。
- **[CTA 按钮打破 Hero 极简设计] →** 按钮样式保持低调（outline/ghost 风格），与 Hero 文字协调。使用半透明边框按钮而非实心色块。
- **[GitHub 链接外跳打断浏览] →** 默认使用 `target="_blank" rel="noopener noreferrer"` 在新标签页打开。
