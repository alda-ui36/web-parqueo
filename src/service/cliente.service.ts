import { mainApi } from "@/config/axios.config";
import type { ApiResponse } from "@/types/api.types";
import type { ClienteRequest, ClienteResponse } from "@/types/cliente.types";

export const clienteService = {
  async save(request: ClienteRequest): Promise<ApiResponse<ClienteResponse>> {
    const response = await mainApi.post(`/clientes`, request);
    return response.data;
  },

  async update(
    id: number,
    request: ClienteRequest
  ): Promise<ApiResponse<ClienteResponse>> {
    const response = await mainApi.put(`/clientes/${id}`, request);
    return response.data;
  },
  async toggleStatus(id: number): Promise<ApiResponse<ClienteResponse>> {
    const response = await mainApi.patch(`/clientes/${id}/toggle-status`);
    return response.data;
  },
  async findAllActive(): Promise<ApiResponse<ClienteResponse[]>> {
    const response = await mainApi.get(`/clientes/activos`);
    return response.data;
  },
  async buscarPorDni(dni: string): Promise<ApiResponse<ClienteResponse>> {
    const response = await mainApi.get(`/clientes/buscar/${dni}`);
    return response.data;
  },
  async findAll(parms: {
    query?: string;
    estado?: boolean;
    page?: number;
    size?: number;
  }): Promise<ApiResponse<any>> {
    const response = await mainApi.get(`/clientes`, { params: parms });
    return response.data;
  },
};
