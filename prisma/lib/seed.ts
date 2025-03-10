import { PrismaClient } from "@prisma/client";

import { SAMPLE_DATA } from "@/lib/constants";

async function main() {
    console.log("Seeding...");
    const prisma = new PrismaClient();
    await prisma.product.deleteMany();

    await prisma.product.createMany({ data: SAMPLE_DATA });
    console.log("Seeding... Complete");
}

try {
    await main();
} catch (e) {
    console.log(e);
}
