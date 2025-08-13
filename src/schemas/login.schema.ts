import { z } from 'zod';

export const loginSchema = z.object({
  login: z.string().min(1, 'El usuario es obligatorio'),
  password: z
    .string()
    .min(8, 'La contraseña debe tener al menos 8 caracteres'),
});

export type LoginSchema = z.infer<typeof loginSchema>;
