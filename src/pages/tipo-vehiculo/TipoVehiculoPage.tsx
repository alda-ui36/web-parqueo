import { DataTable } from "@/components/layouts/components/data-table";
import { useTipoVehiculo } from "@/hooks/useTipoVehiculo";
import { TipoVehiculoFormDialog } from "@/modules/tipo-vehiculo/TipoVehiculoFormDialog";
import { TipoVehiculoFilterDialog } from "@/modules/tipo-vehiculo/TipoVehiculoFilterDialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Edit, Power } from "lucide-react";
import { useState } from "react";

export const TipoVehiculoPage = () => {
    const {
        tipos,
        editingTipo,
        dialogOpen,
        setDialogOpen,
        form,
        pagination,
        loadTipos,
        handleSubmit,
        handleAdd,
        handleEdit,
        toggleStatus,
        submitting,
    } = useTipoVehiculo();

    const [filterDialogOpen, setFilterDialogOpen] = useState(false);
    const [estadoFilter, setEstadoFilter] = useState<string>("all");

    const handleFilterApply = () => {
        loadTipos(0, pagination.pageSize, undefined, estadoFilter);
        setFilterDialogOpen(false);
    };

    const columns = [
        { key: "nombre", label: "Nombre" },
        { key: "tarifaHora", label: "Tarifa por Hora" },
        {
            key: "descripcion",
            label: "Descripción",
            render: (value: string) => value || "Sin descripción"
        },
        {
            key: "estado",
            label: "Estado",
            render: (value: boolean) => (
                <Badge
                    variant="outline"
                    className={`w-20 justify-center text-white ${value ? "bg-green-100 text-green-500" : "bg-red-100 text-red-500"}`}
                >
                    {value ? "Activo" : "Inactivo"}
                </Badge>
            )
        }
    ];

    const actions = (tipo: any) => (
        <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={() => handleEdit(tipo)}>
                <Edit className="h-4 w-4 text-blue-500" />
            </Button>
            <Button variant="outline" size="sm" onClick={() => toggleStatus(tipo.id)}>
                <Power className={`h-4 w-4 ${tipo.estado ? "text-red-500" : "text-green-500"}`} />
            </Button>
        </div>
    );

    return (
        <div className="container mx-auto py-6">
            <h1 className="text-2xl font-bold text-gray-900">Gestión de Tipos de Vehículo</h1>
            <p className="text-gray-600 mt-2">Administra los tipos de vehículo del sistema</p>

            <DataTable
                data={tipos}
                columns={columns}
                searchPlaceholder="Buscar tipo de vehículo..."
                onSearch={(q) => loadTipos(0, pagination.pageSize, q, estadoFilter)}
                onAdd={handleAdd}
                onFilter={() => setFilterDialogOpen(true)}
                actions={actions}
                pagination={{
                    currentPage: pagination.currentPage,
                    totalPages: pagination.totalPages,
                    totalElements: pagination.totalElements,
                    pageSize: pagination.pageSize,
                    onPageChange: (p) => loadTipos(p, pagination.pageSize, undefined, estadoFilter),
                    onPageSizeChange: (s) => loadTipos(0, s, undefined, estadoFilter)
                }}
            />

            <TipoVehiculoFormDialog
                open={dialogOpen}
                onOpenChange={setDialogOpen}
                form={form}
                onSubmit={handleSubmit}
                submitting={submitting}
                editingTipo={editingTipo}
            />

            <TipoVehiculoFilterDialog
                open={filterDialogOpen}
                onOpenChange={setFilterDialogOpen}
                estadoFilter={estadoFilter}
                setEstadoFilter={setEstadoFilter}
                onApply={handleFilterApply}
            />
        </div>
    );
}; 