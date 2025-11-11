import Link from "next/link";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator } from "./ui/breadcrumb";
import { ChevronRightIcon } from "lucide-react";

interface Props {
    agentId: string;
    agentName: string;
    onEdit: () => void;
    onRemove: () => void;
}

export const AgentViewHeader = ({ agentId, agentName, onEdit, onRemove }: Props) => {
    return (
        <div className="flex items-center justify-between">
            <Breadcrumb>
                <BreadcrumbItem>
                    <BreadcrumbLink 
                        asChild 
                        className="font-medium text-xl text-neutral-400"
                    >
                        <Link href="/agents">
                            My Agents
                        </Link>
                    </BreadcrumbLink>
                </BreadcrumbItem>

                <BreadcrumbSeparator className="text-foreground text-xl font-medium [&>svg]:size-4">
                    <ChevronRightIcon />
                </BreadcrumbSeparator>

                <BreadcrumbItem>
                    <BreadcrumbLink 
                        asChild 
                        className="font-medium text-xl text-foreground"
                    >
                        <Link href={`/agents/${agentId}`}>
                            {agentName}
                        </Link>
                    </BreadcrumbLink>
                </BreadcrumbItem>
            </Breadcrumb>
        </div>
    );
}