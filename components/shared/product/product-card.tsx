import Image from "next/image";
import Link from "next/link";

import ProductPrice from "@/components/shared/product/product-price";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { IProduct } from "@/types/index.types";

const ProductCard = ({ data }: { data: IProduct }) => {
    return (
        <Card className={"w-full max-w-sm p-4"}>
            <CardHeader className={"p-0 items-center"}>
                <Link href={`/products/${data.slug}`}>
                    <Image
                        src={data.images[0]}
                        alt={data.name}
                        height={300}
                        width={300}
                        priority={true}
                    />
                </Link>
            </CardHeader>
            <CardContent className={"p-4 flex flex-col flex-1 gap-y-4"}>
                <p className={"text-xs"}>{data.brand}</p>
                <Link href={`/products/${data.slug}`}>
                    <h3 className={"text-sm font-medium"}>{data.name}</h3>
                </Link>
                <p className={"mt-auto flex justify-between"}>
                    <span>{data.rating}</span>
                    {data.stock > 0 ? (
                        <ProductPrice price={data.price} />
                    ) : (
                        <span className={"text-destructive"}>Out of Stock</span>
                    )}
                </p>
            </CardContent>
        </Card>
    );
};

export default ProductCard;
