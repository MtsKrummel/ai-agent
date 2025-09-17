import { authClient } from '@/lib/auth-client'

import React from 'react'

import { useIsMobile } from '@/hooks/use-mobile'

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
    DropdownMenuLabel,
    DropdownMenuSeparator

} from '@/components/ui/dropdown-menu'

import{
    Drawer,
    DrawerHeader,
    DrawerTitle,
    DrawerContent,
    DrawerTrigger,
    DrawerDescription,
    DrawerFooter,
} from '@/components/ui/drawer'

import { Avatar, AvatarImage } from '@/components/ui/avatar'
import { GeneratedAvatar } from '@/components/generated-avatar'

import { ChevronDown, ChevronDownIcon, CreditCardIcon, LogInIcon, SettingsIcon } from 'lucide-react'

import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'

export const DashboardUserSection = () => {
    const router = useRouter();
    const {data, isPending} = authClient.useSession()
    const isMobile = useIsMobile();

    if(isPending || !data) return null;

    const onLogout = async () => {
        await authClient.signOut({
            fetchOptions: {
                onSuccess: () => {
                    router.push('/signin')
                }
            }
        })
    }
    
    if(isMobile) {
        return (
            <Drawer>
                <DrawerTrigger className='rounded-lg p-3 w-full flex items-center justify-between bg-black/10 hover:bg-linear-to-r/oklch border border-transparent hover:border-[#5D5FE6]/50 overflow-hidden cursor-pointer gap-x-2'>
                    {
                        data.user?.image ? (
                            <Avatar>
                                <AvatarImage src={data.user.image} alt={data.user.name} />
                            </Avatar>
                        ) : (
                            <GeneratedAvatar
                                seed={data.user?.name}
                                variant="initials"
                                className="size-9 mr-3"
                            />
                        )
                    }
                    <div className="flex flex-col gap-0.5 text-left overflow-hidden flex-1 min-w-0">
                        <p className="text-sm truncate w-full">
                            {data.user?.name}
                        </p>
                        <p className="text-sm truncate w-full">
                            {data.user?.email}
                        </p>
                    </div>
                    <ChevronDownIcon className="size-4"/>
                </DrawerTrigger>

                <DrawerContent>
                    <DrawerHeader>
                        <DrawerTitle>
                            {data.user?.name}
                        </DrawerTitle>
                        <DrawerDescription>
                            {data.user?.email}
                        </DrawerDescription>
                    </DrawerHeader>
                    <DrawerFooter className=''>
                        <Button
                            className='bg-black/10 hover:bg-linear-to-r/oklch border border-transparent hover:border-[#5D5FE6]/50'
                            variant="outline"
                            onClick={() => router.push('/billing')}
                        >
                            <CreditCardIcon className='size-4 text-black' />
                            Billing
                        </Button>
                        <Button
                            className='bg-black/10 hover:bg-linear-to-r/oklch border border-transparent hover:border-[#5D5FE6]/50'
                            variant="outline"
                            onClick={() => router.push('/settings')}
                        >
                            <SettingsIcon className='size-4 text-black' />
                            Settings
                        </Button>
                        <Button
                            className='bg-black/10 hover:bg-linear-to-r/oklch border border-transparent hover:border-[#5D5FE6]/50'
                            variant="outline"
                            onClick={onLogout}
                        >
                            <CreditCardIcon className='size-4 text-black' />
                            Logout
                        </Button>
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>
        )
    }

    return(
        <DropdownMenu>
            <DropdownMenuTrigger 
                className='rounded-lg p-3 w-full flex items-center justify-between bg-black/10 hover:bg-linear-to-r/oklch border border-transparent hover:border-[#5D5FE6]/50 overflow-hidden cursor-pointer gap-x-2'
            >
                {
                    data.user?.image ? (
                        <Avatar>
                           <AvatarImage src={data.user.image} alt={data.user.name} />
                        </Avatar>
                    ) : (
                        <GeneratedAvatar 
                            seed={data.user?.name}
                            variant="initials"
                            className="size-9 mr-3" 
                        />
                    )
                }
                <div className="flex flex-col gap-0.5 text-left overflow-hidden flex-1 min-w-0">
                    <p className="text-sm truncate w-full">
                        {data.user?.name}
                    </p>
                    <p className="text-sm truncate w-full">
                        {data.user?.email}
                    </p>
                </div>
                <ChevronDownIcon className="size-4"/>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" side="right" className="w-60">
                <DropdownMenuLabel>
                    <div className="font-medium truncate">
                        <span>{data.user?.name}</span>
                    </div>
                    <div className="font-normal text-sm text-muted-foreground truncate">
                        <span>{data.user?.email}</span>
                    </div>
                </DropdownMenuLabel>

                <DropdownMenuSeparator />

                <DropdownMenuItem 
                    className="cursor-pointer flex items-center"
                >
                    <CreditCardIcon className="size-4"/>
                    Billing
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer flex items-center">
                    <SettingsIcon className="size-4"/>
                    Settings
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                    onClick={onLogout}
                >
                   <LogInIcon className="size-4"/>
                    Logout
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}