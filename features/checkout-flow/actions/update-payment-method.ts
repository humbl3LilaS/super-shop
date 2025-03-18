"use server";

import { auth } from "@/auth";
import { prisma } from "@/prisma/lib/prisma";

export const updatePaymentMethod = async (newMethod: string) => {
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
                paymentMethod: newMethod,
            },
        });

        return {
            success: true,
            message: "Payment method Updated",
        };
    } catch (error) {
        if (error instanceof Error) {
            return {
                success: false,
                message: error.message,
            };
        }
        return {
            success: false,
            message: "Error Updating Payment Method",
        };
    }
};
