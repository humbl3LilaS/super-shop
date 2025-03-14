import { z } from "zod";

export const address = z.object({
    region: z.string(),
    city: z.string(),
    address: z.string(),
    postalCode: z.string(),
    country: z.string(),
});

export type IAddress = Zod.infer<typeof address>;
