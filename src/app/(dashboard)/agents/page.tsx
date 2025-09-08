import { getQueryClient, trpc } from "@/trpc/server";
import { AgentsView } from "./ui/views/agents-view";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { Suspense } from 'react';
import { LoadingState } from "@/components/loading-state";
import { ErrorBoundary } from "react-error-boundary";
import { ErrorState } from "@/components/error-state";
import { ListHeader } from "@/modules/agents/ui/components/list-header";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
const Page = async () => {
  const queryClient = getQueryClient();
  const queryKey = [['agents', 'getMany']];
  
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session){
    redirect("/sign-in");
  }
  // Prefetch data on the server
  await queryClient.prefetchQuery({
    queryKey: queryKey,
    queryFn: () => trpc.agents.getMany(),
  });

  return (
    <>
    <ListHeader/>
    <HydrationBoundary state={dehydrate(queryClient)}>
        <Suspense fallback={<LoadingState title="Loading Agents" description=" This may take some time (Ruko Thoda)"/>}>
      <ErrorBoundary fallback={<ErrorState title ="Failed to Load Agents" description = "try again or like sleep well" />}>
          <AgentsView />
      </ErrorBoundary>
      </Suspense>
    </HydrationBoundary>
    </>
  );
};

export default Page;