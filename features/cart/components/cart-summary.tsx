import { formatCurrency } from "@/lib/utils";
import { ICart } from "@/prisma/lib/validators/validators.type";

const CartSummary = ({ cart }: { cart: ICart }) => {
    const totalQty = cart.items.reduce((acc, item) => acc + item.qty, 0);
    return (
        <>
            <p className={"flex items-center justify-between font-semibold"}>
                <span className={"text-muted-foreground"}>Total Price:</span>
                <span>{formatCurrency(cart.itemsPrice)}</span>
            </p>
            <p className={"flex items-center justify-between font-semibold"}>
                <span className={"text-muted-foreground"}>Total Qty:</span>
                <span>{totalQty}</span>
            </p>
            <p className={"flex items-center justify-between font-semibold"}>
                <span className={"text-muted-foreground"}>Shipping Fee:</span>
                <span>{formatCurrency(cart.shippingFee)}</span>
            </p>
            <p className={"flex items-center justify-between font-semibold"}>
                <span className={"text-muted-foreground"}>Tax:</span>
                <span>{formatCurrency(cart.tax)}</span>
            </p>
            <p className={"flex items-center justify-between font-semibold"}>
                <span>Sub Total:</span>
                <span>{formatCurrency(cart.totalPrice)}</span>
            </p>
        </>
    );
};

export default CartSummary;
