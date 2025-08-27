"use client";

import { Button } from "@/components/ui/button";
import { SidebarProvider } from "@/components/ui/sidebar";
import { authClient } from "@/lib/auth-client";
import { DashboardSidebar } from "@/modules/dashboard/ui/components/dashboad-sidebar";
import { DashboardNavBar } from "@/modules/dashboard/ui/components/dashboard-navbar";
import { useRouter } from "next/navigation";

export const HomeView = () => {
    const router = useRouter();
    const { data : session } = authClient.useSession();

    return (
        <SidebarProvider>
            <DashboardSidebar />
            <main className="flex flex-col h-screen w-screen bg-muted">
                <DashboardNavBar />
                {
                    !session 
                    ? <h1>Loading...</h1> 
                    : <h1>Welcome back, {session.user.name}!</h1>
                }
            </main>
        </SidebarProvider>
    );
}