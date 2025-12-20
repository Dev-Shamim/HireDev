import React, { useState, useEffect } from "react";
import Navbar from "../components/layout/Navbar";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";

const Landing = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Your 4 images array - update these paths with your actual image paths
  const images = [
    "../../images/hero_1.jpg",
    "../../images/hero_2.png",  // Your second image
    "../../images/hero_4.png",  // Your fourth image
  ];

  // Auto-rotate images every 5 seconds
  useEffect(() => {
    let interval;
    if (isAutoPlaying) {
      interval = setInterval(() => {
        setCurrentImageIndex((prev) => (prev + 1) % images.length);
      }, 5000);
    }
    return () => clearInterval(interval);
  }, [isAutoPlaying, images.length]);

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const goToImage = (index) => {
    setCurrentImageIndex(index);
  };

  return (
    <div className="font-sans">
      {/* 🧩 Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-20 md:py-28 animate-reverse animate-alternate">
        <div className="container mx-auto px-6 flex flex-col-reverse md:flex-row items-center">
          
          {/* Left side */}
          <div className="w-full md:w-1/2 text-center md:text-left">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 leading-tight">
              Hire the Best Tech Talent with{" "}
              <span className="text-blue-600 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                DevHire
              </span>
            </h1>
            <p className="mt-6 text-lg text-gray-700">
              DevHire helps you find, assess, and hire top developers faster
              with AI-powered matching and integrated coding tests.
            </p>

            <div className="mt-10 flex justify-center md:justify-start gap-4 animate-delay">
              <Link
                to="/register"
                className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-3.5 rounded-lg font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                Get Started Free
              </Link>
              <button className="bg-white text-gray-800 px-8 py-3.5 rounded-lg font-semibold border-2 border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-all duration-300 shadow hover:shadow-md">
                Watch Demo
              </button>
            </div>
            
            {/* Trust badges */}
            <div className="mt-12 flex items-center justify-center md:justify-start gap-6">
              {/* Stat 1 */}
              <div className="text-center animate-fade-in hover:scale-105 transition-transform duration-300">
                <div className="text-2xl font-bold text-gray-900 relative group">
                  1000+
                  <div className="absolute -bottom-1 left-0 w-0 group-hover:w-full h-0.5 bg-blue-500 transition-all duration-300"></div>
                </div>
                <div className="text-sm text-gray-600 mt-1">Companies Trust Us</div>
              </div>
              
              <div className="h-8 w-px bg-gradient-to-b from-transparent via-gray-300 to-transparent animate-pulse"></div>

              {/* Stat 2 */}
              <div className="text-center animate-fade-in hover:scale-105 transition-transform duration-300" style={{ animationDelay: '0.2s' }}>
                <div className="text-2xl font-bold text-gray-900 relative group">
                  95%
                  <span className="absolute -top-1 -right-2 text-xs text-green-500 animate-bounce">✓</span>
                  <div className="absolute -bottom-1 left-0 w-0 group-hover:w-full h-0.5 bg-green-500 transition-all duration-300"></div>
                </div>
                <div className="text-sm text-gray-600 mt-1">Satisfaction Rate</div>
              </div>
              
              <div className="h-8 w-px bg-gradient-to-b from-transparent via-gray-300 to-transparent animate-pulse" style={{ animationDelay: '0.4s' }}></div>

              {/* Stat 3 */}
              <div className="text-center animate-fade-in hover:scale-105 transition-transform duration-300" style={{ animationDelay: '0.4s' }}>
                <div className="text-2xl font-bold text-gray-900 relative group">
                  2x
                  <span className="absolute -top-2 -right-3 text-sm text-orange-500 animate-ping">⚡</span>
                  <div className="absolute -bottom-1 left-0 w-0 group-hover:w-full h-0.5 bg-orange-500 transition-all duration-300"></div>
                </div>
                <div className="text-sm text-gray-600 mt-1">Faster Hiring</div>
              </div>
            </div>
          </div>

          {/* Right side - Image Gallery */}
          <div className="w-full md:w-1/2 mb-12 md:mb-0">
            <div className="relative">
              {/* Background glow effects */}
              <div className="absolute -top-4 -right-4 w-64 h-64 bg-gradient-to-r from-blue-400 to-indigo-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
              <div className="absolute -bottom-8 -left-8 w-72 h-72 bg-gradient-to-r from-blue-300 to-indigo-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-1000"></div>
              
              {/* Main Image Container */}
              <div className="relative bg-white p-2 rounded-2xl shadow-2xl border border-gray-100 overflow-hidden">
                {/* Image with fade transition */}
                <div className="relative h-80 md:h-96 rounded-xl overflow-hidden">
                  {images.map((img, index) => (
                    <div
                      key={index}
                      className={`absolute inset-0 transition-opacity duration-1000 ${
                        index === currentImageIndex 
                          ? 'opacity-100 z-10' 
                          : 'opacity-0 z-0'
                      }`}
                    >
                      <img
                        src={img}
                        alt={`DevHire Dashboard ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                      
                      {/* Image overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                    </div>
                  ))}
                  
                  {/* Image counter */}
                  <div className="absolute top-4 left-4 z-20">
                    <div className="px-3 py-1.5 bg-black/60 backdrop-blur-sm text-white text-sm rounded-full">
                      {currentImageIndex + 1} / {images.length}
                    </div>
                  </div>
                  
                  {/* Navigation buttons */}
                  <button
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 z-20 w-10 h-10 bg-black/40 hover:bg-black/60 backdrop-blur-sm rounded-full flex items-center justify-center text-white transition-all duration-300 hover:scale-110"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  
                  <button
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 z-20 w-10 h-10 bg-black/40 hover:bg-black/60 backdrop-blur-sm rounded-full flex items-center justify-center text-white transition-all duration-300 hover:scale-110"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                  
                  {/* Play/Pause button */}
                  <button
                    onClick={() => setIsAutoPlaying(!isAutoPlaying)}
                    className="absolute top-4 right-4 z-20 w-10 h-10 bg-black/40 hover:bg-black/60 backdrop-blur-sm rounded-full flex items-center justify-center text-white transition-all duration-300 hover:scale-110"
                  >
                    {isAutoPlaying ? (
                      <Pause className="w-4 h-4" />
                    ) : (
                      <Play className="w-4 h-4" />
                    )}
                  </button>
                </div>
                
                {/* Image dots indicator */}
                <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-20 flex gap-2">
                  {images.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => goToImage(index)}
                      className={`w-2 h-2 rounded-full transition-all duration-300 ${
                        index === currentImageIndex
                          ? 'w-6 bg-white'
                          : 'bg-white/60 hover:bg-white'
                      }`}
                    />
                  ))}
                </div>
              </div>
              
              {/* Floating element */}
              <div className="absolute -bottom-6 -right-6 bg-white p-4 rounded-xl shadow-lg border border-gray-200 animate-float">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center animate-pulse">
                    <span className="text-green-600 text-xl">✓</span>
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">AI Match Found!</div>
                    <div className="text-sm text-gray-600">Perfect candidate</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Rest of your existing sections remain exactly the same */}
      {/* 🧩 Features Section */}
      <section className="py-20 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-1.5 rounded-full text-sm font-medium mb-4">
              <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
              POWERFUL FEATURES
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              Why Choose <span className="text-blue-600">DevHire</span>?
            </h2>
            <p className="mt-4 text-lg text-gray-700">
              We make hiring developers smarter, faster, and more efficient with cutting-edge technology.
            </p>
          </div>

          <div className="mt-16 grid gap-8 md:grid-cols-3">
            {/* Feature cards remain the same */}
            {/* ... */}
          </div>
        </div>
      </section>

      {/* 🧩 Stats Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-indigo-700">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { number: "10,000+", label: "Developers Hired", icon: "👨‍💻" },
              { number: "500+", label: "Companies", icon: "🏢" },
              { number: "85%", label: "Time Saved", icon: "⏱️" },
              { number: "4.9/5", label: "Rating", icon: "⭐" }
            ].map((stat, index) => (
              <div key={index} className="text-center text-white">
                <div className="text-4xl mb-3">{stat.icon}</div>
                <div className="text-3xl md:text-4xl font-bold mb-2">{stat.number}</div>
                <div className="text-blue-100">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 🧩 Call to Action Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="container mx-auto px-6 text-center">
          <div className="max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-1.5 rounded-full text-sm font-medium mb-6">
              <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
              START YOUR JOURNEY
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Ready to find your next <span className="text-blue-600">rockstar developer</span>?
            </h2>
            <p className="text-xl text-gray-700 mb-10">
              Join thousands of companies that trust DevHire for their tech hiring needs.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/register"
                className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-10 py-4 rounded-xl font-bold text-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:-translate-y-1"
              >
                Start Free Trial
              </Link>
              <button className="bg-white text-gray-800 px-10 py-4 rounded-xl font-bold text-lg border-2 border-gray-300 hover:border-blue-400 hover:bg-blue-50 transition-all duration-300 shadow-lg hover:shadow-xl">
                Schedule a Demo
              </button>
            </div>
            
            <div className="mt-8 text-gray-600 text-sm">
              No credit card required • 14-day free trial • Cancel anytime
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <div className="text-2xl font-bold flex items-center gap-2">
                <span className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white p-2 rounded-lg">DH</span>
                DevHire
              </div>
              <p className="text-gray-400 mt-2">Hire smarter, build faster.</p>
            </div>
            <div className="text-gray-400">
              © {new Date().getFullYear()} DevHire. All rights reserved.
            </div>
          </div>
        </div>
      </footer>

      {/* CSS Animations */}
      <style>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes float {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }
        
        .animate-fade-in {
          opacity: 0;
          animation: fade-in 0.6s ease-out forwards;
        }
        
        .animate-ping {
          animation: ping 2s cubic-bezier(0, 0, 0.2, 1) infinite;
        }
        
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default Landing;