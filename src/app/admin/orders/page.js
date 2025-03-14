import { AppSidebar } from "@/components/admin-sidebar"
import {
  SidebarProvider,
} from "@/components/ui/sidebar"

export default function OrdersPage() {
  return (
    <SidebarProvider>
      <div className="flex">
        <AppSidebar />
      </div>

      <div className="p-6">
      <h1 className="text-2xl font-bold">Order Page</h1>
      <p>Welcome to the orders management page.</p>
      </div>
    </SidebarProvider>
  );
}
