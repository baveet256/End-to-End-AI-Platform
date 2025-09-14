import { ErrorState } from "@/components/error-state";
import { LoadingState } from "@/components/loading-state";
import { AgentIdView } from "@/modules/agents/ui/views/agent-id-view";
import { getQueryClient, trpc } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

interface Props {
    params: { agentsId: string };
  }
  
const Page = async ({params}:Props) => {
    const {agentsId} = await params;

    const queryClient = getQueryClient();
    
    await queryClient.prefetchQuery({
      queryKey: [['agents', 'getOne'], { id: agentsId }],
      queryFn: () => trpc.agents.getOne({ id: agentsId }),
    });

    return ( 
    <HydrationBoundary state={dehydrate(queryClient)}>
        <Suspense fallback={<LoadingState title="Loading your Agent" description=" Just a little wait buddy!"/>}>
            <ErrorBoundary fallback={<ErrorState title="Error for Agent Loading here" description="Error aaya h yha, jao yha se"/>}>
            <AgentIdView agentId = {agentsId}/>
            </ErrorBoundary> 
        </Suspense>

    </HydrationBoundary> );
}
 
export default Page;