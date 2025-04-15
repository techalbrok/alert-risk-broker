
import { useState } from "react";
import { BarChart2, CloudRain, Truck, Building2, AlertTriangle, LineChart } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCard } from "@/components/alert-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Datos de ejemplo para alertas
const demoAlerts = [
  {
    id: "1",
    type: "meteo" as const,
    title: "Aviso Naranja AEMET",
    description: "Lluvias intensas previstas en la zona de Barcelona (>30mm/h) durante las próximas 24h.",
    clientName: "Industrias Martínez, S.L.",
    date: "Hace 2 horas",
    isNew: true,
    severity: "high" as const
  },
  {
    id: "2",
    type: "trafico" as const,
    title: "Incidencia Grave DGT",
    description: "Accidente múltiple en la A-2 km 34 dirección Madrid. Corte de 2 carriles.",
    clientName: "Transportes López e Hijos",
    date: "Hace 6 horas",
    isNew: true,
    severity: "medium" as const
  },
  {
    id: "3",
    type: "empresa" as const,
    title: "Acto BORME registrado",
    description: "Publicación de concurso voluntario de acreedores en el BORME del 12/04/2024.",
    clientName: "Construcciones Rápidas, S.A.",
    date: "Ayer, 15:30",
    isNew: false,
    severity: "high" as const
  },
  {
    id: "4",
    type: "meteo" as const,
    title: "Aviso Amarillo AEMET",
    description: "Vientos fuertes de componente oeste (>70 km/h) en la costa de Girona.",
    clientName: "Hotel Miramar",
    date: "Ayer, 10:15",
    isNew: false,
    severity: "low" as const
  },
  {
    id: "5",
    type: "trafico" as const,
    title: "Obras en vía principal",
    description: "Obras programadas en la N-340 junto al acceso a las instalaciones del cliente.",
    clientName: "Logística Express Iberia",
    date: "14/04/2024",
    isNew: false,
    severity: "medium" as const
  },
];

// Datos estadísticos de ejemplo
const statsData = {
  totalAlerts: 32,
  newAlerts: 8,
  managedAlerts: 24,
  byType: {
    meteo: 14,
    trafico: 10,
    empresa: 8
  },
  bySeverity: {
    low: 12,
    medium: 15,
    high: 5
  }
};

