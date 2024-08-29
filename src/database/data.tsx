import { sql } from "@vercel/postgres";
import { Estudiante } from "./definitions";

export async function fetchGetAllEstudiantes() {
  try {
    // Artificially delay a response for demo purposes.
    // Don't do this in production :)

    console.log("Fetching revenue data...");

    const data = await sql<Estudiante>`SELECT * FROM estudiantes`;

    return data.rows;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch revenue data.");
  }
}