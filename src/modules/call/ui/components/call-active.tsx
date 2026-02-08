import { CallControls, SpeakerLayout } from "@stream-io/video-react-sdk";
import Image from "next/image";
import Link from "next/link";

interface Props {
  onLeave: () => void;
  meetingName: string;
}

export const CallActive = ({ onLeave, meetingName }: Props) => {
  return (
    <div className="flex flex-col justify-between p-4 h-full text-white">
      <div className="bg-accent-foreground rounded-full p-4 flex items-center gap-4">
        <Link
          href="/"
          className="flex items-center justify-center p-2 bg-white/10 rounded-full w-fit"
        >
          <Image
            src="/logo.svg"
            alt="Logo"
            width={24}
            height={24}
          />
        </Link>

        <h4 className="text-base">
          Meeting:
          <span className="font-semibold">
            {meetingName}
          </span>
        </h4>

      </div>
      <SpeakerLayout />

      <div className="bg-sidebar-foreground rounded-full px-4" >
        <CallControls
          onLeave={onLeave}
        />
      </div>
    </div>
  )
}