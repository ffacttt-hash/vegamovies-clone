// app/category/year/[year]/page.tsx
import MovieGrid from "@/components/MovieGrid";
import { connectDB } from "@/lib/db";
import Movie from "@/models/Movie";

export default async function YearPage({ params }: { params: { year: string } }) {
  await connectDB();
  const movies = await Movie.find({ year: Number(params.year) }).sort({ uploadDate: -1 }).lean();
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Year: {params.year}</h1>
      <MovieGrid movies={movies} />
    </div>
  );
}
