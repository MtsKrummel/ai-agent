
import React, { useState } from 'react'

import { SignInView } from '@/modules/auth/views/sign-in-view';


function LoginPage() {

    return (
        <div className="flex flex-col items-center justify-center h-screen gap-y-4 md:max-w-[500px] max-w-[400px] mx-auto transition-all duration-300 ease-in-out">
            <h1 className="text-2xl font-bold mb-4">
                Sign In
            </h1>
            <SignInView  />
        </div>
  )
}

export default LoginPage