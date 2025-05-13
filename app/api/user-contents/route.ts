import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { getUserGeneratedContents } from "@/lib/dbutitls";

export async function GET() {
     try {
          // Get the current authenticated user
          const { userId } = await auth();

          if (!userId) {
               return NextResponse.json(
                    { error: "Unauthorized" },
                    { status: 401 }
               );
          }

          // Fetch user's content history
          const contents = await getUserGeneratedContents(userId);

          return NextResponse.json(contents);
     } catch (error) {
          console.error("Error fetching user contents:", error);
          return NextResponse.json(
               { error: "Failed to fetch content history" },
               { status: 500 }
          );
     }
}
