// src/types/dashboard.types.ts
export interface MonthlyData {
  month: string; // Ej: "January"
  totalReservas: number; // Long en backend
  montoTotal: number; // BigDecimal en backend
}

export interface MetodoPagoData {
  metodo: string;
  cantidadUsos: number; // Long en backend
}

export interface DashboardStatsResponse {
  monthlyStats: MonthlyData[];
  metodosPagoStats: MetodoPagoData[]; // Lista en lugar de uno solo
}
