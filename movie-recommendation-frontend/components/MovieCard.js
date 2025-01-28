import React from "react";

const MovieCard = ({ movie }) => {
  return (
    <div className="bg-white shadow-lg rounded-lg p-4 m-4">
      <h2 className="text-xl font-bold">{movie.title}</h2>
      <p className="text-gray-700 mt-2">{movie.genre}</p>
      <p className="text-gray-500 mt-2">Release Date: {movie.release_date}</p>
      <p className="text-yellow-500 mt-2">Rating: ⭐ {movie.rating}/10</p>
    </div>
  );
};

export default MovieCard;
