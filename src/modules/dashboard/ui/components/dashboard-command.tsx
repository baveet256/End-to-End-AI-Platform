import { CommandDialog, CommandInput, CommandItem } from "@/components/ui/command";
import { CommandList } from "cmdk";
import { Dispatch, SetStateAction } from "react";


interface Props{
    open:boolean;
    setOpen : Dispatch<SetStateAction<boolean>>
}
export const DashboardCommand = ({open,setOpen}:Props) =>{
return(
    <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="find me a meeting or agent"/>
        <CommandList>
            <CommandItem>
                Test
            </CommandItem>
        </CommandList>
    </CommandDialog>
)
};
