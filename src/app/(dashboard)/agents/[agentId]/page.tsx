import { Suspense } from "react";
import { getQueryClient, trpc } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { ErrorBoundary } from "react-error-boundary";
import { AgentIdView } from "@/modules/agents/ui/views/agent-id-view";

interface Props {
  params: Promise<{ agentId: string }>
}

const page = async({ params } : Props) => {
  const { agentId } = await params;

  const queryClient = getQueryClient();

  void queryClient.prefetchQuery(trpc.agents.getOne.queryOptions({ agentId: agentId}))

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Suspense fallback={<p>Loading agents</p>}>
        <ErrorBoundary fallback={<p>Error loading agents</p>}>
          <AgentIdView agentId={agentId}/>
        </ErrorBoundary>
      </Suspense>
    </HydrationBoundary>
  )
}

export default page