"use client";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { authClient } from "@/lib/auth-client";

export default function Page() {
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

  if(session){
    return (
      <div className="flex flex-col items-center justify-center h-screen gap-y-4 md:max-w-[400px] max-w-[300px] mx-auto">
        <h1>Welcome, {session.user.name}!</h1>
        <Button 
          className="hover:bg-red-600 cursor-pointer" 
          onClick={() => authClient.signOut()}
        >
          Sign Out
        </Button>
      </div>
    )
  }
  
  return (
    <div className="flex flex-col items-center justify-center h-screen gap-y-4 md:max-w-[400px] max-w-[300px] mx-auto">
      <Input 
        placeholder="Enter your name" 
        value={name} 
          onChange={(e) => setName(e.target.value)} 
      />
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
        className="w-full p-4 flex-col gap-y-4 mt-4">
        Create Account
      </Button>

      <p className="text-sm text-gray-500">
        Already have an account? 
        <a href="/login" className="text-blue-500 hover:underline"> Sign In</a>
      </p>
    </div>
  )
}