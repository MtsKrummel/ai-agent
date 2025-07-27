import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <header className="absolute top-0 w-full bg-amber-500 p-4 font-semibold text-white">
          <div className="flex justify-between items-center">
            <div>
              HomePage
            </div>

            <div className="flex justify-end">
              <div className="flex gap-4">
                <span className="hover:bg-amber-800 hover:text-amber-200 hover:cursor-pointer transition-all p-2 rounded-xl">Inicio</span>
                <span className="hover:bg-amber-800 hover:text-amber-200 hover:cursor-pointer transition-all p-2 rounded-xl">Explorar</span>
                <span className="hover:bg-amber-800 hover:text-amber-200 hover:cursor-pointer transition-all p-2 rounded-xl">Contacto</span>
              </div>
              
              <span className="border-r-2 ml-4 border-amber-200"></span>

              <div className="flex">
                <Button className="bg-transparent hover:bg-amber-800 rounded-xl w-auto h-full">
                  <Link href="signup">SignUp</Link>
                </Button>

                <Button className="bg-transparent hover:bg-amber-800 rounded-xl w-auto h-full">
                  <Link href="signup">SignIn</Link>
                </Button>
              </div>
            </div>

          </div>
        </header>
        <div>
          {children}
        </div>
      </body>
    </html>
  );
}
