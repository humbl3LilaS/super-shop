import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { IAddress } from "@/prisma/lib/validators/helpers";

const ShippingAddressCard = ({ data }: { data: IAddress & { fullName: string } }) => {
    return (
        <Card>
            <CardHeader>
                <h2 className={"text-xl"}>Shipping Address</h2>
            </CardHeader>
            <CardContent>
                <p>{data.fullName}</p>
                <p>
                    {data.address}, {data.city}, <br />
                    {data.region}, {data.country}
                </p>
                <Button asChild={true} variant={"outline"} className={"mt-4"}>
                    <Link href={"/shipping-address"}>Edit</Link>
                </Button>
            </CardContent>
        </Card>
    );
};

export default ShippingAddressCard;
