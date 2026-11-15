const getPeriodLabel = (filters) => `${filters.startDate} - ${filters.endDate}`

const getActiveFilters = (filters) => ({
  Periodo: getPeriodLabel(filters),
  Técnico: filters.technician || 'Todos',
  Cliente: filters.client || 'Todos',
  'Tipo de servicio': filters.serviceType || 'Todos',
})

const getFileName = (filters, extension) => `reporte-servicios-${filters.startDate}-${filters.endDate}.${extension}`

const formatBilling = (amount) => new Intl.NumberFormat('es-CO', {
  maximumFractionDigits: 0,
}).format(amount)

const getSalesGroupingLabel = (grouping) => ({
  week: 'Semanal',
  month: 'Mensual',
  year: 'Anual',
}[grouping] || 'Mensual')

export async function exportServiceReportExcel({ filters, metrics, chartData, salesGrouping, services }) {
  const XLSX = await import('xlsx')
  const workbook = XLSX.utils.book_new()
  const totalIncome = chartData.salesPerformance.reduce((total, item) => total + item.income, 0)
  const totalCosts = chartData.salesPerformance.reduce((total, item) => total + item.cost, 0)
  const summaryRows = [
    ['Reporte de servicios concluidos'],
    ...Object.entries(getActiveFilters(filters)),
    ['Agrupamiento de ventas', getSalesGroupingLabel(salesGrouping)],
    [],
    ['Indicador', 'Resultado'],
    ['Servicios concluidos', metrics.total],
    ['Tiempo promedio de atención (horas)', Number(metrics.averageHours.toFixed(2))],
    ['Ingresos acumulados (COP)', totalIncome],
    ['Costos acumulados (COP)', totalCosts],
    ['Rentabilidad acumulada (COP)', totalIncome - totalCosts],
    [],
    ['Fallas más comunes', 'Cantidad'],
    ...chartData.commonFailures.map((failure) => [failure.name, failure.count]),
    [],
    ['Servicios concluidos por mes', 'Cantidad', 'Tiempo promedio (horas)'],
    ...chartData.monthlyServices.map((item) => [
      `${item.label} ${item.month.slice(0, 4)}`,
      item.count,
      Number(item.averageHours.toFixed(2)),
    ]),
  ]
  const summarySheet = XLSX.utils.aoa_to_sheet(summaryRows)
  summarySheet['!cols'] = [{ wch: 36 }, { wch: 32 }, { wch: 28 }]
  XLSX.utils.book_append_sheet(workbook, summarySheet, 'Resumen')

  const serviceHeaders = [
    'Fecha de cierre',
    'Cliente',
    'Técnico',
    'Tipo de servicio',
    'Tipo de falla',
    'Tiempo de atención (horas)',
    'Estado',
  ]
  const serviceRows = services.map((service) => [
    service.date,
    service.client,
    service.technician,
    service.serviceType,
    service.failureType,
    service.durationHours,
    service.status,
  ])
  const serviceSheet = XLSX.utils.aoa_to_sheet([serviceHeaders, ...serviceRows])
  serviceSheet['!cols'] = [{ wch: 16 }, { wch: 25 }, { wch: 22 }, { wch: 30 }, { wch: 28 }, { wch: 30 }, { wch: 16 }]
  XLSX.utils.book_append_sheet(workbook, serviceSheet, 'Servicios')

  const clientRows = [
    ['Posición', 'Cliente', 'Servicios solicitados', 'Facturación de servicios concluidos (COP)'],
    ...chartData.topClients.map((client, index) => [
      index + 1,
      client.name,
      client.serviceCount,
      client.billedAmount,
    ]),
  ]
  const clientSheet = XLSX.utils.aoa_to_sheet(clientRows)
  clientSheet['!cols'] = [{ wch: 12 }, { wch: 30 }, { wch: 24 }, { wch: 42 }]
  XLSX.utils.book_append_sheet(workbook, clientSheet, 'Top clientes')

  const technicianRows = [
    ['Técnico', 'Horas trabajadas en campo', 'Citas atendidas', 'Satisfacción promedio (1-5)'],
    ...chartData.technicianProductivity.map((technician) => [
      technician.name,
      technician.fieldHours,
      technician.appointmentsAttended,
      technician.averageSatisfaction,
    ]),
  ]
  const technicianSheet = XLSX.utils.aoa_to_sheet(technicianRows)
  technicianSheet['!cols'] = [{ wch: 26 }, { wch: 28 }, { wch: 20 }, { wch: 30 }]
  XLSX.utils.book_append_sheet(workbook, technicianSheet, 'Productividad técnicos')

  const salesRows = [
    ['Periodo', 'Ingresos (COP)', 'Costos (COP)', 'Rentabilidad (COP)'],
    ...chartData.salesPerformance.map((item) => [
      item.label,
      item.income,
      item.cost,
      item.income - item.cost,
    ]),
  ]
  const salesSheet = XLSX.utils.aoa_to_sheet(salesRows)
  salesSheet['!cols'] = [{ wch: 20 }, { wch: 22 }, { wch: 22 }, { wch: 24 }]
  XLSX.utils.book_append_sheet(workbook, salesSheet, 'Ventas')
  XLSX.writeFile(workbook, getFileName(filters, 'xlsx'))
}

