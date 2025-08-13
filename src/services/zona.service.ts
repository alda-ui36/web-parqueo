import type { ApiResponse } from "@/types/api.types";
import { mainApi } from "@/config/axios.config";
import type { 
  ZonaRequest, 
  ZonaResponse, 
  ZonaFilters, 
  ZonaPageResponse 
} from "../types/zona.types";

export const zonaService = {
  // Crear zona
  async create(request: ZonaRequest): Promise<ApiResponse<ZonaResponse>> {
    const response = await mainApi.post("/zonas", request);
    return response.data;
  },

  // Actualizar zona
  async update(id: number, request: ZonaRequest): Promise<ApiResponse<ZonaResponse>> {
    const response = await mainApi.put(`/zonas/${id}`, request);
    return response.data;
  },

  // Cambiar estado de zona
  async toggleStatus(id: number): Promise<ApiResponse<ZonaResponse>> {
    const response = await mainApi.patch(`/zonas/${id}/toggle-status`);
    return response.data;
  },

  // Obtener zona por ID
  async findById(id: number): Promise<ApiResponse<ZonaResponse>> {
    const response = await mainApi.get(`/zonas/${id}`);
    return response.data;
  },

  // Obtener todas las zonas con filtros y paginación
  async findAll(filters: ZonaFilters = {}): Promise<ApiResponse<ZonaPageResponse>> {
    const params = new URLSearchParams();
    
    if (filters.query) params.append('query', filters.query);
    if (filters.estado !== undefined) params.append('estado', filters.estado.toString());
    if (filters.page !== undefined) params.append('page', filters.page.toString());
    if (filters.size !== undefined) params.append('size', filters.size.toString());

    const response = await mainApi.get(`/zonas?${params.toString()}`);
    return response.data;
  }
}; 