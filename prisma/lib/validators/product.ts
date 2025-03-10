import * as z from "zod"
import * as imports from "../../null"
import { Decimal } from "decimal.js"

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

export const ProductModel = z.object({
  id: z.string(),
  name: z.string(),
  slug: z.string(),
  category: z.string(),
  images: z.string().array(),
  brand: z.string(),
  description: z.string(),
  stock: z.number().int(),
  price: z.number(),
  rating: z.number(),
  numReviews: z.number().int(),
  isFeatured: z.boolean(),
  banner: z.string().nullish(),
  createdAt: z.date(),
})
