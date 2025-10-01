import { ResponsiveDialog } from "@/components/responsive-dialog";
import { useRouter } from "next/navigation";
import { MeetingForm } from "./meeting-form";
import { toast } from "sonner";
import { useEffect } from "react";
import { trpc } from "@/trpc/client";

interface NewMeetingDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
};

export const NewMeetingDialog = ({
    open,
    onOpenChange,
}: NewMeetingDialogProps) => {
    const router = useRouter();
    const { data: limitCheck } = trpc.meetings.checkMeetingLimit.useQuery(undefined, {
        enabled: open, // Only run query when dialog is open
    });

    useEffect(() => {
        if (open && limitCheck && !limitCheck.canProceed) {
            toast.error(
                `You've reached the demo limit. Each meeting uses paid AI services. Create a new account to continue exploring!`,
                {
                    duration: 5000,
                    position: "top-center",
                }
            );
            onOpenChange(false); // Close the dialog immediately
        }
    }, [open, limitCheck, onOpenChange]);

    return (
        <ResponsiveDialog 
            title="New Meeting" 
            description="Start a meeting" 
            open={open} 
            onOpenChange={onOpenChange}
        >
            <MeetingForm 
                onSuccess={(id) => {
                    onOpenChange(false);
                    router.push(`/meetings/${id}`);
                }}
                onCancel={() => onOpenChange(false)}
            />
        </ResponsiveDialog>
    );
}