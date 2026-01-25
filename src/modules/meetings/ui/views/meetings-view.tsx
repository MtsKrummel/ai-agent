"use client"

import { DataTable } from "@/components/data-table"
import { ErrorState } from "@/components/error-state"
import { LoadingState } from "@/components/loading-state"
import { useTRPC } from "@/trpc/client"
import { useSuspenseQuery } from "@tanstack/react-query"
import { columns } from "../components/columns"
import { useRouter } from "next/navigation"
import { EmptyState } from "@/components/empty-state"
import { useMeetingsFilters } from "../../hooks/use-meetings-filters"

export const MeetingsView = () => {
  const [filters, setFilters] = useMeetingsFilters();
  const trpc = useTRPC()
  const { data } = useSuspenseQuery(trpc.meetings.getMany.queryOptions({
    ...filters,
  }))
  const router = useRouter()
  return (
    <div className="flex-1 pb-4 px-4 md:px-8 flex flex-col gap-y-4">
      {data.items.length === 0 ? (
        <EmptyState
          title="No meetings yet"
          description="You haven't created any meetings. Start by scheduling your first meeting to enable AI assistance and meeting automation."
        />
      ) : (
        <DataTable
          data={data.items}
          columns={columns}
          onRowClick={(row) => router.push(`/meetings/${row.id}`)}
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