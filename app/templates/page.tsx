import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
  SidebarProvider,
} from "@/components/ui/sidebar";
import {
  ActivityIcon,
  ChartAreaIcon,
  ChevronDownIcon,
  CreditCardIcon,
  KeyIcon,
  LayoutDashboardIcon,
  LogOutIcon,
  SettingsIcon,
  UsersIcon,
} from "lucide-react";
import { GoOrganization } from "react-icons/go";
import { FaFileInvoiceDollar } from "react-icons/fa";
import React from "react";

interface SidebarMenuItem {
  label: string;
  // @ts-ignore
  icon: any;
}
type SidebarMenu = SidebarMenuItem[];

export default function DashboardPage() {
  const sidebarMainMenu: SidebarMenu = [
    { label: "Templates", icon: LayoutDashboardIcon },
    { label: "API Keys", icon: KeyIcon },
    { label: "Usage", icon: ChartAreaIcon },
  ];
  const sidebarSettingsMenu: SidebarMenu = [
    { label: "Team", icon: UsersIcon },
    { label: "Billing", icon: CreditCardIcon },
    { label: "Settings", icon: SettingsIcon },
  ];

  return (
    <main className="flex h-screen w-screen overflow-hidden">
      <SidebarProvider>
        <Sidebar>
          <SidebarHeader className="border-b">
            <DropdownMenu>
              <DropdownMenuTrigger asChild className="cursor-pointer">
                <Button
                  variant={"ghost"}
                  className="w-full flex items-center justify-between"
                >
                  <div className="flex items-center justify-start gap-2">
                    <GoOrganization className="size-4 text-neutral-500 dark:text-neutral-400" />
                    <span>Acme Inc.</span>
                  </div>
                  <ChevronDownIcon />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start">
                <DropdownMenuItem>
                  <div className="flex items-center justify-start gap-2">
                    <GoOrganization className="size-4 text-neutral-500 dark:text-neutral-400" />{" "}
                    <span>Foobar Inc.</span>{" "}
                  </div>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarHeader>
          <SidebarContent>
            <SidebarMenu>
              <SidebarGroup>
                <SidebarGroupLabel>Dashboard</SidebarGroupLabel>
                <SidebarGroupContent>
                  {sidebarMainMenu.map((item, idx) => (
                    <SidebarMenuItem key={idx}>
                      <SidebarMenuButton className="cursor-pointer">
                        <item.icon className="size-4 text-neutral-500 dark:text-neutral-400" />
                        <span>{item.label}</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarGroupContent>
              </SidebarGroup>

              <SidebarGroup>
                <SidebarGroupLabel>Settings</SidebarGroupLabel>
                <SidebarGroupContent>
                  {sidebarSettingsMenu.map((item, idx) => (
                    <SidebarMenuItem key={idx}>
                      <SidebarMenuButton className="cursor-pointer">
                        <item.icon className="size-4 text-neutral-500 dark:text-neutral-400" />
                        <span>{item.label}</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarGroupContent>
              </SidebarGroup>
            </SidebarMenu>
          </SidebarContent>
          <SidebarFooter className="border-t">
            <SidebarMenuItem>
              <SidebarMenuButton className="cursor-pointer hover:bg-red-800 text-white">
                <LogOutIcon className="size-4 text-white" />
                <span>Logout</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarFooter>
        </Sidebar>
      </SidebarProvider>
    </main>
  );
}
