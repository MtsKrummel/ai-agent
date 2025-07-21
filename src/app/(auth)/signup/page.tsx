"use client";
import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { SignUpView } from "@/modules/auth/views/sign-up-view";

export default function Home() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  //session section
  const { 
    data: session, 
  } = authClient.useSession();

  const onSubmit = () => {
    authClient.signUp.email({
        email,
        password,
        name,
    }, {
      onError: () => {
        window.alert("An error occurred while signing up. Please try again.");
      },
      onSuccess: () => {
        window.alert("Sign up successful! Redirecting to dashboard...");
      }
    }
    );
  }
  
  return (
    <div className="flex flex-col items-center justify-center h-screen gap-y-4 md:max-w-[500px] max-w-[400px] mx-auto transition-all duration-300 ease-in-out">
      <h1 className="text-2xl font-bold mb-4">
        Create Your Account
      </h1>
        <SignUpView />
    </div>
  )
}
