import { z } from "zod";

import { toDecimal } from "@/lib/utils";

export const currency = z
    .string()
    .refine(
        (value) => /^\d+(\.\d{2})?$/.test(toDecimal(Number(value))),
        "Price must have exactly two decimal places",
    );
