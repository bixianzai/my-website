import { useState } from 'react'
import { type DailyGoal } from '../../data/mockData'

interface DailyGoalListProps {
  goals: DailyGoal[]
  onAdd?: (title: string) => void
  onToggle?: (id: string) => void
  onDelete?: (id: string) => void
}

export default function DailyGoalList({ goals, onAdd, onToggle, onDelete }: DailyGoalListProps) {
  const [items, setItems] = useState(goals)
  const [inputValue, setInputValue] = useState('')

  const displayGoals = onToggle ? goals : items
  const toggle = (id: string) => {
    if (onToggle) { onToggle(id) }
    else { setItems((prev) => prev.map((g) => (g.id === id ? { ...g, completed: !g.completed } : g))) }
  }

  const handleAdd = () => {
    const title = inputValue.trim()
    if (!title || !onAdd) return
    onAdd(title)
    setInputValue('')
  }

  const completedCount = displayGoals.filter((g) => g.completed).length
  const percentage = displayGoals.length > 0 ? Math.round((completedCount / displayGoals.length) * 100) : 0
  const allDone = displayGoals.length > 0 && completedCount === displayGoals.length

  if (displayGoals.length === 0) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-sm text-center">
        <p className="text-gray-400 dark:text-gray-500 mb-4">还没有学习目标</p>
        {onAdd && (
          <div className="flex gap-2 max-w-sm mx-auto">
            <input type="text" value={inputValue} onChange={(e) => setInputValue(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleAdd()} placeholder="添加新目标..." className="flex-1 px-3 py-2 text-sm border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-400" />
            <button type="button" onClick={handleAdd} className="px-4 py-2 text-sm bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors">添加</button>
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">每日目标</h3>
        <span className="text-sm text-gray-500 dark:text-gray-400">{completedCount}/{displayGoals.length}</span>
      </div>
      <div className="w-full h-2 bg-gray-100 dark:bg-gray-700 rounded-full mb-5 overflow-hidden">
        <div className="h-full bg-purple-500 rounded-full transition-all duration-300" style={{ width: `${percentage}%` }} />
      </div>
      <ul className="flex flex-col gap-2">
        {displayGoals.map((goal) => (
          <li key={goal.id}>
            <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors group">
              <input type="checkbox" checked={goal.completed} onChange={() => toggle(goal.id)} className="w-4 h-4 rounded border-gray-300 text-purple-600 focus:ring-purple-500 cursor-pointer" />
              <span className={`text-sm flex-1 ${goal.completed ? 'text-gray-400 dark:text-gray-500 line-through' : 'text-gray-700 dark:text-gray-300'}`}>{goal.title}</span>
              {onDelete && (
                <button type="button" onClick={() => onDelete(goal.id)} className="opacity-0 group-hover:opacity-100 text-gray-400 hover:text-red-500 transition-all p-0.5" aria-label={`Delete ${goal.title}`}>
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
              )}
            </div>
          </li>
        ))}
      </ul>
      {onAdd && (
        <div className="flex gap-2 mt-4 pt-4 border-t border-gray-100 dark:border-gray-700">
          <input type="text" value={inputValue} onChange={(e) => setInputValue(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleAdd()} placeholder="添加新目标..." className="flex-1 px-3 py-2 text-sm border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-400" />
          <button type="button" onClick={handleAdd} className="px-4 py-2 text-sm bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors">添加</button>
        </div>
      )}
      {allDone && (
        <div className="mt-4 flex items-center justify-center gap-2 text-green-500">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          <span className="text-sm font-medium">全部完成！</span>
        </div>
      )}
    </div>
  )
}
