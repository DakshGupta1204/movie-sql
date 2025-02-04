"use client"
import { useRef, useState } from 'react';
import { Film, PlayCircle, Search, TrendingUp, Users, Star, Clock  } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
    const trendingRef = useRef(null);

  const scrollToTrending = () => {
    trendingRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  const token = localStorage.getItem('token');
  const isLoggedIn = token ? true : false;
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-b from-black/80 to-black/0">
        <div className="container mx-auto px-4 h-20">
          <div className="flex items-center justify-between h-full">
            <div className="flex items-center space-x-2">
              <Film className="h-8 w-8 text-red-500" />
              <span className="text-2xl font-bold">MovieFinder</span>
            </div>
            <Link href={`${isLoggedIn?"/profile":"/auth/login"}`}>
            <button className="px-6 py-2 bg-red-500 hover:bg-red-600 text-white rounded-full font-medium transition-all duration-300 transform hover:scale-105">
             { isLoggedIn?"Profile":"Sign In"}
            </button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative min-h-screen">
        {/* Background Image with Gradient Overlay */}
        <div 
          className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&q=80')] bg-cover bg-center"
          style={{
            backgroundImage: `
              linear-gradient(to bottom, rgba(0,0,0,0.7), rgba(0,0,0,0.9)),
              url('https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&q=80')
            `
          }}
        />

        {/* Hero Content */}
        <div className="relative container mx-auto px-4 pt-32 pb-20">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white to-red-500 bg-clip-text text-transparent">
              Your Gateway to Cinema
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              Discover, explore, and track your favorite movies. Get personalized recommendations and join a community of movie enthusiasts.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button 
                onClick={scrollToTrending}
                className="w-full sm:w-auto px-8 py-4 bg-red-500 hover:bg-red-600 text-white rounded-full font-medium transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2"
              >
                <PlayCircle className="h-5 w-5" />
                Start Exploring
              </button>
              <Link href="/movies">
              <button className="w-full sm:w-auto px-8 py-4 bg-white/10 hover:bg-white/20 text-white rounded-full font-medium backdrop-blur-sm transition-all duration-300 flex items-center justify-center gap-2">
                <Search className="h-5 w-5" />
                Browse Collection
              </button>
              </Link>
            </div>
          </div>

          {/* Features Section */}
          <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 hover:bg-white/10 transition-all duration-300">
              <div className="w-12 h-12 bg-red-500/10 rounded-xl flex items-center justify-center mb-4">
                <Search className="h-6 w-6 text-red-500" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Smart Search</h3>
              <p className="text-gray-400">Find any movie instantly with our powerful search engine.</p>
            </div>
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 hover:bg-white/10 transition-all duration-300">
              <div className="w-12 h-12 bg-red-500/10 rounded-xl flex items-center justify-center mb-4">
                <TrendingUp className="h-6 w-6 text-red-500" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Trending Now</h3>
              <p className="text-gray-400">Stay updated with the latest and most popular releases.</p>
            </div>
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 hover:bg-white/10 transition-all duration-300">
              <div className="w-12 h-12 bg-red-500/10 rounded-xl flex items-center justify-center mb-4">
                <Users className="h-6 w-6 text-red-500" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Community</h3>
              <p className="text-gray-400">Join discussions and share your movie experiences.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Trending Section */}
      <div ref={trendingRef} className="bg-black py-20">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold">Trending Now</h2>
            <button className="text-red-500 hover:text-red-400 flex items-center gap-2">
              View All <TrendingUp className="h-4 w-4" />
            </button>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {/* Movie Cards */}
            {[
              {
                title: "Dune: Part Two",
                image: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&q=80",
                rating: "9.2",
                duration: "166m"
              },
              {
                title: "Poor Things",
                image: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&q=80",
                rating: "8.9",
                duration: "141m"
              },
              {
                title: "Civil War",
                image: "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?auto=format&fit=crop&q=80",
                rating: "8.7",
                duration: "109m"
              },
              {
                title: "Mickey 17",
                image: "https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&q=80",
                rating: "8.5",
                duration: "132m"
              }
            ].map((movie, index) => (
              <div 
                key={index}
                className="group relative rounded-xl overflow-hidden cursor-pointer"
              >
                <div className="aspect-[2/3] relative">
                  <img 
                    src={movie.image} 
                    alt={movie.title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <h3 className="text-lg font-semibold mb-2">{movie.title}</h3>
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 text-yellow-500" />
                      <span>{movie.rating}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4 text-gray-400" />
                      <span>{movie.duration}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
