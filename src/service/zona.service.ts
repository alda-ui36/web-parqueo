import { mainApi } from "@/config/axios.config";
import type { ApiResponse } from "@/types/api.types";
import type {
  ZonaFilters,
  ZonaPageResponse,
  ZonaRequest,
  ZonaResponse,
} from "@/types/zona.types";

export const zonaService = {
  async create(request: ZonaRequest): Promise<ApiResponse<ZonaResponse>> {
    const response = await mainApi.post("/zonas", request);
    return response.data;
  },

  async update(
    id: number,
    request: ZonaRequest
  ): Promise<ApiResponse<ZonaResponse>> {
    const response = await mainApi.put(`/zonas/${id}`, request);
    return response.data;
  },

  async toggleStatus(id: number): Promise<ApiResponse<ZonaResponse>> {
    const response = await mainApi.patch(`/zonas/${id}/toggle-status`);
    return response.data;
  },

  async getById(id: number): Promise<ApiResponse<ZonaResponse>> {
    const response = await mainApi.get(`/zonas/${id}`);
    return response.data;
  },

  async findAll(
    filters: ZonaFilters = {}
  ): Promise<ApiResponse<ZonaPageResponse>> {
    const params = new URLSearchParams();
    if (filters.query) params.append("query", filters.query);
    if (filters.estado !== undefined)
      params.append("estado", filters.estado.toString());
    if (filters.page !== undefined)
      params.append("page", filters.page.toString());
    if (filters.size !== undefined)
      params.append("size", filters.size.toString());
    const response = await mainApi.get(`/zonas?${params.toString()}`);
    return response.data;
  },
};
