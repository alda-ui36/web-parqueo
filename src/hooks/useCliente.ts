import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import { clienteSchema, type ClienteSchema } from "@/schemas/cliente.schema";
import type { ClienteResponse } from "@/types/cliente.types";
import { clienteService } from "@/services/cliente.service";

export const useCliente = () => {
  const [clientes, setClientes] = useState<ClienteResponse[]>([]);
  const [editingCliente, setEditingCliente] = useState<ClienteResponse | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [pagination, setPagination] = useState({
    currentPage: 0,
    totalPages: 0,
    totalElements: 0,
    pageSize: 5,
  });

  const form = useForm<ClienteSchema>({
    resolver: zodResolver(clienteSchema),
    defaultValues: {
      nombres: "",
      apePaterno: "",
      apeMaterno: "",
      dni: "",
      telefono: "",
      direccion: "",
      correo: "",
    },
  });

  const loadClientes = async (
    page = 0,
    size = 5,
    query?: string,
    estado?: string
  ) => {
    try {
      const filters: any = { page, size };
      if (query) filters.query = query;
      if (estado && estado !== "all") filters.estado = estado === "true";
      const res = await clienteService.findAll(filters);
      setClientes(res.data.content);
      setPagination({
        currentPage: res.data.number,
        totalPages: res.data.totalPages,
        totalElements: res.data.totalElements,
        pageSize: res.data.size,
      });
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.mensaje || error.message || "Error al cargar clientes";
      toast.error(errorMessage);
    }
  };

  const loadAllActive = async () => {
    try {
      const res = await clienteService.findAll({ page: 0, size: 100, estado: true });
      setClientes(res.data.content);
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.mensaje || error.message || "Error al cargar clientes";
      toast.error(errorMessage);
    }
  };

  const handleSubmit = async (values: ClienteSchema) => {
    setSubmitting(true);
    try {
      if (editingCliente) {
        await clienteService.update(editingCliente.id, values);
        toast.success("Cliente actualizado correctamente");
      } else {
        await clienteService.save(values);
        toast.success("Cliente creado correctamente");
      }
      await loadClientes(pagination.currentPage, pagination.pageSize);
      setDialogOpen(false);
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.mensaje || error.message || "Error al guardar cliente";
      toast.error(errorMessage);
    } finally {
      setSubmitting(false);
    }
  };

  const handleAdd = () => {
    setEditingCliente(null);
    form.reset({
      nombres: "",
      apePaterno: "",
      apeMaterno: "",
      dni: "",
      telefono: "",
      direccion: "",
      correo: "",
    });
    setDialogOpen(true);
  };

  const handleEdit = (cliente: ClienteResponse) => {
    setEditingCliente(cliente);
    form.reset({
      nombres: cliente.nombres,
      apePaterno: cliente.apePaterno,
      apeMaterno: cliente.apeMaterno,
      dni: cliente.dni,
      telefono: cliente.telefono,
      direccion: cliente.direccion,
      correo: cliente.correo,
    });
    setDialogOpen(true);
  };

  const toggleStatus = async (id: number) => {
    try {
      await clienteService.toggleStatus(id);
      toast.success("Estado cambiado correctamente");
      await loadClientes(pagination.currentPage, pagination.pageSize);
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.mensaje || error.message || "Error al cambiar estado";
      toast.error(errorMessage);
    }
  };

  useEffect(() => {
    loadAllActive();
  }, []);

  return {
    clientes,
    editingCliente,
    dialogOpen,
    setDialogOpen,
    form,
    pagination,
    loadClientes,
    handleSubmit,
    handleAdd,
    handleEdit,
    toggleStatus,
    submitting,
  };
};
