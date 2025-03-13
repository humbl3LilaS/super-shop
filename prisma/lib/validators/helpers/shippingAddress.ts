import { z } from "zod";

export const shippingAddress = z.object({
    fullName: z.string().min(3, { message: "Name must be at least 3 characters" }),
    street: z.string().min(3, { message: "Street must be at least 3 characters" }),
    city: z.string().min(3, { message: "City must be at least 3 characters" }),
    postalCode: z.string().min(5, { message: "Postal code must be at least 5 characters" }),
    country: z.string().min(3, { message: "Country must be at least 3 characters" }),
    lat: z.number().optional(),
    lng: z.number().optional(),
});

export type ShippingAddress = Zod.infer<typeof shippingAddress>;
