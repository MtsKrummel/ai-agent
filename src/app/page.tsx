"use client"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

export default function Home() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  return (
    <div className="flex flex-col justify-center items-center h-screen m-auto md:max-w-[500px]">
      <Input 
        placeholder="Introduce name"
        value={name}
        onChange={(e)=>setName(e)}
      />
      <Input 
        placeholder="Introduce email"
        value={email}
        onChange={(e)=>setEmail(e)}
      />
      <Input 
        placeholder="Introduce password"
        value={password}
        onChange={(e)=>setPassword(e)}
      />

      <Button className="w-full bg-amber-400 mt-4">Sign in</Button>
    </div>
  )
}
