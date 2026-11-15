import React, { useEffect, useRef, useState } from 'react'
import { FiChevronDown, FiDownload, FiFileText, FiGrid } from 'react-icons/fi'
import { exportServiceReportExcel, exportServiceReportPdf } from '../services/dashboardExportService'

export default function ReportExportActions({ report }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [error, setError] = useState('')
  const [isExporting, setIsExporting] = useState(false)
  const menuRef = useRef(null)

  useEffect(() => {
    if (!isMenuOpen) return undefined

    const closeOnOutsideClick = (event) => {
      if (!menuRef.current?.contains(event.target)) setIsMenuOpen(false)
    }
    const closeOnEscape = (event) => {
      if (event.key === 'Escape') setIsMenuOpen(false)
    }

    document.addEventListener('pointerdown', closeOnOutsideClick)
    document.addEventListener('keydown', closeOnEscape)
    return () => {
      document.removeEventListener('pointerdown', closeOnOutsideClick)
      document.removeEventListener('keydown', closeOnEscape)
    }
  }, [isMenuOpen])

  const handleExport = async (exporter) => {
    try {
      setError('')
      setIsExporting(true)
      await exporter(report)
    } catch (exportError) {
      console.error('No se pudo exportar el reporte de servicios:', exportError)
      setError('No fue posible generar el archivo. Intenta nuevamente.')
    } finally {
      setIsExporting(false)
    }
  }

  const selectFormat = (exporter) => {
    setIsMenuOpen(false)
    handleExport(exporter)
  }

  return (
    <div ref={menuRef} className="relative">
      <button
        type="button"
        disabled={isExporting}
        aria-haspopup="true"
        aria-expanded={isMenuOpen}
        aria-controls="dashboard-export-menu"
        onClick={() => setIsMenuOpen((isOpen) => !isOpen)}
        className="inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-emerald-700 px-4 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-800 disabled:cursor-wait disabled:opacity-70 focus:outline-none focus:ring-2 focus:ring-emerald-700 focus:ring-offset-2"
      >
        <FiDownload aria-hidden="true" />
        <span>{isExporting ? 'Preparando...' : 'Exportar reporte'}</span>
        <FiChevronDown aria-hidden="true" className={`transition-transform ${isMenuOpen ? 'rotate-180' : ''}`} />
      </button>
      {isMenuOpen && (
        <div
          id="dashboard-export-menu"
          role="group"
          aria-label="Opciones de exportación"
          className="absolute right-0 z-30 mt-2 w-72 overflow-hidden rounded-xl border border-slate-300 bg-white p-1.5 shadow-lg"
        >
        <button
          type="button"
          disabled={isExporting}
          onClick={() => selectFormat(exportServiceReportExcel)}
          className="flex w-full items-start gap-3 rounded-lg px-3 py-2.5 text-left transition hover:bg-emerald-50 disabled:opacity-60 focus:outline-none focus:ring-2 focus:ring-emerald-700"
        >
          <FiGrid aria-hidden="true" className="mt-0.5 shrink-0 text-lg text-emerald-700" />
          <span>
            <span className="block text-sm font-semibold text-slate-800">Excel</span>
            <span className="mt-0.5 block text-xs text-slate-500">Servicios, ventas, clientes y productividad técnica</span>
          </span>
        </button>
        <button
          type="button"
          disabled={isExporting}
          onClick={() => selectFormat(exportServiceReportPdf)}
          className="flex w-full items-start gap-3 rounded-lg px-3 py-2.5 text-left transition hover:bg-emerald-50 disabled:opacity-60 focus:outline-none focus:ring-2 focus:ring-emerald-700"
        >
          <FiFileText aria-hidden="true" className="mt-0.5 shrink-0 text-lg text-emerald-700" />
          <span>
            <span className="block text-sm font-semibold text-slate-800">PDF</span>
            <span className="mt-0.5 block text-xs text-slate-500">Métricas y reportes individuales listos para imprimir</span>
          </span>
        </button>
        </div>
      )}
      {error && <p role="alert" className="mt-2 text-xs text-red-700">{error}</p>}
    </div>
  )
}
