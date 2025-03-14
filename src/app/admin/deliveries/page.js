import { AppSidebar } from "@/components/admin-sidebar"
import {
  SidebarProvider,
} from "@/components/ui/sidebar"

export default function DeliveriesPage() {
  return (
    <SidebarProvider>
      <div className="flex">
        <AppSidebar />
      </div>

      <div className="p-6">
        <h1 className="text-2xl font-bold">Deliveries Page</h1>
        <p>This is the Deliveries page.</p>
      </div>
    </SidebarProvider>
  );
}
