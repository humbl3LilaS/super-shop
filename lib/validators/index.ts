import { z } from "zod";

import { PAYMENT_METHODS } from "@/lib/constants";
import { toDecimal } from "@/lib/utils";

export const currency = z
    .string()
    .refine((value) => /^\d+(\.\d{2})?$/.test(toDecimal(Number(value))), {
        message: "Price must have exactly two decimal places",
    });

export const signInSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8),
});
export type SignInSchema = Zod.infer<typeof signInSchema>;

export const signUpSchema = z
    .object({
        name: z.string().min(3, "Name must be at least 3 characters"),
        email: z.string().email("Invalid email address"),
        password: z.string().min(6, "Password must be at least 6 characters"),
        confirmPassword: z.string().min(6, "Confirm password must be at least 6 characters"),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords don't match",
        path: ["confirmPassword"],
    });

export type SignUpSchema = Zod.infer<typeof signUpSchema>;

export const shippingAddressFormSchema = z.object({
    fullName: z.string().min(3, { message: "Name must be at least 3 characters" }),
    address: z.string().min(3, { message: "Street must be at least 3 characters" }),
    city: z.string().min(3, { message: "City must be at least 3 characters" }),
    region: z.string().min(3, { message: "Region must be at least 3 characters" }),
    postalCode: z.string().min(5, { message: "Postal code must be at least 5 characters" }),
    country: z.string().min(3, { message: "Country must be at least 3 characters" }),
    lat: z.number().optional(),
    lng: z.number().optional(),
});

export type IShippingAddressForm = Zod.infer<typeof shippingAddressFormSchema>;

export const paymentMethodFormSchema = z.object({
    paymentMethod: z
        .string()
        .min(1)
        .refine((x) => PAYMENT_METHODS.includes(x)),
});

export const profileUpdateSchema = z.object({
    email: z.string().email(),
    name: z.string().min(3, { message: "Username must be at least 3 characters" }),
});

export type ProfileUpdateSchema = Zod.infer<typeof profileUpdateSchema>;
