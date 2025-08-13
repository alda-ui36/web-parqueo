import { mainApi } from "@/config/axios.config";
import type { ClienteRequest, ClienteResponse, ClienteFilters, ClientePageResponse } from "@/types/cliente.types";
import type { ApiResponse } from "@/types/api.types";

export const clienteService = {
    async buscarPorDni(dni: string): Promise<ApiResponse<ClienteResponse>> {
        const response = await mainApi.get(`/clientes/buscar/${dni}`);
        return response.data;
    },
    async findAllActive(): Promise<ApiResponse<ClienteResponse[]>> {
        const response = await mainApi.get(`/clientes/activos`);
        return response.data;
    },
    async save(request: ClienteRequest): Promise<ApiResponse<ClienteResponse>> {
        const response = await mainApi.post(`/clientes`, request);
        return response.data;
    },
    async update(id: number, request: ClienteRequest): Promise<ApiResponse<ClienteResponse>> {
        const response = await mainApi.put(`/clientes/${id}`, request);
        return response.data;
    },
    async toggleStatus(id: number): Promise<ApiResponse<ClienteResponse>> {
        const response = await mainApi.patch(`/clientes/${id}/toggle-status`);
        return response.data;
    },
    async findAll(params: ClienteFilters = {}): Promise<ApiResponse<ClientePageResponse>> {
        const response = await mainApi.get(`/clientes`, { params });
        return response.data;
    },
}; 