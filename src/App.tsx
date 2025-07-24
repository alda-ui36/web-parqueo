import React, { useState } from 'react';
import { DataTable } from './components/data-table'; // Asegúrate de que esta ruta es correcta
import { Button } from './components/ui/button';

const mockUsers = [
  { id: 1, name: "Juan Pérez", email: "juan.perez@example.com", role: "Admin" },
  { id: 2, name: "Ana Gómez", email: "ana.gomez@example.com", role: "User" },
  { id: 3, name: "Carlos López", email: "carlos.lopez@example.com", role: "Editor" },
  { id: 4, name: "Laura Díaz", email: "laura.diaz@example.com", role: "User" },
  { id: 5, name: "Mario Sánchez", email: "mario.sanchez@example.com", role: "Viewer" },
  { id: 6, name: "Lucía Ramírez", email: "lucia.ramirez@example.com", role: "Admin" },
  { id: 7, name: "Diego Torres", email: "diego.torres@example.com", role: "User" },
  { id: 8, name: "Elena Castillo", email: "elena.castillo@example.com", role: "Editor" },
  { id: 9, name: "Ricardo Vargas", email: "ricardo.vargas@example.com", role: "User" },
  { id: 10, name: "Paula Méndez", email: "paula.mendez@example.com", role: "Viewer" },
  { id: 11, name: "Sofía Herrera", email: "sofia.herrera@example.com", role: "User" },
  { id: 12, name: "José Molina", email: "jose.molina@example.com", role: "Admin" },
  { id: 13, name: "Camila Rojas", email: "camila.rojas@example.com", role: "User" },
  { id: 14, name: "Andrés Navarro", email: "andres.navarro@example.com", role: "Editor" },
  { id: 15, name: "Valentina Cruz", email: "valentina.cruz@example.com", role: "User" },
  { id: 16, name: "Felipe Reyes", email: "felipe.reyes@example.com", role: "Admin" },
  { id: 17, name: "Martina Silva", email: "martina.silva@example.com", role: "Viewer" },
  { id: 18, name: "Sebastián Romero", email: "sebastian.romero@example.com", role: "User" },
  { id: 19, name: "Isabella Ortega", email: "isabella.ortega@example.com", role: "Editor" },
  { id: 20, name: "Tomás Fuentes", email: "tomas.fuentes@example.com", role: "User" }
];


function App() {
  const [users, setUsers] = useState(mockUsers);
  const [pagination, setPagination] = useState({
    currentPage: 0,
    totalPages: 1,
    totalElements: users.length,
    pageSize: 10,
    onPageChange: (page: number) => {
      setPagination((prev) => ({ ...prev, currentPage: page }));
    },
    onPageSizeChange: (size: number) => {
      setPagination((prev) => ({
        ...prev,
        pageSize: size,
        totalPages: Math.ceil(users.length / size),
        currentPage: 0
      }));
    }
  });

  const handleSearch = (query: string) => {
    const filtered = mockUsers.filter(user =>
      user.name.toLowerCase().includes(query.toLowerCase()) ||
      user.email.toLowerCase().includes(query.toLowerCase())
    );
    setUsers(filtered);
    setPagination((prev) => ({
      ...prev,
      totalElements: filtered.length,
      totalPages: Math.ceil(filtered.length / prev.pageSize),
      currentPage: 0
    }));
  };

  const columns = [
    { key: "name", label: "Nombre" },
    { key: "email", label: "Correo" },
    { key: "role", label: "Rol" }
  ];

  const actions = (row: any) => (
    <div className="flex gap-2">
      <Button variant="outline" size="sm" onClick={() => alert(`Editar ${row.name}`)}>
        Editar
      </Button>
      <Button variant="destructive" size="sm" onClick={() => alert(`Eliminar ${row.name}`)}>
        Eliminar
      </Button>
    </div>
  );

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Usuarios</h1>
      <DataTable
        data={users.slice(
          pagination.currentPage * pagination.pageSize,
          (pagination.currentPage + 1) * pagination.pageSize
        )}
        columns={columns}
        searchPlaceholder="Buscar usuarios..."
        onSearch={handleSearch}
        onAdd={() => alert("Agregar usuario")}
        onFilter={() => alert("Filtrar usuarios")}
        actions={actions}
        pagination={pagination}
      />
    </div>
  );
}

export default App;
