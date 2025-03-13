import { notFound } from "next/navigation";

import { getProductBySlug } from "@/features/products/actions/get-product-by-slug";
import ProductDetails from "@/features/products/components/product-details";
import ProductImages from "@/features/products/components/product-images";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const product = await getProductBySlug(slug);
    return {
        title: product?.name,
        description: product?.description,
        openGraph: {
            title: product?.name,
            description: product?.description,
            images: product?.images,
        },
    };
}

const ProductDetailPage = async ({ params }: { params: Promise<{ slug: string }> }) => {
    const { slug } = await params;
    const product = await getProductBySlug(slug);
    if (!product) {
        return notFound();
    }
    return (
        <section>
            <div className={"pt-10 grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 lg:gap-10"}>
                <ProductImages images={product.images} />
                <ProductDetails data={product} />
            </div>
        </section>
    );
};

export default ProductDetailPage;
