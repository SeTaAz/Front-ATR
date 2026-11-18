import { useEffect, useMemo, useState } from "react";
import { getStoredEquipments, saveStoredEquipments } from "../services/hojaDeVidaService";
import { getStoredEmployees } from "../../empleados/services/empleadosService";

export default function useHojaDeVida() {
  const [equipments, setEquipments] = useState(getStoredEquipments);
  const [search, setSearch] = useState("");
  const [selectedId, setSelectedId] = useState(null);
  const [maintenanceOpen, setMaintenanceOpen] = useState(false);
  const [qrOpen, setQrOpen] = useState(false);
  const [maintenance, setMaintenance] = useState({
    type: "Preventivo",
    technician: "",
    notes: "",
  });

  const technicians = getStoredEmployees()
    .filter((employee) => employee.status === "Activo")
    .map((employee) => `${employee.firstName} ${employee.lastName}`);

  useEffect(() => saveStoredEquipments(equipments), [equipments]);

  const filtered = useMemo(() => {
    const query = search.trim().toLocaleLowerCase();
    if (!query) return equipments;
    return equipments.filter((equipment) =>
      [equipment.name, equipment.ref, equipment.model, equipment.client]
        .some((value) => value.toLocaleLowerCase().includes(query)),
    );
  }, [equipments, search]);

  const selected = filtered.find((equipment) => equipment.id === selectedId)
    || filtered[0]
    || equipments[0];

  const registerMaintenance = (event) => {
    event.preventDefault();
    if (!selected || !maintenance.technician.trim()) return;
    setEquipments((current) =>
      current.map((equipment) =>
        equipment.id === selected.id
          ? {
              ...equipment,
              history: [
                [
                  "Hoy",
                  `${maintenance.type}${maintenance.notes ? ` - ${maintenance.notes}` : ""}`,
                  maintenance.technician,
                  "Completado",
                ],
                ...equipment.history,
              ],
            }
          : equipment,
      ),
    );
    setMaintenance({ type: "Preventivo", technician: "", notes: "" });
    setMaintenanceOpen(false);
  };

  return {
    search,
    setSearch,
    filtered,
    selected,
    setSelectedId,
    maintenanceOpen,
    setMaintenanceOpen,
    qrOpen,
    setQrOpen,
    maintenance,
    setMaintenance,
    registerMaintenance,
    technicians,
  };
}