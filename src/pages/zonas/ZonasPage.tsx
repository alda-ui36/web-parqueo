import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Edit, Power } from "lucide-react";
import { DataTable } from "@/components/layouts/components/data-table";
import { useZonas } from "@/hooks/useZonas";
import { ZonasFormDialog } from "@/modules/zonas/ZonasFormDialog";

export const ZonasPage = () => {
    const {
        zonas,
        editingZona,
        dialogOpen,
        setDialogOpen,
        form,
        pagination,
        loadZonas,
        handleSubmit,
        handleAdd,
        handleEdit,
        toggleStatus,
        submitting,
    } = useZonas();

    const columns = [
        { key: "nombre", label: "Nombre" },
        {
            key: "descripcion",
            label: "Descripción",
            render: (value: string) => value || "Sin descripción"
        },
        { key: "totalEspacios", label: "Espacios" },
        {
            key: "estado",
            label: "Estado",
            render: (value: boolean) => (
                <Badge
                    variant="outline"
                    className={`w-20 justify-center text-white ${value ? "bg-green-100 text-green-500" : "bg-red-100 text-red-500"}`}
                >
                    {value ? "Activa" : "Inactiva"}
                </Badge>
            )

        }
    ];

    const actions = (zona: any) => (
        <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={() => handleEdit(zona)}>
                <Edit className="h-4 w-4 text-blue-500" />
            </Button>
            <Button variant="outline" size="sm" onClick={() => toggleStatus(zona.id)}>
                <Power className={`h-4 w-4 ${zona.estado ? "text-red-500" : "text-green-500"}`} />
            </Button>
        </div>
    );

    return (
        <div className="container mx-auto py-6">
            <h1 className="text-2xl font-bold text-gray-900">Gestión de Zonas</h1>
            <p className="text-gray-600 mt-2">Administra las zonas de parqueo del sistema</p>

            <DataTable
                data={zonas}
                columns={columns}
                searchPlaceholder="Buscar zonas..."
                onSearch={(q) => loadZonas(0, pagination.pageSize, q)}
                onAdd={handleAdd}
                actions={actions}
                pagination={{
                    currentPage: pagination.currentPage,
                    totalPages: pagination.totalPages,
                    totalElements: pagination.totalElements,
                    pageSize: pagination.pageSize,
                    onPageChange: (p) => loadZonas(p, pagination.pageSize),
                    onPageSizeChange: (s) => loadZonas(0, s)
                }}
            />

            <ZonasFormDialog
                open={dialogOpen}
                onOpenChange={setDialogOpen}
                form={form}
                onSubmit={handleSubmit}
                submitting={submitting}
                editingZona={editingZona}
            />
        </div>
    );
};
