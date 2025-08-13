import { z } from 'zod';

export const espacioSchema = z.object({
  zonaId: z.number({ invalid_type_error: 'Debe seleccionar una zona' }),
  numeroEspacio: z.string().min(1, 'El número de espacio es obligatorio').max(10, 'Máx. 10 caracteres'),
  tipoVehiculoId: z.number({ invalid_type_error: 'Debe seleccionar un tipo de vehículo' }),
});

export type EspacioSchema = z.infer<typeof espacioSchema>; 