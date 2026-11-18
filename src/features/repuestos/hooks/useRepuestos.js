import { useEffect, useMemo, useState } from "react";
import {
  getInitialParts,
  REPUESTO_CATEGORIES,
} from "../services/repuestosService";

const REPUESTOS_PER_PAGE = 10;

const createEmptyForm = () => ({
  name: "",
  ref: "",
  category: REPUESTO_CATEGORIES[0],
  description: "",
  image: "",
});

export default function useRepuestos() {
  const [repuestos, setRepuestos] = useState(getInitialParts);
  const [searchTerm, setSearchTermState] = useState("");
  const [filterCategory, setFilterCategoryState] = useState("Todas");
  const [requestedPage, setRequestedPage] = useState(1);
  const [modalMode, setModalMode] = useState(null);
  const [selectedRepuesto, setSelectedRepuesto] = useState(null);
  const [formData, setFormData] = useState(createEmptyForm);
  const [notification, setNotification] = useState(null);

  const filteredRepuestos = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLocaleLowerCase();

    return repuestos.filter((part) => {
      const matchesSearch = [part.name, part.ref, part.description].some(
        (value) => value.toLocaleLowerCase().includes(normalizedSearch),
      );
      const matchesCategory =
        filterCategory === "Todas" || part.category === filterCategory;

      return matchesSearch && matchesCategory;
    });
  }, [repuestos, searchTerm, filterCategory]);

  const pageCount = Math.max(
    1,
    Math.ceil(filteredRepuestos.length / REPUESTOS_PER_PAGE),
  );
  const currentPage = Math.min(requestedPage, pageCount);
  const paginatedRepuestos = useMemo(() => {
    const startIndex = (currentPage - 1) * REPUESTOS_PER_PAGE;
    return filteredRepuestos.slice(startIndex, startIndex + REPUESTOS_PER_PAGE);
  }, [filteredRepuestos, currentPage]);

  useEffect(() => {
    if (requestedPage !== currentPage) setRequestedPage(currentPage);
  }, [requestedPage, currentPage]);

  const setSearchTerm = (value) => {
    setSearchTermState(value);
    setRequestedPage(1);
  };

  const setFilterCategory = (value) => {
    setFilterCategoryState(value);
    setRequestedPage(1);
  };

  const closeModal = () => {
    setModalMode(null);
    setSelectedRepuesto(null);
  };

  const openCreate = () => {
    setFormData(createEmptyForm());
    setSelectedRepuesto(null);
    setModalMode("create");
  };

  const openView = (part) => {
    setSelectedRepuesto(part);
    setModalMode("view");
  };

  const openEdit = (part) => {
    setSelectedRepuesto(part);
    setFormData({
      name: part.name,
      ref: part.ref,
      category: part.category,
      description: part.description,
      image: part.image,
    });
    setModalMode("edit");
  };

  const openDelete = (part) => {
    setSelectedRepuesto(part);
    setModalMode("delete");
  };

  const savePart = (event) => {
    event.preventDefault();
    const normalizedPart = {
      ...formData,
      name: formData.name.trim(),
      ref: formData.ref.trim(),
      description: formData.description.trim(),
      image: formData.image.trim(),
    };

    if (!normalizedPart.name || !normalizedPart.ref) return;

    const duplicateRef = repuestos.some(
      (part) =>
        part.id !== selectedRepuesto?.id &&
        part.ref.toLocaleLowerCase() === normalizedPart.ref.toLocaleLowerCase(),
    );
    if (duplicateRef) {
      setNotification({
        id: Date.now(),
        message: `La referencia ${normalizedPart.ref} ya está asignada a otro repuesto.`,
        variant: "error",
      });
      return;
    }

    if (modalMode === "create") {
      const newPart = {
        id: repuestos.reduce((maxId, part) => Math.max(maxId, part.id), 0) + 1,
        ...normalizedPart,
      };
      setRepuestos((currentParts) => [newPart, ...currentParts]);
      setRequestedPage(1);
      setNotification({
        id: Date.now(),
        message: `Repuesto "${newPart.name}" registrado correctamente.`,
        variant: "success",
      });
    } else if (modalMode === "edit" && selectedRepuesto) {
      setRepuestos((currentParts) =>
        currentParts.map((part) =>
          part.id === selectedRepuesto.id ? { ...part, ...normalizedPart } : part,
        ),
      );
      setNotification({
        id: Date.now(),
        message: `Cambios guardados para "${normalizedPart.name}".`,
        variant: "success",
      });
    }

    closeModal();
  };

  const deletePart = () => {
    if (!selectedRepuesto) return;

    setRepuestos((currentParts) =>
      currentParts.filter((part) => part.id !== selectedRepuesto.id),
    );
    setNotification({
      id: Date.now(),
      message: `Repuesto "${selectedRepuesto.name}" eliminado.`,
      variant: "success",
    });
    closeModal();
  };

  return {
    repuestos,
    filteredRepuestos,
    paginatedRepuestos,
    currentPage,
    pageCount,
    repuestosPerPage: REPUESTOS_PER_PAGE,
    setCurrentPage: setRequestedPage,
    searchTerm,
    setSearchTerm,
    filterCategory,
    setFilterCategory,
    modalMode,
    selectedRepuesto,
    formData,
    setFormData,
    notification,
    clearNotification: () => setNotification(null),
    openCreate,
    openView,
    openEdit,
    openDelete,
    closeModal,
    savePart,
    deletePart,
  };
}