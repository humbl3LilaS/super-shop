import type { Metadata } from "next";
import { ReactNode } from "react";

import Footer from "@/components/shared/footer";
import Header from "@/components/shared/header";

export const metadata: Metadata = {
    title: "Home | SuperStore",
    description: "A great shop where you can buy super cool products",
    metadataBase: new URL(process.env.NEXT_PUBLIC_ENDPOINT!),
};

const Layout = ({ children }: { children: ReactNode }) => {
    return (
        <div className={"h-screen flex flex-col"}>
            <Header />
            <main className={"flex-1 wrapper"}>{children}</main>
            <Footer />
        </div>
    );
};

export default Layout;
