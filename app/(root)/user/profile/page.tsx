import type { Metadata } from "next";
import { redirect } from "next/navigation";

import { auth } from "@/auth";
import ProfileUpdateForm from "@/features/profile/components/profile-update-form";
import { getUserById } from "@/lib/actions/get-user-by-id";

export const metadata: Metadata = {
    title: "Profile | SuperStore",
    description: "A page where you can see information about user",
    metadataBase: new URL(process.env.NEXT_PUBLIC_ENDPOINT!),
};

const UserProfilePage = async () => {
    const session = await auth();
    if (!session) {
        redirect("/sign-in");
    }
    const userInfo = await getUserById(session.user.id);
    if (!userInfo) {
        redirect("/sign-in");
    }

    return (
        <section className={"pt-10"}>
            <div className={"mx-auto max-w-lg"}>
                <h1 className={"mb-4 font-bold text-lg md:text-xl lg:text-3xl"}>Profile</h1>
                <ProfileUpdateForm
                    defaultValues={{
                        name: userInfo.name,
                        email: userInfo.email,
                    }}
                />
            </div>
        </section>
    );
};

export default UserProfilePage;
