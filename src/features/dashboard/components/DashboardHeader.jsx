import React from 'react'
import { FiBell, FiUser } from 'react-icons/fi'

export default function DashboardHeader() {
  return (
    <header className="flex items-center justify-between border-b border-slate-200 bg-white px-5 py-4 md:px-8">
      <div className="flex min-w-0 items-center gap-3">
        <span className="text-sm font-extrabold tracking-[0.16em] text-emerald-800">ATR</span>
        <span className="hidden h-6 border-l border-slate-300 sm:block" aria-hidden="true" />
        <p className="truncate text-sm font-medium text-slate-600">Control y Confiabilidad Industrial</p>
      </div>
      <div className="ml-4 flex shrink-0 items-center gap-1 text-slate-500">
        <button type="button" aria-label="Notificaciones" className="rounded-full p-2.5 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-700">
          <FiBell aria-hidden="true" />
        </button>
        <button type="button" aria-label="Perfil de administrador" className="rounded-full p-2.5 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-700">
          <FiUser aria-hidden="true" />
        </button>
      </div>
    </header>
  )
}
