import { GeneratedAvatar } from "@/components/generated-avatar";
import { CommandReponsiveDialog, CommandInput, CommandItem, CommandGroup, CommandEmpty } from "@/components/ui/command";
import { trpc } from "@/trpc/client";
import { CommandList } from "cmdk";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction, useState } from "react";


interface Props{
    open:boolean;
    setOpen : Dispatch<SetStateAction<boolean>>
}
export const DashboardCommand = ({open,setOpen}:Props) =>{

    const router = useRouter();
    const [search,setSearch] = useState("");

    const agents = trpc.agents.getMany.useQuery({
        pageSize: 100,
        search,
      });

    const meetings = trpc.meetings.getMany.useQuery({
        pageSize: 100,
        search,
      });



return(
    <CommandReponsiveDialog shouldFilter={false} open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Find a meeting or an agent..."
        value={search}
        onValueChange={(value)=> setSearch(value)}
        
        />
        <CommandList>
            <CommandGroup heading="Meetings">
                <CommandEmpty>
                    <span className="text-muted-foreground text-sm">
                        No meetings found
                    </span>
                </CommandEmpty>
                {meetings.data?.items.map((meeting) =>(
                    <CommandItem
                    onSelect={()=>{
                        router.push(`/meetings/${meeting.id}`);
                        setOpen(false);
                    }}
                    key={meeting.id}
                    >
                    {meeting.name}
                    </CommandItem>
                ))}
            </CommandGroup>
            <CommandGroup heading="Agents">
                <CommandEmpty>
                    <span className="text-muted-foreground text-sm">
                        No Agents found
                    </span>
                </CommandEmpty>
                {agents.data?.items.map((agent) =>(
                    <CommandItem
                    onSelect={()=>{
                        router.push(`/agents/${agent.id}`);
                        setOpen(false);
                    }}
                    key={agent.id}
                    >
                    <GeneratedAvatar seed={agent.name} variant="botttsNeutral"/>
                    {agent.name}
                    </CommandItem>
                ))}
            </CommandGroup>
            
        </CommandList>
    </CommandReponsiveDialog>
)
};
