import { useState } from "react";
import type { RequestCodeRequest, ResetPasswordRequest } from "../types/auth.types";
import { authService } from "../services/auth.service";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

interface UsePasswordResetReturn {
  requestCode: (request: RequestCodeRequest) => Promise<void>;
  resetPassword: (request: ResetPasswordRequest) => Promise<void>;
  isLoading: boolean;
}

export const usePasswordReset = (): UsePasswordResetReturn => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const requestCode = async (request: RequestCodeRequest) => {
    setIsLoading(true);
    try {
      await authService.requestCode(request);
      toast.success("Código enviado correctamente");
      navigate(`/auth/reset-password?email=${encodeURIComponent(request.email)}`);
    } catch (error: any) {
      const errorMessage = error.response?.data?.mensaje || error.message || 'Error al enviar el código';
      toast.error(errorMessage);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const resetPassword = async (request: ResetPasswordRequest) => {
    setIsLoading(true);
    try {
      await authService.resetPassword(request);
      toast.success("Contraseña restablecida correctamente");
      navigate("/auth/login");
    } catch (error: any) {
      const errorMessage = error.response?.data?.mensaje || error.message || 'Error al restablecer la contraseña';
      toast.error(errorMessage);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return { requestCode, resetPassword, isLoading };
}; 