export interface GoalTemplate {
  id: string
  title: string
  category: string
}

export const GOAL_TEMPLATES: GoalTemplate[] = [
  { id: 'tpl-operations', title: '完成 10 道有理数运算练习', category: '基础计算' },
  { id: 'tpl-equation', title: '解 5 道一元一次方程', category: '方程训练' },
  { id: 'tpl-geometry', title: '练习线段与角的计算 3 道', category: '几何初步' },
  { id: 'tpl-review', title: '整理本周错题并重做', category: '知识巩固' },
  { id: 'tpl-word-problems', title: '完成 2 道方程应用题', category: '综合应用' },
  { id: 'tpl-challenge', title: '挑战 1 道压轴题并总结思路', category: '拔高挑战' },
]
