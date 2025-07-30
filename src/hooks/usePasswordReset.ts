import { authService } from "@/service/auth.service";
import type {
  RequestCodeRequest,
  ResetPasswordRequest,
} from "@/types/auth.types";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

interface UsePasswordResetReturn {
  requestCode: (request: RequestCodeRequest) => Promise<void>;
  resetPassword: (request: ResetPasswordRequest) => Promise<void>;
  isLoading: boolean;
}

export const usePasswordReset = (): UsePasswordResetReturn => {
  const [isLoading, setLoading] = useState(false);
  const navigate = useNavigate();

  const requestCode = async (request: RequestCodeRequest) => {
    setLoading(true);
    try {
      await authService.requestCode(request);
      toast.success("Codigo de verificación enviado al correo electrónico");
      navigate(
        `/auth/reset-password?email=${encodeURIComponent(request.email)}`
      );
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.mensaje ||
        error.message ||
        "Error al solicitar el código";
      toast.error(errorMessage);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const resetPassword = async (request: ResetPasswordRequest) => {
    setLoading(true);
    try {
      await authService.resetPassword(request);
      toast.success("Contraseña restablecida exitosamente");
      navigate("/auth/login");
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.mensaje ||
        error.message ||
        "Error al cambiar la contraseña";
      toast.error(errorMessage);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return { requestCode, resetPassword, isLoading };
};
