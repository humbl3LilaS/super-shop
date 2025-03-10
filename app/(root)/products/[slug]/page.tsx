const ProductDetailPage = async ({ params }: { params: Promise<{ slug: string }> }) => {
    const { slug } = await params;
    return (
        <section>
            <h1>{slug}</h1>
        </section>
    );
};

export default ProductDetailPage;
