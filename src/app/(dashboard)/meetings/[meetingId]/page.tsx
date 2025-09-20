import { ErrorState } from "@/components/error-state";
import { LoadingState } from "@/components/loading-state";
import { auth } from "@/lib/auth";
import { MeetingIdView } from "@/modules/meetings/ui/views/meeting-id-view";
import { getQueryClient } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

interface Props {
    params : Promise<{
        meetingId:string;
    }>;
}


const Page = async ({params}:Props) => {

    const {meetingId} = await params;
    const session = await auth.api.getSession({
        headers:await headers(),
    })

    const queryClient = getQueryClient();
    const queryKey = [['meetings', 'getOne'],{id:meetingId}];
    
    // Prefetch data on the server
    // Transcript of the meeting

    if (!session){
        redirect("/sign-in")
    }
    
    return ( 
    <HydrationBoundary state={dehydrate(queryClient)}>
        <Suspense fallback={<LoadingState title="Loading Meetings" description=" This may take some time (Ruko Thoda)"/>}>
            <ErrorBoundary fallback={<ErrorState title ="Failed to Load Meetings" description = "try again or like sleep well" />}>
              <MeetingIdView meetingId={meetingId}/>
            </ErrorBoundary>
        </Suspense>
    </HydrationBoundary> );
}
 


export default Page;

