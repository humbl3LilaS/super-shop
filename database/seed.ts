import { hash } from "bcryptjs";

import { db } from "@/database/drizzle";
import { IUserRole, products, users } from "@/database/schema";
import { SAMPLE_DATA, SAMPLE_USER } from "@/lib/constants";

const main = async () => {
    await db.delete(users);
    await db.delete(products);
    // seed products
    const newProductPromise = SAMPLE_DATA.map(async (item) => {
        return db.insert(products).values(item);
    });

    await Promise.all(newProductPromise);

    const newUserPromises = SAMPLE_USER.map(async (user) => {
        const hashedPassword = await hash(user.password, 10);
        return db.insert(users).values({
            ...user,
            role: user.role as IUserRole,
            password: hashedPassword,
        });
    });

    await Promise.all(newUserPromises);
};

try {
    console.log("Seeding....");
    await main();
    console.log("Seeding Completed");
} catch (error) {
    console.error(error);
}
