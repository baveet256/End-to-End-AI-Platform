import { LoadingState } from "@/components/loading-state";
import { trpc } from "@/trpc/client";
import { useEffect, useState } from "react";
import { Channel, Chat, MessageInput, MessageList, Thread, Window } from "stream-chat-react";
import { useCreateChatClient } from "stream-chat-react";
import type { Channel as StreamChannel } from "stream-chat";
import { MessageSquare } from "lucide-react";
import "stream-chat-react/dist/css/v2/index.css";

interface ChatUIProps {
    meetingId: string;
    meetingName: string;
    userId: string;
    userName: string;
    userImage: string | undefined;
}

export const ChatUI = ({
    meetingId,
    meetingName,
    userId,
    userName,
    userImage
}: ChatUIProps) => {

    const { mutateAsync: generateChatToken } = trpc.meetings.generateChatToken.useMutation();

    const [channel, setChannel] = useState<StreamChannel>();

    const client = useCreateChatClient({
        apiKey: process.env.NEXT_PUBLIC_CHAT_VIDEO_API_KEY!,
        tokenOrProvider: generateChatToken,
        userData: {
            id: userId,
            name: userName,
            image: userImage
        }
    });

    useEffect(() => {
        if (!client) return;

        const channel = client.channel("messaging", meetingId, {
            members: [userId],
        });

        setChannel(channel);
    }, [client, meetingId, meetingName, userId]);

    if (!client) {
        return (
            <LoadingState title="Loading Chat.." description="This may take many seconds" />
        );
    }

    return (
        <div className="flex flex-col h-full gap-4">
            {/* Header */}
            <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-amber-600/20 border border-amber-600/30">
                    <MessageSquare className="w-5 h-5 text-amber-600" />
                </div>
                <div>
                    <h3 className="text-xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-amber-600 via-orange-500 to-amber-700">
                        Chat
                    </h3>
                </div>
            </div>

            {/* Chat */}
            <div className="flex-1 rounded-lg bg-zinc-800/40 border border-zinc-700/30 overflow-hidden">
                <Chat client={client} theme="str-chat__theme-dark">
                    <Channel channel={channel}>
                        <Window>
                            <MessageList />
                            <MessageInput />
                        </Window>
                        <Thread />
                    </Channel>
                </Chat>
            </div>

            {/* Minimal custom styles */}
            <style jsx global>{`
                .str-chat__container {
                    background: transparent !important;
                }
                
                .str-chat__message-simple {
                    background: rgba(39, 39, 42, 0.4) !important;
                    border-radius: 0.5rem !important;
                }
                
                .str-chat__message-sender-name {
                    color: rgb(252, 211, 77) !important;
                }
                
                .str-chat__input-flat {
                    background: rgba(39, 39, 42, 0.6) !important;
                    border: 1px solid rgba(113, 113, 122, 0.4) !important;
                    border-radius: 0.5rem !important;
                }
                
                .str-chat__input-flat:focus-within {
                    border-color: rgba(217, 119, 6, 0.5) !important;
                }
            `}</style>
        </div>
    );
};