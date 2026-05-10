"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export default function MoviePage() {
  const { id } = useParams();
  const [movie, setMovie] = useState<any>(null);

  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&language=ar`)
      .then(res => res.json())
      .then(data => setMovie(data));
  }, [id]);

  if (!movie) return <div className="min-h-screen bg-zinc-950 text-white flex items-center justify-center">جاري التحميل...</div>;

  return (
    <main className="min-h-screen bg-zinc-950 text-white">
      <nav className="bg-zinc-900 px-8 py-4 border-b border-zinc-800">
        <h1 className="text-2xl font-bold text-yellow-400 cursor-pointer" onClick={() => window.location.href = '/'}>The Movie</h1>
      </nav>
      <div className="flex gap-10 p-10">
        <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} className="w-72 rounded-xl" />
        <div>
          <h2 className="text-4xl font-bold mb-4">{movie.title}</h2>
          <div className="flex items-center gap-2 mb-4">
            <span className="text-yellow-400 text-2xl">★</span>
            <span className="text-yellow-400 text-2xl font-bold">{movie.vote_average?.toFixed(1)}</span>
            <span className="text-zinc-500">/10</span>
          </div>
          <p className="text-zinc-400 text-lg leading-relaxed max-w-2xl">{movie.overview}</p>
        </div>
      </div>
    </main>
  );
}