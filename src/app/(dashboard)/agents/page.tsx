import React, { Suspense } from 'react'
import { AgentsView, AgentsViewLoading } from '@/modules/agents/ui/views/agents-view'
import { getQueryClient, trpc } from '@/trpc/server'
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { AgentsListHeader } from '@/modules/agents/ui/components/agents-list-header';
import { SearchParams } from 'nuqs';
import { loadSearchParams } from '@/modules/agents/params';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

interface Props {
  searchParams: Promise<SearchParams>;
};

const Page = async({ searchParams }: Props) => {
  const filters = await loadSearchParams(searchParams);

  const session = await auth.api.getSession({
    headers: await headers()
  })

  if(!session){
    redirect("/signin")
  }

  const queryClient = getQueryClient();
  void queryClient.prefetchQuery(trpc.agents.getMany.queryOptions({
    ...filters,
  }));
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