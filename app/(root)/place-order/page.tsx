import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Place Order | SuperStore",
    description: "Place an order to complete the checkout process.",
    metadataBase: new URL(process.env.NEXT_PUBLIC_ENDPOINT!),
};

const PlaceOrderPage = () => {
    return <div>Place Order Page</div>;
};

export default PlaceOrderPage;
