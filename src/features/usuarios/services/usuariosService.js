export const ROLES_USUARIO = ["Administrador", "Técnico"];
export const ESTADOS_USUARIO = ["Activo", "Inactivo"];

const initialUsers = [
  {
    id: 1,
    name: "Miguel Rodríguez",
    email: "miguel.r@artefrio.com",
    identifier: "T-1",
    role: "Técnico",
    status: "Activo",
  },
  {
    id: 2,
    name: "Elena Vega",
    email: "elena.v@artefrio.com",
    identifier: "T-2",
    role: "Técnico",
    status: "Activo",
  },
  {
    id: 3,
    name: "Carlos Gómez",
    email: "carlos.g@artefrio.com",
    identifier: "T-3",
    role: "Técnico",
    status: "Inactivo",
  },
  {
    id: 4,
    name: "Laura Martínez",
    email: "laura.m@artefrio.com",
    identifier: "A-4",
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

export function getNextUserIdentifier(role, users) {
  const nextNumber =
    users.reduce((highestNumber, user) => {
      const match = user.identifier.match(/-(\d+)$/);
      return match ? Math.max(highestNumber, Number(match[1])) : highestNumber;
    }, 0) + 1;

  return `${role === "Administrador" ? "A" : "T"}-${nextNumber}`;
}

export function getUserIdentifierForRole(role, identifier) {
  const number = identifier.match(/-(\d+)$/)?.[1];
  if (!number) return identifier;

  return `${role === "Administrador" ? "A" : "T"}-${number}`;
}
