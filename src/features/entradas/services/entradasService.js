export const ESTADOS_ENTRADA = ["Pendiente", "Autorizado", "Anulado"];

const initialEntradas = [
  { id: 1, identifier: "#REQ-1044", equipment: "Compresor Rack B", problem: "Ruido anormal en el compresor", solution: "Revisar amortiguadores y estado de tornillos.", status: "Pendiente", requests: [["Válvula Bola 5/8 Soldable", "1", "Danfoss"]] },
  { id: 2, identifier: "#REQ-1043", equipment: "Evaporador Sala 3", problem: "Motor ventilador con ruido", solution: "Reemplazar motor y verificar velocidad.", status: "Autorizado", requests: [["Motor ventilador 230V", "1", "EFM"]] },
  { id: 3, identifier: "#REQ-1042", equipment: "Tablero Control General", problem: "Falla en contactor principal", solution: "Cambiar contactor y prueba de carga.", status: "Anulado", requests: [["Contactor trifásico 32A", "1", "Schneider"]] },
];

export function getInitialEntradas() {
  return initialEntradas.map((entrada) => ({
    ...entrada,
    requests: entrada.requests.map((request) => [...request]),
  }));
}

export function getNextEntradaIdentifier(entradas) {
  const highest = entradas.reduce((maximum, entrada) => {
    const number = Number(entrada.identifier.match(/(\d+)$/)?.[1] ?? 0);
    return Math.max(maximum, number);
  }, 1041);
  return `#REQ-${highest + 1}`;
}