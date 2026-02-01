import { EmptyState } from "@/components/empty-state"

interface Props {
  meetingId: string;
}

export const ProcessingState = ({
  meetingId,
}: Props) => {
  return (
    <div className="flex flex-col items-center justify-center bg-white px-4 py-5 gap-y-8 mt-4">
      <EmptyState
        title="Meeting completed"
        description="This meeting was completed, a summary will appear soon"
        image="/processing.svg"
      />
    </div>
  )
}