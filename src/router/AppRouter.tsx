import { AuthLayout } from "@/components/layout/AuthLayout";
import { BrowserRouter, Routes, Navigate, Route } from "react-router-dom";
import { Toaster } from "sonner";
import PublicRouter from "./PublicRouter";
import { LoginPage } from "@/pages/auth/LoginPage";
import { RequestCodePage } from "@/pages/auth/RequestCodePage";
import { ResetPasswordPage } from "@/pages/auth/ResetPassword";
import ProtectedRouter from "./ProtectedRouter";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { DashboardPage } from "@/pages/dashboard/DashboardPage";
import { ZonasPage } from "@/pages/zonas/ZonasPage";
import { TipoVehiculoPage } from "@/pages/tipo-vehiculo/TipoVehiculoPage";
import { MetodoPagoPage } from "@/pages/metodo-pago/MetodoPagoPage";
import { EspacioPage } from "@/pages/espacio/EspacioPage";

export const AppRouter = () => (
  <BrowserRouter>
    <Routes>
      <Route
        path="/auth"
        element={
          <PublicRouter>
            <AuthLayout />
          </PublicRouter>
        }
      >
        <Route path="login" element={<LoginPage />} />
        <Route path="request-code" element={<RequestCodePage />} />
        <Route path="reset-password" element={<ResetPasswordPage />} />
      </Route>

      <Route
        path="/"
        element={
          <ProtectedRouter>
            <DashboardLayout />
          </ProtectedRouter>
        }
      />
      <Route index element={<DashboardPage />} />
      <Route path="zonas" element={<ZonasPage />} />
      <Route path="tipo-vehiculos" element={<TipoVehiculoPage />} />
      <Route path="metodos-pago" element={<MetodoPagoPage />} />
      <Route path="espacios" element={<EspacioPage />} />

      <Route path="*" element={<Navigate to="/auth/login" replace />} />
    </Routes>
    <Toaster />
  </BrowserRouter>
);
