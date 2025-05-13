"use server";
import { saveTemplate } from "@/lib/dbutitls";
import { auth } from "@clerk/nextjs/server";

export async function saveAsTemplate(name: string, content: string) {
  try {
    const { userId } = await auth();
    
    if (!userId) {
      throw new Error("Authentication required");
    }
    
    const templateId = await saveTemplate(userId, name, content);
    return { success: true, templateId };
    
  } catch (error) {
    console.error("Error saving template:", error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : "Failed to save template" 
    };
  }
}