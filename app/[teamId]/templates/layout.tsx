import { createDrizzleClient } from "@/lib/db/drizzle";
import { teamMembers, teams } from "@/lib/db/schema";
import createSupabaseServerClient from "@/lib/supabase/server";
import { eq } from "drizzle-orm";
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
  SearchIcon,
  SettingsIcon,
  UsersIcon,
} from "lucide-react";
import { GoOrganization } from "react-icons/go";
import { FaFileInvoiceDollar } from "react-icons/fa";
import React from "react";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { redirect } from "next/navigation";
import { convertSegmentPathToStaticExportFilename } from "next/dist/shared/lib/segment-cache/segment-value-encoding";

interface SidebarMenuItem {
  label: string;
  // @ts-ignore
  icon: any;
}
type SidebarMenu = SidebarMenuItem[];

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default async function DashboardLayout({
  children,
}: DashboardLayoutProps) {
  const supabase = await createSupabaseServerClient();
  const { data } = await supabase.auth.getUser();
  if (!data.user || !data.user.id) {
    redirect("/sign-in");
  }

  const db = createDrizzleClient();
  const userTeams = await db
    .select({
      teamId: teams.id,
      teamName: teams.name,
      teamRole: teamMembers.role,
      teamCreatedAt: teams.createdAt,
      teamUpdatedAt: teams.updatedAt,
    })
    .from(teamMembers)
    .where(eq(teamMembers.userId, data.user.id))
    .leftJoin(teams, eq(teamMembers.teamId, teams.id));

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
                    <span>{userTeams[0]?.teamName}</span>
                  </div>
                  <ChevronDownIcon />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start">
                {userTeams.map((team) => (
                  <DropdownMenuItem
                    key={team.teamId}
                    disabled={team.teamId === userTeams[0]?.teamId}
                  >
                    <div className="flex items-center justify-start gap-2">
                      <GoOrganization className="size-4 text-neutral-500 dark:text-neutral-400" />{" "}
                      <span>{team.teamName}</span>
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
