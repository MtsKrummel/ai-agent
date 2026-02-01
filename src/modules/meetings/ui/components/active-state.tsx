import { EmptyState } from "@/components/empty-state"
import { Button } from "@/components/ui/button"
import { BanIcon, VideoIcon } from "lucide-react"
import Link from "next/link"

interface Props {
  meetingId: string;
}

export const ActiveState = ({
  meetingId,
}: Props) => {
  return (
    <div className="flex flex-col items-center justify-center bg-white px-4 py-5 gap-y-8 mt-4">
      <EmptyState
        title="Meeting in progress"
        description="Meeting will end once all participants have left"
        image="/upcoming.svg"
      />
      <div className="flex flex-col-reverse items-center gap-2 w-full lg:flex-row lg:justify-center">
        <Button
          asChild
          className="w-full lg:w-auto"
        >
          <Link href={`/call/${meetingId}`}>
            <VideoIcon />
            Join meeting
          </Link>
        </Button>
      </div>
    </div>
  )
}