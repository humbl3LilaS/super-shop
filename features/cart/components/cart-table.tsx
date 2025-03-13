"use client";

import Image from "next/image";
import Link from "next/link";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import QuantityController from "@/features/cart/components/quantity-controller";
import { formatCurrency } from "@/lib/utils";
import { ICart } from "@/prisma/lib/validators/validators.type";

const CartTable = ({ cart }: { cart: ICart }) => {
    return (
        <div className={"overflow-x-scroll md:col-span-3 lg:col-span-3"}>
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
                                    href={`/products/${item.slug}`}
                                    className={"flex items-center gap-x-4"}
                                >
                                    <Image
                                        src={item.image}
                                        alt={`Preview image of ${item.name}`}
                                        width={50}
                                        height={50}
                                    />
                                    <span
                                        className={"md:line-clamp-1 md:max-w-24 lg:max-w-[unset]"}
                                    >
                                        {item.name}
                                    </span>
                                </Link>
                            </TableCell>
                            <TableCell className={"text-center"}>
                                <QuantityController item={item} />
                            </TableCell>
                            <TableCell className={"text-right font-semibold"}>
                                {formatCurrency(item.price)}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
};

export default CartTable;
