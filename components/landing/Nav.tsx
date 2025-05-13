import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

const Navbar = () => {
     return (
          <nav className="fixed top-0 left-0 w-full z-50 backdrop-blur-md bg-transparent border-b border-white/20 shadow-sm">
               <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                    {/* Logo */}
                    <Link href="/" className="flex items-center h-full">
                         <Image
                              src="/logo.svg"
                              alt="Logo Image"
                              width={160}
                              height={69}
                              className="object-contain"
                         />
                    </Link>

                    {/* Auth Buttons */}
                    <div className="flex items-center space-x-4">
                         <SignedOut>
                              <Link href="/sign-up">
                                   <Button
                                        variant="outline"
                                        className="hover:cursor-pointer bg"
                                   >
                                        Sign Up
                                   </Button>
                              </Link>
                              <Link href="/sign-in">
                                   <Button className="hover:cursor-pointer">
                                        Sign In
                                   </Button>
                              </Link>
                         </SignedOut>
                         <SignedIn>
                              <UserButton />
                         </SignedIn>
                    </div>
               </div>
          </nav>
     );
};

export default Navbar;
