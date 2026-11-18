import { useEffect, useMemo, useState } from "react";
import { getNextClientIdentifier, getStoredClients, saveStoredClients } from "../services/clientesService";

const PER_PAGE = 10;
const emptyForm = (identifier = "") => ({ identifier, name: "", nit: "", type: "Empresa", contact: "", phone: "", email: "", address: "", status: "Activo" });

export default function useClientes() {
  const [clients, setClients] = useState(getStoredClients);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("Todos");
  const [page, setPage] = useState(1);
  const [mode, setMode] = useState(null);
  const [selected, setSelected] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [notification, setNotification] = useState(null);

  useEffect(() => saveStoredClients(clients), [clients]);

  const filtered = useMemo(() => {
    const query = search.trim().toLocaleLowerCase();
    return clients.filter((client) =>
      (status === "Todos" || client.status === status) &&
      [client.identifier, client.name, client.nit, client.contact, client.email, client.phone]
        .some((value) => value.toLocaleLowerCase().includes(query))
    );
  }, [clients, search, status]);
  const pageCount = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const currentPage = Math.min(page, pageCount);
  const paginated = filtered.slice((currentPage - 1) * PER_PAGE, currentPage * PER_PAGE);

  const close = () => { setMode(null); setSelected(null); };
  const openCreate = () => { setForm(emptyForm(getNextClientIdentifier(clients))); setMode("create"); };
  const openView = (client) => { setSelected(client); setMode("view"); };
  const openEdit = (client) => { setSelected(client); setForm({ ...client }); setMode("edit"); };
  const openDelete = (client) => { setSelected(client); setMode("delete"); };
  const notify = (message) => setNotification({ id: Date.now(), message, variant: "success" });

  const save = (event) => {
    event.preventDefault();
    const normalized = { ...form, name: form.name.trim(), nit: form.nit.trim(), contact: form.contact.trim(), phone: form.phone.trim(), email: form.email.trim(), address: form.address.trim() };
    if (!normalized.name || !normalized.nit) return;
    if (mode === "create") {
      setClients((current) => [{ id: Date.now(), ...normalized }, ...current]);
      setPage(1);
      notify(`Cliente ${normalized.name} registrado correctamente.`);
    } else if (mode === "edit" && selected) {
      setClients((current) => current.map((client) => client.id === selected.id ? { ...client, ...normalized } : client));
      notify(`Cambios guardados para ${normalized.name}.`);
    }
    close();
  };
  const remove = () => {
    if (!selected) return;
    setClients((current) => current.filter((client) => client.id !== selected.id));
    notify(`Cliente ${selected.name} eliminado.`);
    close();
  };

  return { paginated, filtered, currentPage, pageCount, perPage: PER_PAGE, setPage, search, setSearch, status, setStatus, mode, selected, form, setForm, notification, clearNotification: () => setNotification(null), openCreate, openView, openEdit, openDelete, close, save, remove };
}