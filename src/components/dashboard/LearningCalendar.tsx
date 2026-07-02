import { useState } from 'react'

export interface CalendarDay { date: string; minutes: number }

interface LearningCalendarProps { data: CalendarDay[]; loading?: boolean }

const DAY_SIZE = 14; const DAY_GAP = 3
const WEEKDAYS = ['一', '二', '三', '四', '五', '六', '日']
const MONTHS = ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']

function colorForMinutes(minutes: number, dark: boolean): string {
  if (minutes === 0) return dark ? 'rgb(31,41,55)' : 'rgb(235,235,235)'
  if (minutes < 15) return dark ? 'rgb(74,52,124)' : 'rgb(216,180,254)'
  if (minutes < 30) return dark ? 'rgb(107,70,166)' : 'rgb(192,132,252)'
  if (minutes < 60) return dark ? 'rgb(139,92,210)' : 'rgb(168,85,247)'
  return dark ? 'rgb(168,85,247)' : 'rgb(147,51,234)'
}

export default function LearningCalendar({ data, loading }: LearningCalendarProps) {
  const [offset, setOffset] = useState(0)
  const [tooltip, setTooltip] = useState<{ date: string; minutes: number; x: number; y: number } | null>(null)

  if (loading) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm animate-pulse">
        <div className="h-5 w-32 bg-gray-200 dark:bg-gray-700 rounded mb-4" />
        <div className="h-[140px] bg-gray-100 dark:bg-gray-750 rounded" />
      </div>
    )
  }

  if (!data || data.length === 0) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">学习日历</h3>
        <p className="text-sm text-gray-400 dark:text-gray-500 text-center py-8">暂无学习记录</p>
      </div>
    )
  }

  const weeksShown = 13; const daysShown = weeksShown * 7
  const maxOffset = Math.max(0, data.length - daysShown)
  const clampedOffset = Math.min(offset, maxOffset)
  const slice = data.slice(Math.max(0, data.length - daysShown - clampedOffset), data.length - clampedOffset)

  const lastDate = new Date(slice[slice.length - 1]?.date ?? '')
  const lastDow = lastDate.getDay() === 0 ? 6 : lastDate.getDay() - 1
  const padEnd = 6 - lastDow
  const firstDate = new Date(slice[0]?.date ?? '')
  const firstDow = firstDate.getDay() === 0 ? 6 : firstDate.getDay() - 1
  const padStart = firstDow

  const padded = [...Array.from({ length: padStart }, () => null as unknown as CalendarDay), ...slice, ...Array.from({ length: padEnd }, () => null as unknown as CalendarDay)]
  const cols: (CalendarDay | null)[][] = []
  for (let i = 0; i < padded.length; i += 7) cols.push(padded.slice(i, i + 7))
  const displayCols = cols.slice(-weeksShown)

  const monthLabels: { label: string; col: number }[] = []
  displayCols.forEach((col, ci) => {
    const day = col.find((d) => d !== null)
    if (!day) return
    const m = parseInt(day.date.split('-')[1], 10) - 1
    if (ci === 0 || monthLabels.length === 0 || monthLabels[monthLabels.length - 1].label !== MONTHS[m]) {
      monthLabels.push({ label: MONTHS[m], col: ci })
    }
  })

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">学习日历</h3>
        <div className="flex items-center gap-1">
          <button type="button" onClick={() => setOffset((v) => Math.min(v + 7, maxOffset))} disabled={offset >= maxOffset} className="p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-30 text-gray-500" aria-label="Earlier">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
          </button>
          <button type="button" onClick={() => setOffset((v) => Math.max(v - 7, 0))} disabled={offset === 0} className="p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-30 text-gray-500" aria-label="Later">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
          </button>
        </div>
      </div>
      <div className="flex items-center gap-1 mb-3 text-xs text-gray-400 dark:text-gray-500">
        <span>少</span>
        {[0, 15, 30, 60].map((t) => (<span key={t} className="w-3.5 h-3.5 rounded-sm" style={{ backgroundColor: colorForMinutes(t > 0 ? t : 0, false) }} />))}
        <span>多</span>
      </div>
      <div className="overflow-x-auto">
        <svg width={Math.max(displayCols.length * (DAY_SIZE + DAY_GAP) + 30, 200)} height={7 * (DAY_SIZE + DAY_GAP) + 25} className="min-w-[200px]">
          {monthLabels.map((ml) => (<text key={ml.label} x={30 + ml.col * (DAY_SIZE + DAY_GAP)} y={12} className="fill-gray-400 dark:fill-gray-500" fontSize="10">{ml.label}</text>))}
          {WEEKDAYS.map((d, i) => (<text key={d} x={0} y={22 + i * (DAY_SIZE + DAY_GAP) + DAY_SIZE / 2} className="fill-gray-400 dark:fill-gray-500" fontSize="9" dominantBaseline="central">{i % 2 === 1 ? d : ''}</text>))}
          {displayCols.map((col, ci) => col.map((day, ri) => (
            <rect key={`${ci}-${ri}`} x={30 + ci * (DAY_SIZE + DAY_GAP)} y={16 + ri * (DAY_SIZE + DAY_GAP)} width={DAY_SIZE} height={DAY_SIZE} rx={2} fill={day ? colorForMinutes(day.minutes, false) : 'transparent'} className={day ? 'cursor-pointer hover:stroke-purple-500 hover:stroke-[1.5]' : ''}
              onMouseEnter={(e) => { if (!day) return; const rect = (e.target as SVGRectElement).closest('svg')!.getBoundingClientRect(); setTooltip({ date: day.date, minutes: day.minutes, x: e.clientX - rect.left, y: e.clientY - rect.top }) }}
              onMouseLeave={() => setTooltip(null)}>
              {day ? <title>{`${day.date}\n${day.minutes} 分钟`}</title> : null}
            </rect>
          )))}
        </svg>
      </div>
      {tooltip && (
        <div className="absolute z-50 px-2 py-1 text-xs rounded bg-gray-800 dark:bg-gray-200 text-white dark:text-gray-900 shadow pointer-events-none whitespace-nowrap"
          style={{ position: 'fixed', left: 0, top: 0, transform: `translate(${tooltip.x + 10}px, ${tooltip.y - 30}px)` }}>
          <div>{tooltip.date}</div>
          <div className="font-medium">{tooltip.minutes} 分钟</div>
        </div>
      )}
    </div>
  )
}
