import { ReactNode, useState } from "react"
import { ChevronsUpDownIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "./ui/button"

import {
    CommandEmpty,
    CommandInput,
    CommandItem,
    CommandList,
    CommandResponsiveDialog,
} from "@/components/ui/command"

interface SelectOption {
    id: string;
    value: string;
    label: string;
    children?: ReactNode;
}

interface CommandSelectProps {
    options: SelectOption[];
    onSelect: (value: string) => void;
    onSearch?: (value: string) => void;
    value: string;
    placeholder?: string;
    isSearchable?: boolean;
    className?: string;
}

export const CommandSelect = ({
    options,
    onSelect,
    onSearch,
    value,
    placeholder,
    isSearchable = true,
    className,
}: CommandSelectProps) => {
    const [open, setOpen] = useState(false)
    const selectedOption = options.find((option) => option.value === value)

    return (
        <>
            <Button
                onClick={() => setOpen(true)}
                type="button"
                variant="outline"
                className={cn(
                    "h-9 justify-between font-normal px-2",
                    !selectedOption && "text-muted-foreground",
                    className
                )}
            >
                <div className="flex items-center gap-2 flex-1">
                    {selectedOption ? (
                        <>
                            {selectedOption.children}
                            <span className="text-sm">
                                {selectedOption.label}
                            </span>
                        </>
                    ) : (
                        <span>{placeholder}</span>
                    )}
                </div>

                <ChevronsUpDownIcon className="h-4 w-4 opacity-50 flex-shrink-0" />
            </Button>

            <CommandResponsiveDialog
                shouldFilter={!onSearch}
                open={open}
                onOpenChange={setOpen}
            >
                {isSearchable && (
                    <CommandInput
                        placeholder="Search..."
                        onValueChange={onSearch}
                    />
                )}
                <CommandList>
                    <CommandEmpty>
                        <span className="text-muted-foreground text-sm">
                            No options found
                        </span>
                    </CommandEmpty>
                    {options.map((option) => (
                        <CommandItem
                            key={option.id}
                            value={option.value}
                            onSelect={() => {
                                onSelect(option.value)
                                setOpen(false)
                            }}
                        >
                            <div className="flex items-center gap-2">
                                {option.children}
                                <span>{option.label}</span>
                            </div>
                        </CommandItem>
                    ))}
                </CommandList>
            </CommandResponsiveDialog>
        </>
    )
}