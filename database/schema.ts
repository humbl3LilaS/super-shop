import { InferSelectModel } from "drizzle-orm";
import {
    uuid,
    pgTable,
    varchar,
    text,
    integer,
    decimal,
    boolean,
    timestamp,
    pgEnum,
} from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";

export const ROLE_ENUM = pgEnum("user_role", ["USER", "ADMIN"]);

export const users = pgTable("users", {
    id: uuid("id").notNull().primaryKey().defaultRandom().unique(),
    name: varchar("name", { length: 80 }).notNull(),
    email: text("email").notNull().unique(),
    password: text("password").notNull(),
    role: ROLE_ENUM("role").default("USER").notNull(),
});

export const products = pgTable("products", {
    id: uuid("id").notNull().primaryKey().defaultRandom().unique(),
    name: varchar("name", { length: 200 }).notNull(),
    slug: varchar("slug", { length: 200 }).notNull().unique(),
    description: text("description").notNull(),
    images: text("images").array().notNull(),
    price: decimal("price", { precision: 6, scale: 2 }).notNull(),
    brand: varchar("brand", { length: 200 }).notNull(),
    rating: decimal("rating", { precision: 2, scale: 1 }).notNull(),
    numReviews: integer("numReviews").notNull(),
    stock: integer("stock").notNull(),
    isFeatured: boolean("isFeatured").default(false).notNull(),
    banner: text("banner"),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});

/**
 * Types Start
 */
export type IProduct = InferSelectModel<typeof products>;

// User
export type IUser = InferSelectModel<typeof users>;
export type IUserRole = (typeof ROLE_ENUM.enumValues)[number];

/**
 * Types End
 */

/**
 * Validation Schema Start
 */

export const userInsertSchema = createInsertSchema(users, {
    name: (schema) => schema.min(5, { message: "Name must be at least 5 characters!" }),
    email: (schema) => schema.email({ message: "Invalid email address" }),
    password: (schema) =>
        schema
            .min(8, { message: "Password must be at least 8 characters long" })
            .regex(/[A-Z]/, {
                message: "Password must contain at least one uppercase letter",
            })
            .regex(/[a-z]/, {
                message: "Password must contain at least one lowercase letter",
            })
            .regex(/[0-9]/, {
                message: "Password must contain at least one number",
            })
            .regex(/[^A-Za-z0-9]/, {
                message: "Password must contain at least one special character",
            }),
}).omit({
    id: true,
    role: true,
});

export type UserInsertSchema = Zod.infer<typeof userInsertSchema>;

/**
 * Validation Schema End
 */
