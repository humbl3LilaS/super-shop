"use server";

import { getCart } from "@/features/cart/actions/get-cart";
import { prisma } from "@/prisma/lib/prisma";
import { cartItem, CartItem } from "@/prisma/lib/validators/helpers";

export const addToCart = async (data: CartItem) => {
    try {
        const cart = await getCart();

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

        console.log(product);

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
