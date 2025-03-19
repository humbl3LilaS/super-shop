"use server";

import { prisma } from "@/prisma/lib/prisma";

export const getOrderById = async (orderId: string) => {
    try {
        const order = await prisma.order.findFirst({
            where: { id: orderId },
            include: {
                OrderItem: { include: { product: true } },
                user: { select: { name: true, email: true } },
            },
        });
        if (!order) {
            return undefined;
        }
        return order;
    } catch (error) {
        console.log(error);
    }
};
