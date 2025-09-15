"use client";

import { trpc } from "@/trpc/client";

export const MeetingsView = () => {
  const [ data ] = trpc.meetings.getMany.useSuspenseQuery({
    // if you want filters:
    page: 1,
    pageSize: 10,
    search: "",
  });

  return <div>{JSON.stringify(data)}</div>;
};
