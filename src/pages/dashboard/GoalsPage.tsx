import { useEffect, useState, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import DailyGoalList from '../../components/dashboard/DailyGoalList'
import GoalTemplatePicker from '../../components/dashboard/GoalTemplatePicker'
import { type DailyGoal } from '../../data/mockData'
import { type GoalTemplate } from '../../data/goalTemplates'
import { api } from '../../lib/api'

interface GoalFromApi { id: number; title: string; completed: boolean; sort_order: number; created_at: string }

function apiGoalToDailyGoal(g: GoalFromApi): DailyGoal { return { id: String(g.id), title: g.title, completed: g.completed } }

const TPL_TITLES: Record<string, string> = {
  'tpl-operations': '完成 10 道有理数运算练习', 'tpl-equation': '解 5 道一元一次方程',
  'tpl-geometry': '练习线段与角的计算 3 道', 'tpl-review': '整理本周错题并重做',
  'tpl-word-problems': '完成 2 道方程应用题', 'tpl-challenge': '挑战 1 道压轴题并总结思路',
}

export default function GoalsPage() {
  const { state } = useAuth()
  const isAuthenticated = !!state.user
  const [goals, setGoals] = useState<DailyGoal[]>([])
  const [addedTemplateIds, setAddedTemplateIds] = useState<string[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (isAuthenticated) {
      setLoading(true)
      api.get<GoalFromApi[]>('/goals').then((data) => {
        setGoals(data.map(apiGoalToDailyGoal))
        const goalTitles = new Set(data.map((g) => g.title))
        setAddedTemplateIds(Object.keys(TPL_TITLES).filter((id) => goalTitles.has(TPL_TITLES[id])))
      }).catch(() => setGoals([])).finally(() => setLoading(false))
    } else {
      setGoals([])
    }
  }, [isAuthenticated])

  const handleAdd = useCallback(async (title: string) => {
    try { const g = await api.post<GoalFromApi>('/goals', { title }); setGoals((prev) => [...prev, apiGoalToDailyGoal(g)]) } catch {}
  }, [])

  const handleToggle = useCallback(async (id: string) => {
    const goal = goals.find((g) => g.id === id)
    if (!goal) return
    try { const u = await api.put<GoalFromApi>(`/goals/${id}`, { completed: !goal.completed }); setGoals((prev) => prev.map((g) => g.id === id ? apiGoalToDailyGoal(u) : g)) } catch {}
  }, [goals])

  const handleDelete = useCallback(async (id: string) => {
    try { await api.del(`/goals/${id}`) } catch {}
    setGoals((prev) => prev.filter((g) => g.id !== id))
  }, [])

  const handleAddTemplate = useCallback(async (tpl: GoalTemplate) => {
    setAddedTemplateIds((prev) => [...prev, tpl.id])
    await handleAdd(tpl.title)
  }, [handleAdd])

  const totalGoals = goals.length
  const completedGoals = goals.filter((g) => g.completed).length
  const completionRate = totalGoals > 0 ? Math.round((completedGoals / totalGoals) * 100) : 0

  return (
    <div className="p-6 md:p-8 space-y-8">
      <h1 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">学习目标</h1>
      {!isAuthenticated && (
        <div className="bg-purple-50 dark:bg-purple-950/30 border border-purple-200 dark:border-purple-800 rounded-xl p-4 flex items-center justify-between">
          <p className="text-sm text-purple-700 dark:text-purple-300">登录后保存你的学习目标</p>
          <Link to="/login" className="px-4 py-1.5 text-sm font-medium bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors">登录</Link>
        </div>
      )}
      {isAuthenticated && (
        <>
          <section className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-5 shadow-sm"><p className="text-sm text-gray-500 dark:text-gray-400 mb-1">当前目标</p><p className="text-2xl font-bold text-gray-900 dark:text-gray-100">{totalGoals}<span className="text-sm font-normal text-gray-400 ml-1">个</span></p></div>
            <div className="bg-white dark:bg-gray-800 rounded-xl p-5 shadow-sm"><p className="text-sm text-gray-500 dark:text-gray-400 mb-1">已完成</p><p className="text-2xl font-bold text-green-500">{completedGoals}<span className="text-sm font-normal text-gray-400 ml-1">个</span></p></div>
            <div className="bg-white dark:bg-gray-800 rounded-xl p-5 shadow-sm"><p className="text-sm text-gray-500 dark:text-gray-400 mb-1">完成率</p><p className="text-2xl font-bold text-purple-500">{completionRate}<span className="text-sm font-normal text-gray-400 ml-1">%</span></p></div>
          </section>
          {totalGoals > 0 && (
            <section className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">完成率</h3>
              <div className="w-full h-3 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden"><div className="h-full bg-gradient-to-r from-purple-500 to-purple-400 rounded-full transition-all duration-500" style={{ width: `${completionRate}%` }} /></div>
              <p className="text-xs text-gray-400 dark:text-gray-500 mt-2">已完成 {completedGoals}/{totalGoals} 个目标</p>
            </section>
          )}
          <section><GoalTemplatePicker addedTemplateIds={addedTemplateIds} onAdd={handleAddTemplate} /></section>
        </>
      )}
      <section>
        {loading ? (
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm animate-pulse"><div className="h-5 w-20 bg-gray-200 dark:bg-gray-700 rounded mb-4" /><div className="h-2 w-full bg-gray-100 dark:bg-gray-750 rounded mb-5" /><div className="space-y-2">{[1, 2, 3].map((i) => (<div key={i} className="h-8 bg-gray-100 dark:bg-gray-750 rounded" />))}</div></div>
        ) : (
          <DailyGoalList goals={goals} onAdd={isAuthenticated ? handleAdd : undefined} onToggle={isAuthenticated ? handleToggle : undefined} onDelete={isAuthenticated ? handleDelete : undefined} />
        )}
      </section>
    </div>
  )
}
