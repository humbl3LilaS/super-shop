import { ShoppingCart, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import MobileMenu from "@/components/shared/header/mobile-menu";
import ThemeToggle from "@/components/shared/header/theme-toggle";
import { Button } from "@/components/ui/button";

const Header = () => {
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

                    <Button asChild={true}>
                        <Link href="/profile">
                            <User />
                            <span>Sign In</span>
                        </Link>
                    </Button>
                </nav>
                <div className={"flex items-center gap-x-3"}>
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
