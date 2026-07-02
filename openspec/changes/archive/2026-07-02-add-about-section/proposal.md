## Why

个人品牌站缺少"关于我"区域，访客无法了解我的背景和个人故事。添加关于我区域可以建立信任感，让潜在合作伙伴和招聘方更好地了解我。

## What Changes

- 新增"关于我"区域（`AboutSection`），左右两栏布局
- 左侧展示个人照片
- 右侧展示 3 段个人简介文字
- 下方展示品牌标签"麻豆传媒"

## Capabilities

### New Capabilities
- `about-section`: 关于我区域，包含个人照片（左）、3 段简介文字（右）、品牌标签（下）

### Modified Capabilities
<!-- None -->

## Impact

- `src/components/AboutSection.tsx` — 新增关于我组件
- `src/assets/` — 添加个人照片资源
- `src/App.tsx` — 插入 `<AboutSection />` 到合适位置
