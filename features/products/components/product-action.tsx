import ProductPrice from "@/components/shared/product/product-price";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { IProduct } from "@/prisma/lib/validators/validators.type";

const ProductAction = ({ data }: { data: IProduct }) => {
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
                {data.stock > 0 && <Button className={"block w-full mt-3"}>Add To Cart</Button>}
            </CardContent>
        </Card>
    );
};

export default ProductAction;
