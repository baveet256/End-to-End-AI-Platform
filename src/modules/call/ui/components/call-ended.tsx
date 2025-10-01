import { Button } from "@/components/ui/button";
import Link from "next/link";


export const CallEnded = () =>{

    return (
        <div className="flex flex-col items-center justify-center h-full bg-radial from-sidebar-accent to-sidebar">
            <div className="py-4 px-8 items-center justify-center">
                <div className="flex flex-col items-center justify-center gap-y-6 bg-background rounded-lg p-6 shadow-sm">
                    <div className="flex flex-col gap-y-2 text-center">
                        <h6 className="text-lg font-medium">Call ended</h6>
                        <p className="text-sm">Summary transcription will appear soon.</p>

                    </div>
                   <Button asChild>
                            <Link href="/meetings">Return to Meetings?</Link>
                    </Button>
                </div>
            </div>
        </div>
    );

}