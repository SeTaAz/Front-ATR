import React from 'react'
import { FiUsers } from 'react-icons/fi'
import ChartCard from './ChartCard'

const formatCurrency = (amount) => new Intl.NumberFormat('es-CO', {
  style: 'currency',
  currency: 'COP',
  maximumFractionDigits: 0,
}).format(amount)

export default function ClientDemandChart({ data }) {
  return (
    <ChartCard
      icon={FiUsers}
      title="Top 10 clientes"
      description="Solicitudes del periodo y facturación de servicios concluidos (COP)"
      className="mx-auto h-full w-full max-w-4xl"
    >
      {data.length ? (
          <ol aria-label="Diez clientes con más servicios solicitados" className="grid gap-x-5 gap-y-2 sm:grid-cols-2">
            {data.map((client, index) => (
              <li
                key={client.name}
                className="grid grid-cols-[24px_minmax(0,1fr)] items-center gap-2 rounded-lg border border-slate-200 px-2.5 py-2"
              >
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-50 text-xs font-bold text-emerald-800">
                  {index + 1}
                </span>
                <div className="min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <span className="truncate text-xs font-semibold text-slate-700">{client.name}</span>
                    <span className="shrink-0 text-xs font-bold text-slate-700">{client.serviceCount}</span>
                  </div>
                  <div className="mt-1 flex items-center justify-between gap-2 text-[10px] text-slate-500">
                    <span>Solicitudes</span>
                    <span className="truncate font-medium text-slate-600">{formatCurrency(client.billedAmount)}</span>
                  </div>
                </div>
              </li>
            ))}
          </ol>
      ) : (
        <p className="py-12 text-center text-sm text-slate-500">
          No hay solicitudes de clientes para los filtros seleccionados.
        </p>
      )}
    </ChartCard>
  )
}
