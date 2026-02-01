import {
  CircleXIcon,
  CircleCheckIcon,
  ClockArrowUpIcon,
  VideoIcon,
  LoaderIcon
} from "lucide-react"

import { CommandSelect } from "@/components/command-select"

import { MeetingStatus } from "../../types"
import { useMeetingsFilters } from "../../hooks/use-meetings-filters"

const options = [
  {
    id: MeetingStatus.Upcoming,
    value: MeetingStatus.Upcoming,
    label: "Upcoming",
    children: <ClockArrowUpIcon className="size-4" />
  },
  {
    id: MeetingStatus.Completed,
    value: MeetingStatus.Completed,
    label: "Completed",
    children: <CircleCheckIcon className="size-4" />
  },
  {
    id: MeetingStatus.Active,
    value: MeetingStatus.Active,
    label: "Active",
    children: <VideoIcon className="size-4" />
  },
  {
    id: MeetingStatus.Processing,
    value: MeetingStatus.Processing,
    label: "Processing",
    children: <LoaderIcon className="size-4" />
  },
  {
    id: MeetingStatus.Cancelled,
    value: MeetingStatus.Cancelled,
    label: "Cancelled",
    children: <CircleXIcon className="size-4" />
  },
]

export const StatusFilter = () => {
  const [filters, setFilters] = useMeetingsFilters()

  return (
    <CommandSelect
      placeholder="Status"
      className="h-9"
      options={options}
      onSelect={(value) => setFilters({ status: value as MeetingStatus })}
      value={filters.status ?? ""}
    />
  )
}
