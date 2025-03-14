"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { signal } from "@preact/signals-core";
import { House, Loader2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";

import PasswordField from "@/components/shared/password-field";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { signInWithCredential } from "@/features/sign-in/actions/sign-in-action";
import { signInSchema, SignInSchema } from "@/lib/validators";

// a signal that keep track if the form submission is success
const submitSuccess = signal(false);

const SignInForm = () => {
    const form = useForm<SignInSchema>({
        resolver: zodResolver(signInSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });
    const router = useRouter();
    const searchParams = useSearchParams();
    const callbackUrl = searchParams.get("callbackUrl");

    const onSubmit: SubmitHandler<SignInSchema> = async (values) => {
        const res = await signInWithCredential(values);
        if (!res.success) {
            return toast.error("Sign In Failed!", {
                description: res.cause.reason,
            });
        }
        toast.success("Sign In successfully");

        return router.push(callbackUrl ?? "/");
    };
    return (
        <Card className="mx-auto max-w-lg">
            <CardHeader>
                <CardTitle className="text-2xl">
                    <Image
                        src={"/images/logo.svg"}
                        alt={"Logo"}
                        width={100}
                        height={100}
                        className={"mx-auto"}
                    />
                    <h2 className={"py-2 text-center"}>Sign In</h2>
                </CardTitle>
                <CardDescription>
                    Enter your email address and password to login to your account.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <FormField
                            control={form.control}
                            name={"email"}
                            render={({ field }) => (
                                <FormItem className={"mb-4"}>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input placeholder={"Eg: super@gmail.com"} {...field} />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name={"password"}
                            render={({ field }) => (
                                <FormItem className={"mb-4"}>
                                    <FormLabel htmlFor={"password"}>Password</FormLabel>
                                    <FormControl>
                                        <PasswordField
                                            onChange={field.onChange}
                                            value={field.value}
                                        />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                        <Button
                            className={"mt-4 w-full"}
                            type={"submit"}
                            disabled={
                                form.formState.isSubmitting ||
                                !form.formState.isValid ||
                                (form.formState.isSubmitted && submitSuccess.value)
                            }
                        >
                            {form.formState.isSubmitting ? (
                                <>
                                    <Loader2 className={"mr-2 inline-block animate-spin"} />
                                    <span>Signing In..</span>
                                </>
                            ) : (
                                <span>Sign In</span>
                            )}
                        </Button>
                    </form>
                </Form>
                <div className="mt-4 text-center text-sm text-muted-foreground">
                    Don&apos;t have an account?{" "}
                    <Link href="/sign-up" className="font-bold">
                        Sign up
                    </Link>
                </div>

                <Button
                    asChild={true}
                    variant={"outline"}
                    className={"my-3 mx-auto block w-fit"}
                    disabled={form.formState.isSubmitting}
                >
                    <Link href={"/"} className={"flex"}>
                        <House />
                        <span>Go Back To Home</span>
                    </Link>
                </Button>
            </CardContent>
        </Card>
    );
};

export default SignInForm;
