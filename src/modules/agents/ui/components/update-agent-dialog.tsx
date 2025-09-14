import { ResponsiveDialog } from "@/components/responsive-dialog";
import { AgentForm } from "./agent-form";
import { AgentGetOne } from "../../types";

interface UpdateAgentDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    initialAgentValues:AgentGetOne
};

export const UpdateAgentDialog = ({
    open,
    onOpenChange,
    initialAgentValues,
}:UpdateAgentDialogProps) => {
    return(

        <ResponsiveDialog title="Edit Agent" description="Edit the agent details" open = {open} onOpenChange={onOpenChange
        }>
        <AgentForm initialValues={initialAgentValues} onSuccess={() => onOpenChange(false)} onCancel={() => onOpenChange(false)}/>
        </ResponsiveDialog>
    );
}