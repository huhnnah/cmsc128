import { AppSidebar } from "@/components/admin-sidebar"
import {
  SidebarProvider,
} from "@/components/ui/sidebar"

export default function ProductsPage() {
  return (
    <SidebarProvider>
      <div className="flex">
        <AppSidebar />
      </div>

      <div className="p-6">
        <h1 className="text-2xl font-bold">Products Page</h1>
        <p>This is the Products page.</p>
      </div>
    </SidebarProvider>
  );
}
