## Why

当前网站缺少基础的 SEO 配置：title 为默认占位文本、无 meta description、无 robots.txt。搜索引擎无法正确索引和展示网站内容。同时页面语言标记不匹配实际内容（`lang="en"` vs 中文内容）。添加 SEO 基础优化可以让 Google 等搜索引擎正确抓取和展示网站。

## What Changes

- 更新 `index.html` 的 `<title>` 为个人品牌名称
- 添加 `<meta name="description">` 标签
- 修正 `<html lang>` 为 `zh-CN`
- 创建 `public/robots.txt`，允许所有爬虫索引
- 审查并优化现有组件的语义化 HTML（heading 层级、landmark、alt 属性等）

## Capabilities

### New Capabilities
- `seo-optimization`: 基础 SEO 配置，包括页面元数据（title/description/lang）、robots.txt 爬虫策略、语义化 HTML 标记

### Modified Capabilities
<!-- None — SEO 是横切关注点，不改变已有 spec 的行为需求 -->

## Impact

- `index.html` — 更新 title、添加 meta description、修正 lang
- `public/robots.txt` — 新建爬虫策略文件
- `src/components/Hero.tsx` — 审查 heading 层级
- `src/components/ProjectSection.tsx` — 审查语义标记
- 其他组件 — 语义化审查（`<article>`、`<nav>`、`<section>`、`alt` 等）
