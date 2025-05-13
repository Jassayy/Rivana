"use server";

import { neon } from "@neondatabase/serverless";

export async function getDbConnection() {
     const sql = await neon(process.env.DATABASE_URL!);

     return sql;
}
