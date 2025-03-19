import { formatCurrency } from "@/lib/utils";

type CartSummaryProps = {
    data: {
        itemsPrice: string;
        totalQty: number;
        shippingFee: string;
        tax: string;
        totalPrice: string;
    };
};

const CartSummary = ({ data }: CartSummaryProps) => {
    return (
        <>
            <p className={"flex items-center justify-between font-semibold"}>
                <span className={"text-muted-foreground"}>Total Price:</span>
                <span>{formatCurrency(data.itemsPrice)}</span>
            </p>
            <p className={"flex items-center justify-between font-semibold"}>
                <span className={"text-muted-foreground"}>Total Qty:</span>
                <span>{data.totalQty}</span>
            </p>
            <p className={"flex items-center justify-between font-semibold"}>
                <span className={"text-muted-foreground"}>Shipping Fee:</span>
                <span>{formatCurrency(data.shippingFee)}</span>
            </p>
            <p className={"flex items-center justify-between font-semibold"}>
                <span className={"text-muted-foreground"}>Tax:</span>
                <span>{formatCurrency(data.tax)}</span>
            </p>
            <p className={"flex items-center justify-between font-semibold"}>
                <span>Sub Total:</span>
                <span>{formatCurrency(data.totalPrice)}</span>
            </p>
        </>
    );
};

export default CartSummary;
