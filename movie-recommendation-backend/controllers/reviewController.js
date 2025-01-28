// controllers/reviewController.js
const { executeQuery } = require('../config/database');

// Fetch all reviews for a movie
const getReviewsForMovie = async (req, res) => {
  const query = 'SELECT * FROM reviews WHERE movie_id = ?';
  const { movie_id } = req.params;
  try {
    const reviews = await executeQuery(query, [movie_id]);
    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching reviews' });
  }
};

// Add a review for a movie
const addReview = async (req, res) => {
  const { movie_id, user_id, review_text } = req.body;
  const query = 'INSERT INTO reviews (movie_id, user_id, review_text) VALUES (?, ?, ?)';
  try {
    const result = await executeQuery(query, [movie_id, user_id, review_text]);
    res.status(201).json({ message: 'Review added', id: result.insertId });
  } catch (error) {
    res.status(500).json({ error: 'Error adding review' });
  }
};

module.exports = {
  getReviewsForMovie,
  addReview,
};
