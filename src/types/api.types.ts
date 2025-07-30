export interface ApiResponse<T> {
  mensaje: string;
  data: T;
  code: number;
  timestamp: string;
} 