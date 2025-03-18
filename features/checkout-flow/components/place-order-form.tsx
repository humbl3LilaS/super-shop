"use client";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { placeOrder } from "@/features/checkout-flow/actions/place-order";

const PlaceOrderForm = () => {
    const router = useRouter();
    const [pending, setPending] = useState(false);
    const handleSubmit = async (evt: React.FormEvent) => {
        setPending(true);
        evt.preventDefault();
        const res = await placeOrder();
        if (!res.success) {
            toast.error(res.message);
            if (res.redirect) router.push(res.redirect);
            return;
        }
        toast.success(res.message);
        return router.push(res.redirect);
    };
    return (
        <form onSubmit={handleSubmit} method="POST">
            <Button
                className={" w-full mt-4 ml-auto flex items-center"}
                type={"submit"}
                disabled={pending}
            >
                {pending ? (
                    <>
                        <Loader2 className={"mr-2 inline-block animate-spin"} />
                        <span>Placing Order...</span>
                    </>
                ) : (
                    <>
                        <span>Place Order</span>
                    </>
                )}
            </Button>
        </form>
    );
};

export default PlaceOrderForm;
