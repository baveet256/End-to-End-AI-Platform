"use client";

import { trpc } from "@/trpc/client";
import { useMutation, useQueryClient, useSuspenseQuery } from "@tanstack/react-query";
import { AgentIdViewHeader } from "./agent-id-view-header";
import { GeneratedAvatar } from "@/components/generated-avatar";
import { Badge } from "@/components/ui/badge";
import { VideoIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { agents } from "@/db/schema";
import { useConfirm } from "@/hooks/use-confirm";
import { useState } from "react";
import { UpdateAgentDialog } from "../components/update-agent-dialog";

interface Props {
    agentId:string
};
 
export const AgentIdView = ({agentId}:Props) =>{

    const [data] = trpc.agents.getOne.useSuspenseQuery({ id: agentId });
    const router = useRouter();
    const queryClient = useQueryClient();

    const [updateAgentDialogOpen,setupdateAgentDialogOpen] = useState(false);

    const removeAgent = trpc.agents.remove.useMutation({
        onSuccess: async () => {
          await queryClient.invalidateQueries({
            queryKey: [['agents', 'getMany']],
          });
          router.push("/agents");
        },
        onError: (error) => {
          toast.error(error.message);
        },
      });
    const [RemoveConfirmation,confirmRemove] = useConfirm("You sure?",`This Agent will be removed and its associated ${data.meetingCount} ${data.meetingCount === 1? "meeting":"meetings"}.`,);
    
    const handleRemoveAgent = async () => {
        const ok = await confirmRemove();

        if(!ok) return;

        await removeAgent.mutateAsync({id:agentId});
    }
    return (
        <>
        <RemoveConfirmation/>
        <UpdateAgentDialog open={updateAgentDialogOpen} onOpenChange={setupdateAgentDialogOpen} initialAgentValues={data}/>

        <div className="flex-1 py-4 px-4 md:px-8 flex flex-col gap-y-4">
            <AgentIdViewHeader agentId = {agentId} agentName={data.name} onEdit = {() =>setupdateAgentDialogOpen(true)} onRemove = {handleRemoveAgent}/>
            <div className=" bg-white rounded-lg border">
                <div className="px-4 py-5 gap-y-5 flex flex-col col-span-5">
                    <div className=" flex items-center gap-x-3">
                        <GeneratedAvatar seed={data.name} variant={"botttsNeutral"} className="size-10"/>
                        <h2 className="text-2xl font-medium">{data.name}</h2>
                    </div>
                    <Badge variant="outline" className="flex items-center gap-x-2 [&>svg]:size-4">
                        <VideoIcon className="text-blue-700"/> {data.meetingCount} {data.meetingCount === 1? "meeting": "meetings"}
                    </Badge>
                    <div className="flex flex-col gap-y-4">

                        <p className="texi-lg font-medium"> Instructions</p>
                        <p className="text-neutral-800"> {data.instructions}</p>
                    </div>
                </div>
            </div>
        </div>
        </>
    );

}
