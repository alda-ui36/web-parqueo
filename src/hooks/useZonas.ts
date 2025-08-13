import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from "sonner";

import { zonaSchema, type ZonaSchema } from "@/schemas/zona.schema";
import type { ZonaResponse } from "@/types/zona.types";
import { zonaService } from "@/services/zona.service";

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
        defaultValues: { nombre: "", descripcion: "", totalEspacios: 1 },
    });

    const loadZonas = async (page = 0, size = 5, query?: string, estado?: string) => {
        try {
            const filters: any = { page, size };
            if (query) filters.query = query;
            if (estado && estado !== "all") filters.estado = estado === "true";
            const res = await zonaService.findAll(filters);
            setZonas(res.data.content);
            setPagination({
                currentPage: res.data.number,
                totalPages: res.data.totalPages,
                totalElements: res.data.totalElements,
                pageSize: res.data.size,
            });
        } catch (error: any) {
            const errorMessage = error.response?.data?.mensaje || error.message || 'Error al cargar zonas';
            toast.error(errorMessage);
        }
    };

    const handleSubmit = async (values: ZonaSchema) => {
        setSubmitting(true);
        try {
            if (editingZona) {
                await zonaService.update(editingZona.id, values);
                toast.success("Zona actualizada correctamente");
            } else {
                await zonaService.create(values);
                toast.success("Zona creada correctamente");
            }
            await loadZonas(pagination.currentPage, pagination.pageSize);
            setDialogOpen(false);
        } catch (error: any) {
            const errorMessage = error.response?.data?.mensaje || error.message || 'Error al guardar zona';
            toast.error(errorMessage);
        } finally {
            setSubmitting(false);
        }
    };

    const handleAdd = () => {
        setEditingZona(null);
        form.reset({ nombre: "", descripcion: "", totalEspacios: 1 });
        setDialogOpen(true);
    };

    const handleEdit = (zona: ZonaResponse) => {
        setEditingZona(zona);
        form.reset({
            nombre: zona.nombre,
            descripcion: zona.descripcion,
            totalEspacios: zona.totalEspacios,
        });
        setDialogOpen(true);
    };

    const toggleStatus = async (id: number) => {
        try {
            await zonaService.toggleStatus(id);
            toast.success("Estado cambiado correctamente");
            await loadZonas(pagination.currentPage, pagination.pageSize);
        } catch (error: any) {
            const errorMessage = error.response?.data?.mensaje || error.message || 'Error al cambiar estado';
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
        handleSubmit,
        handleAdd,
        handleEdit,
        toggleStatus,
        submitting
    };
};
