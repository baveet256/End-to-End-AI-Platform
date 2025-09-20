import { ResponsiveDialog } from "@/components/responsive-dialog";
import { useRouter } from "next/navigation";
import { MeetingForm } from "./meeting-form";
import { MeetingGetOne } from "../../types";

interface UpdateMeetingDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    initialValues:MeetingGetOne;
};

export const UpdateMeetingDialog = ({
    open,
    onOpenChange,
    initialValues
}:UpdateMeetingDialogProps) => {

    const router  = useRouter();

    return(

        <ResponsiveDialog title="Edit Meeting" description="Edit the meeting" open = {open} onOpenChange={onOpenChange
        }>
        <MeetingForm onSuccess={(id) => {
            onOpenChange(false);
            router.push(`/meetings/${id}`);
        }}
        onCancel={() => onOpenChange(false)}
        initialValues={initialValues}
        ></MeetingForm>
        </ResponsiveDialog>
    );
}