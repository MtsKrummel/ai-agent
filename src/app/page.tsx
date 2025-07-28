"use client";
import { Button } from "@/components/ui/button";

import { authClient } from "@/lib/auth-client";

import Link from "next/link";

export default function Home() {
  //session section
  const { 
    data: session, 
  } = authClient.useSession();

  
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

          {
            session ? (
              <Button className="hover:cursor-pointer hover:bg-red-600 p-2 rounded-[10px] transition-all duration-300 ease-in-out"
              onClick={() => authClient.signOut()}>
                Logout
              </Button>
            ) : (
              <div>
                <Link 
                  href="/signin" className="hover:cursor-pointer hover:bg-blue-300 p-2 rounded-[10px] transition-all duration-300 ease-in-out"
                >
                  Sign In
                </Link>

                <Link 
                  href="/signup" className="hover:cursor-pointer hover:bg-blue-300 p-2 rounded-[10px] transition-all duration-300 ease-in-out"
                >
                  Sign Up
                </Link>
              </div>
            )
          }
        </div>
      </nav>

      {
        session ? (
          <div className="flex items-center justify-center h-[calc(100vh-60px)]">
            <h1 className="text-2xl font-bold">Welcome, {session.user?.name}!</h1>
          </div>
        ) : (
          <div className="flex items-center justify-center h-[calc(100vh-60px)]">
            <h1 className="text-2xl font-bold">Please sign in to continue.</h1>
          </div>
        )
      }

      <section>
        <h2 className="text-2xl font-bold">Welcome to Ia agent app!</h2>
        <p className="mt-2 text-gray-600">This is a simple ai agent app</p>
      </section>
    </div>
  )
}