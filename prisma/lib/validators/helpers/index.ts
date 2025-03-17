import { z } from "zod";

import { PAYMENT_METHODS } from "@/lib/constants";

export * from "./address";
export * from "./cartItem";
export * from "./currency";

export const paymentMethod = z.string().refine((data) => PAYMENT_METHODS.includes(data));
