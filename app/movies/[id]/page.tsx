// app/movies/[id]/page.tsx
import Movie from "@/models/Movie";
import { connectDB } from "@/lib/db";

export default async function MoviePage({ params }: { params: { id: string } }) {
  await connectDB();
  const movie = await Movie.findById(params.id).lean();
  if (!movie) return <div>Movie not found</div>;

  return (
    <div className="grid md:grid-cols-3 gap-6">
      <div>
        <img src={movie.thumbnail || "/default-poster.png"} alt={movie.title} className="rounded" />
        <div className="mt-2">
          <p><strong>Year:</strong> {movie.year}</p>
          <p><strong>Language:</strong> {movie.language}</p>
          <p><strong>Genres:</strong> {movie.genres?.join(", ")}</p>
        </div>
      </div>

      <div className="md:col-span-2">
        <h1 className="text-2xl font-bold mb-2">{movie.title}</h1>
        <p className="mb-4">{movie.description}</p>

        <div>
          <h3 className="font-semibold mb-2">Download Links</h3>
          {movie.links && movie.links.length > 0 ? (
            <ul>
              {movie.links.map((l: any, i: number) => (
                <li key={i}>
                  <a href={l.url} target="_blank" rel="noreferrer" className="text-blue-400 underline">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          ) : (
            <div className="text-sm text-gray-300">No download links added yet.</div>
          )}
        </div>
      </div>
    </div>
  );
}
