"use client";

import { trpc } from "@/trpc/client";

export const HomeView = () => {
  const { data } = trpc.hello.useQuery({ text: "Baveet" });

  return (
    <div className="flex flex-col p-4 gap-4">
      {data?.greeting}
    </div>
  );
};
