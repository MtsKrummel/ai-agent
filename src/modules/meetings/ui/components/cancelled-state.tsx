import { EmptyState } from "@/components/empty-state"

interface Props {
  meetingId: string;
}

export const CancelledState = ({
  meetingId,
}: Props) => {
  return (
    <div className="flex flex-col items-center justify-center bg-white px-4 py-5 gap-y-8 mt-4">
      <EmptyState
        title="Meeting cancelled"
        description="Meeting was cancelled by the host"
        image="/cancelled.svg"
      />
    </div>
  )
}