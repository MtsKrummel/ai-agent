"use client"
import { ErrorState } from "@/components/error-state";
import { LoadingState } from "@/components/loading-state";
import { MeetingIdViewHeader } from "../components/meeting-id-view-header";

import { useTRPC } from "@/trpc/client";

import { useMutation, useQueryClient, useSuspenseQuery } from "@tanstack/react-query";
import { redirect, useRouter } from "next/navigation";
import { useConfirm } from "../../hooks/use-confirm";
import { useState } from "react";
import { UpdateMeetingDialog } from "../components/update-meeting-dialog";
import { UpcomingState } from "../components/upcoming-state";
import { ActiveState } from "../components/active-state";
import { CancelledState } from "../components/cancelled-state";
import { ProcessingState } from "../components/processing-state";

interface Props {
  meetingId: string;
}

export const MeetingIdView = ({ meetingId }: Props) => {
  const trpc = useTRPC()
  const queryClient = useQueryClient()
  const router = useRouter()
  const { data } = useSuspenseQuery(
    trpc.meetings.getOne.queryOptions({
      id: meetingId
    })
  )
  const [updateMeetingDialogOpen, setUpdateMeetingDialogOpen] = useState(false)
  const [RemoveConfirmationDialog, confirmRemove] = useConfirm(
    "Are you sure?",
    `The following action will remove this meeting`,
  )

  const removeMeeting = useMutation(
    trpc.meetings.remove.mutationOptions({
      onSuccess: () => {
        queryClient.invalidateQueries(trpc.meetings.getMany.queryOptions({}))
        // TODO: Invalidate free tier usage
        router.push("/meetings");
      }
    }),
  );

  const handleRemoveMeeting = async () => {
    const ok = await confirmRemove();

    if (!ok) return

    await removeMeeting.mutateAsync({ id: meetingId })
  }

  const upcoming = data.status === "upcoming"
  const active = data.status === "active"
  const completed = data.status === "completed"
  const processing = data.status === "processing"
  const cancelled = data.status === "cancelled"

  return (
    <>
      <RemoveConfirmationDialog />
      <UpdateMeetingDialog
        open={updateMeetingDialogOpen}
        onOpenChange={setUpdateMeetingDialogOpen}
        initialValues={data}
      />
      <div className="flex-1 flex-col px-4 py-4 md:px-8 gap-y-4">
        <MeetingIdViewHeader
          meetingId={meetingId}
          meetingName={data.name}
          onEdit={() => setUpdateMeetingDialogOpen(true)}
          onRemove={handleRemoveMeeting}
        />
        {upcoming && (
          <UpcomingState
            meetingId={meetingId}
            onCancelMeeting={() => redirect("/meetings")}
            isCancelling={false}
          />
        )}
        {active && (
          <ActiveState
            meetingId={meetingId}
          />
        )}
        {cancelled && (
          <CancelledState
            meetingId={meetingId}
          />
        )}
        {processing && (
          <ProcessingState
            meetingId={meetingId}
          />
        )}
        {completed && (
          <div>
            completed
          </div>
        )}
      </div>
    </>
  )
}

export const MeetingIdViewLoading = () => {
  return (
    <LoadingState
      title="Loading Meeting"
      description="This may take a few seconds"
    />
  )
}

export const MeetingIdViewError = () => {
  return (
    <ErrorState
      title="Error Loading Meeting"
      description="Please try again later"
    />
  )
}
