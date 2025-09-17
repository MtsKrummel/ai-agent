"use client";

import { SidebarProvider } from "@/components/ui/sidebar";
import { authClient } from "@/lib/auth-client";
import { DashboardSidebar } from "@/modules/dashboard/ui/components/dashboad-sidebar";
import { DashboardNavBar } from "@/modules/dashboard/ui/components/dashboard-navbar";
import { useTRPC } from "@/trpc/client";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export const HomeView = () => {
    const router = useRouter();
    const { data : session } = authClient.useSession();

    const trpc = useTRPC();
    const { data } = useQuery(trpc.hello.queryOptions({ text: "Matias!" }));

    if (!session) {
        router.push('/signin');
        return <div>Redirecting to sign in...</div>;
    }

    return (
        <SidebarProvider>
            <DashboardSidebar />
            <main className="flex flex-col h-screen w-screen bg-muted">
                <DashboardNavBar />
                <h1>{data?.greeting}</h1>
            </main>
        </SidebarProvider>
    );
}