import { ArrowRight } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { formatCurrency } from "@/lib/utils";
import { ICart } from "@/prisma/lib/validators/validators.type";

const CartSummary = ({ cart }: { cart: ICart }) => {
    const totalQty = cart.items.reduce((acc, item) => acc + item.qty, 0);
    return (
        <Card className={"h-fit p-4  md:col-span-2 lg:col-span-1"}>
            <CardContent className={"p-0 flex flex-col gap-y-4"}>
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
                <Button asChild={true}>
                    <Link
                        href={`/shipping-address`}
                        className={"flex justify-between items-center"}
                    >
                        <ArrowRight />
                        <span>Checkout</span>
                    </Link>
                </Button>
            </CardContent>
        </Card>
    );
};

export default CartSummary;
