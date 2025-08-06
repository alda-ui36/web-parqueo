import { z } from "zod";

export const tipoVehiculoSchema = z.object({
  nombre: z
    .string()
    .min(2, "El nombre debe tener al menos 2 caracteres")
    .max(100, "El nombre debe tener como máximo 100 caracteres"),
  tarifaHora: z
    .number("debe ser un numero")
    .min(0.01, "la tarifa debe ser mayor a 0"),
  descripcion: z
    .string()
    .max(255, "La descripción debe tener como máximo 255 caracteres")
    .optional(),
});

export type TipoVehiculoSchema = z.infer<typeof tipoVehiculoSchema>;
