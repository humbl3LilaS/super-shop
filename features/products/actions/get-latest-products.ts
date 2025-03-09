"use server";

import { db } from "@/database/drizzle";
import { products } from "@/database/schema";

export const getLatestProducts = async () => {
    const latestProducts = await db.select().from(products).limit(4);
    if (!latestProducts) {
        return [];
    }
    return latestProducts;
};
