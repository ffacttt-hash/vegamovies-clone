// app/page.tsx
import MovieGrid from "@/components/MovieGrid";
import { connectDB } from "@/lib/db";
import Movie from "@/models/Movie";

export default async function Home() {
  await connectDB();
  const latest = await Movie.find({}).sort({ uploadDate: -1 }).limit(24).lean();
  const trending = await Movie.find({ autoImported: true }).sort({ uploadDate: -1 }).limit(8).lean();

  return (
    <main>
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Trending Now</h2>
        <MovieGrid movies={trending} />
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">Latest Uploads</h2>
        <MovieGrid movies={latest} />
      </section>
    </main>
  );
}
