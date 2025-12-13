"use client";
import React, { useState, useEffect, useRef } from "react";
import {
  Heart,
  ShoppingCart,
  User,
  Search,
  Menu,
  X,
  ChevronLeft,
  ChevronRight,
  Star,
  Play,
  Volume2,
  VolumeX,
  Maximize,
  MessageCircle,
  Phone,
  Mail,
  Clock,
} from "lucide-react";
import HeroCarousel from "./components/HeroCarousel";
import IntroSection from "./components/Intriduction";
import TrendingSection from "./components/TrendingSection";
import BestsellerSection from "./components/BestsellerSection";
import CollectionsSlider from "./components/CollectionsSlider";
import VideoCarousel from "./components/VideoCarousel";

// Hero Carousel Component

// Introduction Section

// Trending Section with Horizontal Scroll

// Product Card Component

// Bestseller Section

// Collections Slider

// Testimonial Card Component
const TestimonialCard = ({ testimonial }) => {
  return (
    <div className="bg-white rounded-xl md:rounded-2xl p-5 md:p-6 lg:p-8 shadow-lg border border-gray-100 hover:-translate-y-2 transition-all duration-400 h-full flex flex-col relative">
      <div className="text-5xl md:text-6xl lg:text-7xl text-[#115e59] opacity-15 absolute top-2 md:top-4 left-4 md:left-6 font-serif leading-none">
        "
      </div>
      <div className="flex items-center mb-3 md:mb-4 relative z-10">
        <img
          src={testimonial.image}
          alt={testimonial.name}
          className="w-12 h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 rounded-full object-cover border-2 md:border-3 border-[#115e59] shadow-md flex-shrink-0"
        />
        <div className="ml-3 md:ml-4">
          <h4 className="font-semibold text-base md:text-lg text-gray-900">
            {testimonial.name}
          </h4>
          <p className="text-xs md:text-sm text-gray-600">
            {testimonial.location}
          </p>
        </div>
      </div>
      <div className="flex text-amber-400 text-base md:text-lg mb-3 md:mb-4 relative z-10">
        {[...Array(5)].map((_, i) => (
          <Star key={i} className="w-4 h-4 md:w-5 md:h-5 fill-current" />
        ))}
      </div>
      <p className="text-sm md:text-base text-gray-700 leading-relaxed mb-3 md:mb-4 relative z-10 flex-grow">
        {testimonial.text}
      </p>
      <p className="text-xs md:text-sm text-gray-500 border-t border-gray-100 pt-2 md:pt-3 relative z-10">
        Purchased: {testimonial.product}
      </p>
    </div>
  );
};

