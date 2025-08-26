// app/search/page.tsx
import MovieGrid from "@/components/MovieGrid";

export default async function Search({ searchParams }: { searchParams?: { query?: string } }) {
  const query = searchParams?.query || "";
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/movies?title=${encodeURIComponent(query)}`,
    { cache: "no-store" }
  );
  const movies = await res.json();

  return (
    <div>
      <h1 className="text-xl font-bold mb-4">Search results for "{query}"</h1>
      <MovieGrid movies={movies} />
    </div>
  );
}
