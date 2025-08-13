import { useState } from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "../../ui/table";
import { Input } from "../../ui/input";
import { Button } from "../../ui/button";
import { ChevronLeft, ChevronRight, Search, Plus, Filter } from "lucide-react";

interface Column {
    key: string;
    label: string;
    render?: (value: any, row: any) => React.ReactNode;
}

interface DataTableProps {
    data: any[];
    columns: Column[];
    caption?: string;
    searchPlaceholder?: string;
    onSearch?: (query: string) => void;
    onAdd?: () => void;
    onFilter?: () => void;
    actions?: (row: any) => React.ReactNode;
    pagination?: {
        currentPage: number;
        totalPages: number;
        totalElements: number;
        pageSize: number;
        onPageChange: (page: number) => void;
        onPageSizeChange?: (size: number) => void;
    };
}

export const DataTable = ({
    data,
    columns,
    searchPlaceholder = "Buscar...",
    onSearch,
    onAdd,
    onFilter,
    actions,
    pagination,
}: DataTableProps) => {
    const [searchQuery, setSearchQuery] = useState("");

    const handleSearch = (value: string) => {
        setSearchQuery(value);
        onSearch?.(value);
    };

    return (
        <div className="space-y-4">
            {/* Header */}
            <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
                <div className="flex-1 max-w-sm">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                        <Input
                            placeholder={searchPlaceholder}
                            value={searchQuery}
                            onChange={(e) => handleSearch(e.target.value)}
                            className="pl-10"
                        />
                    </div>
                </div>

                <div className="flex gap-2">
                    {onFilter && (
                        <Button variant="outline" onClick={onFilter}>
                            <Filter className="h-4 w-4 mr-2" />
                            Filtros
                        </Button>
                    )}
                    {onAdd && (
                        <Button onClick={onAdd}>
                            <Plus className="h-4 w-4 mr-2" />
                            Agregar
                        </Button>
                    )}
                </div>
            </div>

            {/* Tabla */}
            <div className="border rounded-lg">
                <Table>
                    <TableHeader>
                        <TableRow>
                            {columns.map((column) => (
                                <TableHead key={column.key}>{column.label}</TableHead>
                            ))}
                            {actions && <TableHead className="w-[100px]">Acciones</TableHead>}
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {data.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={columns.length + (actions ? 1 : 0)} className="text-center py-8 text-gray-500">
                                    No hay datos disponibles
                                </TableCell>
                            </TableRow>
                        ) : (
                            data.map((row, index) => (
                                <TableRow key={row.id || index}>
                                    {columns.map((column) => (
                                        <TableCell key={column.key}>
                                            {column.render
                                                ? column.render(row[column.key], row)
                                                : row[column.key]
                                            }
                                        </TableCell>
                                    ))}
                                    {actions && (
                                        <TableCell>
                                            {actions(row)}
                                        </TableCell>
                                    )}
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </div>

            {/* Paginación */}
            {pagination && (
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                        <span>Mostrar</span>
                        <select
                            value={pagination.pageSize}
                            onChange={(e) => pagination.onPageSizeChange?.(Number(e.target.value))}
                            className="border rounded px-2 py-1"
                        >
                            {[5, 10, 20, 50].map((size) => (
                                <option key={size} value={size}>
                                    {size}
                                </option>
                            ))}
                        </select>
                        <span>por página</span>
                    </div>

                    <div className="flex items-center space-x-2">
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => pagination.onPageChange(pagination.currentPage - 1)}
                            disabled={pagination.currentPage === 0}
                        >
                            <ChevronLeft className="h-4 w-4" />
                        </Button>

                        <div className="text-sm">
                            Página {pagination.currentPage + 1} de {pagination.totalPages}
                        </div>

                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => pagination.onPageChange(pagination.currentPage + 1)}
                            disabled={pagination.currentPage >= pagination.totalPages - 1}
                        >
                            <ChevronRight className="h-4 w-4" />
                        </Button>
                    </div>
                </div>
            )}
        </div>
    );
};
