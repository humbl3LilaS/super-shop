import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

const PaymentMethodInfo = ({ preferredMethod }: { preferredMethod: string }) => {
    return (
        <Card>
            <CardHeader>
                <h2 className={" text-xl"}>Payment Method</h2>
            </CardHeader>
            <CardContent>
                <p className={"capitalize"}>{preferredMethod}</p>

                <Button asChild={true} variant={"outline"} className={"mt-4"}>
                    <Link href={"/payment-method"}>Edit</Link>
                </Button>
            </CardContent>
        </Card>
    );
};

export default PaymentMethodInfo;
