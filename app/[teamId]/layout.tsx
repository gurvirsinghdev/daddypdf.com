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
  ChartAreaIcon,
  ChevronDownIcon,
  CreditCardIcon,
  KeyIcon,
  LayoutDashboardIcon,
  SearchIcon,
  SettingsIcon,
  UsersIcon,
} from "lucide-react";
import { GoOrganization } from "react-icons/go";
import React from "react";
import { Input } from "@/components/ui/input";
import { redirect } from "next/navigation";
import LogoutButton from "@/modules/dashboard/ui/logout-button";
import Link from "next/link";
import { trpc } from "@/lib/trpc/server";

interface SidebarMenuItem {
  pathname: string;
  label: string;
  // @ts-ignore
  icon: any;
}
type SidebarMenu = SidebarMenuItem[];

interface DashboardLayoutProps {
  children: React.ReactNode;
  params: Promise<{ teamId: string }>;
}

export default async function DashboardLayout({
  params,
  children,
}: DashboardLayoutProps) {
  const { teamId } = await params;
  const teams = await trpc.team.getTeams();

  const sidebarMainMenu: SidebarMenu = [
    { pathname: "templates", label: "Templates", icon: LayoutDashboardIcon },
    { pathname: "api-keys", label: "API Keys", icon: KeyIcon },
    { pathname: "usage", label: "Usage", icon: ChartAreaIcon },
  ];
  const sidebarSettingsMenu: SidebarMenu = [
    { pathname: "settings/team", label: "Team", icon: UsersIcon },
    { pathname: "settings/billing", label: "Billing", icon: CreditCardIcon },
    { pathname: "settings", label: "Settings", icon: SettingsIcon },
  ];

  return (
    <main className="h-screen w-screen overflow-hidden">
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
                    <span className="capitalize">{teams[0]?.teamName}</span>
                  </div>
                  <ChevronDownIcon />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start">
                {teams.map((team) => (
                  <DropdownMenuItem
                    key={team.teamId}
                    disabled={team.teamId === teams[0]?.teamId}
                  >
                    <div className="flex items-center justify-start gap-2">
                      <GoOrganization className="size-4 text-neutral-500 dark:text-neutral-400" />{" "}
                      <span className="capitalize">{team.teamName}</span>
                    </div>
                  </DropdownMenuItem>
                ))}
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
                      <Link href={`/${teamId}/${item.pathname}`}>
                        <SidebarMenuButton className="cursor-pointer">
                          <item.icon className="size-4 text-neutral-500 dark:text-neutral-400" />
                          <span>{item.label}</span>
                        </SidebarMenuButton>
                      </Link>
                    </SidebarMenuItem>
                  ))}
                </SidebarGroupContent>
              </SidebarGroup>

              <SidebarGroup>
                <SidebarGroupLabel>Settings</SidebarGroupLabel>
                <SidebarGroupContent>
                  {sidebarSettingsMenu.map((item, idx) => (
                    <SidebarMenuItem key={idx}>
                      <Link href={`/${teamId}/${item.pathname}`}>
                        <SidebarMenuButton className="cursor-pointer">
                          <item.icon className="size-4 text-neutral-500 dark:text-neutral-400" />
                          <span>{item.label}</span>
                        </SidebarMenuButton>
                      </Link>
                    </SidebarMenuItem>
                  ))}
                </SidebarGroupContent>
              </SidebarGroup>
            </SidebarMenu>
          </SidebarContent>
          <SidebarFooter className="border-t">
            <SidebarMenuItem>
              <LogoutButton />
            </SidebarMenuItem>
          </SidebarFooter>
        </Sidebar>

        <section className="w-full h-full">
          <div className="w-full flex items-center justify-between bg-neutral-100 dark:bg-neutral-900 p-2 border-b">
            <div className="relative">
              <SearchIcon className="size-4 text-neutral-500 dark:text-neutral-400 absolute left-2 top-1/2 -translate-y-1/2" />
              <Input
                placeholder="Search templates"
                className="w-full max-w-xs rounded-sm pl-8"
              />
            </div>
            <div>
              <div className="w-8 h-8 rounded-full overflow-hidden">
                <img
                  alt="User avatar"
                  className="w-full h-full object-cover"
                  src={
                    "https://lh3.googleusercontent.com/aida-public/AB6AXuATqGP5-zt6akGeXRoSli_gMQyL04m7f7PicOhz3XwrOvD7QzMNoXfmuCtaNRwqEJQEffXwEYzr9kOZ0MybIlDFKmGaBAZyxtG_qecPQfxCUIQ_d5kJYLDJcr5t0Pkzi3p4PwvY-K70wsI09UzmMYUkAxUWHhgULJhe4Es-0pObCi64O4Yes21P91VbDVncMRf_ErJPXJ9aFejETuuMgFQ-5Pan2mwdX7hzIi1ITCHxcMQBOVTUjjmSib0ae7tEWr2usqN6B2g5oA4E"
                  }
                />
              </div>
            </div>
          </div>

          {children}
        </section>
      </SidebarProvider>
    </main>
  );
}
