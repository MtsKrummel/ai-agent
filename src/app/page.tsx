import { Button } from "@/components/ui/button";

import { auth } from "@/lib/auth";
import { authClient } from "@/lib/auth-client";

import { HomeView } from "@/modules/home/ui/views/home-view";
import { headers } from "next/headers";

import Link from "next/link";

export default async function Page() {
  //session section
  const session = await auth.api.getSession({
    headers: await headers()
  })

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
              !session && (
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
      <HomeView />
    </div>
  )
}