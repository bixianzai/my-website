## 1. 准备资源

- [x] 1.1 创建个人照片占位图 `src/assets/avatar-placeholder.svg`

## 2. AboutSection 组件

- [x] 2.1 创建 `src/components/AboutSection.tsx`，左右两栏布局（桌面端并排，移动端堆叠）
- [x] 2.2 左侧展示个人照片（`rounded-2xl` 圆角，约 280px 宽）
- [x] 2.3 右侧展示 3 段个人简介文字
- [x] 2.4 简介文字下方展示品牌标签"麻豆传媒"（pill/badge 样式）
- [x] 2.5 适配明暗模式

## 3. 页面整合

- [x] 3.1 在 `App.tsx` 中插入 `<AboutSection />`（放在 ProjectSection 之后、Contact 之前）

## 4. 验证

- [x] 4.1 `tsc -b` 类型检查通过，`vite build` 构建成功
- [x] 4.2 桌面端照片在左、文字在右，并排展示
- [x] 4.3 移动端照片在上、文字在下，堆叠展示
- [x] 4.4 品牌标签"麻豆传媒"显示在文字下方
- [x] 4.5 明暗模式下配色正常
