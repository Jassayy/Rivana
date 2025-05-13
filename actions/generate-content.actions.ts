"use server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY as string);

export default async function generateContent(prompt: string) {
     try {
          // Generate content using Gemini
          const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
          const result = await model.generateContent({
               contents: [{ role: "user", parts: [{ text: prompt }] }],
          });
          const response = await result.response;
          return response.text();
     } catch (error) {
          console.error("Error generating content", error);
          throw new Error("Failed to generate content");
     }
}