import { compare } from "bcryptjs";
import { eq } from "drizzle-orm";
import NextAuth, { User } from "next-auth";
import CredentialProvider from "next-auth/providers/credentials";

import { IUserRole, users } from "@/database/schema";

import { db } from "./database/drizzle";

export const { handlers, signIn, signOut, auth } = NextAuth({
    session: {
        strategy: "jwt",
        maxAge: 24 * 60 * 60,
    },
    providers: [
        CredentialProvider({
            credentials: { email: { type: "string" }, password: { type: "string" } },
            async authorize(credentials) {
                if (!credentials.email || !credentials.password) {
                    return null;
                }
                const [user] = await db
                    .select()
                    .from(users)
                    .where(eq(users.email, credentials.email.toString()));

                if (!user) {
                    return null;
                }

                const isPasswordCorrect = await compare(
                    credentials.password.toString(),
                    user.password,
                );
                if (!isPasswordCorrect) {
                    return null;
                }

                return {
                    id: user.id,
                    email: user.email,
                    name: user.name,
                    role: user.role,
                } as User;
            },
        }),
    ],
    pages: {
        signIn: `${process.env.NEXT_PUBLIC_ENDPOINT}/sign-in`,
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
                token.email = user.email;
                token.role = user.role;
            }
            return token;
        },
        async session({ session, token }) {
            if (token.id) {
                session = {
                    ...session,
                    user: {
                        ...session.user,
                        id: token.id.toString(),
                        name: token.name as string,
                        role: token.role as IUserRole,
                    },
                };
            }
            return session;
        },
    },
});
