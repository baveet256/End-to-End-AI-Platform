"use client";

import { DataTable } from "@/components/data-table";
import { trpc } from "@/trpc/client";
import { columns } from "../components/columns";
import { EmptyStateMeet } from "@/components/empty-state-meet";

export const MeetingsView = () => {
  const [ data ] = trpc.meetings.getMany.useSuspenseQuery({
    // if you want filters:
    page: 1,
    pageSize: 10,
    search: "",
  });

  return <div className="flex-1 pb-4 px-4 md:px-8 gap-y-4">
    
    {data.items.length > 0 ? (
  <DataTable data={data.items} columns={columns} />
) : (
  <EmptyStateMeet
    title="Create your first meeting and let your agent join it"
    description="Schedule a meeting to connect with others. Each meeting lets you collaborate, share ideas, and interact with AI agents and participants"
  />
)}

  </div>;
};
