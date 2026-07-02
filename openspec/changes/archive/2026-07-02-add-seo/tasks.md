## 1. HTML 元数据

- [x] 1.1 更新 `<title>` 为个人品牌名称"Alex Chen"
- [x] 1.2 添加 `<meta name="description">` 标签（约 150 字网站简介）
- [x] 1.3 修正 `<html lang="en">` → `zh-CN`

## 2. robots.txt

- [x] 2.1 创建 `public/robots.txt`，配置 `Allow: /` 全站允许规则

## 3. 语义化 HTML 审查

- [x] 3.1 审查 heading 层级：确保页面只有一个 `<h1>`，层级不跳跃
- [x] 3.2 审查图片 `alt` 属性：所有 `<img>` 有有意义的 alt 描述
- [x] 3.3 审查 landmark 标签：`<nav>`、`<section>`、`<article>` 使用正确

## 4. 验证

- [x] 4.1 `tsc -b` 类型检查通过，`vite build` 构建成功
- [x] 4.2 构建产物 `dist/index.html` 包含正确的 title、description、lang
- [x] 4.3 构建产物 `dist/robots.txt` 内容正确
