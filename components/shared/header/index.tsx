import { ShoppingCart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { auth } from "@/auth";
import MobileMenu from "@/components/shared/header/mobile-menu";
import ProfileDropdown from "@/components/shared/header/profile-dropdown";
import SignIn from "@/components/shared/header/sign-in-btn";
import ThemeToggle from "@/components/shared/header/theme-toggle";
import { Button } from "@/components/ui/button";

const Header = async () => {
    const session = await auth();
    return (
        <header className={"w-full border-b shadow"}>
            <div className={"wrapper flex-between"}>
                {/*Logo*/}
                <div>
                    <Link href="/" className={"flex-start gap-x-2"}>
                        <Image
                            src="/images/logo.svg"
                            alt="logo"
                            width={48}
                            height={48}
                            priority={true}
                        />
                        <span className={"hidden font-bold text-2xl ml-3 lg:block"}>
                            SuperStore
                        </span>
                    </Link>
                </div>

                <nav className={"hidden items-center gap-x-3 md:flex"}>
                    <ThemeToggle />

                    <Button asChild={true} variant={"ghost"}>
                        <Link href="/cart">
                            <ShoppingCart />
                            <span>Cart</span>
                        </Link>
                    </Button>

                    {session ? <ProfileDropdown session={session} /> : <SignIn />}
                </nav>
                <div className={"flex items-center gap-x-3 md:hidden"}>
                    <Button asChild={true} variant={"ghost"}>
                        <Link href="/cart">
                            <ShoppingCart />
                        </Link>
                    </Button>
                    <MobileMenu />
                </div>
            </div>
        </header>
    );
};

export default Header;
