## 1. 准备资源

- [x] 1.1 创建 `src/assets/projects/` 目录，准备 4 张项目占位截图（可先用纯色占位图）

## 2. Hero CTA 按钮

- [x] 2.1 在 `Hero.tsx` 中添加 CTA 按钮，文案"查看项目"，使用 `<a href="#projects">` 锚点
- [x] 2.2 CTA 按钮使用 outline/ghost 风格，与 Hero 设计协调，适配明暗模式

## 3. ProjectSection 组件

- [x] 3.1 创建 `src/components/ProjectSection.tsx`，包含静态项目数据数组（至少 4 个项目）
- [x] 3.2 实现响应式卡片布局（桌面 3 列、平板 2 列、移动端 1 列）
- [x] 3.3 每张卡片包含：项目截图（`<img>`）、项目名称（`<h3>`）、项目简介（`<p>`）、GitHub 链接（`<a>`）
- [x] 3.4 实现鼠标悬浮微特效：`hover:scale-[1.03]` + `hover:shadow-lg` + `transition-all`
- [x] 3.5 GitHub 链接使用 `target="_blank" rel="noopener noreferrer"` 在新标签页打开
- [x] 3.6 适配明暗模式（卡片背景、文字颜色、链接颜色）

## 4. 页面整合

- [x] 4.1 在 `App.tsx` 中替换 `#projects` 占位 section 为 `<ProjectSection />`

## 5. 验证

- [x] 5.1 `tsc -b` 类型检查通过，`vite build` 构建成功
- [x] 5.2 Hero 显示 CTA 按钮，点击后平滑滚动到项目展示区
- [x] 5.3 项目展示区渲染至少 4 张卡片，内容完整
- [x] 5.4 鼠标悬浮时卡片有缩放和阴影变化
- [x] 5.5 移动端（375px）单列布局，桌面端多列布局
- [x] 5.6 明暗模式下配色正常
