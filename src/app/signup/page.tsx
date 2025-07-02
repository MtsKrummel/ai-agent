"use client";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

/**
 * Renders the authentication page, allowing users to sign up for a new account or sign out if already signed in.
 *
 * Displays a sign-up form for new users, manages input state for name, email, and password, and handles sign-up logic with feedback alerts. If a user session exists, shows a welcome message and a sign-out button. Includes navigation to the home page and a link to the sign-in page for existing users.
 *
 * @returns The authentication UI as a React element.
 */
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
      <div className='flex items-center justify-start w-full'>
          <Link href="/">
              <ArrowLeft className='rounded-full border-2 hover:bg-gray-200 hover:cursor-pointer' />
          </Link>
          <span className='text-sm text-gray-500 p-2'>
            Back to home            
          </span>
      </div>
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
        <a href="/signin" className="text-blue-500 hover:underline"> Sign In</a>
      </p>
    </div>
  )
}