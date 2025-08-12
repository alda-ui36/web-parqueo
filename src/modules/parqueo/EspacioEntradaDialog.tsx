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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { RegistroEntradaSchema } from "@/schemas/registro-entrada.schema";

interface EspacioEntradaDialogProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  isLoading: boolean;
  form: any;
  tiposVehiculo: any[];
  onSubmitForm: (Values: RegistroEntradaSchema) => Promise<void>;
  onBlurDni: (e: React.FocusEvent<HTMLInputElement>) => Promise<void>;
  onBlurPlaca: (e: React.FocusEvent<HTMLInputElement>) => Promise<void>;
}

export const EspacioEntradaDialog: React.FC<EspacioEntradaDialogProps> = ({
  open,
  setOpen,
  form,
  isLoading,
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
          <DialogDescription>
            Registra la entrada de tu vehiculo
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleRegistrarEntrada(onSubmitForm)}
            className="space-y-4"
          >
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
                          placeholder="ABC-123"
                          {...field}
                          onBlur={onBlurPlaca}
                          onChange={(e) => {
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
                      <FormLabel>marca</FormLabel>
                      <FormControl>
                        <Input placeholder="marca" {...field} />
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
                      <FormLabel>color</FormLabel>
                      <FormControl>
                        <Input placeholder="color" {...field} />
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
                      <FormLabel>tipo vehiculo</FormLabel>
                      <FormControl>
                        <Select
                          value={field.value ? String(field.value) : ""}
                          onValueChange={(v) => field.onChange(Number(v))}
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Selecciona tipo" />
                          </SelectTrigger>
                          <SelectContent>
                            {(tiposVehiculo ?? []).map((tv) => (
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
                      <FormLabel>tarifa Hora</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="tarifaHora"
                          type="number"
                          min={0}
                          step={0.01}
                          readOnly
                          {...field}
                        />
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
                      <FormLabel>correo</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          onBlur={() => {
                            field.onBlur();
                            form.trigger("correo");
                          }}
                          placeholder="correo"
                          onChange={(e) => {
                            field.onChange(e);
                            form.trigger("correo");
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
                      <FormLabel>dni</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="dni"
                          onChange={(e) => {
                            const value = e.target.value
                              .replace(/\D/g, "")
                              .slice(0, 8);
                            field.onChange(value);
                          }}
                          maxLength={8}
                          onBlur={onBlurDni}
                        />
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
                      <FormLabel>nombres</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="nombres" />
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
                      <FormLabel>apePaterno</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          onBlur={field.onBlur}
                          onChange={(e) => {
                            field.onChange(e);
                            form.trigger("apePaterno");
                          }}
                          placeholder="apePaterno"
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
                      <FormLabel>apeMaterno</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          onBlur={field.onBlur}
                          onChange={(e) => {
                            field.onChange(e);
                            form.trigger("apeMaterno");
                          }}
                          placeholder="apeMaterno"
                        />{" "}
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
                      <FormLabel>telefono</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="telefono"
                          onChange={(e) => {
                            const value = e.target.value
                              .replace(/\D/g, "")
                              .slice(0, 9);
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
                      <FormLabel>direccion</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="direccion" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => setOpen(false)}
              >
                Cancelar
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? "Registrando... " : "REgistrar Entrada"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
