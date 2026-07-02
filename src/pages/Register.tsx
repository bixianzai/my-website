import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

export default function Register() {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { register } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    if (password !== confirm) { setError('两次输入的密码不一致'); return }
    if (password.length < 6) { setError('密码长度至少6位'); return }
    setLoading(true)
    try {
      await register(username, email, password)
      navigate('/dashboard')
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : '注册失败'
      setError(msg)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-svh flex items-center justify-center bg-gray-50 dark:bg-gray-950 px-6">
      <div className="w-full max-w-sm">
        <Link to="/" className="block text-center text-2xl font-semibold text-purple-600 dark:text-purple-400 mb-8">StudyPal</Link>
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
          <h1 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">注册</h1>
          {error && <div className="mb-4 p-3 rounded-lg bg-red-50 dark:bg-red-950/30 text-red-600 dark:text-red-400 text-sm">{error}</div>}
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">用户名</label>
              <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-400" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">邮箱</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-400" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">密码</label>
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-400" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">确认密码</label>
              <input type="password" value={confirm} onChange={(e) => setConfirm(e.target.value)} required className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-400" />
            </div>
            <button type="submit" disabled={loading} className="w-full py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 disabled:opacity-50 transition-colors">{loading ? '注册中...' : '注册'}</button>
          </form>
          <p className="mt-4 text-sm text-center text-gray-400">已有账号？<Link to="/login" className="text-purple-500 hover:underline">登录</Link></p>
        </div>
      </div>
    </div>
  )
}
