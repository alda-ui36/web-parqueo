import { Outlet } from "react-router-dom";
import { Car, Shield, Clock } from "lucide-react";

export const AuthLayout = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 flex">
      {/* Panel izquierdo - Información del sistema */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        {/* Fondo con patrón */}
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-blue-900/50 to-transparent"></div>

        {/* Contenido */}
        <div className="relative z-10 flex flex-col justify-center px-12 py-16 text-white">
          <div className="mb-8">
            <div className="flex items-center mb-6">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 mr-4">
                <Car className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-3xl font-bold">ParkingPro</h1>
            </div>
            <p className="text-xl text-blue-100 mb-8">
              Sistema inteligente de gestión de estacionamientos
            </p>
          </div>

          {/* Características */}
          <div className="space-y-6">
            <div className="flex items-center">
              <div className="bg-white/10 rounded-lg p-2 mr-4">
                <Shield className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-semibold">Seguridad Garantizada</h3>
                <p className="text-blue-200 text-sm">
                  Control de acceso y monitoreo 24/7
                </p>
              </div>
            </div>

            <div className="flex items-center">
              <div className="bg-white/10 rounded-lg p-2 mr-4">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-semibold">Gestión en Tiempo Real</h3>
                <p className="text-blue-200 text-sm">
                  Disponibilidad y reservas instantáneas
                </p>
              </div>
            </div>
          </div>

          {/* Estadísticas */}
          <div className="mt-12 grid grid-cols-2 gap-6">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <div className="text-2xl font-bold">500+</div>
              <div className="text-blue-200 text-sm">Espacios gestionados</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <div className="text-2xl font-bold">99.9%</div>
              <div className="text-blue-200 text-sm">Tiempo activo</div>
            </div>
          </div>
        </div>

        {/* Elementos decorativos */}
        <div className="absolute top-1/4 -right-12 w-24 h-24 bg-white/5 rounded-full blur-xl"></div>
        <div className="absolute bottom-1/3 -right-8 w-32 h-32 bg-blue-400/10 rounded-full blur-2xl"></div>
      </div>

      {/* Panel derecho - Formulario */}
      <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 relative">
        {/* Fondo móvil */}
        <div className="lg:hidden absolute inset-0 bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900"></div>
        <div className="lg:hidden absolute inset-0 bg-black/20"></div>

        <div className="relative z-10 w-full max-w-md">
          {/* Logo móvil */}
          <div className="lg:hidden text-center mb-8">
            <div className="inline-flex items-center justify-center bg-white/10 backdrop-blur-sm rounded-xl p-3 mb-4">
              <Car className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-white">ParkingPro</h1>
            <p className="text-blue-200 mt-2">Sistema de gestión de parqueo</p>
          </div>

          {/* Contenedor del formulario */}
          <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl p-8 border border-white/20">
            <Outlet />
          </div>

          {/* Pie de página */}
          <div className="text-center mt-8">
            <p className="text-white/70 text-sm">
              © 2025 ParkingPro. Todos los derechos reservados.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
