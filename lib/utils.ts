import { clsx, type ClassValue } from "clsx";
import CryptoJS from "crypto-js";
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

export const encrypt = (data: object) => {
    const res = CryptoJS.AES.encrypt(
        JSON.stringify(data),
        process.env.NEXT_PUBLIC_CRYPTO_SECRET!,
    ).toString();
    console.log(res);
    return res;
};

export const decrypt = (data: string | null) => {
    if (!data) return null;
    try {
        const bytes = CryptoJS.AES.decrypt(data, process.env.NEXT_PUBLIC_CRYPTO_SECRET!);
        const json = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
        return json;
    } catch (error) {
        console.log("Decryption Error", error);
        return null;
    }
};
