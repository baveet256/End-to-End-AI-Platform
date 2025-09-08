"use client";

import { trpc } from "@/trpc/client";
export const AgentsView = () => {
  // useSuspenseQuery automatically suspends the component while fetching
  const [data] = trpc.agents.getMany.useSuspenseQuery();

  return (
    <pre className="text-sm">
      {JSON.stringify(data, null, 2)}
    </pre>
  );
};