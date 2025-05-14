import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { getDbConnection } from "@/lib/db";

export async function GET(
     request: NextRequest,
     { params }: { params: { id: string } }
) {
     try {
          const { userId } = await auth();

          if (!userId) { 
               return NextResponse.json(
                    { error: "Unauthorized" },
                    { status: 401 }
               );
          }

          const templateId = params.id;

          if (!templateId) {
               return NextResponse.json(
                    { error: "Template ID is required" },
                    { status: 400 }
               );
          }

          // Get database connection
          const sql = await getDbConnection();

          // Fetch template ensuring it belongs to the current user
          const result = await sql`
      SELECT t.id, t.name, t.content, t.created_at
      FROM templates t
      JOIN users u ON t.user_id = u.id
      WHERE t.id = ${templateId}
      AND u.userid = ${userId}
    `;

          if (result.length === 0) {
               return NextResponse.json(
                    { error: "Template not found" },
                    { status: 404 }
               );
          }

          return NextResponse.json({ template: result[0] });
     } catch (error) {
          console.error("Error fetching template:", error);
          return NextResponse.json(
               { error: "Failed to fetch template" },
               { status: 500 }
          );
     }
}
