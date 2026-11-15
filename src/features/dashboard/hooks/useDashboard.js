import { useMemo, useState } from 'react'
import {
  dashboardFilterOptions,
  demoServices,
  failureCategories,
  serviceZones,
} from '../services/dashboardService'

const toLocalDateString = (date) => {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

const getPeriodDates = (period) => {
  const today = new Date()
  const endDate = toLocalDateString(today)
  const start = new Date(today)

  if (period === 'year') {
    return { startDate: toLocalDateString(new Date(today.getFullYear(), 0, 1)), endDate }
  }

  start.setDate(today.getDate() - (period === '30days' ? 29 : 89))
  return { startDate: toLocalDateString(start), endDate }
}

const getMonthKey = (dateString) => dateString.slice(0, 7)

const formatMonth = (monthKey) => {
  const [year, month] = monthKey.split('-').map(Number)
  return new Intl.DateTimeFormat('es', { month: 'short' }).format(new Date(year, month - 1, 1))
}

const getSalesPeriodKey = (date, grouping) => {
  if (grouping === 'year') return date.slice(0, 4)
  if (grouping === 'month') return date.slice(0, 7)

  const weekStart = new Date(`${date}T12:00:00`)
  weekStart.setDate(weekStart.getDate() - ((weekStart.getDay() + 6) % 7))
  return toLocalDateString(weekStart)
}

const formatSalesPeriod = (key, grouping) => {
  if (grouping === 'year') return key
  const date = new Date(`${key}${grouping === 'month' ? '-01' : ''}T12:00:00`)
  if (grouping === 'month') {
    return new Intl.DateTimeFormat('es-CO', { month: 'short', year: '2-digit' }).format(date)
  }
  return new Intl.DateTimeFormat('es-CO', { day: '2-digit', month: 'short' }).format(date)
}

export default function useDashboard() {
  const [period, setPeriod] = useState('year')
  const [dates, setDates] = useState(() => getPeriodDates('year'))
  const [technician, setTechnician] = useState('')
  const [client, setClient] = useState('')
  const [serviceType, setServiceType] = useState('')
  const [salesGrouping, setSalesGrouping] = useState('month')

  const filters = useMemo(() => ({
    period,
    ...dates,
    technician,
    client,
    serviceType,
  }), [period, dates, technician, client, serviceType])

  const filteredServices = useMemo(() => demoServices.filter((service) => (
    service.date >= dates.startDate
    && service.date <= dates.endDate
    && (!technician || service.technician === technician)
    && (!client || service.client === client)
    && (!serviceType || service.serviceType === serviceType)
  )), [dates, technician, client, serviceType])

  const completedServices = useMemo(
    () => filteredServices.filter((service) => service.status === 'Concluido'),
    [filteredServices],
  )

  const metrics = useMemo(() => {
    const total = completedServices.length
    const averageHours = total
      ? completedServices.reduce((sum, service) => sum + service.durationHours, 0) / total
      : 0
    const failures = completedServices.reduce((counts, service) => {
      counts[service.failureType] = (counts[service.failureType] || 0) + 1
      return counts
    }, {})
    const topFailure = Object.entries(failures).sort((a, b) => b[1] - a[1])[0]

    return {
      total,
      averageHours,
      topFailure: topFailure ? { name: topFailure[0], count: topFailure[1] } : null,
    }
  }, [completedServices])

  const chartData = useMemo(() => {
    const monthly = completedServices.reduce((groups, service) => {
      const month = getMonthKey(service.date)
      if (!groups[month]) {
        groups[month] = { month, label: formatMonth(month), count: 0, totalHours: 0 }
      }
      groups[month].count += 1
      groups[month].totalHours += service.durationHours
      return groups
    }, {})
    const months = Object.values(monthly).sort((a, b) => a.month.localeCompare(b.month))
    const failureCounts = completedServices.reduce((counts, service) => {
      counts[service.failureType] = (counts[service.failureType] || 0) + 1
      return counts
    }, {})
    const productivityHours = completedServices.reduce((totals, service) => {
      totals[service.serviceType] = (totals[service.serviceType] || 0) + service.durationHours
      return totals
    }, {})
    const heatmapCounts = completedServices.reduce((counts, service) => {
      const key = `${service.failureCategory}:${service.zone}`
      counts[key] = (counts[key] || 0) + 1
      return counts
    }, {})
    const categoryCounts = completedServices.reduce((counts, service) => {
      counts[service.failureCategory] = (counts[service.failureCategory] || 0) + 1
      return counts
    }, {})
    const totalFailures = completedServices.length
    const clientSummary = filteredServices.reduce((clients, service) => {
      if (!clients[service.client]) {
        clients[service.client] = { name: service.client, serviceCount: 0, billedAmount: 0 }
      }

      clients[service.client].serviceCount += 1
      if (service.status === 'Concluido') {
        clients[service.client].billedAmount += service.billingAmount
      }
      return clients
    }, {})
    const sales = completedServices.reduce((groups, service) => {
      const key = getSalesPeriodKey(service.date, salesGrouping)
      if (!groups[key]) {
        groups[key] = {
          key,
          label: formatSalesPeriod(key, salesGrouping),
          income: 0,
          cost: 0,
        }
      }
      groups[key].income += service.billingAmount
      groups[key].cost += service.costAmount
      return groups
    }, {})
    const technicianTotals = completedServices.reduce((totals, service) => {
      if (!totals[service.technician]) {
        totals[service.technician] = {
          name: service.technician,
          fieldHours: 0,
          appointmentsAttended: 0,
          satisfactionTotal: 0,
        }
      }

      totals[service.technician].fieldHours += service.durationHours
      totals[service.technician].appointmentsAttended += 1
      totals[service.technician].satisfactionTotal += service.satisfactionRating
      return totals
    }, {})

    return {
      monthlyServices: months.map((month) => ({
        ...month,
        averageHours: month.count ? month.totalHours / month.count : 0,
      })),
      commonFailures: Object.entries(failureCounts)
        .map(([name, count]) => ({ name, count }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 6),
      productivity: dashboardFilterOptions.serviceTypes.map((serviceType) => ({
        serviceType,
        label: serviceType.replace('Mantenimiento ', ''),
        hours: Number((productivityHours[serviceType] || 0).toFixed(1)),
      })),
      failureHeatmap: failureCategories.map((category) => ({
        category,
        zones: serviceZones.map((zone) => ({
          zone,
          count: heatmapCounts[`${category}:${zone}`] || 0,
        })),
      })),
      failureCategorySummary: failureCategories.map((category) => {
        const count = categoryCounts[category] || 0
        return {
          category,
          count,
          percentage: totalFailures ? Math.round((count / totalFailures) * 100) : 0,
        }
      }),
      topClients: Object.values(clientSummary)
        .sort((a, b) => b.serviceCount - a.serviceCount || b.billedAmount - a.billedAmount)
        .slice(0, 10),
      salesPerformance: Object.values(sales).sort((a, b) => a.key.localeCompare(b.key)),
      technicianProductivity: Object.values(technicianTotals)
        .map((technician) => ({
          ...technician,
          fieldHours: Number(technician.fieldHours.toFixed(1)),
          averageSatisfaction: Number((technician.satisfactionTotal / technician.appointmentsAttended).toFixed(1)),
        }))
        .sort((a, b) => b.fieldHours - a.fieldHours),
    }
  }, [completedServices, filteredServices, salesGrouping])

  const setPeriodFilter = (nextPeriod) => {
    setPeriod(nextPeriod)
    if (nextPeriod !== 'custom') {
      setDates(getPeriodDates(nextPeriod))
    }
  }

  const setDateFilter = (field, value) => {
    if (!value) return
    setPeriod('custom')
    setDates((current) => {
      const next = { ...current, [field]: value }
      if (next.startDate > next.endDate) {
        next[field === 'startDate' ? 'endDate' : 'startDate'] = value
      }
      return next
    })
  }

  const clearFilters = () => {
    setPeriod('year')
    setDates(getPeriodDates('year'))
    setTechnician('')
    setClient('')
    setServiceType('')
  }

  return {
    filters,
    salesGrouping,
    setSalesGrouping,
    filterOptions: dashboardFilterOptions,
    filteredServices,
    completedServices,
    metrics,
    chartData,
    setPeriodFilter,
    setDateFilter,
    setTechnician,
    setClient,
    setServiceType,
    clearFilters,
  }
}