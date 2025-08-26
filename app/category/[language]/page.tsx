// app/category/[language]/page.tsx
import MovieGrid from "@/components/MovieGrid";
import { connectDB } from "@/lib/db";
import Movie from "@/models/Movie";

export default async function LanguagePage({ params }: { params: { language: string } }) {
  await connectDB();
  const movies = await Movie.find({ language: params.language }).sort({ uploadDate: -1 }).lean();
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">{params.language}</h1>
      <MovieGrid movies={movies} />
    </div>
  );
}
