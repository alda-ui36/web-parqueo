export interface LoginRequest {
  login: string;
  password: string;
}

export interface AuthData {
  accessToken: string;
  refreshToken: string;
  userId: number;
  username: string;
  email: string;
  roles: string[];
}

export interface AuthResponse {
  mensaje: string;
  data: AuthData;
  code: number;
  timestamp: string;
}

export interface RequestCodeRequest {
  email: string;
}

export interface ResetPasswordRequest {
  email: string;
  codigo: string;
  nuevaPassword: string;
}

