"use client";
import { User } from "lucide-react";
import Link from "next/link";
import { Session } from "next-auth";

import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { signOutUser } from "@/lib/actions/sign-out-user";

const ProfileDropdown = ({ session }: { session: Session }) => {
    const initials = session.user.name.charAt(0).toUpperCase();

    const onSignOut = async () => {
        await signOutUser();
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild={true}>
                <Button
                    variant={"ghost"}
                    className={"size-8 ml-2 flex-center relative rounded-full bg-gray-200"}
                >
                    {initials}
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className={"w-56 mt-2"} align={"end"}>
                <DropdownMenuLabel>
                    <p className={"flex flex-col text-sm leading-none"}>
                        <span className={"font-medium"}>{session.user.name}</span>
                        <span className={"text-muted-foreground"}>{session.user.email}</span>
                    </p>
                </DropdownMenuLabel>
                <DropdownMenuItem className={"mt-2 w-full"}>
                    <Button asChild={true} className={"w-full"}>
                        <Link href="/profile">
                            <User fill={"white"} />
                            <span className={"ml-2"}>Profile</span>
                        </Link>
                    </Button>
                </DropdownMenuItem>
                <DropdownMenuItem>
                    <Button className={"w-full"} variant={"destructive"} onClick={onSignOut}>
                        Sign Out
                    </Button>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default ProfileDropdown;
