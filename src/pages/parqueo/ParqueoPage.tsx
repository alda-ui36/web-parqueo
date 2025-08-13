import { useEffect, useState } from "react";
import { ZonasEspaciosGrid } from "@/modules/parqueo/ZonasEspaciosGrid";
import { zonaService } from "@/services/zona.service";
import { espacioService } from "@/services/espacio.service";
import { useMetodoPago } from "@/hooks/useMetodoPago";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export const ParqueoPage = () => {
    const [zonas, setZonas] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const { metodos } = useMetodoPago();
    const navigate = useNavigate();

    const loadZonasYEspacios = async () => {
        setLoading(true);
        try {
            // Obtener zonas activas
            const zonasRes = await zonaService.findAll({ page: 0, size: 100 });
            const zonasData = zonasRes.data.content.filter((z: any) => z.estado);

            // Obtener espacios activos
            const espaciosRes = await espacioService.findAll({ page: 0, size: 1000 });
            const espaciosData = espaciosRes.data.content.filter((e: any) => e.estado);

            // Mapear espacios a sus zonas
            const zonasWithEspacios = zonasData.map((zona: any) => ({
                ...zona,
                espacios: espaciosData.filter((e: any) => e.zonaId === zona.id),
            }));

            setZonas(zonasWithEspacios);
        } catch (error) {
            console.error("Error al cargar zonas o espacios:", error);
            setZonas([]);
        } finally {
            setLoading(false);
        }
    };

    // Función para refrescar zonas y espacios desde el backend
    const handleRefresh = async () => {
        await loadZonasYEspacios();
    };

    useEffect(() => {
        loadZonasYEspacios();
    }, []);

    if (loading) {
        return (
            <div className="p-8 text-center text-gray-500">
                Cargando zonas y espacios...
            </div>
        );
    }

    return (
        <div className="container mx-auto py-4 sm:py-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-4">
                <div className="flex flex-col"><h1 className="text-xl sm:text-2xl font-bold text-gray-900">
                    Reservar Espacio
                </h1>
                    <p className="text-gray-600 mt-1">Seleccione una zona y un espacio para reservar</p>
                </div>
                <div className="w-full sm:w-auto">
                    <Button className="w-full sm:w-auto" variant="outline" onClick={() => navigate("/parqueo/listado")}>
                        Ver Listado
                    </Button>
                </div>
            </div>
            <ZonasEspaciosGrid
                zonas={zonas}
                metodosPago={metodos.filter(m => m.estado)}
                onRefresh={handleRefresh}
            />
        </div>
    );
};
