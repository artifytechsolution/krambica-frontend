"use client";
import { ChevronLeft, ChevronRight } from "lucide-react";
import React, { useRef, useEffect, useState } from "react";
import {
  FaArrowLeft,
  FaArrowRight,
  FaCircle,
  FaRegCircle,
} from "react-icons/fa";

const HeroCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const autoPlayRef = useRef(null);

  const slides = [
    {
      id: 1,
      title: "Ethereal Evening Gown",
      category: "EVENING WEAR",
      description: "A flowing chiffon gown with delicate lace detailing.",
      image:
        "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80",
      thumbnail:
        "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    },
    {
      id: 2,
      title: "Summer Floral Dress",
      category: "CASUAL WEAR",
      description: "Lightweight floral print dress with puff sleeves.",
      image:
        "https://images.unsplash.com/photo-1595777457583-95e059d581b8?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80",
      thumbnail:
        "https://images.unsplash.com/photo-1595777457583-95e059d581b8?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    },
    {
      id: 3,
      title: "Business Chic Blazer Set",
      category: "OFFICE WEAR",
      description: "Tailored blazer and matching trousers.",
      image:
        "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80",
      thumbnail:
        "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    },
    {
      id: 4,
      title: "Bohemian Maxi Dress",
      category: "BEACH WEAR",
      description: "Flowery bohemian dress with ruffled sleeves.",
      image:
        "https://images.unsplash.com/photo-1581044777550-4cfa60707c03?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80",
      thumbnail:
        "https://images.unsplash.com/photo-1581044777550-4cfa60707c03?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    },
    {
      id: 5,
      title: "Winter Knit Collection",
      category: "WINTER WEAR",
      description: "Cozy cable-knit sweater with matching scarf.",
      image:
        "https://images.unsplash.com/photo-1576566588028-4147f3842f27?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80",
      thumbnail:
        "https://images.unsplash.com/photo-1576566588028-4147f3842f27?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    },
  ];

  const nextSlide = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentSlide((prev) => (prev + 1) % slides.length);
    setTimeout(() => setIsAnimating(false), 600);
  };

  const prevSlide = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    setTimeout(() => setIsAnimating(false), 600);
  };

  const goToSlide = (index) => {
    if (isAnimating || index === currentSlide) return;
    setIsAnimating(true);
    setCurrentSlide(index);
    setTimeout(() => setIsAnimating(false), 600);
  };

  // Auto-play functionality
  useEffect(() => {
    autoPlayRef.current = setInterval(nextSlide, 5000);
    return () => clearInterval(autoPlayRef.current);
  }, [currentSlide]);

  const stopAutoPlay = () => clearInterval(autoPlayRef.current);
  const startAutoPlay = () => {
    clearInterval(autoPlayRef.current);
    autoPlayRef.current = setInterval(nextSlide, 5000);
  };

  return (
    <div
      className="relative min-h-screen bg-gradient-to-br from-gray-900 to-black"
      onMouseEnter={stopAutoPlay}
      onMouseLeave={startAutoPlay}
    >
      {/* Main Slider Container */}
      <div className="relative h-screen overflow-hidden">
        {/* Slides */}
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-all duration-700 ease-in-out ${
              index === currentSlide
                ? "opacity-100 z-20 translate-x-0"
                : index < currentSlide
                ? "opacity-0 -translate-x-full z-10"
                : "opacity-0 translate-x-full z-10"
            }`}
          >
            {/* Background Image */}
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${slide.image})` }}
            >
              {/* Dark Overlay for text readability */}
              <div className="absolute inset-0 bg-black/50"></div>
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent"></div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
            </div>

            {/* Slide Content */}
            <div className="relative z-20 h-full flex flex-col justify-center items-center text-center px-4">
              {/* Category Badge */}
              <div className="mb-4 sm:mb-6">
                <span className="inline-block px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-white text-sm sm:text-base font-medium tracking-wider">
                  {slide.category}
                </span>
              </div>

              {/* Title */}
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white max-w-6xl mx-auto px-4 leading-tight">
                {slide.title}
              </h1>

              {/* Description - Hidden on mobile, shown on desktop */}
              <p className="text-gray-200 text-base lg:text-lg xl:text-xl leading-relaxed max-w-2xl mx-auto mt-4 sm:mt-6 hidden sm:block px-4">
                {slide.description}
              </p>

              {/* Slide Counter */}
              <div className="absolute bottom-20 sm:bottom-24 left-1/2 transform -translate-x-1/2">
                <div className="text-white text-lg sm:text-xl">
                  <span className="font-bold text-2xl sm:text-3xl">
                    {currentSlide + 1}
                  </span>
                  <span className="mx-2 sm:mx-3 text-gray-400">/</span>
                  <span className="text-gray-300">{slides.length}</span>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Horizontal Thumbnails - For ALL screen sizes */}
        <div className="absolute bottom-8 sm:bottom-12 md:bottom-16 left-1/2 transform -translate-x-1/2 z-30 w-full max-w-5xl px-4">
          <div className="flex justify-center space-x-3 sm:space-x-4 md:space-x-5 lg:space-x-6 overflow-x-auto py-2 scrollbar-hide">
            {slides.map((slide, index) => (
              <button
                key={slide.id}
                onClick={() => goToSlide(index)}
                className={`flex-shrink-0 transition-all duration-300 group relative ${
                  index === currentSlide
                    ? "scale-110 opacity-100"
                    : "scale-100 opacity-60 hover:opacity-100 hover:scale-105"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              >
                <div
                  className={`w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 rounded-lg overflow-hidden border-2 transition-all duration-300 ${
                    index === currentSlide
                      ? "border-white ring-2 ring-white/30"
                      : "border-transparent group-hover:border-white/50"
                  }`}
                >
                  <img
                    src={slide.thumbnail}
                    alt={slide.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                </div>

                {/* Active Indicator */}
                {index === currentSlide && (
                  <div className="absolute -bottom-1.5 left-1/2 transform -translate-x-1/2 w-3 h-3 rounded-full bg-white"></div>
                )}

                {/* Title Tooltip on Hover */}
                <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-black/80 backdrop-blur-sm px-3 py-2 rounded-lg text-white text-xs sm:text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                  {slide.title}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-4 sm:left-6 md:left-8 top-1/2 -translate-y-1/2 z-30 w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full flex items-center justify-center hover:bg-white/20 active:scale-95 transition-all duration-300 group"
          aria-label="Previous slide"
        >
          <FaArrowLeft className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-white group-hover:scale-110 transition-transform" />
        </button>

        <button
          onClick={nextSlide}
          className="absolute right-4 sm:right-6 md:right-8 top-1/2 -translate-y-1/2 z-30 w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full flex items-center justify-center hover:bg-white/20 active:scale-95 transition-all duration-300 group"
          aria-label="Next slide"
        >
          <FaArrowRight className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-white group-hover:scale-110 transition-transform" />
        </button>

        {/* Progress Bar */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gray-800/50 z-30">
          <div
            className="h-full bg-gradient-to-r from-white to-gray-300 transition-all duration-500 ease-out"
            style={{ width: `${((currentSlide + 1) / slides.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Add custom CSS for scrollbar hiding */}
      <style jsx>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
};

export default HeroCarousel;
