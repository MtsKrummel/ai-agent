"use client"
import { LoadingState } from "@/components/loading-state";
import { SidebarProvider } from "@/components/ui/sidebar";
import { authClient } from "@/lib/auth-client";
import { DashboardSidebar } from "@/modules/dashboard/ui/components/dashboad-sidebar";
import { DashboardNavBar } from "@/modules/dashboard/ui/components/dashboard-navbar";
import { Suspense } from "react";
import { Toaster } from "sonner";

interface Props {
    children: React.ReactNode
}

const Layout = ({ children }: Props) => {
    const { data: session } = authClient.useSession();
    if (!session) {
        return <div className="p-4">You must be logged in to view this page.</div>;
    }
    return (
        session && (
            <SidebarProvider>
                <DashboardSidebar />
                <main className="flex flex-col h-screen w-screen bg-muted">
                    <DashboardNavBar />
                    <Suspense 
                        fallback={
                        <LoadingState 
                            title="Loading..."
                            description="This may take a few seconds"
                        />}>
                        <Toaster />
                        {children}
                    </Suspense>
                </main>
            </SidebarProvider>
        )
    )
}

export default Layout;