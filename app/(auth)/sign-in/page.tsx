import type { Metadata } from "next";

import SignInForm from "@/features/sign-in/components/sign-in-form";

export const metadata: Metadata = {
    title: "Sign In | SuperStore",
    description: "Sign In into your account to proceed with checkout and billing",
    metadataBase: new URL(process.env.NEXT_PUBLIC_ENDPOINT!),
};

const SignInPage = () => {
    return (
        <div className={"w-screen h-screen flex-center px-6"}>
            <SignInForm />
        </div>
    );
};

export default SignInPage;
