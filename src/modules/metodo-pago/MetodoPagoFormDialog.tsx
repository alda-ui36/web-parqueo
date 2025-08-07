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
import type { MetodoPagoSchema } from "@/schemas/metodo-pago.schema";

interface MetodoPagoFormDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    form: UseFormReturn<MetodoPagoSchema>;
    onSubmit: (values: MetodoPagoSchema) => Promise<void>;
    submitting: boolean;
    editingMetodo: any | null;
}

export const MetodoPagoFormDialog = ({
    open,
    onOpenChange,
    form,
    onSubmit,
    submitting,
    editingMetodo
}: MetodoPagoFormDialogProps) => {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>{editingMetodo ? "Editar Método de Pago" : "Nuevo Método de Pago"}</DialogTitle>
                    <DialogDescription>
                        {editingMetodo ? "Edita los datos del método de pago." : "Ingresa los datos del nuevo método de pago."}
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
                                            placeholder="nombre del método de pago"
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
                                {submitting ? "Guardando..." : editingMetodo ? "Actualizar" : "Crear"}
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}; 