import { AppSidebar } from "@/components/admin-sidebar"
import {
  SidebarProvider,
} from "@/components/ui/sidebar"

export default function VoidPage() {
  return (
    <SidebarProvider>
      <div className="flex">
        <AppSidebar />
      </div>

      <div className="p-6">
        <h1 className="text-2xl font-bold">Void Transactions Page</h1>
        <p>This is the Void Transactions page.</p>
      </div>
    </SidebarProvider>
  );
}
