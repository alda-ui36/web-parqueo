import type { PageResponse } from "./page.types";

export interface ZonaRequest {
  nombre: string;
  descripcion?: string;
  totalEspacios: number;
}

export interface ZonaResponse {
  id: number;
  nombre: string;
  descripcion?: string;
  estado: boolean;
  totalEspacios: number;
}

export interface ZonaFilters {
  query?: string;
  estado?: boolean;
  page?: number;
  size?: number;
}

export type ZonaPageResponse = PageResponse<ZonaResponse>;