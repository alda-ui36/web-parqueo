export interface ClienteRequest {
  nombres: string;
  apePaterno: string;
  apeMaterno: string;
  dni: string;
  telefono?: string;
  direccion?: string;
  correo?: string;
}

export interface ClienteResponse {
  id: number;
  nombres: string;
  apePaterno: string;
  apeMaterno: string;
  dni: string;
  telefono?: string;
  direccion?: string;
  correo?: string;
  estado: boolean;
}
