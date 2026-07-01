## Why

个人品牌站目前缺少项目展示区域，访客无法了解我的实际作品和技术能力。Hero Section 也没有明确的行动引导（CTA）。添加项目展示区并提供 CTA 按钮可以引导用户从首屏向下浏览，展示真实项目成果。

## What Changes

- 新增项目展示区（`ProjectSection`），位于 Hero 下方，以卡片式布局展示至少 4 个项目
- 每个项目卡片包含：项目截图、项目名称、项目简介（见解）、GitHub 链接
- 卡片在鼠标悬浮时有微缩放 + 阴影提升的视觉效果
- 在 Hero Section 中新增 CTA 按钮，点击后平滑滚动到项目展示区
- 替换原有的 `#projects` 占位 section 为真实的项目卡片内容

## Capabilities

### New Capabilities
- `project-section`: 卡片式项目展示区，包含至少 4 个项目卡片（截图、名称、简介、GitHub 链接），鼠标悬浮微特效

### Modified Capabilities
- `hero-section`: 新增 CTA 按钮，锚点指向 `#projects` 区域，引导用户滚动到项目展示区

## Impact

- `src/components/ProjectSection.tsx` — 新增项目展示区组件
- `src/components/Hero.tsx` — 添加 CTA 按钮
- `src/App.tsx` — 替换 `#projects` 占位内容为 `<ProjectSection />`
- 可能需要添加项目截图资源到 `src/assets/`
