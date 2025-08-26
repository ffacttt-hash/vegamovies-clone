// app/layout.tsx
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata = {
  title: "VegaMovies Clone",
  description: "Movie catalog clone powered by Next.js and MongoDB"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <div className="container py-6">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
