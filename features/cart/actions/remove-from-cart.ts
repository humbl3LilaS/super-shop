"use server";

import { cookies } from "next/headers";

import { getCart } from "@/features/cart/actions/get-cart";
import { prisma } from "@/prisma/lib/prisma";

export const removeFromCart = async (productId: string) => {
    try {
        const sessionCartId = (await cookies()).get("sessionCartId")?.value;
        if (!sessionCartId) {
            return {
                success: false,
                message: "Failed: Session Id Missing",
            };
        }

        const product = await prisma.product.findFirst({
            where: { id: productId },
        });

        if (!product) {
            return {
                success: false,
                message: "Failed: Product not found",
            };
        }

        const cart = await getCart();

        if (!cart) {
            return {
                success: false,
                message: "Failed: Cart not found",
            };
        }

        const itemInCart = cart.items.find((item) => item.productId === productId);
        if (!itemInCart) {
            return {
                success: false,
                message: "Failed: Item is not in Cart",
            };
        }

        // If the quantity is 1 remove the item from the cart otherwise reduce the quantity
        if (itemInCart.qty === 1) {
            const newCartItems = cart.items.filter((item) => item.productId !== productId);

            await prisma.cart.update({
                where: { id: cart.id },
                data: {
                    ...cart,
                    items: newCartItems,
                },
            });

            return {
                success: true,
                message: `${itemInCart.name} has been remove form the cart`,
            };
        }

        const newCartItems = cart.items.map((item) => {
            return item.productId === productId ? { ...item, qty: item.qty - 1 } : item;
        });

        await prisma.cart.update({
            where: { id: cart.id },
            data: {
                ...cart,
                items: newCartItems,
            },
        });

        return {
            success: true,
            message: `Quantity of ${itemInCart.name} in reduced to ${itemInCart.qty - 1}`,
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
            message: "Error Removing Item From Cart",
        };
    }
};
