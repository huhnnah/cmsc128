import { AppSidebar } from "@/components/admin-sidebar"
import {
  SidebarProvider,
} from "@/components/ui/sidebar"

export default function DiscountsPage() {
  return (
    <SidebarProvider>
      <div className="flex">
        <AppSidebar />
      </div>

      <div className="p-6">
        <h1 className="text-2xl font-bold">Discounts Page</h1>
        <p>This is the Discounts page.</p>
      </div>
    </SidebarProvider>
  );
}
