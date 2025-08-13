import { z } from 'zod';

export const metodoPagoSchema = z.object({
  nombre: z.string().min(1, 'El nombre es obligatorio').max(50, 'Máx. 50 caracteres'),
});

export type MetodoPagoSchema = z.infer<typeof metodoPagoSchema>; 