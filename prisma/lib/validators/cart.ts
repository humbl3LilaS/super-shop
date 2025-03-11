import * as z from "zod"
import * as imports from "./helpers"
import { Decimal } from "decimal.js"
import { CompleteUser, RelatedUserModelSchema } from "./index"

// Helper schema for JSON fields
type Literal = boolean | number | string
type Json = Literal | { [key: string]: Json } | Json[]
const literalSchema = z.union([z.string(), z.number(), z.boolean()])
const jsonSchema: z.ZodSchema<Json> = z.lazy(() => z.union([literalSchema, z.array(jsonSchema), z.record(jsonSchema)]))

// Helper schema for Decimal fields
z
  .instanceof(Decimal)
  .or(z.string())
  .or(z.number())
  .refine((value) => {
    try {
      return new Decimal(value)
    } catch (error) {
      return false
    }
  })
  .transform((value) => new Decimal(value))

export const CartModelSchema = z.object({
  id: z.string(),
  userId: z.string().nullish(),
  sessionCartId: z.string(),
  items: imports.cartItem.array(),
  itemsPrice: imports.currency,
  totalPrice: imports.currency,
  shippingFee: imports.currency,
  tax: imports.currency,
  createdAt: z.date(),
})

export interface CompleteCart extends z.infer<typeof CartModelSchema> {
  user?: CompleteUser | null
}

/**
 * RelatedCartModelSchema contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedCartModelSchema: z.ZodSchema<CompleteCart> = z.lazy(() => CartModelSchema.extend({
  user: RelatedUserModelSchema.nullish(),
}))
