import { Car } from "lucide-react";
import React, { useState } from "react";
import { registroParqueoService } from "@/services/registro-parqueo.service";
import { EspacioDetalleSalidaDialog } from "./EspacioDetalleSalidaDialog";
import { toast } from "sonner";
import type { EspacioResponse } from "@/types/espacio.types";
import type { MetodoPagoResponse } from "@/types/metodo-pago.types";
import { EspacioEntradaDialog } from "./EspacioEntradaDialog";
import { useEspacioEntradaDialog } from "@/hooks/useEspacioEntradaDialog";


interface Zona {
    id: number;
    nombre: string;
    descripcion?: string;
    espacios: EspacioResponse[];
}

interface ZonasEspaciosGridProps {
    zonas: Zona[];
    onEspacioClick?: (espacio: EspacioResponse, zona: Zona) => void;
    metodosPago: MetodoPagoResponse[];
    onRefresh: () => Promise<void>;
}

function useEspacioSalidaDialog(onRefresh: () => Promise<void>) {
    const [detalleOpen, setDetalleOpen] = useState(false);
    const [detalle, setDetalle] = useState<any>(null);
    const [loadingDetalle, setLoadingDetalle] = useState(false);

    const abrirDialogo = async (espacio: EspacioResponse) => {
        if (espacio.ocupado) {
            setDetalleOpen(true);
            setLoadingDetalle(true);
            setDetalle(null);
            try {
                const res = await registroParqueoService.obtenerRegistroActivo(espacio.id);
                setDetalle(res.data);
            } catch (e) {
                setDetalle(null);
            } finally {
                setLoadingDetalle(false);
            }
        }
    };

    const registrarSalida = async (data: { ticket: string; montoTotal: number; idMetodoPago: number }) => {
        setLoadingDetalle(true);
        try {
            await registroParqueoService.registrarSalida(data);
            toast.success("Salida registrada correctamente");
            await onRefresh();
            setDetalleOpen(false);
        } catch (e: any) {
            const msg = e?.response?.data?.mensaje || "Error al registrar salida";
            toast.error(msg);
        } finally {
            setLoadingDetalle(false);
        }
    };

    return {
        detalleOpen,
        setDetalleOpen,
        detalle,
        loadingDetalle,
        abrirDialogo,
        registrarSalida,
    };
}

export const ZonasEspaciosGrid: React.FC<ZonasEspaciosGridProps> = ({ zonas, metodosPago, onRefresh }) => {
    const [zonasState, setZonasState] = useState(zonas);
    React.useEffect(() => { setZonasState(zonas); }, [zonas]);

    const {
        detalleOpen,
        setDetalleOpen,
        detalle,
        loadingDetalle,
        abrirDialogo: abrirDialogoSalida,
        registrarSalida,
    } = useEspacioSalidaDialog(onRefresh);

    const handleRegistrarEntrada = async (values: any) => {
        try {
            await registroParqueoService.registrarEntrada(values);
            toast.success("Entrada registrada correctamente");
            await onRefresh();
        } catch (e: any) {
            const msg = e?.response?.data?.mensaje || "Error al registrar entrada";
            toast.error(msg);
            throw e; // Re-lanzar el error para que el hook lo maneje
        }
    };

    // Hook para el diálogo de entrada
    const entradaDialog = useEspacioEntradaDialog(metodosPago, 10, handleRegistrarEntrada);

    return (
        <div className="space-y-8">
            {zonasState.map((zona) => {
                const activos = zona.espacios.filter((e) => e.estado);
                const ocupados = activos.filter((e) => e.ocupado).length;
                const libres = activos.length - ocupados;

                return (
                    <div key={zona.id} className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
                        <div className="flex items-center justify-between mb-2">
                            <h2 className="text-2xl font-bold text-gray-800">{zona.nombre}</h2>
                            <div className="flex gap-2">
                                <span className="text-green-700 bg-green-100 rounded-full px-3 py-1 text-sm font-semibold">
                                    Libres: {libres}
                                </span>
                                <span className="text-red-700 bg-red-100 rounded-full px-3 py-1 text-sm font-semibold">
                                    Ocupados: {ocupados}
                                </span>
                            </div>
                        </div>

                        {zona.descripcion && (
                            <p className="text-sm text-gray-500 mb-4">{zona.descripcion}</p>
                        )}

                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                            {activos.map((espacio) => (
                                <div
                                    key={espacio.id}
                                    className={`flex flex-col items-center justify-center rounded-lg border p-3 transition-all cursor-pointer ${espacio.ocupado
                                        ? "bg-red-50 border-red-200 hover:bg-red-100"
                                        : "bg-green-50 border-green-200 hover:bg-green-100"
                                        }`}
                                    onClick={() => {
                                        if (espacio.ocupado) {
                                            abrirDialogoSalida(espacio);
                                        } else {
                                            entradaDialog.abrirDialogo(espacio.id);
                                        }
                                    }}
                                >
                                    <Car
                                        className={`w-6 h-6 mb-1 ${espacio.ocupado ? "text-red-500" : "text-green-500"
                                            }`}
                                    />
                                    <span className="font-semibold text-gray-700">
                                        {espacio.numeroEspacio}
                                    </span>
                                    <span
                                        className={`text-xs font-medium ${espacio.ocupado ? "text-red-600" : "text-green-600"}`}
                                    >
                                        {espacio.ocupado ? "Ocupado" : "Libre"}
                                    </span>
                                    {!espacio.ocupado && (
                                        <button
                                            className="mt-2 text-xs text-blue-600 underline hover:text-blue-800"
                                            type="button"
                                            onClick={e => {
                                                e.stopPropagation();
                                                entradaDialog.abrirDialogo(espacio.id);
                                            }}
                                        >
                                            Registrar entrada
                                        </button>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                );
            })}

            <EspacioDetalleSalidaDialog
                open={detalleOpen}
                onOpenChange={setDetalleOpen}
                detalle={detalle}
                loading={loadingDetalle}
                metodosPago={metodosPago}
                onRegistrarSalida={registrarSalida}
            />
            <EspacioEntradaDialog
                open={entradaDialog.open}
                setOpen={entradaDialog.setOpen}
                isLoading={entradaDialog.isLoading}
                form={entradaDialog.form}
                tiposVehiculo={entradaDialog.tiposVehiculo}
                onSubmitForm={entradaDialog.onSubmitForm}
                onBlurDni={entradaDialog.onBlurDni}
                onBlurPlaca={entradaDialog.onBlurPlaca}
            />
        </div>
    );
};
