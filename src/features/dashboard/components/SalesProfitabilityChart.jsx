import React from 'react'
import { FiTrendingUp } from 'react-icons/fi'
import ChartCard from './ChartCard'

const chartWidth = 760
const chartHeight = 250
const leftPadding = 76
const rightPadding = 20
const topPadding = 18
const bottomPadding = 38

const formatCurrency = (amount) => new Intl.NumberFormat('es-CO', {
  style: 'currency',
  currency: 'COP',
  maximumFractionDigits: 0,
}).format(amount)

const formatCompactCurrency = (amount) => new Intl.NumberFormat('es-CO', {
  style: 'currency',
  currency: 'COP',
  notation: 'compact',
  maximumFractionDigits: 1,
}).format(amount)

export default function SalesProfitabilityChart({ data, grouping, onGroupingChange }) {
  const totalIncome = data.reduce((total, item) => total + item.income, 0)
  const totalCosts = data.reduce((total, item) => total + item.cost, 0)
  const maxValue = Math.max(...data.flatMap((item) => [item.income, item.cost]), 1) * 1.15
  const plotWidth = chartWidth - leftPadding - rightPadding
  const plotHeight = chartHeight - topPadding - bottomPadding
  const points = data.map((item, index) => {
    const x = data.length === 1
      ? leftPadding + plotWidth / 2
      : leftPadding + (index / (data.length - 1)) * plotWidth
    return {
      ...item,
      x,
      incomeY: topPadding + plotHeight - (item.income / maxValue) * plotHeight,
      costY: topPadding + plotHeight - (item.cost / maxValue) * plotHeight,
    }
  })
  const labelStep = Math.max(1, Math.ceil(points.length / 7))

  return (
    <ChartCard
      icon={FiTrendingUp}
      title="Ventas: ingresos vs costos"
      description="Comparativo de rentabilidad en servicios concluidos"
      className="h-full"
    >
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap gap-x-4 gap-y-2 text-xs text-slate-600">
          <span className="inline-flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-700" aria-hidden="true" />
            Ingresos
          </span>
          <span className="inline-flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-slate-500" aria-hidden="true" />
            Costos
          </span>
        </div>
        <label className="flex items-center gap-2 text-xs font-medium text-slate-600">
          Agrupar:
          <select
            value={grouping}
            onChange={(event) => onGroupingChange(event.target.value)}
            className="h-9 rounded-lg border border-slate-300 bg-white px-2.5 text-sm text-slate-700 outline-none focus:border-emerald-700 focus:ring-2 focus:ring-emerald-700/15"
          >
            <option value="week">Semanal</option>
            <option value="month">Mensual</option>
            <option value="year">Anual</option>
          </select>
        </label>
      </div>

      <div className="mb-4 grid grid-cols-3 gap-2 rounded-xl bg-slate-50 p-3">
        <div>
          <p className="text-[10px] font-medium uppercase tracking-wide text-slate-500">Ingresos</p>
          <p className="mt-1 truncate text-sm font-bold text-emerald-800">{formatCurrency(totalIncome)}</p>
        </div>
        <div>
          <p className="text-[10px] font-medium uppercase tracking-wide text-slate-500">Costos</p>
          <p className="mt-1 truncate text-sm font-bold text-slate-700">{formatCurrency(totalCosts)}</p>
        </div>
        <div>
          <p className="text-[10px] font-medium uppercase tracking-wide text-slate-500">Rentabilidad</p>
          <p className="mt-1 truncate text-sm font-bold text-slate-800">{formatCurrency(totalIncome - totalCosts)}</p>
        </div>
      </div>

      {points.length ? (
        <div
          role="img"
          aria-label={`Ingresos y costos ${grouping === 'week' ? 'semanales' : grouping === 'month' ? 'mensuales' : 'anuales'}: ${points.map((point) => `${point.label}, ingresos ${formatCurrency(point.income)}, costos ${formatCurrency(point.cost)}`).join('; ')}`}
        >
          <svg viewBox={`0 0 ${chartWidth} ${chartHeight}`} className="h-52 w-full" preserveAspectRatio="none">
            {[0, 1, 2, 3].map((line) => {
              const ratio = 1 - line / 3
              const y = topPadding + plotHeight * (1 - ratio)
              return (
                <g key={line}>
                  <line x1={leftPadding} x2={chartWidth - rightPadding} y1={y} y2={y} stroke="#dbe4f0" strokeDasharray="3 4" />
                  <text x={leftPadding - 8} y={y + 4} textAnchor="end" fill="#64748b" fontSize="10">
                    {formatCompactCurrency(maxValue * ratio)}
                  </text>
                </g>
              )
            })}
            {points.length > 1 && (
              <>
                <polyline
                  points={points.map((point) => `${point.x},${point.incomeY}`).join(' ')}
                  fill="none"
                  stroke="#07845f"
                  strokeWidth="3"
                  strokeLinejoin="round"
                  strokeLinecap="round"
                />
                <polyline
                  points={points.map((point) => `${point.x},${point.costY}`).join(' ')}
                  fill="none"
                  stroke="#64748b"
                  strokeWidth="3"
                  strokeLinejoin="round"
                  strokeLinecap="round"
                />
              </>
            )}
            {points.map((point, index) => (
              <g key={point.key}>
                <circle cx={point.x} cy={point.incomeY} r="4" fill="#07845f" stroke="white" strokeWidth="1.5">
                  <title>{`${point.label}: ingresos ${formatCurrency(point.income)}`}</title>
                </circle>
                <circle cx={point.x} cy={point.costY} r="4" fill="#64748b" stroke="white" strokeWidth="1.5">
                  <title>{`${point.label}: costos ${formatCurrency(point.cost)}`}</title>
                </circle>
                {(index % labelStep === 0 || index === points.length - 1) && (
                  <text x={point.x} y={chartHeight - 8} textAnchor="middle" fill="#64748b" fontSize="10">
                    {point.label}
                  </text>
                )}
              </g>
            ))}
          </svg>
        </div>
      ) : (
        <p className="py-12 text-center text-sm text-slate-500">
          Sin ventas concluidas para los filtros seleccionados.
        </p>
      )}
    </ChartCard>
  )
}
