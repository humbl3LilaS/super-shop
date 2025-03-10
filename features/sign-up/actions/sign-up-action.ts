"use server";

import { hash } from "bcryptjs";

import { Cause, signInWithCredential } from "@/features/sign-in/actions/sign-in-action";
import { SignUpSchema } from "@/lib/validators";
import { prisma } from "@/prisma/lib/prisma";

export const signUp = async (
    payload: SignUpSchema,
): Promise<{ success: true } | { success: false; cause: Cause }> => {
    try {
        const existingUser = await prisma.user.findFirst({
            where: {
                email: payload.email,
            },
        });
        if (existingUser) {
            return {
                success: false,
                cause: {
                    reason: "User already exists",
                },
            };
        }
        const hashedPassword = await hash(payload.password, 10);

        const new_user = await prisma.user.create({
            data: {
                email: payload.email,
                name: payload.name,
                password: hashedPassword,
            },
        });

        if (!new_user) {
            return {
                success: false,
                cause: {
                    reason: "User Creation Failed",
                },
            };
        }
        await signInWithCredential({
            email: payload.email,
            password: payload.password,
        });
        return { success: true };
    } catch (e) {
        if (e instanceof Error) {
            return {
                success: false,
                cause: {
                    reason: e.message,
                },
            };
        }
        return {
            success: false,
            cause: {
                reason: "Error During SignIn Process",
            },
        };
    }
};
