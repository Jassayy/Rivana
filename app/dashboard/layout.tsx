"use client";

import {
     Sidebar,
     SidebarContent,
     SidebarFooter,
     SidebarHeader,
     SidebarMenu,
     SidebarMenuButton,
     SidebarMenuItem,
     SidebarProvider,
     SidebarTrigger,
} from "@/components/ui/sidebar";
import { UserButton } from "@clerk/nextjs";
import {
     BookDashed,
     BookMarked,
     ClockIcon,
     LayoutDashboardIcon,
     ZapIcon,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import clsx from "clsx";
import { usePathname } from "next/navigation";

const menuItems = [
     {
          icon: LayoutDashboardIcon,
          label: "Dashboard",
          href: "/dashboard",
          tooltip: "Dashboard",
     },
     {
          icon: ClockIcon,
          label: "Recents",
          href: "/dashboard/recents",
          tooltip: "Recents",
     },
     {
          icon: BookDashed,
          label: "Templates",
          href: "/dashboard/templates",
          tooltip: "Templates",
     },

     {
          icon: ZapIcon,
          label: "Upgrade",
          href: "/dashboard/upgrade",
          tooltip: "Upgrade",
     },
];

export default function DashboardLayout({
     children,
}: {
     children: React.ReactNode;
}) {
     const pathname = usePathname();
     console.log(pathname);

     return (
          <SidebarProvider defaultOpen={true}>
               <div className="flex min-h-screen">
                    <Sidebar>
                         <SidebarHeader>
                              <div className="flex justify-center">
                                   {" "}
                                   <Image
                                        src="/logo.svg"
                                        alt="Logo Image"
                                        height={100}
                                        width={100}
                                   />
                              </div>
                         </SidebarHeader>
                         <br />
                         <SidebarContent>
                              <SidebarMenu>
                                   {menuItems.map((item, index) => (
                                        <SidebarMenuItem key={index}>
                                             <SidebarMenuButton
                                                  asChild
                                                  tooltip={item.tooltip}
                                             >
                                                  <Link
                                                       href={item.href}
                                                       className={clsx(
                                                            "py-5 px-5",
                                                            {
                                                                 "bg-gray-100":
                                                                      pathname ===
                                                                      item.href,
                                                            }
                                                       )}
                                                  >
                                                       <item.icon className="text-lg" />
                                                       <span className="text-lg">
                                                            {item.label}
                                                       </span>
                                                  </Link>
                                             </SidebarMenuButton>
                                        </SidebarMenuItem>
                                   ))}
                              </SidebarMenu>
                         </SidebarContent>
                         <SidebarFooter className="p-4">
                              <div className="flex items-center justify-between">
                                   <div className="flex items-center gap-2">
                                        <UserButton afterSignOutUrl="/" />{" "}
                                        <span className="text-lg">Profile</span>
                                   </div>
                              </div>
                         </SidebarFooter>
                    </Sidebar>
                    <SidebarTrigger />
               </div>
               <div className="flex-1 p-6">
                    <main>{children}</main>
               </div>
          </SidebarProvider>
     );
}
