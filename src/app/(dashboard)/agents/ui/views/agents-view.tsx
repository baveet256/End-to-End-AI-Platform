"use client";

import { DataTable } from "@/modules/agents/ui/components/data-table";
import { trpc } from "@/trpc/client";
import { columns } from "@/modules/agents/ui/components/columns";
import { EmptyState } from "@/components/empty-state";


export const AgentsView = () => {
  // useSuspenseQuery automatically suspends the component while fetching
  const [data] = trpc.agents.getMany.useSuspenseQuery();


  return (
      <div className="flex-1 pb-4 px-4 md:px-8 flex flex-col gap-y-4">
        <DataTable data={data} columns={columns}/>
        {data.length === 0 && (<EmptyState title="Create your first agent to join your meetings now!" description="Each agent can interact with all the participants in the call and follow the instructions. "/>)}
      </div>
  );
};