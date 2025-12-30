import { useState } from "react";
import { useMutation, useQuery, useQueryClient, useSuspenseQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";

import { useTRPC } from "@/trpc/client";

import { meetingsInsertSchema } from "@/modules/meetings/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { toast } from "sonner";
import { CommandSelect } from "@/components/command-select";
import { GeneratedAvatar } from "@/components/generated-avatar";

import { MeetingGetOne } from "@/modules/meetings/types";

interface MeetingFormProps {
    onSuccess?: (id?: string) => void;
    onCancel?: () => void;
    initialValues?: MeetingGetOne;
};

export const MeetingForm = ({
    onSuccess,
    onCancel,
    initialValues,
}: MeetingFormProps) => {
    const [open, setOpen] = useState(false)
    const [agentSearch, setAgentSearch] = useState("")

    const trpc = useTRPC();
    const queryClient = useQueryClient();

    const { data } = useSuspenseQuery(trpc.agents.getMany.queryOptions({
        pageSize: 100,
        search: agentSearch,
    }));

    const createMeeting = useMutation(
        trpc.meetings.create.mutationOptions({
            onSuccess: async (data) => {
                await queryClient.invalidateQueries(
                    trpc.meetings.getMany.queryOptions({}),
                );

                // TODO: Invalidate free tier usage
                onSuccess?.(data.id);
            },
            onError: (error) => {
                toast.error(error.message);
                // TODO: Check if error code is "FORBIDDEN", redirect to "/upgrade"
            },
        })
    );

    const updateMeeting = useMutation(
        trpc.meetings.update.mutationOptions({
            onSuccess: async () => {
                await queryClient.invalidateQueries(
                    trpc.meetings.getMany.queryOptions({}),
                );
                if (initialValues?.id) {
                    await queryClient.invalidateQueries(
                        trpc.meetings.getOne.queryOptions({ id: initialValues.id }),
                    )
                }
                onSuccess?.();
            },
            onError: (error) => {
                toast.error(error.message);
                
                // TODO: Check if error code is "FORBIDDEN", redirect to "/upgrade"
            },
        })
    );

    const form = useForm<z.infer<typeof meetingsInsertSchema>>({
        resolver: zodResolver(meetingsInsertSchema),
        defaultValues: {
            name: initialValues?.name || "",
            agentId: initialValues?.agentId || "",
        }
    })

    const isEdit = !!initialValues?.id;    
    const isPending = createMeeting.isPending || updateMeeting.isPending;

    const onSubmit = (values: z.infer<typeof meetingsInsertSchema>) => {
        if (isEdit) {
            updateMeeting.mutate({ ...values, id: initialValues.id });
        } else {
            createMeeting.mutate(values);
        }
    }

    const agentOptions = (data?.items ?? [])
    .map((agent) => ({
        id: agent.id,
        value: agent.id,
        children: (
            <div className="flex items-center gap-x-2">
                <GeneratedAvatar 
                    seed={agent.name}
                    variant="botttsNeutral"
                    className="border size-6"
                />
                <span>{agent.name}</span>
            </div>
        )
    }));

    return (
        <Form {...form}>
            <form 
                className="space-y-8"
                onSubmit={form.handleSubmit(onSubmit)} 
            >
                <FormField
                    name="name"
                    control={form.control}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                                <Input {...field} placeholder="e.g Math Consultations" disabled={isPending} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    name="agentId"
                    control={form.control}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Agent</FormLabel>
                            <FormControl>
                                <CommandSelect 
                                    options={agentOptions}
                                    onSelect={field.onChange}
                                    onSearch={setAgentSearch}
                                    value={field.value}
                                    placeholder="Select an agent"
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <div className="flex flex-col gap-2 sm:flex-row sm:justify-end">
                    <div className="flex justify-end gap-2">
                    {onCancel && (
                        <Button 
                            variant="ghost"
                            disabled={isPending}
                            type="button"
                            onClick={() => {onCancel()}}
                        >
                            Cancel
                        </Button>
                    )}
                    </div>
                    
                    <div className="flex justify-end">
                        <Button 
                            type="submit" 
                            disabled={isPending}
                        >
                            {isEdit ? "Save Changes" : "Create"}
                        </Button>
                    </div>
                </div>
            </form>
        </Form>
    )
}