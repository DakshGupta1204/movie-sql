"use client"
import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Search, Moon, Sun, Film, TrendingUp } from "lucide-react"
import Link from "next/link"
import axios from "axios"
import noimage from "../assets/no.png"
export default function SearchPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [page, setPage] = useState(1);
  useEffect(() => {
    const darkModePreference = localStorage.getItem("darkMode")
    setIsDarkMode(darkModePreference === "true")
  }, [])

  const toggleTheme = () => {
    const newDarkMode = !isDarkMode
    setIsDarkMode(newDarkMode)
    localStorage.setItem("darkMode", newDarkMode.toString())
  }

  const handleSearch = async (pageNum = 1) => {
    if (!searchTerm.trim()) return
    setLoading(true)

    try {
      const response = await axios.get(`http://localhost:5002/api/movies/search/${searchTerm}?page=${pageNum}`)
      if (response.data && response.data.Search) {
        setMovies(response.data.Search)
      } else {
        setMovies([])
      }
    } catch (error) {
      console.error("Error fetching movies:", error)
      setMovies([])
    } finally {
      setLoading(false)
    }
  }

  const handlePageChange = (newPage) => {
    setPage(newPage)
    handleSearch(newPage)
  }

  return (
    <main
      className={`min-h-screen flex flex-col transition-colors duration-300 ${
        isDarkMode ? "bg-black text-white" : "bg-gray-100 text-gray-900"
      }`}
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
                onClick={toggleTheme}
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

      {/* Search Section */}
      <section className="pt-32 pb-20 px-4">
        <div className="container mx-auto">
          <motion.div
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto text-center mb-12"
          >
            <h1
              className={`text-4xl sm:text-5xl font-bold mb-6 ${
                isDarkMode ? "bg-gradient-to-r from-white to-red-500" : "bg-gradient-to-r from-gray-900 to-red-600"
              } bg-clip-text text-transparent`}
            >
              Discover Your Next Favorite Movie
            </h1>
            <p className={`text-xl ${isDarkMode ? "text-gray-300" : "text-gray-600"} mb-8`}>
              Search through our vast collection of films and find the perfect movie for your mood.
            </p>
            <div className="flex items-center bg-white shadow-lg rounded-full overflow-hidden">
              <input
                type="text"
                placeholder="Search for a movie..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full p-4 text-lg outline-none text-gray-800"
              />
              <button
                onClick={handleSearch}
                className="px-6 py-4 bg-red-500 text-white hover:bg-red-600 transition-all flex items-center"
              >
                <Search size={24} />
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Movies Grid */}
      <section className={`py-12 ${isDarkMode ? "bg-gray-900" : "bg-white"}`}>
        <div className="container mx-auto px-4">
          <AnimatePresence>
            {loading ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8"
              >
                {Array(8)
                  .fill(0)
                  .map((_, index) => (
                    <div
                      key={index}
                      className={`aspect-[2/3] rounded-lg ${isDarkMode ? "bg-gray-800" : "bg-gray-200"} animate-pulse`}
                    />
                  ))}
              </motion.div>
            ) : movies.length > 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8"
              >
                {movies.map((movie) => (
                  <Link href={`/movies/${movie.imdbID}`} key={movie.imdbID}>
                    <motion.div
                      whileHover={{ y: -5 }}
                      className={`group aspect-[2/3] rounded-lg overflow-hidden shadow-lg cursor-pointer relative ${
                        isDarkMode ? "bg-gray-800" : "bg-white"
                      }`}
                    >
                      <img
                        src={movie.Poster !== "N/A" ? movie.Poster : noimage}
                        alt={movie.Title}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <div className="absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                        <h3 className="text-lg font-semibold mb-2">{movie.Title}</h3>
                        <p className="text-sm">{movie.Year}</p>
                      </div>
                    </motion.div>
                  </Link>
                ))}
              </motion.div>
            ) : (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className={`text-center text-xl ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}
              >
                {searchTerm
                  ? "No movies found. Try another search!"
                  : "Start your movie discovery journey by searching above!"}
              </motion.p>
            )}
          </AnimatePresence>
        </div>
      </section>
      <section className="py-6 text-center">
        <div className="container mx-auto px-4">
          <button
            onClick={() => handlePageChange(page - 1)}
            disabled={page <= 1}
            className={`px-4 py-2 mx-2 ${page <= 1 ? "bg-gray-400" : "bg-red-500 hover:bg-red-600"} text-white rounded-full`}
          >
            Prev
          </button>
          <span className="px-4 py-2 text-lg text-gray-700">{`Page ${page}`}</span>
          <button
            onClick={() => handlePageChange(page + 1)}
            className={`px-4 py-2 mx-2 bg-red-500 hover:bg-red-600 text-white rounded-full`}
          >
            Next
          </button>
        </div>
      </section>
    </main>
  )
}

