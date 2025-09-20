"use client";

import { trpc } from "@/trpc/client";
import { MeetingsIdViewHeader } from "../components/meeting-id-view-header";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useConfirm } from "@/hooks/use-confirm";
import { useState } from "react";
import { UpdateMeetingDialog } from "../components/update-meeting-dialog";

interface Props {
    meetingId:string;
}

export const  MeetingIdView = ({meetingId}:Props) => {

    const [data] = trpc.meetings.getOne.useSuspenseQuery({ id: meetingId });
    const queryClient = useQueryClient();
    const router = useRouter();


    const [updateMeetingDialogOpen,setUpdateMeetingDialogOpen] = useState(false);
    
    const removeMeeting = trpc.meetings.remove.useMutation({
        onSuccess: async () => {
          await queryClient.invalidateQueries({
            queryKey: [['meetings', 'getMany']],
          });
          router.push("/meetings");
        },
        onError: (error) => {
          toast.error(error.message);
        },
      });
    const [RemoveConfirmation,confirmRemove] = useConfirm("Are you sure?",`This Meeting will be removed.`,);
    
    const handleRemoveMeeting = async () => {
        const ok = await confirmRemove();

        if(!ok) return;

        await removeMeeting.mutateAsync({id:meetingId});
    }

    return ( <>
    <RemoveConfirmation/>
    <UpdateMeetingDialog open={updateMeetingDialogOpen} onOpenChange={setUpdateMeetingDialogOpen} initialValues={data}/>
    <div className="flex-1 px-4 py-4 md:px-8 flex flex-col gap-y-4">
        <MeetingsIdViewHeader meetingId={meetingId} meetingName={data.name} onEdit={() => setUpdateMeetingDialogOpen(true)} onRemove={handleRemoveMeeting}/>
        {JSON.stringify(data,null,2)}
    </div>
    
    </> );
}
 
