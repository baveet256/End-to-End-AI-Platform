import { StreamTheme, useCall, useCallStateHooks } from "@stream-io/video-react-sdk";
import { useEffect, useState } from "react";
import { CallLobby } from "./call-lobby";
import { CallActive } from "./call-active";
import { CallEnded } from "./call-ended";

interface Props {
  meetingName: string;
}

export const CallUI = ({ meetingName }: Props) => {
  const call = useCall();
  const [show, setShow] = useState<"lobby" | "call" | "ended">("lobby");

  const { useCallEndedAt } = useCallStateHooks();
  const callEndedAt = useCallEndedAt();

  const handleJoin = async () => {
    if (!call) return;
    await call.join();
    setShow("call");
  };

  const handleLeave = async () => {
    if (!call) return;
    await call.endCall();
    setShow("ended");
  };

  // 🔥 Automatically detect if Stream ends the call (time limit, user disconnect, etc.)
  useEffect(() => {
    if (callEndedAt) {
      setShow("ended");
    }
  }, [callEndedAt]);

  return (
    <StreamTheme className="h-full">
      {show === "lobby" && <CallLobby onJoin={handleJoin} />}
      {show === "call" && <CallActive onLeave={handleLeave} meetingName={meetingName} />}
      {show === "ended" && <CallEnded />}
    </StreamTheme>
  );
};
