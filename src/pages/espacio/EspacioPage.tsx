import { DataTable } from "@/components/layouts/components/data-table";
import { useEspacio } from "@/hooks/useEspacio";
import { EspacioFormDialog } from "@/modules/espacio/EspacioFormDialog";
import { EspacioFilterDialog } from "@/modules/espacio/EspacioFilterDialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Edit, Power } from "lucide-react";
import { useState } from "react";

export const EspacioPage = () => {
    const {
        espacios,
        editingEspacio,
        dialogOpen,
        setDialogOpen,
        form,
        pagination,
        loadEspacios,
        handleSubmit,
        handleAdd,
        handleEdit,
        toggleStatus,
        submitting,
        zonas,
        tiposVehiculo,
        getEspaciosDisponibles
    } = useEspacio();

    const [filterDialogOpen, setFilterDialogOpen] = useState(false);
    const [estadoFilter, setEstadoFilter] = useState<string>("all");

    const handleFilterApply = () => {
        loadEspacios(0, pagination.pageSize, undefined, estadoFilter);
        setFilterDialogOpen(false);
    };

    const columns = [
        { key: "zonaNombre", label: "Zona" },
        { key: "numeroEspacio", label: "Número" },
        { key: "tipoVehiculoNombre", label: "Tipo de Vehículo" },
        {
            key: "ocupado",
            label: "Ocupado",
            render: (value: boolean) => (
                <Badge
                    variant="outline"
                    className={`w-20 justify-center text-white ${value ? "bg-red-100 text-red-500" : "bg-green-100 text-green-500"}`}
                >
                    {value ? "Sí" : "No"}
                </Badge>
            )
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

    const actions = (espacio: any) => (
        <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={() => handleEdit(espacio)}>
                <Edit className="h-4 w-4 text-blue-500" />
            </Button>
            <Button variant="outline" size="sm" onClick={() => toggleStatus(espacio.id)}>
                <Power className={`h-4 w-4 ${espacio.estado ? "text-red-500" : "text-green-500"}`} />
            </Button>
        </div>
    );

    return (
        <div className="container mx-auto py-6">
            <h1 className="text-2xl font-bold text-gray-900">Gestión de Espacios</h1>
            <p className="text-gray-600 mt-2">Administra los espacios del sistema</p>

            <DataTable
                data={espacios}
                columns={columns}
                searchPlaceholder="Buscar espacio..."
                onSearch={(q) => loadEspacios(0, pagination.pageSize, q, estadoFilter)}
                onAdd={handleAdd}
                onFilter={() => setFilterDialogOpen(true)}
                actions={actions}
                pagination={{
                    currentPage: pagination.currentPage,
                    totalPages: pagination.totalPages,
                    totalElements: pagination.totalElements,
                    pageSize: pagination.pageSize,
                    onPageChange: (p) => loadEspacios(p, pagination.pageSize, undefined, estadoFilter),
                    onPageSizeChange: (s) => loadEspacios(0, s, undefined, estadoFilter)
                }}
            />

            <EspacioFormDialog
                open={dialogOpen}
                onOpenChange={setDialogOpen}
                form={form}
                onSubmit={handleSubmit}
                submitting={submitting}
                editingEspacio={editingEspacio}
                zonas={zonas}
                tiposVehiculo={tiposVehiculo}
                getEspaciosDisponibles={getEspaciosDisponibles}
            />

            <EspacioFilterDialog
                open={filterDialogOpen}
                onOpenChange={setFilterDialogOpen}
                estadoFilter={estadoFilter}
                setEstadoFilter={setEstadoFilter}
                onApply={handleFilterApply}
            />
        </div>
    );
}; 