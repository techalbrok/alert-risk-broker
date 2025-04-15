
import React, { useState } from "react";
import { 
  Search,
  FileText, 
  Filter, 
  CloudSun, 
  Truck, 
  Building2, 
  Eye, 
  CheckCircle,
  CalendarIcon,
} from "lucide-react";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { AlertDetail } from "@/components/alert-detail";
import { es } from "date-fns/locale";
import { cn } from "@/lib/utils";

// Demo data for alerts
const demoAlerts = [
  {
    id: "1",
    clientName: "Seguros ABC S.A.",
    type: "meteo",
    description: "Alerta meteorológica: Tormenta severa en Madrid",
    date: "2025-04-12T14:30:00",
    status: "nueva",
    severity: "high",
    source: "AEMET",
    details: "Aviso rojo por precipitaciones intensas. Se esperan más de 180 mm en 12 horas con posibles inundaciones en zonas urbanas y deslizamientos de tierra.",
  },
  {
    id: "2",
    clientName: "Transportes Rápidos SL",
    type: "trafico",
    description: "Accidente en A-3 km 54 dirección Valencia",
    date: "2025-04-11T08:15:00",
    status: "vista",
    severity: "medium",
    source: "DGT",
    details: "Colisión entre dos vehículos ocupando el carril derecho. Retención de 3 km. Tiempo estimado de resolución: 1 hora.",
  },
  {
    id: "3",
    clientName: "Construcciones Modernas SL",
    type: "empresa",
    description: "Publicación en BORME: Ampliación de capital",
    date: "2025-04-10T10:00:00",
    status: "gestionada",
    severity: "low",
    source: "LibreBOR",
    details: "La empresa ha registrado una ampliación de capital de 500.000€ según publicación en el BORME del 10/04/2025.",
  },
  {
    id: "4",
    clientName: "Hoteles Costa SL",
    type: "meteo",
    description: "Aviso por altas temperaturas en Costa del Sol",
    date: "2025-04-09T11:20:00",
    status: "nueva",
    severity: "medium",
    source: "AEMET",
    details: "Alerta naranja por temperaturas máximas superiores a 38°C en la Costa del Sol. Posible impacto en turistas y actividades al aire libre.",
  },
  {
    id: "5",
    clientName: "Distribuidora Alimentaria Norte",
    type: "trafico",
    description: "Corte en A-1 por obras de mantenimiento",
    date: "2025-04-08T16:45:00",
    status: "vista",
    severity: "medium",
    source: "DGT",
    details: "Corte programado en A-1 km 120-135 durante las próximas 48 horas. Desvío obligatorio por la nacional N-1.",
  },
];

type AlertType = "meteo" | "trafico" | "empresa";
type AlertStatus = "nueva" | "vista" | "gestionada";

