import { useEffect, useMemo, useState } from "react";
import { getNextEmployeeIdentifier, getStoredEmployees, saveStoredEmployees } from "../services/empleadosService";

const PER_PAGE = 10;
const emptyForm = (identifier = "") => ({ identifier, firstName: "", lastName: "", documentType: "CC", documentNumber: "", phone: "", email: "", position: "Técnico frigorífico", status: "Activo" });

export default function useEmpleados() {
  const [employees, setEmployees] = useState(getStoredEmployees);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("Todos");
  const [page, setPage] = useState(1);
  const [mode, setMode] = useState(null);
  const [selected, setSelected] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [notification, setNotification] = useState(null);

  useEffect(() => saveStoredEmployees(employees), [employees]);
  const filtered = useMemo(() => {
    const query = search.trim().toLocaleLowerCase();
    return employees.filter((employee) =>
      (status === "Todos" || employee.status === status) &&
      [employee.identifier, employee.firstName, employee.lastName, employee.documentNumber, employee.phone, employee.email]
        .some((value) => value.toLocaleLowerCase().includes(query))
    );
  }, [employees, search, status]);
  const pageCount = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const currentPage = Math.min(page, pageCount);
  const paginated = filtered.slice((currentPage - 1) * PER_PAGE, currentPage * PER_PAGE);

  const close = () => { setMode(null); setSelected(null); };
  const openCreate = () => { setForm(emptyForm(getNextEmployeeIdentifier(employees))); setMode("create"); };
  const openView = (employee) => { setSelected(employee); setMode("view"); };
  const openEdit = (employee) => { setSelected(employee); setForm({ ...employee }); setMode("edit"); };
  const openDelete = (employee) => { setSelected(employee); setMode("delete"); };
  const notify = (message) => setNotification({ id: Date.now(), message, variant: "success" });

  const save = (event) => {
    event.preventDefault();
    const normalized = { ...form, firstName: form.firstName.trim(), lastName: form.lastName.trim(), documentNumber: form.documentNumber.trim(), phone: form.phone.trim(), email: form.email.trim() };
    if (!normalized.firstName || !normalized.lastName || !normalized.documentNumber) return;
    if (mode === "create") {
      setEmployees((current) => [{ id: Date.now(), ...normalized }, ...current]);
      setPage(1);
      notify(`${normalized.firstName} ${normalized.lastName} registrado correctamente.`);
    } else if (mode === "edit" && selected) {
      setEmployees((current) => current.map((employee) => employee.id === selected.id ? { ...employee, ...normalized } : employee));
      notify(`Cambios guardados para ${normalized.firstName} ${normalized.lastName}.`);
    }
    close();
  };
  const remove = () => {
    if (!selected) return;
    setEmployees((current) => current.filter((employee) => employee.id !== selected.id));
    notify(`Empleado ${selected.firstName} ${selected.lastName} eliminado.`);
    close();
  };

  return { paginated, filtered, currentPage, pageCount, perPage: PER_PAGE, setPage, search, setSearch, status, setStatus, mode, selected, form, setForm, notification, clearNotification: () => setNotification(null), openCreate, openView, openEdit, openDelete, close, save, remove };
}