"use client";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import { NewAgentDialog } from "./new-agent-dialog";
import { useState } from "react";

export const ListHeader = () =>{
    const [isDialogOpen, setIsDialogOpen] = useState(false);
return(
    <>
        <NewAgentDialog open = {isDialogOpen} onOpenChange={setIsDialogOpen}/>
        <div className="py-4 px-4 flex flex-col gap-y-4 ">
            <div className="flex items-center justify-between">
            <h5 className="font-medium text-xl">My agents</h5>
            <Button onClick={() => {setIsDialogOpen(true)}}> <PlusIcon/> Create Agent</Button>
            </div>
        </div>
    </>
);   
}