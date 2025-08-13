import React, { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    AreaChart,
    Area,
} from "recharts";
import { dashboardService } from "@/services/dashboard.service";
import type { DashboardStatsResponse } from "@/types/dashboard.types";
import { JwtUtil } from "@/utils/jwt.utils";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
    Calendar,
    Car,
    ListOrdered,
    MapPin,
    LucideCreditCard,
    Warehouse,
    TrendingUp,
    DollarSign,
    Activity
} from "lucide-react";

const DashboardPage: React.FC = () => {
    const [data, setData] = useState<DashboardStatsResponse | null>(null);
    const [loading, setLoading] = useState(true);
    const [fechaInicio, setFechaInicio] = useState<string>("");
    const [fechaFin, setFechaFin] = useState<string>("");

    const tokenUser = JwtUtil.getUserData();

    // Colores para los gráficos
    const COLORS = ['#8B5CF6', '#06D6A0', '#F59E0B', '#EF4444', '#3B82F6', '#EC4899'];

    const formatDateTime = (date: Date) => {
        const pad = (n: number) => String(n).padStart(2, "0");
        return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`;
    };

    const fetchStats = async (ini: string, fin: string) => {
        try {
            setLoading(true);
            const res = await dashboardService.getStats(ini, fin);
            setData(res);
        } catch (err) {
            console.error("Error cargando dashboard:", err);
            setData(null);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        // Rango por defecto: desde inicio del año actual 00:00:00 hasta ahora
        const now = new Date();
        const startOfYear = new Date(now.getFullYear(), 0, 1, 0, 0, 0);
        const ini = formatDateTime(startOfYear);
        const fin = formatDateTime(now);
        setFechaInicio(ini);
        setFechaFin(fin);
        fetchStats(ini, fin);
    }, []);

    useEffect(() => {
        if (fechaInicio && fechaFin) {
            fetchStats(fechaInicio, fechaFin);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [fechaInicio, fechaFin]);

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
                <Card className="mx-auto max-w-md p-8 shadow-2xl border-0">
                    <CardContent className="flex flex-col items-center space-y-4">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-violet-600"></div>
                        <p className="text-lg font-medium text-slate-700">Cargando datos...</p>
                    </CardContent>
                </Card>
            </div>
        );
    }

    if (!data || !Array.isArray(data.monthlyStats)) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
                <Card className="mx-auto max-w-md p-8 shadow-2xl border-0">
                    <CardContent className="text-center">
                        <Activity className="mx-auto h-12 w-12 text-slate-400 mb-4" />
                        <p className="text-lg font-medium text-slate-700">No hay datos disponibles</p>
                    </CardContent>
                </Card>
            </div>
        );
    }

    const chartData = data.monthlyStats.map((item) => ({
        month: item.month,
        reservas: item.totalReservas,
        monto: item.montoTotal,
    }));

    // Calcular totales para KPIs
    const totalReservas = data.monthlyStats.reduce((acc, item) => acc + item.totalReservas, 0);
    const totalMonto = data.monthlyStats.reduce((acc, item) => acc + item.montoTotal, 0);
    const promedioMensual = totalReservas / data.monthlyStats.length;

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-violet-50">
            <div className="container mx-auto p-6 space-y-8">
                {/* Header con gradiente */}
                <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-violet-600 via-purple-600 to-blue-600 p-8 text-white shadow-2xl">
                    <div className="absolute inset-0 bg-black/10"></div>
                    <div className="relative z-10">
                        <h1 className="text-4xl font-bold mb-2">Dashboard Sistema de Parqueo</h1>
                        <p className="text-xl opacity-90">
                            Hola{tokenUser?.name ? `, ${tokenUser.name}` : ""}. Bienvenido de nuevo.
                        </p>
                    </div>
                    <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full"></div>
                    <div className="absolute -bottom-5 -left-5 w-32 h-32 bg-white/5 rounded-full"></div>
                </div>

                {/* KPIs principales */}
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                    <Card className="border-0 shadow-xl bg-gradient-to-r from-violet-500 to-purple-600 text-white overflow-hidden relative">
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-violet-100 text-sm font-medium">Total Reservas</p>
                                    <p className="text-3xl font-bold">{totalReservas.toLocaleString()}</p>
                                </div>
                                <div className="p-3 bg-white/20 rounded-xl">
                                    <Car className="h-8 w-8" />
                                </div>
                            </div>
                            <div className="absolute -top-4 -right-4 w-24 h-24 bg-white/10 rounded-full"></div>
                        </CardContent>
                    </Card>

                    <Card className="border-0 shadow-xl bg-gradient-to-r from-emerald-500 to-teal-600 text-white overflow-hidden relative">
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-emerald-100 text-sm font-medium">Ingresos Totales</p>
                                    <p className="text-3xl font-bold">${totalMonto.toLocaleString()}</p>
                                </div>
                                <div className="p-3 bg-white/20 rounded-xl">
                                    <DollarSign className="h-8 w-8" />
                                </div>
                            </div>
                            <div className="absolute -top-4 -right-4 w-24 h-24 bg-white/10 rounded-full"></div>
                        </CardContent>
                    </Card>

                    <Card className="border-0 shadow-xl bg-gradient-to-r from-blue-500 to-cyan-600 text-white overflow-hidden relative">
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-blue-100 text-sm font-medium">Promedio Mensual</p>
                                    <p className="text-3xl font-bold">{Math.round(promedioMensual)}</p>
                                </div>
                                <div className="p-3 bg-white/20 rounded-xl">
                                    <TrendingUp className="h-8 w-8" />
                                </div>
                            </div>
                            <div className="absolute -top-4 -right-4 w-24 h-24 bg-white/10 rounded-full"></div>
                        </CardContent>
                    </Card>

                    <Card className="border-0 shadow-xl bg-gradient-to-r from-orange-500 to-red-500 text-white overflow-hidden relative">
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-orange-100 text-sm font-medium">Métodos de Pago</p>
                                    <p className="text-3xl font-bold">{data.metodosPagoStats?.length || 0}</p>
                                </div>
                                <div className="p-3 bg-white/20 rounded-xl">
                                    <LucideCreditCard className="h-8 w-8" />
                                </div>
                            </div>
                            <div className="absolute -top-4 -right-4 w-24 h-24 bg-white/10 rounded-full"></div>
                        </CardContent>
                    </Card>
                </div>

                {/* Filtros de fecha con diseño mejorado */}
                <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
                    <CardHeader className="pb-4">
                        <CardTitle className="flex items-center gap-3 text-2xl text-slate-800">
                            <div className="p-2 bg-violet-100 rounded-xl">
                                <Calendar className="h-6 w-6 text-violet-600" />
                            </div>
                            Filtros de Fecha
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid gap-6 md:grid-cols-2">
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-slate-700">Fecha de Inicio</label>
                                <input
                                    type="datetime-local"
                                    className="w-full rounded-xl border-2 border-slate-200 px-4 py-3 focus:border-violet-500 focus:ring-2 focus:ring-violet-200 transition-all"
                                    value={fechaInicio}
                                    onChange={(e) => setFechaInicio(e.target.value)}
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-slate-700">Fecha de Fin</label>
                                <input
                                    type="datetime-local"
                                    className="w-full rounded-xl border-2 border-slate-200 px-4 py-3 focus:border-violet-500 focus:ring-2 focus:ring-violet-200 transition-all"
                                    value={fechaFin}
                                    onChange={(e) => setFechaFin(e.target.value)}
                                />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Accesos rápidos con diseño mejorado */}
                <div>
                    <h2 className="text-2xl font-bold text-slate-800 mb-6">Accesos Rápidos</h2>
                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
                        {[
                            { title: "Parqueo", subtitle: "Reservar", icon: Car, color: "from-violet-500 to-purple-600", link: "/parqueo" },
                            { title: "Registros", subtitle: "Listado", icon: ListOrdered, color: "from-blue-500 to-cyan-600", link: "/parqueo/listado" },
                            { title: "Zonas", subtitle: "Administración", icon: MapPin, color: "from-emerald-500 to-teal-600", link: "/zonas" },
                            { title: "Espacios", subtitle: "Administración", icon: Warehouse, color: "from-orange-500 to-red-500", link: "/espacios" },
                            { title: "Vehículos", subtitle: "Tipos", icon: Car, color: "from-pink-500 to-rose-600", link: "/tipo-vehiculos" },
                            { title: "Pagos", subtitle: "Métodos", icon: LucideCreditCard, color: "from-indigo-500 to-blue-600", link: "/metodos-pago" },
                        ].map((item, index) => (
                            <Card key={index} className="border-0 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
                                <CardContent className="p-0">
                                    <div className={`bg-gradient-to-r ${item.color} p-4 text-white rounded-t-xl`}>
                                        <div className="flex items-center justify-center mb-3">
                                            <item.icon className="h-8 w-8" />
                                        </div>
                                        <div className="text-center">
                                            <div className="text-xs opacity-90">{item.subtitle}</div>
                                            <div className="font-bold text-sm">{item.title}</div>
                                        </div>
                                    </div>
                                    <div className="p-4">
                                        <Button asChild size="sm" className="w-full bg-slate-100 text-slate-800 hover:bg-slate-200">
                                            <Link to={item.link}>Acceder</Link>
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>

                {/* Gráficos mejorados */}
                <div className="grid gap-6 lg:grid-cols-2">
                    <Card className="border-0 shadow-xl bg-white/90 backdrop-blur-sm">
                        <CardHeader className="pb-4">
                            <CardTitle className="flex items-center gap-3 text-xl text-slate-800">
                                <div className="p-2 bg-violet-100 rounded-xl">
                                    <TrendingUp className="h-5 w-5 text-violet-600" />
                                </div>
                                Reservas y Montos Mensuales
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <ResponsiveContainer width="100%" height={350}>
                                <AreaChart data={chartData}>
                                    <defs>
                                        <linearGradient id="colorReservas" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.8} />
                                            <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0.1} />
                                        </linearGradient>
                                        <linearGradient id="colorMonto" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#06D6A0" stopOpacity={0.8} />
                                            <stop offset="95%" stopColor="#06D6A0" stopOpacity={0.1} />
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                                    <XAxis dataKey="month" stroke="#64748b" />
                                    <YAxis stroke="#64748b" />
                                    <Tooltip
                                        contentStyle={{
                                            backgroundColor: '#ffffff',
                                            border: '1px solid #e2e8f0',
                                            borderRadius: '12px',
                                            boxShadow: '0 10px 25px rgba(0,0,0,0.1)'
                                        }}
                                    />
                                    <Area type="monotone" dataKey="reservas" stroke="#8B5CF6" strokeWidth={3} fillOpacity={1} fill="url(#colorReservas)" name="Reservas" />
                                    <Area type="monotone" dataKey="monto" stroke="#06D6A0" strokeWidth={3} fillOpacity={1} fill="url(#colorMonto)" name="Monto ($)" />
                                </AreaChart>
                            </ResponsiveContainer>
                        </CardContent>
                    </Card>

                    <Card className="border-0 shadow-xl bg-white/90 backdrop-blur-sm">
                        <CardHeader className="pb-4">
                            <CardTitle className="flex items-center gap-3 text-xl text-slate-800">
                                <div className="p-2 bg-emerald-100 rounded-xl">
                                    <LucideCreditCard className="h-5 w-5 text-emerald-600" />
                                </div>
                                Métodos de Pago
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            {data.metodosPagoStats && data.metodosPagoStats.length > 0 ? (
                                <div className="space-y-4">
                                    {data.metodosPagoStats.map((m, index) => (
                                        <div key={m.metodo} className="flex items-center justify-between p-4 rounded-xl bg-gradient-to-r from-slate-50 to-slate-100 border border-slate-200 hover:shadow-md transition-all">
                                            <div className="flex items-center gap-3">
                                                <div className={`w-4 h-4 rounded-full`} style={{ backgroundColor: COLORS[index % COLORS.length] }}></div>
                                                <span className="font-semibold text-slate-800">{m.metodo}</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <span className="text-2xl font-bold text-slate-700">{m.cantidadUsos}</span>
                                                <span className="text-sm text-slate-500">usos</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-8">
                                    <Activity className="mx-auto h-12 w-12 text-slate-400 mb-4" />
                                    <p className="text-slate-600">No hay información disponible</p>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default DashboardPage;