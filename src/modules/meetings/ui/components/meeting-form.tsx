import { useRouter } from "next/navigation";

import { trpc } from "@/trpc/client";
import { useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";

import { Form,FormControl,FormDescription,FormField,FormItem,FormLabel,FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { meetingsInsertSchema } from "../../schemas";
import { MeetingGetOne } from "../../types";
import { CommandSelect } from "@/components/command-select";
import { GeneratedAvatar } from "@/components/generated-avatar";
import { NewAgentDialog } from "@/modules/agents/ui/components/new-agent-dialog";


interface MeetingFormProps {
    onSuccess?: (id?:string) => void;
    onCancel?: () => void;
    initialValues?: MeetingGetOne;
}

export const MeetingForm = ({
    onSuccess,
    onCancel,
    initialValues,
}: MeetingFormProps) => {
    const router = useRouter();
    const queryClient = useQueryClient();

    const [openNewAgentDialog, setOpenNewAgentDialog] = useState(false);
    const [agentSearch, setAgentSearch] = useState("");
    
    const agents = trpc.agents.getMany.useQuery({
      pageSize: 100,
      search: agentSearch,
    });
    
    const form = useForm<z.infer<typeof meetingsInsertSchema>>({
        resolver: zodResolver(meetingsInsertSchema),
        defaultValues: {
            name: initialValues?.name ?? "",
            agentId: initialValues?.agentId ?? "",
        },
    });

    // The key change is here
    // use tRPC mutation hook
    const createMeeting = trpc.meetings.create.useMutation({
        onSuccess: async (data) => {
                await queryClient.invalidateQueries({
                        queryKey: [["meetings", "getMany"]]
                    });

            onSuccess?.(data.id);              
        },

        onError: (error) => {
        toast.error(error.message);
        // check if error code is working or not, if not then redirect to update the session status
        },
    });
    
    const updateMeeting = trpc.meetings.update.useMutation({
        onSuccess: async () => {
                await queryClient.invalidateQueries({
                        queryKey: [["meetings", "getMany"]]
                    });

                if (initialValues?.id){
                    await queryClient.invalidateQueries({
                        queryKey : [["meetings","getOne"],{input : {id : initialValues.id}}] // i need to input the initialvalues.id here
                    })
              }
            onSuccess?.();              
        },

        onError: (error) => {
        toast.error(error.message);
        // check if error code is working or not, if not then redirect to update the session status
        },
    }); 

    const isEdit = !!initialValues?.id;
    const isPending = createMeeting.isPending || updateMeeting.isPending;

    useEffect(() => {
        if (initialValues) {
            form.reset({
                name: initialValues.name,
                agentId: initialValues.agentId,
            });
        }
    }, [initialValues, form]);

    const onSubmit = (values: z.infer<typeof meetingsInsertSchema>) => {
        if (isEdit) {
            updateMeeting.mutate({ ...values, id: initialValues.id})
        } else {
            createMeeting.mutate(values);
        }
    };
    

    // Remember to return JSX for the component to render
    return (
        <>
        <NewAgentDialog open={openNewAgentDialog} onOpenChange={setOpenNewAgentDialog}/>
        <Form {...form}>
            <form className="space-y-4" onSubmit ={form.handleSubmit(onSubmit)}>
                <FormField name = "name" control = {form.control} render = {({field}) => (
                    <FormItem>
                        <FormLabel>
                            Name
                        </FormLabel> 
                        <FormControl>
                            <Input {...field} placeholder="SWE Interview : Baveet Singh"/>
                        </FormControl>
                        <FormMessage/>
                    </FormItem>
                )}>
                </FormField>
                <FormField
                    name="agentId"
                    control={form.control}
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Agent</FormLabel>
                        <FormControl>
                            <CommandSelect
                            options={(agents.data?.items ?? []).map((agent) => ({
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
                                ),
                            }))}
                            onSelect={field.onChange}
                            onSearch={setAgentSearch}
                            value={field.value}
                            placeholder="select an agent"
                            />
                        </FormControl>
                            <FormDescription>
                                Not Found your agent{" "}?{" : "}
                                <button type="button" className="text-primary hover:underline underline"
                                onClick={() => setOpenNewAgentDialog(true)}
                                > Create new Agent</button>
                            </FormDescription>
                        <FormMessage />
                        </FormItem>
                    )}
                    />

                                    <div>
                    <Button disabled = {isPending} type = "submit"> {isEdit ? "Update": "Create"}</Button>
                    
                    {onCancel && (
                        <Button variant="ghost" disabled={isPending} type="button" onClick={() => onCancel()}>Cancel</Button>
                    )}
                    
                </div>

            </form>
        </Form>
        </>
    );
};