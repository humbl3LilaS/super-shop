import { Decimal } from "decimal.js";
import * as z from "zod";

import * as imports from "./helpers";

import { CompleteOrderItem, RelatedOrderItemModelSchema } from "./index";

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

export interface CompleteProduct extends z.infer<typeof ProductModelSchema> {
    OrderItem: CompleteOrderItem[];
}

/**
 * RelatedProductModelSchema contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedProductModelSchema: z.ZodSchema<CompleteProduct> = z.lazy(() =>
    ProductModelSchema.extend({
        OrderItem: RelatedOrderItemModelSchema.array(),
    }),
);
