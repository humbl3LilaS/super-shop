"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

import { auth } from "@/auth";
import { getCart } from "@/features/cart/actions/get-cart";
import { addItemToCart, calculateCartPrice } from "@/features/cart/lib/util";
import { prisma } from "@/prisma/lib/prisma";
import { cartItem, CartItem } from "@/prisma/lib/validators/helpers";
import { ICart } from "@/prisma/lib/validators/validators.type";

export const addToCart = async (data: CartItem) => {
    try {
        const session = await auth();

        const sessionCartId = (await cookies()).get("sessionCartId")?.value as string;
        if (!sessionCartId) {
            throw new Error("Cart Session not found.");
        }
        // Fetch the cart that is stored in the database
        const cart = await getCart();

        // Check if the data parameter follow the valid schema
        const payload = cartItem.safeParse(data);

        if (!payload.success) {
            return {
                success: false,
                message: "Invalid Data Payload",
            };
        }

        const product = await prisma.product.findUnique({
            where: { id: payload.data.productId },
        });

        if (!product) {
            return {
                success: false,
                message: "Invalid Item",
            };
        }

        if (!cart) {
            const newCart: ICart = {
                userId: session?.user.id,
                sessionCartId,
                items: [payload.data],
                ...calculateCartPrice([payload.data]),
            };

            // add Cart to Database
            await prisma.cart.create({
                //@ts-expect-error I'll type check it later
                data: newCart,
            });

            // Revalidate the product page
            revalidatePath(`/products/${product.slug}`);

            return {
                success: true,
                message: "Item add to cart",
            };
        }

        const newCartItems = addItemToCart(cart.items, payload.data);

        const newCart: ICart = {
            ...cart,
            items: newCartItems,
            ...calculateCartPrice(newCartItems),
        };

        // add Cart to Database
        await prisma.cart.update({
            //@ts-expect-error I'll type check it later
            data: newCart,
            where: { id: cart.id },
        });

        // Revalidate the product page
        revalidatePath(`/products/${product.slug}`);

        return {
            success: true,
            message: "Item add to cart",
        };
    } catch (error) {
        if (error instanceof Error) {
            return {
                success: false,
                message: error.message,
            };
        }
        return {
            success: false,
            message: "Error adding to cart",
        };
    }
};
