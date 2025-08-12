import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { MetodoPagoResponse } from "@/types/metodo-pago.types";
import type { RegistroParqueoProjection } from "@/types/registro-parqueo.types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

interface EspacioDetalleSalidaProps {
  open: boolean;
  onOpenchange: (open: boolean) => void;
  detalle: RegistroParqueoProjection | null;
  isLoading: boolean;
  metodosPago: MetodoPagoResponse[];
  onRegistrarSalida: (data: {
    ticket: string;
    montoTotal: number;
    idMetodoPago: number;
  }) => void;
}

const salidaSchema = z.object({
  montoTotal: z.number().min(0, "el monto es requerido"),
  idMetodoPago: z.number().min(1, "seleciona el metodo "),
});

type SalidaSchema = z.infer<typeof salidaSchema>;

export const EspacioDetalleSalidaDialog: React.FC<
  EspacioDetalleSalidaProps
> = ({
  open,
  onOpenchange,
  detalle,
  isLoading,
  metodosPago,
  onRegistrarSalida,
}) => {
  const { tiemposHoras, montoTotalCalculado } = useMemo(() => {
    if (!detalle) return { tiemposHoras: 0, montoTotalCalculado: 0 };
    const ingreso = new Date(detalle.horaIngreso);
    const ahora = new Date();
    let diffMs = ahora.getTime() - ingreso.getTime();
    if (diffMs < 0) diffMs = 0;
    const horas = Math.ceil(diffMs / (1000 * 60 * 60));
    const monto = horas * detalle.tarifaHora;
    return { tiemposHoras: horas, montoTotalCalculado: monto };
  }, [detalle]);

  const form = useForm<SalidaSchema>({
    resolver: zodResolver(salidaSchema),
    defaultValues: {
      montoTotal: montoTotalCalculado,
      idMetodoPago: metodosPago[0]?.id || 1,
    },
  });

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
    <Dialog open={open} onOpenChange={onOpenchange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Detalle parqueo </DialogTitle>
          <DialogDescription>Detalle parqueo de tu vehiculo</DialogDescription>
        </DialogHeader>
        {isLoading ? (
          <span>cargando detallle ...</span>
        ) : detalle ? (
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSubmit)}
              className="space-y-4"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
                <div>
                  <Label>Cliente</Label>
                  <div>
                    {detalle.nombres}
                    {detalle.apeMaterno}
                    {detalle.apeMaterno}
                  </div>
                </div>
                <div>
                  <Label>dni</Label>
                  <div>{detalle.dni}</div>
                </div>

                <div>
                  <Label>placa</Label>
                  <div>{detalle.placa}</div>
                </div>
                <div>
                  <Label>tiposVehiculo</Label>
                  <div>{detalle.tipoVehiculo}</div>
                </div>
                <div>
                  <Label>ticket</Label>
                  <div>{detalle.ticket}</div>
                </div>
                <div>
                  <Label>hora Ingreso</Label>
                  <div>{detalle.horaIngreso}</div>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>Tarifa hora</Label>
                  <div>{detalle.tarifaHora}</div>
                </div>
                <div>
                  <Label>tiempo transcurrido</Label>
                  <div>{tiemposHoras} horas</div>
                </div>
                <FormField
                  control={form.control}
                  name="montoTotal"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>montoTotal</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="number"
                          value={field.value}
                          onChange={(e) =>
                            field.onChange(Number(e.target.value))
                          }
                          placeholder="montoTotal"
                        />
                      </FormControl>
                      montoTotal
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="idMetodoPago"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>idMetodoPago</FormLabel>
                      <FormControl>
                        <Select
                          value={field.value ? String(field.value) : ""}
                          onValueChange={(v) => field.onChange(Number(v))}
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Selecciona tipo" />
                          </SelectTrigger>
                          <SelectContent>
                            {metodosPago.map((m) => (
                              <SelectItem key={m.id} value={String(m.id)}>
                                {m.nombre}
                              </SelectItem>
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
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => onOpenchange(false)}
                >
                  Cancelar
                </Button>
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? "Registrando... " : "REgistrar salida"}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        ) : (
          <span> nose pudo cargar detalle</span>
        )}
      </DialogContent>
    </Dialog>
  );
};
