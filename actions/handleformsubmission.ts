"use server";
import { saveGeneratedContent } from "@/lib/dbutitls";
import generateContent from "./generate-content.actions";
import { auth } from "@clerk/nextjs/server";

export default async function handleSubmission(formData: FormData) {
     const prompt = formData.get("prompt") as string;

     if (!prompt || prompt.trim().length === 0) {
          throw new Error("Prompt cannot be empty");
     }

     try {
          // Get current user ID from Clerk
          const { userId } = await auth();

          // Generate content
          const content = await generateContent(prompt);

          // If user is authenticated, save to database
          if (userId) {
               await saveGeneratedContent(userId, prompt, content);
          }

          return content;
     } catch (error) {
          console.error("Error in handleSubmission:", error);
          throw error;
     }
}
