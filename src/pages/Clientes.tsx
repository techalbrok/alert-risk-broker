
import React from "react";
import { Eye, Settings, Search, UserPlus, FileUp } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from "@/components/ui/table";
import ClientesTable from "@/components/clientes-table";
import { Badge } from "@/components/ui/badge";

const Clientes = () => {
  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Cartera de Clientes</h1>
          <p className="text-gray-500 mt-1">Gestiona y visualiza tu cartera de clientes</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" size="sm" className="flex items-center gap-1">
            <FileUp className="h-4 w-4" />
            <span>Importar</span>
          </Button>
          <Button size="sm" className="flex items-center gap-1">
            <UserPlus className="h-4 w-4" />
            <span>Añadir Cliente</span>
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg font-medium">Lista de clientes</CardTitle>
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                type="search"
                placeholder="Buscar cliente..."
                className="w-64 pl-8"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <ClientesTable />
        </CardContent>
      </Card>
    </>
  );
};

export default Clientes;
