"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  Film,
  Sun,
  Moon,
  User,
  Heart,
  Clock,
  Edit,
  LogOut,
} from "lucide-react";
import axios from "axios";
// Mock data - replace with actual data fetching in a real application

const mockUser = {
  name: "Daksh Gupta",
  email: "daksgpt12@gmail.com",
  joinDate: "January 2024",
  favoriteMovies: [
    {
      id: "tt0111161",
      title: "The Shawshank Redemption",
      poster:
        "https://m.media-amazon.com/images/M/MV5BNDE3ODcxYzMtY2YzZC00NmNlLWJiNDMtZDViZWM2MzIxZDYwXkEyXkFqcGdeQXVyNjAwNDUxODI@._V1_SX300.jpg",
    },
    {
      id: "tt0068646",
      title: "The Godfather",
      poster:
        "https://m.media-amazon.com/images/M/MV5BM2MyNjYxNmUtYTAwNi00MTYxLWJmNWYtYzZlODY3ZTk3OTFlXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SX300.jpg",
    },
    {
      id: "tt0468569",
      title: "The Dark Knight",
      poster:
        "https://m.media-amazon.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_SX300.jpg",
    },
  ],
  recentActivity: [
    { type: "review", movie: "Inception", date: "2 days ago" },
    { type: "favorite", movie: "The Dark Knight", date: "1 week ago" },
    { type: "review", movie: "Interstellar", date: "2 weeks ago" },
  ],
};

export default function ProfilePage() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token"); // Retrieve JWT token
      if (!token) {
        console.error("No token found");
        return;
      }

      try {
        const response = await axios.get("http://localhost:5002/api/users", {
          headers: {
            Authorization: `Bearer ${token}`, // Send token in headers
          },
        });

        const userData = response.data;
        setUser(userData);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    fetchUser();
  }, []);

  const [isDarkMode, setIsDarkMode] = useState(() => {
    return typeof window !== "undefined"
      ? localStorage.getItem("darkMode") === "true"
      : false;
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("darkMode", isDarkMode.toString());
    }
  }, [isDarkMode]);

  if (!user) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <main
      className={`min-h-screen transition-colors duration-300 ${
        isDarkMode ? "bg-black text-white" : "bg-gray-100 text-gray-900"
      }`}
    >
      {/* Navbar */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 ${
          isDarkMode
            ? "bg-gradient-to-b from-black/80 to-black/0"
            : "bg-gradient-to-b from-white/80 to-white/0"
        }`}
      >
        <div className="container mx-auto px-4 h-20">
          <div className="flex items-center justify-between h-full">
            <Link href="/" className="flex items-center space-x-2">
              <Film
                className={`h-8 w-8 ${
                  isDarkMode ? "text-red-500" : "text-red-600"
                }`}
              />
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
              <Link href="/movies">
                <button
                  className={`px-4 py-2 rounded-full font-medium transition-colors ${
                    isDarkMode
                      ? "bg-red-500 hover:bg-red-600 text-white"
                      : "bg-red-600 hover:bg-red-700 text-white"
                  }`}
                >
                  Search Movies
                </button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Profile Content */}
      <div className="container mx-auto px-4 pt-24 pb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className={`rounded-xl overflow-hidden shadow-2xl ${
            isDarkMode ? "bg-gray-900" : "bg-white"
          }`}
        >
          {/* Profile Header */}
          <div className={`p-6 ${isDarkMode ? "bg-gray-800" : "bg-gray-100"}`}>
            <div className="flex items-center space-x-4">
              <div
                className={`w-24 h-24 rounded-full flex items-center justify-center text-4xl ${
                  isDarkMode
                    ? "bg-gray-700 text-white"
                    : "bg-gray-300 text-gray-700"
                }`}
              >
                <User size={48} />
              </div>
              <div>
                <h1 className="text-3xl font-bold">{user[0].name}</h1>
                <p
                  className={`text-lg ${
                    isDarkMode ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  {user[0].email}
                </p>
                <p
                  className={`text-sm ${
                    isDarkMode ? "text-gray-500" : "text-gray-500"
                  }`}
                >
                  Member since{" "}
                  {user[0]
                    ? new Date(user[0].created_at).toLocaleDateString()
                    : "Loading..."}
                </p>
              </div>
            </div>
          </div>

          {/* Profile Body */}
          <div className="p-6">
            {/* Favorite Movies */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4 flex items-center">
                <Heart className="mr-2 text-red-500" /> Favorite Movies
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {mockUser.favoriteMovies.map((movie) => (
                  <Link href={`/movies/${movie.id}`} key={movie.id}>
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      className="relative rounded-lg overflow-hidden shadow-md"
                    >
                      <img
                        src={movie.poster || "/placeholder.svg"}
                        alt={movie.title}
                        className="w-full h-64 object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-4">
                        <h3 className="text-white text-lg font-semibold">
                          {movie.title}
                        </h3>
                      </div>
                    </motion.div>
                  </Link>
                ))}
              </div>
            </section>

            {/* Recent Activity */}
            <section>
              <h2 className="text-2xl font-bold mb-4 flex items-center">
                <Clock className="mr-2 text-blue-500" /> Recent Activity
              </h2>
              <ul
                className={`space-y-4 ${
                  isDarkMode ? "text-gray-300" : "text-gray-700"
                }`}
              >
                {mockUser.recentActivity.map((activity, index) => (
                  <li key={index} className="flex items-center space-x-2">
                    {activity.type === "review" ? (
                      <Edit size={18} className="text-green-500" />
                    ) : (
                      <Heart size={18} className="text-red-500" />
                    )}
                    <span>
                      {activity.type === "review" ? "Reviewed" : "Favorited"}{" "}
                      <strong>{activity.movie}</strong>
                    </span>
                    <span
                      className={`text-sm ${
                        isDarkMode ? "text-gray-500" : "text-gray-500"
                      }`}
                    >
                      {activity.date}
                    </span>
                  </li>
                ))}
              </ul>
            </section>
          </div>
        </motion.div>

        {/* Logout Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-8 text-center"
        >
          <button
            className={`px-6 py-3 rounded-full font-medium transition-colors flex items-center justify-center mx-auto ${
              isDarkMode
                ? "bg-red-500 hover:bg-red-600 text-white"
                : "bg-red-600 hover:bg-red-700 text-white"
            }`}
            onClick={() => {
              localStorage.removeItem("token");
              localStorage.removeItem("fullName");
              window.location.href = "/auth/login";
            }}
          >
            <LogOut className="mr-2" /> Logout
          </button>
        </motion.div>
      </div>
    </main>
  );
}
