"use server";
import { eq } from "drizzle-orm";

import { db } from "@/database/drizzle";
import { products } from "@/database/schema";

export const getProductBySlug = async (slug: string) => {
    const [data] = await db.select().from(products).where(eq(products.slug, slug));
    if (!data) {
        return undefined;
    }
    return data;
};
