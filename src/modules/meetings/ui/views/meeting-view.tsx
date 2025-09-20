"use client";

import { DataTable } from "@/components/data-table";
import { trpc } from "@/trpc/client";
import { columns } from "../components/columns";
import { EmptyStateMeet } from "@/components/empty-state-meet";
import { useRouter } from "next/navigation";
import { useMeetingFilters } from "../../hooks/use-meetings-filter";
import { DataPagination } from "@/components/data-pagination";

export const MeetingsView = () => {
  const router = useRouter();
  const [filters,setFilters] = useMeetingFilters();

  const [ data ] = trpc.meetings.getMany.useSuspenseQuery({
    ...filters,
  });

  return <div className="flex-1 pb-4 px-4 md:px-8 gap-y-4">
    
    {data.items.length > 0 ? (
      <>
  <DataTable data={data.items} columns={columns} onRowClick={(row) =>{router.push(`/meetings/${row.id}`)}}/>
  <DataPagination page={filters.page} totalPages={data.totalPages} onPageChange={(page) => setFilters({page})} />
  </>
) : (
  <EmptyStateMeet
    title="Create your first meeting and let your agent join it or Adjust your Filters!!"
    description="Schedule a meeting to connect with others. Each meeting lets you collaborate, share ideas, and interact with your AI agent and participants"
  />
)}

  </div>;
};
