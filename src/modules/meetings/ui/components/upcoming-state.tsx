import { EmptyState } from "@/components/empty-state"
import { Button } from "@/components/ui/button"
import { BanIcon, VideoIcon } from "lucide-react"
import Link from "next/link"

interface Props {
  meetingId: string;
  onCancelMeeting: () => void;
  isCancelling: boolean
}

export const UpcomingState = ({
  meetingId,
  onCancelMeeting,
  isCancelling
}: Props) => {
  return (
    <div className="flex flex-col items-center justify-center bg-white px-4 py-5 gap-y-8 mt-4 sha">
      <EmptyState
        title="Not meeting yet"
        description="Once you start this meeting, a summary will appear here"
        image="/upcoming.svg"
      />
      <div className="flex flex-col-reverse items-center gap-2 w-full lg:flex-row lg:justify-center">
        <Button
          className="w-full lg:w-auto"
          variant={"outline"}
          onClick={onCancelMeeting}
          disabled={isCancelling}
        >
          <BanIcon />
          <Link href="/meetings">
            Cancel meeting
          </Link>
        </Button>
        <Button
          asChild
          className="w-full lg:w-auto"
          disabled={isCancelling}
        >
          <Link href={`/call/${meetingId}`}>
            <VideoIcon />
            Start meeting
          </Link>
        </Button>
      </div>
    </div>
  )
}