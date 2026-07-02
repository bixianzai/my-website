import { useState, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import ChatBubble from '../../components/dashboard/ChatBubble'
import { api } from '../../lib/api'

interface Message { role: 'user' | 'assistant'; content: string }

export default function ChatPage() {
  const { state } = useAuth()
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [streaming, setStreaming] = useState(false)
  const [error, setError] = useState('')
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: 'smooth' }) }, [messages])

  useEffect(() => {
    if (state.user) {
      api.get<Array<{ id: number; role: string; content: string }>>('/chat/history')
        .then((data) => setMessages(data.map((m) => ({ role: m.role as 'user' | 'assistant', content: m.content }))))
        .catch(() => {})
    }
  }, [state.user])

  const send = async () => {
    const text = input.trim()
    if (!text || streaming) return
    setInput('')
    setError('')
    setMessages((prev) => [...prev, { role: 'user', content: text }, { role: 'assistant', content: '' }])
    setStreaming(true)

    try {
      const accessToken = localStorage.getItem('access_token')
      const BASE_URL = import.meta.env.VITE_API_URL || '/api'
      const res = await fetch(`${BASE_URL}/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${accessToken}` },
        body: JSON.stringify({ message: text }),
      })

      if (!res.ok) {
        const errData = await res.json().catch(() => ({ detail: '请求失败' }))
        if (res.status === 401) { setError('请先登录后再使用 AI 助手') }
        else { setError(errData.detail || `请求失败 (${res.status})`) }
        setStreaming(false)
        return
      }

      const reader = res.body!.getReader()
      const decoder = new TextDecoder()
      let raw = ''
      while (true) {
        const { done, value } = await reader.read()
        if (done) break
        raw += decoder.decode(value, { stream: true })
        while (raw.includes('\n\n')) {
          const idx = raw.indexOf('\n\n')
          const event = raw.slice(0, idx)
          raw = raw.slice(idx + 2)
          for (const line of event.split('\n')) {
            if (!line.startsWith('data: ')) continue
            const payload = line.slice(6)
            if (payload === '[DONE]') { setStreaming(false); return }
            try {
              const parsed = JSON.parse(payload)
              if (parsed.error) { setError(parsed.error); setStreaming(false); return }
              if (parsed.content) {
                setMessages((prev) => prev.map((m, i) => i === prev.length - 1 && m.role === 'assistant' ? { ...m, content: m.content + parsed.content } : m))
              }
            } catch { /* skip malformed */ }
          }
        }
      }
    } catch { setError('网络错误，请稍后重试') }
    setStreaming(false)
  }

  if (!state.user) {
    return (
      <div className="p-6 md:p-8 flex items-center justify-center min-h-full">
        <div className="text-center">
          <p className="text-gray-500 dark:text-gray-400 mb-4">请先登录后使用 AI 助手</p>
          <Link to="/login" className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors">去登录</Link>
        </div>
      </div>
    )
  }

  return (
    <div className="p-6 md:p-8 flex flex-col h-[calc(100vh-4rem)] max-h-[calc(100vh-4rem)]">
      <h1 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4">AI 对话</h1>
      <div className="flex-1 overflow-y-auto space-y-4 mb-4 bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm">
        {messages.length === 0 && <p className="text-center text-gray-400 py-8">和 StudyPal 聊一聊你的学习计划吧！</p>}
        {messages.map((m, i) => <ChatBubble key={i} role={m.role} content={m.content} />)}
        {streaming && messages[messages.length - 1]?.content === '' && (
          <div className="flex gap-2 items-center text-gray-400 text-sm px-3"><span className="animate-pulse">●</span><span className="animate-pulse" style={{ animationDelay: '0.2s' }}>●</span><span className="animate-pulse" style={{ animationDelay: '0.4s' }}>●</span></div>
        )}
        <div ref={bottomRef} />
      </div>
      {error && <div className="mb-3 p-3 rounded-lg bg-red-50 dark:bg-red-950/30 text-red-600 dark:text-red-400 text-sm">{error}</div>}
      <div className="flex gap-3">
        <input type="text" value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && send()} placeholder="输入你的问题..." disabled={streaming}
          className="flex-1 px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-400 disabled:opacity-50" />
        <button type="button" onClick={send} disabled={streaming || !input.trim()} className="px-6 py-3 bg-purple-500 text-white rounded-xl hover:bg-purple-600 disabled:opacity-50 transition-colors">发送</button>
      </div>
    </div>
  )
}
