import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { type UseFormReturn } from "react-hook-form";
import type { ZonaSchema } from "@/schemas/zona.schema";
import type { ZonaResponse } from "@/types/zona.types";

interface ZonasFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  form: UseFormReturn<ZonaSchema>;
  onSubmit: (values: ZonaSchema) => Promise<void>;
  submitting: boolean;
  editingZona: ZonaResponse | null;
}

export const ZonasFormDialog = ({
  open,
  onOpenChange,
  form,
  onSubmit,
  submitting,
  editingZona,
}: ZonasFormDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {editingZona ? "Editar Zona" : "Nueva Zona"}
          </DialogTitle>
          <DialogDescription>
            {editingZona
              ? "Edita los datos de la zona."
              : "Ingresa los datos de la nueva zona."}
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
                      placeholder="nombre de la zona"
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
              name="descripcion"
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel>Descripción</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="descripción de la zona"
                      rows={3}
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
              name="totalEspacios"
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel>Espacios *</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      min={1}
                      placeholder="número de espacios"
                      {...field}
                      onChange={(e) => field.onChange(+e.target.value)}
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
                {submitting
                  ? "Guardando..."
                  : editingZona
                  ? "Actualizar"
                  : "Crear"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
