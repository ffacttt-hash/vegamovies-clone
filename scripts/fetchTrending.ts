// scripts/fetchTrending.ts
import axios from "axios";
import { connectDB } from "@/lib/db";
import Movie from "@/models/Movie";
import trending from "@/data/trending.json";

async function fetchTrendingMovies() {
  await connectDB();
  const API_KEY = process.env.OMDB_API_KEY;
  if (!API_KEY) {
    console.error("OMDB API key missing. Set OMDB_API_KEY in .env.local");
    process.exit(1);
  }

  for (const item of trending as { title: string; year: string }[]) {
    try {
      const url = `http://www.omdbapi.com/?apikey=${API_KEY}&t=${encodeURIComponent(item.title)}&y=${item.year}&type=movie`;
      const res = await axios.get(url);
      const data = res.data;
      if (data && data.Response === "True") {
        const exists = await Movie.findOne({ imdbID: data.imdbID });
        if (!exists) {
          await Movie.create({
            imdbID: data.imdbID,
            title: data.Title,
            description: data.Plot,
            year: data.Year ? Number(data.Year.split("–")[0]) : undefined,
            genres: data.Genre ? data.Genre.split(", ").map((g: string) => g.trim()) : [],
            language: data.Language,
            thumbnail: data.Poster !== "N/A" ? data.Poster : "/default-poster.png",
            autoImported: true,
            resolutions: ["1080p"],
            sizes: [],
            links: []
          });
          console.log(`Added ${data.Title}`);
        } else {
          console.log(`${data.Title} already exists`);
        }
      } else {
        console.warn(`OMDb did not return for ${item.title}`);
      }
    } catch (err) {
      console.error("Error fetching", item.title, err);
    }
  }

  console.log("Done fetching trending movies.");
  process.exit(0);
}

fetchTrendingMovies();
