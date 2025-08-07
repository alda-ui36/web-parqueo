import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import React from "react";

interface TipoVehiculoFilterDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    estadoFilter: string;
    setEstadoFilter: (value: string) => void;
    onApply: () => void;
}

export const TipoVehiculoFilterDialog: React.FC<TipoVehiculoFilterDialogProps> = ({
    open,
    onOpenChange,
    estadoFilter,
    setEstadoFilter,
    onApply
}) => {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[350px]">
                <DialogHeader>
                    <DialogTitle>Filtrar Tipos de Vehículo</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                    <div>
                        <label className="block mb-1 text-sm font-medium">Estado</label>
                        <Select value={estadoFilter} onValueChange={setEstadoFilter}>
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Selecciona estado" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">Todos</SelectItem>
                                <SelectItem value="true">Activo</SelectItem>
                                <SelectItem value="false">Inactivo</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>
                <DialogFooter>
                    <Button variant="outline" onClick={() => onOpenChange(false)}>Cancelar</Button>
                    <Button onClick={onApply}>Aplicar</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}; 