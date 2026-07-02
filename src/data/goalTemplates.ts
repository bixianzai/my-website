export interface GoalTemplate {
  id: string
  title: string
  category: string
}

export const GOAL_TEMPLATES: GoalTemplate[] = [
  { id: 'tpl-read', title: '阅读技术文章 30 分钟', category: '每日习惯' },
  { id: 'tpl-leetcode', title: 'LeetCode 刷题 2 道', category: '编程练习' },
  { id: 'tpl-course', title: '完成在线课程 1 小节', category: '系统学习' },
  { id: 'tpl-notes', title: '整理学习笔记并复习', category: '知识巩固' },
  { id: 'tpl-opensource', title: '阅读开源项目源码 30 分钟', category: '代码阅读' },
  { id: 'tpl-blog', title: '写一篇技术博客或学习总结', category: '输出分享' },
]
