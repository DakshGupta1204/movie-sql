'use client';
import { useState } from 'react';

export default function AddReviewPage() {
  const [movieId, setMovieId] = useState('');
  const [review, setReview] = useState('');
  const [rating, setRating] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch('http://localhost:5002/api/reviews', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ movie_id: movieId, review, rating }),
    });

    if (response.ok) {
      alert('Review added successfully!');
    } else {
      alert('Failed to add review');
    }
  };

  return (
    <main className="p-8">
      <form onSubmit={handleSubmit} className="w-1/2 mx-auto p-4 bg-white shadow-md rounded-md">
        <h1 className="text-2xl font-bold mb-4">Add a Review</h1>
        <div className="mb-4">
          <label className="block text-sm font-medium">Movie ID</label>
          <input
            type="text"
            value={movieId}
            onChange={(e) => setMovieId(e.target.value)}
            className="w-full p-2 border rounded-md"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium">Review</label>
          <textarea
            value={review}
            onChange={(e) => setReview(e.target.value)}
            className="w-full p-2 border rounded-md"
          ></textarea>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium">Rating (1-5)</label>
          <input
            type="number"
            max="5"
            min="1"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
            className="w-full p-2 border rounded-md"
          />
        </div>
        <button type="submit" className="px-4 py-2 bg-green-500 text-white rounded-md">
          Submit
        </button>
      </form>
    </main>
  );
}
