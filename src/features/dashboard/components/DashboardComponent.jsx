import React from 'react'
import { FiAlertTriangle, FiCheckCircle, FiClock } from 'react-icons/fi'
import CommonFailuresChart from './CommonFailuresChart'
import CompletedServicesChart from './CompletedServicesChart'
import ClientDemandChart from './ClientDemandChart'
import DashboardFilters from './DashboardFilters'
import DashboardHeader from './DashboardHeader'
import FailureHeatmapChart from './FailureHeatmapChart'
import ProductivityChart from './ProductivityChart'
import SalesProfitabilityChart from './SalesProfitabilityChart'
import ReportExportActions from './ReportExportActions'
import ServiceMetricCard from './ServiceMetricCard'
import TechnicianProductivityChart from './TechnicianProductivityChart'
import useDashboard from '../hooks/useDashboard'

export default function DashboardComponent() {
  const dashboard = useDashboard()
  const { filters, metrics, chartData, completedServices } = dashboard

  return (
    <div className="min-w-0 flex-1 bg-white">
      <DashboardHeader />
      <main className="mx-auto max-w-[1600px] space-y-5 px-4 py-6 md:px-8 md:py-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 md:text-4xl">Dashboard Resumen</h1>
          </div>
          <ReportExportActions report={{
            filters,
            metrics,
            chartData,
            salesGrouping: dashboard.salesGrouping,
            services: completedServices,
          }} />
        </div>

        <DashboardFilters
          filters={filters}
          filterOptions={dashboard.filterOptions}
          onPeriodChange={dashboard.setPeriodFilter}
          onDateChange={dashboard.setDateFilter}
          onTechnicianChange={dashboard.setTechnician}
          onClientChange={dashboard.setClient}
          onServiceTypeChange={dashboard.setServiceType}
          onClear={dashboard.clearFilters}
        />

        <section aria-label="Indicadores de servicios" className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          <ServiceMetricCard
            icon={FiCheckCircle}
            label="Servicios concluidos"
            value={metrics.total.toLocaleString('es')}
            detail="Coinciden con el periodo y filtros seleccionados"
          />
          <ServiceMetricCard
            icon={FiClock}
            label="Tiempo promedio de atención"
            value={`${metrics.averageHours.toFixed(1)} h`}
            detail="Promedio de horas por servicio concluido"
          />
          <ServiceMetricCard
            icon={FiAlertTriangle}
            label="Falla más común"
            value={metrics.topFailure?.name || 'Sin datos'}
            detail={metrics.topFailure ? `${metrics.topFailure.count} servicios concluidos` : 'Sin servicios para analizar'}
          />
        </section>

        <div className="grid gap-5 lg:grid-cols-[minmax(0,1.55fr)_minmax(300px,1fr)]">
          <CompletedServicesChart data={chartData.monthlyServices} />
          <CommonFailuresChart data={chartData.commonFailures} total={metrics.total} />
        </div>

        <div className="grid gap-5 lg:grid-cols-[minmax(280px,0.9fr)_minmax(0,1.8fr)]">
          <ProductivityChart data={chartData.productivity} />
          <FailureHeatmapChart
            data={chartData.failureHeatmap}
            summary={chartData.failureCategorySummary}
          />
        </div>

        <div className="grid items-stretch gap-5 lg:grid-cols-2">
          <ClientDemandChart data={chartData.topClients} />
          <SalesProfitabilityChart
            data={chartData.salesPerformance}
            grouping={dashboard.salesGrouping}
            onGroupingChange={dashboard.setSalesGrouping}
          />
        </div>

        <TechnicianProductivityChart data={chartData.technicianProductivity} />

        <p className="pb-2 text-center text-xs text-slate-400">
          Datos de demostración locales para validar el dashboard y sus filtros.
        </p>
      </main>
    </div>
  )
}