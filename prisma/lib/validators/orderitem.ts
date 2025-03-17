import * as z from "zod";

import {
    CompleteOrder,
    RelatedOrderModelSchema,
    CompleteProduct,
    RelatedProductModelSchema,
} from "./index";

export const OrderItemModelSchema = z.object({
    orderId: z.string(),
    productId: z.string(),
    qty: z.number().int(),
});

export interface CompleteOrderItem extends z.infer<typeof OrderItemModelSchema> {
    order: CompleteOrder;
    product: CompleteProduct;
}

/**
 * RelatedOrderItemModelSchema contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedOrderItemModelSchema: z.ZodSchema<CompleteOrderItem> = z.lazy(() =>
    OrderItemModelSchema.extend({
        order: RelatedOrderModelSchema,
        product: RelatedProductModelSchema,
    }),
);
