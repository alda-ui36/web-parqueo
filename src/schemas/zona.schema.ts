import { z } from 'zod';

export const zonaSchema = z.object({
  nombre: z.string().min(1, 'El nombre es obligatorio').max(50, 'Máx. 50 caracteres'),
  descripcion: z.string().max(500, 'Máx. 500 caracteres').optional(),
  totalEspacios: z
    .number({ invalid_type_error: 'Debe ser un número' })
    .min(1, 'Debe ser al menos 1')
});

export type ZonaSchema = z.infer<typeof zonaSchema>;
