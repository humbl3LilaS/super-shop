"use server";
import { cookies } from "next/headers";

import { auth } from "@/auth";
import { prisma } from "@/prisma/lib/prisma";

export const getCart = async () => {
    const sessionCartId = (await cookies()).get("sessionCartId")?.value as string;
    if (!sessionCartId) {
        throw new Error("Cart Session not found.");
    }

    const session = await auth();
    const cart = await prisma.cart.findFirst({
        where: session?.user.id ? { userId: session?.user.id } : { sessionCartId: sessionCartId },
    });

    if (!cart) {
        return undefined;
    }

    return cart;
};
