"use client";

import { DataTable } from "@/components/data-table";
import { LoadingState } from "@/components/loading-state";
import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";
import { columns } from "../components/columns";
import { EmptyState } from "@/components/empty-state";
import { useAgentsFilters } from "../../hooks/use-agents-filters";
import { DataPagination } from "../components/data-pagination";

export const AgentsView = () => {
  const [filters, setFilters] = useAgentsFilters()
  const trpc = useTRPC()
  const { data } = useSuspenseQuery(trpc.agents.getMany.queryOptions({
    ...filters,
  }));
  
  return (
<<<<<<< HEAD
    <div>
      {
        data?.length ? (
          <ul className="space-y-4">
            
            {data.map(agent => (
              <li 
                className="bg-accent-foreground mx-8 text-white p-6 rounded-lg shadow-md" 
                key={agent.id}
              >
                <GeneratedAvatar 
                    seed={agent.name}  variant="botttsNeutral" 
                    className="border size-16"
                />
                <h2 className="text-xl font-bold">{agent.name}</h2>
                <p className="text-sm text-muted-foreground">{agent.instructions}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>No agents found.</p>
        )
      }
=======
    <div className="flex-1 pb-4 px-4 md:px-8 flex flex-col gap-y-4">
      <DataTable data={data.items} columns={columns} />
      <DataPagination
        page={filters.page}
        totalPages={data.totalPages}
        onPageChange={(page) => setFilters({ page })}
      />
      {data.items.length === 0 && (
        <EmptyState
          title="Create your first agent"
          description="Create an agent to join your meetings and assist you. Each agent can be customized with specific instructions to suit your needs."
        />
      )}
>>>>>>> 236d7ee031757fea219477643d2640a13a2aab55
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
