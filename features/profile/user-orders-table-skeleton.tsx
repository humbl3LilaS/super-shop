import { Skeleton } from "@/components/ui/skeleton";

const UserOrdersTableSkeleton = () => {
    return (
        <div className={"flex flex-col gap-y-4"}>
            <Skeleton className={"w-full h-10"} />
            <Skeleton className={"w-full h-80"} />
            <div className={"flex justify-between"}>
                <Skeleton className={"w-2/5 max-w-48 h-10"} />
                <div className={"w-2/5  h-10 flex justify-end gap-x-4"}>
                    <Skeleton className={"w-full max-w-32 h-full"} />
                    <Skeleton className={"w-full max-w-32 h-full"} />
                </div>
            </div>
        </div>
    );
};

export default UserOrdersTableSkeleton;
