import Image from "next/image";
import React from "react";

const Footer = () => {
     return (
          <footer className="    w-full z-50 backdrop-blur-md bg-transparent border-t ">
               <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                    {/* Logo */}
                    <div className="flex items-center">
                         <Image
                              src="/logo.svg"
                              alt="Logo"
                              width={120}
                              height={60}
                              className="object-contain"
                         />
                    </div>

                    {/* Copyright */}
                    <p className="text-sm text-gray-700">
                         &copy; {new Date().getFullYear()} Rivana. All rights
                         reserved.
                    </p>
               </div>
          </footer>
     );
};

export default Footer;
