import { z } from "zod";

export const registroEntradaSchema = z.object({
  placa: z.string().min(1, " la placa es requerida"),
  marca: z.string().optional(),
  color: z.string().optional(),
  idTipoVehiculo: z.number().min(1, "selecciona un tipo de vehiculo"),
  dni: z.string().min(8, "dni 8 digitos requerido").max(8, "dni maximo 9"),
  nombres: z.string().min(1, " los nombres son requeridos"),
  apePaterno: z.string().min(1, " el apellido paterno es requerido"),
  apeMaterno: z.string().min(1, " el apellido materno es requerido"),
  telefono: z
    .string()
    .min(9, "telefono 9 digitos requerido")
    .max(9, "telefono maximo 9"),
  direccion: z.string().optional(),
  correo: z.string().min(1, "el correo es obligatorio"),
  idEspacio: z.number().min(1),
  tarifaHora: z.number().min(0, "la tarifa es obligatoria"),
});

export type RegistroEntradaSchema = z.infer<typeof registroEntradaSchema>;
