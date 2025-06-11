import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);

export async function POST(req: NextRequest) {
  try {
    const { name, email, password, role } = await req.json();

    if (!name || !email || !password || !role) {
      return NextResponse.json({ message: "Semua field wajib diisi" }, { status: 400 });
    }

    // Cek email
    const { data: existingUsers, error: findError } = await supabase.from("users").select("id").eq("email", email);

    if (findError) {
      console.error("Supabase check email error:", findError.message);
      return NextResponse.json({ message: "Terjadi kesalahan saat validasi email" }, { status: 500 });
    }

    if (existingUsers.length > 0) {
      return NextResponse.json({ message: "Email sudah terdaftar" }, { status: 409 });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert user
    const { data: insertedUsers, error: insertError } = await supabase
      .from("users")
      .insert([{ name, email, password: hashedPassword, role }])
      .select();

    if (insertError || !insertedUsers || insertedUsers.length === 0) {
      return NextResponse.json({ message: insertError?.message || "Gagal membuat user" }, { status: 500 });
    }

    const newUser = insertedUsers[0];

    // Generate token (optional kalau mau kirim langsung)
    const token = jwt.sign({ id: newUser.id, email: newUser.email }, process.env.JWT_SECRET!, {
      expiresIn: "1d",
    });

    // Return user data (tanpa password) dan token (optional)
    return NextResponse.json(
      {
        id: newUser.id,
        email: newUser.email,
        role: newUser.role,
        token,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Register error:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}
