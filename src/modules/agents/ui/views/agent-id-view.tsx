"use client";
import { AgentViewHeader } from "@/components/agent-view-header";
import { ErrorState } from "@/components/error-state";
import { LoadingState } from "@/components/loading-state";
import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";

interface Props {
    agentId: string;
}

export const AgentIdView = ({ agentId }: Props) => {
    const trpc = useTRPC();
    const { data } = useSuspenseQuery(trpc.agents.getOne.queryOptions({ id: agentId }));

    return (
        <div className="flex flex-col flex-1 py-4 px-4 md:py-8 gap-y-4">
            <AgentViewHeader
              agentId={data.id}
              agentName={data.name}
              onEdit={() => {}}
              onRemove={() => {}}
            />
            
        </div>
    );
}

export const AgentIdViewLoading = () => {
  return (
    <LoadingState 
      title="Loading Agent" 
      description="This may take a few seconds"
    />
  )
}

export const AgentIdViewError = () => {
  return (
    <ErrorState 
      title="Error Loading Agent" 
      description="There was an error loading the agent details. Please try again later."
    />
  )
}