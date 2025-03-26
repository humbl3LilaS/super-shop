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
import { formatCurrency, formatDate, formatUUID } from "@/lib/utils";

import { getUserOrders } from "./actions/get-user-orders";

const UserOrdersTable = async ({ currPage }: { currPage: number }) => {
    const orders = await getUserOrders(currPage);
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Total</TableHead>
                    <TableHead>Paid</TableHead>
                    <TableHead>Delivered</TableHead>
                    <TableHead>Action</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {orders.data.map((order) => (
                    <TableRow key={order.id}>
                        <TableCell>{formatUUID(order.id)}</TableCell>
                        <TableCell>{formatDate(order.createdAt)}</TableCell>
                        <TableCell>{formatCurrency(order.totalPrice)}</TableCell>
                        <TableCell>{order.isPaid ? "Paid" : "Not Paid"}</TableCell>
                        <TableCell>{order.isDelivered ? "Delivered" : "Not Delivered"}</TableCell>
                        <TableCell>
                            <Button asChild={true}>
                                <Link href={`/orders/${order.id}`}>Details</Link>
                            </Button>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
};

export default UserOrdersTable;
