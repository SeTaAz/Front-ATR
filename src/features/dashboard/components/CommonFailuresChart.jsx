import React from 'react'
import { FiAlertTriangle } from 'react-icons/fi'
import ChartCard from './ChartCard'

const radius = 34
const circumference = 2 * Math.PI * radius

export default function CommonFailuresChart({ data, total }) {
  const formatPercentage = (count) => (
    total ? new Intl.NumberFormat('es', { maximumFractionDigits: 1 }).format((count / total) * 100) : '0'
  )

  return (
    <ChartCard
      icon={FiAlertTriangle}
      title="Tipos de falla más comunes"
      description="Fallas registradas en servicios concluidos"
    >
      {data.length ? (
        <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3">
          {data.map((item) => (
            <li key={item.name} className="flex flex-col items-center text-center">
              <div
                role="img"
                aria-label={`${item.name}: ${item.count} fallas, ${formatPercentage(item.count)}%`}
                className="relative h-[76px] w-[76px]"
              >
                <svg viewBox="0 0 80 80" className="h-full w-full" aria-hidden="true">
                  <circle cx="40" cy="40" r={radius} fill="none" stroke="#e2e8f0" strokeWidth="7" />
                  <circle
                    cx="40"
                    cy="40"
                    r={radius}
                    fill="none"
                    stroke="#07845f"
                    strokeWidth="7"
                    strokeLinecap="round"
                    strokeDasharray={circumference}
                    strokeDashoffset={circumference * (1 - (total ? item.count / total : 0))}
                    transform="rotate(-90 40 40)"
                  />
                </svg>
                <span className="absolute inset-0 flex items-center justify-center text-lg font-bold text-slate-800">
                  {item.count}
                </span>
              </div>
              <span className="mt-2 line-clamp-2 min-h-8 text-xs font-semibold text-slate-700">{item.name}</span>
              <span className="text-[11px] text-slate-500">{formatPercentage(item.count)}%</span>
            </li>
          ))}
        </ul>
      ) : <p className="py-16 text-center text-sm text-slate-500">Sin fallas registradas en el periodo seleccionado.</p>}
    </ChartCard>
  )
}
