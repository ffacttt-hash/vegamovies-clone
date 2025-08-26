// app/api/movies/route.ts
import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Movie from "@/models/Movie";
import { getAdminFromCookies } from "@/lib/auth";

export async function GET(req: Request) {
  await connectDB();
  const url = new URL(req.url);
  const title = url.searchParams.get("title");
  const language = url.searchParams.get("language");
  const genre = url.searchParams.get("genre");
  const year = url.searchParams.get("year");
  const autoImported = url.searchParams.get("autoImported");

  const filter: any = {};
  if (title) filter.title = { $regex: title, $options: "i" };
  if (language) filter.language = language;
  if (genre) filter.genres = genre;
  if (year) filter.year = Number(year);
  if (autoImported === "true") filter.autoImported = true;
  if (autoImported === "false") filter.autoImported = false;

  const movies = await Movie.find(filter).sort({ uploadDate: -1 });
  return NextResponse.json(movies);
}

export async function POST(req: Request) {
  await connectDB();
  const admin = getAdminFromCookies();
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  // Validate minimal
  if (!body.title) {
    return NextResponse.json({ error: "Title is required" }, { status: 400 });
  }
  const movie = await Movie.create(body);
  return NextResponse.json(movie);
}
