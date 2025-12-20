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
  Zap,
  Bell,
  ShieldCheck,
  Download,
  QrCode,
  ShoppingBag,
  ArrowRight,
  Home,
  Smartphone,
  Check,
  Quote,
  ArrowLeft,
} from "lucide-react";
import HeroCarousel from "./components/HeroCarousel";
import IntroSection from "./components/Intriduction";
import TrendingSection from "./components/TrendingSection";
import BestsellerSection from "./components/BestsellerSection";
import CollectionsSlider from "./components/CollectionsSlider";
import VideoCarousel from "./components/VideoCarousel";

// Add global styles at the top level
const globalStyles = `
  @import url("https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600&family=Lato:wght@300;400;700&display=swap");
  
  /* Apply Cinzel to all heading elements */
  h1, h2, h3, h4, h5, h6,
  .font-display,
  .hero-title,
  .section-title,
  .product-title,
  .collection-title,
  .testimonial-name {
    font-family: "Cinzel", serif;
  }
  
  /* Apply Lato to body text */
  body,
  .font-body,
  .product-description,
  .testimonial-text,
  .section-description {
    font-family: "Lato", sans-serif;
  }
  
  /* Hide scrollbar utility */
  .no-scrollbar::-webkit-scrollbar {
    display: none;
  }
  .no-scrollbar {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
`;

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
          <h4 className="font-display font-semibold text-base md:text-lg text-gray-900">
            {testimonial.name}
          </h4>
          <p className="text-xs md:text-sm text-gray-600 font-body">
            {testimonial.location}
          </p>
        </div>
      </div>
      <div className="flex text-amber-400 text-base md:text-lg mb-3 md:mb-4 relative z-10">
        {[...Array(5)].map((_, i) => (
          <Star key={i} className="w-4 h-4 md:w-5 md:h-5 fill-current" />
        ))}
      </div>
      <p className="text-sm md:text-base text-gray-700 leading-relaxed mb-3 md:mb-4 relative z-10 flex-grow font-body">
        {testimonial.text}
      </p>
      <p className="text-xs md:text-sm text-gray-500 border-t border-gray-100 pt-2 md:pt-3 relative z-10 font-body">
        Purchased: {testimonial.product}
      </p>
    </div>
  );
};

