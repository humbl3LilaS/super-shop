import type { Metadata } from "next";

import SignUpForm from "@/features/sign-up/components/sign-up-form";

export const metadata: Metadata = {
    title: "Sign Up | SuperStore",
    description: "Sign Up to unlock more features",
    metadataBase: new URL(process.env.NEXT_PUBLIC_ENDPOINT!),
};
const SignUpPage = () => {
    return (
        <div className={"w-screen h-screen flex-center px-6"}>
            <SignUpForm />
        </div>
    );
};

export default SignUpPage;
