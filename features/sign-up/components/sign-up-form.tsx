"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { House, Loader2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";

import PasswordField from "@/components/shared/password-field";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { signUp } from "@/features/sign-up/actions/sign-up-action";
import { signUpSchema, SignUpSchema } from "@/lib/validators";

const SignUpForm = () => {
    const form = useForm<SignUpSchema>({
        resolver: zodResolver(signUpSchema),
        defaultValues: {
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
        },
    });

    const router = useRouter();

    const onSubmit: SubmitHandler<SignUpSchema> = async (value) => {
        const res = await signUp(value);
        if (!res.success) {
            return toast.error("Sign Up failed.", {
                description: res.cause.reason,
            });
        }
        toast.success("Successfully Registered", {
            description: "Your account has been created successfully.",
        });
        return router.push("/");
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
                    <h2 className={"py-2 text-center"}>Sign Up</h2>
                </CardTitle>
                <CardDescription className={"text-center"}>
                    Enter your username, email address, phone, and password to create a new account.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <FormField
                            control={form.control}
                            name={"name"}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Username</FormLabel>
                                    <FormControl>
                                        <Input placeholder={"Eg: Superman"} {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name={"email"}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input placeholder={"Eg: super@gmail.com"} {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name={"password"}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Password</FormLabel>
                                    <FormControl>
                                        <PasswordField
                                            onChange={field.onChange}
                                            value={field.value}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name={"confirmPassword"}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Confirm Password</FormLabel>
                                    <FormControl>
                                        <PasswordField
                                            onChange={field.onChange}
                                            value={field.value}
                                        />
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
                                    <span>Signing Up..</span>
                                </>
                            ) : (
                                <span>Sign Up</span>
                            )}
                        </Button>
                    </form>
                </Form>
                <div className="mt-4 text-center text-sm text-muted-foreground">
                    Already have an account?{" "}
                    <Link href="/sign-in" className="font-bold">
                        Login
                    </Link>
                </div>
                <Button asChild={true} variant={"outline"} className={"my-3 mx-auto block w-fit"}>
                    <Link href={"/"} className={"flex"}>
                        <House />
                        <span>Go Back To Home</span>
                    </Link>
                </Button>
            </CardContent>
        </Card>
    );
};

export default SignUpForm;
