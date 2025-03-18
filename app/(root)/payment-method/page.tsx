import type { Metadata } from "next";
import { redirect } from "next/navigation";

import { auth } from "@/auth";
import CheckoutSteps from "@/components/shared/checkout-steps";
import PaymentMethodForm from "@/features/checkout-flow/components/payment-method-form";
import { getUserById } from "@/lib/actions/get-user-by-id";

export const metadata: Metadata = {
    title: "Payment Method | SuperStore",
    description: "Select Your Preferred Payment Method",
    metadataBase: new URL(process.env.NEXT_PUBLIC_ENDPOINT!),
};

const PaymentMethodPage = async () => {
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
    return (
        <section>
            <CheckoutSteps currentStep={"payment-method"} />
            <div className={"max-w-xl mx-auto my-8 "}>
                <header className={"mb-8"}>
                    <h1 className={"h2-bold mb-3"}>Payment Method</h1>
                    <p className={"text-sm text-muted-foreground"}>
                        Please Select Your Preferred Payment Method
                    </p>
                </header>
                <PaymentMethodForm preferredMethod={user.paymentMethod} />
            </div>
        </section>
    );
};

export default PaymentMethodPage;
