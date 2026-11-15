import React from 'react'
import { FiStar, FiUsers } from 'react-icons/fi'
import ChartCard from './ChartCard'

const FIELD_HOURS_GOAL = 100

export default function TechnicianProductivityChart({ data }) {
  return (
    <ChartCard
      icon={FiUsers}
      title="Productividad de técnicos"
      description="Horas en campo, citas atendidas y satisfacción promedio por técnico"
      className="w-full"
    >
      {data.length ? (
        <ol aria-label="Reporte individual de productividad de técnicos" className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {data.map((technician, index) => {
            const achievedHours = Math.max(0, technician.fieldHours)
            const progress = Math.min((achievedHours / FIELD_HOURS_GOAL) * 100, 100)
            const percentage = Math.round((achievedHours / FIELD_HOURS_GOAL) * 100)

            return (
              <li key={technician.name} className="rounded-xl border border-slate-200 p-3">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex min-w-0 items-center gap-2">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-xs font-bold text-emerald-800">
                      {index + 1}
                    </span>
                    <span className="truncate text-sm font-semibold text-slate-800">{technician.name}</span>
                  </div>
                  <span className="shrink-0 text-xs font-bold text-emerald-800">{technician.fieldHours.toFixed(1)} h</span>
                </div>
                <div className="mt-2 flex items-center justify-between gap-2 text-[11px] text-slate-500">
                  <span>Meta: {FIELD_HOURS_GOAL} h</span>
                  <span>{percentage >= 100 ? 'Meta alcanzada' : `${percentage}%`}</span>
                </div>
                <div
                  className="mt-1 h-2 overflow-hidden rounded-full bg-slate-100"
                  role="progressbar"
                  aria-label={`Progreso hacia la meta de horas de ${technician.name}`}
                  aria-valuemin={0}
                  aria-valuemax={FIELD_HOURS_GOAL}
                  aria-valuenow={Math.min(achievedHours, FIELD_HOURS_GOAL)}
                  aria-valuetext={`${technician.fieldHours.toFixed(1)} de ${FIELD_HOURS_GOAL} horas`}
                >
                  <div
                    className="h-full rounded-full bg-emerald-700"
                    style={{ width: `${progress}%` }}
                    aria-hidden="true"
                  />
                </div>
                <div className="mt-3 grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <p className="text-slate-500">Citas atendidas</p>
                    <p className="mt-0.5 font-semibold text-slate-700">{technician.appointmentsAttended}</p>
                  </div>
                  <div>
                    <p className="text-slate-500">Satisfacción promedio</p>
                    <p className="mt-0.5 flex items-center gap-1 font-semibold text-slate-700">
                      <FiStar className="text-amber-500" aria-hidden="true" />
                      {technician.averageSatisfaction.toFixed(1)} / 5
                    </p>
                  </div>
                </div>
              </li>
            )
          })}
        </ol>
      ) : (
        <p className="py-12 text-center text-sm text-slate-500">
          No hay citas atendidas para los filtros seleccionados.
        </p>
      )}
    </ChartCard>
  )
}
