"use client";

import { ShoppingCart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import QuantityController from "@/features/cart/components/quantity-controller";
import { ICart } from "@/prisma/lib/validators/validators.type";

const CartTable = ({ cart }: { cart?: ICart }) => {
    console.log(cart);
    return (
        <div>
            <h1 className={"py-4 flex items-center gap-x-3 h2-bold"}>
                <span>Your Cart</span> <ShoppingCart className={"size-9"} />
            </h1>
            {!cart ||
                (cart.items.length === 0 && (
                    <p>
                        <span>Cart is empty.</span>
                        <Button asChild={true} variant={"outline"}>
                            <Link href={"/"}>
                                <ShoppingCart />
                                <span>Go shopping</span>
                            </Link>
                        </Button>
                    </p>
                ))}
            {cart && (
                <div className={"grid md:grid-cols-4 md:gap-5"}>
                    <div className={"md:col-span-3"}>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Item</TableHead>
                                    <TableHead className={"text-center"}>Qty</TableHead>
                                    <TableHead className={"text-right"}>Price</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {cart.items.map((item) => (
                                    <TableRow key={item.slug}>
                                        <TableCell>
                                            <Link
                                                href={`/product/${item.slug}`}
                                                className={"flex items-center gap-x-4"}
                                            >
                                                <Image
                                                    src={item.image}
                                                    alt={`Preview image of ${item.name}`}
                                                    width={50}
                                                    height={50}
                                                />
                                                <span>{item.name}</span>
                                            </Link>
                                        </TableCell>
                                        <TableCell className={"text-center"}>
                                            <QuantityController item={item} />
                                        </TableCell>
                                        <TableCell className={"text-right font-semibold"}>
                                            ${item.price}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CartTable;
