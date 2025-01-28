import axios from 'axios';

async function fetchMovie(id) {
  const response = await axios.get(`http://localhost:5002/api/movies/${id}`);
  return response.data;
}

export default async function MovieDetails({ params }) {
  const { id } = params;
  const movie = await fetchMovie(id);

  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold">{movie.title}</h1>
      <p className="text-gray-600">{movie.description}</p>
      <p className="mt-2">Release Date: {movie.release_date}</p>
    </main>
  );
}
