"use client";

import { LoadingState } from "@/components/loading-state";
import { SidebarProvider } from "@/components/ui/sidebar";
import { authClient } from "@/lib/auth-client";
import { DashboardSidebar } from "@/modules/dashboard/ui/components/dashboad-sidebar";
import { DashboardNavBar } from "@/modules/dashboard/ui/components/dashboard-navbar";

export const HomeView = () => {
    const { data : session } = authClient.useSession();

    return (
        <SidebarProvider>
            <DashboardSidebar />
            <main className="flex flex-col h-screen w-screen bg-muted">
                <DashboardNavBar />
                {
                    !session 
                    ? <LoadingState 
                        title="Loading Home..." 
                        description="This may take a few seconds"
                    />
                    : <h1>Welcome back, {session.user.name}!</h1>
                }
            </main>
        </SidebarProvider>
    );
}