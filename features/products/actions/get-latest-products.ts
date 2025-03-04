"use server";

import { desc } from "drizzle-orm";

import { db } from "@/database/drizzle";
import { products } from "@/database/schema";

export const getLatestProducts = async () => {
    const latestProducts = await db
        .select()
        .from(products)
        .limit(4)
        .orderBy(desc(products.createdAt));
    if (!latestProducts) {
        return [];
    }
    return latestProducts;
};
