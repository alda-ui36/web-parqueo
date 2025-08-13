export interface ClienteRequest {
    nombres: string;
    apePaterno: string;
    apeMaterno: string;
    dni: string;
    telefono: string;
    direccion: string;
    correo: string;
}

export interface ClienteResponse {
    id: number;
    nombres: string;
    apePaterno: string;
    apeMaterno: string;
    dni: string;
    telefono: string;
    direccion: string;
    correo: string;
    estado: boolean;
    distritoId: number;
    origen: string;
}

export interface ClienteFilters {
    query?: string;
    estado?: boolean;
    page?: number;
    size?: number;
}

import type { PageResponse } from "./page.types";
export type ClientePageResponse = PageResponse<ClienteResponse>;