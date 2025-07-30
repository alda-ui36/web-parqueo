import { AuthLayout } from "@/components/layout/AuthLayout";
import { BrowserRouter, Routes,  Navigate, Route } from "react-router-dom";
import { Toaster } from "sonner";
import PublicRouter from "./PublicRouter";
import { LoginPage } from "@/pages/auth/LoginPage";
import { RequestCodePage } from "@/pages/auth/RequestCodePage";
import { ResetPasswordPage } from "@/pages/auth/ResetPassword";

export const AppRouter = () =>(
    <BrowserRouter>
    <Routes>
        <Route path="/auth" element={
            <PublicRouter>
            <AuthLayout />
            </PublicRouter>
            }>
        <Route path="login" element={<LoginPage />} />
        <Route path="request-code" element={<RequestCodePage />} />
        <Route path="reset-password" element={<ResetPasswordPage />} />
        </Route>

        <Route path="*" element={ <Navigate to="/auth/login" replace /> } />
    </Routes>
    <Toaster />
    </BrowserRouter>

        );
