import { CompleteCart } from "@/prisma/lib/validators/cart";
import { ProductModelSchema } from "@/prisma/lib/validators/product";

export type IProduct = Zod.infer<typeof ProductModelSchema>;
export type ICart = Omit<CompleteCart, "id" | "createdAt">;
