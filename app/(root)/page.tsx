import { auth } from "@/auth";
import ProductList from "@/components/shared/product/product-list";
import { getLatestProducts } from "@/features/products/actions/get-latest-products";

const HomePage = async () => {
    const session = await auth();
    console.log(session);
    const latestProducts = await getLatestProducts();

    return (
        <>
            <ProductList data={latestProducts} title={"Newest Arrivals"} limit={4} />
        </>
    );
};

export default HomePage;
