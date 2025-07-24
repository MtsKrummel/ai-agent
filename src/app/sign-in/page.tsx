"use client";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input'

import { useForm } from 'react-hook-form';
import { authClient } from '@/lib/auth-client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

import React, { useState } from 'react'

import { z } from 'zod';
import { zodResolver } from "@hookform/resolvers/zod"
import { Card } from '@/components/ui/card';

const formSchema = z.object({
    email: z.string().email(),
    password: z.string().min(1, {message: "Password is required"}),
});

export default function Page() { 
    const router = useRouter();

    const [error, setError] = useState<string | null>(null);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues:{
            email: "",
            password: "",
        },
    });

    const onSubmit = (data: z.infer<typeof formSchema>) => {
        setError(null);

        authClient.signIn.email(
            {
                email: data.email,
                password: data.password,
            },
            {
                onSuccess: () => {
                    router.push("/");
                },
                onError: (error) => {
                    setError(error.error.message)
                }
            }
        )


    }

    return (
        <div className="flex flex-col items-center justify-center h-screen gap-y-4 md:max-w-[400px] max-w-[300px] mx-auto">
            <Card>
                Sign in page
            </Card>
        </div>
  )
}