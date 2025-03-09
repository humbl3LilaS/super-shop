import ProductPrice from "@/components/shared/product/product-price";
import { IProduct } from "@/database/schema";
import ProductAction from "@/features/products/components/product-action";

const ProductDetails = ({ data }: { data: IProduct }) => {
    return (
        <div className={"col-span-1 "}>
            <div className={"flex flex-col gap-6"}>
                <p>
                    {data.brand}&nbsp;{data.category}
                </p>
                <h1 className={"h3-bold"}>{data.name}</h1>
                <p>
                    {data.rating} of {data.numReviews} Reviews
                </p>
                <div className="flex flex-col sm:flex-row sm:items-start">
                    <ProductPrice price={data.price} variant={"pill"} />
                </div>
            </div>
            <div className={"pt-8"}>
                <h2 className={"font-semibold"}>Description</h2>
                <p>{data.description}</p>
            </div>

            <ProductAction data={data} />
        </div>
    );
};

export default ProductDetails;
