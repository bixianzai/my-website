## Purpose

SEO optimization for the personal brand website — page title, meta description, language declaration, robots.txt, and semantic HTML.

## Requirements

### Requirement: 页面标题

系统 SHALL 在 HTML `<title>` 中设置个人品牌名称为页面标题。

#### Scenario: 标题展示
- **WHEN** 搜索引擎或浏览器访问网站
- **THEN** `<title>` 标签内容为个人品牌名称（非默认占位文本）

### Requirement: 页面描述

系统 SHALL 在 HTML `<head>` 中设置 `<meta name="description">` 标签。

#### Scenario: 描述展示
- **WHEN** 搜索引擎爬虫访问网站
- **THEN** 页面包含 meta description 标签，内容为网站简介（约 150 字以内）

### Requirement: 语言声明

系统 SHALL 在 `<html>` 标签上声明正确的页面语言。

#### Scenario: 语言标记
- **WHEN** 浏览器或屏幕阅读器解析页面
- **THEN** `<html lang>` 属性为 `zh-CN`

### Requirement: 爬虫访问策略

系统 SHALL 在网站根路径提供 `robots.txt` 文件，允许 Google 爬虫索引。

#### Scenario: 爬虫允许
- **WHEN** 搜索引擎爬虫请求 `/robots.txt`
- **THEN** 返回全站允许规则，不屏蔽任何爬虫

### Requirement: 语义化 HTML 标记

系统 SHALL 使用正确的 HTML5 语义标签标记页面结构。

#### Scenario: Landmark 标签
- **WHEN** 页面渲染
- **THEN** 导航栏使用 `<nav>` 标签
- **THEN** 主要内容区域使用 `<section>` 或 `<main>` 标签
- **THEN** 所有图片使用 `alt` 属性
