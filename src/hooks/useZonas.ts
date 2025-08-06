import { zonaSchema, type ZonaSchema } from "@/schemas/zona.schema";
import { zonaService } from "@/service/zona.service";
import type { ZonaResponse } from "@/types/zona.types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export const useZonas = () => {
  const [zonas, setZonas] = useState<ZonaResponse[]>([]);
  const [editingZona, setEditingZona] = useState<ZonaResponse | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [pagination, setPagination] = useState({
    currentPage: 0,
    totalPages: 0,
    totalElements: 0,
    pageSize: 5,
  });

  const form = useForm<ZonaSchema>({
    resolver: zodResolver(zonaSchema),
    defaultValues: {
      nombre: "",
      descripcion: "",
      totalEspacios: 1,
    },
  });

  const loadZonas = async (
    page = 0,
    size = 5,
    query?: string,
    estado?: string
  ) => {
    try {
      const filters: any = { page, size };
      if (query) filters.query = query;
      if (estado && estado !== "all") filters.estado === "true";
      const response = await zonaService.findAll(filters);
      setZonas(response.data.content);
      setPagination({
        currentPage: response.data.number,
        totalPages: response.data.totalPages,
        totalElements: response.data.totalElements,
        pageSize: response.data.size,
      });
    } catch (error) {
      console.error("Error loading zonas:", error);
    } finally {
      setSubmitting(false);
    }
  };

  const handleSubmit = async (values: ZonaSchema) => {
    setSubmitting(true);
    try {
      if (editingZona) {
        await zonaService.update(editingZona.id, values);
        toast.success("zona actualizada correctamente");
      } else {
        await zonaService.create(values);
        toast.success("zona creada correctamente");
      }
      await loadZonas(pagination.currentPage, pagination.pageSize);
      setDialogOpen(false);
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.mensaje ||
        error.message ||
        "error guardando zona";
      toast.error(errorMessage);
    } finally {
      setSubmitting(false);
    }
  };
  const handleAdd = () => {
    setEditingZona(null);
    form.reset({ nombre: "", descripcion: "", totalEspacios: 1 });
  };

  const handleEdit = (zona: ZonaResponse) => {
    setEditingZona(zona);
    form.reset({
      nombre: zona.nombre,
      descripcion: zona.descripcion,
      totalEspacios: zona.totalEspacios,
    });
  };

  const toggleStatus = async (id: number) => {
    try {
      await zonaService.toggleStatus(id);
      toast.success("estado cambiado");
      await loadZonas(pagination.currentPage, pagination.pageSize);
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.mensaje ||
        error.message ||
        "error guardando zona";
      toast.error(errorMessage);
    }
  };

  useEffect(() => {
    loadZonas();
  }, []);
  return {
    zonas,
    editingZona,
    dialogOpen,
    setDialogOpen,
    form,
    pagination,
    loadZonas,
    handleAdd,
    handleEdit,
    handleSubmit,
    toggleStatus,
    submitting,
  };
};
