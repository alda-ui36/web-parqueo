import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  registroEntradaSchema,
  type RegistroEntradaSchema,
} from "@/schemas/registro-entrada.schema";
import { toast } from "sonner";
import { useTipoVehiculo } from "@/hooks/useTipoVehiculo";
import type { MetodoPagoResponse } from "@/types/metodo-pago.types";
import { clienteService } from "@/service/cliente.service";
import { vehiculoService } from "@/service/vehiculo.service";

export function useEspacioEntradaDialog(
  metodosPago: MetodoPagoResponse[],
  tarifaHora: number,
  onSubmit: (values: RegistroEntradaSchema) => Promise<void>
) {
  const [open, setOpen] = useState(false);
  const [idEspacio, setIdEspacio] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { tipos: tiposVehiculo } = useTipoVehiculo();

  const form = useForm<RegistroEntradaSchema>({
    resolver: zodResolver(registroEntradaSchema),
    defaultValues: {
      placa: "",
      marca: "",
      color: "",
      idTipoVehiculo: undefined,
      dni: "",
      nombres: "",
      apePaterno: "",
      apeMaterno: "",
      telefono: "",
      direccion: "",
      correo: "",
      idEspacio: 0,
      tarifaHora: tarifaHora,
    },
  });

  // Resetear formulario cuando se abre el dialog
  useEffect(() => {
    if (open && idEspacio) {
      form.reset({
        placa: "",
        marca: "",
        color: "",
        idTipoVehiculo: undefined,
        dni: "",
        nombres: "",
        apePaterno: "",
        apeMaterno: "",
        telefono: "",
        direccion: "",
        correo: "",
        idEspacio: idEspacio,
        tarifaHora: tarifaHora,
      });
    }
  }, [open, idEspacio, metodosPago, tarifaHora, form]);

  const abrirDialogo = (id: number) => {
    setIdEspacio(id);
    setOpen(true);
  };

  const cerrarDialogo = () => {
    setOpen(false);
    setIdEspacio(null);
  };

  const onSubmitForm = async (values: RegistroEntradaSchema) => {
    setIsLoading(true);
    try {
      await onSubmit(values);
      cerrarDialogo();
    } catch (error) {
      // El error ya se maneja en el componente padre
    } finally {
      setIsLoading(false);
    }
  };

  const onBlurDni = async (e: React.FocusEvent<HTMLInputElement>) => {
    const dni = e.target.value;
    if (dni && dni.length === 8) {
      try {
        const res = await clienteService.buscarPorDni(dni);
        if (res.data) {
          form.setValue("nombres", res.data.nombres || "");
          form.setValue("apePaterno", res.data.apePaterno || "");
          form.setValue("apeMaterno", res.data.apeMaterno || "");
          form.setValue("telefono", res.data.telefono || "");
          form.setValue("direccion", res.data.direccion || "");
          form.setValue("correo", res.data.correo || "");
          setTimeout(() => {
            form.trigger([
              "dni",
              "nombres",
              "apePaterno",
              "correo",
              "apeMaterno",
            ]);
          }, 100);
          toast.success("Cliente encontrado y autocompletado");
        } else {
          toast.info("No se encontró cliente con ese DNI");
        }
      } catch {
        toast.error("Error al buscar cliente por DNI");
      }
    }
  };

  const onBlurPlaca = async (e: React.FocusEvent<HTMLInputElement>) => {
    const placa = e.target.value;
    if (!placa) return;
    try {
      const res = await vehiculoService.buscarPorPlaca(placa);
      if (res.data) {
        form.setValue("marca", res.data.marca || "");
        form.setValue("color", res.data.color || "");
        if (typeof res.data.idTipoVehiculo === "number") {
          form.setValue("idTipoVehiculo", res.data.idTipoVehiculo);
          const tipo = tiposVehiculo.find(
            (tv) => tv.id === res.data.idTipoVehiculo
          );
          if (tipo?.tarifaHora != null) {
            form.setValue("tarifaHora", tipo.tarifaHora);
          }
          setTimeout(() => {
            form.trigger(["idTipoVehiculo", "tarifaHora"]);
          }, 100);
        }
        toast.success("Vehículo encontrado y autocompletado");
      } else {
        toast.info("No se encontró vehículo con esa placa");
      }
    } catch {
      toast.error("Error al buscar vehículo por placa");
    }
  };

  // Actualizar tarifaHora automáticamente al cambiar el tipo de vehículo
  useEffect(() => {
    const idTipo = form.watch("idTipoVehiculo");
    if (idTipo) {
      const tipo = tiposVehiculo.find((tv) => tv.id === idTipo);
      if (tipo?.tarifaHora != null) {
        form.setValue("tarifaHora", tipo.tarifaHora);
      }
    }
  }, [form.watch("idTipoVehiculo"), tiposVehiculo, form]);

  return {
    open,
    setOpen,
    idEspacio,
    isLoading,
    form,
    tiposVehiculo,
    abrirDialogo,
    cerrarDialogo,
    onSubmitForm,
    onBlurDni,
    onBlurPlaca,
  };
}
