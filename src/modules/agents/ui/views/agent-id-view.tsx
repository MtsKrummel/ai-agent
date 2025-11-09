import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";

interface Props{
  agentId: string;
};

export const AgentIdView = ({ agentId }: Props) => {
  const trpc = useTRPC();

  const { data } = useSuspenseQuery(trpc.agents.getOne.queryOptions({ agentId: agentId }))

  return (
    <div>
      {data}
    </div>
  )
};