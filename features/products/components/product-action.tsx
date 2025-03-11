import { useMemo } from "react";

import ProductPrice from "@/components/shared/product/product-price";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import AddToCart from "@/features/cart/components/add-to-cart";
import { CartItem } from "@/prisma/lib/validators/helpers";
import { IProduct } from "@/prisma/lib/validators/validators.type";

const ProductAction = ({ data }: { data: IProduct }) => {
    const cartItemData: CartItem = useMemo(
        () => ({
            productId: data.id,
            image: data.images[0],
            price: data.price,
            name: data.name,
            qty: 1,
            slug: data.slug,
        }),
        [data],
    );
    return (
        <Card className={"mt-5 h-fit"}>
            <CardContent className="p-4 ">
                <div className={"mb-2 flex justify-between"}>
                    <div>Price</div>
                    <ProductPrice price={data.price} />
                </div>
                <div className={"mb-2 flex justify-between"}>
                    <div>Status</div>
                    {data.stock > 0 ? (
                        <Badge variant={"outline"}>In Stock</Badge>
                    ) : (
                        <Badge variant={"destructive"}>Out of Stock</Badge>
                    )}
                </div>
                {data.stock > 0 && <AddToCart item={cartItemData} />}
            </CardContent>
        </Card>
    );
};

export default ProductAction;
