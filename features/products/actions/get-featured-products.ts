"use server";

import { prisma } from "@/prisma/lib/prisma";
import { IProduct } from "@/prisma/lib/validators/validators.type";

export const getFeaturedProducts = async (): Promise<IProduct[] | undefined> => {
    const data = await prisma.product.findMany({
        take: 4,
        orderBy: { createdAt: "desc" },
    });

    if (!data) {
        return undefined;
    }

    return data;
};
