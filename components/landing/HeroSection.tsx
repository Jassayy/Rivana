"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { Button } from "../ui/button";
import Footer from "./Footer";
import Navbar from "./Nav";
import Image from "next/image";

export function HeroSectionOne() {
     return (
          <div className="relative mx-auto my-10 flex max-w-7xl flex-col items-center justify-center ">
               <Navbar />

               <div className="absolute inset-y-0 left-0 h-full w-px bg-neutral-200/80 dark:bg-neutral-800/80">
                    <div className="absolute top-0 h-40 w-px bg-gradient-to-b from-transparent via-blue-500 to-transparent" />
               </div>
               <div className="absolute inset-y-0 right-0 h-full w-px bg-neutral-200/80 dark:bg-neutral-800/80">
                    <div className="absolute h-40 w-px bg-gradient-to-b from-transparent via-blue-500 to-transparent" />
               </div>
               <div className="absolute inset-x-0 bottom-0 h-px w-full bg-neutral-200/80 dark:bg-neutral-800/80">
                    <div className="absolute mx-auto h-px w-40 bg-gradient-to-r from-transparent via-blue-500 to-transparent" />
               </div>
               <div className="px-4 py-10 md:py-20">
                    <h1 className="relative z-10 mx-auto max-w-4xl text-center text-2xl font-bold text-slate-700 md:text-4xl lg:text-7xl dark:text-slate-300">
                         {"Simplify official communication — one click, endless letters."
                              .split(" ")
                              .map((word, index) => (
                                   <motion.span
                                        key={index}
                                        initial={{
                                             opacity: 0,
                                             filter: "blur(4px)",
                                             y: 10,
                                        }}
                                        animate={{
                                             opacity: 1,
                                             filter: "blur(0px)",
                                             y: 0,
                                        }}
                                        transition={{
                                             duration: 0.3,
                                             delay: index * 0.1,
                                             ease: "easeInOut",
                                        }}
                                        className="mr-2 inline-block"
                                   >
                                        {word}
                                   </motion.span>
                              ))}
                    </h1>
                    <motion.p
                         initial={{
                              opacity: 0,
                         }}
                         animate={{
                              opacity: 1,
                         }}
                         transition={{
                              duration: 0.3,
                              delay: 0.8,
                         }}
                         className="relative z-10 mx-auto max-w-xl py-4 text-center text-lg font-normal text-neutral-600 dark:text-neutral-400"
                    >
                         With AI, you can create accurate, professional letters
                         without the hassle — from court notices to cold emails.
                    </motion.p>
                    <motion.div
                         initial={{
                              opacity: 0,
                         }}
                         animate={{
                              opacity: 1,
                         }}
                         transition={{
                              duration: 0.3,
                              delay: 1,
                         }}
                         className="relative z-10 mt-8 flex flex-wrap items-center justify-center gap-4"
                    >
                         <Link href="/">
                              <Button variant="outline">Explore Now</Button>
                         </Link>
                         <Link href="/">
                              <Button>Contact Support</Button>
                         </Link>
                    </motion.div>
                    <motion.div
                         initial={{
                              opacity: 0,
                              y: 10,
                         }}
                         animate={{
                              opacity: 1,
                              y: 0,
                         }}
                         transition={{
                              duration: 0.3,
                              delay: 1.2,
                         }}
                         className="relative z-10 mt-20 rounded-3xl border border-neutral-200 bg-neutral-100 p-4 shadow-md dark:border-neutral-800 dark:bg-neutral-900"
                    >
                         <div className="w-full overflow-hidden rounded-xl border border-gray-300 dark:border-gray-700">
                              <Image
                                   src="/image.png"
                                   alt="Landing page preview"
                                   className="aspect-[16/9] h-auto w-full object-cover"
                                   height={1000}
                                   width={1000}
                              />
                         </div>
                    </motion.div>
               </div>
               <Footer />
          </div>
     );
}
