import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogDescription
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { type UseFormReturn } from "react-hook-form";
import type { EspacioSchema } from "@/schemas/espacio.schema";
import type { ZonaResponse } from "@/types/zona.types";

interface EspacioFormDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    form: UseFormReturn<EspacioSchema>;
    onSubmit: (values: EspacioSchema) => Promise<void>;
    submitting: boolean;
    editingEspacio: any | null;
    zonas: ZonaResponse[];
    tiposVehiculo: { id: number; nombre: string }[];
    getEspaciosDisponibles: (zonaId: number) => number;
}

export const EspacioFormDialog = ({
    open,
    onOpenChange,
    form,
    onSubmit,
    submitting,
    editingEspacio,
    zonas,
    tiposVehiculo,
    getEspaciosDisponibles
}: EspacioFormDialogProps) => {
    const zonaSeleccionada = zonas.find(z => z.id === form.watch("zonaId"));
    const espaciosDisponibles = form.watch("zonaId") ? getEspaciosDisponibles(form.watch("zonaId")) : null;
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>{editingEspacio ? "Editar Espacio" : "Nuevo Espacio"}</DialogTitle>
                    <DialogDescription>
                        {editingEspacio ? "Edita los datos del espacio." : "Ingresa los datos del nuevo espacio."}
                    </DialogDescription>
                </DialogHeader>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <FormField
                            control={form.control}
                            name="zonaId"
                            render={({ field, fieldState }) => (
                                <FormItem>
                                    <FormLabel>Zona *</FormLabel>
                                    <FormControl>
                                        <Select value={field.value ? String(field.value) : ""} onValueChange={v => field.onChange(Number(v))}>
                                            <SelectTrigger className={fieldState.invalid ? "border-red-500 w-full" : "w-full"}>
                                                <SelectValue placeholder="Selecciona una zona" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {zonas.map(z => {
                                                    const disponibles = getEspaciosDisponibles(z.id);
                                                    return (
                                                        <SelectItem
                                                            key={z.id}
                                                            value={String(z.id)}
                                                            disabled={disponibles <= 0}
                                                            className={disponibles <= 0 ? "text-red-500" : ""}
                                                        >
                                                            {z.nombre} {" "}
                                                            <span className={disponibles <= 0 ? "text-red-500 font-bold" : "font-bold"}>
                                                                ({disponibles} disp.)
                                                            </span>
                                                        </SelectItem>
                                                    );
                                                })}
                                            </SelectContent>
                                        </Select>
                                    </FormControl>
                                    {zonaSeleccionada && (
                                        <div className="text-xs text-gray-500 mt-1">
                                            Espacios disponibles: <span className={espaciosDisponibles === 0 ? "text-red-500 font-bold" : "font-bold"}>{espaciosDisponibles}</span> / {zonaSeleccionada.totalEspacios}
                                        </div>
                                    )}
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="numeroEspacio"
                            render={({ field, fieldState }) => (
                                <FormItem>
                                    <FormLabel>Número de Espacio *</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="número de espacio"
                                            {...field}
                                            className={fieldState.invalid ? "border-red-500" : ""}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="tipoVehiculoId"
                            render={({ field, fieldState }) => (
                                <FormItem>
                                    <FormLabel>Tipo de Vehículo *</FormLabel>
                                    <FormControl>
                                        <Select value={field.value ? String(field.value) : ""} onValueChange={v => field.onChange(Number(v))}>
                                            <SelectTrigger className={fieldState.invalid ? "border-red-500 w-full" : "w-full"}>
                                                <SelectValue placeholder="Selecciona un tipo de vehículo" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {tiposVehiculo.map(t => (
                                                    <SelectItem key={t.id} value={String(t.id)}>{t.nombre}</SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <DialogFooter>
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => onOpenChange(false)}
                                disabled={submitting}
                            >
                                Cancelar
                            </Button>
                            <Button type="submit" disabled={submitting}>
                                {submitting ? "Guardando..." : editingEspacio ? "Actualizar" : "Crear"}
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}; 