// Testimonials Section
const TestimonialsSection = () => {
  const scrollRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const testimonials = [
    {
      id: 1,
      name: "Sarah Johnson",
      role: "Verified Buyer",
      image:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop",
      text: "The fabric quality is simply unmatched at this price point. It drapes beautifully and feels incredibly luxurious against the skin.",
      product: "Silk Evening Dress",
      rating: 5,
    },
    {
      id: 2,
      name: "Emily Davis",
      role: "Fashion Editor",
      image:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop",
      text: "I was skeptical about ordering online, but the packaging alone won me over. A truly premium unboxing experience.",
      product: "Signature Totebag",
      rating: 5,
    },
    {
      id: 3,
      name: "Jessica Martinez",
      role: "Loyal Customer",
      image:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop",
      text: "Finally, a brand that understands modern ethnic wear. The fits are contemporary but the soul is traditional.",
      product: "Velvet Sharara Set",
      rating: 5,
    },
    {
      id: 4,
      name: "Amanda White",
      role: "Verified Buyer",
      image:
        "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop",
      text: "Fast shipping and the customer support team was so helpful with sizing. I felt very taken care of.",
      product: "Summer Floral Set",
      rating: 4,
    },
    {
      id: 5,
      name: "Rachel Green",
      role: "Influencer",
      image:
        "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=400&h=400&fit=crop",
      text: "Every time I wear Krambica, I get compliments. It's my secret weapon for weddings and parties.",
      product: "Embroidered Lehenga",
      rating: 5,
    },
  ];

  const checkScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  const scroll = (direction) => {
    if (scrollRef.current) {
      const { clientWidth } = scrollRef.current;
      const scrollAmount =
        direction === "left" ? -clientWidth / 2 : clientWidth / 2;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <section className="py-24 bg-white border-t border-gray-100">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        {/* --- Minimal Header --- */}
        <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-8 border-b border-gray-100 pb-8">
          <div>
            <h2 className="font-display text-4xl md:text-5xl text-gray-900 tracking-wide mb-3">
              <b>Client Diaries</b>
            </h2>
            <p className="font-body text-gray-500 text-lg font-light tracking-wide">
              Real stories from our global community.
            </p>
          </div>

          {/* Custom Navigation Arrows */}
          <div className="flex gap-4">
            <button
              onClick={() => scroll("left")}
              disabled={!canScrollLeft}
              className={`p-4 rounded-full border transition-all duration-300 ${
                !canScrollLeft
                  ? "border-gray-100 text-gray-300 cursor-not-allowed"
                  : "border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white"
              }`}
            >
              <ArrowLeft size={20} strokeWidth={1.5} />
            </button>
            <button
              onClick={() => scroll("right")}
              disabled={!canScrollRight}
              className={`p-4 rounded-full border transition-all duration-300 ${
                !canScrollRight
                  ? "border-gray-100 text-gray-300 cursor-not-allowed"
                  : "border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white"
              }`}
            >
              <ArrowRight size={20} strokeWidth={1.5} />
            </button>
          </div>
        </div>

        {/* --- The Clean Slider --- */}
        <div
          ref={scrollRef}
          onScroll={checkScroll}
          className="flex gap-8 overflow-x-auto no-scrollbar snap-x snap-mandatory pb-4"
        >
          {testimonials.map((item) => (
            <div
              key={item.id}
              className="min-w-[85vw] md:min-w-[400px] snap-start flex flex-col"
            >
              {/* Card Container */}
              <div className="bg-gray-50 p-8 md:p-10 h-full flex flex-col justify-between transition-colors duration-500 hover:bg-gray-100">
                {/* Top: Stars & Quote Icon */}
                <div className="flex justify-between items-start mb-8">
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={14}
                        fill={i < item.rating ? "#1f2937" : "transparent"}
                        className={
                          i < item.rating ? "text-gray-900" : "text-gray-300"
                        }
                      />
                    ))}
                  </div>
                  <Quote size={32} className="text-gray-300 opacity-50" />
                </div>

                {/* Middle: Text */}
                <div className="mb-8">
                  <p className="font-display text-xl md:text-2xl text-gray-800 leading-relaxed italic">
                    "{item.text}"
                  </p>
                </div>

                {/* Bottom: User & Product */}
                <div className="flex items-center gap-4 pt-8 border-t border-gray-200">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-12 h-12 rounded-full object-cover grayscale opacity-80"
                  />
                  <div>
                    <h4 className="font-body font-bold text-gray-900 text-sm uppercase tracking-wider">
                      {item.name}
                    </h4>
                    <div className="flex flex-wrap items-center gap-2 text-xs text-gray-500 mt-1 font-light">
                      <span>{item.role}</span>
                      <span className="w-1 h-1 bg-gray-300 rounded-full" />
                      <span className="text-gray-700">{item.product}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* Spacer for right padding */}
          <div className="min-w-[1px] h-1" />
        </div>
      </div>
    </section>
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
        <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-center text-[#115e59] mb-2 md:mb-3">
          Follow Us on Instagram
        </h2>
        <p className="font-body text-center text-gray-600 text-sm md:text-base mb-6 md:mb-8">
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
// Download App Section with PWA Install

const DownloadAppSection = () => {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [isInstallable, setIsInstallable] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);

  useEffect(() => {
    setIsClient(true);
    // PWA Logic (kept streamlined)
    const isStandalone =
      typeof window !== "undefined" &&
      (window.matchMedia("(display-mode: standalone)").matches ||
        window.navigator.standalone === true);

    if (isStandalone) setIsInstalled(true);

    const handlePrompt = (e) => {
      e.preventDefault();
      if (!isStandalone) {
        setDeferredPrompt(e);
        setIsInstallable(true);
      }
    };

    window.addEventListener("beforeinstallprompt", handlePrompt);
    return () =>
      window.removeEventListener("beforeinstallprompt", handlePrompt);
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === "accepted") {
      setDeferredPrompt(null);
      setIsInstallable(false);
    }
  };

  if (!isClient) return null;

  return (
    <section className="py-24 bg-white border-t border-gray-100 overflow-hidden">
      <style jsx global>{`
        @import url("https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700&family=Inter:wght@400;500;600&display=swap");
        .font-serif {
          font-family: "Playfair Display", serif;
        }
        .font-sans {
          font-family: "Inter", sans-serif;
        }
      `}</style>

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* --- LEFT COLUMN: Editorial Pitch --- */}
          <div className="space-y-8 text-center lg:text-left order-2 lg:order-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-gray-100 rounded-full">
              <span className="w-2 h-2 bg-emerald-600 rounded-full animate-pulse"></span>
              <span className="font-body text-xs font-bold tracking-widest uppercase text-gray-600">
                Native App
              </span>
            </div>

            <h2 className="font-display text-4xl lg:text-6xl text-gray-900 leading-tight">
              The Red Carpet, <br />
              <span className="italic text-gray-400">in your pocket.</span>
            </h2>

            <p className="font-body text-lg text-gray-500 leading-relaxed max-w-lg mx-auto lg:mx-0">
              Unlock the complete Krambica experience. Get early access to new
              saree drops, seamless checkout, and exclusive app-only discounts.
            </p>

            <ul className="space-y-4 pt-2 inline-block text-left font-body">
              {[
                "Instant One-Tap Checkout",
                "Exclusive Runway Previews",
                "Personalized Styling Feed",
              ].map((item, i) => (
                <li
                  key={i}
                  className="flex items-center gap-3 text-gray-800 font-medium"
                >
                  <div className="w-5 h-5 rounded-full bg-black text-white flex items-center justify-center shrink-0">
                    <Check size={12} strokeWidth={4} />
                  </div>
                  {item}
                </li>
              ))}
            </ul>

            {/* CTA Buttons */}
            <div className="pt-6 flex flex-col sm:flex-row items-center gap-5 justify-center lg:justify-start">
              {isInstallable ? (
                <button
                  onClick={handleInstallClick}
                  className="bg-gray-900 text-white px-8 py-4 rounded-full font-semibold flex items-center gap-3 hover:bg-black transition-all shadow-xl hover:shadow-2xl active:scale-95"
                >
                  <Download size={20} />
                  <span>Install App</span>
                </button>
              ) : isInstalled ? (
                <div className="bg-green-50 text-green-700 px-8 py-4 rounded-full font-semibold flex items-center gap-3 cursor-default border border-green-100">
                  <Check size={20} /> App Installed
                </div>
              ) : (
                <div className="hidden lg:flex items-center gap-4 bg-white p-2 pr-6 rounded-2xl border border-gray-100 shadow-sm">
                  <div className="bg-gray-900 p-2 rounded-xl">
                    <QrCode size={28} className="text-white" />
                  </div>
                  <div className="text-left">
                    <p className="font-body text-xs font-bold text-gray-900 uppercase">
                      Scan to Download
                    </p>
                    <p className="font-body text-[10px] text-gray-400">
                      iOS & Android
                    </p>
                  </div>
                </div>
              )}
              <div className="lg:hidden font-body text-xs text-gray-400">
                {!isInstallable && !isInstalled && "Open in browser to install"}
              </div>
            </div>
          </div>

          {/* --- RIGHT COLUMN: The Replica Phone UI --- */}
          <div className="order-1 lg:order-2 flex justify-center lg:justify-end relative">
            {/* Decorative Elements */}
            <div className="absolute top-20 -left-12 w-24 h-24 bg-gradient-to-tr from-rose-100 to-transparent rounded-full blur-xl opacity-60"></div>
            <div className="absolute bottom-20 -right-4 w-32 h-32 bg-gradient-to-tr from-emerald-100 to-transparent rounded-full blur-xl opacity-60"></div>

            {/* Phone Frame */}
            <div className="relative w-[320px] h-[640px] bg-gray-900 rounded-[3.5rem] p-3 shadow-2xl border-[6px] border-gray-900 ring-1 ring-gray-800 z-10">
              {/* Hardware Buttons */}
              <div className="absolute top-28 -left-[8px] w-[2px] h-8 bg-gray-700 rounded-l-md" />
              <div className="absolute top-36 -left-[8px] w-[2px] h-14 bg-gray-700 rounded-l-md" />

              {/* Screen Content - Pure White Background as per image */}
              <div className="h-full w-full bg-white rounded-[2.8rem] overflow-hidden flex flex-col relative">
                {/* Status Bar / Notch */}
                <div className="absolute top-0 w-full h-8 z-30 flex justify-center items-end">
                  <div className="w-24 h-6 bg-black rounded-b-xl"></div>
                </div>

                {/* App Header */}
                <div className="mt-8 px-6 pb-2 flex justify-between items-center bg-white z-20">
                  <Menu size={24} className="text-gray-800" />
                  <span className="font-display font-bold text-xl text-emerald-950 tracking-wide">
                    Krambica
                  </span>
                  <ShoppingBag size={22} className="text-gray-800" />
                </div>

                {/* SCROLLABLE AREA */}
                <div className="flex-1 overflow-hidden px-5 pt-2 pb-4 space-y-6 bg-white">
                  {/* HERO CARD - Exact Replica of Image */}
                  <div className="relative w-full aspect-[4/5] rounded-[2rem] overflow-hidden shadow-sm">
                    <img
                      src="https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=600&h=800&fit=crop&q=85"
                      className="w-full h-full object-cover"
                      alt="Saree Model"
                    />

                    {/* The specific 'NEW ARRIVAL' badge from image */}
                    <div className="absolute bottom-6 left-6 bg-white px-4 py-1.5 shadow-sm">
                      <span className="font-body text-[10px] font-extrabold tracking-[0.2em] text-black uppercase">
                        New Arrival
                      </span>
                    </div>
                  </div>

                  {/* Secondary Row (The two grey boxes from image) */}
                  <div className="flex gap-4">
                    <div className="flex-1 aspect-square bg-gray-100 rounded-2xl animate-pulse"></div>
                    <div className="flex-1 aspect-square bg-gray-100 rounded-2xl animate-pulse"></div>
                  </div>
                </div>

                {/* BOTTOM NAVIGATION - Exact Replica */}
                <div className="h-16 bg-white border-t border-gray-50 flex justify-between items-center px-8 pb-2">
                  {/* Home (Active) */}
                  <div className="relative">
                    <Home size={24} className="text-black stroke-[2.5]" />
                  </div>

                  {/* Search */}
                  <Search size={24} className="text-gray-300 stroke-[2.5]" />

                  {/* Favorites */}
                  <Star size={24} className="text-gray-300 stroke-[2.5]" />

                  {/* Profile */}
                  <User size={24} className="text-gray-300 stroke-[2.5]" />
                </div>

                {/* Home Indicator */}
                <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-32 h-1 bg-black rounded-full opacity-20"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
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
                  <h3 className="font-display font-bold text-base md:text-lg">
                    Live Chat
                  </h3>
                  <p className="font-body text-xs text-white/80">
                    We're here to help!
                  </p>
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
              <h3 className="font-display text-xl md:text-2xl font-bold text-gray-900 mb-2 md:mb-3">
                Coming Soon!
              </h3>
              <p className="font-body text-gray-600 text-sm md:text-base mb-4 md:mb-6 leading-relaxed">
                Our live chat feature is currently under development. We'll be
                available to assist you soon!
              </p>
              <p className="font-body text-xs md:text-sm text-gray-500 mb-4 md:mb-6">
                In the meantime, feel free to reach out via:
              </p>
              <div className="flex flex-col gap-2 md:gap-3">
                <a
                  href="mailto:support@krambica.com"
                  className="font-body flex items-center justify-center gap-3 bg-gray-100 hover:bg-gray-200 px-4 md:px-6 py-2.5 md:py-3 rounded-lg transition font-medium text-gray-700 text-sm md:text-base"
                >
                  <Mail className="w-4 h-4 md:w-5 md:h-5" />
                  support@krambica.com
                </a>
                <a
                  href="tel:+919876543210"
                  className="font-body flex items-center justify-center gap-3 bg-gray-100 hover:bg-gray-200 px-4 md:px-6 py-2.5 md:py-3 rounded-lg transition font-medium text-gray-700 text-sm md:text-base"
                >
                  <Phone className="w-4 h-4 md:w-5 md:h-5" />
                  +91 98765 43210
                </a>
              </div>
              <button
                onClick={() => setShowChat(false)}
                className="font-body mt-4 md:mt-6 bg-gradient-to-r from-[#115e59] to-[#134e4a] text-white px-6 md:px-8 py-2.5 md:py-3 rounded-full font-semibold transition w-full text-sm md:text-base"
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
                  <h3 className="font-display font-bold text-base md:text-lg">
                    WhatsApp
                  </h3>
                  <p className="font-body text-xs text-white/80">
                    Chat with us
                  </p>
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
              <h3 className="font-display text-xl md:text-2xl font-bold text-gray-900 mb-2 md:mb-3">
                Coming Soon!
              </h3>
              <p className="font-body text-gray-600 text-sm md:text-base mb-4 md:mb-6 leading-relaxed">
                WhatsApp support is launching soon! We're setting up to provide
                you with instant assistance.
              </p>
              <p className="font-body text-xs md:text-sm text-gray-500 mb-4 md:mb-6">
                For immediate help, please contact:
              </p>
              <div className="flex flex-col gap-2 md:gap-3">
                <a
                  href="mailto:support@krambica.com"
                  className="font-body flex items-center justify-center gap-3 bg-gray-100 hover:bg-gray-200 px-4 md:px-6 py-2.5 md:py-3 rounded-lg transition font-medium text-gray-700 text-sm md:text-base"
                >
                  <Mail className="w-4 h-4 md:w-5 md:h-5" />
                  support@krambica.com
                </a>
                <a
                  href="tel:+919876543210"
                  className="font-body flex items-center justify-center gap-3 bg-gray-100 hover:bg-gray-200 px-4 md:px-6 py-2.5 md:py-3 rounded-lg transition font-medium text-gray-700 text-sm md:text-base"
                >
                  <Phone className="w-4 h-4 md:w-5 md:h-5" />
                  +91 98765 43210
                </a>
              </div>
              <button
                onClick={() => setShowWhatsApp(false)}
                className="font-body mt-4 md:mt-6 bg-green-500 hover:bg-green-600 text-white px-6 md:px-8 py-2.5 md:py-3 rounded-full font-semibold transition w-full text-sm md:text-base"
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
    <>
      <style jsx global>
        {globalStyles}
      </style>
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
    </>
  );
};

export default HomeComponent;
