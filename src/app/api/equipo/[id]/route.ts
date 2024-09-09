import { NextResponse } from "next/server";
import { z } from "zod";
import { sql } from "@vercel/postgres";
import { createResponse } from "@/lib/utils";

export async function GET(
    request: Request,
    { params }: { params: { id: string } }
  ) {
    const { id } = params;
  
  NextResponse.json(createResponse(true, [], "consulta exitosa"), {
    status: 200,
  });
}
