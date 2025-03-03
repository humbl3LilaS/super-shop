"use client";
import { ThemeProvider as NextThemeProvider } from "next-themes";
import { ReactNode, useEffect, useState } from "react";

const ThemeProvider = ({ children }: { children: ReactNode }) => {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return <>{children}</>; // Prevents hydration mismatch by rendering nothing until mounted
    }

    return (
        <NextThemeProvider
            attribute={"class"}
            defaultTheme={"system"}
            enableSystem={true}
            disableTransitionOnChange={true}
        >
            {children}
        </NextThemeProvider>
    );
};

export default ThemeProvider;
