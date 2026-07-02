import type { StatCard as StatCardType } from '../../data/mockData'

export default function StatCard({ stat }: { stat: StatCardType }) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-5 shadow-sm">
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">{stat.label}</p>
      <div className="flex items-baseline gap-1">
        <span className="text-3xl font-bold text-gray-900 dark:text-gray-100">{stat.value}</span>
        <span className="text-sm text-gray-400 dark:text-gray-500">{stat.unit}</span>
      </div>
      {stat.trend && (
        <div className={`flex items-center gap-1 mt-2 text-xs ${stat.trend === 'up' ? 'text-green-500' : 'text-red-500'}`}>
          <span>{stat.trend === 'up' ? '↑' : '↓'}</span>
          {stat.delta !== null && <span>{stat.delta}% vs 昨日</span>}
        </div>
      )}
    </div>
  )
}
