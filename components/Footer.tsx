// components/Footer.tsx
export default function Footer() {
  return (
    <footer className="bg-[#021024] mt-12 py-6 border-t border-gray-800">
      <div className="container text-sm text-gray-400">
        <div>© {new Date().getFullYear()} VegaMovies Clone. For learning use only.</div>
      </div>
    </footer>
  );
}
