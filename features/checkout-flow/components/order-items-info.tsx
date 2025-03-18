import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { formatCurrency } from "@/lib/utils";
import { ICart } from "@/prisma/lib/validators/validators.type";

const OrderItemsInfo = ({ data }: { data: ICart }) => {
    return (
        <Card>
            <CardHeader>
                <h2 className={" text-xl"}>Order Items</h2>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Item</TableHead>
                            <TableHead>Qty</TableHead>
                            <TableHead className={"text-right"}>Price</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {data.items.map((item) => (
                            <TableRow key={item.productId}>
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
                                            className={
                                                "md:line-clamp-1 md:max-w-24 lg:max-w-[unset]"
                                            }
                                        >
                                            {item.name}
                                        </span>
                                    </Link>
                                </TableCell>
                                <TableCell>{item.qty}</TableCell>
                                <TableCell className={"text-right font-semibold"}>
                                    {formatCurrency(item.price)}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>

                <Button asChild={true} variant={"outline"} className={"mt-4"}>
                    <Link href={"/payment-method"}>Edit</Link>
                </Button>
            </CardContent>
        </Card>
    );
};

export default OrderItemsInfo;
