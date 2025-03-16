"use server";

import { auth } from "@/auth";
import { prisma } from "@/prisma/lib/prisma";
import { IAddress } from "@/prisma/lib/validators/helpers";

export const updateShippingAddress = async (payload: IAddress) => {
    try {
        const session = await auth();
        if (!session) {
            return {
                success: false,
                message: "Unauthorized Request",
            };
        }

        await prisma.user.update({
            where: { id: session.user.id },
            data: {
                address: payload,
            },
        });

        return {
            success: true,
            message: "Successfully updated shipping address",
        };
    } catch (error) {
        console.log("Error Updating shipping address", error);
        if (error instanceof Error) {
            return {
                success: false,
                message: error.message,
            };
        }
        return {
            success: false,
            message: "Error Updating shipping address",
        };
    }
};
