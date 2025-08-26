// app/api/auth/route.ts
import { NextResponse } from "next/server";
import { signAdmin } from "@/lib/auth";

export async function POST(req: Request) {
  const body = await req.json();
  const email = process.env.ADMIN_EMAIL;
  const pass = process.env.ADMIN_PASSWORD;

  if (!email || !pass) {
    return NextResponse.json({ error: "Admin credentials not configured" }, { status: 500 });
  }

  const { email: inEmail, password } = body;
  if (inEmail !== email || password !== pass) {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  }

  const token = signAdmin({ email: inEmail });
  const res = NextResponse.json({ ok: true });
  // set httpOnly cookie
  res.cookies.set({
    name: "token",
    value: token,
    httpOnly: true,
    path: "/",
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 7 // 7 days
  });
  return res;
}
