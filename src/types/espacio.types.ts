import type { PageResponse } from "./PageResponse";

export interface EspacioRequest {
  zonaId: number;
  numeroEspacio: string;
  tipoVehiculoId: number;
}

export interface EspacioResponse {
  id: number;
  zonaId: number;
  zonaNombre: string;
  numeroEspacio: string;
  ocupado: boolean;
  estado: boolean;
  tipoVehiculoId: number;
  tipoVehiculoNombre: string;
}

export interface EspacioFilters {
  query?: string;
  estado?: boolean;
  page?: number;
  size?: number;
}

export type EspacioPageResponse = PageResponse<EspacioResponse>;
