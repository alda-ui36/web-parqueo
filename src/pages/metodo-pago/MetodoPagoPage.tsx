import { useMetodoPago } from "@/hooks/useMetodoPago";
import { MetodoPagoFormDialog } from "@/modules/metodo-pago/MetodoPagoFormDialog";
import { MetodoPagoFilterDialog } from "@/modules/metodo-pago/MetodoPagoFilterDialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Edit, Power } from "lucide-react";
import { useState } from "react";
import { DataTable } from "@/components/data-table";

export const MetodoPagoPage = () => {
  const {
    metodos,
    editingMetodo,
    dialogOpen,
    setDialogOpen,
    form,
    pagination,
    loadMetodos,
    handleSubmit,
    handleAdd,
    handleEdit,
    toggleStatus,
    submitting,
  } = useMetodoPago();

  const [filterDialogOpen, setFilterDialogOpen] = useState(false);
  const [estadoFilter, setEstadoFilter] = useState<string>("all");

  const handleFilterApply = () => {
    loadMetodos(0, pagination.pageSize, undefined, estadoFilter);
    setFilterDialogOpen(false);
  };

  const columns = [
    { key: "nombre", label: "Nombre" },
    {
      key: "estado",
      label: "Estado",
      render: (value: boolean) => (
        <Badge
          variant="outline"
          className={`w-20 justify-center text-white ${
            value ? "bg-green-100 text-green-500" : "bg-red-100 text-red-500"
          }`}
        >
          {value ? "Activo" : "Inactivo"}
        </Badge>
      ),
    },
  ];

  const actions = (metodo: any) => (
    <div className="flex gap-2">
      <Button variant="outline" size="sm" onClick={() => handleEdit(metodo)}>
        <Edit className="h-4 w-4 text-blue-500" />
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={() => toggleStatus(metodo.id)}
      >
        <Power
          className={`h-4 w-4 ${
            metodo.estado ? "text-red-500" : "text-green-500"
          }`}
        />
      </Button>
    </div>
  );

  return (
    <div className="container mx-auto py-6">
      <h1 className="text-2xl font-bold text-gray-900">
        Gestión de Métodos de Pago
      </h1>
      <p className="text-gray-600 mt-2">
        Administra los métodos de pago del sistema
      </p>

      <DataTable
        data={metodos}
        columns={columns}
        searchPlaceholder="Buscar método de pago..."
        onSearch={(q) => loadMetodos(0, pagination.pageSize, q, estadoFilter)}
        onAdd={handleAdd}
        onFilter={() => setFilterDialogOpen(true)}
        actions={actions}
        pagination={{
          currentPage: pagination.currentPage,
          totalPages: pagination.totalPages,
          totalElements: pagination.totalElements,
          pageSize: pagination.pageSize,
          onPageChange: (p) =>
            loadMetodos(p, pagination.pageSize, undefined, estadoFilter),
          onPageSizeChange: (s) => loadMetodos(0, s, undefined, estadoFilter),
        }}
      />

      <MetodoPagoFormDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        form={form}
        onSubmit={handleSubmit}
        submitting={submitting}
        editingMetodo={editingMetodo}
      />

      <MetodoPagoFilterDialog
        open={filterDialogOpen}
        onOpenChange={setFilterDialogOpen}
        estadoFilter={estadoFilter}
        setEstadoFilter={setEstadoFilter}
        onApply={handleFilterApply}
      />
    </div>
  );
};
