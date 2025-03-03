import { Loader2 } from "lucide-react";

const Loading = () => {
    return (
        <div className={"w-screen h-screen flex-center"}>
            <p className={"flex items-center gap-x-2 text-lg font-bold"}>
                Loading... <Loader2 className={"animate-spin"} />
            </p>
        </div>
    );
};

export default Loading;
