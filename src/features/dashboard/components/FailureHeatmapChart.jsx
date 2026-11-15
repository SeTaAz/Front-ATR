import React from 'react'
import { FiTool } from 'react-icons/fi'
import ChartCard from './ChartCard'

const categoryColors = {
  Electrónica: 'bg-red-700',
  Mecánica: 'bg-emerald-700',
  Fuga: 'bg-slate-600',
}

const getCellStyle = (count, maximum) => {
  if (!count) return 'bg-slate-100 text-slate-400'
  const ratio = count / maximum
  if (ratio >= 0.75) return 'bg-red-700 text-white'
  if (ratio >= 0.5) return 'bg-rose-200 text-rose-800'
  return 'bg-blue-200 text-slate-700'
}

export default function FailureHeatmapChart({ data, summary }) {
  const zones = data[0]?.zones.map((item) => item.zone) || []
  const maximum = Math.max(...data.flatMap((row) => row.zones.map((item) => item.count)), 0)

  return (
    <ChartCard
      icon={FiTool}
      title="Mapa de Calor de Fallas"
      description="Frecuencia de fallas por categoría y zona"
    >
      <div className="overflow-x-auto">
        <table className="w-full min-w-[560px] border-separate border-spacing-x-2 border-spacing-y-2 text-sm">
          <thead>
            <tr>
              <th className="w-1/4" aria-label="Tipo de falla" />
              {zones.map((zone) => (
                <th key={zone} className="px-2 pb-1 text-center text-xs font-medium text-slate-500">{zone}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row) => (
              <tr key={row.category}>
                <th scope="row" className="pr-2 text-left text-xs font-medium text-slate-500">{row.category}</th>
                {row.zones.map((cell) => (
                  <td key={cell.zone} className="p-0">
                    <div className={`flex h-9 items-center justify-center rounded-lg font-bold ${getCellStyle(cell.count, maximum)}`}>
                      {cell.count}
                    </div>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="my-5 border-t border-slate-200" />
      <h3 className="mb-4 text-xs font-bold uppercase tracking-wide text-slate-500">Tipos de fallas frecuentes</h3>
      <ul className="space-y-3">
        {summary.map((item) => (
          <li key={item.category} className="grid grid-cols-[84px_minmax(0,1fr)_36px] items-center gap-3 text-xs">
            <span className="text-slate-600">{item.category}</span>
            <div className="h-2 overflow-hidden rounded-full bg-blue-100">
              <div
                className={`h-full rounded-full ${categoryColors[item.category]}`}
                style={{ width: `${item.percentage}%` }}
                aria-hidden="true"
              />
            </div>
            <span className="text-right text-slate-500">{item.percentage}%</span>
          </li>
        ))}
      </ul>
      {!maximum && <p className="mt-4 text-center text-sm text-slate-500">Sin fallas registradas para estos filtros.</p>}
    </ChartCard>
  )
}
