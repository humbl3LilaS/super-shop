import NextAuth from "next-auth";

import { IUserRole } from "@/database/schema";

declare module "next-auth" {
    interface User {
        role: IUserRole;
    }

    interface Session {
        user: {
            id: string;
            name: string;
            role: IUserRole;
            email: string;
        };
    }

    interface JWT {
        id: string;
        name: string;
        role: IUserRole;
        email: string;
    }
}
