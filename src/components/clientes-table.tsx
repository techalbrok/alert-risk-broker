
import React from "react";
import { Eye, Settings, CheckCircle, XCircle } from "lucide-react";
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Pagination, 
  PaginationContent, 
  PaginationItem, 
  PaginationLink, 
  PaginationNext, 
  PaginationPrevious 
} from "@/components/ui/pagination";

// Datos de ejemplo para la tabla de clientes
const clientesData = [
  {
    id: 1,
    nombre: "Construcciones García S.L.",
    direccion: "Madrid, España",
    nif: "B12345678",
    poliza: "RC Profesional",
    monitoresActivos: true
  },
  {
    id: 2,
    nombre: "Transportes Rápidos, S.A.",
    direccion: "Barcelona, España",
    nif: "A87654321",
    poliza: "Flotas",
    monitoresActivos: true
  },
  {
    id: 3,
    nombre: "Clínica Salud Total",
    direccion: "Valencia, España",
    nif: "B55667788",
    poliza: "RC Médica",
    monitoresActivos: false
  },
  {
    id: 4,
    nombre: "Restaurante El Mirador",
    direccion: "Sevilla, España",
    nif: "B11223344",
    poliza: "Multirriesgo",
    monitoresActivos: true
  },
  {
    id: 5,
    nombre: "Tecnologías Avanzadas, S.L.",
    direccion: "Bilbao, España",
    nif: "B99887766",
    poliza: "Ciberriesgo",
    monitoresActivos: false
  }
];

// Mapeamos los tipos de póliza a colores de badge
const polizaColors: Record<string, { color: string; bg: string }> = {
  "RC Profesional": { color: "text-blue-700", bg: "bg-blue-100" },
  "Flotas": { color: "text-green-700", bg: "bg-green-100" },
  "RC Médica": { color: "text-purple-700", bg: "bg-purple-100" },
  "Multirriesgo": { color: "text-amber-700", bg: "bg-amber-100" },
  "Ciberriesgo": { color: "text-red-700", bg: "bg-red-100" }
};

const ClientesTable = () => {
  return (
    <div>
      <div className="relative overflow-x-auto rounded-md">
        <Table>
          <TableHeader>
            <TableRow className="bg-slate-100">
              <TableHead>Nombre / Razón Social</TableHead>
              <TableHead>Dirección</TableHead>
              <TableHead>NIF/CIF</TableHead>
              <TableHead>Tipo de Póliza</TableHead>
              <TableHead>Monitores</TableHead>
              <TableHead className="text-right">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {clientesData.map((cliente) => (
              <TableRow key={cliente.id} className="border-b">
                <TableCell className="font-medium">{cliente.nombre}</TableCell>
                <TableCell>{cliente.direccion}</TableCell>
                <TableCell>{cliente.nif}</TableCell>
                <TableCell>
                  <Badge
                    className={`${polizaColors[cliente.poliza]?.bg} ${polizaColors[cliente.poliza]?.color} hover:${polizaColors[cliente.poliza]?.bg} border-0`}
                  >
                    {cliente.poliza}
                  </Badge>
                </TableCell>
                <TableCell>
                  {cliente.monitoresActivos ? (
                    <div className="flex items-center gap-1 text-green-600">
                      <CheckCircle className="h-4 w-4" />
                      <span className="text-xs">Activos</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-1 text-gray-500">
                      <XCircle className="h-4 w-4" />
                      <span className="text-xs">Inactivos</span>
                    </div>
                  )}
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Eye className="h-4 w-4" />
                      <span className="sr-only">Ver cliente</span>
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Settings className="h-4 w-4" />
                      <span className="sr-only">Configurar monitores</span>
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="mt-4">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious href="#" />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#" isActive>1</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">2</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">3</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationNext href="#" />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
};

export default ClientesTable;
