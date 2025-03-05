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

export type IProduct = InferSelectModel<typeof products>;

// User
export type IUser = InferSelectModel<typeof users>;
export type IUserRole = (typeof ROLE_ENUM.enumValues)[number];
