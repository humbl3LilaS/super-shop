import type { Metadata } from "next";
import { redirect } from "next/navigation";

import { auth } from "@/auth";
import CheckoutSteps from "@/components/shared/checkout-steps";
import { getCart } from "@/features/cart/actions/get-cart";
import { getUserById } from "@/lib/actions/get-user-by-id";
import { address } from "@/prisma/lib/validators/helpers";

export const metadata: Metadata = {
    title: "Place Order | SuperStore",
    description: "Place an order to complete the checkout process.",
    metadataBase: new URL(process.env.NEXT_PUBLIC_ENDPOINT!),
};

const PlaceOrderPage = async () => {
    const cart = await getCart();
    if (!cart || cart.items.length === 0) {
        return redirect("/cart");
    }

    const session = await auth();
    if (!session) {
        return redirect("/sign-in");
    }

    const user = await getUserById(session.user.id);
    if (!user) {
        return redirect("/sign-in");
    }

    const parsedAddress = address.safeParse(user.address);
    if (!parsedAddress.success) {
        return redirect("/shipping-address");
    }

    if (!user.paymentMethod) {
        return redirect("/payment-method");
    }

    return (
        <section>
            <CheckoutSteps currentStep={"place-order"} />
            <div>Place Order</div>
        </section>
    );
};

export default PlaceOrderPage;
