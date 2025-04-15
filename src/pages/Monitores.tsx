
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Switch } from "@/components/ui/switch";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Cloud, TrafficCone, Building, ChevronDown } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const monitorSchema = z.object({
  clienteId: z.string({
    required_error: "Por favor seleccione un cliente",
  }),
  meteorologico: z.object({
    activo: z.boolean().default(false),
    nivelAviso: z.enum(["amarillo", "naranja", "rojo"]).default("naranja"),
  }),
  trafico: z.object({
    activo: z.boolean().default(false),
    areaInteres: z.enum(["municipio", "ruta", "provincia"]).default("municipio"),
    tipoIncidencia: z.enum(["todas", "graves", "cortes"]).default("graves"),
  }),
  empresarial: z.object({
    activo: z.boolean().default(false),
    actos: z.array(z.string()).default([]),
  }),
});

type MonitorFormValues = z.infer<typeof monitorSchema>;

// Datos simulados para pruebas
const clientes = [
  { id: "1", nombre: "Empresa ABC S.L." },
  { id: "2", nombre: "Juan García (Autónomo)" },
  { id: "3", nombre: "Constructora Hermanos Pérez" },
  { id: "4", nombre: "Restaurante La Buena Mesa" },
  { id: "5", nombre: "Grupo Asegurador XYZ" },
];

const actosBorme = [
  { id: "concurso", label: "Concurso de Acreedores" },
  { id: "disolucion", label: "Disolución de la Sociedad" },
  { id: "administradores", label: "Cambios de Administradores" },
  { id: "fusion", label: "Fusión o Absorción" },
  { id: "ampliacion", label: "Ampliación de Capital" },
  { id: "reduccion", label: "Reducción de Capital" },
  { id: "transformacion", label: "Transformación Societaria" },
];

