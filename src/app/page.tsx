"use client";
import { useState } from "react";

import { Button } from "@/components/ui/button";

import { authClient } from "@/lib/auth-client";
import Link from "next/link";

export default function Home() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  //session section
  const { 
    data: session, 
  } = authClient.useSession();

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
    <div className="flex flex-col">
      <main className="mt-20">
        <h1>Home</h1>
      </main>
    </div>
  )
}