"use client"
import { useState } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { Film, Sun, Moon, Mail, Lock, User, Github, Twitter } from "lucide-react"

export default function SignUpPage() {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    return typeof window !== "undefined" ? localStorage.getItem("darkMode") === "true" : false
  })

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  })
  
  const [errorMessage, setErrorMessage] = useState("") // To handle error messages
  const [isSubmitting, setIsSubmitting] = useState(false) // To disable the submit button during form submission

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (formData.password !== formData.confirmPassword) {
      setErrorMessage("Passwords do not match.")
      return
    }

    setIsSubmitting(true)
    setErrorMessage("")

    try {
      const response = await fetch("http://localhost:5002/api/users/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
          fullName: formData.name
        }),
      })

      const data = await response.json()

      if (response.ok) {
        // On successful signup, you can redirect or show a success message
        alert("Account created successfully!")
        // Optionally redirect to the login page
        // window.location.href = "/auth/login"
      } else {
        setErrorMessage(data.error || "Something went wrong. Please try again.")
      }
    } catch (error) {
      console.error("Error:", error)
      setErrorMessage("An error occurred. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <main
      className={`min-h-screen transition-colors duration-300 relative overflow-hidden ${
        isDarkMode ? "bg-black text-white" : "bg-gray-100 text-gray-900"
      }`}
    >
      <nav className={`fixed top-0 left-0 right-0 z-50 p-4 ${isDarkMode ? "bg-gray-900/80" : "bg-white/80"}`}>
        <div className="container mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <Film className={`h-8 w-8 ${isDarkMode ? "text-red-500" : "text-red-600"}`} />
            <span className="text-2xl font-bold">MovieFinder</span>
          </Link>
          <button
            onClick={() => {
              setIsDarkMode(!isDarkMode)
              localStorage.setItem("darkMode", (!isDarkMode).toString())
            }}
            className={`p-2 rounded-full ${isDarkMode ? "bg-gray-800 text-yellow-400" : "bg-gray-200 text-gray-800"}`}
          >
            {isDarkMode ? <Sun size={22} /> : <Moon size={22} />}
          </button>
        </div>
      </nav>

      <div className="container mx-auto px-4 pt-32 pb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className={`max-w-md mx-auto p-8 shadow-lg rounded-xl ${isDarkMode ? "bg-gray-900" : "bg-white"}`}
        >
          <h1 className="text-3xl font-bold text-center mb-4">Create Account</h1>
          {errorMessage && <div className="text-red-500 text-center mb-4">{errorMessage}</div>}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Full Name</label>
              <div className="relative">
                <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  className="w-full p-3 pl-10 border rounded-lg"
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <input
                  type="email"
                  className="w-full p-3 pl-10 border rounded-lg"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <input
                  type="password"
                  className="w-full p-3 pl-10 border rounded-lg"
                  placeholder="Create a password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Confirm Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <input
                  type="password"
                  className="w-full p-3 pl-10 border rounded-lg"
                  placeholder="Confirm your password"
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-red-500 text-white rounded-lg hover:bg-red-600"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Creating..." : "Create Account"}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm">Or continue with</p>
            <div className="mt-3 flex justify-center space-x-4">
              <button className={`p-3 bg-gray-200 rounded-lg hover:bg-gray-300 ${isDarkMode ? "text-white bg-gray-600" : "text-gray-600"}`}>
                <Github className="h-5 w-5" />
              </button>
              <button className={`p-3 bg-gray-200 rounded-lg hover:bg-gray-300 ${isDarkMode ? "text-white bg-gray-600" : "text-gray-600"}`}>
                <Twitter className="h-5 w-5" />
              </button>
            </div>
          </div>

          <p className="mt-6 text-center text-sm">
            Already have an account?{" "}
            <Link href="/auth/login" className="text-red-500 hover:text-red-600 font-semibold">
              Sign in
            </Link>
          </p>
        </motion.div>
      </div>
    </main>
  )
}
