import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import React from "react";

interface ParqueoFilterDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;

  query: string;
  setQuery: (v: string) => void;

  estadoPago: string; // all | PAGADO | PENDIENTE
  setEstadoPago: (v: string) => void;

  metodoPagoId: string; // "all" | id
  setMetodoPagoId: (v: string) => void;
  metodoPagoOptions: { value: string; label: string }[];

  desde?: string; // YYYY-MM-DD
  setDesde: (v?: string) => void;
  hasta?: string; // YYYY-MM-DD
  setHasta: (v?: string) => void;

  onApply: () => void;
}

export const ParqueoFilterDialog: React.FC<ParqueoFilterDialogProps> = ({
  open,
  onOpenChange,
  query,
  setQuery,
  estadoPago,
  setEstadoPago,
  metodoPagoId,
  setMetodoPagoId,
  metodoPagoOptions,
  desde,
  setDesde,
  hasta,
  setHasta,
  onApply,
}) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[420px]">
        <DialogHeader>
          <DialogTitle>Filtrar Registros de Parqueo</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div>
            <label className="block mb-1 text-sm font-medium">Búsqueda</label>
            <input
              type="text"
              className="w-full border rounded-md px-3 py-2 text-sm"
              placeholder="Ticket, placa, cliente, zona..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block mb-1 text-sm font-medium">Estado de pago</label>
              <Select value={estadoPago} onValueChange={setEstadoPago}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Selecciona estado" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos</SelectItem>
                  <SelectItem value="PAGADO">Pagado</SelectItem>
                  <SelectItem value="PENDIENTE">Pendiente</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block mb-1 text-sm font-medium">Método de pago</label>
              <Select value={metodoPagoId} onValueChange={setMetodoPagoId}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Selecciona método" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos</SelectItem>
                  {metodoPagoOptions.map((opt) => (
                    <SelectItem key={opt.value} value={opt.value}>
                      {opt.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block mb-1 text-sm font-medium">Desde</label>
              <input
                type="date"
                className="w-full border rounded-md px-3 py-2 text-sm"
                value={desde ?? ""}
                onChange={(e) => setDesde(e.target.value || undefined)}
              />
            </div>
            <div>
              <label className="block mb-1 text-sm font-medium">Hasta</label>
              <input
                type="date"
                className="w-full border rounded-md px-3 py-2 text-sm"
                value={hasta ?? ""}
                onChange={(e) => setHasta(e.target.value || undefined)}
              />
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancelar
          </Button>
          <Button onClick={onApply}>Aplicar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
