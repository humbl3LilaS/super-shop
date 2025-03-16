"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { RadioGroup } from "@radix-ui/react-radio-group";
import { ArrowRight, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { RadioGroupItem } from "@/components/ui/radio-group";
import { updatePaymentMethod } from "@/features/payment-method/actions/update-payment-method";
import { PAYMENT_METHODS } from "@/lib/constants";
import { paymentMethodFormSchema } from "@/lib/validators";

const PaymentMethodForm = ({ preferredMethod }: { preferredMethod: string | null }) => {
    const form = useForm({
        resolver: zodResolver(paymentMethodFormSchema),
        defaultValues: {
            paymentMethod: preferredMethod ?? PAYMENT_METHODS[0],
        },
    });

    const router = useRouter();

    const onSubmit: SubmitHandler<{ paymentMethod: string }> = async (values) => {
        if (values.paymentMethod === preferredMethod) {
            toast.success("Shipping Address has been verified");
            return router.push("/place-order");
        }

        const res = await updatePaymentMethod(values.paymentMethod);
        if (!res.success) {
            return toast.error(res.message);
        }

        toast.success(res.message);
        router.push("/place-order");
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <FormField
                    control={form.control}
                    name="paymentMethod"
                    render={({ field }) => (
                        <FormItem className="space-y-3">
                            <FormLabel className={"sr-only"}>Select Payment Method</FormLabel>
                            <FormControl>
                                <RadioGroup
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                    className="flex flex-col gap-y-2"
                                >
                                    {PAYMENT_METHODS.map((item) => (
                                        <FormItem
                                            className="flex items-center space-x-3 space-y-0"
                                            key={item}
                                        >
                                            <FormControl>
                                                <RadioGroupItem value={item} />
                                            </FormControl>
                                            <FormLabel className="font-normal capitalize">
                                                {item}
                                            </FormLabel>
                                        </FormItem>
                                    ))}
                                </RadioGroup>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button
                    type={"submit"}
                    className={"mt-5"}
                    disabled={form.formState.isSubmitting || !form.formState.isValid}
                >
                    {form.formState.isSubmitting ? (
                        <>
                            <Loader2 className={"mr-2 inline-block animate-spin"} />
                            <span>Processing...</span>
                        </>
                    ) : (
                        <>
                            <ArrowRight />
                            <span>Continue</span>
                        </>
                    )}
                </Button>
            </form>
        </Form>
    );
};

export default PaymentMethodForm;
