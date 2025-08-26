// app/admin/dashboard/page.tsx
import { connectDB } from "@/lib/db";
import Movie from "@/models/Movie";
import Link from "next/link";

export default async function Dashboard() {
  await connectDB();
  const movies = await Movie.find({}).sort({ uploadDate: -1 }).lean();

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        <Link href="/admin/upload" className="bg-blue-600 px-4 py-2 rounded">Add Movie</Link>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full table-auto border-collapse">
          <thead>
            <tr className="text-left">
              <th className="p-2">Title</th>
              <th className="p-2">Year</th>
              <th className="p-2">Auto</th>
              <th className="p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {movies.map((m: any) => (
              <tr key={m._id} className="border-t">
                <td className="p-2">{m.title}</td>
                <td className="p-2">{m.year}</td>
                <td className="p-2">{m.autoImported ? "Yes" : "No"}</td>
                <td className="p-2">
                  <Link href={`/movies/${m._id}`} className="mr-3 text-blue-400">View</Link>
                  <Link href={`/admin/upload?id=${m._id}`} className="mr-3 text-yellow-400">Edit</Link>
                  <button
                    className="text-red-400"
                    onClick={async () => {
                      if (!confirm("Delete this movie?")) return;
                      await fetch(`/api/movies/${m._id}`, { method: "DELETE" });
                      location.reload();
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
