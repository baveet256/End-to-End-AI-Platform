"use client";

import { ErrorState } from "@/components/error-state";
import { trpc } from "@/trpc/client";
import { CallProvider } from "../components/call-provider";

interface Props {
  meetingId: string;
}
export const CallView = ({ meetingId }: Props) => {
  // Suspense hook returns [data, queryInfo]

  console.log('CallView meetingId:', meetingId); // Debug log
  
  if (!meetingId) {
    return <div>No meeting ID provided</div>;
  }

  const [data] = trpc.meetings.getOne.useSuspenseQuery({ id: meetingId });

  if (data.status === 'completed'){
    return (<div className="flex h-screen justify-center items-center">
        <ErrorState title="Meeting already ended" description="I dont know what to describe here!"/>
    </div>);
  }
  
  return (
    <CallProvider meetingId={meetingId} meetingName={data.name}/>
  );
};
