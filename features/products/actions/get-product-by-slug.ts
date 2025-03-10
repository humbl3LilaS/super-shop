"use server";

import { prisma } from "@/prisma/lib/prisma";

export const getProductBySlug = async (slug: string) => {
    const data = await prisma.product.findFirst({
        where: { slug: slug },
    });

    if (!data) {
        return undefined;
    }

    return data;
};