export default function Alertas() {
  // State for filters and search
  const [searchTerm, setSearchTerm] = useState("");
  const [filterClient, setFilterClient] = useState<string | null>(null);
  const [filterType, setFilterType] = useState<AlertType | null>(null);
  const [filterStatus, setFilterStatus] = useState<AlertStatus | null>(null);
  const [filterDateFrom, setFilterDateFrom] = useState<Date | null>(null);
  const [filterDateTo, setFilterDateTo] = useState<Date | null>(null);
  const [selectedAlert, setSelectedAlert] = useState<typeof demoAlerts[0] | null>(null);
  
  // Filter alerts based on all criteria
  const filteredAlerts = demoAlerts.filter(alert => {
    // Search term filter
    if (searchTerm && !alert.description.toLowerCase().includes(searchTerm.toLowerCase()) &&
        !alert.clientName.toLowerCase().includes(searchTerm.toLowerCase())) {
      return false;
    }
    
    // Client filter
    if (filterClient && alert.clientName !== filterClient) {
      return false;
    }
    
    // Type filter
    if (filterType && alert.type !== filterType) {
      return false;
    }
    
    // Status filter
    if (filterStatus && alert.status !== filterStatus) {
      return false;
    }
    
    // Date range filter
    const alertDate = new Date(alert.date);
    if (filterDateFrom && alertDate < filterDateFrom) {
      return false;
    }
    if (filterDateTo) {
      const endOfDay = new Date(filterDateTo);
      endOfDay.setHours(23, 59, 59, 999);
      if (alertDate > endOfDay) {
        return false;
      }
    }
    
    return true;
  });
  
  // Get unique client names for dropdown
  const uniqueClients = Array.from(new Set(demoAlerts.map(alert => alert.clientName)));
  
  // Render icon based on alert type
  const getAlertIcon = (type: AlertType) => {
    switch (type) {
      case "meteo":
        return <CloudSun className="h-5 w-5 text-blue-500" />;
      case "trafico":
        return <Truck className="h-5 w-5 text-amber-500" />;
      case "empresa":
        return <Building2 className="h-5 w-5 text-purple-500" />;
    }
  };
  
  // Get color for status badge
  const getStatusBadge = (status: AlertStatus) => {
    switch (status) {
      case "nueva":
        return <Badge variant="outline" className="bg-blue-100 text-blue-800 border-blue-200">Nueva</Badge>;
      case "vista":
        return <Badge variant="outline" className="bg-amber-100 text-amber-800 border-amber-200">Vista</Badge>;
      case "gestionada":
        return <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">Gestionada</Badge>;
    }
  };
  
  // Format date to readable string
  const formatDate = (dateString: string) => {
    return format(new Date(dateString), "dd/MM/yyyy HH:mm", { locale: es });
  };
  
  // Reset all filters
  const resetFilters = () => {
    setSearchTerm("");
    setFilterClient(null);
    setFilterType(null);
    setFilterStatus(null);
    setFilterDateFrom(null);
    setFilterDateTo(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Historial de Alertas</h1>
      </div>

      {/* Search and filters section */}
      <div className="bg-white p-4 rounded-md shadow-sm border space-y-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar alertas..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8"
            />
          </div>

          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="gap-2">
                <Filter className="h-4 w-4" />
                Filtros
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80 sm:w-96">
              <div className="space-y-4">
                <h4 className="font-medium">Filtros de alertas</h4>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Cliente</label>
                  <Select
                    value={filterClient || ""}
                    onValueChange={(value) => setFilterClient(value || null)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Todos los clientes" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">Todos los clientes</SelectItem>
                      {uniqueClients.map((client) => (
                        <SelectItem key={client} value={client}>
                          {client}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Tipo de riesgo</label>
                  <Select
                    value={filterType || ""}
                    onValueChange={(value) => setFilterType(value as AlertType || null)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Todos los tipos" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">Todos los tipos</SelectItem>
                      <SelectItem value="meteo">Meteorológico</SelectItem>
                      <SelectItem value="trafico">Tráfico</SelectItem>
                      <SelectItem value="empresa">Empresarial</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Estado</label>
                  <Select
                    value={filterStatus || ""}
                    onValueChange={(value) => setFilterStatus(value as AlertStatus || null)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Todos los estados" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">Todos los estados</SelectItem>
                      <SelectItem value="nueva">Nueva</SelectItem>
                      <SelectItem value="vista">Vista</SelectItem>
                      <SelectItem value="gestionada">Gestionada</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Desde</label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !filterDateFrom && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {filterDateFrom ? (
                            format(filterDateFrom, "dd/MM/yyyy")
                          ) : (
                            <span>Seleccionar</span>
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={filterDateFrom || undefined}
                          onSelect={setFilterDateFrom}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Hasta</label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !filterDateTo && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {filterDateTo ? (
                            format(filterDateTo, "dd/MM/yyyy")
                          ) : (
                            <span>Seleccionar</span>
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="end">
                        <Calendar
                          mode="single"
                          selected={filterDateTo || undefined}
                          onSelect={setFilterDateTo}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>
                
                <Button variant="secondary" onClick={resetFilters} className="w-full">
                  Limpiar filtros
                </Button>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>

      {/* Active filters display */}
      {(filterClient || filterType || filterStatus || filterDateFrom || filterDateTo) && (
        <div className="flex flex-wrap gap-2">
          {filterClient && (
            <Badge variant="outline" className="bg-blue-50">
              Cliente: {filterClient}
              <button 
                className="ml-1 hover:text-blue-800" 
                onClick={() => setFilterClient(null)}
              >×</button>
            </Badge>
          )}
          {filterType && (
            <Badge variant="outline" className="bg-blue-50">
              Tipo: {filterType === "meteo" ? "Meteorológico" : 
                    filterType === "trafico" ? "Tráfico" : "Empresarial"}
              <button 
                className="ml-1 hover:text-blue-800" 
                onClick={() => setFilterType(null)}
              >×</button>
            </Badge>
          )}
          {filterStatus && (
            <Badge variant="outline" className="bg-blue-50">
              Estado: {filterStatus === "nueva" ? "Nueva" : 
                       filterStatus === "vista" ? "Vista" : "Gestionada"}
              <button 
                className="ml-1 hover:text-blue-800" 
                onClick={() => setFilterStatus(null)}
              >×</button>
            </Badge>
          )}
          {filterDateFrom && (
            <Badge variant="outline" className="bg-blue-50">
              Desde: {format(filterDateFrom, "dd/MM/yyyy")}
              <button 
                className="ml-1 hover:text-blue-800" 
                onClick={() => setFilterDateFrom(null)}
              >×</button>
            </Badge>
          )}
          {filterDateTo && (
            <Badge variant="outline" className="bg-blue-50">
              Hasta: {format(filterDateTo, "dd/MM/yyyy")}
              <button 
                className="ml-1 hover:text-blue-800" 
                onClick={() => setFilterDateTo(null)}
              >×</button>
            </Badge>
          )}
        </div>
      )}

      {selectedAlert ? (
        <AlertDetail 
          alert={selectedAlert} 
          onClose={() => setSelectedAlert(null)} 
        />
      ) : (
        /* Alerts table */
        <div className="border rounded-md bg-white overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[180px]">Cliente</TableHead>
                <TableHead className="w-[120px]">Tipo Riesgo</TableHead>
                <TableHead>Descripción</TableHead>
                <TableHead className="w-[150px]">Fecha/Hora</TableHead>
                <TableHead className="w-[120px]">Estado</TableHead>
                <TableHead className="w-[80px] text-right">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredAlerts.length > 0 ? (
                filteredAlerts.map((alert) => (
                  <TableRow key={alert.id}>
                    <TableCell className="font-medium">{alert.clientName}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {getAlertIcon(alert.type as AlertType)}
                        <span>
                          {alert.type === "meteo" ? "Meteorológico" : 
                          alert.type === "trafico" ? "Tráfico" : "Empresarial"}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>{alert.description}</TableCell>
                    <TableCell>{formatDate(alert.date)}</TableCell>
                    <TableCell>{getStatusBadge(alert.status as AlertStatus)}</TableCell>
                    <TableCell className="text-right">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => setSelectedAlert(alert)}
                      >
                        <FileText className="h-4 w-4" />
                        <span className="sr-only">Ver detalle</span>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                    No se encontraron alertas con los filtros aplicados.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}
