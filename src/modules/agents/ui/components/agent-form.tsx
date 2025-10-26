import { useTRPC } from "@/trpc/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { AgentGetOne } from "@/modules/agents/types";
import { useForm } from "react-hook-form";
import z from "zod";
import { agentsInsertSchema } from "@/modules/agents/schemas";
import { zodResolver } from "@hookform/resolvers/zod";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { GeneratedAvatar } from "@/components/generated-avatar";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { toast } from "sonner";

interface AgentFormProps {
    onSuccess?: () => void;
    onCancel?: () => void;
    initialValues?: AgentGetOne;
};

export const AgentForm = ({
    onSuccess,
    onCancel,
    initialValues,
}: AgentFormProps) => {
    const trpc = useTRPC();
    const queryClient = useQueryClient();

    const createAgent = useMutation(
        trpc.agents.create.mutationOptions({
            onSuccess: async () => {
                await queryClient.invalidateQueries(
                    trpc.agents.getMany.queryOptions(),
                );
                if (initialValues?.id) {
                    await queryClient.invalidateQueries(
                        trpc.agents.getOne.queryOptions({ id: initialValues.id }),
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

    const form = useForm<z.infer<typeof agentsInsertSchema>>({
        resolver: zodResolver(agentsInsertSchema),
        defaultValues: {
            name: initialValues?.name || "",
            instructions: initialValues?.instructions || "",
        }
    })

    const isEdit = !!initialValues?.id;    
    const isPending = createAgent.isPending;

    const onSubmit = (values: z.infer<typeof agentsInsertSchema>) => {
        if (isEdit) {
            console.log("Edit agent");
        } else {
            createAgent.mutate(values);
        }
    }
    
    return (
        <Form {...form}>
            <form 
                className="space-y-8"
                onSubmit={form.handleSubmit(onSubmit)} 
            >
                <div className="flex flex-col items-center">
                    <GeneratedAvatar 
                        seed={form.watch("name")}  variant="botttsNeutral" 
                        className="border size-16"
                    />
                    <h2 className="text-2xl font-bold mt-4">{isEdit ? "Edit Agent" : "Create New Agent"}</h2>
                    <p className="text-sm text-muted-foreground">An AI agent that can perform tasks for you.</p>
                </div>
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                                <Input placeholder="Agent Name" {...field} disabled={isPending} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="instructions"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Instructions</FormLabel>
                            <FormControl>
                                <Textarea 
                                    placeholder="Agent Instructions"
                                    {...field}
                                    disabled={isPending} />
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
                            {isEdit ? "Save Changes" : "Create Agent"}
                        </Button>
                    </div>
                </div>
            </form>
        </Form>
    )
}