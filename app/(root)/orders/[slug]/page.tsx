import { notFound } from "next/navigation";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import CartSummary from "@/features/cart/components/cart-summary";
import OrderItemsInfo from "@/features/checkout-flow/components/order-items-info";
import { getOrderById } from "@/features/orders/actions/get-order-by-id";
import { formatDate, formatUUID } from "@/lib/utils";

const OrderDetailPage = async ({ params }: { params: Promise<{ slug: string }> }) => {
    const { slug } = await params;

    const order = await getOrderById(slug);

    if (!order) {
        return notFound();
    }

    const orderItems = order.OrderItem.map((item) => ({
        qty: item.qty,
        name: item.product.name,
        slug: item.product.slug,
        price: item.product.price,
        image: item.product.images[0],
        productId: item.product.id,
    }));
    const totalQty = orderItems.reduce((acc, item) => acc + item.qty, 0);
    return (
        <section>
            <h1 className={"py-4 text-2xl"}>Order {formatUUID(order.id)}</h1>
            <div className={"grid  md:grid-cols-3 gap-x-4"}>
                <div className="space-y-4 overflow-x-auto md:col-span-2">
                    <Card className={"gap-4"}>
                        <CardHeader>
                            <h2>Payment Method</h2>
                        </CardHeader>
                        <CardContent>
                            <p className={"mb-2 capitalize"}>{order.paymentMethod}</p>
                            {order.isPaid && order.paidAt ? (
                                <Badge>{formatDate(order.paidAt, "DATE_ONLY")}</Badge>
                            ) : (
                                <Badge variant={"destructive"}>Not Paid</Badge>
                            )}
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <h2 className={"text-xl"}>Shipping Address</h2>
                        </CardHeader>
                        <CardContent className={"flex flex-col gap-y-2"}>
                            <p>{order.user.name}</p>
                            <p>
                                {order.shippingAddress.address}, {order.shippingAddress.city},
                                <br />
                                {order.shippingAddress.region}, {order.shippingAddress.country}
                            </p>
                            {order.isDelivered && order.deliveredAt ? (
                                <Badge>{formatDate(order.deliveredAt)}</Badge>
                            ) : (
                                <Badge variant={"destructive"}>Not Delivered</Badge>
                            )}
                        </CardContent>
                    </Card>
                    <OrderItemsInfo data={orderItems} />
                </div>

                <Card className={"h-fit"}>
                    <CardContent className={"flex flex-col gap-y-3"}>
                        <CartSummary
                            data={{
                                totalQty,
                                itemsPrice: order.itemsPrice,
                                tax: order.tax,
                                shippingFee: order.shippingFee,
                                totalPrice: order.totalPrice,
                            }}
                        />
                    </CardContent>
                </Card>
            </div>
        </section>
    );
};

export default OrderDetailPage;
