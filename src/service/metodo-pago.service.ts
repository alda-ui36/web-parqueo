import type { ApiResponse } from "@/types/api.types";
import { mainApi } from "@/config/axios.config";
import type {
  MetodoPagoRequest,
  MetodoPagoResponse,
  MetodoPagoFilters,
  MetodoPagoPageResponse,
} from "@/types/metodo-pago.types";

export const metodoPagoService = {
  async create(
    request: MetodoPagoRequest
  ): Promise<ApiResponse<MetodoPagoResponse>> {
    const response = await mainApi.post("/metodos-pago", request);
    return response.data;
  },

  async update(
    id: number,
    request: MetodoPagoRequest
  ): Promise<ApiResponse<MetodoPagoResponse>> {
    const response = await mainApi.put(`/metodos-pago/${id}`, request);
    return response.data;
  },

  async toggleStatus(id: number): Promise<ApiResponse<MetodoPagoResponse>> {
    const response = await mainApi.patch(`/metodos-pago/${id}/toggle-status`);
    return response.data;
  },

  async findById(id: number): Promise<ApiResponse<MetodoPagoResponse>> {
    const response = await mainApi.get(`/metodos-pago/${id}`);
    return response.data;
  },

  async findAll(
    filters: MetodoPagoFilters = {}
  ): Promise<ApiResponse<MetodoPagoPageResponse>> {
    const params = new URLSearchParams();
    if (filters.query) params.append("query", filters.query);
    if (filters.estado !== undefined)
      params.append("estado", filters.estado.toString());
    if (filters.page !== undefined)
      params.append("page", filters.page.toString());
    if (filters.size !== undefined)
      params.append("size", filters.size.toString());
    const response = await mainApi.get(`/metodos-pago?${params.toString()}`);
    return response.data;
  },
};
