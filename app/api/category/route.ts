import { NextRequest, NextResponse } from "next/server";
import sql from "@/lib/db"

export async function GET(request: NextRequest) {
    const data = await sql`select * from category`;
    return new NextResponse(JSON.stringify(data));
}
