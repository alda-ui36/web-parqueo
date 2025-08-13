import { DataTable } from "@/components/layouts/components/data-table";
import { useCliente } from "@/hooks/useCliente";
import { ClienteFormDialog } from "@/modules/cliente/ClienteFormDialog";
import { ClienteFilterDialog } from "@/modules/cliente/ClienteFilterDialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Edit, Power } from "lucide-react";
import { useState } from "react";
import type { ClienteResponse } from "@/types/cliente.types";

export const ClientePage = () => {
  const {
    clientes,
    editingCliente,
    dialogOpen,
    setDialogOpen,
    form,
    pagination,
    loadClientes,
    handleSubmit,
    handleAdd,
    handleEdit,
    toggleStatus,
    submitting,
  } = useCliente();

  const [filterDialogOpen, setFilterDialogOpen] = useState(false);
  const [estadoFilter, setEstadoFilter] = useState<string>("all");

  const handleFilterApply = () => {
    loadClientes(0, pagination.pageSize, undefined, estadoFilter);
    setFilterDialogOpen(false);
  };

  const columns = [
    {
      key: "nombres",
      label: "Nombres",
      render: (_: any, row: ClienteResponse) => (
        <span>{`${row.nombres}`}</span>
      ),
    },
    {
      key: "apePaterno",
      label: "Apellido Paterno",
    },
    {
      key: "apeMaterno",
      label: "Apellido Materno",
    },
    { key: "dni", label: "DNI" },
    { key: "telefono", label: "Teléfono" },
    { key: "correo", label: "Correo" },
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
      ),
    },
  ];

  const actions = (cliente: ClienteResponse) => (
    <div className="flex gap-2">
      <Button variant="outline" size="sm" onClick={() => handleEdit(cliente)}>
        <Edit className="h-4 w-4 text-blue-500" />
      </Button>
      <Button variant="outline" size="sm" onClick={() => toggleStatus(cliente.id)}>
        <Power className={`h-4 w-4 ${cliente.estado ? "text-red-500" : "text-green-500"}`} />
      </Button>
    </div>
  );

  return (
    <div className="container mx-auto py-6">
      <h1 className="text-2xl font-bold text-gray-900">Gestión de Clientes</h1>
      <p className="text-gray-600 mt-2">Administra los clientes del sistema</p>

      <DataTable
        data={clientes}
        columns={columns}
        searchPlaceholder="Buscar clientes (nombre, DNI, correo)..."
        onSearch={(q) => loadClientes(0, pagination.pageSize, q, estadoFilter)}
        onAdd={handleAdd}
        onFilter={() => setFilterDialogOpen(true)}
        actions={actions}
        pagination={{
          currentPage: pagination.currentPage,
          totalPages: pagination.totalPages,
          totalElements: pagination.totalElements,
          pageSize: pagination.pageSize,
          onPageChange: (p) => loadClientes(p, pagination.pageSize, undefined, estadoFilter),
          onPageSizeChange: (s) => loadClientes(0, s, undefined, estadoFilter),
        }}
      />

      <ClienteFormDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        form={form}
        onSubmit={handleSubmit}
        submitting={submitting}
        editingCliente={editingCliente}
      />

      <ClienteFilterDialog
        open={filterDialogOpen}
        onOpenChange={setFilterDialogOpen}
        estadoFilter={estadoFilter}
        setEstadoFilter={setEstadoFilter}
        onApply={handleFilterApply}
      />
    </div>
  );
};

export default ClientePage;
