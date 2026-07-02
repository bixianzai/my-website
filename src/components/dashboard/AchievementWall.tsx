import { type AchievementStatus } from '../../data/achievements'

export default function AchievementWall({ achievements, loading }: { achievements: AchievementStatus[]; loading?: boolean }) {
  if (loading) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm animate-pulse">
        <div className="h-5 w-24 bg-gray-200 dark:bg-gray-700 rounded mb-4" />
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
          {Array.from({ length: 6 }).map((_, i) => (<div key={i} className="flex flex-col items-center gap-2"><div className="w-14 h-14 rounded-full bg-gray-200 dark:bg-gray-700" /><div className="h-3 w-12 bg-gray-200 dark:bg-gray-700 rounded" /></div>))}
        </div>
      </div>
    )
  }

  const unlockedCount = achievements.filter((a) => a.unlocked).length

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">成就徽章</h3>
        <span className="text-xs text-gray-400 dark:text-gray-500">{unlockedCount}/{achievements.length} 已解锁</span>
      </div>
      <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
        {achievements.map((ach) => (
          <div key={ach.id} className="relative group flex flex-col items-center gap-1.5">
            <div className={`w-14 h-14 rounded-full flex items-center justify-center text-2xl transition-all duration-200 ${ach.unlocked ? 'bg-purple-100 dark:bg-purple-950/40 ring-2 ring-purple-400 dark:ring-purple-500 shadow-sm' : 'bg-gray-100 dark:bg-gray-750 grayscale opacity-50'}`}>{ach.icon}</div>
            <span className={`text-xs text-center leading-tight ${ach.unlocked ? 'text-gray-800 dark:text-gray-200 font-medium' : 'text-gray-400 dark:text-gray-500'}`}>{ach.name}</span>
            {!ach.unlocked && ach.condition && (
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2.5 py-1.5 rounded-lg bg-gray-800 dark:bg-gray-200 text-white dark:text-gray-900 text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                <div className="text-[10px] text-gray-300 dark:text-gray-500 mb-0.5">解锁条件</div>
                {ach.condition}
                <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-800 dark:border-t-gray-200" />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
