import type { LoginRequest } from "../types/auth.types";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { authService } from "@/service/auth.service";
import { JwtUtil } from "@/utils/jwt-utils";

export const useAuth = () => {
  const navigate = useNavigate();

  const login = async (credentials: LoginRequest) => {
    try {
      const response = await authService.login(credentials);
      const { data } = response;
      JwtUtil.setTokens(data.data.accessToken, data.data.refreshToken);
      const userFromToken = JwtUtil.getUserData();
      toast.success(`¡Bienvenido ${userFromToken?.name || "Usuario"}!`);
      navigate("/");
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.mensaje ||
        error.message ||
        "Error de autenticación";
      toast.error(errorMessage);
      throw error;
    }
  };

  return { login };
};
