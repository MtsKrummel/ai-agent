import { useState } from "react";
import { format } from "date-fns"
import { useTRPC } from "@/trpc/client";
import { useQuery } from "@tanstack/react-query";
import { Input } from "@/components/ui/input";
import { SearchIcon } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { generateAvatarUri } from "@/lib/generate-avatar";
import Highlighter from "react-highlight-words";


interface Props {
  meetingId: string;
}

export const Transcript = ({ meetingId }: Props) => {
  const trpc = useTRPC();
  const { data } = useQuery(
    trpc.meetings.getTranscript.queryOptions({
      id: meetingId
    })
  )
  const [searchQuery, setSearchQuery] = useState("");

  const filteredData = (data ?? []).filter((item) =>
    item.text.toString().toLowerCase().includes(searchQuery.toLowerCase()))

  return (
    <div className="flex flex-col bg-white rounded-lg border px-4 py-5 gap-y-4 w-full">
      <p className="text-lg font-medium">Transcript</p>
      <div className="relative">
        <Input
          placeholder="Search Transcript"
          className="pl-7 h-9 w-[240px]"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <SearchIcon className="absolute left-2 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
      </div>

      <ScrollArea>
        <div>
          {filteredData.map((item) => {
            return (
              <div
                key={item.start_ts}
                className="flex flex-col gap-y-2 hover:bg-muted p-4 rounded-md border-b"
              >
                <div className="flex gap-x-2 items-center">
                  <Avatar>
                    <AvatarImage
                      src={item.user.image ??
                        generateAvatarUri({
                          seed: item.user.name ?? "",
                          variant: "initials"
                        })
                      }
                    />
                  </Avatar>
                  <p className="text-sm font-medium">{item.user.name}</p>
                  <p className="text-sm text-blue-700 font-medium">
                    {format(item.start_ts, "mm:ss")}
                  </p>
                </div>
                <Highlighter
                  className="text-sm text-neutral-700"
                  highlightClassName="bg-yellow-200"
                  searchWords={[searchQuery]}
                  textToHighlight={item.text}
                  autoEscape={true}
                />
              </div>
            )
          })}
        </div>
      </ScrollArea>
    </div>
  )
}