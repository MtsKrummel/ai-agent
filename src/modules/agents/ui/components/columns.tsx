"use client"

import { ColumnDef } from "@tanstack/react-table"
import { AgentGetMany} from "@/modules/agents/types"
import { GeneratedAvatar } from "@/components/generated-avatar"
import { CornerDownRightIcon, VideoIcon } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export const columns: ColumnDef<AgentGetMany[number]>[] = [
  {
    accessorKey: "name",
    header: "Agent Name",
    cell: ({ row }) => {
      const agent = row.original
      return (
        <div className="flex flex-col gap-y-1">
          <div className="flex items-center gap-x-4">
            <GeneratedAvatar 
              seed={agent.name} 
              variant="botttsNeutral" 
            />
            <span className="font-semibold capitalize">{agent.name}</span>
          </div>

          <div className="flex items-center gap-x-2">
            <CornerDownRightIcon className="size-3 text-muted-foreground" />
            <span className="text-sm text-muted-foreground max-w-[200px] truncate capitalize">
              {agent.instructions}
            </span>
          </div>
        </div>
      )
    }
  },
  {
    accessorKey: "meetingCount",
    header: "Meetings",
    cell: ({ row }) => {
      const agent = row.original
      return (
        <Badge
          variant="outline"
          className="flex items-center gap-x-2 [&>svg]:size-4"
        >
          <VideoIcon className="text-blue-700" />
          <span>{agent.meetingCount}</span> 
          <span>{agent.meetingCount === 1 ? "Meeting" : "Meetings"}</span>
        </Badge>
      )
    }
  }
]