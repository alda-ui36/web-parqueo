export interface RegistroEntradaRequest {
  placa: string;
  marca: string;
  color: string;
  idTipoVehiculo: number;
  dni: string;
  nombres: string;
  apePaterno: string;
  apeMaterno: string;
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