export default function Dashboard() {
  const [alertView, setAlertView] = useState<"all" | "new" | "managed">("all");

  // Filtrar alertas según la pestaña seleccionada
  const filteredAlerts = (() => {
    switch(alertView) {
      case "new":
        return demoAlerts.filter(alert => alert.isNew);
      case "managed":
        return demoAlerts.filter(alert => !alert.isNew);
      default:
        return demoAlerts;
    }
  })();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-800">Dashboard</h1>
        <p className="text-slate-600 mt-1">Monitorización de riesgos y alertas activas</p>
      </div>

      {/* Resumen de estadísticas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total de alertas */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Alertas
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">{statsData.totalAlerts}</div>
              <AlertTriangle className="h-5 w-5 text-slate-400" />
            </div>
          </CardContent>
        </Card>

        {/* Alertas meteorológicas */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Alertas Meteorológicas
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">{statsData.byType.meteo}</div>
              <CloudRain className="h-5 w-5 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        {/* Alertas de tráfico */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Alertas de Tráfico
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">{statsData.byType.trafico}</div>
              <Truck className="h-5 w-5 text-amber-500" />
            </div>
          </CardContent>
        </Card>

        {/* Alertas empresariales */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Alertas Empresariales
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">{statsData.byType.empresa}</div>
              <Building2 className="h-5 w-5 text-purple-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Gráficos y estadísticas */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Panel principal de alertas */}
        <div className="lg:col-span-2">
          <Card className="h-full">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-xl">
                  Alertas Recientes
                </CardTitle>
                <Button variant="outline" size="sm">
                  Ver todas
                </Button>
              </div>
              <CardDescription>
                Supervise las últimas alertas de riesgo detectadas
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="all" className="w-full" onValueChange={(v) => setAlertView(v as any)}>
                <TabsList className="mb-4">
                  <TabsTrigger value="all">Todas</TabsTrigger>
                  <TabsTrigger value="new" className="flex gap-2">
                    Nuevas
                    <Badge className="bg-blue-100 text-blue-800 border-blue-200">{statsData.newAlerts}</Badge>
                  </TabsTrigger>
                  <TabsTrigger value="managed">Gestionadas</TabsTrigger>
                </TabsList>
                <TabsContent value="all" className="space-y-4">
                  {filteredAlerts.map(alert => (
                    <AlertCard key={alert.id} {...alert} />
                  ))}
                </TabsContent>
                <TabsContent value="new" className="space-y-4">
                  {filteredAlerts.map(alert => (
                    <AlertCard key={alert.id} {...alert} />
                  ))}
                </TabsContent>
                <TabsContent value="managed" className="space-y-4">
                  {filteredAlerts.map(alert => (
                    <AlertCard key={alert.id} {...alert} />
                  ))}
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
        
        {/* Panel de estadísticas */}
        <div>
          <Card className="h-full">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-xl">
                <LineChart className="h-5 w-5" />
                Resumen de Riesgos
              </CardTitle>
              <CardDescription>
                Distribución de alertas por tipo y gravedad
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {/* Distribución por tipo */}
                <div>
                  <h4 className="text-sm font-semibold mb-2">Por Tipo</h4>
                  <div className="space-y-2">
                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="flex items-center gap-1">
                          <CloudRain className="h-3.5 w-3.5 text-blue-500" /> 
                          Meteorología
                        </span>
                        <span>{statsData.byType.meteo}</span>
                      </div>
                      <div className="w-full bg-slate-100 rounded-full h-2">
                        <div className="bg-blue-500 h-2 rounded-full" style={{ width: `${(statsData.byType.meteo / statsData.totalAlerts) * 100}%` }}></div>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="flex items-center gap-1">
                          <Truck className="h-3.5 w-3.5 text-amber-500" /> 
                          Tráfico
                        </span>
                        <span>{statsData.byType.trafico}</span>
                      </div>
                      <div className="w-full bg-slate-100 rounded-full h-2">
                        <div className="bg-amber-500 h-2 rounded-full" style={{ width: `${(statsData.byType.trafico / statsData.totalAlerts) * 100}%` }}></div>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="flex items-center gap-1">
                          <Building2 className="h-3.5 w-3.5 text-purple-500" /> 
                          Empresarial
                        </span>
                        <span>{statsData.byType.empresa}</span>
                      </div>
                      <div className="w-full bg-slate-100 rounded-full h-2">
                        <div className="bg-purple-500 h-2 rounded-full" style={{ width: `${(statsData.byType.empresa / statsData.totalAlerts) * 100}%` }}></div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Distribución por gravedad */}
                <div>
                  <h4 className="text-sm font-semibold mb-2">Por Gravedad</h4>
                  <div className="space-y-2">
                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span>Alta</span>
                        <span>{statsData.bySeverity.high}</span>
                      </div>
                      <div className="w-full bg-slate-100 rounded-full h-2">
                        <div className="bg-red-500 h-2 rounded-full" style={{ width: `${(statsData.bySeverity.high / statsData.totalAlerts) * 100}%` }}></div>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span>Media</span>
                        <span>{statsData.bySeverity.medium}</span>
                      </div>
                      <div className="w-full bg-slate-100 rounded-full h-2">
                        <div className="bg-amber-500 h-2 rounded-full" style={{ width: `${(statsData.bySeverity.medium / statsData.totalAlerts) * 100}%` }}></div>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span>Baja</span>
                        <span>{statsData.bySeverity.low}</span>
                      </div>
                      <div className="w-full bg-slate-100 rounded-full h-2">
                        <div className="bg-green-500 h-2 rounded-full" style={{ width: `${(statsData.bySeverity.low / statsData.totalAlerts) * 100}%` }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
