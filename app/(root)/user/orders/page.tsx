import { ShoppingBag } from "lucide-react";
import { redirect } from "next/navigation";
import { Suspense } from "react";

import { auth } from "@/auth";
import UserOrdersTable from "@/features/profile/user-orders-table";

type PageProps = {
    searchParams: Promise<{
        page: number;
    }>;
};

const UserOrdersPage = async ({ searchParams }: PageProps) => {
    const session = await auth();
    if (!session) return redirect("/sign-in");
    const { page } = await searchParams;
    return (
        <section className={"w-full h-full"}>
            <h1 className={"py-4 flex items-center gap-x-3 h2-bold"}>
                <span>Your Orders</span> <ShoppingBag className={"size-9"} />
            </h1>
            <Suspense fallback={<div>Table Loading</div>}>
                <UserOrdersTable currPage={page ?? 1} />
            </Suspense>
        </section>
    );
};

export default UserOrdersPage;
