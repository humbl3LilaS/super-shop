import type { Metadata } from "next";
import { redirect } from "next/navigation";

import { auth } from "@/auth";
import CheckoutSteps from "@/components/shared/checkout-steps";
import { Card, CardContent } from "@/components/ui/card";
import { getCart } from "@/features/cart/actions/get-cart";
import CartSummary from "@/features/cart/components/cart-summary";
import OrderItemsInfo from "@/features/checkout-flow/components/order-items-info";
import PaymentMethodInfo from "@/features/checkout-flow/components/payment-method-info";
import PlaceOrderForm from "@/features/checkout-flow/components/place-order-form";
import ShippingAddressInfo from "@/features/checkout-flow/components/shipping-address-info";
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
            <CheckoutSteps currentStep={"place-order"} className={"max-w-full lg:px-16"} />
            <h1 className={"py-4 text-2xl"}>Place Order</h1>
            <div className={"grid md:grid-cols-2 lg:grid-cols-3 md:gap-5"}>
                <div className={"lg:col-span-2 flex flex-col gap-y-4"}>
                    <ShippingAddressInfo data={{ ...parsedAddress.data, fullName: user.name }} />
                    <PaymentMethodInfo preferredMethod={user.paymentMethod} />
                    <OrderItemsInfo data={cart} />
                </div>
                <div>
                    <Card>
                        <CardContent className={"flex flex-col gap-y-3"}>
                            <CartSummary cart={cart} />
                            <PlaceOrderForm />
                        </CardContent>
                    </Card>
                </div>
            </div>
        </section>
    );
};

export default PlaceOrderPage;
