"use server";

import { cookies } from "next/headers";

import { signOut } from "@/auth";

export const signOutUser = async () => {
    const cookiesObject = await cookies();
    const sessionCartId = crypto.randomUUID();
    cookiesObject.set("sessionCartId", sessionCartId);
    await signOut();
};
