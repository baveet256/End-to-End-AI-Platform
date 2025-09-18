import Image from "next/image";

interface Props {
    title: string;
    description: string;
}

export const EmptyStateMeet = ({
    title,
    description
}:Props) =>{
    return (
        <div className="flex flex-col gap-y-7 items-center justify-center">
            <Image  className = "gap-y-7"src="/emptyMeet.png" alt="Empty" width={240} height={240}/>
                <div className=" flex flex-col py-2 gap-y-2 max-w-md mx-auto text-center">
                    <h6 className="text-lg font-medium">{title}</h6>
                    <p className="text-sm text-muted-foreground">{description}</p>
                </div>
        </div>
    );
};