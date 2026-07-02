export interface DailyGoal {
  id: string
  title: string
  completed: boolean
}

export interface StatCard {
  id: string
  label: string
  value: number
  unit: string
  trend: 'up' | 'down' | null
  delta: number | null
}

export interface Suggestion {
  id: string
  title: string
  type: 'course' | 'article' | 'practice'
  difficulty: 'easy' | 'medium' | 'hard'
  duration: number
}

export interface TrendPoint {
  date: string
  value: number
}

export interface CalendarDay {
  date: string
  minutes: number
}

export const mockStats: StatCard[] = [
  { id: 'study-time', label: '今日学习时长', value: 3.5, unit: '小时', trend: 'up', delta: 12 },
  { id: 'goals-done', label: '完成目标', value: 3, unit: '个', trend: 'up', delta: 20 },
  { id: 'streak', label: '连续打卡', value: 7, unit: '天', trend: null, delta: null },
  { id: 'suggestions', label: 'AI 建议', value: 5, unit: '条', trend: 'down', delta: 2 },
]

export const mockDailyGoals: DailyGoal[] = [
  { id: 'goal-1', title: '完成 React 官方文档第三章学习', completed: true },
  { id: 'goal-2', title: 'LeetCode 刷题 2 道', completed: true },
  { id: 'goal-3', title: '阅读《深入理解 TypeScript》第 5 章', completed: true },
  { id: 'goal-4', title: '整理本周学习笔记并发布博客', completed: false },
  { id: 'goal-5', title: '完成 Side Project API 接口设计', completed: false },
]

export const mockSuggestions: Suggestion[] = [
  { id: 'sug-1', title: 'React 19 Server Components 深度解析', type: 'course', difficulty: 'hard', duration: 120 },
  { id: 'sug-2', title: 'TypeScript 类型体操：从入门到实战', type: 'practice', difficulty: 'medium', duration: 60 },
  { id: 'sug-3', title: '构建可复用的 React Hooks 模式', type: 'article', difficulty: 'easy', duration: 30 },
  { id: 'sug-4', title: '全栈项目实战：Next.js + Prisma + Postgres', type: 'course', difficulty: 'hard', duration: 180 },
  { id: 'sug-5', title: '前端性能优化：Core Web Vitals 实践指南', type: 'article', difficulty: 'medium', duration: 45 },
]

export const mockWeeklyTrend: TrendPoint[] = [
  { date: '周一', value: 2.5 }, { date: '周二', value: 3.0 }, { date: '周三', value: 4.5 },
  { date: '周四', value: 2.0 }, { date: '周五', value: 5.0 }, { date: '周六', value: 3.5 }, { date: '周日', value: 0 },
]

export const mockMonthlyTrend: TrendPoint[] = [
  { date: '第1周', value: 15 }, { date: '第2周', value: 22 }, { date: '第3周', value: 18 }, { date: '第4周', value: 25 },
]

function generateMockCalendarData(): CalendarDay[] {
  const result: CalendarDay[] = []
  const today = new Date()
  for (let i = 89; i >= 0; i--) {
    const d = new Date(today)
    d.setDate(d.getDate() - i)
    const dateStr = d.toISOString().split('T')[0]
    const dow = d.getDay()
    const base = dow >= 1 && dow <= 5 ? 45 : 15
    const noise = Math.floor(Math.random() * 60)
    const minutes = Math.random() < 0.2 ? 0 : Math.max(0, base + noise - 30)
    result.push({ date: dateStr, minutes })
  }
  return result
}

export const mockCalendarData: CalendarDay[] = generateMockCalendarData()
