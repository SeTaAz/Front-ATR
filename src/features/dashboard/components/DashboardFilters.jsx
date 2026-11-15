import React from 'react'
import { FiFilter, FiRotateCcw } from 'react-icons/fi'

const selectClassName = 'mt-1.5 h-10 w-full rounded-lg border border-slate-300 bg-white px-3 text-sm text-slate-700 outline-none transition focus:border-emerald-700 focus:ring-2 focus:ring-emerald-700/15'
const labelClassName = 'block text-xs font-medium text-slate-500'

function SelectFilter({ label, value, options, onChange }) {
  return (
    <label className={labelClassName}>
      {label}
      <select value={value} onChange={(event) => onChange(event.target.value)} className={selectClassName}>
        <option value="">Todos</option>
        {options.map((option) => <option key={option} value={option}>{option}</option>)}
      </select>
    </label>
  )
}

export default function DashboardFilters({
  filters,
  filterOptions,
  onPeriodChange,
  onDateChange,
  onTechnicianChange,
  onClientChange,
  onServiceTypeChange,
  onClear,
}) {
  return (
    <section aria-labelledby="dashboard-filters-heading" className="rounded-2xl border border-slate-300 bg-white p-5 shadow-md">
      <div className="mb-4 flex items-center gap-2 text-emerald-700">
        <FiFilter aria-hidden="true" />
        <h2 id="dashboard-filters-heading" className="text-sm font-bold uppercase tracking-wide text-slate-700">
          Filtros para todas las gráficas
        </h2>
      </div>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
        <label className={labelClassName}>
          Periodo
          <select
            value={filters.period}
            onChange={(event) => onPeriodChange(event.target.value)}
            className={selectClassName}
          >
            <option value="year">Este año</option>
            <option value="30days">Últimos 30 días</option>
            <option value="90days">Últimos 90 días</option>
            <option value="custom">Personalizado</option>
          </select>
        </label>
        {filters.period === 'custom' && (
          <>
            <label className={labelClassName}>
              Desde
              <input
                type="date"
                value={filters.startDate}
                max={filters.endDate}
                onChange={(event) => onDateChange('startDate', event.target.value)}
                className={selectClassName}
              />
            </label>
            <label className={labelClassName}>
              Hasta
              <input
                type="date"
                value={filters.endDate}
                min={filters.startDate}
                onChange={(event) => onDateChange('endDate', event.target.value)}
                className={selectClassName}
              />
            </label>
          </>
        )}
        <SelectFilter label="Técnico" value={filters.technician} options={filterOptions.technicians} onChange={onTechnicianChange} />
        <SelectFilter label="Cliente" value={filters.client} options={filterOptions.clients} onChange={onClientChange} />
        <SelectFilter label="Tipo de servicio" value={filters.serviceType} options={filterOptions.serviceTypes} onChange={onServiceTypeChange} />
        <button
          type="button"
          onClick={onClear}
          className="mt-auto flex h-10 items-center justify-center gap-2 rounded-lg border border-slate-300 px-3 text-sm font-medium text-slate-600 transition hover:border-emerald-700 hover:bg-emerald-50 hover:text-emerald-800 focus:outline-none focus:ring-2 focus:ring-emerald-700/20"
        >
          <FiRotateCcw aria-hidden="true" />
          Limpiar filtros
        </button>
      </div>
    </section>
  )
}
