import type { EspacioResponse } from "@/types/espacio.types";
import type { MetodoPagoResponse } from "@/types/metodo-pago.types";

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
