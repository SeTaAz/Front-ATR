import React from 'react'
import { FiActivity } from 'react-icons/fi'
import ChartCard from './ChartCard'

const chartWidth = 760
const chartHeight = 250
const leftPadding = 44
const rightPadding = 44
const topPadding = 16
const bottomPadding = 34

export default function CompletedServicesChart({ data }) {
  const plotWidth = chartWidth - leftPadding - rightPadding
  const plotHeight = chartHeight - topPadding - bottomPadding
  const countMax = Math.max(...data.map((item) => item.count), 1) * 1.2
  const hoursMax = Math.max(...data.map((item) => item.averageHours), 1) * 1.2
  const points = data.map((item, index) => {
    const x = data.length === 1
      ? leftPadding + plotWidth / 2
      : leftPadding + (index / (data.length - 1)) * plotWidth
    return {
      ...item,
      x,
      serviceY: topPadding + plotHeight - (item.count / countMax) * plotHeight,
      hoursY: topPadding + plotHeight - (item.averageHours / hoursMax) * plotHeight,
    }
  })
  const areaPath = points.length
    ? `M ${points[0].x} ${topPadding + plotHeight} ${points.map((point) => `L ${point.x} ${point.hoursY}`).join(' ')} L ${points[points.length - 1].x} ${topPadding + plotHeight} Z`
    : ''
  const latest = data[data.length - 1]

  return (
    <ChartCard
      icon={FiActivity}
      title="Servicios y tiempo de atención"
      description="Servicios concluidos y promedio de horas por mes"
    >
      {data.length ? (
        <div>
          <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
            <p className="text-sm text-slate-500">
              {latest.label}: <strong className="text-slate-800">{latest.count} servicios</strong>
              <span className="mx-1.5">·</span>
              promedio <strong className="text-slate-800">{latest.averageHours.toFixed(1)} h</strong>
            </p>
            <div className="flex flex-wrap gap-x-4 gap-y-2 text-xs text-slate-600">
              <span className="inline-flex items-center gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-700" aria-hidden="true" />
                Servicios concluidos
              </span>
              <span className="inline-flex items-center gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-slate-400" aria-hidden="true" />
                Tiempo promedio (h)
              </span>
            </div>
          </div>
          <div
            role="img"
            aria-label={`Servicios concluidos y tiempo promedio por mes: ${data.map((item) => `${item.label}: ${item.count} servicios, ${item.averageHours.toFixed(1)} horas`).join('; ')}`}
          >
            <svg viewBox={`0 0 ${chartWidth} ${chartHeight}`} className="h-60 w-full" preserveAspectRatio="none">
              {[0, 1, 2, 3].map((line) => {
                const y = topPadding + (plotHeight / 3) * line
                const countLabel = Math.round(countMax * (1 - line / 3))
                const hoursLabel = (hoursMax * (1 - line / 3)).toFixed(1)
                return (
                  <g key={line}>
                    <line x1={leftPadding} x2={chartWidth - rightPadding} y1={y} y2={y} stroke="#dbe4f0" strokeDasharray="3 4" />
                    <text x={leftPadding - 8} y={y + 4} textAnchor="end" fill="#64748b" fontSize="10">{countLabel}</text>
                    <text x={chartWidth - rightPadding + 8} y={y + 4} textAnchor="start" fill="#64748b" fontSize="10">{hoursLabel}h</text>
                  </g>
                )
              })}
              <path d={areaPath} fill="#94a3b8" fillOpacity="0.4" />
              {points.length > 1 && (
                <polyline
                  points={points.map((point) => `${point.x},${point.serviceY}`).join(' ')}
                  fill="none"
                  stroke="#07845f"
                  strokeWidth="3"
                  strokeLinejoin="round"
                  strokeLinecap="round"
                />
              )}
              {points.map((point) => (
                <g key={point.month}>
                  <circle cx={point.x} cy={point.serviceY} r="5" fill="#07845f" stroke="white" strokeWidth="2" />
                  <circle cx={point.x} cy={point.hoursY} r="3" fill="#64748b">
                    <title>{`${point.label}: promedio ${point.averageHours.toFixed(1)} horas`}</title>
                  </circle>
                  <text x={point.x} y={chartHeight - 8} textAnchor="middle" fill="#64748b" fontSize="10" className="capitalize">
                    {point.label}
                  </text>
                </g>
              ))}
            </svg>
          </div>
        </div>
      ) : <p className="py-16 text-center text-sm text-slate-500">Sin servicios en el periodo seleccionado.</p>}
    </ChartCard>
  )
}
