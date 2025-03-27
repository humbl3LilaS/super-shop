import { ShoppingBag } from "lucide-react";
import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { Suspense } from "react";

import { auth } from "@/auth";
import UserOrdersTable from "@/features/profile/components/user-orders-table";
import UserOrdersTableSkeleton from "@/features/profile/components/user-orders-table-skeleton";

export const metadata: Metadata = {
    title: "User Orders",
    metadataBase: new URL(process.env.NEXT_PUBLIC_ENDPOINT!),
};

type PageProps = {
    searchParams: Promise<{
        page?: string;
    }>;
};

const UserOrdersPage = async ({ searchParams }: PageProps) => {
    const session = await auth();
    if (!session) return redirect("/sign-in");
    const { page } = await searchParams;
    const currPage = page ? Number(page) : 1;
    return (
        <section className={"w-full h-full"}>
            <h1 className={"py-4 flex items-center gap-x-3 h2-bold"}>
                <span>Your Orders</span> <ShoppingBag className={"size-9"} />
            </h1>
            <Suspense fallback={<UserOrdersTableSkeleton />}>
                <UserOrdersTable currPage={currPage} />
            </Suspense>
        </section>
    );
};

export default UserOrdersPage;
