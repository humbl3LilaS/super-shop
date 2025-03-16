"use client";
import { zodResolver } from "@hookform/resolvers/zod";
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
import { Input } from "@/components/ui/input";
import { updateShippingAddress } from "@/features/shipping-address/actions/update-shipping-address";
import { IShippingAddressForm, shippingAddressFormSchema } from "@/lib/validators";

const ShippingAddressForm = ({
    defaultValues,
}: {
    defaultValues?: Partial<IShippingAddressForm>;
}) => {
    const form = useForm<IShippingAddressForm>({
        resolver: zodResolver(shippingAddressFormSchema),
        mode: "onChange",
        defaultValues: {
            fullName: defaultValues?.fullName,
            address: defaultValues?.address ?? "",
            city: defaultValues?.city ?? "",
            postalCode: defaultValues?.postalCode ?? "",
            region: defaultValues?.region ?? "",
            country: defaultValues?.country ?? "",
        },
    });
    const router = useRouter();

    const onSubmit: SubmitHandler<IShippingAddressForm> = async (values) => {
        const updatedFields = Object.keys(form.formState.dirtyFields);
        if (updatedFields.length === 0 && form.formState.isValid) {
            toast.success("Shipping Address has been verified");
            return router.push("/payment-method");
        }
        const res = await updateShippingAddress({
            address: values.address,
            postalCode: values.address,
            city: values.address,
            region: values.region,
            country: values.country,
        });

        if (!res.success) {
            return toast.error(res.message);
        }
        toast.success(res.message);
        router.push("/payment-method");
    };
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <FormField
                    control={form.control}
                    name={"fullName"}
                    render={({ field }) => (
                        <FormItem className={"mb-4"}>
                            <FormLabel>Full name</FormLabel>
                            <FormControl>
                                <Input placeholder={"Eg: Super Edelweiss"} {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name={"address"}
                    render={({ field }) => (
                        <FormItem className={"mb-4"}>
                            <FormLabel>Address:</FormLabel>
                            <FormControl>
                                <Input placeholder={"Eg: 12th Super Street"} {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name={"city"}
                    render={({ field }) => (
                        <FormItem className={"mb-4"}>
                            <FormLabel>City:</FormLabel>
                            <FormControl>
                                <Input placeholder={"Eg: Yankin"} {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name={"region"}
                    render={({ field }) => (
                        <FormItem className={"mb-4"}>
                            <FormLabel>Region:</FormLabel>
                            <FormControl>
                                <Input placeholder={"Eg: Yangon"} {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name={"country"}
                    render={({ field }) => (
                        <FormItem className={"mb-4"}>
                            <FormLabel>Country:</FormLabel>
                            <FormControl>
                                <Input placeholder={"Eg: Myanmar"} {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name={"postalCode"}
                    render={({ field }) => (
                        <FormItem className={"mb-4"}>
                            <FormLabel>Postal Code:</FormLabel>
                            <FormControl>
                                <Input placeholder={"Eg: 101010"} {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button
                    className={" w-fit mt-4 ml-auto flex items-center"}
                    type={"submit"}
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

export default ShippingAddressForm;
