import { BackgroundLines } from "@/components/background/background-lines";
import { SignUp } from "@clerk/nextjs";

export default function Page() {
     return (
          <div className="relative min-h-screen pt-24 flex items-center justify-center">
               <BackgroundLines className="flex justify-center items-center">
                    <SignUp afterSignUpUrl="/dashboard" />
               </BackgroundLines>
          </div>
     );
}
