
import React, { useState } from "react";
import { 
  User, 
  Bell, 
  Key, 
  Mail, 
  Eye, 
  EyeOff, 
  RefreshCw, 
  Copy, 
  Check,
  Save
} from "lucide-react";
import { toast } from "sonner";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

// User profile form schema
const profileFormSchema = z.object({
  name: z.string().min(2, { message: "El nombre debe tener al menos 2 caracteres" }),
  email: z.string().email({ message: "Email inválido" }),
  currentPassword: z.string().min(1, { message: "La contraseña actual es requerida" }),
  newPassword: z.string().min(6, { message: "La nueva contraseña debe tener al menos 6 caracteres" }).optional(),
  confirmPassword: z.string().optional(),
}).refine((data) => {
  if (data.newPassword && data.newPassword !== data.confirmPassword) {
    return false;
  }
  return true;
}, {
  message: "Las contraseñas no coinciden",
  path: ["confirmPassword"],
});

// Function to copy text to clipboard
const copyToClipboard = async (text: string) => {
  try {
    await navigator.clipboard.writeText(text);
    toast.success("Copiado al portapapeles");
    return true;
  } catch (err) {
    toast.error("Error al copiar");
    return false;
  }
};

export default function Configuracion() {
  // Estado para contraseña visible/oculta
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  // API Keys
  const [apiKeys, setApiKeys] = useState([
    { id: "1", name: "API LibreBOR", key: "lbr_test_a1b2c3d4e5f6g7h8i9j0", environment: "test" },
    { id: "2", name: "API Validación", key: "valid_prod_9z8y7x6w5v4u3t2s1r0", environment: "production" },
  ]);
  const [copiedKeyId, setCopiedKeyId] = useState<string | null>(null);

  // Notification preferences
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(true);
  const [dailySummary, setDailySummary] = useState(false);
  const [weeklyReport, setWeeklyReport] = useState(true);

  // User profile form
  const profileForm = useForm<z.infer<typeof profileFormSchema>>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      name: "Ana Broker",
      email: "ana.broker@empresa.com",
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  // Handle profile form submission
  const onProfileSubmit = (values: z.infer<typeof profileFormSchema>) => {
    // Simulating a form submission
    console.log(values);
    toast.success("Perfil actualizado correctamente");
  };

  // Function to generate a new API key
  const generateNewKey = (id: string) => {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";
    const prefix = id === "1" ? "lbr_test_" : "valid_prod_";
    
    for (let i = 0; i < 20; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    
    setApiKeys(prevKeys => 
      prevKeys.map(key => 
        key.id === id ? { ...key, key: prefix + result } : key
      )
    );
    
    toast.success("Nueva API key generada");
  };

  // Function to handle copying an API key
  const handleCopyKey = async (id: string, key: string) => {
    const success = await copyToClipboard(key);
    if (success) {
      setCopiedKeyId(id);
      setTimeout(() => setCopiedKeyId(null), 2000);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Configuración</h1>
        <p className="text-muted-foreground">
          Administra tu perfil, notificaciones y claves API.
        </p>
      </div>

      <Tabs defaultValue="profile" className="space-y-4">
        <TabsList>
          <TabsTrigger value="profile" className="flex items-center gap-2">
            <User className="h-4 w-4" />
            <span>Perfil</span>
          </TabsTrigger>
          <TabsTrigger value="notifications" className="flex items-center gap-2">
            <Bell className="h-4 w-4" />
            <span>Notificaciones</span>
          </TabsTrigger>
          <TabsTrigger value="api-keys" className="flex items-center gap-2">
            <Key className="h-4 w-4" />
            <span>API Keys</span>
          </TabsTrigger>
        </TabsList>

        {/* Perfil de Usuario */}
        <TabsContent value="profile" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Perfil de Usuario</CardTitle>
              <CardDescription>
                Actualiza tu información personal y credenciales de acceso.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...profileForm}>
                <form onSubmit={profileForm.handleSubmit(onProfileSubmit)} className="space-y-6">
                  <FormField
                    control={profileForm.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nombre completo</FormLabel>
                        <FormControl>
                          <Input placeholder="Tu nombre" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={profileForm.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input type="email" placeholder="tu@ejemplo.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <div className="space-y-4">
                    <h3 className="font-medium">Cambiar contraseña</h3>
                    
                    <FormField
                      control={profileForm.control}
                      name="currentPassword"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Contraseña actual</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Input
                                type={showCurrentPassword ? "text" : "password"}
                                placeholder="••••••••"
                                {...field}
                              />
                              <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                className="absolute right-0 top-0 h-full px-3"
                                onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                              >
                                {showCurrentPassword ? (
                                  <EyeOff className="h-4 w-4" />
                                ) : (
                                  <Eye className="h-4 w-4" />
                                )}
                                <span className="sr-only">
                                  {showCurrentPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                                </span>
                              </Button>
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={profileForm.control}
                      name="newPassword"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Nueva contraseña</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Input
                                type={showNewPassword ? "text" : "password"}
                                placeholder="••••••••"
                                {...field}
                              />
                              <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                className="absolute right-0 top-0 h-full px-3"
                                onClick={() => setShowNewPassword(!showNewPassword)}
                              >
                                {showNewPassword ? (
                                  <EyeOff className="h-4 w-4" />
                                ) : (
                                  <Eye className="h-4 w-4" />
                                )}
                                <span className="sr-only">
                                  {showNewPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                                </span>
                              </Button>
                            </div>
                          </FormControl>
                          <FormDescription>
                            Mínimo 6 caracteres.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={profileForm.control}
                      name="confirmPassword"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Confirmar nueva contraseña</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Input
                                type={showConfirmPassword ? "text" : "password"}
                                placeholder="••••••••"
                                {...field}
                              />
                              <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                className="absolute right-0 top-0 h-full px-3"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                              >
                                {showConfirmPassword ? (
                                  <EyeOff className="h-4 w-4" />
                                ) : (
                                  <Eye className="h-4 w-4" />
                                )}
                                <span className="sr-only">
                                  {showConfirmPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                                </span>
                              </Button>
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <Button type="submit" className="flex items-center gap-2">
                    <Save className="h-4 w-4" />
                    Guardar cambios
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Preferencias de Notificación */}
        <TabsContent value="notifications" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Preferencias de Notificación</CardTitle>
              <CardDescription>
                Configura cómo y cuándo quieres recibir notificaciones.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="font-medium">Notificaciones de alertas</h3>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="email-notifications" className="text-base">Emails de alerta</Label>
                    <p className="text-sm text-muted-foreground">
                      Recibir notificaciones por email cuando se detecte una nueva alerta.
                    </p>
                  </div>
                  <Switch 
                    id="email-notifications" 
                    checked={emailNotifications}
                    onCheckedChange={setEmailNotifications}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="push-notifications" className="text-base">Notificaciones push</Label>
                    <p className="text-sm text-muted-foreground">
                      Recibir notificaciones push en el navegador cuando se detecte una nueva alerta.
                    </p>
                  </div>
                  <Switch 
                    id="push-notifications" 
                    checked={pushNotifications}
                    onCheckedChange={setPushNotifications}
                  />
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-medium">Resúmenes e informes</h3>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="daily-summary" className="text-base">Resumen diario</Label>
                    <p className="text-sm text-muted-foreground">
                      Recibir un resumen diario de todas las alertas.
                    </p>
                  </div>
                  <Switch 
                    id="daily-summary" 
                    checked={dailySummary}
                    onCheckedChange={setDailySummary}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="weekly-report" className="text-base">Informe semanal</Label>
                    <p className="text-sm text-muted-foreground">
                      Recibir un informe semanal con estadísticas y análisis.
                    </p>
                  </div>
                  <Switch 
                    id="weekly-report" 
                    checked={weeklyReport}
                    onCheckedChange={setWeeklyReport}
                  />
                </div>
              </div>

              <Button 
                onClick={() => toast.success("Preferencias de notificación guardadas")}
                className="flex items-center gap-2"
              >
                <Save className="h-4 w-4" />
                Guardar preferencias
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Gestión de API Keys */}
        <TabsContent value="api-keys" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Gestión de API Keys</CardTitle>
              <CardDescription>
                Administra tus claves de API para integraciones con servicios externos.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {apiKeys.map((apiKey) => (
                <div key={apiKey.id} className="space-y-4">
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor={`api-key-${apiKey.id}`}>
                      {apiKey.name}
                      <Badge variant="outline" className="ml-2">
                        {apiKey.environment === "test" ? "Test" : "Producción"}
                      </Badge>
                    </Label>
                    <div className="flex items-center gap-2">
                      <div className="relative flex-grow">
                        <Input
                          id={`api-key-${apiKey.id}`}
                          value={apiKey.key}
                          readOnly
                          className="font-mono pr-24"
                        />
                        <div className="absolute right-1 top-1 flex">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleCopyKey(apiKey.id, apiKey.key)}
                            className="h-6"
                          >
                            {copiedKeyId === apiKey.id ? (
                              <Check className="h-3.5 w-3.5" />
                            ) : (
                              <Copy className="h-3.5 w-3.5" />
                            )}
                            <span className="sr-only">Copiar</span>
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => generateNewKey(apiKey.id)}
                            className="h-6"
                          >
                            <RefreshCw className="h-3.5 w-3.5" />
                            <span className="sr-only">Regenerar</span>
                          </Button>
                        </div>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {apiKey.name === "API LibreBOR" 
                        ? "Clave para acceder a los servicios de consulta de LibreBOR."
                        : "Clave para el servicio de validación de documentos."}
                    </p>
                  </div>
                </div>
              ))}

              <div className="space-y-2">
                <h3 className="font-medium">Configuración adicional</h3>
                <div className="grid gap-4">
                  <div>
                    <Label htmlFor="webhook-url">URL del Webhook</Label>
                    <Input 
                      id="webhook-url" 
                      placeholder="https://tu-dominio.com/api/webhook" 
                      className="mt-1"
                    />
                    <p className="mt-1 text-sm text-muted-foreground">
                      URL donde se enviarán las notificaciones de eventos.
                    </p>
                  </div>
                  <div>
                    <Label htmlFor="api-notes">Notas</Label>
                    <Textarea 
                      id="api-notes" 
                      placeholder="Notas sobre el uso de la API..." 
                      className="mt-1"
                    />
                  </div>
                </div>
                <Button 
                  onClick={() => toast.success("Configuración de API guardada")}
                  className="mt-4"
                >
                  Guardar configuración
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
