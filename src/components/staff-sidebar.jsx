"use client"
import * as React from "react"
import {
  CircleXIcon,
  ShoppingCartIcon,
  TicketPercentIcon,
  LogOutIcon,
  TruckIcon,
  Undo2Icon,
} from "lucide-react"
import { NavMain } from "@/components/nav-main"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import Link from "next/link";

const data = {
  user: {
    name: "Staff",
    email: "staff@MW-IMS.com",
    avatar: "/avatars/shadcn.jpg",
  },

  navMain: [
    {
      title: "Orders",
      url: "./orders",
      icon: ShoppingCartIcon,
      isActive: true,
    },
    {
      title: "Deliveries",
      url: "./deliveries",
      icon: TruckIcon,
    },
    {
      title: "Returns",
      url: "./returns",
      icon: Undo2Icon,
    },
    {
      title: "Discounts",
      url: "./discounts",
      icon: TicketPercentIcon,
    },
    {
      title: "Deleted Transactions",
      url: "./void",
      icon: CircleXIcon,
    }
  ]
};

export function AppSidebar({
  ...props
}) {
  return (
    <Sidebar variant="inset" {...props} className="bg-white">
      <SidebarHeader className="bg-white">
        <SidebarMenu>
          <SidebarMenuItem>
            <Link href="/">
              <SidebarMenuButton size="xl">
                <div className="flex justify-center items-center">
                  <img
                    src="/logo1.svg"
                    alt="Music World IMS Logo"
                    className="h-30 object-contain"
                  />
                </div>
              </SidebarMenuButton>
            </Link>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent className="bg-white">
        <NavMain items={data.navMain} />
      </SidebarContent>

      <SidebarFooter className="bg-white">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg">
              <LogOutIcon className="size-5" />
              <span className="ml-2">Log Out</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  );
}
