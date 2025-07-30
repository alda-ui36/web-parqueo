import { z } from "zod";

export const loginSchema = z.object({
  login: z.string().min(1, "El usuario es requerido"),
  password: z.string().min(6, "La contraseña debe tener al menos 6 caracteres"),
});

export type LoginSchema = z.infer<typeof loginSchema>;
