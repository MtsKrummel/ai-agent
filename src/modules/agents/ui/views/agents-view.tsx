"use client";

import { GeneratedAvatar } from "@/components/generated-avatar";
import { LoadingState } from "@/components/loading-state";
import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";

export const AgentsView = () => {
  const trpc = useTRPC()
  const { data } = useSuspenseQuery(trpc.agents.getMany.queryOptions())

  return (
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
