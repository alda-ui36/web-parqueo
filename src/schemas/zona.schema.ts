import { z } from "zod";

export const zonaSchema = z.object({
  nombre: z
    .string()
    .min(2, "El nombre debe tener al menos 2 caracteres")
    .max(100, "El nombre debe tener como máximo 100 caracteres"),
  descripcion: z
    .string()
    .max(255, "La descripción debe tener como máximo 255 caracteres")
    .optional(),
  totalEspacios: z.number("Debe ser un numero").min(1, "Debe ser al menos 1"),
});

export type ZonaSchema = z.infer<typeof zonaSchema>;
