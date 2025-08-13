import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "../../components/ui/dialog";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "../../components/ui/select";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "../../components/ui/form";
import type { RegistroEntradaSchema } from "@/schemas/registro-entrada.schema";

interface EspacioEntradaDialogProps {
    open: boolean;
    setOpen: (open: boolean) => void;
    isLoading: boolean;
    form: any;
    tiposVehiculo: any[];
    onSubmitForm: (values: RegistroEntradaSchema) => Promise<void>;
    onBlurDni: (e: React.FocusEvent<HTMLInputElement>) => Promise<void>;
    onBlurPlaca: (e: React.FocusEvent<HTMLInputElement>) => Promise<void>;
}

export const EspacioEntradaDialog: React.FC<EspacioEntradaDialogProps> = ({
    open,
    setOpen,
    isLoading,
    form,
    tiposVehiculo,
    onSubmitForm,
    onBlurDni,
    onBlurPlaca,
}) => {
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Registrar Entrada</DialogTitle>
                    <DialogDescription>Registra la entrada de un vehículo en el espacio seleccionado.</DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmitForm)} className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
                            <div className="space-y-4 w-full">
                                <FormField
                                    control={form.control}
                                    name="placa"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Placa</FormLabel>
                                            <FormControl>
                                                <Input
                                                    {...field}
                                                    placeholder="Placa"
                                                    onBlur={onBlurPlaca}
                                                    onChange={e => {
                                                        field.onChange(e);
                                                        form.trigger();
                                                    }}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="marca"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Marca</FormLabel>
                                            <FormControl>
                                                <Input {...field} placeholder="Marca" />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="color"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Color</FormLabel>
                                            <FormControl>
                                                <Input {...field} placeholder="Color" />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="idTipoVehiculo"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Tipo de Vehículo</FormLabel>
                                            <FormControl>
                                                <Select
                                                    value={field.value ? String(field.value) : ""}
                                                    onValueChange={v => field.onChange(Number(v))}
                                                >
                                                    <SelectTrigger className="w-full">
                                                        <SelectValue placeholder="Selecciona tipo" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        {(tiposVehiculo ?? []).map(tv => (
                                                            <SelectItem key={tv.id} value={String(tv.id)}>
                                                                {tv.nombre}
                                                            </SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="tarifaHora"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Tarifa por Hora</FormLabel>
                                            <FormControl>
                                                <Input type="number" {...field} min={0} step={0.01} readOnly />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="correo"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Correo</FormLabel>
                                            <FormControl>
                                                <Input
                                                    {...field}
                                                    placeholder="Correo"
                                                    onBlur={() => {
                                                        field.onBlur();
                                                        form.trigger('correo');
                                                    }}
                                                    onChange={e => {
                                                        field.onChange(e);
                                                        form.trigger('correo');
                                                    }}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <div className="space-y-4 w-full">
                                <FormField
                                    control={form.control}
                                    name="dni"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>DNI</FormLabel>
                                            <FormControl>
                                                <Input {...field} placeholder="DNI"
                                                    onChange={(e) => {
                                                        const value = e.target.value.replace(/\D/g, "").slice(0, 8);
                                                        field.onChange(value);
                                                    }}
                                                    maxLength={8} onBlur={onBlurDni} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="nombres"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Nombres</FormLabel>
                                            <FormControl>
                                                <Input {...field} placeholder="Nombres" />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="apePaterno"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Apellido Paterno</FormLabel>
                                            <FormControl>
                                                <Input
                                                    {...field}
                                                    placeholder="Apellido paterno"
                                                    onBlur={field.onBlur}
                                                    onChange={e => {
                                                        field.onChange(e);
                                                        form.trigger('apePaterno');
                                                    }}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="apeMaterno"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Apellido Materno</FormLabel>
                                            <FormControl>
                                                <Input
                                                    {...field}
                                                    placeholder="Apellido materno"
                                                    onBlur={field.onBlur}
                                                    onChange={e => {
                                                        field.onChange(e);
                                                        form.trigger('apeMaterno');
                                                    }}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="telefono"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Teléfono</FormLabel>
                                            <FormControl>
                                                <Input {...field}
                                                    placeholder="Teléfono"
                                                    onChange={(e) => {
                                                        const value = e.target.value.replace(/\D/g, "").slice(0, 9);
                                                        field.onChange(value);
                                                    }}
                                                    maxLength={9}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="direccion"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Dirección</FormLabel>
                                            <FormControl>
                                                <Input {...field} placeholder="Dirección" />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                        </div>
                        <DialogFooter>
                            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
                                Cancelar
                            </Button>
                            <Button type="submit" disabled={isLoading}>
                                {isLoading ? "Registrando..." : "Registrar entrada"}
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}; 