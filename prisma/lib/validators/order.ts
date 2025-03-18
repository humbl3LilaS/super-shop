import { Decimal } from "decimal.js";
import * as z from "zod";

import * as imports from "./helpers";

import {
    CompleteUser,
    RelatedUserModelSchema,
    CompleteOrderItem,
    RelatedOrderItemModelSchema,
} from "./index";

// Helper schema for JSON fields
type Literal = boolean | number | string;
type Json = Literal | { [key: string]: Json } | Json[];
const literalSchema = z.union([z.string(), z.number(), z.boolean()]);
const jsonSchema: z.ZodSchema<Json> = z.lazy(() =>
    z.union([literalSchema, z.array(jsonSchema), z.record(jsonSchema)]),
);

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

export const OrderModelSchema = z.object({
    id: z.string(),
    userId: z.string(),
    shippingAddress: imports.address,
    paymentMethod: imports.paymentMethod,
    paymentResult: jsonSchema,
    itemsPrice: imports.currency,
    shippingFee: imports.currency,
    tax: imports.currency,
    totalPrice: imports.currency,
    isPaid: z.boolean(),
    isDelivered: z.boolean(),
    paidAt: z.string().min(1).nullish(),
    deliveredAt: z.string().min(1).nullish(),
    createdAt: z.string().min(1),
});

export interface CompleteOrder extends z.infer<typeof OrderModelSchema> {
    user: CompleteUser;
    OrderItem: CompleteOrderItem[];
}

/**
 * RelatedOrderModelSchema contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedOrderModelSchema: z.ZodSchema<CompleteOrder> = z.lazy(() =>
    OrderModelSchema.extend({
        user: RelatedUserModelSchema,
        OrderItem: RelatedOrderItemModelSchema.array(),
    }),
);
