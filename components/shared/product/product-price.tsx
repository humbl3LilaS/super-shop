import { cn } from "@/lib/utils";

const ProductPrice = ({ price, className }: { price: number; className?: string }) => {
    const [intValue, floatValue] = price.toFixed(2).toString().split(".");
    return (
        <span className={cn("flex text-2xl font-bold gap-x-0.5", className)}>
            <span className={"text-xs mt-1"}>$</span>
            <span>{intValue}</span>
            <span className={"text-xs mt-1"}>{floatValue}</span>
        </span>
    );
};

export default ProductPrice;
