import { ErrorState } from "@/components/error-state";
import { LoadingState } from "@/components/loading-state";
import { MeetingsView } from "@/modules/meetings/ui/views/meeting-view";
import { getQueryClient, trpc } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

const Page = async () => {

    const queryClient = getQueryClient();
    
    await queryClient.prefetchQuery({
      queryKey: [['agents', 'getOne'], {  }],
      queryFn: () => trpc.agents.getMany({  }),
    });


    return ( <div>
    <HydrationBoundary state={dehydrate(queryClient)}>
        
        <Suspense fallback={<LoadingState title="Loading Meetings" description=" This may take some time (Ruko Thoda)"/>}>
        <ErrorBoundary fallback={<ErrorState title ="Failed to Load Meetings" description = "try again or like sleep well" />}>
            <MeetingsView/>
        </ErrorBoundary>
      </Suspense>
    </HydrationBoundary>

    </div> );
}
 
export default Page;

