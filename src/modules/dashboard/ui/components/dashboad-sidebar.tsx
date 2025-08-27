"use client"

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";
import { BotIcon, StarIcon, VideoIcon } from "lucide-react";

import {
    Sidebar,
    SidebarHeader,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarMenu,
    SidebarMenuItem,
    SidebarMenuButton,
} from "@/components/ui/sidebar";
import { DashboardUserSection } from "./dashboard-user-section";
import { Separator } from "@/components/ui/separator";


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
]

const secondSection = [
    {
        icon: StarIcon,
        label: "Upgrade",
        href: "/upgrade",
    },
]

export const DashboardSidebar = () => {
    const pathname = usePathname();

    return (
        <Sidebar>
            <SidebarHeader className="text-sidebar-accent-foreground">
                <Link href="/" className="flex items-center gap-2 px-2 pt-2">
                    <h2 className="text-lg font-medium">
                        <Image src="/logo.svg" height={36} width={36} alt="ai-agent-img"/>
                        <p className="text-2xl font-semibold">AI Agent</p>
                    </h2>
                </Link>
            </SidebarHeader>
            <div className="px-4 py-2">
                <Separator className="bg-sidebar-border"/>
            </div>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {firstSection.map((item, index) => (
                                <SidebarMenuItem key={index}>
                                    <SidebarMenuButton
                                    asChild 
                                    className={cn(
                                        "h-10 hover:bg-linear-to-r/oklch border border-transparent hover:border-[#5D5FE6]/50 rounded-lg from-sidebar-accent from-5% via-30% via-sidebar/50 to-sidebar/50 text-sidebar-foreground transition-colors duration-200 flex items-center",
                                        pathname === item.href && "bg-linear-to-r-oklch border-[#5D5FE6]/50 bg-sidebar-accent text-sidebar-foreground font-semibold"
                                    )}
                                    isActive={pathname === item.href}
                                >
                                        <Link href={item.href}>
                                            <item.icon className="size-5" />
                                            <span>
                                                {item.label}
                                            </span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
                <div className="px-4">
                    <Separator className="bg-sidebar-border"/>
                </div>
                <SidebarGroup>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {secondSection.map((item, index) => (
                                <SidebarMenuItem key={index}>
                                    <SidebarMenuButton
                                    asChild 
                                    className={cn(
                                        "h-10 hover:bg-linear-to-r/oklch border border-transparent hover:border-chart-5 rounded-lg from-sidebar-accent from-5% via-30% via-sidebar/50 to-sidebar/50 text-sidebar-foreground transition-colors duration-200 flex items-center",
                                        pathname === item.href && "bg-linear-to-r-oklch border-chart-4 font-semibold"
                                    )}
                                    isActive={pathname === item.href}
                                >
                                    <Link href={item.href}>
                                        <item.icon className="size-5" />
                                        <span>
                                            {item.label}
                                        </span>
                                    </Link>
                                </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>

            <SidebarFooter className="text-sidebar-accent-foreground">
                <DashboardUserSection />
            </SidebarFooter>
        </Sidebar>
    )
}