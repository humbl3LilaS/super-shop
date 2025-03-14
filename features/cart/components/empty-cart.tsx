import { ShoppingCart } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";

const EmptyCart = () => {
    return (
        <div className="w-full h-full flex flex-col items-center justify-center px-4 py-12">
            <div className="flex flex-col items-center justify-center space-y-6 text-center">
                <div className="flex h-24 w-24 items-center justify-center rounded-full bg-muted">
                    <ShoppingCart className="h-12 w-12 text-muted-foreground" />
                </div>
                <div className="space-y-2">
                    <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
                        Your cart is empty
                    </h1>
                    <p className="text-muted-foreground">
                        Looks like you haven't added anything to your cart yet.
                    </p>
                </div>
                <Button asChild size="lg" className="mt-4">
                    <Link href="/">
                        <ShoppingCart />
                        <span>Continue shopping</span>
                    </Link>
                </Button>
            </div>
        </div>
    );
};

export default EmptyCart;
