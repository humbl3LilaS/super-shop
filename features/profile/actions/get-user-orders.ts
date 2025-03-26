"use server";

import { auth } from "@/auth";
import { sleep } from "@/lib/utils";
import { prisma } from "@/prisma/lib/prisma";

export const getUserOrders = async (page?: number) => {
    await sleep(4000);
    const offset = ((page ?? 1) - 1) * 5;
    const session = await auth();
    if (!session) {
        throw new Error("Unauthorized Request");
    }
    const data = await prisma.order.findMany({
        where: { userId: session.user.id },
        orderBy: { createdAt: "desc" },
        take: 5,
        skip: offset,
    });

    const dataCount = await prisma.order.count({
        where: { userId: session.user.id },
    });

    return {
        success: true,
        data,
        totalPages: Math.ceil(dataCount / 5),
    };
};
