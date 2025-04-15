import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import AppLayout from "./layouts/AppLayout";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Ruta pública */}
          <Route path="/login" element={<Login />} />
          
          {/* Ruta principal a login */}
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          
          {/* Rutas protegidas con AppLayout */}
          <Route element={<AppLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/clientes" element={<h1 className="text-3xl font-bold">Cartera de Clientes</h1>} />
            <Route path="/monitores" element={<h1 className="text-3xl font-bold">Configurar Monitores</h1>} />
            <Route path="/alertas" element={<h1 className="text-3xl font-bold">Historial de Alertas</h1>} />
            <Route path="/informes" element={<h1 className="text-3xl font-bold">Informes</h1>} />
            <Route path="/configuracion" element={<h1 className="text-3xl font-bold">Configuración</h1>} />
          </Route>
          
          {/* Ruta de 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
