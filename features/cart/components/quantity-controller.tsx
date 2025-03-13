"use client";
import { Loader2, Minus, Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { addToCart } from "@/features/cart/actions/add-to-cart-action";
import { removeFromCart } from "@/features/cart/actions/remove-from-cart";
import { CartItem } from "@/prisma/lib/validators/helpers";

const QuantityController = ({ item }: { item: CartItem }) => {
    const router = useRouter();

    const [addingPending, startAddingTransition] = useTransition();

    const [removingPending, startRemovingTransition] = useTransition();
    const onAddToCart = async () => {
        startAddingTransition(async () => {
            const result = await addToCart(item);
            if (!result.success) {
                toast.error(result.message);
                return;
            }
            toast.success(`${item.name} added to cart`, {
                action: {
                    label: "Go to Cart",
                    onClick: () => router.push("/cart"),
                },
            });
            return;
        });
    };

    const onDeleteFromCart = async () => {
        startRemovingTransition(async () => {
            const result = await removeFromCart(item.productId);
            router.refresh();
            if (!result.success) {
                toast.error(result.message);
                return;
            }
            toast.success(result.message, {
                action: {
                    label: "Go to Cart",
                    onClick: () => router.push("/cart"),
                },
            });
            return;
        });
    };
    return (
        <p className={"flex items-center justify-center gap-x-4"}>
            <Button
                variant={"destructive"}
                onClick={onDeleteFromCart}
                disabled={addingPending || removingPending}
            >
                {removingPending ? <Loader2 className={"animate-spin"} /> : <Minus />}
            </Button>
            <span>{item.qty}</span>
            <Button
                variant={"default"}
                onClick={onAddToCart}
                disabled={addingPending || removingPending}
            >
                {addingPending ? <Loader2 className={"animate-spin"} /> : <Plus />}
            </Button>
        </p>
    );
};

export default QuantityController;
