import { CommandDialog, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Dispatch, SetStateAction } from "react";

interface Props {
    open: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>;
}

export const DashboardCommand = ({ open, setOpen }: Props) => {
    return (
        <CommandDialog open={open} onOpenChange={setOpen}>
            <CommandInput 
                placeholder="Find a meeting or agent"
            />
            <CommandList>
                <CommandItem>
                    <span className="text-sm font-medium">👥 Meetings</span>
                </CommandItem>
                <CommandItem>
                    <span className="text-sm font-medium">🤖 Agents</span>
                </CommandItem>
            </CommandList>
        </CommandDialog>
    );
}