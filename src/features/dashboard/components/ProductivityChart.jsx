import React from 'react'
import { FiUsers } from 'react-icons/fi'
import ChartCard from './ChartCard'

const colors = ['#07845f', '#5b677e', '#cfe0ff', '#8cc540']

const formatHours = (hours) => `${new Intl.NumberFormat('es', { maximumFractionDigits: 1 }).format(hours)} hrs`

export default function ProductivityChart({ data }) {
  const totalHours = data.reduce((total, item) => total + item.hours, 0)
  let currentPercentage = 0
  const segments = data
    .filter((item) => item.hours > 0)
    .map((item) => {
      const start = currentPercentage
      currentPercentage += (item.hours / totalHours) * 100
      return `${colors[data.indexOf(item)]} ${start}% ${currentPercentage}%`
    })
  const background = totalHours
    ? `conic-gradient(${segments.join(', ')})`
    : '#e2e8f0'

  return (
    <ChartCard
      icon={FiUsers}
      title="Productividad (Hrs)"
      description="Horas de atención por tipo de servicio concluido"
    >
      <div className="grid items-center gap-6 sm:grid-cols-[minmax(190px,1fr)_minmax(130px,0.9fr)]">
        <div
          role="img"
          aria-label={`Productividad en horas: ${data.map((item) => `${item.label}: ${formatHours(item.hours)}`).join(', ')}`}
          className="mx-auto flex h-48 w-48 items-center justify-center rounded-full"
          style={{ background }}
        >
          <div className="h-36 w-36 rounded-full bg-white" aria-hidden="true" />
        </div>
        <ul className="space-y-3">
          {data.map((item, index) => (
            <li key={item.serviceType} className="flex items-start gap-2.5">
              <span
                className="mt-1 h-3.5 w-3.5 shrink-0 rounded-full"
                style={{ backgroundColor: colors[index] }}
                aria-hidden="true"
              />
              <div className="min-w-0">
                <p className="text-sm font-semibold text-slate-800">{item.label}</p>
                <p className="text-sm text-slate-500">{formatHours(item.hours)}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
      {!totalHours && <p className="mt-4 text-center text-sm text-slate-500">Sin horas registradas para estos filtros.</p>}
    </ChartCard>
  )
}
