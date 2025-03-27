import Link from "next/link";

import { getUserOrders } from "../actions/get-user-orders";

import { Button } from "@/components/ui/button";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import UserOrdersTablePagination from "@/features/profile/components/user-orders-table-pagination";
import { formatCurrency, formatDate, formatUUID } from "@/lib/utils";

const UserOrdersTable = async ({ currPage }: { currPage: number }) => {
    const orders = await getUserOrders(currPage);
    return (
        <div>
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
                    {orders.data.length > 0 &&
                        orders.data.map((order) => (
                            <TableRow key={order.id}>
                                <TableCell>{formatUUID(order.id)}</TableCell>
                                <TableCell>{formatDate(order.createdAt)}</TableCell>
                                <TableCell>{formatCurrency(order.totalPrice)}</TableCell>
                                <TableCell>{order.isPaid ? "Paid" : "Not Paid"}</TableCell>
                                <TableCell>
                                    {order.isDelivered ? "Delivered" : "Not Delivered"}
                                </TableCell>
                                <TableCell>
                                    <Button asChild={true}>
                                        <Link href={`/orders/${order.id}`}>Details</Link>
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                </TableBody>
            </Table>
            {orders.data.length === 0 && (
                <p className={"py-4 text-lg font-semibold text-black/50 text-center"}>
                    No Order Data...
                </p>
            )}
            {orders.data.length !== 0 && (
                <UserOrdersTablePagination currPage={currPage} totalPages={orders.totalPages} />
            )}
        </div>
    );
};

export default UserOrdersTable;
