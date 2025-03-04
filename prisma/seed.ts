import { PrismaClient } from "@prisma/client";

import { SAMPLE_DATA } from "@/lib/constants";

async function main() {
    console.log("Seeding...");
    const client = new PrismaClient();
    await client.product.deleteMany();

    await client.product.createMany({ data: SAMPLE_DATA });

    console.log("Seeding Complete...");
}

try {
    await main();
} catch (error) {
    console.log(error);
}
