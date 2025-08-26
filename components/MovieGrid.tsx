// components/MovieGrid.tsx
import MovieCard from "./MovieCard";

export default function MovieGrid({ movies }: { movies: any[] }) {
  if (!movies || movies.length === 0) {
    return <div className="text-gray-400">No movies found.</div>;
  }
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
      {movies.map((m: any) => (
        <MovieCard key={m._id} movie={m} />
      ))}
    </div>
  );
}
