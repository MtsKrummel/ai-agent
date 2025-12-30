"use client"

import { DataTable } from "@/components/data-table"
import { ErrorState } from "@/components/error-state"
import { LoadingState } from "@/components/loading-state"
import { useTRPC } from "@/trpc/client"
import { useSuspenseQuery } from "@tanstack/react-query"
import { columns } from "../components/columns"
import { useRouter } from "next/navigation"
import { DataPagination } from "../components/data-pagination"
import { useMeetingsFilters } from "../../hooks/use-meetings-filters"
import { EmptyState } from "@/components/empty-state"

export const MeetingsView = () => {
  const [filters, setFilters] = useMeetingsFilters();
  const trpc = useTRPC()
  const { data } = useSuspenseQuery(trpc.meetings.getMany.queryOptions({}))
  

  const router = useRouter()

  return (
    <div className="flex-1 pb-4 px-4 md:px-8 flex flex-col gap-y-4">
      <DataTable 
        data={data.items} 
        columns={columns} 
        onRowClick={(row) => router.push(`/agents/${row.id}`)}  
      />
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
    </div>
  )
}

export const MeetingsViewLoading = () => {
  return (
    <LoadingState 
      title="Loading Meetings" 
      description="This may take a few seconds"
    />
  )
}
export const MeetingsViewError = () => {
  return (
    <ErrorState
      title="Loading Meetings" 
      description="This may take a few seconds"
    />
  )
}