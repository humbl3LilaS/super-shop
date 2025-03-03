import { Home } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";

const NotFound = () => {
    return (
        <main>
            <section>
                <div className={"w-screen h-screen flex-center flex-col gap-y-4"}>
                    <Image
                        src={"/images/not_found.svg"}
                        alt={"Error Not Found"}
                        height={400}
                        width={400}
                    />
                    <h1 className={"font-bold text-xl"}>Request Not Found</h1>
                    <Button asChild={true} variant={"outline"}>
                        <Link href={"/"}>
                            <Home />
                            Back To Home
                        </Link>
                    </Button>
                </div>
            </section>
        </main>
    );
};

export default NotFound;
