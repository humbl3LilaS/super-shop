import { cva, VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const productPrice = cva(["flex text-2xl font-bold gap-x-0.5"], {
    variants: {
        variant: {
            default: "",
            pill: "w-24 py-0.5 justify-center rounded-full bg-green-300 text-green-700",
        },
    },
    defaultVariants: {
        variant: "default",
    },
});

const ProductPrice = ({
    price,
    className,
    variant,
}: {
    price: string;
    className?: string;
} & VariantProps<typeof productPrice>) => {
    const [intValue, floatValue] = price.split(".");
    return (
        <span className={cn(productPrice({ variant }), className)}>
            <span className={"text-xs mt-1"}>$</span>
            <span>{intValue}</span>
            <span className={"text-xs mt-1"}>{floatValue}</span>
        </span>
    );
};

export default ProductPrice;
