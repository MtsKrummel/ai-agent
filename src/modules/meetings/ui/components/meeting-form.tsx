import { useTRPC } from "@/trpc/client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { toast } from "sonner";

import { meetingsInsertSchema } from "@/modules/meetings/schemas";
import { MeetingGetOne } from "@/modules/meetings/types";
import { useState } from "react";

import { GeneratedAvatar } from "@/components/generated-avatar";
import { CommandSelect } from "@/components/command-select"
import { NewAgentDialog } from "@/modules/agents/ui/components/new-agent-dialog";

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
    const trpc = useTRPC();
    const queryClient = useQueryClient();

    const [openAgentDialog, setOpenAgentDialog] = useState(false);
    const [agentSearch, setAgentSearch] = useState("");

    const { data } = useQuery(trpc.agents.getMany.queryOptions({
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
            updateMeeting.mutate({ ...values, id: values.agentId });
        } else {
            createMeeting.mutate(values);
        }
    }

    const agentOptions = (data?.items ?? []).map((agent) => ({
        id: agent.id,
        value: agent.id,
        label: agent.name,
        children: (
            <GeneratedAvatar
                seed={agent.name}
                variant="botttsNeutral"
                className="border size-6"
            />
        ),
    }));

    return (
        <>
            <NewAgentDialog open={openAgentDialog} onOpenChange={setOpenAgentDialog}/>
            <Form {...form}>
                <form 
                    className="space-y-8"
                    onSubmit={form.handleSubmit(onSubmit)} 
                >
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Name</FormLabel>
                                <FormControl>
                                    <Input placeholder="e.g. Math Consultations" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="agentId"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Select Agent</FormLabel>
                                <FormControl>
                                    <CommandSelect
                                        options={agentOptions}
                                        onSelect={field.onChange}
                                        onSearch={setAgentSearch}
                                        value={field.value}
                                        placeholder="Select an agent"
                                        isSearchable={true}
                                    />
                                </FormControl>
                                <FormDescription>
                                    Not found what you&apos;re looking for? {" "}

                                    <button
                                        type="button"
                                        className="text-primary hover:underline"
                                        onClick={() => setOpenAgentDialog(true)}
                                    >
                                        Create new agent
                                    </button> 
                                </FormDescription>
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
        </>
    )
}