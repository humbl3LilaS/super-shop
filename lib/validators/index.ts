import { z } from "zod";

import { toDecimal } from "@/lib/utils";

export const currency = z
    .string()
    .refine((value) => /^\d+(\.\d{2})?$/.test(toDecimal(Number(value))), {
        message: "Price must have exactly two decimal places",
    });

export const InsertProductSchema = z.object({
    name: z.string().min(3, { message: "Name must be at least 3 characters" }),
    slug: z.string().min(3, { message: "Slug must be at least 3 characters" }),
    category: z.string().min(3, { message: "Category must be at least 3 characters" }),
    brand: z.string().min(10, { message: "Brand must be at least 10 characters" }),
    description: z.string().min(20, { message: "Description must be at least 20 characters" }),
    stock: z.coerce.number(),
    numReviews: z.coerce.number(),
    images: z.string().array().min(1, { message: "Product must be at least 1 images" }),
    isFeatured: z.boolean(),
    banner: z.string().nullable(),
    price: currency,
});
