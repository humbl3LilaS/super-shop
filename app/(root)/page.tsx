import ProductList from "@/components/shared/product/product-list";
import { getFeaturedProducts } from "@/features/products/actions/get-featured-products";

const HomePage = async () => {
    const featuredProducts = await getFeaturedProducts();

    return (
        <>
            <ProductList data={featuredProducts} title={"Newest Arrivals"} limit={4} />
        </>
    );
};

export default HomePage;
