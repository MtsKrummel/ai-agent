import { Button } from "@/components/ui/button";
import { DashboardNavBar } from "@/modules/dashboard/ui/components/dashboard-navbar";
import { HomeView } from "@/modules/home/ui/views/home-view";

import { auth } from "@/lib/auth";
import { authClient } from "@/lib/auth-client";

import { headers } from "next/headers";

import Link from "next/link";

export default async function Page() {
  //session section
  const session = await auth.api.getSession({
    headers: await headers()
  })

  return (
    <div>
        {
          !session ? (
            <>
              <nav className="sm:flex sm:items-center sm:justify-between bg-gray-300 text-blue-950 max-h-[60px] sm:w-full w-full flex justify-between transition-all duration-300 ease-in-out">
                <div className="flex items-center gap-x-3 p-4 transition-all duration-300 ease-in-out">
                  <img className="sm:h-[46px] h-[30px] transition-all duration-300 ease-in-out" src="/logo.svg" alt="IA AGENT logo" />
                  <h1>IA AGENT</h1>
                </div>
                <div className="flex items-center justify-end transition-all duration-300 ease-in-out">
                  <div className="sm:flex sm:gap-x-4 hidden transition-all duration-300 ease-in-out">
                    <Link href="/" className="hover:cursor-pointer hover:bg-blue-300 p-2 rounded-[10px] transition-all duration-300 ease-in-out">Home</Link>
                    <Link href="/about" className="hover:cursor-pointer hover:bg-blue-300 p-2 rounded-[10px] transition-all duration-300 ease-in-out">About</Link>
                    <Link href="/contact" className="hover:cursor-pointer hover:bg-blue-300 p-2 rounded-[10px] transition-all duration-300 ease-in-out">Contact</Link>
                  </div>
                  <div className="sm:flex sm:items-center sm:gap-x-2 flex">
                    <span className="sm:flex sm:ml-4 sm:h-8 sm:border-r-3 sm:border-gray-400 hidden"></span>
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
                </div>
              </nav>
              Home page
            </>
          ):(
            <HomeView />
          )
        }
    </div>
  )
}