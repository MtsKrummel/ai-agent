import React, { Suspense } from 'react'
import { AgentsView, AgentsViewLoading } from '@/modules/agents/views/ui/agents-view'
import { getQueryClient, trpc } from '@/trpc/server'
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';

const page = async() => {
  const queryClient = getQueryClient();
  void queryClient.prefetchQuery(trpc.agents.getMany.queryOptions());
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <h1>Welcome to agents!</h1>
      <Suspense 
        fallback={<AgentsViewLoading/>}
      >
        <AgentsView />
      </Suspense>
    </HydrationBoundary>
  )
}

export default page