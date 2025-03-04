import { db } from "@/database/drizzle";
import { products } from "@/database/schema";
import { SAMPLE_DATA } from "@/lib/constants";

const main = async () => {
    const newProductPromise = SAMPLE_DATA.map(async (item) => {
        return db.insert(products).values(item);
    });

    await Promise.all(newProductPromise);
};

try {
    console.log("Seeding....");
    await main();
    console.log("Seeding Completed");
} catch (error) {
    console.error(error);
}
