import { ShoppingCart } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { getCart } from "@/features/cart/actions/get-cart";
import CartSummary from "@/features/cart/components/cart-summary";
import CartTable from "@/features/cart/components/cart-table";

export const metadata: Metadata = {
    title: "Cart | SuperStore",
    description: "Checkout the items in you cart",
    metadataBase: new URL(process.env.NEXT_PUBLIC_ENDPOINT!),
};

const CartPage = async () => {
    const cart = await getCart();
    console.log(cart);
    return (
        <section>
            <h1 className={"py-4 flex items-center gap-x-3 h2-bold"}>
                <span>Your Cart</span> <ShoppingCart className={"size-9"} />
            </h1>
            {!cart ||
                (cart.items.length === 0 && (
                    <p>
                        <span>Cart is empty.</span>
                        <Button asChild={true} variant={"outline"}>
                            <Link href={"/"}>
                                <ShoppingCart />
                                <span>Go shopping</span>
                            </Link>
                        </Button>
                    </p>
                ))}
            {cart && (
                <div className={"grid gap-y-6 md:grid-cols-5 lg:grid-cols-4 md:gap-x-10"}>
                    <CartTable cart={JSON.parse(JSON.stringify(cart))} />
                    <CartSummary cart={cart} />
                </div>
            )}
        </section>
    );
};

export default CartPage;
