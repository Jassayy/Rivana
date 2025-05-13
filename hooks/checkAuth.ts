import { auth, currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function checkAuth() {
     const { userId } = await auth();
     const user = await currentUser();

     if (!userId || !user) {
          redirect("/");
     }

     return user;
}
