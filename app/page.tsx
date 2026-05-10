"use client";
import { useEffect, useState } from "react";

export default function Home() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&language=ar`)
      .then(res => res.json())
      .then(data => setMovies(data.results));
  }, []);

  return (
    <main className="min-h-screen bg-zinc-950 text-white">
      <nav className="bg-zinc-900 px-8 py-4 flex items-center justify-between border-b border-zinc-800">
        <h1 className="text-2xl font-bold text-yellow-400">The Movie</h1>
        <div className="flex gap-6 text-zinc-400">
          <span className="hover:text-white cursor-pointer">أفلام</span>
          <span className="hover:text-white cursor-pointer">مسلسلات</span>
          <span className="hover:text-white cursor-pointer">قائمتي</span>
        </div>
      </nav>

      <section className="px-8 py-10">
        <h2 className="text-xl font-semibold mb-6 text-zinc-200">أفضل الأفلام</h2>
        <div className="grid grid-cols-3 gap-6">
          {movies.map((movie: any) => (
            <div key={movie.id} onClick={() => window.location.href = `/movie/${movie.id}`} className="bg-zinc-900 rounded-xl overflow-hidden border border-zinc-800 hover:border-yellow-400 transition-all cursor-pointer">
              <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} className="w-full h-64 object-cover"/>
              <div className="p-4">
                <h3 className="font-semibold text-white">{movie.title}</h3>
                <div className="flex items-center gap-1 mt-2">
                  <span className="text-yellow-400">★</span>
                  <span className="text-yellow-400 font-bold">{movie.vote_average.toFixed(1)}</span>
                  <span className="text-zinc-500 text-sm">/10</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}