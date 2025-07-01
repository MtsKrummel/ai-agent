"use client";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input'
import { authClient } from '@/lib/auth-client';
import React, { useState } from 'react'

function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    //session section
    const {data: session,
    } = authClient.useSession();

    function onSubmit() {
        authClient.signIn.email({
            email,
            password,
            callbackURL: "/"
        }, {
            onError: () => {
                window.alert("An error occurred while signing up. Please try again.");
            },
            onSuccess: () => {
                window.alert("Sign up successful! Redirecting to dashboard...");
            }
        });
    }

    return (
        <div className="flex flex-col items-center justify-center h-screen gap-y-4 md:max-w-[400px] max-w-[300px] mx-auto">
            <Input
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <Input
                placeholder="Enter your password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />

            <Button
                onClick={onSubmit}
                className="w-full p-4 flex-col gap-y-4 mt-4"
            >
                Sign In
            </Button>

      <p className="text-sm text-gray-500">
        You don't have an account?
        <a href="/" className="text-blue-500 hover:underline"> Sign Up</a>
      </p>
    </div>
  )
}

export default LoginPage