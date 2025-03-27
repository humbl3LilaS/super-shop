"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { updateUserProfile } from "@/features/profile/update-user-profile";
import { profileUpdateSchema, ProfileUpdateSchema } from "@/lib/validators";

type ProfileUpdateFormProps = {
    defaultValues?: ProfileUpdateSchema;
};

const ProfileUpdateForm = ({ defaultValues }: ProfileUpdateFormProps) => {
    const [editMode, setEditMode] = useState(false);
    const form = useForm<ProfileUpdateSchema>({
        resolver: zodResolver(profileUpdateSchema),
        defaultValues: {
            email: defaultValues?.email ?? "",
            name: defaultValues?.name ?? "",
        },
    });
    const router = useRouter();
    const onSubmit: SubmitHandler<ProfileUpdateSchema> = async (values) => {
        const dirtyFields = Object.keys(form.formState.dirtyFields);
        const dirtyValues = Object.fromEntries(
            Object.entries(form.formState.dirtyFields)
                .filter(([k]) => dirtyFields.includes(k))
                .map(([k]) => [k, (values as Record<string, string>)[k]]),
        );
        const res = await updateUserProfile(dirtyValues);
        if (!res.success) {
            toast.error(res.message);
            return;
        }
        toast.success(res.message);
        setEditMode(false);
        router.refresh();
    };
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <FormField
                    control={form.control}
                    name={"name"}
                    render={({ field }) => (
                        <FormItem className={"mb-4"}>
                            <FormLabel>Username</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder={"Eg: super@gmail.com"}
                                    {...field}
                                    disabled={!editMode}
                                />
                            </FormControl>
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name={"email"}
                    render={({ field }) => (
                        <FormItem className={"mb-4"}>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder={"Eg: super@gmail.com"}
                                    {...field}
                                    disabled={!editMode}
                                />
                            </FormControl>
                        </FormItem>
                    )}
                />
                {!editMode && (
                    <Button type={"button"} onClick={() => setEditMode(true)}>
                        Edit
                    </Button>
                )}
                {editMode && (
                    <div className={"flex items-center gap-x-4"}>
                        <Button
                            type={"button"}
                            onClick={() => setEditMode(false)}
                            variant={"destructive"}
                            disabled={form.formState.isSubmitting}
                        >
                            Cancel
                        </Button>
                        <Button
                            type={"submit"}
                            disabled={
                                form.formState.isSubmitting ||
                                !form.formState.isValid ||
                                !form.formState.isDirty
                            }
                        >
                            {form.formState.isSubmitting ? (
                                <>
                                    <Loader2 className={"mr-2 inline-block animate-spin"} />
                                    <span>Updating</span>
                                </>
                            ) : (
                                <span>Update</span>
                            )}
                        </Button>
                    </div>
                )}
            </form>
        </Form>
    );
};

export default ProfileUpdateForm;
