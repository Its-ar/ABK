import { supabase } from "../../../lib/supabese";
import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";

export async function POST(req: Request) {
  const body = await req.json();
  const { name, email, password, role } = body;

  const { data, error } = await supabase.from("users").insert([
    {
      id: uuidv4(),
      name,
      email,
      password, // hash dulu kalau produksi ya
      role,
    },
  ]);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true, data });
}
