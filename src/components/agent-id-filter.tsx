import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { CommandSelect } from "./command-select";
import { GeneratedAvatar } from "./generated-avatar";
import { useMeetingFilters } from "@/modules/meetings/hooks/use-meetings-filter";
import { trpc } from "@/trpc/client";
import { Divide } from "lucide-react";


export const AgentIdFilter = () => {

    const [filters,setFilters] = useMeetingFilters();

    const [agentSearch,setAgentSearch] = useState("");
    
    const {data} = trpc.agents.getMany.useQuery({
        pageSize: 100,
        search: agentSearch,
      });

    return ( <CommandSelect className="h-9" placeholder="Agents" options={(data?.items ??  []).map((agent) =>({
        id:agent.id,
        value:agent.id,
        children:(
            <div className="flex items-center gap-x-2">
                <GeneratedAvatar seed = {agent.name} variant="botttsNeutral" className="size-4"/>
                {agent.name}
            </div>
        )
    }))}
    onSelect={(value) =>setFilters({agentId:value})}
    onSearch={setAgentSearch}
    value={filters.agentId ?? ""}
    /> );
}
 