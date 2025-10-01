"use client";

import { useQuery } from "@tanstack/react-query";
import { useTRPC } from "@/trpc/client";

export const AgentsView = () => {
    const trpc = useTRPC();
    const { data, isLoading, isError} = useQuery(trpc.agents.getMany.queryOptions());

    if (isLoading) {
        return <div>Loading agents...</div>;
    }

    if (isError) {
        return <div>Error loading agents.</div>;
    }

    return (
        <div>
            {JSON.stringify(data, null, 2)}
        </div>
    );
};