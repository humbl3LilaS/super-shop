"use client";
import { usePathname } from "next/navigation";
import React from "react";

import { CHECKOUT_STEPS } from "@/lib/constants";
import { cn } from "@/lib/utils";

const CheckoutSteps = () => {
    const pathname = usePathname();
    const segments = pathname.split("/");
    const currentSegment = segments[segments.length - 1];
    return (
        <div className={"max-w-3xl mx-auto flex justify-between items-center gap-x-4 md:gap-x-10"}>
            {CHECKOUT_STEPS.map((step, idx) => (
                <React.Fragment key={step.segment}>
                    <div
                        className={cn(
                            "  px-4 py-2 rounded-xl text-xs text-center md:text-sm",
                            step.segment == currentSegment &&
                                "bg-gray-300 text-gray-800 font-semibold",
                        )}
                    >
                        {step.label}
                    </div>
                    {idx !== CHECKOUT_STEPS.length - 1 && (
                        <hr className="w-full  shrink border-gray-300" />
                    )}
                </React.Fragment>
            ))}
        </div>
    );
};

export default CheckoutSteps;
