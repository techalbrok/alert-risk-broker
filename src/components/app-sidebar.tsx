
import { Home, Users, Bell, Settings, BarChart3, Layers } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

import Logo from "@/components/logo";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

export function AppSidebar() {
  const location = useLocation();
  const currentPath = location.pathname;

  // Menú principal
  const menuItems = [
    {
      title: "Dashboard",
      icon: Home,
      path: "/dashboard",
    },
    {
      title: "Clientes",
      icon: Users,
      path: "/clientes",
    },
    {
      title: "Monitores",
      icon: Layers,
      path: "/monitores",
    },
    {
      title: "Alertas",
      icon: Bell,
      path: "/alertas",
    },
    {
      title: "Informes",
      icon: BarChart3,
      path: "/informes",
    },
    {
      title: "Configuración",
      icon: Settings,
      path: "/configuracion",
    },
  ];

  return (
    <Sidebar className="border-r border-gray-200">
      <SidebarHeader>
        <div className="flex items-center px-2">
          <Logo />
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navegación</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.path}>
                  <SidebarMenuButton 
                    asChild 
                    className={currentPath === item.path ? "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground" : ""}
                  >
                    <Link to={item.path}>
                      <item.icon className="h-5 w-5" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <div className="flex items-center gap-2 px-2">
          <Avatar className="h-9 w-9">
            <AvatarImage src="/avatar-broker.jpg" alt="Avatar" />
            <AvatarFallback className="bg-riesgo-200 text-riesgo-500">AB</AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <span className="text-sm font-medium">Ana Broker</span>
            <span className="text-xs text-muted-foreground">Gestor de cuenta</span>
          </div>
          <Button size="sm" variant="ghost" className="ml-auto h-8 w-8 p-0">
            <Settings className="h-4 w-4" />
            <span className="sr-only">Configuración de usuario</span>
          </Button>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
