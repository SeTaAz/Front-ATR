export const initialEquipments = [
  {
    id: 1,
    name: "Compresor Scroll Copeland ZB114",
    status: "Operativo",
    ref: "ART-2026-8842",
    brand: "Copeland",
    model: "ZB114KCE-TFD",
    serial: "19C245678",
    gas: "R-404A",
    capacity: "15 HP",
    voltage: "380-420V / 3Ph / 50Hz",
    health: 85,
    client: "Frigoríficos del Norte S.A.",
    location: "Zona Industrial Sector 4, Nave 2",
    contact: "+56 9 8765 4321",
    notes: "Requiere revisión de nivel de aceite mineral cada 3 meses debido a la longitud extendida de la línea de líquido.",
    history: [
      ["12 Nov 2026", "Preventivo - Limpieza condensador", "Carlos Mendoza", "Completado"],
      ["05 Sep 2026", "Correctivo - Fuga R-404A", "Ana Silva", "Completado"],
      ["15 Ene 2026", "Instalación inicial", "Carlos Mendoza", "Completado"],
    ],
  },
  {
    id: 2,
    name: "Evaporador Industrial Sala 3",
    status: "Operativo",
    ref: "ART-2026-7721",
    brand: "Bohn",
    model: "EVS-300",
    serial: "EV230451",
    gas: "R-404A",
    capacity: "8 HP",
    voltage: "220V / 3Ph / 50Hz",
    health: 72,
    client: "Supermercados El Sol",
    location: "Centro Comercial El Sol",
    contact: "300 222 1188",
    notes: "Limpiar serpentin y revisar motor de ventilación cada 60 días.",
    history: [
      ["08 Nov 2026", "Preventivo - Limpieza evaporador", "Luis Méndez", "Completado"],
      ["12 Jul 2026", "Correctivo - Motor ventilador", "Ana Garcés", "Completado"],
    ],
  },
];

export function getStoredEquipments() {
  try {
    return JSON.parse(localStorage.getItem("atr-equipments")) || initialEquipments;
  } catch {
    return initialEquipments;
  }
}

export function saveStoredEquipments(equipments) {
  localStorage.setItem("atr-equipments", JSON.stringify(equipments));
}