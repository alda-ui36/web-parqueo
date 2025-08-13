import { z } from 'zod';

export const requestCodeSchema = z.object({
  email: z.string().email('El email debe ser válido'),
});

export const resetPasswordSchema = z.object({
  email: z.string().email('El email debe ser válido'),
  codigo: z.string().min(1, 'El código es obligatorio'),
  nuevaPassword: z
    .string()
    .min(6, 'La contraseña debe tener al menos 6 caracteres')
    .regex(/^(?=.*[A-Z])[^\s]{6,}$/, 'La contraseña debe tener al menos una mayúscula y no contener espacios'),
});

export type RequestCodeSchema = z.infer<typeof requestCodeSchema>;
export type ResetPasswordSchema = z.infer<typeof resetPasswordSchema>; 