import { UserRole } from "@/database/schema";

declare module "next-auth" {
    interface User {
        role: UserRole;
    }
    interface Session {
        user: {
            id: string;
            name: string;
            email: string;
        };
    }
    interface JWT {
        id: string;
        name: string;
        email: string;
    }
}
