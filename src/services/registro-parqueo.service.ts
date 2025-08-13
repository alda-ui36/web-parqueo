import { mainApi } from "@/config/axios.config";
import type {
  RegistroEntradaRequest,
  RegistroSalidaRequest,
  RegistroParqueoProjection,
  RegistroParqueoResponse,
  RegistroParqueoFilters,
  RegistroParqueoPageResponse,
} from "@/types/registro-parqueo.types";
import type { ApiResponse } from "@/types/api.types";

export const registroParqueoService = {
  async registrarEntrada(
    request: RegistroEntradaRequest
  ): Promise<ApiResponse<RegistroParqueoProjection>> {
    const response = await mainApi.post("/parqueo/entrada", request);
    return response.data;
  },

  async registrarSalida(
    request: RegistroSalidaRequest
  ): Promise<ApiResponse<RegistroParqueoProjection>> {
    const response = await mainApi.post("/parqueo/salida", request);
    return response.data;
  },

  async obtenerRegistroActivo(
    idEspacio: number
  ): Promise<ApiResponse<RegistroParqueoProjection>> {
    const response = await mainApi.get(`/parqueo/espacio/${idEspacio}`);
    return response.data;
  },

  async findById(id: number): Promise<ApiResponse<RegistroParqueoResponse>> {
    const response = await mainApi.get(`/parqueo/${id}`);
    return response.data;
  },

  async findAll(
    filters: RegistroParqueoFilters = {}
  ): Promise<ApiResponse<RegistroParqueoPageResponse>> {
    const params = new URLSearchParams();

    if (filters.query) params.append("query", filters.query);
    if (filters.idMetodoPago !== undefined)
      params.append("idMetodoPago", filters.idMetodoPago.toString());
    if (filters.estado) params.append("estado", filters.estado);
    if (filters.desde) params.append("desde", filters.desde.toISOString());
    if (filters.hasta) params.append("hasta", filters.hasta.toISOString());
    if (filters.page !== undefined)
      params.append("page", filters.page.toString());
    if (filters.size !== undefined)
      params.append("size", filters.size.toString());

    const response = await mainApi.get(`/parqueo?${params.toString()}`);
    return response.data;
  },
};
