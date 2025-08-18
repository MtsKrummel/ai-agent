"use client"
import { SidebarProvider } from "@/components/ui/sidebar";
import { authClient } from "@/lib/auth-client";
import { DashboardSidebar } from "@/modules/dashboard/ui/components/dashboad-sidebar";
import { DashboardNavBar } from "@/modules/dashboard/ui/components/dashboard-navbar";

interface Props {
    children: React.ReactNode
}

const Layout = ({ children }: Props) => {
    const { data: session } = authClient.useSession();
    if(!session) return (
        <div>
            <h1>Unauthorized</h1>
        </div>
    );
    return (
        <SidebarProvider>
            <DashboardSidebar />
            <main className="flex flex-col h-screen w-screen bg-muted">
                <DashboardNavBar />
                {children}
            </main>
        </SidebarProvider>
    )
}

export default Layout;