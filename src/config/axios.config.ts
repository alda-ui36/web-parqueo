import { JwtUtil } from "@/utils/jwt-utils";
import axios from "axios";

export const authApi = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 30000,
});

export const mainApi = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 30000,
});

let isRefreshingToken = false;
let refreshPromise: Promise<any> | null = null;

const refreshTokenRequest = async (): Promise<any> => {
  const refreshToken = JwtUtil.getRefreshToken();
  if (!refreshToken) return;
  return authApi.post(
    `/auth/refresh?refreshToken=${encodeURIComponent(refreshToken)}`
  );
};

window.addEventListener("token-refresh-needed", async () => {
  if (isRefreshingToken) return;
  isRefreshingToken = true;
  try {
    const response = await refreshTokenRequest();
    const { accessToken, refreshToken: newRefreshToken } =
      response?.data?.data || {};
    if (accessToken && newRefreshToken) {
      JwtUtil.setTokens(accessToken, newRefreshToken);
      JwtUtil.startTokenRefreshTimer();
    }
  } catch {
    JwtUtil.handleLogout();
  } finally {
    isRefreshingToken = false;
  }
});

authApi.interceptors.request.use((config) => {
  const token = JwtUtil.getAccessToken();
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

mainApi.interceptors.request.use(async (config) => {
  const token = JwtUtil.getAccessToken();
  if (!token) return config;
  if (refreshPromise) {
    await refreshPromise;
    config.headers.Authorization = `Bearer ${JwtUtil.getAccessToken()}`;
    return config;
  }
  if (JwtUtil.needsRefresh(token)) {
    const refreshToken = JwtUtil.getRefreshToken();
    if (refreshToken && !isRefreshingToken) {
      isRefreshingToken = true;
      refreshPromise = refreshTokenRequest()
        .then((response) => {
          const { accessToken, refreshToken: newRefreshToken } =
            response?.data?.data || {};
          if (accessToken && newRefreshToken) {
            JwtUtil.setTokens(accessToken, newRefreshToken);
            config.headers.Authorization = `Bearer ${accessToken}`;
          }
        })
        .catch(() => JwtUtil.handleLogout())
        .finally(() => {
          isRefreshingToken = false;
          refreshPromise = null;
        });
      await refreshPromise;
    }
  }
  config.headers.Authorization = `Bearer ${JwtUtil.getAccessToken()}`;
  return config;
});

authApi.interceptors.response.use(
  (r) => r,
  (e) => {
    if (e.response?.status === 401) JwtUtil.handleLogout();
    return Promise.reject(e);
  }
);

mainApi.interceptors.response.use(
  (r) => r,
  (e) => {
    if (e.response?.status === 401 && !e.config.url.includes("/auth/refresh"))
      JwtUtil.handleLogout();
    return Promise.reject(e);
  }
);
