import { Decimal } from "decimal.js";
import * as z from "zod";

import * as imports from "./helpers";

// Helper schema for Decimal fields
z.instanceof(Decimal)
    .or(z.string())
    .or(z.number())
    .refine((value) => {
        try {
            return new Decimal(value);
        } catch (error) {
            return false;
        }
    })
    .transform((value) => new Decimal(value));

export const ProductModelSchema = z.object({
    id: z.string(),
    name: z.string(),
    slug: z.string(),
    category: z.string(),
    images: z.string().array(),
    brand: z.string(),
    description: z.string(),
    stock: z.number().int(),
    price: imports.currency,
    rating: imports.currency,
    numReviews: z.number().int(),
    isFeatured: z.boolean(),
    banner: z.string().nullish(),
    createdAt: z.date(),
});