const Monitores = () => {
  const [meteorologicoOpen, setMeteorologicoOpen] = useState(true);
  const [traficoOpen, setTraficoOpen] = useState(true);
  const [empresarialOpen, setEmpresarialOpen] = useState(true);
  const { toast } = useToast();

  const form = useForm<MonitorFormValues>({
    resolver: zodResolver(monitorSchema),
    defaultValues: {
      meteorologico: {
        activo: false,
        nivelAviso: "naranja",
      },
      trafico: {
        activo: false,
        areaInteres: "municipio",
        tipoIncidencia: "graves",
      },
      empresarial: {
        activo: false,
        actos: [],
      },
    },
  });

  const onSubmit = (data: MonitorFormValues) => {
    console.log("Configuración guardada:", data);
    toast({
      title: "Configuración guardada",
      description: `Monitores configurados para ${clientes.find(c => c.id === data.clienteId)?.nombre}`,
    });
  };

  const meteorologicoActivo = form.watch("meteorologico.activo");
  const traficoActivo = form.watch("trafico.activo");
  const empresarialActivo = form.watch("empresarial.activo");

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Configuración de Monitores</h1>
        <p className="text-gray-500 mt-1">Configure alertas para sus clientes según diferentes tipos de riesgos</p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Selección de Cliente</CardTitle>
            </CardHeader>
            <CardContent>
              <FormField
                control={form.control}
                name="clienteId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Cliente</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Seleccione un cliente" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {clientes.map((cliente) => (
                          <SelectItem key={cliente.id} value={cliente.id}>
                            {cliente.nombre}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormDescription>
                      Seleccione el cliente para el que desea configurar los monitores de riesgo.
                    </FormDescription>
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

          {/* Monitor Meteorológico */}
          <Card>
            <CardHeader className="py-4">
              <Collapsible open={meteorologicoOpen} onOpenChange={setMeteorologicoOpen}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Cloud className="h-5 w-5 text-blue-600" />
                    <CardTitle className="text-lg">Monitor Meteorológico (AEMET)</CardTitle>
                  </div>
                  <div className="flex items-center gap-4">
                    <FormField
                      control={form.control}
                      name="meteorologico.activo"
                      render={({ field }) => (
                        <FormItem className="flex items-center space-x-2 space-y-0">
                          <FormLabel>Activar</FormLabel>
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <CollapsibleTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <ChevronDown className={`h-4 w-4 transition-transform ${meteorologicoOpen ? "" : "-rotate-90"}`} />
                      </Button>
                    </CollapsibleTrigger>
                  </div>
                </div>
              </Collapsible>
            </CardHeader>
            <CollapsibleContent>
              <CardContent>
                {meteorologicoActivo && (
                  <FormField
                    control={form.control}
                    name="meteorologico.nivelAviso"
                    render={({ field }) => (
                      <FormItem className="space-y-3">
                        <FormLabel>Nivel mínimo de aviso</FormLabel>
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            className="flex flex-col space-y-1"
                          >
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="amarillo" id="amarillo" />
                              <Label htmlFor="amarillo" className="flex items-center">
                                <span className="h-3 w-3 rounded-full bg-yellow-500 mr-2"></span>
                                Amarillo (Riesgo bajo)
                              </Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="naranja" id="naranja" />
                              <Label htmlFor="naranja" className="flex items-center">
                                <span className="h-3 w-3 rounded-full bg-orange-500 mr-2"></span>
                                Naranja (Riesgo importante)
                              </Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="rojo" id="rojo" />
                              <Label htmlFor="rojo" className="flex items-center">
                                <span className="h-3 w-3 rounded-full bg-red-600 mr-2"></span>
                                Rojo (Riesgo extremo)
                              </Label>
                            </div>
                          </RadioGroup>
                        </FormControl>
                        <FormDescription>
                          Seleccione el nivel mínimo de aviso meteorológico que activará una alerta.
                        </FormDescription>
                      </FormItem>
                    )}
                  />
                )}
              </CardContent>
            </CollapsibleContent>
          </Card>

          {/* Monitor de Tráfico */}
          <Card>
            <CardHeader className="py-4">
              <Collapsible open={traficoOpen} onOpenChange={setTraficoOpen}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <TrafficCone className="h-5 w-5 text-orange-600" />
                    <CardTitle className="text-lg">Monitor de Tráfico (DGT)</CardTitle>
                  </div>
                  <div className="flex items-center gap-4">
                    <FormField
                      control={form.control}
                      name="trafico.activo"
                      render={({ field }) => (
                        <FormItem className="flex items-center space-x-2 space-y-0">
                          <FormLabel>Activar</FormLabel>
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <CollapsibleTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <ChevronDown className={`h-4 w-4 transition-transform ${traficoOpen ? "" : "-rotate-90"}`} />
                      </Button>
                    </CollapsibleTrigger>
                  </div>
                </div>
              </Collapsible>
            </CardHeader>
            <CollapsibleContent>
              <CardContent>
                {traficoActivo && (
                  <div className="space-y-6">
                    <FormField
                      control={form.control}
                      name="trafico.areaInteres"
                      render={({ field }) => (
                        <FormItem className="space-y-3">
                          <FormLabel>Área de interés</FormLabel>
                          <FormControl>
                            <RadioGroup
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                              className="flex flex-col space-y-1"
                            >
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="municipio" id="municipio" />
                                <Label htmlFor="municipio">Municipio de residencia</Label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="ruta" id="ruta" />
                                <Label htmlFor="ruta">Ruta específica</Label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="provincia" id="provincia" />
                                <Label htmlFor="provincia">Provincia completa</Label>
                              </div>
                            </RadioGroup>
                          </FormControl>
                          <FormDescription>
                            Seleccione el área geográfica que desea monitorizar para incidencias de tráfico.
                          </FormDescription>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="trafico.tipoIncidencia"
                      render={({ field }) => (
                        <FormItem className="space-y-3">
                          <FormLabel>Tipo de incidencia</FormLabel>
                          <FormControl>
                            <RadioGroup
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                              className="flex flex-col space-y-1"
                            >
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="todas" id="todas" />
                                <Label htmlFor="todas">Todas las incidencias</Label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="graves" id="graves" />
                                <Label htmlFor="graves">Solo incidencias graves</Label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="cortes" id="cortes" />
                                <Label htmlFor="cortes">Solo cortes de vía</Label>
                              </div>
                            </RadioGroup>
                          </FormControl>
                          <FormDescription>
                            Seleccione el tipo de incidencias de tráfico que activarán una alerta.
                          </FormDescription>
                        </FormItem>
                      )}
                    />
                  </div>
                )}
              </CardContent>
            </CollapsibleContent>
          </Card>

          {/* Monitor Empresarial */}
          <Card>
            <CardHeader className="py-4">
              <Collapsible open={empresarialOpen} onOpenChange={setEmpresarialOpen}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Building className="h-5 w-5 text-purple-600" />
                    <CardTitle className="text-lg">Monitor Empresarial (LibreBOR)</CardTitle>
                  </div>
                  <div className="flex items-center gap-4">
                    <FormField
                      control={form.control}
                      name="empresarial.activo"
                      render={({ field }) => (
                        <FormItem className="flex items-center space-x-2 space-y-0">
                          <FormLabel>Activar</FormLabel>
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <CollapsibleTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <ChevronDown className={`h-4 w-4 transition-transform ${empresarialOpen ? "" : "-rotate-90"}`} />
                      </Button>
                    </CollapsibleTrigger>
                  </div>
                </div>
              </Collapsible>
            </CardHeader>
            <CollapsibleContent>
              <CardContent>
                {empresarialActivo && (
                  <FormField
                    control={form.control}
                    name="empresarial.actos"
                    render={() => (
                      <FormItem>
                        <div className="mb-4">
                          <FormLabel>Tipos de actos BORME a monitorizar</FormLabel>
                          <FormDescription>
                            Seleccione los tipos de publicaciones del Boletín Oficial del Registro Mercantil que activarán una alerta.
                          </FormDescription>
                        </div>
                        {actosBorme.map((acto) => (
                          <FormField
                            key={acto.id}
                            control={form.control}
                            name="empresarial.actos"
                            render={({ field }) => {
                              return (
                                <FormItem
                                  key={acto.id}
                                  className="flex flex-row items-start space-x-3 space-y-0"
                                >
                                  <FormControl>
                                    <Checkbox
                                      checked={field.value?.includes(acto.id)}
                                      onCheckedChange={(checked) => {
                                        return checked
                                          ? field.onChange([...field.value, acto.id])
                                          : field.onChange(
                                              field.value?.filter(
                                                (value) => value !== acto.id
                                              )
                                            )
                                      }}
                                    />
                                  </FormControl>
                                  <FormLabel className="font-normal">
                                    {acto.label}
                                  </FormLabel>
                                </FormItem>
                              )
                            }}
                          />
                        ))}
                      </FormItem>
                    )}
                  />
                )}
              </CardContent>
            </CollapsibleContent>
          </Card>

          <div className="flex justify-end">
            <Button type="submit" size="lg">
              Guardar Configuración de Monitores
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default Monitores;
