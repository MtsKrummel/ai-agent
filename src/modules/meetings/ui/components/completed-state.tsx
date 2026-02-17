import { MeetingGetOne } from "../../types"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BookOpenIcon, ClockFadingIcon, FileTextIcon, FileVideoIcon, SparklesIcon } from "lucide-react"
import Markdown from "react-markdown"
import Link from "next/link"
import { GeneratedAvatar } from "@/components/generated-avatar"
import { format } from "date-fns"
import { Badge } from "@/components/ui/badge"
import { formatDuration } from "@/lib/utils"

interface Props {
  data: MeetingGetOne
}

export const CompletedState = ({ data }: Props) => {
  return (
    <div className="flex flex-col gap-y-4">
      <Tabs defaultValue="summary">
        <div className="bg-white rounded-lg border px-3">
          <ScrollArea>
            <TabsList className="p-0 bg-background justify-start rounded-none h-13">
              <TabsTrigger
                value="summary"
                className="text-muted-foreground rounded-none bg-background data-[state=active]:shadow-none border-b-2 border-transparent data-[state=active]:border-b-primary data-[state=active]:text-accent-foreground h-full"
              >
                <BookOpenIcon />
                Summary
              </TabsTrigger>

              <TabsTrigger
                value="transcript"
                className="text-muted-foreground rounded-none bg-background data-[state=active]:shadow-none border-b-2 border-transparent data-[state=active]:border-b-primary data-[state=active]:text-accent-foreground h-full"
              >
                <FileTextIcon />
                Transcript
              </TabsTrigger>

              <TabsTrigger
                value="recording"
                className="text-muted-foreground rounded-none bg-background data-[state=active]:shadow-none border-b-2 border-transparent data-[state=active]:border-b-primary data-[state=active]:text-accent-foreground h-full"
              >
                <FileVideoIcon />
                Recording
              </TabsTrigger>

              <TabsTrigger
                value="ask-ai"
                className="text-muted-foreground rounded-none bg-background data-[state=active]:shadow-none border-b-2 border-transparent data-[state=active]:border-b-primary data-[state=active]:text-accent-foreground h-full"
              >
                <SparklesIcon />
                Ask AI
              </TabsTrigger>
            </TabsList>

            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </div>

        <TabsContent value="summary">
          <div className="bg-white rounded-lg border">
            <div className="flex flex-col col-span-5 px-4 py-5 gap-y-5">
              <h2 className="text-2xl font-medium capitalize">{data.name}</h2>
              <div>
                <Link
                  href={`/agents/${data.agentId}`}
                  className="flex items-center gap-x-2"
                >
                  <GeneratedAvatar
                    variant="botttsNeutral"
                    seed={data.agent?.name || ""}
                    className="w-8 h-8"
                  />
                  {data.agent?.name}
                </Link> {" "}
                <p>{data.startedAt ? format(data.startedAt, "PPP") : ""}</p>

              </div>
              <div>
                <SparklesIcon />
                <p>General summary</p>
              </div>

              <Badge
                variant="outline"
                className="flex items-center gap-x-2 [&>svg]:size-4"
              >
                <ClockFadingIcon className="text-blue-700" />
                {data.duration ? formatDuration(data.duration) : "No duration"}
              </Badge>

              <div>
                <Markdown
                  components={{
                    h1: (props) => (
                      <h1 {...props} className="text-2xl font-medium mb-6" />
                    ),
                    h2: (props) => (
                      <h2 {...props} className="text-xl font-medium mb-5" />
                    ),
                    h3: (props) => (
                      <h3 {...props} className="text-lg font-medium mb-4" />
                    ),
                    h4: (props) => (
                      <h4 {...props} className="text-base font-medium mb-3" />
                    ),
                    p: (props) => (
                      <p {...props} className="mb-6 leading-relaxed" />
                    ),
                    ul: (props) => (
                      <ul {...props} className="list-disc list-inside mb-6" />
                    ),
                    ol: (props) => (
                      <ol {...props} className="list-decimal list-inside mb-6" />
                    ),
                    li: (props) => (
                      <li {...props} className="mb-1" />
                    ),
                    strong: (props) => (
                      <strong {...props} className="font-semibold" />
                    ),
                    code: (props) => (
                      <code {...props} className="bg-neutral-100 px-2 py-1 rounded-md" />
                    ),
                  }}
                >
                  {data.summary}
                </Markdown>
              </div>
            </div>
          </div>
        </TabsContent>

        {/* TODO: Implement storage plataform to save recordings (AWS S3, Google Cloud Storage, etc.) */}
        <TabsContent value="recording">
          <div className="bg-white rounded-lg">
            <video
              className="w-full h-full rounded-lg "
              src={data.recordingUrl!}
              controls
            />
          </div>
          <p className="text-center text-neutral-500 text-sm mt-2 bg-neutral-100 p-2 rounded-lg">The video will only be available for 2 weeks. Upgrade your plan so you don't lose your meetings.</p>
        </TabsContent>

      </Tabs>
    </div>
  )
}