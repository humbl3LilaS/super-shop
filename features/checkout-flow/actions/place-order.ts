"use server";

import { auth } from "@/auth";
import { getCart } from "@/features/cart/actions/get-cart";
import { getUserById } from "@/lib/actions/get-user-by-id";
import { prisma } from "@/prisma/lib/prisma";
import { OrderModelSchema } from "@/prisma/lib/validators";

const insertOrderSchema = OrderModelSchema.pick({
    userId: true,
    shippingAddress: true,
    paymentMethod: true,
    itemsPrice: true,
    shippingFee: true,
    tax: true,
    totalPrice: true,
});

export const placeOrder = async (): Promise<
    | { success: true; message: string; redirect: string }
    | {
          success: false;
          message: string;
          redirect?: string;
      }
> => {
    try {
        const session = await auth();
        if (!session) {
            return {
                success: false,
                message: "User is not authenticated",
                redirect: "/sign-in",
            };
        }

        const cart = await getCart();
        if (!cart || cart.items.length === 0) {
            return {
                success: false,
                message: "Associated Cart Not Found",
                redirect: "/cart",
            };
        }

        const user = await getUserById(session.user.id);

        if (!user) {
            return {
                success: false,
                message: "User not found",
                redirect: "/sign-in",
            };
        }

        if (!user.address) {
            return {
                success: false,
                message: "Shipping Address Not Found",
                redirect: "/shipping-address",
            };
        }

        if (!user.paymentMethod) {
            return {
                success: false,
                message: "Payment Method Not Found",
                redirect: "/payment-method",
            };
        }

        const orderPayload = insertOrderSchema.parse({
            userId: session.user.id,
            shippingAddress: user.address,
            itemsPrice: cart.itemsPrice,
            shippingFee: cart.shippingFee,
            tax: cart.tax,
            totalPrice: cart.totalPrice,
        });

        const newOrderId = await prisma.$transaction(async (tx) => {
            // Create order
            const newOrder = await tx.order.create({ data: orderPayload });

            // Create order-item
            const orderItemPromises = cart.items.map(async (item) =>
                tx.orderItem.create({
                    data: {
                        orderId: newOrder.id,
                        productId: item.productId,
                        qty: item.qty,
                    },
                }),
            );

            await Promise.all(orderItemPromises);

            await tx.cart.update({
                where: { id: cart.id },
                data: {
                    items: [],
                    totalPrice: 0,
                    tax: 0,
                    shippingFee: 0,
                    itemsPrice: 0,
                },
            });

            return newOrder.id;
        });

        if (!newOrderId) {
            return {
                success: false,
                message: "Order Creation Failed",
            };
        }

        return {
            success: true,
            message: "Order successfully placed",
            redirect: `/orders/${newOrderId}`,
        };
    } catch (error) {
        if (error instanceof Error) {
            return { success: false, message: error.message };
        }
        return {
            success: false,
            message: "Error Place Order",
        };
    }
};
