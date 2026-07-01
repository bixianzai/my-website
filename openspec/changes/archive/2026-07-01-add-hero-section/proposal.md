## Why

个人品牌站缺少一个醒目的首屏区域来第一时间传达"我是谁"和"我做什么"。Hero Section 是访客到达后的第一视觉锚点，需要简洁有力地展示姓名、职业和一句话介绍，建立品牌认知。

## What Changes

- 新增全屏高度的 Hero Section 组件，居中展示姓名、职业、一句话介绍
- CSS 渐变背景 + Canvas 粒子叠加层作为视觉背景
- 支持明亮/暗黑模式自动切换（跟随系统 prefers-color-scheme）
- 在 App.tsx 中引入 Hero 组件作为页面首屏

## Capabilities

### New Capabilities

- `hero-section`: 全屏 Hero 区域，包含居中文字展示与 Canvas 粒子背景，响应明亮/暗黑模式

### Modified Capabilities

<!-- No existing specs to modify -->

## Impact

- **新增文件**: `src/components/Hero.tsx`（Hero 组件）、`src/components/HeroParticles.tsx`（Canvas 粒子层）
- **修改文件**: `src/App.tsx`（引入 Hero 组件）、`src/index.css`（可能需要新增 Hero 相关 CSS 变量）
- **依赖**: 无新增外部依赖，使用原生 Canvas API + Tailwind CSS
