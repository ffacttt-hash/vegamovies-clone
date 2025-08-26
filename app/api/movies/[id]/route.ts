// app/api/movies/[id]/route.ts
import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Movie from "@/models/Movie";
import { getAdminFromCookies } from "@/lib/auth";

export async function GET(_: Request, { params }: { params: { id: string } }) {
  await connectDB();
  const movie = await Movie.findById(params.id);
  if (!movie) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(movie);
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  await connectDB();
  const admin = getAdminFromCookies();
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  const movie = await Movie.findByIdAndUpdate(params.id, body, { new: true });
  if (!movie) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(movie);
}

export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  await connectDB();
  const admin = getAdminFromCookies();
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  await Movie.findByIdAndDelete(params.id);
  return NextResponse.json({ ok: true });
}
