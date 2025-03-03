import { Menu, User } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { NAV_ITEMS } from "@/lib/constants";

const MobileMenu = () => {
    return (
        <Sheet>
            <SheetTrigger asChild={true}>
                <Button className={"md:hidden"} variant={"outline"}>
                    <Menu />
                </Button>
            </SheetTrigger>
            <SheetContent>
                <SheetTitle className={"sr-only"}>Navigation Menu</SheetTitle>
                <nav className={"w-full h-full py-20 px-6  flex flex-col justify-between"}>
                    <ul className={" flex flex-col gap-y-4"}>
                        {NAV_ITEMS.map((item) => (
                            <li key={item.href}>
                                <Button
                                    asChild={true}
                                    variant={"outline"}
                                    className={"block text-center"}
                                >
                                    <Link href={item.href}>{item.title}</Link>
                                </Button>
                            </li>
                        ))}
                    </ul>
                    <div>
                        <Button
                            asChild={true}
                            variant={"outline"}
                            className={"text-center flex items-center gap-x-2"}
                        >
                            <Link href={"/sign-in"}>
                                <User />
                                <span>Sign In</span>
                            </Link>
                        </Button>
                    </div>
                </nav>
            </SheetContent>
        </Sheet>
    );
};

export default MobileMenu;
