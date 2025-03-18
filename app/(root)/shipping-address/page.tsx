import type { Metadata } from "next";
import { redirect } from "next/navigation";

import { auth } from "@/auth";
import CheckoutSteps from "@/components/shared/checkout-steps";
import { getCart } from "@/features/cart/actions/get-cart";
import ShippingAddressForm from "@/features/checkout-flow/components/shipping-address-form";
import { getUserById } from "@/lib/actions/get-user-by-id";

export const metadata: Metadata = {
    title: "Shipping Address | SuperStore",
    description: "Please Specify a shipping address to checkout the shipping",
    metadataBase: new URL(process.env.NEXT_PUBLIC_ENDPOINT!),
};

const ShippingAddressPage = async () => {
    const session = await auth();

    if (!session) {
        redirect(
            `/sign-in?callbackUrl=${encodeURIComponent(process.env.NEXT_PUBLIC_ENDPOINT! + "/shipping-address")}`,
        );
    }

    const user = await getUserById(session.user.id);
    if (!user) {
        redirect(
            `/sign-in?callbackUrl=${encodeURIComponent(process.env.NEXT_PUBLIC_ENDPOINT! + "/shipping-address")}`,
        );
    }

    const cart = await getCart();
    if (!cart || cart.items.length === 0) {
        redirect("/cart");
    }

    return (
        <section>
            <CheckoutSteps currentStep={"shipping-address"} />
            <div className={"max-w-xl mx-auto my-8 "}>
                <header className={"mb-8"}>
                    <h1 className={"h2-bold mb-3"}>Shipping Address</h1>
                    <p className={"text-sm text-muted-foreground"}>
                        Please enter an address to ship to
                    </p>
                </header>
                <ShippingAddressForm defaultValues={{ ...user.address, fullName: user.name }} />
            </div>
        </section>
    );
};

export default ShippingAddressPage;
