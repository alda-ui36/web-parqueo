import type { PageResponse } from "./PageResponse";

export interface MetodoPagoRequest {
  nombre: string;
}

export interface MetodoPagoResponse {
  id: number;
  nombre: string;
  estado: boolean;
}
export interface MetodoPagoFilters {
  query?: string;
  estado?: boolean;
  page?: number;
  size?: number;
}

export type MetodoPagoPageResponse = PageResponse<MetodoPagoResponse>;