export async function exportServiceReportPdf({ filters, metrics, chartData, salesGrouping, services }) {
  const { jsPDF } = await import('jspdf')
  const pdf = new jsPDF({ orientation: 'landscape', unit: 'mm', format: 'a4' })
  const pageWidth = pdf.internal.pageSize.getWidth()
  const pageHeight = pdf.internal.pageSize.getHeight()
  const margin = 14
  let y = 16

  const addTableHeader = () => {
    const headers = [
      { label: 'Fecha', x: margin, width: 25 },
      { label: 'Cliente', x: margin + 25, width: 47 },
      { label: 'Técnico', x: margin + 72, width: 37 },
      { label: 'Servicio', x: margin + 109, width: 54 },
      { label: 'Falla', x: margin + 163, width: 68 },
      { label: 'Horas', x: margin + 231, width: 25 },
    ]
    pdf.setFillColor(236, 245, 240)
    pdf.rect(margin, y - 5, pageWidth - margin * 2, 9, 'F')
    pdf.setFont('helvetica', 'bold')
    pdf.setFontSize(8)
    pdf.setTextColor(31, 74, 42)
    headers.forEach((header) => pdf.text(header.label, header.x + 1, y))
    y += 9
    pdf.setFont('helvetica', 'normal')
    pdf.setTextColor(51, 65, 85)
    return headers
  }

  pdf.setFont('helvetica', 'bold')
  pdf.setFontSize(18)
  pdf.setTextColor(31, 74, 42)
  pdf.text('Reporte de servicios y rentabilidad', margin, y)
  y += 9
  pdf.setFont('helvetica', 'normal')
  pdf.setFontSize(9)
  pdf.setTextColor(71, 85, 105)
  pdf.text(`Periodo: ${getPeriodLabel(filters)}`, margin, y)
  pdf.text(`Técnico: ${filters.technician || 'Todos'}   Cliente: ${filters.client || 'Todos'}   Servicio: ${filters.serviceType || 'Todos'}`, margin, y + 5)
  y += 14

  pdf.setFont('helvetica', 'bold')
  pdf.setFontSize(10)
  pdf.setTextColor(31, 41, 55)
  pdf.text(`Servicios concluidos: ${metrics.total}`, margin, y)
  pdf.text(`Tiempo promedio: ${metrics.averageHours.toFixed(1)} horas`, margin + 70, y)
  pdf.text(`Falla más común: ${metrics.topFailure?.name || 'Sin datos'} (${metrics.topFailure?.count || 0})`, margin + 165, y)
  y += 10

  const salesTotals = chartData.salesPerformance.reduce((totals, item) => ({
    income: totals.income + item.income,
    costs: totals.costs + item.cost,
  }), { income: 0, costs: 0 })
  const addSalesHeader = () => {
    pdf.setFont('helvetica', 'bold')
    pdf.setFontSize(11)
    pdf.setTextColor(31, 74, 42)
    pdf.text(`Ingresos vs costos · agrupamiento ${getSalesGroupingLabel(salesGrouping).toLowerCase()}`, margin, y)
    y += 7
    pdf.setFontSize(8)
    pdf.setTextColor(71, 85, 105)
    pdf.text(`Ingresos: $${formatBilling(salesTotals.income)} COP`, margin, y)
    pdf.text(`Costos: $${formatBilling(salesTotals.costs)} COP`, margin + 88, y)
    pdf.text(`Rentabilidad: $${formatBilling(salesTotals.income - salesTotals.costs)} COP`, margin + 170, y)
    y += 7
    pdf.setFillColor(236, 245, 240)
    pdf.rect(margin, y - 4, pageWidth - margin * 2, 7, 'F')
    pdf.setFontSize(8)
    pdf.setTextColor(31, 74, 42)
    pdf.text('Periodo', margin + 1, y)
    pdf.text('Ingresos (COP)', margin + 72, y)
    pdf.text('Costos (COP)', margin + 145, y)
    pdf.text('Rentabilidad (COP)', margin + 214, y)
    y += 7
    pdf.setFont('helvetica', 'normal')
    pdf.setTextColor(51, 65, 85)
  }

  if (chartData.salesPerformance.length) {
    addSalesHeader()
    chartData.salesPerformance.forEach((item) => {
      if (y + 5 > pageHeight - 12) {
        pdf.addPage()
        y = 16
        addSalesHeader()
      }
      pdf.text(item.label, margin + 1, y)
      pdf.text(`$${formatBilling(item.income)}`, margin + 72, y)
      pdf.text(`$${formatBilling(item.cost)}`, margin + 145, y)
      pdf.text(`$${formatBilling(item.income - item.cost)}`, margin + 214, y)
      y += 5
    })
    y += 6
  }

  const failureSummary = chartData.commonFailures.length
    ? `Fallas más comunes: ${chartData.commonFailures.map((failure) => `${failure.name} (${failure.count})`).join(' · ')}`
    : 'Fallas más comunes: Sin datos'
  const failureLines = pdf.splitTextToSize(failureSummary, pageWidth - margin * 2)
  failureLines.forEach((line, index) => pdf.text(line, margin, y + index * 4))
  y += failureLines.length * 4 + 6

  if (chartData.topClients.length) {
    const addClientReportHeader = () => {
      pdf.setFont('helvetica', 'bold')
      pdf.setFontSize(11)
      pdf.setTextColor(31, 74, 42)
      pdf.text('Top 10 clientes por solicitudes y facturación', margin, y)
      y += 7
      pdf.setFillColor(236, 245, 240)
      pdf.rect(margin, y - 4, pageWidth - margin * 2, 7, 'F')
      pdf.setFontSize(8)
      pdf.setTextColor(31, 74, 42)
      pdf.text('#', margin + 1, y)
      pdf.text('Cliente', margin + 10, y)
      pdf.text('Solicitudes', margin + 145, y)
      pdf.text('Facturación (COP)', margin + 195, y)
      y += 7
      pdf.setFont('helvetica', 'normal')
      pdf.setTextColor(51, 65, 85)
    }

    addClientReportHeader()
    chartData.topClients.forEach((client, index) => {
      if (y + 5 > pageHeight - 12) {
        pdf.addPage()
        y = 16
        addClientReportHeader()
      }
      pdf.text(String(index + 1), margin + 1, y)
      pdf.text(pdf.splitTextToSize(client.name, 125)[0], margin + 10, y)
      pdf.text(String(client.serviceCount), margin + 145, y)
      pdf.text(`$${formatBilling(client.billedAmount)}`, margin + 195, y)
      y += 5
    })
    y += 6
  }

  if (chartData.technicianProductivity.length) {
    const addTechnicianHeader = () => {
      pdf.setFont('helvetica', 'bold')
      pdf.setFontSize(11)
      pdf.setTextColor(31, 74, 42)
      pdf.text('Productividad individual de técnicos', margin, y)
      y += 7
      pdf.setFillColor(236, 245, 240)
      pdf.rect(margin, y - 4, pageWidth - margin * 2, 7, 'F')
      pdf.setFontSize(8)
      pdf.setTextColor(31, 74, 42)
      pdf.text('Técnico', margin + 1, y)
      pdf.text('Horas en campo', margin + 120, y)
      pdf.text('Citas', margin + 170, y)
      pdf.text('Satisfacción (1-5)', margin + 214, y)
      y += 7
      pdf.setFont('helvetica', 'normal')
      pdf.setTextColor(51, 65, 85)
    }

    addTechnicianHeader()
    chartData.technicianProductivity.forEach((technician) => {
      if (y + 5 > pageHeight - 12) {
        pdf.addPage()
        y = 16
        addTechnicianHeader()
      }
      pdf.text(pdf.splitTextToSize(technician.name, 105)[0], margin + 1, y)
      pdf.text(`${technician.fieldHours.toFixed(1)} h`, margin + 120, y)
      pdf.text(String(technician.appointmentsAttended), margin + 170, y)
      pdf.text(`${technician.averageSatisfaction.toFixed(1)} / 5`, margin + 214, y)
      y += 5
    })
    y += 6
  }

  const headers = addTableHeader()
  services.forEach((service) => {
    const values = [
      service.date,
      service.client,
      service.technician,
      service.serviceType,
      service.failureType,
      `${service.durationHours.toFixed(1)} h`,
    ]
    const lines = values.map((value, index) => pdf.splitTextToSize(String(value), headers[index].width - 2).slice(0, 3))
    const rowHeight = Math.max(7, ...lines.map((cellLines) => cellLines.length * 4))

    if (y + rowHeight > pageHeight - 12) {
      pdf.addPage()
      y = 16
      addTableHeader()
    }

    lines.forEach((cellLines, index) => {
      cellLines.forEach((line, lineIndex) => {
        pdf.text(line, headers[index].x + 1, y + 3 + lineIndex * 4)
      })
    })
    pdf.setDrawColor(226, 232, 240)
    pdf.line(margin, y + rowHeight, pageWidth - margin, y + rowHeight)
    y += rowHeight
  })

  if (!services.length) {
    pdf.setFontSize(9)
    pdf.text('No hay servicios concluidos para los filtros seleccionados.', margin, y + 5)
  }

  pdf.save(getFileName(filters, 'pdf'))
}
