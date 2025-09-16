"use client";
import { Button } from "@/components/ui/button";
import { PlusIcon} from "lucide-react";
import { NewMeetingDialog } from "./new-meeting-dialog";
import { useState } from "react";

export const MeetingListHeader = () =>{

    const [isDialogOpen,setIsDialogOpen] = useState(false);
return(
    <>
        <NewMeetingDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}/>
        <div className="py-4 px-4 flex flex-col gap-y-4 ">
            <div className="flex items-center justify-between">
            <h5 className="font-medium text-3xl">My Meetings</h5>
            <Button className="text-shadow-accent text-xl" onClick={() => setIsDialogOpen(true)}> <PlusIcon/> New Meeting</Button>
            </div>
        
        <div className="flex items-center gap-x-2 p-1">
            </div>
        </div>
    </>
);   
}