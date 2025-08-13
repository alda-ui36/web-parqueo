import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from "sonner";

import { tipoVehiculoSchema, type TipoVehiculoSchema } from "@/schemas/tipo-vehiculo.schema";
import type { TipoVehiculoResponse } from "@/types/tipo-vehiculo.types";
import { tipoVehiculoService } from "@/services/tipo-vehiculo.service";

export const useTipoVehiculo = () => {
    const [tipos, setTipos] = useState<TipoVehiculoResponse[]>([]);
    const [editingTipo, setEditingTipo] = useState<TipoVehiculoResponse | null>(null);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [pagination, setPagination] = useState({
        currentPage: 0,
        totalPages: 0,
        totalElements: 0,
        pageSize: 5,
    });

    const form = useForm<TipoVehiculoSchema>({
        resolver: zodResolver(tipoVehiculoSchema),
        defaultValues: { nombre: "", tarifaHora: 0, descripcion: "" },
    });

    const loadTipos = async (page = 0, size = 5, query?: string, estado?: string) => {
        try {
            const filters: any = { page, size };
            if (query) filters.query = query;
            if (estado && estado !== "all") filters.estado = estado === "true";
            const res = await tipoVehiculoService.findAll(filters);
            setTipos(res.data.content);
            setPagination({
                currentPage: res.data.number,
                totalPages: res.data.totalPages,
                totalElements: res.data.totalElements,
                pageSize: res.data.size,
            });
        } catch (error: any) {
            const errorMessage = error.response?.data?.mensaje || error.message || 'Error al cargar tipos de vehículo';
            toast.error(errorMessage);
        }
    };

    const loadAllTipos = async () => {
        try {
            const res = await tipoVehiculoService.findAll({ page: 0, size: 100, estado: true });
            setTipos(res.data.content);
        } catch (error: any) {
            const errorMessage = error.response?.data?.mensaje || error.message || 'Error al cargar tipos de vehículo';
            toast.error(errorMessage);
        }
    };

    const handleSubmit = async (values: TipoVehiculoSchema) => {
        setSubmitting(true);
        try {
            if (editingTipo) {
                await tipoVehiculoService.update(editingTipo.id, values);
                toast.success("Tipo de vehículo actualizado correctamente");
            } else {
                await tipoVehiculoService.create(values);
                toast.success("Tipo de vehículo creado correctamente");
            }
            await loadTipos(pagination.currentPage, pagination.pageSize);
            setDialogOpen(false);
        } catch (error: any) {
            const errorMessage = error.response?.data?.mensaje || error.message || 'Error al guardar tipo de vehículo';
            toast.error(errorMessage);
        } finally {
            setSubmitting(false);
        }
    };

    const handleAdd = () => {
        setEditingTipo(null);
        form.reset({ nombre: "", tarifaHora: 0, descripcion: "" });
        setDialogOpen(true);
    };

    const handleEdit = (tipo: TipoVehiculoResponse) => {
        setEditingTipo(tipo);
        form.reset({
            nombre: tipo.nombre,
            tarifaHora: tipo.tarifaHora,
            descripcion: tipo.descripcion || "",
        });
        setDialogOpen(true);
    };

    const toggleStatus = async (id: number) => {
        try {
            await tipoVehiculoService.toggleStatus(id);
            toast.success("Estado cambiado correctamente");
            await loadTipos(pagination.currentPage, pagination.pageSize);
        } catch (error: any) {
            const errorMessage = error.response?.data?.mensaje || error.message || 'Error al cambiar estado';
            toast.error(errorMessage);
        }
    };

    useEffect(() => {
        loadAllTipos();
    }, []);

    return {
        tipos,
        editingTipo,
        dialogOpen,
        setDialogOpen,
        form,
        pagination,
        loadTipos,
        handleSubmit,
        handleAdd,
        handleEdit,
        toggleStatus,
        submitting
    };
}; 