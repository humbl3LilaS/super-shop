import { PrismaAdapter } from "@auth/prisma-adapter";
import { compare } from "bcryptjs";
import NextAuth, { User } from "next-auth";
import CredentialProvider from "next-auth/providers/credentials";

import { signInSchema } from "@/lib/validators";
import { prisma } from "@/prisma/lib/prisma";

export const { handlers, signIn, signOut, auth } = NextAuth({
    pages: {
        signIn: "/sign-in",
    },
    session: {
        strategy: "jwt",
        maxAge: 24 * 60 * 60,
    },
    adapter: PrismaAdapter(prisma),
    providers: [
        CredentialProvider({
            credentials: {
                email: { type: "string" },
                password: { type: "password" },
            },
            async authorize(credentials) {
                if (credentials === null) return null;

                // check if the valid import
                const result = signInSchema.safeParse(credentials);
                if (!result.success) {
                    return null;
                }
                const user = await prisma.user.findFirst({
                    where: { email: result.data.email },
                });

                if (!user || !user.password) {
                    return null;
                }

                const isValid = await compare(result.data.password, user.password);

                if (!isValid) return null;

                return {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    role: user.role,
                } as User;
            },
        }),
    ],
    callbacks: {
        async session({ session, user, trigger, token }) {
            if (trigger === "update") {
                session.user.name = user.name!;
            }
            if (token.sub) {
                session = {
                    ...session,
                    user: {
                        ...session.user,
                        id: token.sub!,
                        name: token.name as string,
                        role: token.role as "USER" | "ADMIN",
                    },
                };
            }
            return session;
        },
        async jwt({ token, user }) {
            if (user) {
                token.email = user.email;
                token.role = user.role!;
            }

            if (user && user.name == "NO_NAME") {
                token.name = user.email!.split("@")[0];

                await prisma.user.update({
                    where: { id: user.id },
                    data: { name: token.name },
                });
            }
            return token;
        },
    },
});
