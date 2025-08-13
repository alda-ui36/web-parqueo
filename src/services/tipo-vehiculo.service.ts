import type { ApiResponse } from "@/types/api.types";
import { mainApi } from "@/config/axios.config";
import type {
  TipoVehiculoRequest,
  TipoVehiculoResponse,
  TipoVehiculoFilters,
  TipoVehiculoPageResponse
} from "@/types/tipo-vehiculo.types";

export const tipoVehiculoService = {
  async create(request: TipoVehiculoRequest): Promise<ApiResponse<TipoVehiculoResponse>> {
    const response = await mainApi.post("/tipo-vehiculos", request);
    return response.data;
  },

  async update(id: number, request: TipoVehiculoRequest): Promise<ApiResponse<TipoVehiculoResponse>> {
    const response = await mainApi.put(`/tipo-vehiculos/${id}`, request);
    return response.data;
  },

  async toggleStatus(id: number): Promise<ApiResponse<TipoVehiculoResponse>> {
    const response = await mainApi.patch(`/tipo-vehiculos/${id}/toggle-status`);
    return response.data;
  },

  async findById(id: number): Promise<ApiResponse<TipoVehiculoResponse>> {
    const response = await mainApi.get(`/tipo-vehiculos/${id}`);
    return response.data;
  },

  async findAll(filters: TipoVehiculoFilters = {}): Promise<ApiResponse<TipoVehiculoPageResponse>> {
    const params = new URLSearchParams();
    if (filters.query) params.append('query', filters.query);
    if (filters.estado !== undefined) params.append('estado', filters.estado.toString());
    if (filters.page !== undefined) params.append('page', filters.page.toString());
    if (filters.size !== undefined) params.append('size', filters.size.toString());
    const response = await mainApi.get(`/tipo-vehiculos?${params.toString()}`);
    return response.data;
  }
}; 