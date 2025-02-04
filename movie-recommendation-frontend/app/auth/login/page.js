"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Film, Sun, Moon, Mail, Lock, Github, Twitter } from "lucide-react";

export default function LoginPage() {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    return typeof window !== "undefined"
      ? localStorage.getItem("darkMode") === "true"
      : false;
  });

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    // Call backend API for login
    const response = await fetch('http://localhost:5002/api/users/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();
    if (response.ok) {
      alert('Login successful!');
      localStorage.setItem('token', data.token);
      localStorage.setItem('fullName', data.fullName);
      window.location.href = '/';
    } else {
      alert('Invalid credentials');
    }
    
  };
  return (
    <main
      className={`min-h-screen transition-colors duration-300 relative overflow-hidden ${
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
        <div className="container mx-auto px-4 h-20 flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <Film
              className={`h-8 w-8 ${isDarkMode ? "text-red-500" : "text-red-600"}`}
            />
            <span className="text-2xl font-bold">MovieFinder</span>
          </Link>
          <button
            onClick={() => {
              setIsDarkMode(!isDarkMode);
              localStorage.setItem("darkMode", (!isDarkMode).toString());
            }}
            className={`p-2 rounded-full transition-colors ${
              isDarkMode
                ? "bg-gray-800 text-yellow-400 hover:bg-gray-700"
                : "bg-gray-200 text-gray-800 hover:bg-gray-300"
            }`}
          >
            {isDarkMode ? <Sun size={22} /> : <Moon size={22} />}
          </button>
        </div>
      </nav>

      {/* Login Form */}
      <div className="container mx-auto px-4 pt-32 pb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-md mx-auto"
        >
          <div
            className={`rounded-2xl shadow-2xl p-8 backdrop-blur-sm ${
              isDarkMode ? "bg-gray-900/80" : "bg-white/80"
            }`}
          >
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold mb-2">Welcome Back!</h1>
              <p className={`${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                Sign in to continue your movie journey
              </p>
            </div>

            <form onSubmit={handleLogin} className="space-y-6">
              <div className="space-y-2">
                <label htmlFor="email" className="block font-medium">
                  Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    className={`w-full p-3 pl-10 rounded-md border ${
                      isDarkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
                    }`}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="password" className="block font-medium">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <input
                    id="password"
                    type="password"
                    placeholder="Enter your password"
                    className={`w-full p-3 pl-10 rounded-md border ${
                      isDarkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
                    }`}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center space-x-2">
                  <input type="checkbox" className="rounded text-red-500 focus:ring-red-500" />
                  <span>Remember me</span>
                </label>
                <Link href="/auth/reset-password" className="text-red-500 hover:text-red-600">
                  Forgot password?
                </Link>
              </div>

              <button
                type="submit"
                className="w-full bg-red-500 hover:bg-red-600 text-white py-3 rounded-md"
              >
                Sign In
              </button>
            </form>

            <div className="mt-6">
              <div className="relative flex items-center justify-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>

              <div className="mt-6 flex gap-4">
                <button
                  className={`w-full border border-gray-300 py-2 rounded-md flex items-center justify-center ${isDarkMode ? "hover:bg-black":"hover:bg-gray-200"}`}
                  onClick={() => console.log("GitHub login")}
                >
                  <Github className="mr-2 h-4 w-4" />
                  GitHub
                </button>
                <button
                  className={`w-full border border-gray-300 py-2 rounded-md flex items-center justify-center ${isDarkMode ? "hover:bg-black":"hover:bg-gray-200"}`}
                  onClick={() => console.log("Twitter login")}
                >
                  <Twitter className="mr-2 h-4 w-4" />
                  Twitter
                </button>
              </div>
            </div>

            <p className="mt-6 text-center text-sm">
              Don't have an account?{" "}
              <Link href="/auth/signup" className="text-red-500 hover:text-red-600 font-semibold">
                Sign up
              </Link>
            </p>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
