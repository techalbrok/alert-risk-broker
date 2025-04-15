import React, { useState } from "react";
import { 
  ArrowLeft, 
  CloudSun, 
  Truck, 
  Building2,
  Calendar,
  MapPin,
  AlertCircle,
  CheckCircle,
  Eye,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { toast } from "sonner";
import { AlertType, AlertStatus } from "@/pages/Alertas";

interface AlertDetailProps {
  alert: {
    id: string;
    clientName: string;
    type: AlertType;
    description: string;
    date: string;
    status: AlertStatus;
    severity: "low" | "medium" | "high";
    source: string;
    details: string;
  };
  onClose: () => void;
}

export function AlertDetail({ alert, onClose }: AlertDetailProps) {
  const [notes, setNotes] = useState("");
  const [status, setStatus] = useState<AlertStatus>(alert.status);
  
  // Function to mark alert as managed
  const markAsManaged = () => {
    setStatus("gestionada");
    toast.success("Alerta marcada como gestionada");
  };
  
  // Function to mark alert as viewed
  const markAsViewed = () => {
    if (status === "nueva") {
      setStatus("vista");
      toast.success("Alerta marcada como vista");
    }
  };
  
  // Function to save notes
  const saveNotes = () => {
    if (notes.trim()) {
      toast.success("Notas guardadas correctamente");
    } else {
      toast.error("Por favor, añade alguna nota antes de guardar");
    }
  };
  
  // Get type-specific color scheme
  const getTypeStyles = () => {
    switch (alert.type) {
      case "meteo":
        return {
          bgColor: "bg-blue-50",
          textColor: "text-blue-700",
          iconColor: "text-blue-500",
          icon: <CloudSun className="h-5 w-5" />,
          label: "Meteorológico",
        };
      case "trafico":
        return {
          bgColor: "bg-amber-50",
          textColor: "text-amber-700",
          iconColor: "text-amber-500",
          icon: <Truck className="h-5 w-5" />,
          label: "Tráfico",
        };
      case "empresa":
        return {
          bgColor: "bg-purple-50",
          textColor: "text-purple-700",
          iconColor: "text-purple-500",
          icon: <Building2 className="h-5 w-5" />,
          label: "Empresarial",
        };
    }
  };
  
  // Get severity badge color
  const getSeverityBadge = () => {
    switch (alert.severity) {
      case "low":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-200">Baja</Badge>;
      case "medium":
        return <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-200">Media</Badge>;
      case "high":
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-200">Alta</Badge>;
    }
  };
  
  // Get status badge
  const getStatusBadge = () => {
    switch (status) {
      case "nueva":
        return <Badge variant="outline" className="bg-blue-100 text-blue-800 border-blue-200">Nueva</Badge>;
      case "vista":
        return <Badge variant="outline" className="bg-amber-100 text-amber-800 border-amber-200">Vista</Badge>;
      case "gestionada":
        return <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">Gestionada</Badge>;
    }
  };

  const typeStyles = getTypeStyles();
  
  return (
    <div className="space-y-6 bg-white rounded-lg border shadow-sm p-6">
      {/* Header with back button */}
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="sm" onClick={onClose} className="mr-2">
          <ArrowLeft className="h-4 w-4 mr-1" />
          Volver
        </Button>
        <h2 className="text-xl font-semibold">Detalle de Alerta</h2>
        <div className="ml-auto flex gap-2">
          {status !== "gestionada" && (
            <>
              {status === "nueva" && (
                <Button variant="outline" size="sm" onClick={markAsViewed} className="gap-1">
                  <Eye className="h-4 w-4" />
                  Marcar como vista
                </Button>
              )}
              <Button 
                variant="default" 
                size="sm" 
                onClick={markAsManaged} 
                className="gap-1 bg-green-600 hover:bg-green-700"
              >
                <CheckCircle className="h-4 w-4" />
                Marcar como gestionada
              </Button>
            </>
          )}
        </div>
      </div>
      
      {/* Alert information */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-4">
          {/* Alert header */}
          <div className={`${typeStyles.bgColor} rounded-md p-4 space-y-2`}>
            <div className="flex items-center gap-2">
              <div className={`p-2 rounded-full ${typeStyles.bgColor}`}>
                {typeStyles.icon}
              </div>
              <div className="flex-1">
                <span className={`text-sm font-medium ${typeStyles.textColor}`}>
                  Alerta {typeStyles.label}
                </span>
                <h3 className="text-lg font-medium">{alert.description}</h3>
              </div>
              {getSeverityBadge()}
            </div>
            <div className="flex flex-wrap gap-2 text-sm">
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4 text-gray-500" />
                {format(new Date(alert.date), "dd MMMM yyyy, HH:mm", { locale: es })}
              </div>
              <div className="flex items-center gap-1">
                <AlertCircle className="h-4 w-4 text-gray-500" />
                Fuente: {alert.source}
              </div>
              <div className="flex items-center gap-1">
                <MapPin className="h-4 w-4 text-gray-500" />
                Cliente: {alert.clientName}
              </div>
            </div>
          </div>
          
          {/* Alert details */}
          <div className="space-y-2">
            <h4 className="text-sm font-medium text-gray-500">DETALLES</h4>
            <p className="text-gray-700 whitespace-pre-line">{alert.details}</p>
          </div>
          
          {/* Notes section */}
          <div className="space-y-3 pt-4 border-t">
            <h4 className="text-sm font-medium text-gray-500">NOTAS INTERNAS</h4>
            <Textarea 
              placeholder="Añade notas sobre la gestión de esta alerta..." 
              value={notes} 
              onChange={(e) => setNotes(e.target.value)}
              className="min-h-[120px] resize-none"
            />
            <Button onClick={saveNotes} disabled={!notes.trim()}>
              Guardar notas
            </Button>
          </div>
        </div>
        
        {/* Sidebar with alert status information */}
        <div className="space-y-4">
          <div className="bg-gray-50 rounded-md p-4 space-y-3">
            <h4 className="font-medium">Estado de la alerta</h4>
            <div className="flex items-center gap-2">
              {getStatusBadge()}
              <span className="text-sm text-gray-500">
                {status === "nueva" ? "Esta alerta está pendiente de revisión" :
                status === "vista" ? "Esta alerta ha sido revisada" :
                "Esta alerta ha sido completamente gestionada"}
              </span>
            </div>
          </div>
          
          <div className="bg-gray-50 rounded-md p-4 space-y-3">
            <h4 className="font-medium">Información de la alerta</h4>
            <ul className="space-y-2 text-sm">
              <li className="flex justify-between">
                <span className="text-gray-500">ID:</span>
                <span className="font-medium">{alert.id}</span>
              </li>
              <li className="flex justify-between">
                <span className="text-gray-500">Tipo:</span>
                <span className="font-medium">{typeStyles.label}</span>
              </li>
              <li className="flex justify-between">
                <span className="text-gray-500">Cliente:</span>
                <span className="font-medium">{alert.clientName}</span>
              </li>
              <li className="flex justify-between">
                <span className="text-gray-500">Fecha:</span>
                <span className="font-medium">
                  {format(new Date(alert.date), "dd/MM/yyyy")}
                </span>
              </li>
              <li className="flex justify-between">
                <span className="text-gray-500">Hora:</span>
                <span className="font-medium">
                  {format(new Date(alert.date), "HH:mm")}
                </span>
              </li>
              <li className="flex justify-between">
                <span className="text-gray-500">Severidad:</span>
                <span className="font-medium">
                  {alert.severity === "low" ? "Baja" : 
                   alert.severity === "medium" ? "Media" : "Alta"}
                </span>
              </li>
              <li className="flex justify-between">
                <span className="text-gray-500">Fuente:</span>
                <span className="font-medium">{alert.source}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
