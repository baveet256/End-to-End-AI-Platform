import { DefaultVideoPlaceholder, StreamVideoParticipant,ToggleAudioPreviewButton,ToggleVideoPreviewButton,VideoPreview,useCallStateHooks} from "@stream-io/video-react-sdk";
import { LogInIcon } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { GeneratedAvatarUri } from "@/lib/avatar";

import "@stream-io/video-react-sdk/dist/css/styles.css";
import Link from "next/link";

interface Props{
    onJoin : ()=> void;
}

const DisabledVideoPreview = () => {
    const { data } = authClient.useSession();
  
    return (
      <DefaultVideoPlaceholder
        participant={{
          name: data?.user.name ?? "",
          image:
            data?.user.image ??
            GeneratedAvatarUri({
              seed: data?.user.name ?? "",
              variant: "initials",
            }),
        } as StreamVideoParticipant}
      />
    );
  };

const AllowBrowserPermission = () =>{
    return (<p className="text-sm">
        Please grant your browser permission to your camera and microphone.
    </p>);

}

export const CallLobby = ({onJoin}:Props) =>{
    const {useCameraState, useMicrophoneState} = useCallStateHooks();

    const {hasBrowserPermission: hasMicPermission} = useMicrophoneState();
    const {hasBrowserPermission: hasCameraPermission} = useCameraState();

    const hasBrowserMediaPermission = hasMicPermission && hasCameraPermission;

    return (
        <div className="flex flex-col items-center justify-center h-full bg-radial from-sidebar-accent to-sidebar">
            <div className="py-4 px-8 items-center justify-center">
                <div className="flex flex-col items-center justify-center gap-y-6 bg-background rounded-lg p-6 shadow-sm">
                    <div className="flex flex-col gap-y-2 text-center">
                        <h6 className="text-lg font-medium"> Ready to join mate?</h6>
                        <p className="text-sm"> Call setup before you join</p>

                    </div>
                    <VideoPreview DisabledVideoPreview={hasBrowserMediaPermission ? DisabledVideoPreview : AllowBrowserPermission}/>
                    <div className="flex gap-x-2">
                        <ToggleAudioPreviewButton/>
                        <ToggleVideoPreviewButton/>
                    </div>
                    <div className="flex gap-x-2 justify-between w-full">
                        <Button asChild variant="ghost">
                            <Link href="/meetings">Cancel</Link>
                        </Button>
                        <Button onClick={onJoin}>
                            <LogInIcon/>
                            Join Call
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );

}