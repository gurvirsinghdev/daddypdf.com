import { SidebarMenuButton } from "@/components/ui/sidebar";
import { LogOutIcon } from "lucide-react";
import Link from "next/link";

export default function LogoutButton() {
  return (
    <Link href="/api/auth/logout">
      <SidebarMenuButton className="cursor-pointer hover:bg-red-800 text-white">
        <LogOutIcon className="size-4 text-white" />
        <span>Logout</span>
      </SidebarMenuButton>
    </Link>
  );
}
