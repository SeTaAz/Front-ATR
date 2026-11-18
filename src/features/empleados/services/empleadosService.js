export const CARGOS_EMPLEADO = ["Técnico frigorífico", "Técnico eléctrico", "Auxiliar técnico", "Supervisor", "Administrador"];
export const ESTADOS_EMPLEADO = ["Activo", "Inactivo", "Vacaciones"];

const initialEmployees = [
  { id: 1, identifier: "EMP-001", firstName: "Ana", lastName: "Garcés", documentType: "CC", documentNumber: "1039456781", phone: "310 456 7788", email: "ana.garces@artefrio.com", position: "Técnico eléctrico", status: "Activo" },
  { id: 2, identifier: "EMP-002", firstName: "Roberto", lastName: "Guzmán", documentType: "CC", documentNumber: "1078554321", phone: "311 987 6543", email: "roberto.guzman@artefrio.com", position: "Técnico frigorífico", status: "Activo" },
  { id: 3, identifier: "EMP-003", firstName: "Luis", lastName: "Méndez", documentType: "CC", documentNumber: "1091459876", phone: "320 123 4567", email: "luis.mendez@artefrio.com", position: "Auxiliar técnico", status: "Vacaciones" },
];

export function getInitialEmployees() {
  return initialEmployees.map((employee) => ({ ...employee }));
}

export function getStoredEmployees() {
  try {
    const stored = localStorage.getItem("atr-employees");
    return stored ? JSON.parse(stored) : getInitialEmployees();
  } catch {
    return getInitialEmployees();
  }
}

export function saveStoredEmployees(employees) {
  localStorage.setItem("atr-employees", JSON.stringify(employees));
}

export function getNextEmployeeIdentifier(employees) {
  const next = employees.reduce((maximum, employee) => {
    const number = Number(employee.identifier.match(/(\d+)$/)?.[1] ?? 0);
    return Math.max(maximum, number);
  }, 0) + 1;
  return `EMP-${String(next).padStart(3, "0")}`;
}