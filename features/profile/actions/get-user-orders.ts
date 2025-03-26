"use server";

import { auth } from "@/auth";
import { prisma } from "@/prisma/lib/prisma";

export const getUserOrders = async (page?: number, limit?: number) => {
    const offset = ((page ?? 1) - 1) * (limit ?? 5);
    const session = await auth();
    if (!session) {
        throw new Error("Unauthorized Request");
    }
    const data = await prisma.order.findMany({
        where: { userId: session.user.id },
        orderBy: { createdAt: "desc" },
        take: limit ?? 5,
        skip: offset,
    });

    const dataCount = await prisma.order.count({
        where: { userId: session.user.id },
    });

    return {
        data,
        totalPages: Math.ceil(dataCount / (limit ?? 5)),
    };
};
