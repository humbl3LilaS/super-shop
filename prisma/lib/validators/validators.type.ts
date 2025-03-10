import { ProductModel } from "@/prisma/lib/validators/product";

export type IProduct = Zod.infer<typeof ProductModel>;
