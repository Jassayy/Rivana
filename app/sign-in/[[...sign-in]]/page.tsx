import { BackgroundLines } from "@/components/background/background-lines";
import { SignIn } from "@clerk/nextjs";

export default function Page() {
     return (
          <div className="relative min-h-screen pt-24 flex items-center justify-center">
               <BackgroundLines className="flex justify-center items-center">
                    <SignIn afterSignInUrl="/dashboard" />
               </BackgroundLines>
          </div>
     );
}
