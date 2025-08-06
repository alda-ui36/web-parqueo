import { z } from "zod";

export const metodoPagoSchema = z.object({
  nombre: z
    .string()
    .min(2, "El nombre debe tener al menos 2 caracteres")
    .max(100, "El nombre debe tener como máximo 100 caracteres"),
});

export type MetodoPagoSchema = z.infer<typeof metodoPagoSchema>;
