import { z } from 'zod';

export const clienteSchema = z.object({
  nombres: z.string().min(1, 'Los nombres son obligatorios').max(100, 'Máx. 100 caracteres'),
  apePaterno: z.string().min(1, 'Apellido paterno es obligatorio').max(60, 'Máx. 60 caracteres'),
  apeMaterno: z.string().min(1, 'Apellido materno es obligatorio').max(60, 'Máx. 60 caracteres'),
  dni: z.string().min(8, 'DNI debe tener 8 caracteres').max(12, 'Máx. 12 caracteres'),
  telefono: z.string().min(6, 'Teléfono inválido').max(20, 'Máx. 20 caracteres'),
  direccion: z.string().min(3, 'Dirección demasiado corta').max(150, 'Máx. 150 caracteres'),
  correo: z.string().email('Correo inválido').max(120, 'Máx. 120 caracteres'),
});

export type ClienteSchema = z.infer<typeof clienteSchema>;
