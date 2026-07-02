## Context

当前项目是 React SPA，入口 HTML 为 `index.html`（Vite 模板默认产物）。当前 SEO 状态：
- `<title>`: "my-website"（默认占位）
- `<meta name="description">`: 缺失
- `<html lang>`: "en"（实际内容为中文）
- `robots.txt`: 缺失
- 语义化 HTML: 已有 NavBar 使用 `<nav>`，ProjectSection 使用 `<article>`，但 Hero 使用 `<section>` 而非 `<header>` landmark

改善这些基础 SEO 信号无需引入额外依赖，全部为零成本修改。

## Goals / Non-Goals

**Goals:**
- 设置有意义的页面 title（个人品牌名称）
- 添加 meta description（约 150 字内）
- 修正 lang 属性为 `zh-CN`
- 创建 robots.txt 允许 Googlebot 全站爬取
- 审查语义化 HTML：heading 层级不跳跃、landmark 正确、图片有 alt

**Non-Goals:**
- 不做 Open Graph / Twitter Card 社交 meta（超出本次范围）
- 不做 sitemap.xml
- 不做 JSON-LD 结构化数据
- 不做 SSR/SSG 改造
- 不引入 react-helmet 等 SEO 库

## Decisions

### 1. Title & Description：静态 HTML 硬编码

**选择**：直接在 `index.html` 中设置 `<title>` 和 `<meta description>`，不做动态切换。

**理由**：单页应用无路由，所有页面共用同一 title/description。Vite 模板默认支持 HTML 静态编辑。无需 `react-helmet-async` 等额外依赖。

### 2. robots.txt：`public/` 目录托管

**选择**：在 `public/robots.txt` 放置全允许规则 `Allow: /`，Vite 构建时原样复制到 `dist/` 根目录。

**理由**：`robots.txt` 必须位于域名根路径。Vite 的 `public/` 目录在构建时会被直接复制到输出根目录，符合 SEO 最佳实践。

### 3. 语义化审查：最小改动原则

**选择**：审视现有组件，仅修复明确的语义问题（如 Hero 的 `<section>` 是否应为 `<header>`、heading 层级是否跳跃）。不做大规模重构。

**理由**：语义化是渐进改善，不是一次性推翻。已有 `<nav>`（NavBar）、`<article>`（ProjectSection 卡片）已符合最佳实践。Hero 使用 `<section>` 在 h1 无外包裹时是合理的。

### 4. lang 属性：`zh-CN`

**选择**：`<html lang="zh-CN">`。

**理由**：网站 100% 中文内容。搜索引擎和屏幕阅读器依赖 lang 进行语言适配。
