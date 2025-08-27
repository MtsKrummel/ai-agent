"use client"

import { Button } from "@/components/ui/button"
import { useSidebar } from "@/components/ui/sidebar"
import { PanelLeftCloseIcon, PanelLeftIcon, SearchIcon } from "lucide-react"

export const DashboardNavBar = () => {
    const { state, toggleSidebar, isMobile } = useSidebar();
    return(
        <nav className="flex px-4 gap-x-2 items-center py-3 border-b bg-background border-2">
            <Button className="size-9" variant="secondary" onClick={toggleSidebar}>
                {
                    (state == "collapsed" || isMobile) 
                    ? <PanelLeftIcon className="size-4"/> 
                    : <PanelLeftCloseIcon className="size-4"/>
                }
            </Button>
        </nav>
    )
}