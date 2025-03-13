import type { Metadata } from "next";

import { getCart } from "@/features/cart/actions/get-cart";
import CartTable from "@/features/cart/components/cart-table";

export const metadata: Metadata = {
    title: "Cart | SuperStore",
    description: "Checkout the items in you cart",
    metadataBase: new URL(process.env.NEXT_PUBLIC_ENDPOINT!),
};

const CartPage = async () => {
    const cart = await getCart();
    return (
        <section>
            <CartTable cart={JSON.parse(JSON.stringify(cart))} />
        </section>
    );
};

export default CartPage;
