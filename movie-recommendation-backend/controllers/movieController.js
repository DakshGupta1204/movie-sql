// controllers/movieController.js
const axios = require('axios');
const { executeQuery } = require('../config/database');

// Fetch movie data from the API and store in database 
// const OMDB_URL = 'http://www.omdbapi.com/?i=tt3896198&apikey=';
// const fetchAndStoreMovies = async () => {
//   try {
//     const response = await axios.get(`${OMDB_URL}${process.env.OMDB_API_KEY}`);
//     console.log("response: ",response);
//     const movies = response.data.results;
//     console.log("movies: ",movies);
//     const query = 'INSERT INTO movies (title, genre, release_date) VALUES (?, ?, ?)';
//     movies.forEach(async (movie) => {
//       console.log("movie: ",movie);
//       const { title, genre_ids, release_date } = movie;
//       const genre = genre_ids[0];
//       await executeQuery(query, [title, genre, release_date]);
//     });
//   } catch (error) {
//     console.error('Error fetching/storing movies',error);
//   }
// };

// fetchAndStoreMovies();


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
  const { id } = req.params;
  const OMDB_URL = `http://www.omdbapi.com/?i=${id}&apikey=${process.env.OMDB_API_KEY}`;
  try {
    const response = await axios.get(OMDB_URL);
    if (response.data.Response === "False") {
      return res.status(404).json({ error: "Movie not found" });
    }
    res.status(200).json(response.data);
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
// Fetch movie by name from OMDB API
const getMovieByName = async (req, res) => {
  const { name } = req.params;
  const page = req.query.page || 1;
  const OMDB_URL = `http://www.omdbapi.com/?apikey=${process.env.OMDB_API_KEY}&s=${encodeURIComponent(name)}&page=${page}`;

  try {
    const response = await axios.get(OMDB_URL);
    if (response.data.Response === "False") {
      return res.status(404).json({ error: "Movie not found" });
    }
    res.status(200).json(response.data);
  } catch (error) {
    res.status(500).json({ error: "Error fetching movie from OMDB API" });
  }
};

module.exports = {
  getMovieByName,
};

module.exports = {
  getAllMovies,
  getMovieById,
  createMovie,
  updateMovie,
  deleteMovie,
  getMovieByName,
};
