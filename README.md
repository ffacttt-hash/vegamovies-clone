# VegaMovies Clone

This is a full-stack Next.js (App Router) + MongoDB starter that reproduces a VegaMovies-like UI.
It includes:
- OMDb automation script to fetch trending movies (scripts/fetchTrending.ts)
- Admin-only CRUD (JWT stored in httpOnly cookie)
- Search, categories, year and genre pages
- Tailwind CSS for styling

## Setup

1. Copy `.env.example` to `.env.local` and fill values.
2. Install deps:
   ```
   npm install
   ```
3. Run dev:
   ```
   npm run dev
   ```
4. Import trending (manual):
   ```
   npm run fetch:trending
   ```

## Notes
- Replace placeholder env vars with real ones.
- For production, set secure hosting, HTTPS, and secure secret management.
