import { useEffect, useMemo, useState } from "react";
import { getInitialEntradas, getNextEntradaIdentifier } from "../services/entradasService";

const ENTRADAS_PER_PAGE = 10;
const createEmptyForm = (identifier = "") => ({ identifier, equipment: "", problem: "", solution: "", status: "Pendiente", requests: [] });

export default function useEntradas() {
  const [entradas, setEntradas] = useState(getInitialEntradas);
  const [searchTerm, setSearchTermState] = useState("");
  const [filterStatus, setFilterStatusState] = useState("Todos");
  const [requestedPage, setRequestedPage] = useState(1);
  const [modalMode, setModalMode] = useState(null);
  const [selectedEntrada, setSelectedEntrada] = useState(null);
  const [formData, setFormData] = useState(createEmptyForm);
  const [notification, setNotification] = useState(null);

  const filteredEntradas = useMemo(() => {
    const search = searchTerm.trim().toLocaleLowerCase();
    return entradas.filter((entrada) => {
      const matchesSearch = [entrada.identifier, entrada.equipment, entrada.problem, entrada.solution]
        .some((value) => value.toLocaleLowerCase().includes(search));
      return matchesSearch && (filterStatus === "Todos" || entrada.status === filterStatus);
    });
  }, [entradas, searchTerm, filterStatus]);

  const pageCount = Math.max(1, Math.ceil(filteredEntradas.length / ENTRADAS_PER_PAGE));
  const currentPage = Math.min(requestedPage, pageCount);
  const paginatedEntradas = useMemo(() => {
    const start = (currentPage - 1) * ENTRADAS_PER_PAGE;
    return filteredEntradas.slice(start, start + ENTRADAS_PER_PAGE);
  }, [filteredEntradas, currentPage]);

  useEffect(() => {
    if (requestedPage !== currentPage) setRequestedPage(currentPage);
  }, [requestedPage, currentPage]);

  const setSearchTerm = (value) => { setSearchTermState(value); setRequestedPage(1); };
  const setFilterStatus = (value) => { setFilterStatusState(value); setRequestedPage(1); };
  const closeModal = () => { setModalMode(null); setSelectedEntrada(null); };
  const openCreate = () => { setFormData(createEmptyForm(getNextEntradaIdentifier(entradas))); setSelectedEntrada(null); setModalMode("create"); };
  const openView = (entrada) => { setSelectedEntrada(entrada); setModalMode("view"); };
  const openEdit = (entrada) => {
    setSelectedEntrada(entrada);
    setFormData({ identifier: entrada.identifier, equipment: entrada.equipment, problem: entrada.problem, solution: entrada.solution, status: entrada.status, requests: entrada.requests.map((request) => [...request]) });
    setModalMode("edit");
  };
  const openDelete = (entrada) => { setSelectedEntrada(entrada); setModalMode("delete"); };

  const saveEntrada = (event) => {
    event.preventDefault();
    const normalized = { ...formData, equipment: formData.equipment.trim(), problem: formData.problem.trim(), solution: formData.solution.trim() };
    if (!normalized.equipment || !normalized.problem) return;
    if (modalMode === "create") {
      setEntradas((current) => [{ id: Date.now(), ...normalized }, ...current]);
      setRequestedPage(1);
      setNotification({ id: Date.now(), message: `Evaluación ${normalized.identifier} creada correctamente.`, variant: "success" });
    } else if (modalMode === "edit" && selectedEntrada) {
      setEntradas((current) => current.map((entrada) => entrada.id === selectedEntrada.id ? { ...entrada, ...normalized } : entrada));
      setNotification({ id: Date.now(), message: `Cambios guardados para ${normalized.identifier}.`, variant: "success" });
    }
    closeModal();
  };

  const deleteEntrada = () => {
    if (!selectedEntrada) return;
    setEntradas((current) => current.filter((entrada) => entrada.id !== selectedEntrada.id));
    setNotification({ id: Date.now(), message: `Evaluación ${selectedEntrada.identifier} eliminada.`, variant: "success" });
    closeModal();
  };

  const updateStatus = (status) => {
    if (!selectedEntrada) return;
    setEntradas((current) => current.map((entrada) => entrada.id === selectedEntrada.id ? { ...entrada, status } : entrada));
    setSelectedEntrada((current) => current ? { ...current, status } : current);
    setNotification({ id: Date.now(), message: `Evaluación ${selectedEntrada.identifier} marcada como ${status.toLocaleLowerCase()}.`, variant: "success" });
  };

  return {
    filteredEntradas, paginatedEntradas, currentPage, pageCount, entradasPerPage: ENTRADAS_PER_PAGE,
    setCurrentPage: setRequestedPage, searchTerm, setSearchTerm, filterStatus, setFilterStatus,
    modalMode, selectedEntrada, formData, setFormData, notification,
    clearNotification: () => setNotification(null), openCreate, openView, openEdit, openDelete,
    closeModal, saveEntrada, deleteEntrada, updateStatus,
  };
}