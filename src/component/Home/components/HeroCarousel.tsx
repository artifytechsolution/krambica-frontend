"use client";
import React, { useRef, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, ArrowUpRight } from "lucide-react";

const HeroCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [progress, setProgress] = useState(0);

  // Touch handling
  const touchStart = useRef(0);
  const touchEnd = useRef(0);

  // --- UPDATED & EXPANDED SLIDES ARRAY (8 Images) ---
  const slides = [
    {
      id: 1,
      title: "Velvet Midnight",
      subtitle: "Winter Gala Collection",
      price: "$299",
      // Original high-quality evening wear image
      image:
        "https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?q=80&w=1920&auto=format&fit=crop",
    },

    {
      id: 4,
      title: "Golden Hour",
      subtitle: "Evening Gowns",
      price: "$450",
      // Warm, glamorous evening gown image
      image:
        "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80",
    },
    // --- NEW IMAGES ADDED BELOW ---
    {
      id: 5,
      title: "Atelier Blanc",
      subtitle: "Bridal Couture",
      price: "$890",
      // Elegant white/bridal high-fashion shot
      image:
        "https://images.unsplash.com/photo-1596483724223-402563599133?q=80&w=1920&auto=format&fit=crop",
    },
    {
      id: 6,
      title: "Gilded Edge",
      subtitle: "Fine Jewelry & Accessories",
      price: "$1,200",
      // Close-up luxury accessory/beauty shot
      image:
        "https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?q=80&w=1920&auto=format&fit=crop",
    },
    {
      id: 7,
      title: "Modernist Suiting",
      subtitle: "Tailored Perfection",
      price: "$350",
      // sleek, androgynous fashion shot
      image:
        "https://images.unsplash.com/photo-1495385794356-15371f348c31?q=80&w=1920&auto=format&fit=crop",
    },
  ];

  const SLIDE_DURATION = 6000; // 6 seconds per slide

  const nextSlide = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentSlide((prev) => (prev + 1) % slides.length);
    setProgress(0);
    setTimeout(() => setIsAnimating(false), 1000); // Match transition duration
  };

  const prevSlide = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    setProgress(0);
    setTimeout(() => setIsAnimating(false), 1000);
  };

  const goToSlide = (index) => {
    if (isAnimating || index === currentSlide) return;
    setIsAnimating(true);
    setCurrentSlide(index);
    setProgress(0);
    setTimeout(() => setIsAnimating(false), 1000);
  };

  // --- Animation Loop ---
  useEffect(() => {
    let startTime = Date.now();
    let animationFrameId;
    // Reset progress on slide change
    setProgress(0);

    const animate = () => {
      if (isAnimating) return; // Pause progress during transition animation
      const elapsed = Date.now() - startTime;
      const newProgress = Math.min((elapsed / SLIDE_DURATION) * 100, 100);
      setProgress(newProgress);

      if (elapsed < SLIDE_DURATION) {
        animationFrameId = requestAnimationFrame(animate);
      } else {
        nextSlide();
      }
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrameId);
  }, [currentSlide, isAnimating]); // Restart when slide changes or animation finishes

  // --- Touch Logic ---
  const handleTouchStart = (e) =>
    (touchStart.current = e.targetTouches[0].clientX);
  const handleTouchMove = (e) =>
    (touchEnd.current = e.targetTouches[0].clientX);
  const handleTouchEnd = () => {
    if (!touchStart.current || !touchEnd.current) return;
    const distance = touchStart.current - touchEnd.current;
    if (distance > 50) nextSlide();
    if (distance < -50) prevSlide();
    touchStart.current = 0;
    touchEnd.current = 0;
  };

  return (
    <div
      className="relative w-full h-[100dvh] md:h-[90vh] bg-stone-900 overflow-hidden text-white"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <style jsx global>{`
        @import url("https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600&family=Lato:wght@300;400;700&display=swap");
        .font-display {
          font-family: "Cinzel", serif;
        }
        .font-body {
          font-family: "Lato", sans-serif;
        }
      `}</style>

      {/* --- Slides Layer --- */}
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
        >
          {/* Background Image with slight Ken Burns effect */}
          <div
            className={`absolute inset-0 ${
              index === currentSlide
                ? "animate-[scale_10s_ease-out_forwards]"
                : ""
            }`}
          >
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/30 md:bg-black/20" />
            {/* Gradient for text readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />
          </div>
        </div>
      ))}

      {/* --- UI Layer (Static on top) --- */}
      <div className="absolute inset-0 z-20 flex flex-col justify-end md:justify-center px-6 pb-24 md:pb-0 md:px-20 max-w-[1600px] mx-auto w-full pointer-events-none">
        {/* Main Text Content */}
        <div className="max-w-2xl pointer-events-auto">
          {slides.map(
            (slide, index) =>
              index === currentSlide && (
                <div
                  key={slide.id}
                  className="animate-in fade-in slide-in-from-bottom-8 duration-1000"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <span className="w-12 h-[1px] bg-white/60"></span>
                    <span className="text-xs font-bold tracking-[0.2em] uppercase text-white/90">
                      {slide.subtitle}
                    </span>
                  </div>

                  <h1 className="font-display text-5xl md:text-7xl lg:text-8xl leading-[0.9] mb-6">
                    {slide.title}
                  </h1>

                  <p className="text-white/80 font-body text-lg md:text-xl font-light mb-8 max-w-md border-l-2 border-white/20 pl-4">
                    Experience the new standard of elegance. Crafted for the
                    modern muse.
                  </p>

                  <div className="flex items-center gap-6">
                    <button className="bg-white text-stone-900 px-8 py-4 rounded-none font-bold tracking-widest uppercase hover:bg-stone-200 transition-colors flex items-center gap-2">
                      Shop Look <ArrowUpRight size={18} />
                    </button>
                    <span className="text-2xl font-display">{slide.price}</span>
                  </div>
                </div>
              )
          )}
        </div>
      </div>

      {/* --- Right Side Navigation (Desktop) --- */}
      {/* Added max-h and overflow handling for many slides */}

      {/* --- Bottom Progress (Mobile) --- */}
      <div className="absolute bottom-0 left-0 w-full h-1 z-30 md:hidden bg-white/20">
        <div
          className="h-full bg-white transition-all duration-100 ease-linear"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* --- Navigation Buttons (Bottom Right Desktop) --- */}
      <div className="hidden md:flex absolute bottom-12 right-12 z-30 gap-2">
        <button
          onClick={prevSlide}
          className="w-14 h-14 border border-white/20 flex items-center justify-center hover:bg-white hover:text-stone-900 transition-all active:scale-95"
        >
          <ChevronLeft size={24} />
        </button>
        <button
          onClick={nextSlide}
          className="w-14 h-14 border border-white/20 flex items-center justify-center hover:bg-white hover:text-stone-900 transition-all active:scale-95"
        >
          <ChevronRight size={24} />
        </button>
      </div>
    </div>
  );
};

export default HeroCarousel;
