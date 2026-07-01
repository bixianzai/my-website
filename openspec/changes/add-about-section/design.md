## Context

当前页面已包含 Hero、项目展示、联系我占位等区域。缺少"关于我"部分来介绍个人背景。本次变更新增一个左右两栏布局的关于我区域，展示照片、简介文字和品牌标签。

技术栈不变：React 19 + TypeScript + Tailwind CSS v4，单页无路由。

## Goals / Non-Goals

**Goals:**
- 左侧展示个人照片（圆形或圆角），右侧展示 3 段简介文字
- 使用 CSS Flexbox / Grid 两栏响应式布局
- 底部展示品牌标签"麻豆传媒"
- 适配明暗模式

**Non-Goals:**
- 不做联系我表单
- 不做照片轮播或多张切换
- 不做动画入场效果

## Decisions

### 1. 布局：CSS Flexbox 两栏

**选择**：使用 `flex-col md:flex-row` 实现响应式两栏。桌面端左右并排，移动端上下堆叠（照片在上）。

**替代方案**：CSS Grid `grid-cols-2`。

**理由**：两栏布局天然适合 Flexbox。照片固定宽度（约 280px），文字区域自适应填充。移动端堆叠时照片居中显示更自然。

### 2. 照片：本地 `src/assets/` 管理

**选择**：照片放在 `src/assets/` 下，通过 Vite import 引用。默认使用占位图，后续替换为真实照片。

**理由**：与项目截图的资源管理方式一致。照片使用 `rounded-2xl` 圆角（非圆形），与项目卡片风格统一。

### 3. 品牌标签：独立显示在底部

**选择**：在文字区域下方添加品牌标签。使用带边框的 pill/badge 样式，紫色主题与其他 CTA 元素一致。

**理由**：品牌标签是视觉点缀，pill badge 是展示品牌/标签的通用模式，轻量且突出。

### 4. 组件架构：独立 `AboutSection.tsx`

**选择**：`src/components/AboutSection.tsx`，自包含组件。文字内容硬编码（无 CMS）。

**理由**：单一职责，与其他 section 组件（Hero、ProjectSection）模式一致。后续可提取文字到数据文件。

## Risks / Trade-offs

- **[照片缺失] →** 首批使用 SVG 占位图，标记清楚为占位，后续替换仅需更新 import。
- **[3 段文字在移动端过长] →** 保持段落简短（每段 2-3 句），使用合理行距（`leading-relaxed`）。
