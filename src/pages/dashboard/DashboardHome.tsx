import { useEffect, useState } from 'react'
import { useAuth } from '../../contexts/AuthContext'
import { mockStats, mockDailyGoals, mockSuggestions, mockWeeklyTrend, mockMonthlyTrend, mockCalendarData, type StatCard as StatCardType, type CalendarDay } from '../../data/mockData'
import { computeAchievementStatus, type AchievementStatus } from '../../data/achievements'
import StatCard from '../../components/dashboard/StatCard'
import DailyGoalList from '../../components/dashboard/DailyGoalList'
import SuggestionPanel from '../../components/dashboard/SuggestionPanel'
import TrendChart from '../../components/dashboard/TrendChart'
import LearningCalendar from '../../components/dashboard/LearningCalendar'
import AchievementWall from '../../components/dashboard/AchievementWall'
import { api } from '../../lib/api'

interface UserProfile { username: string; streak_days: number; total_study_minutes: number; level: number }

function buildRealStats(profile: UserProfile): StatCardType[] {
  return [
    { id: 'study-time', label: '累计学习时长', value: profile.total_study_minutes, unit: '分钟', trend: 'up', delta: null },
    { id: 'streak', label: '连续打卡', value: profile.streak_days, unit: '天', trend: null, delta: null },
    { id: 'level', label: '当前等级', value: profile.level, unit: '级', trend: 'up', delta: null },
    { id: 'suggestions', label: 'AI 建议', value: 5, unit: '条', trend: null, delta: null },
  ]
}

export default function DashboardHome() {
  const { state } = useAuth()
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [calendarData, setCalendarData] = useState<CalendarDay[]>(mockCalendarData)
  const [calendarLoading, setCalendarLoading] = useState(false)
  const [achievements, setAchievements] = useState<AchievementStatus[]>(() => computeAchievementStatus(null))

  useEffect(() => {
    if (state.user) {
      api.get<UserProfile>('/users/me').then((p) => {
        setProfile(p)
        setAchievements(computeAchievementStatus({ streak_days: p.streak_days, level: p.level, total_study_minutes: p.total_study_minutes }))
      }).catch(() => setProfile(null))
      setCalendarLoading(true)
      api.get<CalendarDay[]>('/analytics/daily').then(setCalendarData).catch(() => setCalendarData(mockCalendarData)).finally(() => setCalendarLoading(false))
    } else {
      setCalendarData(mockCalendarData)
      setAchievements(computeAchievementStatus(null))
    }
  }, [state.user])

  const stats = profile ? buildRealStats(profile) : mockStats

  return (
    <div className="p-6 md:p-8 space-y-8">
      <h1 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">学习数据</h1>
      <section>
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
          {stats.map((s) => <StatCard key={s.id} stat={s} />)}
        </div>
      </section>
      <section><LearningCalendar data={calendarData} loading={calendarLoading} /></section>
      <section><AchievementWall achievements={achievements} /></section>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <section><DailyGoalList goals={mockDailyGoals} /></section>
        <section><SuggestionPanel suggestions={mockSuggestions} /></section>
      </div>
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <TrendChart data={mockWeeklyTrend} mode="line" title="周学习趋势" />
        <TrendChart data={mockMonthlyTrend} mode="bar" title="月学习趋势" />
      </section>
    </div>
  )
}
