import { z } from "zod";

export const registroEntradaSchema = z.object({
    placa: z.string().min(1, "La placa es obligatoria"),
    marca: z.string().optional(),
    color: z.string().optional(),
    idTipoVehiculo: z.number().min(1, "Selecciona un tipo de vehículo"),
    dni: z.string().min(8, "El DNI debe tener 8 dígitos").max(8, "El DNI debe tener 8 dígitos"),
    nombres: z.string().min(1, "El nombre es obligatorio"),
    apePaterno: z.string().min(1, "El apellido paterno es obligatorio"),
    apeMaterno: z.string().min(1, "El apellido materno es obligatorio"),
    telefono: z.string().regex(/^\d{0,9}$/, "Máximo 9 dígitos").optional(),
    direccion: z.string().optional(),
    correo: z.string().min(1, "El correo es obligatorio"),
    idEspacio: z.number().min(1),
    tarifaHora: z.number().min(0, "La tarifa es obligatoria"),
});

export type RegistroEntradaSchema = z.infer<typeof registroEntradaSchema>; 