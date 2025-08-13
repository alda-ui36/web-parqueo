import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthLayout } from "../components/layouts/AuthLayout";
import Page from "../components/layouts/DashboardLayout";
import { LoginPage } from "../pages/auth/LoginPage";
import { RequestCodePage } from "../pages/auth/RequestCodePage";
import { ResetPasswordPage } from "../pages/auth/ResetPasswordPage";
import { ZonasPage } from "../pages/zonas/ZonasPage";
import { TipoVehiculoPage } from "../pages/tipo-vehiculo/TipoVehiculoPage";
import { MetodoPagoPage } from "../pages/metodo-pago/MetodoPagoPage";
import { EspacioPage } from "../pages/espacio/EspacioPage";
import { ParqueoPage } from "../pages/parqueo/ParqueoPage";
import PublicRoute from "./PublicRoute";
import ProtectedRoute from "./ProtectedRoute";
import { Toaster } from "@/components/ui/sonner";
import { ParqueoListPage } from "@/pages/parqueo/ParqueoListPage";
import ClientePage from "@/pages/cliente/ClientePage";
import DashboardPage from "@/pages/dashboard/DashboardPage";

export const AppRouter = () => (
  <BrowserRouter>
    <Routes>
      <Route
        path="/auth"
        element={
          <PublicRoute>
            <AuthLayout />
          </PublicRoute>
        }
      >
        <Route path="login" element={<LoginPage />} />
        <Route path="request-code" element={<RequestCodePage />} />
        <Route path="reset-password" element={<ResetPasswordPage />} />
      </Route>

      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Page />
          </ProtectedRoute>
        }
      >
        <Route index element={<DashboardPage />} />
        <Route path="zonas" element={<ZonasPage />} />
        <Route path="tipo-vehiculos" element={<TipoVehiculoPage />} />
        <Route path="metodos-pago" element={<MetodoPagoPage />} />
        <Route path="espacios" element={<EspacioPage />} />
        <Route path="parqueo" element={<ParqueoPage />} />
        <Route path="parqueo/listado" element={<ParqueoListPage />} />
        <Route path="clientes" element={<ClientePage />} />
      </Route>

      <Route path="*" element={<Navigate to="/auth/login" replace />} />
    </Routes>
    <Toaster />
  </BrowserRouter>
);
