import { HeroSectionOne } from "@/components/landing/HeroSection";
import { auth, currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function Home() {
     const { userId } = await auth();

     const user = await currentUser();

     if (userId || user) {
          redirect("/dashboard");
     }
     return (
          <>
               <HeroSectionOne />
          </>
     );
}
