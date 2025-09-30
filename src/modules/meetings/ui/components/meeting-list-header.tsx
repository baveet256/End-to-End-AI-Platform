"use client";
import { Button } from "@/components/ui/button";
import { PlusIcon,XCircleIcon} from "lucide-react";
import { NewMeetingDialog } from "./new-meeting-dialog";
import { useState } from "react";
import { MeetingSearchFilter } from "./meeting-search-filter";
import StatusFilter from "./status-filter";
import { AgentIdFilter } from "@/components/agent-id-filter";
import { useMeetingFilters } from "../../hooks/use-meetings-filter";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

export const MeetingListHeader = () =>{
    const [filters,setFilters] = useMeetingFilters();
    const [isDialogOpen,setIsDialogOpen] = useState(false);

    const isAnyFilterModified = !!filters.agentId || !!filters.search || !!filters.status;

    const onClearFilters = () =>{
        setFilters({
            status : null,
            agentId : "",
            search : "",
            page: 1,
        })
    }
return(
    <>
        <NewMeetingDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}/>
        <div className="py-4 px-4 flex flex-col gap-y-4 ">
            <div className="flex items-center justify-between">
            <h5 className="font-medium text-3xl">My Meetings</h5>
            <Button className="text-shadow-accent text-xl bg-gradient-to-r from-amber-400 to-orange-500 " onClick={() => setIsDialogOpen(true)}> <PlusIcon/> New Meeting</Button>
            </div>
        <ScrollArea>
        <div className="flex items-center gap-x-2 p-1">
            <MeetingSearchFilter/>
            <StatusFilter/>
            <AgentIdFilter/>
            {isAnyFilterModified && <Button variant="outline" onClick={onClearFilters}>
                <XCircleIcon className="size-4"/>
                Clear
                </Button>}
            </div>
            <ScrollBar orientation="horizontal"/>
        </ScrollArea>
        </div>
        
    </>
);   
}