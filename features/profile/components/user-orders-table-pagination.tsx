"use client";
import { ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";

type UserOrdersTablePaginationProps = {
    currPage: number;
    totalPages: number;
};
const UserOrdersTablePagination = ({ currPage, totalPages }: UserOrdersTablePaginationProps) => {
    const [submitStatus, setSubmitStatus] = useState<"prev" | "next" | null>(null);

    useEffect(() => {
        setSubmitStatus(null);
    }, [currPage]);

    const router = useRouter();
    const onPagePrevious = () => {
        setSubmitStatus("prev");
        router.push(`/user/orders?page=${currPage - 1}`);
    };

    const onPageNext = () => {
        setSubmitStatus("next");
        router.push(`/user/orders?page=${currPage + 1}`);
    };
    return (
        <div className={"mt-2 py-4 flex justify-between"}>
            <p>
                Page {currPage} of {totalPages}
            </p>
            <div className={"flex justify-center gap-x-4"}>
                <Button disabled={currPage === 1 || !!submitStatus} onClick={onPagePrevious}>
                    {submitStatus === "prev" ? (
                        <Loader2 className={"animate-spin"} />
                    ) : (
                        <ChevronLeft />
                    )}
                </Button>
                <Button disabled={currPage === totalPages || !!submitStatus} onClick={onPageNext}>
                    {submitStatus === "next" ? (
                        <Loader2 className={"animate-spin"} />
                    ) : (
                        <ChevronRight />
                    )}
                </Button>
            </div>
        </div>
    );
};

export default UserOrdersTablePagination;
