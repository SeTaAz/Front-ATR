import React from 'react'

export default function ChartCard({ icon: Icon, title, description, children, className = '' }) {
  return (
    <section className={`min-w-0 rounded-2xl border border-slate-300 bg-white p-5 shadow-md md:p-6 ${className}`}>
      <div className="mb-5 flex items-start gap-2.5">
        <Icon className="mt-0.5 shrink-0 text-lg text-emerald-700" aria-hidden="true" />
        <div>
          <h2 className="font-bold text-slate-800">{title}</h2>
          {description && <p className="mt-1 text-xs text-slate-500">{description}</p>}
        </div>
      </div>
      {children}
    </section>
  )
}
