import { z } from "zod";

export const requestCodeSchema = z.object({
  email: z.string().email("El correo electrónico debe ser válido"),
});

export const resetPasswordSchema = z.object({
  email: z.string().email("El correo electrónico debe ser válido"),
  codigo: z.string().min(1, "El código es requerido"),
  nuevaPassword: z
    .string()
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{6,}$/,
      "La nueva contraseña debe tener al menos 6 caracteres, una mayúscula, una minúscula y un número"
    )
    .min(6, "La nueva contraseña debe tener al menos"),
});

export type RequestCodeSchema = z.infer<typeof requestCodeSchema>;
export type ResetPasswordSchema = z.infer<typeof resetPasswordSchema>;
