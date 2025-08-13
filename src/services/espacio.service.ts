import type { ApiResponse } from "@/types/api.types";
import { mainApi } from "@/config/axios.config";
import type {
  EspacioRequest,
  EspacioResponse,
  EspacioFilters,
  EspacioPageResponse
} from "@/types/espacio.types";

export const espacioService = {
  async create(request: EspacioRequest): Promise<ApiResponse<EspacioResponse>> {
    const response = await mainApi.post("/espacios", request);
    return response.data;
  },

  async update(id: number, request: EspacioRequest): Promise<ApiResponse<EspacioResponse>> {
    const response = await mainApi.put(`/espacios/${id}`, request);
    return response.data;
  },

  async toggleStatus(id: number): Promise<ApiResponse<EspacioResponse>> {
    const response = await mainApi.patch(`/espacios/${id}/toggle-status`);
    return response.data;
  },

  async findById(id: number): Promise<ApiResponse<EspacioResponse>> {
    const response = await mainApi.get(`/espacios/${id}`);
    return response.data;
  },

  async findAll(filters: EspacioFilters = {}): Promise<ApiResponse<EspacioPageResponse>> {
    const params = new URLSearchParams();
    if (filters.query) params.append('query', filters.query);
    if (filters.estado !== undefined) params.append('estado', filters.estado.toString());
    if (filters.page !== undefined) params.append('page', filters.page.toString());
    if (filters.size !== undefined) params.append('size', filters.size.toString());
    const response = await mainApi.get(`/espacios?${params.toString()}`);
    return response.data;
  }
}; 