"use client";
import { Loader2, Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { addToCart } from "@/features/cart/actions/add-to-cart-action";
import { CartItem } from "@/prisma/lib/validators/helpers";

const AddToCart = ({ item }: { item: CartItem }) => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const router = useRouter();

    const onAddToCart = async () => {
        setIsSubmitting(true);
        const result = await addToCart(item);
        if (!result.success) {
            setIsSubmitting(false);
            return toast.error(result.message);
        }
        toast.success(`${item.name} added to cart`, {
            action: {
                label: "Go to Cart",
                onClick: () => router.push("/cart"),
            },
        });
        setIsSubmitting(false);
    };
    return (
        <Button className={"w-full mt-4"} onClick={onAddToCart} disabled={isSubmitting}>
            {isSubmitting ? (
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
    );
};

export default AddToCart;
