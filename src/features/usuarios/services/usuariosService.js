export const ROLES_USUARIO = ["Administrador", "Técnico"];
export const ESTADOS_USUARIO = ["Activo", "Inactivo"];

const initialUsers = [
  {
    id: 1,
    name: "Miguel Rodríguez",
    email: "miguel.r@artefrio.com",
    identifier: "T-4892",
    role: "Técnico",
    status: "Activo",
  },
  {
    id: 2,
    name: "Elena Vega",
    email: "elena.v@artefrio.com",
    identifier: "T-1024",
    role: "Técnico",
    status: "Activo",
  },
  {
    id: 3,
    name: "Carlos Gómez",
    email: "carlos.g@artefrio.com",
    identifier: "T-5102",
    role: "Técnico",
    status: "Inactivo",
  },
  {
    id: 4,
    name: "Laura Martínez",
    email: "laura.m@artefrio.com",
    identifier: "A-0045",
    role: "Administrador",
    status: "Activo",
  },
];

export function getInitialUsers() {
  return initialUsers.map((user) => ({ ...user }));
}

export function getUserInitials(name) {
  return name
    .trim()
    .split(/\s+/)
    .map((part) => part[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}
