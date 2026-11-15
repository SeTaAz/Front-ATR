import React from 'react'

export default function ServiceMetricCard({ icon: Icon, label, value, detail }) {
  return (
    <article className="flex min-w-0 items-start gap-4 rounded-2xl border border-slate-300 bg-white p-5 shadow-md">
      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-xl text-emerald-700">
        <Icon aria-hidden="true" />
      </span>
      <div className="min-w-0">
        <p className="text-sm font-medium text-slate-500">{label}</p>
        <p className="mt-1 truncate text-2xl font-extrabold tracking-tight text-slate-800">{value}</p>
        <p className="mt-1 text-xs text-slate-400">{detail}</p>
      </div>
    </article>
  )
}
