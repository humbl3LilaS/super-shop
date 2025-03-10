import ProductList from "@/components/shared/product/product-list";
import { SAMPLE_DATA } from "@/lib/constants";

const HomePage = async () => {
    return (
        <>
            <ProductList data={SAMPLE_DATA} title={"Newest Arrivals"} limit={4} />
        </>
    );
};

export default HomePage;
