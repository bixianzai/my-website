import { useEffect, useState, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import { api } from '../../lib/api'

interface SuggestionItem {
  title: string
  type: 'course' | 'article' | 'practice'
  difficulty: 'easy' | 'medium' | 'hard'
  duration: number
  reason: string
}

const TYPE_LABELS: Record<string, string> = { course: '课程', article: '文章', practice: '练习' }
const DIFF_LABELS: Record<string, string> = { easy: '入门', medium: '进阶', hard: '挑战' }
const DIFF_COLORS: Record<string, string> = {
  easy: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
  medium: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400',
  hard: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
}

const COOLDOWN_SECONDS = 30

export default function SuggestionPanel() {
  const { state } = useAuth()
  const isAuthenticated = !!state.user
  const [suggestions, setSuggestions] = useState<SuggestionItem[]>([])
  const [loading, setLoading] = useState(false)
  const [fallback, setFallback] = useState(false)
  const [cooldown, setCooldown] = useState(0)
  const [filter, setFilter] = useState<'all' | SuggestionItem['type']>('all')

  const fetchSuggestions = useCallback(async () => {
    if (!isAuthenticated) return
    setLoading(true)
    setFallback(false)
    try {
      const data = await api.post<{ suggestions: SuggestionItem[]; fallback: boolean }>('/suggestions')
      setSuggestions(data.suggestions)
      setFallback(data.fallback)
    } catch {
      setSuggestions([])
      setFallback(true)
    } finally {
      setLoading(false)
    }
  }, [isAuthenticated])

  useEffect(() => {
    if (isAuthenticated) {
      fetchSuggestions()
    } else {
      setSuggestions([])
    }
  }, [isAuthenticated, fetchSuggestions])

  const handleRefresh = () => {
    if (cooldown > 0) return
    fetchSuggestions()
    setCooldown(COOLDOWN_SECONDS)
    const timer = setInterval(() => {
      setCooldown((prev) => {
        if (prev <= 1) { clearInterval(timer); return 0 }
        return prev - 1
      })
    }, 1000)
  }

  const filtered = filter === 'all' ? suggestions : suggestions.filter((s) => s.type === filter)

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">AI 学习建议</h3>
        <div className="flex items-center gap-2">
          <div className="flex gap-1">
            {(['all', 'course', 'article', 'practice'] as const).map((f) => (
              <button key={f} onClick={() => setFilter(f)} className={`px-2 py-1 text-xs rounded-md transition-colors ${filter === f ? 'bg-purple-100 dark:bg-purple-950/30 text-purple-600 dark:text-purple-400' : 'text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'}`}>{f === 'all' ? '全部' : TYPE_LABELS[f]}</button>
            ))}
          </div>
          {isAuthenticated && (
            <button type="button" onClick={handleRefresh} disabled={cooldown > 0 || loading}
              className="px-2 py-1 text-xs rounded-md text-purple-500 hover:bg-purple-50 dark:hover:bg-purple-950/30 disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
              {loading ? '生成中...' : cooldown > 0 ? `${cooldown}s` : '🔄 刷新'}
            </button>
          )}
        </div>
      </div>

      {!isAuthenticated ? (
        <p className="text-sm text-gray-400 dark:text-gray-500 text-center py-8">登录后获取 AI 个性化学习建议</p>
      ) : loading ? (
        <div className="flex flex-col gap-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="p-3 rounded-lg border border-gray-100 dark:border-gray-700 animate-pulse">
              <div className="h-4 w-3/4 bg-gray-200 dark:bg-gray-700 rounded mb-2" />
              <div className="h-3 w-1/2 bg-gray-100 dark:bg-gray-750 rounded" />
            </div>
          ))}
        </div>
      ) : fallback && filtered.length === 0 ? (
        <p className="text-sm text-gray-400 dark:text-gray-500 text-center py-8">暂时无法生成建议，请稍后刷新</p>
      ) : filtered.length === 0 ? (
        <p className="text-sm text-gray-400 dark:text-gray-500 text-center py-8">暂无建议</p>
      ) : (
        <div className="flex flex-col gap-3">
          {filtered.map((s, i) => (
            <div key={i} className="p-3 rounded-lg border border-gray-100 dark:border-gray-700 hover:border-purple-200 dark:hover:border-purple-800 transition-colors">
              <div className="flex items-start justify-between gap-2">
                <p className="text-sm font-medium text-gray-800 dark:text-gray-200">{s.title}</p>
                <span className={`shrink-0 px-1.5 py-0.5 text-[10px] rounded ${DIFF_COLORS[s.difficulty]}`}>{DIFF_LABELS[s.difficulty]}</span>
              </div>
              <div className="flex items-center gap-3 mt-1.5 text-xs text-gray-400">
                <span>{TYPE_LABELS[s.type]}</span>
                <span>{s.duration} 分钟</span>
              </div>
              {s.reason && <p className="text-xs text-gray-400 dark:text-gray-500 mt-1.5 italic">{s.reason}</p>}
              <Link to={`/dashboard/chat?q=聊聊这个建议：${encodeURIComponent(s.title)}`} className="inline-block mt-1.5 text-xs text-purple-500 hover:text-purple-600 transition-colors">聊聊这个 →</Link>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
