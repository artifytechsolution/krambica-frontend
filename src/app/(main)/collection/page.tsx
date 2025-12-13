"use client";
import React, { useState, useEffect } from "react";
import { Search, X, Sparkles, Heart, ChevronRight } from "lucide-react";

const CollectionsPage = () => {
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [isLoading, setIsLoading] = useState(false);
  const [visibleCards, setVisibleCards] = useState([]);

  const categories = [
    { id: "all", label: "All", icon: "✨" },
    { id: "dresses", label: "Dresses", icon: "👗" },
    { id: "tops", label: "Tops", icon: "👚" },
    { id: "bottoms", label: "Bottoms", icon: "👖" },
    { id: "accessories", label: "Accessories", icon: "👜" },
  ];

  const collections = [
    {
      id: 1,
      title: "ANARKALI SUIT SETS",
      image:
        "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=1200&h=800&fit=crop&q=85",
      alt: "Elegant Anarkali suit set collection",
      gradient: "from-teal-600 via-emerald-600 to-cyan-700",
      bgGradient: "from-teal-50 via-emerald-50 to-cyan-100",
    },
    {
      id: 2,
      title: "CLASSIC FESTIVE KURTAS",
      image:
        "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=1200&h=800&fit=crop&q=85",
      alt: "Beautiful festive kurtas collection",
      gradient: "from-teal-600 via-emerald-600 to-cyan-700",
      bgGradient: "from-teal-50 via-emerald-50 to-cyan-100",
    },
    {
      id: 3,
      title: "SHARARA SUIT SETS",
      image:
        "https://images.unsplash.com/photo-1617127365659-c47fa864d8bc?w=1200&h=800&fit=crop&q=85",
      alt: "Elegant sharara suit collection",
      gradient: "from-teal-600 via-emerald-600 to-cyan-700",
      bgGradient: "from-teal-50 via-emerald-50 to-cyan-100",
    },
    {
      id: 4,
      title: "CO-ORD SETS",
      image:
        "https://images.unsplash.com/photo-1614030424754-24d0eebd46b2?w=1200&h=800&fit=crop&q=85",
      alt: "Modern co-ord sets collection",
      gradient: "from-teal-600 via-emerald-600 to-cyan-700",
      bgGradient: "from-teal-50 via-emerald-50 to-cyan-100",
    },
    {
      id: 5,
      title: "GLAM SAREES",
      image:
        "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=1200&h=800&fit=crop&q=85",
      alt: "Glamorous sarees collection",
      gradient: "from-teal-600 via-emerald-600 to-cyan-700",
      bgGradient: "from-teal-50 via-emerald-50 to-cyan-100",
    },
    {
      id: 6,
      title: "CONTEMPORARY JHUMKAS",
      image:
        "https://images.unsplash.com/photo-1602173574767-37ac01994b2a?w=1200&h=800&fit=crop&q=85",
      alt: "Contemporary jhumka earrings",
      gradient: "from-teal-600 via-emerald-600 to-cyan-700",
      bgGradient: "from-teal-50 via-emerald-50 to-cyan-100",
    },
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisibleCards(collections.map((_, i) => i));
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  const handleSearch = (value) => {
    setSearchQuery(value);
    if (value.trim() === "") return;

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 800);
  };

  return (
    <div className="min-h-screen pt-12 pb-12 md:pb-0 md:pt-0 bg-gradient-to-br from-gray-50 via-white to-teal-50/30">
      {/* Search Modal */}
      {searchOpen && (
        <div
          className="fixed inset-0 z-50 flex items-start justify-center pt-20 bg-black/60 backdrop-blur-md px-4"
          onClick={() => setSearchOpen(false)}
          style={{ animation: "fadeIn 0.3s ease-out" }}
        >
          <div
            className="bg-white rounded-3xl w-full max-w-3xl max-h-[80vh] overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
            style={{
              animation: "scaleIn 0.3s ease-out forwards",
              background: "linear-gradient(135deg, #ffffff 0%, #f0fdfa 100%)",
            }}
          >
            {/* Dialog Content */}
            <div className="p-4 sm:p-6 border-b border-gray-100">
              <div className="flex items-center gap-3 w-full">
                <Search className="w-5 h-5 sm:w-6 sm:h-6 text-gray-400 flex-shrink-0" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => handleSearch(e.target.value)}
                  placeholder="Search for products..."
                  autoFocus
                  className="flex-1 text-base sm:text-lg outline-none bg-transparent border-b-2 border-gray-200 focus:border-teal-700 transition-colors duration-300 py-2"
                />
                <div
                  onClick={() => setSearchOpen(false)}
                  className="p-2 hover:bg-gray-100 rounded-full transition-all duration-300 transform hover:scale-110 active:scale-95 cursor-pointer"
                >
                  <X className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
              </div>

              {/* Category Filters */}
              <div className="flex flex-wrap gap-2 mt-4">
                {categories.map((cat) => (
                  <div
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`
                      inline-flex items-center gap-2 px-4 py-2 rounded-full font-semibold text-sm cursor-pointer
                      transition-all duration-300 transform hover:scale-105 active:scale-95
                      ${
                        selectedCategory === cat.id
                          ? "bg-gradient-to-r from-teal-700 to-teal-600 text-white shadow-lg scale-105"
                          : "bg-white border-2 border-gray-200 text-gray-700 hover:border-teal-600 hover:text-teal-800 shadow-sm"
                      }
                    `}
                  >
                    <span>{cat.icon}</span>
                    {cat.label}
                  </div>
                ))}
              </div>
            </div>

            {/* Search Results */}
            <div className="p-4 sm:p-6 max-h-96 overflow-y-auto">
              {isLoading ? (
                <div className="py-12 text-center">
                  <div className="inline-block w-10 h-10 sm:w-12 sm:h-12 border-4 border-gray-200 border-t-teal-700 rounded-full animate-spin" />
                  <p className="mt-4 text-gray-600 font-medium text-base">
                    Searching for &quot;{searchQuery}&quot;...
                  </p>
                </div>
              ) : searchQuery.trim() === "" ? (
                <div className="py-12 text-center text-gray-400">
                  <Search className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-4 text-gray-300" />
                  <h6 className="text-lg sm:text-xl font-semibold">
                    Start typing to search...
                  </h6>
                  <p className="mt-2 block text-xs">
                    Discover our amazing collections
                  </p>
                </div>
              ) : (
                <div className="py-12 text-center">
                  <p className="text-5xl sm:text-6xl mb-4">😔</p>
                  <h6 className="text-lg sm:text-xl text-gray-700 font-semibold mb-2">
                    No products found
                  </h6>
                  <p className="text-xs text-gray-500">
                    Try adjusting your search or category
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-[1800px] py-8 sm:py-12 md:py-16 lg:py-24 xl:py-28">
        {/* Collections Grid */}
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-2 gap-3 sm:gap-4 md:gap-6 lg:gap-10 xl:gap-12 max-w-7xl mx-auto">
          {collections.map((collection, index) => (
            <div key={collection.id}>
              <div
                className={`group relative cursor-pointer transform transition-all duration-700 ${
                  visibleCards.includes(index)
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-10"
                }`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                {/* Glow Effect */}
                <div
                  className={`absolute -inset-0.5 sm:-inset-1 bg-gradient-to-br ${collection.gradient} rounded-2xl sm:rounded-3xl blur-xl sm:blur-2xl opacity-40 group-hover:opacity-60 transition-all duration-500`}
                />

                {/* Card */}
                <div
                  className={`relative bg-gradient-to-br ${collection.gradient} p-2 sm:p-3 md:p-4 rounded-2xl sm:rounded-3xl transform group-hover:scale-[1.02] group-active:scale-[0.98] transition-all duration-500 shadow-xl`}
                >
                  {/* Card Media Container */}
                  <div className="relative overflow-hidden rounded-xl sm:rounded-2xl bg-black h-44 sm:h-64 md:h-80 lg:h-96 xl:h-[500px]">
                    {/* Background Pattern */}
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${collection.bgGradient} opacity-0 group-hover:opacity-20 transition-opacity duration-700`}
                    />

                    {/* Image */}
                    <img
                      src={collection.image}
                      alt={collection.alt}
                      className="w-full h-full object-cover transform group-hover:scale-110 group-hover:rotate-2 transition-transform duration-700"
                      loading="lazy"
                    />

                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-teal-900/80 via-teal-800/30 to-transparent group-hover:from-teal-900/90 transition-all duration-500" />

                    {/* New Badge */}
                    <div className="absolute top-2 sm:top-3 md:top-4 right-2 sm:right-3 md:right-4 bg-white/95 backdrop-blur-md rounded-full px-2 sm:px-3 md:px-4 py-1 sm:py-1.5 md:py-2 flex items-center gap-1 sm:gap-1.5 md:gap-2 shadow-lg sm:shadow-xl transform translate-x-20 sm:translate-x-28 group-hover:translate-x-0 transition-transform duration-500 delay-100">
                      <Heart className="w-3 h-3 sm:w-4 sm:h-4 text-teal-600 group-hover:fill-teal-600 transition-all duration-300" />
                    </div>

                    {/* Corner Decorations */}
                    <div className="absolute top-0 left-0 w-12 sm:w-16 md:w-24 h-12 sm:h-16 md:h-24 bg-gradient-to-br from-teal-300/40 to-transparent rounded-br-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="absolute bottom-0 right-0 w-12 sm:w-16 md:w-24 h-12 sm:h-16 md:h-24 bg-gradient-to-tl from-teal-300/30 to-transparent rounded-tl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                    {/* Card Content */}
                    <div className="absolute inset-0 flex flex-col justify-end p-3 sm:p-4 md:p-6 lg:p-10 text-center">
                      {/* Decorative Line */}
                      <div className="flex items-center justify-center gap-1 sm:gap-1.5 md:gap-2 mb-2 sm:mb-3 md:mb-4 opacity-0 group-hover:opacity-100 transition-all duration-500 delay-100 transform translate-y-4 group-hover:translate-y-0">
                        <div className="h-px w-4 sm:w-6 md:w-8 bg-teal-300/60" />
                        <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 text-teal-300/90 animate-pulse" />
                        <div className="h-px w-4 sm:w-6 md:w-8 bg-teal-300/60" />
                      </div>

                      {/* Title */}
                      <h2 className="font-serif text-xs sm:text-lg md:text-2xl lg:text-4xl xl:text-5xl font-bold text-white tracking-[0.12em] sm:tracking-[0.18em] group-hover:tracking-[0.18em] sm:group-hover:tracking-[0.28em] transition-all duration-500 drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)] sm:drop-shadow-[0_5px_15px_rgba(0,0,0,0.8)] leading-tight mb-2 sm:mb-3 md:mb-4">
                        {collection.title}
                      </h2>

                      {/* Subtitle */}
                      <p className="hidden sm:block text-teal-100 font-light opacity-0 group-hover:opacity-100 transition-all duration-500 delay-200 transform translate-y-4 group-hover:translate-y-0 mb-2 sm:mb-3 md:mb-4 text-sm">
                        Discover timeless elegance
                      </p>

                      {/* CTA Button */}
                      <div className="opacity-0 group-hover:opacity-100 transition-all duration-500 delay-300 transform translate-y-4 group-hover:translate-y-0">
                        <button className="inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3 sm:py-4 rounded-full font-bold text-[10px] sm:text-xs md:text-sm bg-teal-700/80 backdrop-blur-md hover:bg-teal-600 shadow-md sm:shadow-lg text-white transform hover:scale-105 active:scale-95 transition-all duration-300">
                          Explore
                          <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4 transform group-hover:translate-x-1 transition-transform duration-300" />
                        </button>
                      </div>
                    </div>

                    {/* Shimmer Effect */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-1000">
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-teal-300/30 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        /* Custom teal color as fallback */
        .bg-teal-700 {
          background-color: #0d9488;
        }
        .text-teal-700 {
          color: #0d9488;
        }
        .border-teal-700 {
          border-color: #0d9488;
        }
        .from-teal-600 {
          --tw-gradient-from: #0d9488;
        }
        .to-teal-600 {
          --tw-gradient-to: #0d9488;
        }
      `}</style>
    </div>
  );
};

export default CollectionsPage;
