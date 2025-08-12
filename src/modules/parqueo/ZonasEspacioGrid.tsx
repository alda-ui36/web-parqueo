import { Button } from "@/components/ui/button";
import { useEspacioEntradaDialog } from "@/hooks/useEspacioEntradaDialog";
import { registroParqueoService } from "@/service/registro-parqueo.service";
import type { EspacioResponse } from "@/types/espacio.types";
import type { MetodoPagoResponse } from "@/types/metodo-pago.types";
import type { RegistroSalidaRequest } from "@/types/registro-parqueo.types";
import { CarIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { EspacioEntradaDialog } from "./EspacioEntradaDialog";
import { EspacioDetalleSalidaDialog } from "./EspacioDetalleSalida";

interface Zona {
  id: number;
  nombre: string;
  descripcion?: string;
  espacios: EspacioResponse[];
}

interface ZonasEspacioGridProps {
  zonas: Zona[];
  onEspacioClick: (espacio: EspacioResponse, zona: Zona) => void;
  metodosPago: MetodoPagoResponse[];
  onRefresh: () => Promise<void>;
}

function useEspacioSalidaDialog(onRefresh: () => Promise<void>) {
  const [detalleOpen, setDetalleOpen] = useState(false);
  const [detalle, setDetalle] = useState<any>(null);
  const [loadingDetalle, setLoadingDetalle] = useState(false);

  const abrirDialog = async (espacio: EspacioResponse) => {
    if (espacio.ocupado) {
      setDetalle(true);
      setLoadingDetalle(true);
      setDetalle(null);
      try {
        const response = await registroParqueoService.obtenerRegistroActivo(
          espacio.id
        );
        setDetalle(response.data);
      } catch (e) {
        setDetalle(null);
      } finally {
        setLoadingDetalle(false);
      }
    }
  };

  const registrarSalida = async (data: RegistroSalidaRequest) => {
    setLoadingDetalle(true);
    try {
      await registroParqueoService.registrarSalida(data);
      toast.success("salida registrada correctamente");
      await onRefresh();
      setDetalleOpen(false);
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.mensaje ||
        error.message ||
        "Error registrar Salida";
      toast.error(errorMessage);
    } finally {
      setLoadingDetalle(false);
    }
  };
  return {
    detalleOpen,
    setDetalleOpen,
    detalle,
    loadingDetalle,
    abrirDialog,
    registrarSalida,
  };
}

export const ZonasEspacioGrid: React.FC<ZonasEspacioGridProps> = ({
  zonas,
  metodosPago,
  onRefresh,
}) => {
  const [zonasState, setZonasState] = useState(zonas);

  useEffect(() => {
    setZonasState(zonas);
  }, [zonas]);

  const {
    detalleOpen,
    setDetalleOpen,
    detalle,
    loadingDetalle,
    abrirDialog: abrirDialogSalida,
    registrarSalida,
  } = useEspacioSalidaDialog(onRefresh);

  const handleRegistrarEntrada = async (values: any) => {
    try {
      await registroParqueoService.registrarEntrada(values);
      toast.success("entrada registrada correctamente");
      await onRefresh();
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.mensaje ||
        error.message ||
        "Error registrar entrada";
      toast.error(errorMessage);
      throw error;
    }
  };

  const entradaDialog = useEspacioEntradaDialog(
    metodosPago,
    0,
    handleRegistrarEntrada
  );

  return (
    <div className="space-y-8">
      {zonasState.map((zona) => {
        const activos = zona.espacios.filter((e) => e.estado);
        const ocupados = activos.filter((e) => e.ocupado).length;
        const libres = activos.length - ocupados;
        return (
          <div
            key={zona.id}
            className="bg-white rounded-xl shadow-lg p-6 border"
          >
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-2xl font-bold ">{zona.nombre}</h2>
              <div className="flex gap-2">
                <span className="text-green-700 bg-green-100">
                  Libres: {libres}
                </span>
                <span className="text-red-700 bg-red-100">
                  Ocupados: {ocupados}
                </span>
              </div>
            </div>
            {zona.descripcion && (
              <p className="text-sm mb-4">{zona.descripcion}</p>
            )}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {activos.map((espacio) => (
                <div
                  key={espacio.id}
                  className={`flex flex-col items-center justify-center
                      rounded-lg border p-2 transition-all cursor-pointer
                      ${
                        espacio.ocupado
                          ? "bg-red-50  border-red-200 hover:bg-red-100"
                          : "bg-green-50  border-green-200 hover:bg-green-100"
                      } `}
                  onClick={() => {
                    if (espacio.ocupado) {
                      abrirDialogSalida(espacio);
                    } else {
                      entradaDialog.abrirDialogo(espacio.id);
                    }
                  }}
                >
                  <CarIcon
                    className={`w-6 h-6 mb-2 ${
                      espacio.ocupado ? "text-red-500" : "text-green-500"
                    }`}
                  />
                  <span>{espacio.numeroEspacio}</span>
                  <span>{espacio.ocupado ? "ocupado" : "libre"}</span>
                  {!espacio.ocupado && (
                    <Button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        entradaDialog.abrirDialogo(espacio.id);
                      }}
                    >
                      Resgistrar Entrada
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </div>
        );
      })}

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

      <EspacioDetalleSalidaDialog
        open={detalleOpen}
        onOpenchange={setDetalleOpen}
        detalle={detalle}
        isLoading={loadingDetalle}
        metodosPago={metodosPago}
        onRegistrarSalida={registrarSalida}
      />
    </div>
  );
};
