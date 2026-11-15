const technicians = ['Laura Gómez', 'Carlos Ríos', 'Andrés Pardo', 'Diana López']
const clients = [
  'Industrias Alfa',
  'Metalúrgica Norte',
  'Envases del Valle',
  'Plásticos Orion',
  'Textiles Andinos',
  'Agroindustrial Central',
  'Empaques del Caribe',
  'Manufacturas del Pacífico',
  'Autopartes Bogotá',
  'Química Andina',
  'Alimentos del Sur',
  'Minera Los Andes',
]
const serviceTypes = ['Mantenimiento preventivo', 'Mantenimiento correctivo', 'Diagnóstico', 'Instalación']
const failureTypes = ['Falla eléctrica', 'Desgaste de rodamientos', 'Fuga hidráulica', 'Falla de control', 'Sobrecalentamiento', 'Falla de lubricación']
const failureCategoryByType = {
  'Falla eléctrica': 'Electrónica',
  'Falla de control': 'Electrónica',
  'Desgaste de rodamientos': 'Mecánica',
  Sobrecalentamiento: 'Mecánica',
  'Falla de lubricación': 'Mecánica',
  'Fuga hidráulica': 'Fuga',
}
export const failureCategories = ['Electrónica', 'Mecánica', 'Fuga']
export const serviceZones = ['Zona Norte', 'Zona Sur', 'Zona Este']
const statuses = ['En proceso', 'Cancelado']

const formatLocalDate = (date) => {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

export const demoServices = Array.from({ length: 240 }, (_, index) => {
  const date = new Date()
  date.setHours(12, 0, 0, 0)
  date.setDate(date.getDate() - (index * 2 + (index % 5)))
  const failureType = failureTypes[(index * 7) % failureTypes.length]
  const billingAmount = 125000 + ((index * 79321) % 1250000)

  return {
    id: `SRV-${String(1001 + index).padStart(4, '0')}`,
    date: formatLocalDate(date),
    technician: technicians[index % technicians.length],
    client: clients[(index * 5) % clients.length],
    serviceType: serviceTypes[(index * 5) % serviceTypes.length],
    failureType,
    failureCategory: failureCategoryByType[failureType],
    zone: serviceZones[(index * 2) % serviceZones.length],
    durationHours: Number((1.2 + ((index * 7) % 39) / 10).toFixed(1)),
    satisfactionRating: Number((3.5 + ((index * 3) % 16) / 10).toFixed(1)),
    billingAmount,
    costAmount: Math.round(billingAmount * (0.62 + (index % 9) * 0.015)),
    status: index % 10 === 0 ? statuses[0] : index % 10 === 1 ? statuses[1] : 'Concluido',
  }
})

export const dashboardFilterOptions = {
  technicians,
  clients,
  serviceTypes,
}