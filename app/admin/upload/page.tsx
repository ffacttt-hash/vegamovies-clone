// app/admin/upload/page.tsx
"use client";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function UploadPage() {
  const [form, setForm] = useState({
    title: "",
    description: "",
    year: "",
    language: "",
    genres: "",
    thumbnail: "",
    resolutions: "",
    sizes: "",
    links: ""
  });
  const search = useSearchParams();
  const id = search.get("id");
  const router = useRouter();

  useEffect(() => {
    if (!id) return;
    // fetch movie to edit
    (async () => {
      const res = await fetch(`/api/movies/${id}`);
      const data = await res.json();
      if (res.ok) {
        setForm({
          title: data.title || "",
          description: data.description || "",
          year: data.year?.toString() || "",
          language: data.language || "",
          genres: (data.genres || []).join(", "),
          thumbnail: data.thumbnail || "",
          resolutions: (data.resolutions || []).join(", "),
          sizes: (data.sizes || []).join(", "),
          links: (data.links || []).map((l: any) => `${l.label}|${l.url}`).join("\n")
        });
      }
    })();
  }, [id]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const payload: any = {
      title: form.title,
      description: form.description,
      year: form.year ? Number(form.year) : undefined,
      language: form.language,
      genres: form.genres ? form.genres.split(",").map(s => s.trim()) : [],
      thumbnail: form.thumbnail,
      resolutions: form.resolutions ? form.resolutions.split(",").map(s => s.trim()) : [],
      sizes: form.sizes ? form.sizes.split(",").map(s => s.trim()) : [],
      links: form.links ? form.links.split("\n").map(l => {
        const [label, url] = l.split("|").map(s => s.trim());
        return { label, url };
      }) : []
    };

    const endpoint = id ? `/api/movies/${id}` : "/api/movies";
    const method = id ? "PUT" : "POST";

    const res = await fetch(endpoint, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    if (res.ok) {
      router.push("/admin/dashboard");
    } else {
      alert("Error saving movie");
    }
  }

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">{id ? "Edit Movie" : "Add Movie"}</h1>
      <form onSubmit={handleSubmit} className="space-y-3">
        <input placeholder="Title" value={form.title} onChange={(e) => setForm({...form, title: e.target.value})} className="w-full p-2 rounded bg-gray-800" required />
        <textarea placeholder="Description" value={form.description} onChange={(e) => setForm({...form, description: e.target.value})} className="w-full p-2 rounded bg-gray-800" />
        <input placeholder="Year" value={form.year} onChange={(e) => setForm({...form, year: e.target.value})} className="w-full p-2 rounded bg-gray-800" />
        <input placeholder="Language" value={form.language} onChange={(e) => setForm({...form, language: e.target.value})} className="w-full p-2 rounded bg-gray-800" />
        <input placeholder="Genres (comma separated)" value={form.genres} onChange={(e) => setForm({...form, genres: e.target.value})} className="w-full p-2 rounded bg-gray-800" />
        <input placeholder="Thumbnail URL" value={form.thumbnail} onChange={(e) => setForm({...form, thumbnail: e.target.value})} className="w-full p-2 rounded bg-gray-800" />
        <input placeholder="Resolutions (comma separated)" value={form.resolutions} onChange={(e) => setForm({...form, resolutions: e.target.value})} className="w-full p-2 rounded bg-gray-800" />
        <input placeholder="Sizes (comma separated)" value={form.sizes} onChange={(e) => setForm({...form, sizes: e.target.value})} className="w-full p-2 rounded bg-gray-800" />
        <textarea placeholder="Links - one per line label|url" value={form.links} onChange={(e) => setForm({...form, links: e.target.value})} className="w-full p-2 rounded bg-gray-800" />
        <div className="flex gap-2">
          <button className="bg-green-600 px-4 py-2 rounded">Save</button>
          <button type="button" className="bg-gray-600 px-4 py-2 rounded" onClick={() => window.history.back()}>Cancel</button>
        </div>
      </form>
    </div>
  );
}
