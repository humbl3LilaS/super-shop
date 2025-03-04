"use server";

import { PrismaClient } from "@prisma/client";

export const getLatestProducts = async () => {
    const prisma = new PrismaClient();

    const data = await prisma.product.findMany({
        take: 4,
        orderBy: {
            createdAt: "desc",
        },
    });

    if (!data) {
        return [];
    }

    return data;
};
