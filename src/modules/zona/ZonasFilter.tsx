import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface ZonasFilterProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  estadoFilter: string;
  setEstadoFilter: (value: string) => void;
  onApply: () => void;
}

export const ZonasFilter: React.FC<ZonasFilterProps> = ({
  open,
  onOpenChange,
  estadoFilter,
  setEstadoFilter,
  onApply,
}) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Filtrar zonas</DialogTitle>
          <DialogDescription>Seleccione el estado a filtrar.</DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <Label className="block">Estado</Label>
          <Select value={estadoFilter} onValueChange={setEstadoFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Selecciona el estado" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos</SelectItem>
              <SelectItem value="true">Activos</SelectItem>
              <SelectItem value="false">inactivas</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <DialogFooter>
          <Button
            type="button"
            variant="outline"
            onClick={() => onOpenChange(false)}
          >
            Cancelar
          </Button>
          <Button onClick={onApply}>Aplicar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
