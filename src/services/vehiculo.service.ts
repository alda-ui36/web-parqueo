import { mainApi } from "@/config/axios.config";
import type { VehiculoResponse } from "@/types/vehiculo.types";
import type { ApiResponse } from "@/types/api.types";

export const vehiculoService = {
    async buscarPorPlaca(placa: string): Promise<ApiResponse<VehiculoResponse>> {
        const response = await mainApi.get(`/vehiculos/buscar/${placa}`);
        return response.data;
    },
}; 