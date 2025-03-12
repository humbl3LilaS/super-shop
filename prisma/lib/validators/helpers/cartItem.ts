import { z } from "zod";

import { currency } from "@/prisma/lib/validators/helpers/currency";

export const cartItem = z.object({
    productId: z.string().min(1, { message: "Product is required" }),
    name: z.string().min(1, { message: "Name is required" }),
    slug: z.string().min(1, { message: "Slug is required" }),
    qty: z.number().int().nonnegative({ message: "Quantity must be a positive number" }),
    image: z.string().min(1, { message: "Image is required" }),
    price: currency,
});

export type CartItem = Zod.infer<typeof cartItem>;
