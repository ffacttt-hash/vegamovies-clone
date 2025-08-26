// components/Navbar.tsx
"use client";
import Link from "next/link";
import SearchBar from "./SearchBar";

export default function Navbar() {
  return (
    <nav className="bg-[#021024] py-3 border-b border-gray-800">
      <div className="container flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/" className="flex items-center gap-2">
            <img src="/logo.png" alt="logo" className="w-10 h-10" />
            <span className="font-bold text-lg">VegaMovies</span>
          </Link>
          <div className="hidden md:flex items-center gap-3">
            <Link href="/category/Bollywood">Bollywood</Link>
            <Link href="/category/Hollywood">Hollywood</Link>
            <Link href="/category/Dual Audio">Dual Audio</Link>
            <Link href="/category/Tamil">Tamil</Link>
            <Link href="/category/Telugu">Telugu</Link>
            <Link href="/category/TV Shows">TV Shows</Link>
          </div>
        </div>

        <div className="flex-1 px-4">
          <SearchBar />
        </div>

        <div className="flex gap-3">
          <Link href="/admin/login" className="px-3 py-1 border rounded">Admin</Link>
        </div>
      </div>
    </nav>
  );
}
