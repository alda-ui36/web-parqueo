import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import {
  metodoPagoSchema,
  type MetodoPagoSchema,
} from "@/schemas/metodo-pago.schema";
import type { MetodoPagoResponse } from "@/types/metodo-pago.types";
import { metodoPagoService } from "@/service/metodo-pago.service";

export const useMetodoPago = () => {
  const [metodos, setMetodos] = useState<MetodoPagoResponse[]>([]);
  const [editingMetodo, setEditingMetodo] = useState<MetodoPagoResponse | null>(
    null
  );
  const [dialogOpen, setDialogOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [pagination, setPagination] = useState({
    currentPage: 0,
    totalPages: 0,
    totalElements: 0,
    pageSize: 5,
  });

  const form = useForm<MetodoPagoSchema>({
    resolver: zodResolver(metodoPagoSchema),
    defaultValues: { nombre: "" },
  });

  const loadMetodos = async (
    page = 0,
    size = 5,
    query?: string,
    estado?: string
  ) => {
    try {
      const filters: any = { page, size };
      if (query) filters.query = query;
      if (estado && estado !== "all") filters.estado = estado === "true";
      const res = await metodoPagoService.findAll(filters);
      setMetodos(res.data.content);
      setPagination({
        currentPage: res.data.number,
        totalPages: res.data.totalPages,
        totalElements: res.data.totalElements,
        pageSize: res.data.size,
      });
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.mensaje ||
        error.message ||
        "Error al cargar métodos de pago";
      toast.error(errorMessage);
    }
  };

  const handleSubmit = async (values: MetodoPagoSchema) => {
    setSubmitting(true);
    try {
      if (editingMetodo) {
        await metodoPagoService.update(editingMetodo.id, values);
        toast.success("Método de pago actualizado correctamente");
      } else {
        await metodoPagoService.create(values);
        toast.success("Método de pago creado correctamente");
      }
      await loadMetodos(pagination.currentPage, pagination.pageSize);
      setDialogOpen(false);
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.mensaje ||
        error.message ||
        "Error al guardar método de pago";
      toast.error(errorMessage);
    } finally {
      setSubmitting(false);
    }
  };

  const handleAdd = () => {
    setEditingMetodo(null);
    form.reset({ nombre: "" });
    setDialogOpen(true);
  };

  const handleEdit = (metodo: MetodoPagoResponse) => {
    setEditingMetodo(metodo);
    form.reset({ nombre: metodo.nombre });
    setDialogOpen(true);
  };

  const toggleStatus = async (id: number) => {
    try {
      await metodoPagoService.toggleStatus(id);
      toast.success("Estado cambiado correctamente");
      await loadMetodos(pagination.currentPage, pagination.pageSize);
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.mensaje ||
        error.message ||
        "Error al cambiar estado";
      toast.error(errorMessage);
    }
  };

  useEffect(() => {
    loadMetodos();
  }, []);

  return {
    metodos,
    editingMetodo,
    dialogOpen,
    setDialogOpen,
    form,
    pagination,
    loadMetodos,
    handleSubmit,
    handleAdd,
    handleEdit,
    toggleStatus,
    submitting,
  };
};
