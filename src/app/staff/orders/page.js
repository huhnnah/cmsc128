import { AppSidebar } from "@/components/staff-sidebar"
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
        <h1 className="text-2xl font-bold">Orders Staff Page</h1>
        <p>This is the Orders Staff page.</p>
      </div>
    </SidebarProvider>
  );
}
