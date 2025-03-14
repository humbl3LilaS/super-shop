"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { SubmitHandler, useForm } from "react-hook-form";

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
import { IShippingAddressForm, shippingAddressFormSchema } from "@/lib/validators";

const ShippingAddressForm = ({
    defaultValues,
}: {
    defaultValues?: Partial<IShippingAddressForm>;
}) => {
    const form = useForm<IShippingAddressForm>({
        resolver: zodResolver(shippingAddressFormSchema),
        defaultValues: {
            fullName: defaultValues?.fullName,
            address: defaultValues?.address ?? "",
            city: defaultValues?.city ?? "",
            postalCode: defaultValues?.postalCode ?? "",
            country: defaultValues?.country ?? "",
        },
    });

    const onSubmit: SubmitHandler<IShippingAddressForm> = async (values) => {
        console.log(values);
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
                    className={"mt-4 w-full"}
                    type={"submit"}
                    disabled={form.formState.isSubmitting || !form.formState.isValid}
                >
                    {form.formState.isSubmitting ? (
                        <>
                            <Loader2 className={"mr-2 inline-block animate-spin"} />
                            <span>Submitting...</span>
                        </>
                    ) : (
                        <span>Submit</span>
                    )}
                </Button>
            </form>
        </Form>
    );
};

export default ShippingAddressForm;
