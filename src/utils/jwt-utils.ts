import { jwtDecode } from "jwt-decode";

interface JwtPayload {
  sub: string;
  exp: number;
  email?: string;
  userId?: number;
  id?: number;
  roles?: string[];
}

type Timeout = ReturnType<typeof setTimeout> | null;

export class JwtUtil {
  static REFRESH_THRESHOLD = 5 * 60;
  static refreshTimeout: Timeout = null;

  static setTokens(accessToken: string, refreshToken: string): void {
    if (!accessToken || !refreshToken || accessToken.split(".").length !== 3)
      throw new Error("Tokens inválidos");
    const decoded = this.decodeToken(accessToken);
    if (!decoded?.exp) throw new Error("Token sin expiración");
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);
    this.startTokenRefreshTimer();
  }

  static clearTokens(): void {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    this.stopTokenRefreshTimer();
  }

  static getAccessToken(): string | null {
    return localStorage.getItem("accessToken");
  }
  static getRefreshToken(): string | null {
    return localStorage.getItem("refreshToken");
  }

  static isTokenValid(token: string | null): boolean {
    if (!token) return false;
    const decoded = this.decodeToken(token);
    return !!decoded && !!decoded.exp && decoded.exp > Date.now() / 1000;
  }

  static needsRefresh(token: string): boolean {
    const decoded = this.decodeToken(token);
    if (!decoded?.exp) return true;
    return decoded.exp - Date.now() / 1000 < this.REFRESH_THRESHOLD;
  }

  static decodeToken(token: string): JwtPayload | null {
    try {
      return jwtDecode<JwtPayload>(token);
    } catch {
      return null;
    }
  }

  static getUserData(): {
    email: string;
    name: string;
    id?: number;
    roles: string[];
  } | null {
    const decoded = this.decodeToken(this.getAccessToken() || "");
    if (!decoded) return null;
    return {
      email: decoded.email || `${decoded.sub}@sistema.com`,
      name: decoded.sub || "",
      id: decoded.userId ?? decoded.id,
      roles: decoded.roles || [],
    };
  }

  static startTokenRefreshTimer(): void {
    this.stopTokenRefreshTimer();
    const token = this.getAccessToken();
    const decoded = this.decodeToken(token || "");
    if (!decoded?.exp) return;
    const ms = (decoded.exp - Date.now() / 1000 - 30) * 1000;
    if (ms <= 0) return this.triggerTokenRefresh();
    this.refreshTimeout = setTimeout(() => this.triggerTokenRefresh(), ms);
  }

  static stopTokenRefreshTimer(): void {
    if (this.refreshTimeout) clearTimeout(this.refreshTimeout);
    this.refreshTimeout = null;
  }

  static triggerTokenRefresh(): void {
    window.dispatchEvent(new CustomEvent("token-refresh-needed"));
  }

  static handleLogout(): void {
    this.clearTokens();
    sessionStorage.clear();
    window.location.replace("/auth/login");
  }
}
