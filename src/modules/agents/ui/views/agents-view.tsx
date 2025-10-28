"use client";

import { DataTable } from "@/components/data-table";
import { LoadingState } from "@/components/loading-state";
import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";
import { columns } from "../components/columns";
import { EmptyState } from "@/components/empty-state";
import { useAgentsFilters } from "../../hooks/use-agents-filters";

export const AgentsView = () => {
  const [filters] = useAgentsFilters()
  const trpc = useTRPC()
  const { data } = useSuspenseQuery(trpc.agents.getMany.queryOptions({
    ...filters,
  }));
  
  return (
    <div className="flex-1 pb-4 px-4 md:px-8 flex flex-col gap-y-4">
      <DataTable data={data.items} columns={columns} />
      {data.items.length === 0 && (
        <EmptyState
          title="Create your first agent"
          description="Create an agent to join your meetings and assist you. Each agent can be customized with specific instructions to suit your needs."
        />
      )}
    </div>
);
}

export const AgentsViewLoading = () => {
  return (
    <LoadingState 
      title="Loading Agents" 
      description="This may take a few seconds"
    />
  )
}
