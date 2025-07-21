"use client"
//UI
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Alert, AlertTitle } from "@/components/ui/alert";
import { ArrowLeft } from "lucide-react";
import { OctagonAlertIcon } from "lucide-react";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@/components/ui/form";

//zod
import z from "zod";

import { zodResolver } from "@hookform/resolvers/zod";
//next
import Link from "next/link";

//react-hook-form
import { useForm } from "react-hook-form";
import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

const signInSchema = z.object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(8, "Password must be at least 8 characters").regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, "Password must contain at least one uppercase letter, one lowercase letter, and one number"),
})

export const SignInView = () => {
    const router = useRouter();
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const form = useForm<z.infer<typeof signInSchema>>({
        resolver: zodResolver(signInSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const onSubmit = (data: z.infer<typeof signInSchema>) => {
        setError(null);
        setIsLoading(true);

        authClient.signIn.email(
            {
                email: data.email,
                password: data.password,
            },
            {
                onSuccess: () => {
                    router.push("/");
                },
                onError: ({error}) => {
                    setError(error.message);
                }
            }
        )
    };
    return(
        <Card className="flex w-full p-6">
            <div className='flex items-center justify-start w-full'>
                <Link href="/">
                    <ArrowLeft className='rounded-full border-2 hover:bg-gray-200 hover:cursor-pointer' />
                </Link>
                <span className='text-sm text-gray-500 p-2'>
                    Back to home
                </span>
            </div>
            <CardContent>
                <div className="mt-4">
                    <Form {...form}>
                        <form 
                            onSubmit={form.handleSubmit(onSubmit)}
                        >
                            <div className="flex flex-col gap-6">
                                <FormField
                                    control={form.control}
                                    name="email"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Email</FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="email"
                                                    placeholder="Enter your email"
                                                    {...field}
                                                />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="password"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Password</FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="password"
                                                    placeholder="Enter your password"
                                                    {...field}
                                                />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                            </div>

                            {/* error section */}
                            {!!error && (
                                <Alert variant="destructive" className="mt-4">
                                    <OctagonAlertIcon className="h-4 w-4" />
                                    <AlertTitle>{error}</AlertTitle>
                                </Alert>
                            )}

                            {/* submit button */}

                            <Button
                                className="mt-4 w-full"
                                type="submit"
                                disabled={isLoading}
                            >
                                Sign In
                            </Button>
                        </form>
                    </Form>

                    <div className="mt-4 text-center">
                        <p className="text-sm text-gray-500 mt-4">
                            Don&apos;t have an account? 
                            <Link href="/signup" className="text-blue-500 hover:underline ml-1">
                                Sign Up
                            </Link>
                        </p>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}