import { CartItem } from "@/prisma/lib/validators/helpers";

/**
 * @function
 * A function that round a number | string to be compatible with Prisma's Decimal Implementation
 * @param {String | number} num
 */
export const roundToDecimal = (num: number | string) => {
    if (typeof num === "number") {
        return Math.round((num + Number.EPSILON) * 100) / 100;
    } else {
        return Math.round((Number(num) + Number.EPSILON) * 100) / 100;
    }
};

/**
 * @function
 * A function to calculate the total price of items present in the cart
 * @param {CartItem[]} items
 */
export const calculateCartPrice = (items: CartItem[]) => {
    const itemsPrice = roundToDecimal(
        items.reduce((acc, curr) => acc + Number(curr.price) * curr.qty, 0),
    );

    const shippingFee = roundToDecimal(itemsPrice > 100 ? 0 : 10);
    const tax = roundToDecimal(0.15 * itemsPrice);
    const totalPrice = roundToDecimal(itemsPrice + shippingFee + tax);

    return {
        itemsPrice: itemsPrice.toFixed(2),
        shippingFee: shippingFee.toFixed(2),
        tax: tax.toFixed(2),
        totalPrice: totalPrice.toFixed(2),
    };
};

/**
 * @function
 * This function return array of CartItem by increasing quantity of item if it's already exist in cart, if not append the new item to the
 * end of the items array in CartItem[]
 * @param {CartItem[]} items
 * @param {CartItem} itemToAdd
 */
export const addItemToCart = (items: CartItem[], itemToAdd: CartItem) => {
    // check if the item is present in cart
    const isItemPresent = items.some((item) => item.slug === itemToAdd.slug);
    if (isItemPresent) {
        return items.map((item) => {
            if (item.slug === itemToAdd.slug) {
                return {
                    ...item,
                    qty: item.qty + 1,
                };
            }
            return item;
        });
    }
    return [...items, itemToAdd];
};
