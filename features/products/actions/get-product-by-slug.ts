"use server";

import { PrismaClient } from "@prisma/client";

export const getProductBySlug = async (slug: string) => {
    const prisma = new PrismaClient();
    const data = await prisma.product.findFirst({
        where: { slug: slug },
    });

    if (!data) {
        return undefined;
    }

    return {
        ...data,
        price: data.price.toString(),
        rating: data.rating.toString(),
    };
};
