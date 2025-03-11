"use client";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { addToCart } from "@/features/cart/actions/add-to-cart-action";
import { CartItem } from "@/prisma/lib/validators/helpers";

const AddToCart = ({ item }: { item: CartItem }) => {
    const router = useRouter();

    const onAddToCart = async () => {
        const result = await addToCart();
        if (!result.success) {
            toast.error(result.message);
        }
        toast.success(`${item.name} added to cart`, {
            action: {
                label: "Go to Cart",
                onClick: () => router.push("/cart"),
            },
        });
    };
    return (
        <Button className={"w-full mt-4"} onClick={onAddToCart}>
            Add To card
        </Button>
    );
};

export default AddToCart;
