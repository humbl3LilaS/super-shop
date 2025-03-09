"use client";
import Image from "next/image";
import { useState } from "react";

import { cn } from "@/lib/utils";

const ProductImages = ({ images }: { images: string[] }) => {
    const [activeIdx, setActiveIdx] = useState(0);
    return (
        <div className={"col-span-1 "}>
            <div className={"space-y-4 "}>
                <Image
                    src={images[activeIdx]}
                    alt={"product detail image"}
                    width={500}
                    height={500}
                    className={"min-h-[300px] mx-auto object-cover object-center dark:rounded-xl"}
                />
                <div className={"flex items-center gap-x-4"}>
                    {images.map((image, idx) => (
                        <div
                            key={image}
                            className={cn(
                                "aspect-square w-24 p-1 rounded-md overflow-hidden border hover:border-orange-800 dark:hover:border-emerald-700 transition-colors duration-500",
                                activeIdx === idx && "border-orange-500 dark:border-emerald-500",
                            )}
                            onClick={() => {
                                setActiveIdx(idx);
                            }}
                        >
                            <Image
                                src={image}
                                alt={"product image"}
                                width={100}
                                height={100}
                                className={"rounded-md"}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ProductImages;
