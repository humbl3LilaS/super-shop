import { PrismaClient } from "@prisma/client";
import { hashSync } from "bcryptjs";

import { SAMPLE_DATA, SAMPLE_USER } from "@/lib/constants";

const prisma = new PrismaClient();

async function cleanUp() {
    console.log("Cleaning up");
    await prisma.product.deleteMany();
    await prisma.account.deleteMany();
    await prisma.session.deleteMany();
    await prisma.verificationToken.deleteMany();
    await prisma.user.deleteMany();
    console.log("Cleaning up Complete");
}

async function main() {
    await cleanUp();

    console.log("Seeding...");
    await prisma.product.createMany({ data: SAMPLE_DATA });

    const processedUsers = SAMPLE_USER.map((user) => {
        const password = hashSync(user.password, 10);
        return {
            ...user,
            password,
        };
    });

    await prisma.user.createMany({ data: processedUsers });

    console.log("Seeding... Complete");
}

try {
    await main();
} catch (e) {
    console.log(e);
}
