import { ProductModelSchema } from "@/prisma/lib/validators/product";

export type IProduct = Zod.infer<typeof ProductModelSchema>;
