"use client";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

import { BotIcon, StarIcon, VideoIcon } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { DashboardUserButton } from "./dashboard-user-button";

const firstSection = [
  {
    icon: VideoIcon,
    label: "Meetings",
    href: "/meetings",
  },
  {
    icon: BotIcon,
    label: "Agents",
    href: "/agents",
  },
];

export const DashboardSidebar = () => {
  const pathname = usePathname();

  return (
    <Sidebar
      className="border-r border-zinc-700/30 backdrop-blur-md bg-zinc-900/50 shadow-lg rounded-r-2xl"
    >
      {/* Header */}
      <SidebarHeader className="text-sidebar-accent-foreground py-4">
        <Link href="/" className="flex items-center gap-2 px-2">
          <div className="p-2 rounded-2xl bg-gradient-to-tr from-amber-500 via-orange-400 to-pink-500 shadow-lg border border-amber-600/50 animate-pulse">
            <Image src="/logo.svg" height={32} width={32} alt="Meow.AI" />
          </div>
          <p className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-amber-300 via-orange-300 to-pink-400">
            Meow.AI
          </p>
        </Link>
      </SidebarHeader>

      <div className="px-4 py-2">
        <Separator className="bg-zinc-600" />
      </div>

      {/* Menu */}
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {firstSection.map((item) => (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton
                    asChild
                    className={cn(
                      "h-12 rounded-xl transition-all duration-200 group",
                      pathname === item.href
                        ? "bg-gradient-to-r from-amber-400 to-orange-400 text-white shadow-lg hover:shadow-xl"
                        : "border border-transparent hover:bg-zinc-800/40 hover:border-zinc-700/30 text-zinc-400 hover:text-amber-300"
                    )}
                    isActive={pathname === item.href}
                  >
                    <Link
                      href={item.href}
                      className="flex items-center gap-3 px-3 py-2"
                    >
                      <item.icon className="w-5 h-5 group-hover:text-amber-400 transition-colors" />
                      <span className="text-sm font-semibold">{item.label}</span>
                      {/* Optional: little cat paw emoji */}
                      <span className="ml-auto text-amber-400 animate-bounce">🐾</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <div className="px-4 py-2">
          <Separator className="bg-zinc-600" />
        </div>
      </SidebarContent>

      {/* Footer */}
      <SidebarFooter>
        <DashboardUserButton />
      </SidebarFooter>
    </Sidebar>
  );
};
