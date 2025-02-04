"use client"
import axios from "axios"
import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { Film, Star, Clock, Calendar, Users, Pen, ArrowLeft, Sun, Moon } from "lucide-react"

async function fetchMovie(id) {
  const response = await axios.get(`http://localhost:5002/api/movies/${id}`)
  return response.data
}

async function fetchReviews(id) {
  const response = await axios.get(`http://localhost:5002/api/reviews/${id}`)
  return response.data
}

async function submitReview(movieId, review, rating, userId) {
  const response = await fetch("http://localhost:5002/api/reviews", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ movie_id: movieId, review_text: review, rating: rating, user_id: userId }),
  })
  return response.ok
}

export default function MovieDetails() {
  const { id } = useParams()
  const [movie, setMovie] = useState(null)
  const [reviews, setReviews] = useState([])
  const [review, setReview] = useState("")
  const [rating, setRating] = useState(5)
  const router = useRouter()
  const [isDarkMode, setIsDarkMode] = useState(() => {
    return typeof window !== "undefined" ? localStorage.getItem("darkMode") === "true" : false
  })

  useEffect(() => {
    async function getMovie() {
      try {
        const data = await fetchMovie(id)
        setMovie(data)
      } catch (error) {
        console.error("Error fetching movie:", error)
      }
    }

    async function getReviews() {
      try {
        const data = await fetchReviews(id)
        setReviews(data)
      } catch (error) {
        console.error("Error fetching reviews:", error)
      }
    }

    getMovie()
    getReviews()
  }, [id])

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("darkMode", isDarkMode.toString())
    }
  }, [isDarkMode])
  const userID = localStorage.getItem("fullName")
  const handleSubmit = async (e) => {
    e.preventDefault()
    const success = await submitReview(id, review, rating,userID)
    if (success) {
      setReview("")
      setRating(5)
      const updatedReviews = await fetchReviews(id)
      setReviews(updatedReviews)
    } else {
      alert("Failed to add review")
    }
  }

  if (!movie) {
    return (
      <div
        className={`flex items-center justify-center h-screen ${isDarkMode ? "bg-black text-white" : "bg-gray-100 text-gray-900"}`}
      >
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-red-500"></div>
      </div>
    )
  }
  return (
    <main
      className={`min-h-screen transition-colors duration-300 ${isDarkMode ? "bg-black text-white" : "bg-gray-100 text-gray-900"}`}
    >
      {/* Navbar */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 ${isDarkMode ? "bg-gradient-to-b from-black/80 to-black/0" : "bg-gradient-to-b from-white/80 to-white/0"}`}
      >
        <div className="container mx-auto px-4 h-20">
          <div className="flex items-center justify-between h-full">
            <Link href="/" className="flex items-center space-x-2">
              <Film className={`h-8 w-8 ${isDarkMode ? "text-red-500" : "text-red-600"}`} />
              <span className="text-2xl font-bold">MovieFinder</span>
            </Link>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setIsDarkMode(!isDarkMode)}
                className={`p-2 rounded-full transition-colors ${
                  isDarkMode
                    ? "bg-gray-800 text-yellow-400 hover:bg-gray-700"
                    : "bg-gray-200 text-gray-800 hover:bg-gray-300"
                }`}
              >
                {isDarkMode ? <Sun size={22} /> : <Moon size={22} />}
              </button>
              <Link href="/profile">
                <button
                  className={`px-4 py-2 rounded-full font-medium transition-colors ${
                    isDarkMode ? "bg-red-500 hover:bg-red-600 text-white" : "bg-red-600 hover:bg-red-700 text-white"
                  }`}
                >
                  Profile
                </button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Movie Details */}
      <div className="container mx-auto px-4 pt-24 pb-12">
        <button
          onClick={() => router.back()}
          className={`mb-8 flex items-center space-x-2 px-4 py-2 rounded-full transition-colors ${
            isDarkMode ? "bg-gray-800 hover:bg-gray-700 text-white" : "bg-white hover:bg-gray-100 text-gray-900"
          }`}
        >
          <ArrowLeft size={20} />
          <span>Back to Search</span>
        </button>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Movie Information */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className={`lg:w-2/3 rounded-xl overflow-hidden shadow-2xl ${isDarkMode ? "bg-gray-900" : "bg-white"}`}
          >
            <div className="relative h-96 overflow-hidden">
              <img src={movie.Poster || "/placeholder.svg"} alt={movie.Title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
              <div className="absolute bottom-0 left-0 p-6">
                <h1 className="text-4xl font-bold text-white mb-2">{movie.Title}</h1>
                <div className="flex items-center space-x-4 text-gray-300">
                  <span className="flex items-center">
                    <Calendar size={16} className="mr-1" /> {movie.Released}
                  </span>
                  <span className="flex items-center">
                    <Clock size={16} className="mr-1" /> {movie.Runtime}
                  </span>
                  <span className="flex items-center">
                    <Star size={16} className="mr-1 text-yellow-400" /> {movie.imdbRating}
                  </span>
                </div>
              </div>
            </div>
            <div className="p-6 space-y-4">
              <p className="text-lg">{movie.Plot}</p>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="font-semibold text-gray-500">Genre</h3>
                  <p>{movie.Genre}</p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-500">Director</h3>
                  <p>{movie.Director}</p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-500">Writers</h3>
                  <p>{movie.Writer}</p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-500">Actors</h3>
                  <p>{movie.Actors}</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Reviews Section */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className={`lg:w-1/3 space-y-6 ${isDarkMode ? "text-white" : "text-gray-900"}`}
          >
            <div className={`p-6 rounded-xl shadow-xl ${isDarkMode ? "bg-gray-900" : "bg-white"}`}>
              <h2 className="text-2xl font-bold mb-4 flex items-center">
                <Pen className="mr-2" /> Add Your Review
              </h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Your thoughts</label>
                  <textarea
                    value={review}
                    onChange={(e) => setReview(e.target.value)}
                    className={`w-full p-2 border rounded-md ${
                      isDarkMode ? "bg-gray-800 border-gray-700" : "bg-gray-100 border-gray-300"
                    }`}
                    rows={4}
                    required
                  ></textarea>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Rating</label>
                  <div className="flex items-center space-x-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setRating(star)}
                        className={`text-2xl ${star <= rating ? "text-yellow-400" : "text-gray-400"}`}
                      >
                        ★
                      </button>
                    ))}
                  </div>
                </div>
                <button
                  type="submit"
                  className="w-full px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
                >
                  Submit Review
                </button>
              </form>
            </div>

            <div className={`p-6 rounded-xl shadow-xl ${isDarkMode ? "bg-gray-900" : "bg-white"}`}>
              <h2 className="text-2xl font-bold mb-4 flex items-center">
                <Users className="mr-2" /> User Reviews
              </h2>
              <AnimatePresence>
                {reviews.length > 0 ? (
                  reviews.map((r, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.3 }}
                      className={`p-4 rounded-md mb-4 ${isDarkMode ? "bg-gray-800" : "bg-gray-100"}`}
                    >
                      <h2>{r.userid}</h2>
                      <p className="mb-2">{r.reviewtext}</p>
                      <div className="flex items-center text-yellow-400">
                        {
                        Array.from({ length: 5 }).map((_, i) => (
                          <Star key={i} size={16} fill={i < r.rating ? "currentColor" : "none"} />
                        ))}
                        <span className="ml-2 text-sm">{r.rating}/5</span>
                      </div>
                    </motion.div>
                  ))
                ) : (
                  <p className="text-gray-500 italic">No reviews yet. Be the first to review!</p>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
    </main>
  )
}

