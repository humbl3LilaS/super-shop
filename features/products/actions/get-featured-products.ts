"use server";

import { PrismaClient } from "@prisma/client";

import { IProduct } from "@/prisma/lib/validators/validators.type";

export const getFeaturedProducts = async (): Promise<IProduct[] | undefined> => {
    const prisma = new PrismaClient();

    const data = await prisma.product.findMany({
        take: 4,
        orderBy: { createdAt: "desc" },
    });

    if (!data) {
        return undefined;
    }

    return data.map((item) => ({
        ...item,
        price: item.price.toString(),
        rating: item.rating.toString(),
    }));
};
