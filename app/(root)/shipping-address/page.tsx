import { redirect } from "next/navigation";

import { auth } from "@/auth";
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
    return <div>Shipping</div>;
};

export default ShippingAddressPage;
