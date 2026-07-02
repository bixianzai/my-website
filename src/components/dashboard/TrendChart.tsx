import { useMemo } from 'react'
import type { TrendPoint } from '../../data/mockData'

interface TrendChartProps { data: TrendPoint[]; mode: 'line' | 'bar'; title: string }

export default function TrendChart({ data, mode, title }: TrendChartProps) {
  const { path, maxVal, barData } = useMemo(() => {
    const max = Math.max(...data.map((d) => d.value), 1)
    const w = 500; const h = 200; const pad = { top: 20, right: 20, bottom: 30, left: 40 }
    const pw = w - pad.left - pad.right; const ph = h - pad.top - pad.bottom

    let d = ''
    if (mode === 'line') {
      d = data.map((p, i) => {
        const x = pad.left + (i / Math.max(data.length - 1, 1)) * pw
        const y = pad.top + (1 - p.value / max) * ph
        return `${i === 0 ? 'M' : 'L'}${x},${y}`
      }).join(' ')
    }

    type BarItem = { x: number; w: number; h: number; label: string; value: number }
    const bars: BarItem[] = mode === 'bar' ? data.map((p, i) => {
      const bw = Math.max(pw / data.length - 8, 8)
      return { x: pad.left + (i / data.length) * pw + 4, w: bw, h: (p.value / max) * ph, label: p.date, value: p.value }
    }) : []

    return { path: d, maxVal: max, barData: bars, w, h, pad, pw, ph }
  }, [data, mode])

  const gridLines = [0, 0.25, 0.5, 0.75, 1]

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">{title}</h3>
      <svg viewBox="0 0 500 200" className="w-full h-auto">
        {gridLines.map((frac) => {
          const y = 20 + (1 - frac) * 150
          return (
            <g key={frac}>
              <line x1={40} y1={y} x2={480} y2={y} stroke="currentColor" className="text-gray-100 dark:text-gray-700" strokeWidth="0.5" />
              <text x={35} y={y + 4} textAnchor="end" className="fill-gray-400 dark:fill-gray-500" fontSize="10">{Math.round(maxVal * frac)}</text>
            </g>
          )
        })}
        {data.map((p, i) => (
          <text key={i} x={40 + (i / Math.max(data.length - 1, 1)) * 440} y={195} textAnchor="middle" className="fill-gray-400 dark:fill-gray-500" fontSize="10">{p.date}</text>
        ))}
        {mode === 'line' && <path d={path} fill="none" stroke="rgb(168,85,247)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />}
        {mode === 'line' && data.map((p, i) => (
          <circle key={i} cx={40 + (i / Math.max(data.length - 1, 1)) * 440} cy={20 + (1 - p.value / maxVal) * 150} r="3" fill="rgb(168,85,247)" className="cursor-pointer">
            <title>{`${p.date}: ${p.value}`}</title>
          </circle>
        ))}
        {mode === 'bar' && barData.map((b) => (
          <rect key={b.label} x={b.x} y={170 - b.h} width={b.w} height={b.h} rx="2" fill="rgb(168,85,247)" className="cursor-pointer">
            <title>{`${b.label}: ${b.value}`}</title>
          </rect>
        ))}
      </svg>
    </div>
  )
}
