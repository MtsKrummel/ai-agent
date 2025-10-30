"use client"

import { Button } from "@/components/ui/button"
import { PlusIcon, XCircle, XCircleIcon } from "lucide-react"
import { NewAgentDialog } from "./new-agent-dialog"
import { useState } from "react"
import { AgentsSearchFilter } from "./agents-search-filters"
import { useAgentsFilters } from "../../hooks/use-agents-filters"
import { DEFAULT_PAGE } from "@/constants"

export const AgentsListHeader = () => {
    const [filters, setFilters] = useAgentsFilters()
    const [isDialogOpen, setIsDialogOpen] = useState(false)

    const isAnyFilterModified = !!filters.search

    const onClearFilters = () => {
        setFilters({
            search: "",
            page: DEFAULT_PAGE,
        })
    }

    return (
    <>
        <NewAgentDialog
            open={isDialogOpen}
            onOpenChange={setIsDialogOpen}
        />
        <div className="py-4 px-4 md:px-8 flex flex-col gap-y-4">
            <div className="flex items-center justify-between">
                <h3 className="font-medium text-xl">
                    My Agents
                </h3>
                <Button 
                    variant="default"
                    onClick={() => setIsDialogOpen(true)}
                >
                    <PlusIcon />
                    New Agent
                </Button>
            </div>

            <div className="flex items-center gap-x-2 p-1">
                <AgentsSearchFilter />
                {isAnyFilterModified && (
                    <Button 
                        variant="outline"
                        size="sm"
                        onClick={onClearFilters}>
                       <XCircleIcon />
                       Clear
                    </Button>
                )}
            </div>
        </div>
    </>
    )
}