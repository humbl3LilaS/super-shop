import { CompleteCart } from "@/prisma/lib/validators/cart";
import { OrderModelSchema } from "@/prisma/lib/validators/order";
import { OrderItemModelSchema } from "@/prisma/lib/validators/orderitem";
import { ProductModelSchema } from "@/prisma/lib/validators/product";

export type IProduct = Zod.infer<typeof ProductModelSchema>;
export type ICart = Omit<CompleteCart, "id" | "createdAt">;
export type IOrder = Zod.infer<typeof OrderModelSchema>;
export type IOrderItem = Zod.infer<typeof OrderItemModelSchema>;
