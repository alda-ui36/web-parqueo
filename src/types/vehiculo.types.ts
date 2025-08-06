export interface VehiculoResponse {
  id: number;
  placa: string;
  marca: string;
  color: string;
  tipoVehiculo: string;
  idTipoVehiculo: number;
  idCliente: number;
  dniCliente: string;
  nombresCliente: string;
  apePaternoCliente: string;
  apeMaternoCliente: string;
  estado: boolean;
}
