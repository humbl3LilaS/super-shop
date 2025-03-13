"use server";

import { prisma } from "@/prisma/lib/prisma";

export const getUserById = async (id: string) => {
    const user = await prisma.user.findFirst({
        where: { id },
    });
    if (!user) {
        return undefined;
    }
    return user;
};
