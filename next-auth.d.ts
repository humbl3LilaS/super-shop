declare module "next-auth" {
    interface User {
        role: "USER" | "ADMIN";
    }

    interface Session {
        user: {
            id: string;
            name: string;
            role: "USER" | "ADMIN";
            email: string;
        };
    }

    interface JWT {
        id: string;
        name: string;
        role: "USER" | "ADMIN";
        email: string;
    }
}
