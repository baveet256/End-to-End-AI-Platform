"use client";

import { DataTable } from "@/modules/agents/ui/components/data-table";
import { trpc } from "@/trpc/client";
import { columns } from "@/modules/agents/ui/components/columns";
import { EmptyState } from "@/components/empty-state";
import { useAgentsFilters } from "@/modules/agents/hooks/use-agents-filter";
import { DEFAULT_PAGE } from "@/constants";
import { DataPagination } from "@/modules/agents/ui/components/agents-data-pagination";
import { useRouter } from "next/navigation";


export const AgentsView = () => {
  // useSuspenseQuery automatically suspends the component while fetching

  const router = useRouter();

  const [filters,setFilters] = useAgentsFilters();
  const stableFilters = {
    search: filters.search ?? "",
    page: filters.page ?? DEFAULT_PAGE,
  };

const [data] = trpc.agents.getMany.useSuspenseQuery(stableFilters);


  return (
      <div className="flex-1 pb-4 px-4 md:px-8 flex flex-col gap-y-4">
        <DataTable
           data={data.items} 
           columns={columns}
           onRowClick={(row) => router.push(`/agents/${row.id}`)}
           />
        <DataPagination page={filters.page} totalPages={data.totalPages} onPageChange={(page) => setFilters({page})}/>
        {data.items.length === 0 && (<EmptyState title="Create your first agent to join your meetings now!" description="Each agent can interact with all the participants in the call and follow the instructions. "/>)}
      </div>
  );
};