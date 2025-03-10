"use client";
import { User } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { Button } from "@/components/ui/button";

const SignIn = () => {
    const pathname = usePathname();
    const callbackUrl = new URL(process.env.NEXT_PUBLIC_ENDPOINT + pathname);
    return (
        <Button asChild={true}>
            <Link
                href={`/sign-in/?callbackUrl=${encodeURIComponent(callbackUrl.toString())}`}
                passHref
            >
                <User />
                <span>Sign In</span>
            </Link>
        </Button>
    );
};

export default SignIn;
