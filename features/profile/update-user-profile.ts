"use server";

import { auth } from "@/auth";
import { ProfileUpdateSchema } from "@/lib/validators";
import { prisma } from "@/prisma/lib/prisma";

export const updateUserProfile = async (pyload: Partial<ProfileUpdateSchema>) => {
    try {
        const session = await auth();
        if (!session) {
            return {
                success: false,
                message: "Unauthorized Request",
            };
        }
        const updatedProfile = await prisma.user.update({
            where: { id: session.user.id },
            data: {
                ...pyload,
            },
        });
        if (!updatedProfile) {
            return {
                success: false,
                message: "Error Updating Profile",
            };
        }

        return {
            success: true,
            message: "Updated Profile",
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
            message: "Error updating profile",
        };
    }
};
