import { ShoppingCart } from "lucide-react";
import type { Metadata } from "next";

import { getCart } from "@/features/cart/actions/get-cart";
import CartSummary from "@/features/cart/components/cart-summary";
import CartTable from "@/features/cart/components/cart-table";
import EmptyCart from "@/features/cart/components/empty-cart";

export const metadata: Metadata = {
    title: "Cart | SuperStore",
    description: "Checkout the items in you cart",
    metadataBase: new URL(process.env.NEXT_PUBLIC_ENDPOINT!),
};

const CartPage = async () => {
    const cart = await getCart();
    return (
        <section className={"w-full h-full"}>
            {cart && (
                <h1 className={"py-4 flex items-center gap-x-3 h2-bold"}>
                    <span>Your Cart</span> <ShoppingCart className={"size-9"} />
                </h1>
            )}
            {(!cart || cart.items.length === 0) && <EmptyCart />}
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
