import { redirect } from "next/navigation";

import { auth } from "@/auth";
import { getCart } from "@/features/cart/actions/get-cart";
import ShippingAddressForm from "@/features/shipping-address/components/shipping-address-form";
import { getUserById } from "@/lib/actions/get-user-by-id";

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
            <div className={"max-w-lg mx-auto my-8 "}>
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
