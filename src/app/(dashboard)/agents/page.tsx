import React, { Suspense } from 'react'
import { AgentsView, AgentsViewLoading } from '@/modules/agents/ui/views/agents-view'
import { getQueryClient, trpc } from '@/trpc/server'
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { AgentsListHeader } from '@/modules/agents/ui/components/agents-list-header';

const Page = async() => {
  const queryClient = getQueryClient();
  void queryClient.prefetchQuery(trpc.agents.getMany.queryOptions());
  return (
    <>
      <AgentsListHeader />
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Suspense
          fallback={<AgentsViewLoading />}
        >
          <AgentsView />
        </Suspense>
      </HydrationBoundary>
    </>
  )
}

export default Page;