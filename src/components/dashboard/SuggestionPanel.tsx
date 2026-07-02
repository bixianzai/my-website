import { useState } from 'react'
import type { Suggestion } from '../../data/mockData'

export default function SuggestionPanel({ suggestions }: { suggestions: Suggestion[] }) {
  const [filter, setFilter] = useState<'all' | Suggestion['type']>('all')
  const typeLabels = { course: '课程', article: '文章', practice: '练习' }
  const diffLabels = { easy: '入门', medium: '进阶', hard: '挑战' }
  const diffColors = { easy: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400', medium: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400', hard: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400' }

  const filtered = filter === 'all' ? suggestions : suggestions.filter((s) => s.type === filter)

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">AI 学习建议</h3>
        <div className="flex gap-1">
          {(['all', 'course', 'article', 'practice'] as const).map((f) => (
            <button key={f} onClick={() => setFilter(f)} className={`px-2 py-1 text-xs rounded-md transition-colors ${filter === f ? 'bg-purple-100 dark:bg-purple-950/30 text-purple-600 dark:text-purple-400' : 'text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'}`}>{f === 'all' ? '全部' : typeLabels[f]}</button>
          ))}
        </div>
      </div>
      <div className="flex flex-col gap-3">
        {filtered.map((s) => (
          <div key={s.id} className="p-3 rounded-lg border border-gray-100 dark:border-gray-700 hover:border-purple-200 dark:hover:border-purple-800 transition-colors cursor-pointer">
            <div className="flex items-start justify-between gap-2">
              <p className="text-sm font-medium text-gray-800 dark:text-gray-200">{s.title}</p>
              <span className={`shrink-0 px-1.5 py-0.5 text-[10px] rounded ${diffColors[s.difficulty]}`}>{diffLabels[s.difficulty]}</span>
            </div>
            <div className="flex items-center gap-3 mt-1.5 text-xs text-gray-400">
              <span>{typeLabels[s.type]}</span>
              <span>{s.duration} 分钟</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
