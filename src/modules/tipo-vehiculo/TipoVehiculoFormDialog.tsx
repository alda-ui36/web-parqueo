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
import { type UseFormReturn } from "react-hook-form";
import type { TipoVehiculoSchema } from "@/schemas/tipo-vehiculo.schema";

interface TipoVehiculoFormDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    form: UseFormReturn<TipoVehiculoSchema>;
    onSubmit: (values: TipoVehiculoSchema) => Promise<void>;
    submitting: boolean;
    editingTipo: any | null;
}

export const TipoVehiculoFormDialog = ({
    open,
    onOpenChange,
    form,
    onSubmit,
    submitting,
    editingTipo
}: TipoVehiculoFormDialogProps) => {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>{editingTipo ? "Editar Tipo de Vehículo" : "Nuevo Tipo de Vehículo"}</DialogTitle>
                    <DialogDescription>
                        {editingTipo ? "Edita los datos del tipo de vehículo." : "Ingresa los datos del nuevo tipo de vehículo."}
                    </DialogDescription>
                </DialogHeader>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <FormField
                            control={form.control}
                            name="nombre"
                            render={({ field, fieldState }) => (
                                <FormItem>
                                    <FormLabel>Nombre *</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="nombre del tipo de vehículo"
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
                            name="tarifaHora"
                            render={({ field, fieldState }) => (
                                <FormItem>
                                    <FormLabel>Tarifa por Hora *</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="number"
                                            placeholder="tarifa por hora"
                                            {...field}
                                            onChange={(e) => field.onChange(+e.target.value)}
                                            className={fieldState.invalid ? "border-red-500" : ""}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="descripcion"
                            render={({ field, fieldState }) => (
                                <FormItem>
                                    <FormLabel>Descripción</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="descripción del tipo de vehículo"
                                            {...field}
                                            className={fieldState.invalid ? "border-red-500" : ""}
                                        />
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
                                {submitting ? "Guardando..." : editingTipo ? "Actualizar" : "Crear"}
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}; 