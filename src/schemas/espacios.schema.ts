import { z } from "zod";

export const espacioSchema = z.object({
  zonaId: z.number("Debes seleccionar una zona id"),
  numeroEspacio: z.string().min(1, " numero de espacio obligatorio"),
  tipoVehiculoId: z.number("Debes seleccionar un tipo de vehiculo id"),
});

export type EspacioSchema = z.infer<typeof espacioSchema>;
