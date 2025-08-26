// components/MovieCard.tsx
import Link from "next/link";

export default function MovieCard({ movie }: { movie: any }) {
  return (
    <Link href={`/movies/${movie._id}`} className="block group">
      <div className="bg-gray-900 rounded overflow-hidden">
        <img src={movie.thumbnail || "/default-poster.png"} alt={movie.title} className="w-full h-56 object-cover group-hover:scale-105 transition-transform" />
      </div>
      <h3 className="mt-2 text-sm font-semibold">{movie.title}</h3>
      <div className="text-xs text-gray-400">{movie.year} • {movie.language}</div>
    </Link>
  );
}
