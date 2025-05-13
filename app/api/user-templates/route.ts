import {  NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { getUserTemplates } from "@/lib/dbutitls";

export async function GET() {
     try {
          // Get the user session from Clerk
          const { userId } = await auth();

          if (!userId) {
               return NextResponse.json(
                    { error: "Unauthorized" },
                    { status: 401 }
               );
          }

          // Get user templates
          const templates = await getUserTemplates(userId);

          return NextResponse.json({ templates });
     } catch (error) {
          console.error("Error in user-templates API:", error);
          return NextResponse.json(
               { error: "Failed to fetch templates" },
               { status: 500 }
          );
     }
}
