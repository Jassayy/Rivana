"use server";
import { getDbConnection } from "./db";

export async function findOrCreateUser(userId: string) {
     try {
          const sql = await getDbConnection();

          // First, try to find the user
          const findUserResult = await sql`
      SELECT id FROM users WHERE userid = ${userId}
    `;

          // If user exists, return the user ID
          if (findUserResult.length > 0) {
               return findUserResult[0].id;
          }

          // If user doesn't exist, create a new user
          const insertUserResult = await sql`
      INSERT INTO users (userid, plan) 
      VALUES (${userId}, 'free') 
      RETURNING id
    `;

          return insertUserResult[0].id;
     } catch (err) {
          console.error("Error finding or creating user:", err);
          throw err;
     }
}

export async function saveGeneratedContent(
     userId: string,
     prompt: string,
     content: string
) {
     try {
          // Find or create user first
          const userDbId = await findOrCreateUser(userId);

          // Insert generated content
          const sql = await getDbConnection();
          const result = await sql`
      INSERT INTO generated_content (user_id, prompt, content)
      VALUES (${userDbId}, ${prompt}, ${content})
      RETURNING id
    `;

          return result[0].id;
     } catch (err) {
          console.error("Error saving generated content:", err);
          throw err;
     }
}

export async function getUserGeneratedContents(userId: string) {
     try {
          const userDbId = await findOrCreateUser(userId);

          const sql = await getDbConnection();
          const contents = await sql`
      SELECT id, prompt, content, created_at
      FROM generated_content
      WHERE user_id = ${userDbId}
      ORDER BY created_at DESC
    `;

          return contents;
     } catch (error) {
          console.error("Error fetching user contents:", error);
          throw error;
     }
}

export async function getUserTemplates(userId: string) {
     try {
          const userDbId = await findOrCreateUser(userId);

          const sql = await getDbConnection();
          const templates = await sql`
         SELECT id, name, content, created_at
         FROM templates
         WHERE user_id = ${userDbId}
         ORDER BY created_at DESC
         `;

          return templates;
     } catch (error) {
          console.error("Error fetching user templates:", error);
          throw error;
     }
}

export async function saveTemplate(
     userId: string,
     name: string,
     content: string
) {
     try {
          // Find or create user first
          const userDbId = await findOrCreateUser(userId);

          // Insert template
          const sql = await getDbConnection();
          const result = await sql`
         INSERT INTO templates (user_id, name, content)
         VALUES (${userDbId}, ${name}, ${content})
         RETURNING id
         `;

          return result[0].id;
     } catch (err) {
          console.error("Error saving template:", err);
          throw err;
     }
}
