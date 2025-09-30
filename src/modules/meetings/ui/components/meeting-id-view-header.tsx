interface Props {
    meetingId: string;
    meetingName: string;
    onEdit : () => void;
    onRemove : () => void;
}

import { Breadcrumb,BreadcrumbItem,BreadcrumbLink,BreadcrumbList,BreadcrumbSeparator } from "@/components/ui/breadcrumb";

import { ChevronRightIcon} from "lucide-react";
import Link from "next/link";

export const MeetingsIdViewHeader = ({

    meetingId,
    meetingName,
    onEdit,
    onRemove
}:Props) => {

    return(
        <div className="flex items-center justify-between">

            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink asChild className="font-medium text-xl">
                        <Link href="/meetings">
                            My Meetings
                        </Link>
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator className="text-foreground text-xl font-medium [&>svg]:size-4">
                    <ChevronRightIcon/>
                    </BreadcrumbSeparator>
                    <BreadcrumbItem>
                        <BreadcrumbLink asChild className="font-medium text-xl text-foreground">
                        <Link href={`/meetings/${meetingId}`}>
                            {meetingName}
                        </Link>
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb> 
        </div>
    );

}