import { useEffect, useMemo, useState } from "react";
import { DataTable } from "@/components/layouts/components/data-table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useParqueo } from "@/hooks/useParqueo";
import { useMetodoPago } from "@/hooks/useMetodoPago";
import { ParqueoFilterDialog } from "@/modules/parqueo/ParqueoFilterDialog";
import { useNavigate } from "react-router-dom";

export const ParqueoListPage = () => {
    const { registros, pagination, loadRegistros } = useParqueo();
    const { metodos } = useMetodoPago();
    const navigate = useNavigate();

    // Filtros locales de UI
    const [filterDialogOpen, setFilterDialogOpen] = useState(false);
    const [query, setQuery] = useState("");
    const [estadoPago, setEstadoPago] = useState<string>("all"); // all | PAGADO | PENDIENTE
    const [metodoPagoId, setMetodoPagoId] = useState<string>("all");
    const [desde, setDesde] = useState<string | undefined>(undefined); // YYYY-MM-DD
    const [hasta, setHasta] = useState<string | undefined>(undefined);

    const metodoPagoOptions = useMemo(
        () => metodos.filter((m) => m.estado).map((m) => ({ value: String(m.id), label: m.nombre })),
        [metodos]
    );

    const buildFilters = (page?: number, size?: number) => {
        return {
            page: page ?? pagination.currentPage,
            size: size ?? pagination.pageSize,
            query: query || undefined,
            estado: estadoPago !== "all" ? estadoPago : undefined,
            idMetodoPago: metodoPagoId !== "all" ? Number(metodoPagoId) : undefined,
            desde: desde ? new Date(desde) : undefined,
            hasta: hasta ? new Date(hasta) : undefined,
        };
    };

    const handleApplyFilters = () => {
        setFilterDialogOpen(false);
        loadRegistros(buildFilters(0, pagination.pageSize));
    };

    useEffect(() => {
        // carga inicial
        loadRegistros(buildFilters(0));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const columns = [
        { key: "ticket", label: "Ticket" },
        { key: "placaVehiculo", label: "Placa" },
        { key: "tipoVehiculo", label: "Tipo" },
        { key: "zonaNombre", label: "Zona" },
        { key: "numeroEspacio", label: "Espacio" },
        { key: "horaIngreso", label: "Ingreso" },
        { key: "horaSalida", label: "Salida" },
        {
            key: "tarifaHora",
            label: "Tarifa/Hora",
            render: (v: number) => new Intl.NumberFormat("es-PE", { style: "currency", currency: "PEN" }).format(v),
        },
        {
            key: "montoTotal",
            label: "Total",
            render: (v: number) => new Intl.NumberFormat("es-PE", { style: "currency", currency: "PEN" }).format(v),
        },
        {
            key: "estadoPago",
            label: "Estado Pago",
            render: (value: string) => (
                <Badge
                    variant="outline"
                    className={`w-24 justify-center ${value === "PAGADO" ? "bg-green-100 text-green-600" : "bg-yellow-100 text-yellow-700"}`}
                >
                    {value}
                </Badge>
            ),
        },
        { key: "nombreMetodoPago", label: "Método" },
    ];

    return (
        <div className="container mx-auto max-w-7xl py-4 sm:py-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-4">
                <div>
                    <h1 className="text-xl sm:text-2xl font-bold text-gray-900">
                        Registros de Parqueo
                    </h1>
                    <p className="text-gray-600 mt-1">Listado y filtros de registros</p>
                </div>
                <div className="w-full sm:w-auto">
                    <Button
                        className="w-full sm:w-auto"
                        onClick={() => navigate("/parqueo")}
                    >
                        Ir a Reservar
                    </Button>
                </div>
            </div>

            <div className="overflow-x-auto">
                <DataTable
                    data={registros}
                    columns={columns}
                    searchPlaceholder="Buscar por ticket, placa, cliente..."
                    onSearch={(q) => {
                        setQuery(q);
                        loadRegistros({ ...buildFilters(0), query: q || undefined });
                    }}
                    onFilter={() => setFilterDialogOpen(true)}
                    pagination={{
                        currentPage: pagination.currentPage,
                        totalPages: pagination.totalPages,
                        totalElements: pagination.totalElements,
                        pageSize: pagination.pageSize,
                        onPageChange: (p: number) => {
                            loadRegistros(buildFilters(p, pagination.pageSize));
                        },
                        onPageSizeChange: (s: number) => {
                            loadRegistros(buildFilters(0, s));
                        },
                    }}
                />
            </div>

            <ParqueoFilterDialog
                open={filterDialogOpen}
                onOpenChange={setFilterDialogOpen}
                query={query}
                setQuery={setQuery}
                estadoPago={estadoPago}
                setEstadoPago={setEstadoPago}
                metodoPagoId={metodoPagoId}
                setMetodoPagoId={setMetodoPagoId}
                metodoPagoOptions={metodoPagoOptions}
                desde={desde}
                setDesde={setDesde}
                hasta={hasta}
                setHasta={setHasta}
                onApply={handleApplyFilters}
            />
        </div>

    );
};
