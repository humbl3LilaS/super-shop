"use client";
import { Loader2, Minus, Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { addToCart } from "@/features/cart/actions/add-to-cart-action";
import { removeFromCart } from "@/features/cart/actions/remove-from-cart";
import { CartItem } from "@/prisma/lib/validators/helpers";

const AddToCart = ({ item, cartItems }: { item: CartItem; cartItems?: CartItem[] }) => {
    const router = useRouter();

    const itemInCart = cartItems && cartItems.find((cartItem) => cartItem.slug === item.slug);

    const [isAddingPending, startAddingTransition] = useTransition();
    const [isRemovingPending, startRemovingTransition] = useTransition();
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
        <>
            {itemInCart ? (
                <div className={"mt-5 flex items-center justify-between"}>
                    <p>Quantity In Cart</p>
                    <p className={"flex items-center gap-x-4"}>
                        <Button
                            variant={"destructive"}
                            onClick={onDeleteFromCart}
                            disabled={isAddingPending || isRemovingPending}
                        >
                            {isRemovingPending ? <Loader2 className={"animate-spin"} /> : <Minus />}
                        </Button>
                        <span>{itemInCart.qty}</span>
                        <Button
                            variant={"default"}
                            onClick={onAddToCart}
                            disabled={isAddingPending || isRemovingPending}
                        >
                            {isAddingPending ? <Loader2 className={"animate-spin"} /> : <Plus />}
                        </Button>
                    </p>
                </div>
            ) : (
                <Button
                    className={"w-full mt-4"}
                    onClick={onAddToCart}
                    disabled={isAddingPending || isRemovingPending}
                >
                    {isAddingPending ? (
                        <>
                            <Loader2 className={"animate-spin"} />
                            <span>Adding To Cart</span>
                        </>
                    ) : (
                        <>
                            <Plus />
                            <span>Add To Cart</span>
                        </>
                    )}
                </Button>
            )}
        </>
    );
};

export default AddToCart;
