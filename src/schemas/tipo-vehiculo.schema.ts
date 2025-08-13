import { z } from 'zod';

export const tipoVehiculoSchema = z.object({
  nombre: z.string().min(1, 'El nombre es obligatorio').max(50, 'Máx. 50 caracteres'),
  tarifaHora: z
    .number({ invalid_type_error: 'Debe ser un número' })
    .min(0.01, 'La tarifa debe ser mayor a 0'),
  descripcion: z.string().max(250, 'Máx. 250 caracteres').optional(),
});

export type TipoVehiculoSchema = z.infer<typeof tipoVehiculoSchema>; 