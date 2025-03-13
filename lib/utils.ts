import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const toDecimal = (num: number): string => {
    const [int, decimal] = num.toString().split(".");
    return decimal ? `${int}.${decimal.padEnd(2, "0")}` : `${int}.00`;
};

export const CURRENCY_FORMATTER = new Intl.NumberFormat("en-US", {
    currency: "USD",
    style: "currency",
    minimumFractionDigits: 2,
});

export const formatCurrency = (value: string | number) => {
    if (typeof value === "number") {
        return CURRENCY_FORMATTER.format(value);
    } else {
        return CURRENCY_FORMATTER.format(Number(value));
    }
};
