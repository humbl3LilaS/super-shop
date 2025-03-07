"use server";

import { hash } from "bcryptjs";
import { eq } from "drizzle-orm";

import { db } from "@/database/drizzle";
import { UserInsertSchema, users } from "@/database/schema";
import { Cause, signInWithCredential } from "@/features/sign-in/actions/sign-in-action";

export const signUp = async (
    payload: UserInsertSchema,
): Promise<{ success: true } | { success: false; cause: Cause }> => {
    try {
        const [existingUser] = await db.select().from(users).where(eq(users.email, payload.email));
        if (existingUser) {
            return {
                success: false,
                cause: {
                    reason: "User already exists",
                },
            };
        }
        const hashedPassword = await hash(payload.password, 10);
        const [new_user] = await db
            .insert(users)
            .values({ ...payload, password: hashedPassword })
            .returning();
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
