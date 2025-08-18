import { SidebarProvider } from "@/components/ui/sidebar";
import { DashboardSidebar } from "@/modules/dashboard/ui/components/dashboad-sidebar";
import { DashboardNavBar } from "@/modules/dashboard/ui/components/dashboard-navbar";

interface Props {
    children: React.ReactNode
}

const Layout = ({ children }: Props) => {
    return (
        <SidebarProvider>
            <DashboardSidebar />
            <main className="flex flex-col h-screen w-screen bg-muted">
                {children}
            </main>
        </SidebarProvider>
    )
}

export default Layout;