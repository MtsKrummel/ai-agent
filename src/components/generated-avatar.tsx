import { createAvatar } from '@dicebear/core';
import { botttsNeutral, initials } from "@dicebear/collection"

import { cn } from "@/lib/utils";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

interface GeneratedAvatarProps {
    seed: string | undefined;
    className?: string;
    variant: "botttsNeutral" | "initials"
}

export const GeneratedAvatar = ({
    seed,
    className,
    variant
}: GeneratedAvatarProps) => {
    const avatar = createAvatar(variant === "botttsNeutral" ? botttsNeutral : initials, {
        seed
    });

    return (
        <Avatar className={cn("h-12 w-12", className)}>
            <AvatarImage
                src={avatar.toDataUri()}
                alt="Generated avatar"
            />
            <AvatarFallback>
                {seed?.charAt(0).toUpperCase()}
            </AvatarFallback>
        </Avatar>
    );
}