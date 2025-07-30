import { AuthLayout } from "@/components/layout/AuthLayout";
import { BrowserRouter, Routes,  Navigate, Route } from "react-router-dom";
import { Toaster } from "sonner";
import PublicRouter from "./PublicRouter";

export const AppRouter = () =>(
    <BrowserRouter>
    <Routes>
        <Route path="/auth" element={
            <PublicRouter>
            <AuthLayout />
            </PublicRouter>
            }>
        
        </Route>

        <Route path="*" element={ <Navigate to="/auth/login" replace /> } />
    </Routes>
    <Toaster />
    </BrowserRouter>

        );
