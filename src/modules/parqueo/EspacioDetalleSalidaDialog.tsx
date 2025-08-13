import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "../../components/ui/dialog";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "../../components/ui/select";
import React, { useMemo, useEffect } from "react";
import { Label } from "../../components/ui/label";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import type { MetodoPagoResponse } from "@/types/metodo-pago.types";
import type { RegistroParqueoProjection } from "@/types/registro-parqueo.types";



interface EspacioDetalleSalidaDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    detalle: RegistroParqueoProjection | null;
    loading: boolean;
    metodosPago: MetodoPagoResponse[];
    onRegistrarSalida: (data: { ticket: string; montoTotal: number; idMetodoPago: number }) => void;
}

// Esquema para validación
const salidaSchema = z.object({
    montoTotal: z.number().min(0, "El monto es requerido"),
    idMetodoPago: z.number().min(1, "Selecciona un método de pago"),
});

type SalidaSchema = z.infer<typeof salidaSchema>;

export const EspacioDetalleSalidaDialog: React.FC<EspacioDetalleSalidaDialogProps> = ({
    open,
    onOpenChange,
    detalle,
    loading,
    metodosPago,
    onRegistrarSalida
}) => {
    const { tiempoHoras, montoTotalCalculado } = useMemo(() => {
        if (!detalle) return { tiempoHoras: 0, montoTotalCalculado: 0 };
        const ingreso = new Date(detalle.horaIngreso);
        const ahora = new Date();
        let diffMs = ahora.getTime() - ingreso.getTime();
        if (diffMs < 0) diffMs = 0;
        const horas = Math.ceil(diffMs / (1000 * 60 * 60));
        const monto = horas * detalle.tarifaHora;
        return { tiempoHoras: horas, montoTotalCalculado: monto };
    }, [detalle]);

    // react-hook-form para los campos editables
    const form = useForm<SalidaSchema>({
        resolver: zodResolver(salidaSchema),
        defaultValues: {
            montoTotal: montoTotalCalculado,
            idMetodoPago: metodosPago[0]?.id || 1,
        },
    });

    // Sincronizar montoTotal calculado cuando cambia el detalle
    useEffect(() => {
        form.setValue("montoTotal", montoTotalCalculado);
    }, [montoTotalCalculado, detalle]);

    const handleSubmit = async (values: SalidaSchema) => {
        if (!detalle) return;
        onRegistrarSalida({
            ticket: detalle.ticket,
            montoTotal: values.montoTotal,
            idMetodoPago: values.idMetodoPago,
        });
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                    <DialogTitle>Detalle de Parqueo</DialogTitle>
                    <DialogDescription>Registra la salida y el pago del vehículo.</DialogDescription>
                </DialogHeader>
                {loading ? (
                    <div className="text-center py-8">Cargando detalle...</div>
                ) : detalle ? (
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <Label>Cliente</Label>
                                    <div>{detalle.nombres} {detalle.apePaterno} {detalle.apeMaterno}</div>
                                </div>
                                <div>
                                    <Label>DNI</Label>
                                    <div>{detalle.dni}</div>
                                </div>
                                <div>
                                    <Label>Placa</Label>
                                    <div>{detalle.placa}</div>
                                </div>
                                <div>
                                    <Label>Tipo</Label>
                                    <div>{detalle.tipoVehiculo}</div>
                                </div>
                                <div>
                                    <Label>Ticket</Label>
                                    <div>{detalle.ticket}</div>
                                </div>
                                <div>
                                    <Label>Ingreso</Label>
                                    <div>{new Date(detalle.horaIngreso).toLocaleString("es-PE", { year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit" })}</div>
                                </div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <Label>Tarifa por hora</Label>
                                    <div>S/ {detalle.tarifaHora}</div>
                                </div>
                                <div>
                                    <Label>Tiempo transcurrido</Label>
                                    <div>{tiempoHoras} hora(s)</div>
                                </div>
                                <FormField
                                    control={form.control}
                                    name="montoTotal"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Monto total a pagar</FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="number"
                                                    {...field}
                                                    value={field.value}
                                                    onChange={e => field.onChange(Number(e.target.value))}
                                                    min={0}
                                                    step={0.01}
                                                    className="text-center"
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="idMetodoPago"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Método de pago</FormLabel>
                                            <FormControl>
                                                <Select
                                                    value={String(field.value)}
                                                    onValueChange={v => field.onChange(Number(v))}
                                                >
                                                    <SelectTrigger className="w-full">
                                                        <SelectValue placeholder="Selecciona método de pago" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        {metodosPago.map(m => (
                                                            <SelectItem key={m.id} value={String(m.id)}>{m.nombre}</SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <DialogFooter>
                                <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>Cancelar</Button>
                                <Button type="submit" disabled={loading}>
                                    {loading ? "Registrando..." : "Registrar salida"}
                                </Button>
                            </DialogFooter>
                        </form>
                    </Form>
                ) : (
                    <div className="text-center py-8 text-red-500">No se pudo cargar el detalle.</div>
                )}
            </DialogContent>
        </Dialog>
    );
}; 