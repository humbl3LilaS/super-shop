"use client";

import { MoonIcon, SunIcon, SunMoon } from "lucide-react";
import { useTheme } from "next-themes";
import { useCallback } from "react";

import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Skeleton } from "@/components/ui/skeleton";

const getThemeButton = (theme: string) => {
    switch (theme) {
        case "light":
            return <SunIcon />;
        case "dark":
            return <MoonIcon />;
        case "system":
            return <SunMoon />;
        default:
            return <SunMoon />;
    }
};

const ThemeToggle = () => {
    const { theme, setTheme } = useTheme();
    const onThemeChange = useCallback(
        (theme: string) => () => {
            setTheme(theme);
        },
        [setTheme],
    );
    if (!theme) return <Skeleton className={"w-10 h-9 block"} />;
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild={true}>
                <Button variant={"ghost"}>{getThemeButton(theme)}</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuLabel>Appearance</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuCheckboxItem
                    checked={theme === "system"}
                    onClick={onThemeChange("system")}
                >
                    System
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                    checked={theme === "dark"}
                    onClick={onThemeChange("dark")}
                >
                    Dark
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                    checked={theme === "light"}
                    onClick={onThemeChange("light")}
                >
                    Light
                </DropdownMenuCheckboxItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default ThemeToggle;
