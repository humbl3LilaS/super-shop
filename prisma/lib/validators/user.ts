import * as z from "zod";

import * as imports from "./helpers";

import {
    CompleteAccount,
    RelatedAccountModelSchema,
    CompleteSession,
    RelatedSessionModelSchema,
    CompleteCart,
    RelatedCartModelSchema,
    CompleteOrder,
    RelatedOrderModelSchema,
} from "./index";

// Helper schema for JSON fields
type Literal = boolean | number | string;
type Json = Literal | { [key: string]: Json } | Json[];
const literalSchema = z.union([z.string(), z.number(), z.boolean()]);
const jsonSchema: z.ZodSchema<Json> = z.lazy(() =>
    z.union([literalSchema, z.array(jsonSchema), z.record(jsonSchema)]),
);

export const UserModelSchema = z.object({
    id: z.string(),
    name: z.string(),
    email: z.string(),
    emailVerified: z.date().nullish(),
    image: z.string().nullish(),
    role: z.string(),
    password: z.string().nullish(),
    address: imports.address,
    paymentMethod: z.string().nullish(),
    createdAt: z.date(),
    updatedAt: z.date(),
});

export interface CompleteUser extends z.infer<typeof UserModelSchema> {
    accounts: CompleteAccount[];
    Session: CompleteSession[];
    cart: CompleteCart[];
    Order: CompleteOrder[];
}

/**
 * RelatedUserModelSchema contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedUserModelSchema: z.ZodSchema<CompleteUser> = z.lazy(() =>
    UserModelSchema.extend({
        accounts: RelatedAccountModelSchema.array(),
        Session: RelatedSessionModelSchema.array(),
        cart: RelatedCartModelSchema.array(),
        Order: RelatedOrderModelSchema.array(),
    }),
);
