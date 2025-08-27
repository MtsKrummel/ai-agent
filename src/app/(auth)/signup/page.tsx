
import { auth } from "@/lib/auth";
import { SignUpView } from "@/modules/auth/views/sign-up-view";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function Page() {
  const session = await auth.api.getSession({
    headers: await headers(),
  })

  if (!!session){
    redirect('/')
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
