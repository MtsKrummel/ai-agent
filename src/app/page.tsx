"use client";
import { Button } from "@/components/ui/button";

import { authClient } from "@/lib/auth-client";

import Link from "next/link";

export default function Home() {
  //session section
  const { 
    data: session, 
  } = authClient.useSession();

  if(session){
    return (
      <div>
        <nav className="flex items-center justify-between bg-gray-300 text-blue-950 max-h-[60px]">
        <div className="flex items-center gap-x-3 p-4">
          <img className="h-[46px]" src="/logo.svg" alt="IA AGENT logo" />
          <h1>IA AGENT</h1>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex gap-x-4">
            <Link href="/" className="hover:cursor-pointer hover:bg-blue-300 p-2 rounded-[10px] transition-all duration-300 ease-in-out">Home</Link>
            <Link href="/about" className="hover:cursor-pointer hover:bg-blue-300 p-2 rounded-[10px] transition-all duration-300 ease-in-out">About</Link>
            <Link href="/contact" className="hover:cursor-pointer hover:bg-blue-300 p-2 rounded-[10px] transition-all duration-300 ease-in-out">Contact</Link>
          </div>

          <span className="flex ml-4 h-8 border-r-2 border-gray-400 "></span>

          <div className="flex gap-x-4 ml-4 mr-4">
            <Button 
              className="hover:bg-red-600 cursor-pointer" 
              onClick={() => authClient.signOut()}
            >
              Sign Out
            </Button>
          </div>
        </div>
      </nav>

        <div className="flex flex-col items-center justify-center h-screen gap-y-4 md:max-w-[400px] max-w-[300px] mx-auto">
          <h1>Welcome, {session.user.name}!</h1>
        </div>
      </div>
    )
  }
  
  return (
    <div>
      <nav className="flex items-center justify-between bg-gray-300 text-blue-950 max-h-[60px]">
        <div className="flex items-center gap-x-3 p-4">
          <img className="h-[46px]" src="/logo.svg" alt="IA AGENT logo" />
          <h1>IA AGENT</h1>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex gap-x-4">
            <Link href="/" className="hover:cursor-pointer hover:bg-blue-300 p-2 rounded-[10px] transition-all duration-300 ease-in-out">Home</Link>
            <Link href="/about" className="hover:cursor-pointer hover:bg-blue-300 p-2 rounded-[10px] transition-all duration-300 ease-in-out">About</Link>
            <Link href="/contact" className="hover:cursor-pointer hover:bg-blue-300 p-2 rounded-[10px] transition-all duration-300 ease-in-out">Contact</Link>
          </div>

          <span className="flex ml-4 h-8 border-r-2 border-gray-400 "></span>

          <div className="flex gap-x-4 ml-4 mr-4">
            <Link href="/signin" className="hover:cursor-pointer hover:bg-white hover:text-blue-950 p-2 transition-all duration-300 ease-in-out rounded-[10px]">Sign In</Link>
            <Link href="/signup" className="hover:cursor-pointer hover:bg-white hover:text-blue-950 p-2 transition-all duration-300 ease-in-out rounded-[10px]">Sign Up</Link>
          </div>
        </div>
      </nav>

      <section>
        <h2 className="text-2xl font-bold">Welcome to Ia agent app!</h2>
        <p className="mt-2 text-gray-600">This is a simple ai agent app</p>
      </section>
    </div>
  )
}