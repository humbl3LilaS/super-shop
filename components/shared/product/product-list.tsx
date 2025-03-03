import ProductCard from "@/components/shared/product/product-card";
import { IProduct } from "@/types/index.types";

type ProductListProps = {
    data: IProduct[];
    title: string;
    limit?: number;
};
const ProductList = ({ data, title, limit }: ProductListProps) => {
    const products = limit ? data.slice(0, limit) : data;
    return (
        <section className={"my-10"}>
            <h2 className={"mb-4 h2-bold text-center md:text-left md:mb-6"}>{title}</h2>
            {(!products || products.length == 0) && (
                <div>
                    <p>No products</p>
                </div>
            )}
            {data.length > 0 && (
                <div
                    className={
                        "grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-3 md:grid-cols-3 md:gap-x-4 lg:grid-cols-4 lg:gap-x-6"
                    }
                >
                    {products.map((item) => (
                        <ProductCard data={item} key={item.slug} />
                    ))}
                </div>
            )}
        </section>
    );
};

export default ProductList;
