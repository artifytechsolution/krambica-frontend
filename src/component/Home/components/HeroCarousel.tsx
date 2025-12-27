"use client";
import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

const slides = [
  {
    id: "01",
    title: "Welcome",
    subtitle: "Organic Silk",
    description:
      "Discover timeless styles crafted in premium, breathable fabrics.",
    img: "/banners/webbanner3.png",
    mobileImg: "/banners/mobilebanner3.png",
  },
  {
    id: "02",
    title: "Our Latest Collection",
    subtitle: "New Season",
    description: "A cotton kurti with curated textures and organic shapes",
    img: "/banners/webbanner1.png", // 1536 x 1024
    mobileImg: "/banners/mobilebanner1.png", // 1080 x 1920
  },
  {
    id: "03",
    title: "New Arrivals",
    subtitle: "Cotton Kurti Edit",
    description:
      "Fresh styles crafted in soft cotton with refined, everyday elegance.",
    img: "/banners/webbanner2.png",
    mobileImg: "/banners/mobilebanner2.png",
  },
];

const PremiumSplitCarousel = () => {
  const [index, setIndex] = useState(0);

  const nextSlide = useCallback(() => {
    setIndex((prev) => (prev + 1) % slides.length);
  }, []);

  const prevSlide = useCallback(() => {
    setIndex((prev) => (prev - 1 + slides.length) % slides.length);
  }, []);

  useEffect(() => {
    const timer = setInterval(nextSlide, 6000);
    return () => clearInterval(timer);
  }, [nextSlide]);

  return (
    <div className="w-full max-w-[1536px] mx-auto bg-white md:px-12 md:py-8 font-sans">
      {/* --- MOBILE VIEW: Full-bleed imagery --- */}
      <div className="relative block md:hidden w-full h-[100dvh] bg-white overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={`mobile-${index}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="absolute inset-0"
          >
            <img
              src={slides[index].mobileImg}
              alt={slides[index].title}
              className="w-full h-full object-cover"
            />
          </motion.div>
        </AnimatePresence>

        {/* Text area with solid white background to avoid needing shadows/gradients on the image */}
      </div>

      {/* --- DESKTOP VIEW: Clean 33/67 Split with no gradient shade --- */}
      <div className="relative hidden md:flex flex-row h-[600px] bg-[#F9F9F7] rounded-[2rem] overflow-hidden border border-stone-100">
        {/* LEFT PANEL: 33% Solid Background */}
        <div className="w-full md:w-[33%] p-8 md:p-12 lg:p-14 flex flex-col justify-between z-20 bg-[#F9F9F7]">
          <div>
            <AnimatePresence mode="wait">
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.5 }}
              >
                <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-stone-400">
                  {slides[index].subtitle}
                </span>
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif text-stone-900 mt-4 mb-6 leading-tight">
                  {slides[index].title}
                </h1>
                <p className="text-stone-500 text-sm leading-relaxed mb-8">
                  {slides[index].description}
                </p>
                <button className="group flex items-center gap-4 text-stone-900 font-bold text-xs uppercase tracking-widest transition-all">
                  View Collection
                  <div className="w-8 h-[1px] bg-stone-900 transition-all group-hover:w-14" />
                </button>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="flex items-center gap-5 mt-10">
            <div className="flex gap-2">
              <button
                onClick={prevSlide}
                className="p-2.5 rounded-full border border-stone-200 text-stone-400 hover:text-stone-900 hover:border-stone-900 transition-all active:scale-95 bg-white"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                onClick={nextSlide}
                className="p-2.5 rounded-full border border-stone-200 text-stone-400 hover:text-stone-900 hover:border-stone-900 transition-all active:scale-95 bg-white"
              >
                <ChevronRight size={18} />
              </button>
            </div>

            <div className="flex gap-1.5">
              {slides.map((_, i) => (
                <div
                  key={i}
                  className={`h-1 rounded-full transition-all duration-300 ${
                    i === index ? "w-6 bg-stone-900" : "w-1.5 bg-stone-200"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT PANEL: 67% Image - No Shade/Gradient Overlays */}
        <div className="w-full md:w-[67%] relative h-full overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6 }}
              className="h-full w-full"
            >
              <img
                src={slides[index].img}
                alt={slides[index].title}
                className="w-full h-full object-cover"
              />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default PremiumSplitCarousel;