// Testimonials Section
const TestimonialsSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  const testimonials = [
    {
      name: "Sarah Johnson",
      location: "New York, USA",
      image:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
      text: "Absolutely love my purchase! The quality is outstanding and the fit is perfect. Krambica has become my go-to store for all my fashion needs. Every piece I've ordered has exceeded my expectations!",
      product: "Floral Summer Dress",
    },
    {
      name: "Emily Davis",
      location: "Los Angeles, USA",
      image:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
      text: "The customer service is exceptional! Fast shipping and beautiful packaging. The clothes are even better in person than in photos. I'm so impressed with the attention to detail!",
      product: "Designer Handbag",
    },
    {
      name: "Jessica Martinez",
      location: "Miami, USA",
      image:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop",
      text: "Premium quality at reasonable prices. I've recommended Krambica to all my friends. The attention to detail is remarkable and the fabrics feel luxurious. Worth every penny!",
      product: "Silk Blouse",
    },
    {
      name: "Amanda White",
      location: "Chicago, USA",
      image:
        "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop",
      text: "I'm obsessed with everything I've bought! The styles are trendy yet timeless, and the quality is unmatched. Fast delivery and excellent customer support. Highly recommend!",
      product: "Evening Gown",
    },
    {
      name: "Rachel Green",
      location: "Boston, USA",
      image:
        "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=100&h=100&fit=crop",
      text: "Best online shopping experience ever! The website is easy to navigate, checkout is smooth, and my order arrived perfectly packaged. The dress fits like a dream!",
      product: "Maxi Dress Collection",
    },
    {
      name: "Lauren Taylor",
      location: "Seattle, USA",
      image:
        "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=100&h=100&fit=crop",
      text: "The fabrics are luxurious and the designs are sophisticated. I feel confident and beautiful wearing Krambica. Their attention to customer satisfaction is truly impressive!",
      product: "Formal Blazer Set",
    },
  ];

  const getItemsPerView = () => {
    if (typeof window !== "undefined") {
      if (window.innerWidth >= 1024) return 3;
      if (window.innerWidth >= 640) return 2;
    }
    return 1;
  };

  const [itemsPerView, setItemsPerView] = useState(getItemsPerView());

  useEffect(() => {
    const handleResize = () => setItemsPerView(getItemsPerView());
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleTouchStart = (e) => setTouchStart(e.targetTouches[0].clientX);
  const handleTouchMove = (e) => setTouchEnd(e.targetTouches[0].clientX);
  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 75) {
      setCurrentIndex((prev) =>
        Math.min(prev + 1, testimonials.length - itemsPerView)
      );
    }
    if (touchStart - touchEnd < -75) {
      setCurrentIndex((prev) => Math.max(prev - 1, 0));
    }
  };

  const next = () =>
    setCurrentIndex((prev) =>
      Math.min(prev + 1, testimonials.length - itemsPerView)
    );
  const prev = () => setCurrentIndex((prev) => Math.max(prev - 1, 0));

  return (
    <div className="py-8 md:py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center text-[#115e59] mb-2 md:mb-3 font-serif">
          What Our Customers Say
        </h2>
        <p className="text-center text-gray-600 text-sm md:text-base mb-8 md:mb-10">
          Real reviews from real customers
        </p>

        <div className="relative">
          <div
            className="overflow-hidden"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <div
              className="flex transition-transform duration-600 ease-in-out"
              style={{
                transform: `translateX(-${
                  currentIndex * (100 / itemsPerView)
                }%)`,
              }}
            >
              {testimonials.map((testimonial, index) => (
                <div
                  key={index}
                  className="flex-shrink-0 px-2 md:px-3"
                  style={{ width: `${100 / itemsPerView}%` }}
                >
                  <TestimonialCard testimonial={testimonial} />
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={prev}
            disabled={currentIndex === 0}
            className="absolute left-0 md:-left-6 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-[#115e59] hover:text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed z-10"
          >
            <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
          </button>

          <button
            onClick={next}
            disabled={currentIndex >= testimonials.length - itemsPerView}
            className="absolute right-0 md:-right-6 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-[#115e59] hover:text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed z-10"
          >
            <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
          </button>
        </div>

        <div className="flex justify-center gap-2 mt-6 md:mt-8">
          {Array.from({ length: testimonials.length - itemsPerView + 1 }).map(
            (_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 md:w-2.5 md:h-2.5 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? "bg-[#115e59] w-6 md:w-8"
                    : "bg-gray-300"
                }`}
              />
            )
          )}
        </div>
      </div>
    </div>
  );
};

// Video Carousel Component

// Instagram Section
const InstagramSection = () => {
  const images = [
    "https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=400&h=400&fit=crop",
    "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=400&h=400&fit=crop",
    "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=400&h=400&fit=crop",
    "https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?w=400&h=400&fit=crop",
    "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=400&h=400&fit=crop",
    "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400&h=400&fit=crop",
  ];

  return (
    <div className="py-8 md:py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center text-[#115e59] mb-2 md:mb-3 font-serif">
          Follow Us on Instagram
        </h2>
        <p className="text-center text-gray-600 text-sm md:text-base mb-6 md:mb-8">
          @krambica_fashion - Shop our Instagram feed
        </p>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-3 lg:gap-4">
          {images.map((img, index) => (
            <div
              key={index}
              className="relative aspect-square overflow-hidden rounded-lg md:rounded-xl cursor-pointer group"
            >
              <img
                src={img}
                alt={`Instagram ${index + 1}`}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-[#115e59]/80 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <svg
                  className="w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 text-white"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
// Download App Section
const DownloadAppSection = () => {
  return (
    <div className="py-8  bg-gradient-to-br from-[#115e59] via-[#0f766e] to-[#134e4a] relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-32 h-32 md:w-48 md:h-48 bg-white rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-40 h-40 md:w-56 md:h-56 bg-white rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* Left Content */}
          <div className="text-center lg:text-left text-white order-2 lg:order-1">
            <div className="inline-block bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-xs md:text-sm font-semibold mb-4 md:mb-6">
              ✨ Coming Soon
            </div>

            <h2 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 md:mb-6 leading-tight">
              Shop Anytime, <br className="hidden md:block" />
              <span className="text-teal-200">Anywhere</span>
            </h2>

            <p className="text-base md:text-lg lg:text-xl text-teal-100 mb-6 md:mb-8 leading-relaxed max-w-xl mx-auto lg:mx-0">
              Get exclusive app-only deals, early access to new collections, and
              seamless shopping experience right at your fingertips.
            </p>

            {/* Features List */}
            <div className="grid sm:grid-cols-2 gap-3 md:gap-4 mb-8 md:mb-10 max-w-xl mx-auto lg:mx-0">
              {[
                { icon: "🎁", text: "Exclusive App Deals" },
                { icon: "⚡", text: "Lightning Fast Checkout" },
                { icon: "🔔", text: "Real-time Notifications" },
                { icon: "📦", text: "Track Orders Live" },
              ].map((feature, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-lg p-3 md:p-4"
                >
                  <span className="text-2xl md:text-3xl">{feature.icon}</span>
                  <span className="text-sm md:text-base font-medium">
                    {feature.text}
                  </span>
                </div>
              ))}
            </div>

            {/* Download Buttons */}

            {/* Notification Signup */}
          </div>

          {/* Right Content - Phone Mockup */}
          <div className="relative order-1 lg:order-2">
            <div className="relative mx-auto w-64 sm:w-72 md:w-80 lg:w-96">
              {/* Floating Elements */}
              <div className="absolute -top-4 -left-4 md:-top-6 md:-left-6 w-16 h-16 md:w-20 md:h-20 bg-amber-400 rounded-2xl flex items-center justify-center shadow-2xl animate-bounce">
                <span className="text-2xl md:text-3xl">🛍️</span>
              </div>
              <div className="absolute -bottom-4 -right-4 md:-bottom-6 md:-right-6 w-16 h-16 md:w-20 md:h-20 bg-pink-400 rounded-2xl flex items-center justify-center shadow-2xl animate-pulse">
                <span className="text-2xl md:text-3xl">💝</span>
              </div>
              <div className="absolute top-1/4 -right-8 md:-right-12 w-14 h-14 md:w-16 md:h-16 bg-purple-400 rounded-full flex items-center justify-center shadow-2xl animate-pulse delay-100">
                <span className="text-xl md:text-2xl">⚡</span>
              </div>

              {/* Phone Frame */}
              <div className="relative bg-gray-900 rounded-[2.5rem] md:rounded-[3rem] p-2 md:p-3 shadow-2xl">
                <div className="bg-white rounded-[2rem] md:rounded-[2.5rem] overflow-hidden">
                  {/* Phone Notch */}
                  <div className="bg-gray-900 h-6 md:h-7 rounded-b-3xl mx-auto w-32 md:w-40"></div>

                  {/* App Screenshot */}
                  <div className="bg-gradient-to-br from-teal-50 to-white p-4 md:p-6 h-[500px] sm:h-[550px] md:h-[600px] lg:h-[650px] overflow-hidden">
                    <div className="text-center mb-4 md:mb-6">
                      <div className="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-[#115e59] to-[#0f766e] rounded-2xl md:rounded-3xl mx-auto mb-3 md:mb-4 flex items-center justify-center shadow-lg">
                        <span className="text-2xl md:text-3xl">👗</span>
                      </div>
                      <h3 className="text-lg md:text-xl font-bold text-gray-900">
                        Krambica
                      </h3>
                      <p className="text-xs md:text-sm text-gray-500">
                        Fashion & Lifestyle
                      </p>
                    </div>

                    {/* Sample App Interface */}
                    <div className="space-y-3 md:space-y-4">
                      <div className="bg-white rounded-xl md:rounded-2xl p-3 md:p-4 shadow-md">
                        <div className="flex gap-3 md:gap-4">
                          <div className="w-16 h-16 md:w-20 md:h-20 bg-gray-200 rounded-lg md:rounded-xl animate-pulse"></div>
                          <div className="flex-1 space-y-2">
                            <div className="h-3 md:h-4 bg-gray-200 rounded animate-pulse"></div>
                            <div className="h-3 md:h-4 bg-gray-200 rounded w-3/4 animate-pulse"></div>
                          </div>
                        </div>
                      </div>
                      <div className="bg-white rounded-xl md:rounded-2xl p-3 md:p-4 shadow-md">
                        <div className="flex gap-3 md:gap-4">
                          <div className="w-16 h-16 md:w-20 md:h-20 bg-gray-200 rounded-lg md:rounded-xl animate-pulse delay-75"></div>
                          <div className="flex-1 space-y-2">
                            <div className="h-3 md:h-4 bg-gray-200 rounded animate-pulse delay-75"></div>
                            <div className="h-3 md:h-4 bg-gray-200 rounded w-3/4 animate-pulse delay-75"></div>
                          </div>
                        </div>
                      </div>
                      <div className="bg-white rounded-xl md:rounded-2xl p-3 md:p-4 shadow-md">
                        <div className="flex gap-3 md:gap-4">
                          <div className="w-16 h-16 md:w-20 md:h-20 bg-gray-200 rounded-lg md:rounded-xl animate-pulse delay-100"></div>
                          <div className="flex-1 space-y-2">
                            <div className="h-3 md:h-4 bg-gray-200 rounded animate-pulse delay-100"></div>
                            <div className="h-3 md:h-4 bg-gray-200 rounded w-3/4 animate-pulse delay-100"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Floating Action Buttons
const FloatingButtons = () => {
  const [showChat, setShowChat] = useState(false);
  const [showWhatsApp, setShowWhatsApp] = useState(false);

  return (
    <>
      <div className="fixed right-4 md:right-6 bottom-20 md:bottom-6 z-50 flex flex-col gap-3 md:gap-4">
        <button
          onClick={() => setShowChat(true)}
          className="group bg-gradient-to-r from-[#115e59] to-[#134e4a] text-white w-12 h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 rounded-full shadow-2xl flex items-center justify-center transition-all duration-300 hover:scale-110 relative"
        >
          <MessageCircle className="w-6 h-6 md:w-7 md:h-7 lg:w-8 lg:h-8" />
          <span className="absolute -top-1 -right-1 w-3 h-3 md:w-4 md:h-4 bg-green-500 rounded-full animate-pulse"></span>
        </button>

        <button
          onClick={() => setShowWhatsApp(true)}
          className="group bg-green-500 hover:bg-green-600 text-white w-12 h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 rounded-full shadow-2xl flex items-center justify-center transition-all duration-300 hover:scale-110"
        >
          <svg
            className="w-6 h-6 md:w-7 md:h-7 lg:w-8 lg:h-8"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
          </svg>
        </button>
      </div>

      {showChat && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[100] flex items-center justify-center p-4"
          onClick={() => setShowChat(false)}
        >
          <div
            className="bg-white rounded-2xl shadow-2xl w-full max-w-md transform transition-all duration-300 scale-100 opacity-100"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-gradient-to-r from-[#115e59] to-[#0f766e] text-white p-4 md:p-6 rounded-t-2xl flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                  <MessageCircle className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-base md:text-lg">Live Chat</h3>
                  <p className="text-xs text-white/80">We're here to help!</p>
                </div>
              </div>
              <button
                onClick={() => setShowChat(false)}
                className="text-white hover:bg-white/20 rounded-full p-2 transition"
              >
                <X className="w-5 h-5 md:w-6 md:h-6" />
              </button>
            </div>
            <div className="p-6 md:p-8 text-center">
              <div className="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-teal-100 to-teal-200 rounded-full flex items-center justify-center mx-auto mb-4 md:mb-6">
                <Clock className="w-8 h-8 md:w-10 md:h-10 text-[#115e59]" />
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-2 md:mb-3">
                Coming Soon!
              </h3>
              <p className="text-gray-600 text-sm md:text-base mb-4 md:mb-6 leading-relaxed">
                Our live chat feature is currently under development. We'll be
                available to assist you soon!
              </p>
              <p className="text-xs md:text-sm text-gray-500 mb-4 md:mb-6">
                In the meantime, feel free to reach out via:
              </p>
              <div className="flex flex-col gap-2 md:gap-3">
                <a
                  href="mailto:support@krambica.com"
                  className="flex items-center justify-center gap-3 bg-gray-100 hover:bg-gray-200 px-4 md:px-6 py-2.5 md:py-3 rounded-lg transition font-medium text-gray-700 text-sm md:text-base"
                >
                  <Mail className="w-4 h-4 md:w-5 md:h-5" />
                  support@krambica.com
                </a>
                <a
                  href="tel:+919876543210"
                  className="flex items-center justify-center gap-3 bg-gray-100 hover:bg-gray-200 px-4 md:px-6 py-2.5 md:py-3 rounded-lg transition font-medium text-gray-700 text-sm md:text-base"
                >
                  <Phone className="w-4 h-4 md:w-5 md:h-5" />
                  +91 98765 43210
                </a>
              </div>
              <button
                onClick={() => setShowChat(false)}
                className="mt-4 md:mt-6 bg-gradient-to-r from-[#115e59] to-[#134e4a] text-white px-6 md:px-8 py-2.5 md:py-3 rounded-full font-semibold transition w-full text-sm md:text-base"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {showWhatsApp && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[100] flex items-center justify-center p-4"
          onClick={() => setShowWhatsApp(false)}
        >
          <div
            className="bg-white rounded-2xl shadow-2xl w-full max-w-md transform transition-all duration-300 scale-100 opacity-100"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-4 md:p-6 rounded-t-2xl flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                  <svg
                    className="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold text-base md:text-lg">WhatsApp</h3>
                  <p className="text-xs text-white/80">Chat with us</p>
                </div>
              </div>
              <button
                onClick={() => setShowWhatsApp(false)}
                className="text-white hover:bg-white/20 rounded-full p-2 transition"
              >
                <X className="w-5 h-5 md:w-6 md:h-6" />
              </button>
            </div>
            <div className="p-6 md:p-8 text-center">
              <div className="w-16 h-16 md:w-20 md:h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 md:mb-6">
                <Clock className="w-8 h-8 md:w-10 md:h-10 text-green-600" />
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-2 md:mb-3">
                Coming Soon!
              </h3>
              <p className="text-gray-600 text-sm md:text-base mb-4 md:mb-6 leading-relaxed">
                WhatsApp support is launching soon! We're setting up to provide
                you with instant assistance.
              </p>
              <p className="text-xs md:text-sm text-gray-500 mb-4 md:mb-6">
                For immediate help, please contact:
              </p>
              <div className="flex flex-col gap-2 md:gap-3">
                <a
                  href="mailto:support@krambica.com"
                  className="flex items-center justify-center gap-3 bg-gray-100 hover:bg-gray-200 px-4 md:px-6 py-2.5 md:py-3 rounded-lg transition font-medium text-gray-700 text-sm md:text-base"
                >
                  <Mail className="w-4 h-4 md:w-5 md:h-5" />
                  support@krambica.com
                </a>
                <a
                  href="tel:+919876543210"
                  className="flex items-center justify-center gap-3 bg-gray-100 hover:bg-gray-200 px-4 md:px-6 py-2.5 md:py-3 rounded-lg transition font-medium text-gray-700 text-sm md:text-base"
                >
                  <Phone className="w-4 h-4 md:w-5 md:h-5" />
                  +91 98765 43210
                </a>
              </div>
              <button
                onClick={() => setShowWhatsApp(false)}
                className="mt-4 md:mt-6 bg-green-500 hover:bg-green-600 text-white px-6 md:px-8 py-2.5 md:py-3 rounded-full font-semibold transition w-full text-sm md:text-base"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

// Scroll to Top Button
const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      {isVisible && (
        <button
          onClick={scrollToTop}
          className="fixed left-4 md:left-6 bottom-20 md:bottom-6 z-50 w-12 h-12 md:w-14 md:h-14 bg-gradient-to-r from-[#115e59] to-[#134e4a] text-white rounded-full shadow-2xl flex items-center justify-center transition-all duration-300 hover:scale-110"
          aria-label="Scroll to top"
        >
          <svg
            className="w-5 h-5 md:w-6 md:h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 10l7-7m0 0l7 7m-7-7v18"
            />
          </svg>
        </button>
      )}
    </>
  );
};

// Main App Component
const HomeComponent = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-teal-50">
      <HeroCarousel />
      <IntroSection />
      <TrendingSection />
      <BestsellerSection />
      <CollectionsSlider />
      <TestimonialsSection />
      <VideoCarousel />
      <DownloadAppSection />
      <FloatingButtons />
      <ScrollToTop />
    </div>
  );
};

export default HomeComponent;
