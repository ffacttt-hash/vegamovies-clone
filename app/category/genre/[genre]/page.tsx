// app/category/genre/[genre]/page.tsx
import MovieGrid from "@/components/MovieGrid";
import { connectDB } from "@/lib/db";
import Movie from "@/models/Movie";

export default async function GenrePage({ params }: { params: { genre: string } }) {
  await connectDB();
  const movies = await Movie.find({ genres: params.genre }).sort({ uploadDate: -1 }).lean();
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Genre: {params.genre}</h1>
      <MovieGrid movies={movies} />
    </div>
  );
}
