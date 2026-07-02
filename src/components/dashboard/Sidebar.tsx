import { Link, useLocation } from 'react-router-dom'
import { useState } from 'react'

const navItems = [
  { label: '学习数据', path: '/dashboard' },
  { label: 'AI 对话建议', path: '/dashboard/chat' },
  { label: '学习目标', path: '/dashboard/goals' },
]

export default function Sidebar() {
  const [open, setOpen] = useState(false)
  const location = useLocation()

  return (
    <>
      <button type="button" className="fixed top-4 left-4 z-50 p-2 rounded-md bg-white dark:bg-gray-800 shadow md:hidden" onClick={() => setOpen(!open)} aria-label="Toggle sidebar">
        <svg className="w-5 h-5 text-gray-700 dark:text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d={open ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
        </svg>
      </button>
      {open && <div className="fixed inset-0 z-30 bg-black/30 md:hidden" onClick={() => setOpen(false)} />}
      <aside className={`fixed md:static inset-y-0 left-0 z-40 w-[240px] bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 flex flex-col pt-16 md:pt-8 transition-transform duration-200 ${open ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}>
        <div className="px-6 mb-8">
          <span className="text-lg font-semibold text-purple-600 dark:text-purple-400">StudyPal</span>
        </div>
        <nav className="flex flex-col gap-1 px-3">
          {navItems.map((item) => {
            const isActive = item.path === '/dashboard' ? location.pathname === '/dashboard' : location.pathname.startsWith(item.path)
            return (
              <Link key={item.label} to={item.path} onClick={() => setOpen(false)}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${isActive ? 'bg-purple-50 dark:bg-purple-950/30 text-purple-600 dark:text-purple-400' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'}`}>
                {item.label}
              </Link>
            )
          })}
        </nav>
      </aside>
    </>
  )
}
