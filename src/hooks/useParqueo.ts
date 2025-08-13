import { useState } from "react";
import { toast } from "sonner";

import type { RegistroParqueoResponse, RegistroParqueoPageResponse, RegistroParqueoFilters } from "@/types/registro-parqueo.types";
import { registroParqueoService } from "@/services/registro-parqueo.service";

export const useParqueo = () => {
  const [registros, setRegistros] = useState<RegistroParqueoResponse[]>([]);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({
    currentPage: 0,
    totalPages: 0,
    totalElements: 0,
    pageSize: 10,
  });

  const loadRegistros = async (filters: RegistroParqueoFilters = {}) => {
    setLoading(true);
    try {
      const res = await registroParqueoService.findAll({
        page: filters.page ?? pagination.currentPage,
        size: filters.size ?? pagination.pageSize,
        query: filters.query,
        estado: filters.estado,
        idMetodoPago: filters.idMetodoPago,
        desde: filters.desde,
        hasta: filters.hasta,
      });
      const data: RegistroParqueoPageResponse = res.data;
      setRegistros(data.content);
      setPagination({
        currentPage: data.number,
        totalPages: data.totalPages,
        totalElements: data.totalElements,
        pageSize: data.size,
      });
    } catch (error: any) {
      const errorMessage = error?.response?.data?.mensaje || error.message || "Error al cargar registros de parqueo";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return {
    registros,
    loading,
    pagination,
    loadRegistros,
  };
};
