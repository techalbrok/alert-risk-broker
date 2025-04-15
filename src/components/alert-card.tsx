
import { CloudSun, Truck, Building2, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

type AlertType = "meteo" | "trafico" | "empresa";

interface AlertCardProps {
  id: string;
  type: AlertType;
  title: string;
  description: string;
  clientName: string;
  date: string;
  isNew?: boolean;
  severity?: "low" | "medium" | "high";
  className?: string;
}

export function AlertCard({
  id,
  type,
  title,
  description,
  clientName,
  date,
  isNew = false,
  severity = "medium",
  className,
}: AlertCardProps) {
  // Icon based on alert type
  const AlertIcon = () => {
    switch (type) {
      case "meteo":
        return <CloudSun className="h-5 w-5" />;
      case "trafico":
        return <Truck className="h-5 w-5" />;
      case "empresa":
        return <Building2 className="h-5 w-5" />;
      default:
        return <CloudSun className="h-5 w-5" />;
    }
  };

  // Color based on alert type
  const getTypeStyles = () => {
    switch (type) {
      case "meteo":
        return {
          bgColor: "bg-blue-50",
          textColor: "text-blue-600",
          borderColor: "border-blue-200",
          iconColor: "text-blue-500",
        };
      case "trafico":
        return {
          bgColor: "bg-amber-50",
          textColor: "text-amber-600",
          borderColor: "border-amber-200",
          iconColor: "text-amber-500",
        };
      case "empresa":
        return {
          bgColor: "bg-purple-50",
          textColor: "text-purple-600",
          borderColor: "border-purple-200",
          iconColor: "text-purple-500",
        };
      default:
        return {
          bgColor: "bg-gray-50",
          textColor: "text-gray-600",
          borderColor: "border-gray-200",
          iconColor: "text-gray-500",
        };
    }
  };

  // Severity badge color
  const getSeverityColor = () => {
    switch (severity) {
      case "low":
        return "bg-green-100 text-green-800 hover:bg-green-200";
      case "medium":
        return "bg-amber-100 text-amber-800 hover:bg-amber-200";
      case "high":
        return "bg-red-100 text-red-800 hover:bg-red-200";
      default:
        return "bg-gray-100 text-gray-800 hover:bg-gray-200";
    }
  };

  const typeStyles = getTypeStyles();

  return (
    <Card className={cn("border overflow-hidden transition-all duration-200 hover:shadow-md", 
      typeStyles.borderColor, 
      isNew && "ring-2 ring-blue-400 ring-offset-2",
      className
    )}>
      <CardHeader className={cn("pb-2", typeStyles.bgColor)}>
        <div className="flex justify-between">
          <div className="flex items-center gap-2">
            <div className={cn("p-1.5 rounded-full", typeStyles.bgColor)}>
              <AlertIcon />
            </div>
            <CardTitle className="text-base font-semibold">
              {title}
            </CardTitle>
          </div>
          {isNew && (
            <Badge variant="outline" className="bg-blue-100 text-blue-800 border-blue-200">
              Nueva
            </Badge>
          )}
        </div>
        <CardDescription className="text-sm mt-1">
          Cliente: <span className="font-medium">{clientName}</span>
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-3 pb-2">
        <p className="text-sm text-gray-700">{description}</p>
        <div className="flex items-center justify-between mt-2">
          <Badge className={cn("font-normal", getSeverityColor())}>
            {severity === "low" && "Baja"}
            {severity === "medium" && "Media"}
            {severity === "high" && "Alta"}
          </Badge>
          <span className="text-xs text-gray-500">{date}</span>
        </div>
      </CardContent>
      <CardFooter className="pt-1 pb-3 flex justify-between">
        <Button variant="ghost" size="sm">
          Marcar como vista
        </Button>
        <Button variant="ghost" size="sm" className="gap-1">
          Detalles
          <ExternalLink className="h-3.5 w-3.5" />
        </Button>
      </CardFooter>
    </Card>
  );
}
