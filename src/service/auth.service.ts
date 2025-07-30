import { authApi } from "@/config/axios.config";
import type { ApiResponse } from "@/types/api.types";
import type {
  LoginRequest,
  AuthResponse,
  RequestCodeRequest,
  ResetPasswordRequest,
} from "@/types/auth.types";

export const authService = {
  login(credentials: LoginRequest): Promise<ApiResponse<AuthResponse>> {
    return authApi.post("/auth/login", credentials);
  },

  requestCode(request: RequestCodeRequest): Promise<ApiResponse<void>> {
    return authApi.get(`/password/solicitar-codigo?email=${request.email}`);
  },

  resetPassword(request: ResetPasswordRequest): Promise<ApiResponse<void>> {
    return authApi.post("/password/resetear", request);
  },
};
