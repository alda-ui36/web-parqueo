export interface RegistroEntradaRequest {
  placa?: string;
  marca?: string;
  color?: string;
  idTipoVehiculo?: number;
  dni?: string;
  nombres?: string;
  apePaterno?: string;
  apeMaterno?: string;
  telefono?: string;
  direccion?: string;
  correo?: string;
  idEspacio: number;
  tarifaHora: number;
}

export interface RegistroSalidaRequest {
  ticket: string;
  montoTotal: number;
  idMetodoPago: number;
}

export interface RegistroParqueoProjection {
  ticket: string;
  horaIngreso: string;
  tarifaHora: number;
  montoTotal: number;
  estadoPago: string;
  nombres: string;
  apePaterno: string;
  apeMaterno: string;
  dni: string;
  telefono: string;
  placa: string;
  marca: string;
  color: string;
  tipoVehiculo: string;
  email: string;
  zonaNombre: string;
  numeroEspacio: string;
}

export interface RegistroParqueoFilters {
  query?: string;
  idMetodoPago?: number;
  estado?: string;
  desde?: Date;
  hasta?: Date;
  page?: number;
  size?: number;
}

export interface RegistroParqueoPageResponse {
  content: RegistroParqueoResponse[];
  totalElements: number;
  totalPages: number;
  number: number; // página actual
  size: number; // tamaño de página
}

export interface RegistroParqueoResponse {
  id: number;
  ticket: string;
  idCliente: number;
  nombresCliente: string;
  apePaternoCliente: string;
  apeMaternoCliente: string;
  dniCliente: string;
  telefonoCliente: string;
  correoCliente: string;
  idVehiculo: number;
  placaVehiculo: string;
  marcaVehiculo: string;
  colorVehiculo: string;
  tipoVehiculo: string;
  idTipoVehiculo: number;
  idEspacio: number;
  numeroEspacio: string;
  zonaNombre: string;
  idMetodoPago: number;
  nombreMetodoPago: string;
  horaIngreso: string;
  horaSalida: string | null;
  tarifaHora: number;
  montoTotal: number;
  estadoPago: string;
  idCreadoPor: number;
  nombreCreadoPor: string;
  idActualizadoPor: number;
  nombreActualizadoPor: string;
  creadoEn: string;
  actualizadoEn: string;
}
