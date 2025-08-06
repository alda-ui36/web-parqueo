import { mainApi } from "@/config/axios.config";
import type { ApiResponse } from "@/types/api.types";
import type {
  RegistroEntradaRequest,
  RegistroParqueoProjection,
  RegistroSalidaRequest,
} from "@/types/registro-parqueo.types";

export const registroParqueoService = {
  async registrarEntrada(
    request: RegistroEntradaRequest
  ): Promise<ApiResponse<RegistrationOptions>> {
    const response = await mainApi.post(`/parqueo/entrada`, request);
    return response.data;
  },

  async registrarSalida(
    request: RegistroSalidaRequest
  ): Promise<ApiResponse<RegistroParqueoProjection>> {
    const response = await mainApi.post(`/parqueo/salida`, request);
    return response.data;
  },

  async obtenerRegistroActivo(
    idEspacio: number
  ): Promise<ApiResponse<RegistroParqueoProjection>> {
    const response = await mainApi.get(`/parqueo/espacio/${idEspacio}`);
    return response.data;
  },
};
