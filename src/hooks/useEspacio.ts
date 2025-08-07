import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import type { ZonaResponse } from "@/types/zona.types";
import type { EspacioResponse } from "@/types/espacio.types";
import { espacioSchema, type EspacioSchema } from "@/schemas/espacios.schema";
import { espacioService } from "@/service/espacio.service";
import { zonaService } from "@/service/zona.service";
import { tipoVehiculoService } from "@/service/tipo-vehiculo.service";

export const useEspacio = () => {
  const [espacios, setEspacios] = useState<EspacioResponse[]>([]);
  const [editingEspacio, setEditingEspacio] = useState<EspacioResponse | null>(
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
  const [zonas, setZonas] = useState<ZonaResponse[]>([]);
  const [tiposVehiculo, setTiposVehiculo] = useState<
    { id: number; nombre: string }[]
  >([]);

  const form = useForm<EspacioSchema>({
    resolver: zodResolver(espacioSchema),
    defaultValues: { zonaId: 0, numeroEspacio: "", tipoVehiculoId: 0 },
  });

  const loadEspacios = async (
    page = 0,
    size = 5,
    query?: string,
    estado?: string
  ) => {
    try {
      const filters: any = { page, size };
      if (query) filters.query = query;
      if (estado && estado !== "all") filters.estado = estado === "true";
      const res = await espacioService.findAll(filters);
      setEspacios(res.data.content);
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
        "Error al cargar espacios";
      toast.error(errorMessage);
    }
  };

  const handleSubmit = async (values: EspacioSchema) => {
    setSubmitting(true);
    try {
      if (editingEspacio) {
        await espacioService.update(editingEspacio.id, values);
        toast.success("Espacio actualizado correctamente");
      } else {
        await espacioService.create(values);
        toast.success("Espacio creado correctamente");
      }
      await loadEspacios(pagination.currentPage, pagination.pageSize);
      setDialogOpen(false);
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.mensaje ||
        error.message ||
        "Error al guardar espacio";
      toast.error(errorMessage);
    } finally {
      setSubmitting(false);
    }
  };

  const handleAdd = () => {
    setEditingEspacio(null);
    form.reset({ zonaId: 0, numeroEspacio: "", tipoVehiculoId: 0 });
    setDialogOpen(true);
  };

  const handleEdit = (espacio: EspacioResponse) => {
    setEditingEspacio(espacio);
    form.reset({
      zonaId: espacio.zonaId,
      numeroEspacio: espacio.numeroEspacio,
      tipoVehiculoId: espacio.tipoVehiculoId,
    });
    setDialogOpen(true);
  };

  const toggleStatus = async (id: number) => {
    try {
      await espacioService.toggleStatus(id);
      toast.success("Estado cambiado correctamente");
      await loadEspacios(pagination.currentPage, pagination.pageSize);
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.mensaje ||
        error.message ||
        "Error al cambiar estado";
      toast.error(errorMessage);
    }
  };

  useEffect(() => {
    loadEspacios();
    // Cargar zonas y tipos de vehículo para los selects
    (async () => {
      try {
        const zonasRes = await zonaService.findAll({ page: 0, size: 1000 });
        setZonas(zonasRes.data.content);
      } catch (e) {
        toast.error("Error al cargar zonas");
      }
      try {
        const tiposRes = await tipoVehiculoService.findAll({
          page: 0,
          size: 1000,
        });
        setTiposVehiculo(
          tiposRes.data.content.map((t: any) => ({
            id: t.id,
            nombre: t.nombre,
          }))
        );
      } catch (e) {
        toast.error("Error al cargar tipos de vehículo");
      }
    })();
  }, []);

  // Devuelve la cantidad de espacios disponibles en una zona
  const getEspaciosDisponibles = (zonaId: number) => {
    const zona = zonas.find((z) => z.id === zonaId);
    if (!zona) return 0;
    // Contar cuántos espacios activos existen en la zona (sin importar si están ocupados o no)
    const activos = espacios.filter(
      (e) => e.zonaId === zonaId && e.estado
    ).length;
    return zona.totalEspacios - activos;
  };

  return {
    espacios,
    editingEspacio,
    dialogOpen,
    setDialogOpen,
    form,
    pagination,
    loadEspacios,
    handleSubmit,
    handleAdd,
    handleEdit,
    toggleStatus,
    submitting,
    zonas,
    tiposVehiculo,
    getEspaciosDisponibles,
  };
};
