import { ArrowRight, ShoppingCart } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { getCart } from "@/features/cart/actions/get-cart";
import CartSummary from "@/features/cart/components/cart-summary";
import CartTable from "@/features/cart/components/cart-table";
import EmptyCart from "@/features/cart/components/empty-cart";

export const metadata: Metadata = {
    title: "User Profile",
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
                    <Card className={"h-fit p-4  md:col-span-2 lg:col-span-1"}>
                        <CardContent className={"p-0 flex flex-col gap-y-4"}>
                            <CartSummary
                                data={{
                                    totalPrice: cart.totalPrice,
                                    tax: cart.tax,
                                    shippingFee: cart.shippingFee,
                                    itemsPrice: cart.itemsPrice,
                                    totalQty: cart.items.reduce(
                                        (total, item) => total + item.qty,
                                        0,
                                    ),
                                }}
                            />
                            <Button asChild={true}>
                                <Link
                                    href={`/shipping-address`}
                                    className={"flex justify-between items-center"}
                                >
                                    <ArrowRight />
                                    <span>Checkout</span>
                                </Link>
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            )}
        </section>
    );
};

export default CartPage;
