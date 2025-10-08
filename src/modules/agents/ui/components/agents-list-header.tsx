"use client"

import { Button } from "@/components/ui/button"

export const AgentsListHeader = () => {
    return (
        <div className="py-4 px-4 md:px-8 flex flex-col gap-y-4">
            <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">My Agents</h3>
                <Button variant="outline">New Agent</Button>
            </div>
        </div>
    )
}