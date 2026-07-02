import { useEffect, useState } from 'react'
import { useAuth } from '../../contexts/AuthContext'
import { type DailyGoal, type TrendPoint, type CalendarDay } from '../../data/mockData'
import { type AchievementStatus } from '../../data/achievements'
import StatCard from '../../components/dashboard/StatCard'
import DailyGoalList from '../../components/dashboard/DailyGoalList'
import SuggestionPanel from '../../components/dashboard/SuggestionPanel'
import TrendChart from '../../components/dashboard/TrendChart'
import LearningCalendar from '../../components/dashboard/LearningCalendar'
import AchievementWall from '../../components/dashboard/AchievementWall'
import { api } from '../../lib/api'

interface UserProfile { username: string; streak_days: number; total_study_minutes: number; level: number }
interface GoalFromApi { id: number; title: string; completed: boolean; sort_order: number; created_at: string }

function apiGoalToDailyGoal(g: GoalFromApi): DailyGoal {
  return { id: String(g.id), title: g.title, completed: g.completed }
}

function computeTrends(dailyData: CalendarDay[]): { weekly: TrendPoint[]; monthly: TrendPoint[] } {
  const weekLabels = ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
  const now = new Date()
  // Weekly: last 7 days
  const weekly: TrendPoint[] = []
  for (let i = 6; i >= 0; i--) {
    const d = new Date(now)
    d.setDate(d.getDate() - i)
    const dateStr = d.toISOString().split('T')[0]
    const day = dailyData.find((x) => x.date === dateStr)
    weekly.push({ date: weekLabels[(d.getDay() + 6) % 7], value: day ? Math.round(day.minutes / 60 * 10) / 10 : 0 })
  }
  // Monthly: last 4 weeks
  const monthly: TrendPoint[] = []
  for (let w = 3; w >= 0; w--) {
    let total = 0
    for (let d = 0; d < 7; d++) {
      const date = new Date(now)
      date.setDate(date.getDate() - (w * 7 + d))
      const dateStr = date.toISOString().split('T')[0]
      const day = dailyData.find((x) => x.date === dateStr)
      total += day ? day.minutes : 0
    }
    monthly.push({ date: `第${4 - w}周`, value: Math.round(total / 60 * 10) / 10 })
  }
  return { weekly, monthly }
}

export default function DashboardHome() {
  const { state } = useAuth()
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [statsLoading, setStatsLoading] = useState(false)
  const [calendarData, setCalendarData] = useState<CalendarDay[]>([])
  const [calendarLoading, setCalendarLoading] = useState(false)
  const [achievements, setAchievements] = useState<AchievementStatus[]>([])
  const [goals, setGoals] = useState<DailyGoal[]>([])
  const [goalsLoading, setGoalsLoading] = useState(false)
  const [trends, setTrends] = useState<{ weekly: TrendPoint[]; monthly: TrendPoint[] }>({ weekly: [], monthly: [] })

  const isAuthenticated = !!state.user

  useEffect(() => {
    if (!isAuthenticated) return
    setStatsLoading(true)
    setCalendarLoading(true)
    setGoalsLoading(true)

    api.get<UserProfile>('/users/me')
      .then(setProfile)
      .catch(() => setProfile(null))
      .finally(() => setStatsLoading(false))

    api.get<CalendarDay[]>('/analytics/daily')
      .then((data) => {
        setCalendarData(data)
        setTrends(computeTrends(data))
      })
      .catch(() => setCalendarData([]))
      .finally(() => setCalendarLoading(false))

    api.get<Array<{ id: string; name: string; description: string; icon: string; unlocked: boolean; condition?: string }>>('/analytics/achievements')
      .then((data) => setAchievements(data.map((a) => ({ ...a, icon: { 'first-login': '🚀', 'streak-7': '🔥', 'streak-30': '⚔️', 'level-2': '📚', 'level-3': '🎓', 'time-3000': '⏳' }[a.id] || '🏆' }))))
      .catch(() => setAchievements([]))

    api.get<GoalFromApi[]>('/goals')
      .then((data) => setGoals(data.map(apiGoalToDailyGoal)))
      .catch(() => setGoals([]))
      .finally(() => setGoalsLoading(false))
  }, [isAuthenticated])

  if (!isAuthenticated) {
    return (
      <div className="p-6 md:p-8 flex items-center justify-center min-h-full">
        <div className="text-center">
          <p className="text-gray-500 dark:text-gray-400 mb-4">请先登录后查看学习数据</p>
          <a href="/my-website/login" className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors inline-block">去登录</a>
        </div>
      </div>
    )
  }

  const stats = profile ? [
    { id: 'study-time', label: '累计学习时长', value: profile.total_study_minutes, unit: '分钟', trend: 'up' as const, delta: null },
    { id: 'streak', label: '连续打卡', value: profile.streak_days, unit: '天', trend: null, delta: null },
    { id: 'level', label: '当前等级', value: profile.level, unit: '级', trend: 'up' as const, delta: null },
    { id: 'goals', label: '学习目标', value: goals.filter((g) => g.completed).length, unit: `个 / ${goals.length}`, trend: null, delta: null },
  ] : []

  return (
    <div className="p-6 md:p-8 space-y-8">
      <h1 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">学习数据</h1>

      {statsLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((i) => (<div key={i} className="bg-white dark:bg-gray-800 rounded-xl p-5 shadow-sm animate-pulse"><div className="h-4 w-16 bg-gray-200 dark:bg-gray-700 rounded mb-2" /><div className="h-8 w-24 bg-gray-200 dark:bg-gray-700 rounded" /></div>))}
        </div>
      ) : (
        <section>
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
            {stats.map((s) => <StatCard key={s.id} stat={s} />)}
          </div>
        </section>
      )}

      <section><LearningCalendar data={calendarData} loading={calendarLoading} /></section>
      <section><AchievementWall achievements={achievements} loading={false} /></section>

      {goalsLoading ? (
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm animate-pulse">
          <div className="h-5 w-20 bg-gray-200 dark:bg-gray-700 rounded mb-4" />
          <div className="h-2 w-full bg-gray-100 dark:bg-gray-750 rounded mb-5" />
          <div className="space-y-2">{[1, 2, 3].map((i) => (<div key={i} className="h-8 bg-gray-100 dark:bg-gray-750 rounded" />))}</div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <section><DailyGoalList goals={goals} /></section>
          <section><SuggestionPanel /></section>
        </div>
      )}

      {trends.weekly.length > 0 && trends.monthly.length > 0 && (
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <TrendChart data={trends.weekly} mode="line" title="周学习趋势" />
          <TrendChart data={trends.monthly} mode="bar" title="月学习趋势" />
        </section>
      )}
    </div>
  )
}
