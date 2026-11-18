export const REPUESTO_CATEGORIES = [
  "Compresores",
  "Válvulas",
  "Insumos",
  "Electrónica",
];

const initialParts = [
  {
    id: 1,
    name: "Compresor Scroll 5HP",
    ref: "R-001",
    category: "Compresores",
    description:
      "Compresor scroll de alta eficiencia para sistemas de refrigeración comercial e industrial.",
    image: "",
  },
  {
    id: 2,
    name: "Válvula de Expansión",
    ref: "R-042",
    category: "Válvulas",
    description:
      "Válvula de expansión termostática para control de flujo de refrigerante.",
    image: "",
  },
  {
    id: 3,
    name: "Gas Refrigerante R-404A (kg)",
    ref: "R-115",
    category: "Insumos",
    description:
      "Cilindro de gas refrigerante R-404A certificado para media y baja temperatura.",
    image: "",
  },
  {
    id: 4,
    name: "Termostato Digital",
    ref: "R-078",
    category: "Electrónica",
    description:
      "Controlador digital de temperatura con sensor NTC para cámaras frigoríficas.",
    image: "",
  },
];

export function getInitialParts() {
  return initialParts.map((part) => ({ ...part }));
}