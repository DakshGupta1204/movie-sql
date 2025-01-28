import MovieCard from '@/components/MovieCard';
import axios from 'axios';

async function fetchMovies() {
  const response = await axios.get('http://localhost:5002/api/movies/');
  return response.data;
}

export default async function MoviesPage() {
  const movies = await fetchMovies();
  console.log(movies);
  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold mb-4">Movies</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </main>
  );
}
