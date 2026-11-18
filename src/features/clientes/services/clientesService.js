export const TIPOS_CLIENTE = ["Empresa", "Persona natural"];
export const ESTADOS_CLIENTE = ["Activo", "Inactivo"];

const initialClients = [
  { id: 1, identifier: "CL-001", name: "Frigorífico Andino", nit: "900.123.456-1", type: "Empresa", contact: "María Torres", phone: "312 456 7890", email: "compras@frigorificoandino.com", address: "Zona Industrial, Nave 4", status: "Activo" },
  { id: 2, identifier: "CL-002", name: "Logística del Norte", nit: "800.741.258-3", type: "Empresa", contact: "Juan Pérez", phone: "315 741 9630", email: "servicios@logisticanorte.com", address: "Parque Industrial Norte", status: "Activo" },
  { id: 3, identifier: "CL-003", name: "Supermercados El Sol", nit: "901.654.321-7", type: "Empresa", contact: "Diana López", phone: "300 222 1188", email: "mantenimiento@elsol.com", address: "Centro Comercial El Sol", status: "Activo" },
];

export function getInitialClients() {
  return initialClients.map((client) => ({ ...client }));
}

export function getStoredClients() {
  try {
    const stored = localStorage.getItem("atr-clients");
    return stored ? JSON.parse(stored) : getInitialClients();
  } catch {
    return getInitialClients();
  }
}

export function saveStoredClients(clients) {
  localStorage.setItem("atr-clients", JSON.stringify(clients));
}

export function getNextClientIdentifier(clients) {
  const next = clients.reduce((maximum, client) => {
    const number = Number(client.identifier.match(/(\d+)$/)?.[1] ?? 0);
    return Math.max(maximum, number);
  }, 0) + 1;
  return `CL-${String(next).padStart(3, "0")}`;
}