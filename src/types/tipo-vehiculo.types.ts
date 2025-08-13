import type { PageResponse } from "./page.types";

export interface TipoVehiculoRequest {
  nombre: string;
  tarifaHora: number;
  descripcion?: string;
}

export interface TipoVehiculoResponse {
  id: number;
  nombre: string;
  tarifaHora: number;
  descripcion?: string;
  estado: boolean;
}

export interface TipoVehiculoFilters {
  query?: string;
  estado?: boolean;
  page?: number;
  size?: number;
}

export type TipoVehiculoPageResponse = PageResponse<TipoVehiculoResponse>; 