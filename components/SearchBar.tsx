// components/SearchBar.tsx
"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SearchBar() {
  const [q, setQ] = useState("");
  const router = useRouter();

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!q.trim()) return;
    router.push(`/search?query=${encodeURIComponent(q.trim())}`);
  }

  return (
    <form onSubmit={onSubmit} className="flex items-center">
      <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search movies, genre, year..." className="w-full p-2 rounded-l bg-gray-800" />
      <button type="submit" className="px-3 py-2 bg-blue-600 rounded-r">Search</button>
    </form>
  );
}
