import { Pool, neonConfig } from "@neondatabase/serverless";
import { PrismaNeon } from "@prisma/adapter-neon";
import { PrismaClient } from "@prisma/client";
import ws from "ws";

import { CartItem, IAddress } from "@/prisma/lib/validators/helpers";

// Sets up WebSocket connections, which enables Neon to use WebSocket communication.
neonConfig.webSocketConstructor = ws;
const connectionString = `${process.env.DATABASE_URL}`;

// Creates a new connection pool using the provided connection string, allowing multiple concurrent connections.
const pool = new Pool({ connectionString });

// Instantiates the Prisma adapter using the Neon connection pool to handle the connection between Prisma and Neon.
const adapter = new PrismaNeon(pool);

// Extends the PrismaClient with a custom result transformer to convert the price and rating fields to strings.
export const prisma = new PrismaClient({ adapter }).$extends({
    result: {
        product: {
            price: {
                compute(product) {
                    return product.price.toString();
                },
            },
            rating: {
                compute(product) {
                    return product.rating.toString();
                },
            },
        },
        cart: {
            itemsPrice: {
                compute(cart) {
                    return cart.itemsPrice.toString();
                },
            },
            totalPrice: {
                compute(cart) {
                    return cart.totalPrice.toString();
                },
            },
            shippingFee: {
                compute(cart) {
                    return cart.shippingFee.toString();
                },
            },
            tax: {
                compute(cart) {
                    return cart.tax.toString();
                },
            },
            items: {
                compute(cart) {
                    return cart.items as CartItem[];
                },
            },
            createdAt: {
                compute(cart) {
                    return cart.createdAt.toISOString();
                },
            },
        },
        user: {
            address: {
                compute(data) {
                    if (!data.address) {
                        return undefined;
                    }
                    return data.address as IAddress;
                },
            },
        },
    },
});
