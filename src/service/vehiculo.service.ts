import { mainApi } from "@/config/axios.config";
import type { ApiResponse } from "@/types/api.types";
import type { VehiculoResponse } from "@/types/vehiculo.types";

export const vehiculoService = {
  async buscarPorPlaca(placa: string): Promise<ApiResponse<VehiculoResponse>> {
    const response = await mainApi.get(`/vehiculos/buscar/${placa}`);
    return response.data;
  },
};
