// controllers/movieController.js
const { executeQuery } = require('../config/database');

// Fetch all movies
const getAllMovies = async (req, res) => {
  const query = 'SELECT * FROM movies'; // Write the SQL query here
  try {
    const movies = await executeQuery(query);
    res.status(200).json(movies);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching movies' });
  }
};

// Fetch movie by ID
const getMovieById = async (req, res) => {
  const query = 'SELECT * FROM movies WHERE id = ?';
  const { id } = req.params;
  try {
    const movie = await executeQuery(query, [id]);
    if (movie.length === 0) {
      return res.status(404).json({ error: 'Movie not found' });
    }
    res.status(200).json(movie[0]);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching movie' });
  }
};

// Create a new movie
const createMovie = async (req, res) => {
  const { title, genre, release_date } = req.body;
  const query = 'INSERT INTO movies (title, genre, release_date) VALUES (?, ?, ?)';
  try {
    const result = await executeQuery(query, [title, genre, release_date]);
    res.status(201).json({ message: 'Movie created', id: result.insertId });
  } catch (error) {
    res.status(500).json({ error: 'Error creating movie' });
  }
};

// Update movie
const updateMovie = async (req, res) => {
  const { title, genre, release_date } = req.body;
  const { id } = req.params;
  const query = 'UPDATE movies SET title = ?, genre = ?, release_date = ? WHERE id = ?';
  try {
    await executeQuery(query, [title, genre, release_date, id]);
    res.status(200).json({ message: 'Movie updated' });
  } catch (error) {
    res.status(500).json({ error: 'Error updating movie' });
  }
};

// Delete movie
const deleteMovie = async (req, res) => {
  const query = 'DELETE FROM movies WHERE id = ?';
  const { id } = req.params;
  try {
    await executeQuery(query, [id]);
    res.status(200).json({ message: 'Movie deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting movie' });
  }
};

module.exports = {
  getAllMovies,
  getMovieById,
  createMovie,
  updateMovie,
  deleteMovie,
};
