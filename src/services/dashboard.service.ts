// src/services/dashboard.service.ts
import { mainApi } from "@/config/axios.config";
import type { DashboardStatsResponse } from "@/types/dashboard.types";

export const dashboardService = {
  async getStats(
    fechaInicio: string,
    fechaFin: string
  ): Promise<DashboardStatsResponse> {
    const response = await mainApi.get("/dashboard/stats", {
      params: { fechaInicio, fechaFin }
    });
    return (response.data?.data ?? response.data) as DashboardStatsResponse;
  }
};
