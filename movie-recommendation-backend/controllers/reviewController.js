// controllers/reviewController.js
const { executeQuery } = require('../config/database');

// Fetch all reviews for a movie
const getReviewsForMovie = async (req, res) => {
  const query = 'SELECT * FROM reviews WHERE movieid = ?';
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
  const { movie_id, user_id, review_text, rating } = req.body;
  const query = 'INSERT INTO reviews (userid, reviewtext, rating, movieid) VALUES (?, ?, ?, ?)';
  try {
    const result = await executeQuery(query, [user_id, review_text, rating, movie_id]);
    res.status(201).json({ message: 'Review added', id: result.insertId });
  } catch (error) {
    res.status(500).json({ error: 'Error adding review' });
    console.log("error: ",error);
    console.log(error);
  }
};

module.exports = {
  getReviewsForMovie,
  addReview,
};
