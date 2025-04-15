
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { Outlet } from "react-router-dom";

export default function AppLayout() {
  return (
    <SidebarProvider>
      <div className="flex h-screen w-full overflow-hidden bg-slate-50">
        <AppSidebar />
        <main className="flex-1 overflow-y-auto">
          <div className="container py-6 px-6 md:px-8 max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}
