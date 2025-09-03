"use client";
import { Sidebar,SidebarContent,SidebarFooter, SidebarGroup,SidebarGroupContent,SidebarHeader,SidebarMenu,SidebarMenuButton,SidebarMenuItem} from "@/components/ui/sidebar";

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
        label:"Meetings",
        href:"/meetings",
    },
    {
        icon: BotIcon,
        label:"Agents",
        href:"/agents",
    }
];

const secondSection = [
    {
        icon: StarIcon,
        label:"Upgrade",
        href:"/upgrade",
    },
];

export const DashboardSidebar = () =>{

    const pathname = usePathname();

    return(
        <Sidebar>
            <SidebarHeader className="text-sidebar-accent-foreground">
                <Link href="/" className="flex items-center gap-2 px-2 pt-2"> <Image src="/logo.svg" height={48} width={48} alt="Meow.AI" />
                <p className="text-2xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-[oklch(0.65_0.18_70)] via-[oklch(0.75_0.20_85)] to-[oklch(0.60_0.22_60)]">
  Meow.AI
</p>
                </Link>
            </SidebarHeader>
            <div className="px-4 py-2">
                <Separator className="opacity-50 text-[oklch(0.55_0.15_70)]"/>
            </div>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {firstSection.map((item) => (
                                <SidebarMenuItem key={item.href}>
                                    <SidebarMenuButton 
                                    asChild
                                    className={cn(
                                        "h-11 bg-linear-to-r/oklch border border-transparent hover:border-[#5D6D68]/10 from-sidebar-accent from-5% via-30% via-sidebar/50 to sidebar/50",
                                        pathname===item.href && "bg-linear-to-r/oklch border-[#5D6B68]/10 "
                                    )}
                                    isActive={pathname===item.href}
                                    >
                                        <Link href={item.href}>
                                            <item.icon className=""/>
                                            <span className="text-sm font-medium tracking-tight">{item.label}</span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
                <div className="px-4 py-2">
                <Separator className="opacity-50 text-[oklch(0.55_0.15_70)]"/>
                </div>
                <SidebarGroup>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {secondSection.map((item) => (
                                <SidebarMenuItem key={item.href}>
                                    <SidebarMenuButton 
                                    asChild
                                    className={cn(
                                        "h-11 bg-linear-to-r/oklch border border-transparent hover:border-[#5D6D68]/10 from-sidebar-accent from-5% via-30% via-sidebar/50 to sidebar/50",
                                        pathname===item.href && "bg-linear-to-r/oklch border-[#5D6B68]/10 "
                                    )}
                                    isActive={pathname===item.href}
                                    >
                                        <Link href={item.href}>
                                            <item.icon className=""/>
                                            <span className="text-sm font-medium tracking-tight">{item.label}</span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter className="text-white">
                <DashboardUserButton/>
            </SidebarFooter>
        </Sidebar>
    )
};