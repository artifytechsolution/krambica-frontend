"use client";
import React, { useState, useEffect } from "react";
import {
  Search,
  X,
  ShoppingBag,
  Menu,
  ArrowRight,
  ArrowUpRight,
  SlidersHorizontal,
  Plus,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useCategoryList } from "@src/hooks/apiHooks";

// --- Components ---

const SearchModal = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-[100] bg-white animate-in fade-in duration-300 flex flex-col safe-area-inset">
      <div className="flex justify-between items-center p-6 border-b border-gray-100">
        <span className="text-xs font-bold tracking-widest uppercase">
          Search
        </span>
        <button
          onClick={onClose}
          className="p-3 -mr-2 hover:bg-gray-50 rounded-full transition-colors active:scale-95"
        >
          <X className="w-6 h-6" />
        </button>
      </div>
      <div className="flex-1 flex flex-col items-center justify-center p-6">
        <input
          type="text"
          placeholder="SEARCH..."
          className="w-full max-w-4xl text-4xl md:text-7xl font-serif text-black placeholder:text-gray-200 outline-none text-center bg-transparent appearance-none"
          autoFocus
          style={{ fontSize: "max(24px, 4vw)" }}
        />
        <div className="mt-12 flex flex-wrap justify-center gap-4 md:gap-8 text-xs md:text-sm font-medium text-gray-500">
          <button className="px-4 py-2 border border-gray-100 rounded-full hover:bg-black hover:text-white transition-colors">
            NEW ARRIVALS
          </button>
          <button className="px-4 py-2 border border-gray-100 rounded-full hover:bg-black hover:text-white transition-colors">
            ACCESSORIES
          </button>
        </div>
      </div>
    </div>
  );
};

const CollectionsPage = () => {
  const router = useRouter();
  const [searchOpen, setSearchOpen] = useState(false);
  const [categories, setCategories] = useState<any[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // API Hooks
  const {
    isError,
    isLoading,
    data: categoryListData,
    mutate: mutateCategoryList,
  } = useCategoryList();

  useEffect(() => {
    setIsLoaded(true);
    mutateCategoryList({
      filters: [{ fieldname: "isActive", filterType: "equal", value: true }],
      globalSearch: "",
      page: 1,
      limit: 100,
    });
  }, [mutateCategoryList]);

  // Data Processing
  useEffect(() => {
    const processData = () => {
      try {
        if (
          categoryListData?.data?.data &&
          Array.isArray(categoryListData.data.data)
        ) {
          return categoryListData.data.data
            .filter((cat: any) => cat?.name?.trim())
            .map((cat: any, index: number) => ({
              id: cat.id || index,
              name: cat.name,
              image: getImage(cat.name, index),
              count: Math.floor(Math.random() * 20) + 5,
              tag: index % 2 === 0 ? "New Season" : "Essential",
            }));
        }
        if (isError) throw new Error();
      } catch (e) {
        return getFallbackData();
      }
      return [];
    };

    const processed = processData();
    if (processed.length > 0) setCategories(processed);
  }, [categoryListData, isError]);

  // Helpers
  const getImage = (name: string, i: number) => {
    const images = [
      "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=800&q=80",
      "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=800&q=80",
      "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=800&q=80",
      "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800&q=80",
    ];
    const n = name.toLowerCase();
    if (n.includes("saree"))
      return "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=800&q=80";
    if (n.includes("dress"))
      return "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=800&q=80";
    if (n.includes("jewel"))
      return "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=800&q=80";
    return images[i % images.length];
  };

  const getFallbackData = () => [
    {
      id: 1,
      name: "Prêt-à-Porter",
      count: 12,
      tag: "Trending",
      image:
        "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=800&q=80",
    },
    {
      id: 2,
      name: "Sarees",
      count: 24,
      tag: "Heritage",
      image:
        "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=800&q=80",
    },
    {
      id: 3,
      name: "Fine Jewelry",
      count: 8,
      tag: "Exclusive",
      image:
        "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=800&q=80",
    },
    {
      id: 4,
      name: "Essentials",
      count: 16,
      tag: "Basics",
      image:
        "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800&q=80",
    },
  ];

  return (
    <div className="min-h-screen bg-white text-black font-sans selection:bg-black selection:text-white pb-10">
      <style jsx global>{`
        @import url("https://fonts.googleapis.com/css2?family=Bodoni+Moda:ital,opsz,wght@0,6..96,400;0,6..96,500;0,6..96,600;1,6..96,400&family=Inter:wght@300;400;500;600&display=swap");
        .font-serif {
          font-family: "Bodoni Moda", serif;
        }
        .font-sans {
          font-family: "Inter", sans-serif;
        }
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>

      <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />

      {/* --- Navbar (Unchanged) --- */}
      <nav className="fixed top-0 w-full z-40 bg-white/95 backdrop-blur-md border-b border-gray-100 transition-all duration-300">
        <div className="max-w-[1920px] mx-auto px-4 sm:px-6 h-16 sm:h-20 flex items-center justify-between">
          <button className="p-2 -ml-2 active:bg-gray-50 rounded-full">
            <Menu className="w-6 h-6" />
          </button>
          <h1
            onClick={() => router.push("/")}
            className="font-serif text-2xl sm:text-3xl tracking-[0.05em] font-medium cursor-pointer absolute left-1/2 -translate-x-1/2"
          >
            KRAMBICA
          </h1>
          <div className="flex items-center gap-2 sm:gap-4">
            <button
              onClick={() => setSearchOpen(true)}
              className="p-2 active:bg-gray-50 rounded-full"
            >
              <Search className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
            <button className="p-2 active:bg-gray-50 rounded-full relative">
              <ShoppingBag className="w-5 h-5 sm:w-6 sm:h-6" />
              <span className="absolute top-1.5 right-1.5 flex h-3 w-3 sm:h-4 sm:w-4 items-center justify-center rounded-full bg-black text-[8px] sm:text-[10px] text-white">
                2
              </span>
            </button>
          </div>
        </div>
      </nav>

      <main className="pt-16 sm:pt-0">
        {/* --- Hero Section (Unchanged) --- */}
        <div className="flex flex-col lg:grid lg:grid-cols-12 min-h-[auto] lg:min-h-[60vh] border-b border-gray-100">
          <div className="lg:order-2 lg:col-span-5 relative h-[50vh] lg:h-auto overflow-hidden bg-gray-100">
            <img
              src="https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=1200&q=80"
              className="w-full h-full object-cover transition-all duration-700"
              alt="Featured"
            />
          </div>
          <div className="lg:order-1 lg:col-span-7 p-6 sm:p-12 md:p-20 flex flex-col justify-center lg:justify-between border-r border-gray-100">
            <div
              className={`space-y-4 sm:space-y-6 transition-all duration-1000 ${
                isLoaded
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 border border-black rounded-full w-fit">
                <span className="w-2 h-2 rounded-full bg-black animate-pulse" />
                <span className="text-[10px] font-bold tracking-widest uppercase">
                  New Season
                </span>
              </div>
              <h2 className="font-serif text-5xl sm:text-7xl md:text-8xl lg:text-9xl leading-[0.9] -ml-1 text-black">
                Krambica <br />{" "}
                <span className="italic text-gray-400">Cotton Collection</span>
              </h2>
            </div>
            <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6 sm:gap-8 mt-8 sm:mt-12">
              <p className="text-sm sm:text-base max-w-md text-gray-500 font-light leading-relaxed">
                Precision-crafted cotton, rooted in heritage, refined for today.
              </p>
              <div className="flex items-center gap-4">
                <button className="w-10 h-10 sm:w-12 sm:h-12 border border-gray-200 rounded-full flex items-center justify-center hover:bg-black hover:border-black hover:text-white transition-all duration-300">
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* --- NEW & IMPROVED 2x2 CARD GRID --- */}
        <div className="p-4 sm:p-6 lg:p-8 pt-10 pb-16">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-8 sm:gap-x-6 sm:gap-y-12">
            {isLoading
              ? [1, 2, 3, 4].map((i) => (
                  <div key={i} className="flex flex-col gap-3">
                    <div className="aspect-[3/4] bg-gray-100 rounded-sm animate-pulse" />
                    <div className="h-4 bg-gray-100 w-2/3 rounded-sm" />
                  </div>
                ))
              : categories.map((category) => (
                  <div
                    key={category.id}
                    className="group cursor-pointer flex flex-col gap-3"
                    onClick={() => router.push("/shop")}
                  >
                    {/* Image Wrapper */}
                    <div className="relative aspect-[3/4] overflow-hidden bg-gray-50 rounded-sm">
                      <img
                        src={category.image}
                        alt={category.name}
                        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                        loading="lazy"
                      />

                      {/* Floating Glass Badge (Top Left) */}
                      <div className="absolute top-2 left-2 sm:top-3 sm:left-3 px-2 py-1 sm:px-3 sm:py-1.5 bg-white/20 backdrop-blur-md border border-white/20 rounded-full">
                        <span className="text-[8px] sm:text-[10px] font-bold uppercase tracking-wider text-white">
                          {category.tag}
                        </span>
                      </div>

                      {/* Floating Action Button (Bottom Right) */}
                      <button className="absolute bottom-2 right-2 sm:bottom-3 sm:right-3 w-8 h-8 sm:w-10 sm:h-10 bg-white rounded-full flex items-center justify-center shadow-lg transform translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 md:flex md:translate-y-0 md:opacity-100">
                        <ArrowUpRight className="w-4 h-4 sm:w-5 sm:h-5 text-black" />
                      </button>
                    </div>

                    {/* Clean Text Details */}
                    <div className="flex flex-col">
                      <div className="flex items-baseline justify-between">
                        <h3 className="font-serif text-lg sm:text-2xl text-black group-hover:underline decoration-1 underline-offset-4">
                          {category.name}
                        </h3>
                        <span className="text-[10px] text-gray-400 font-mono">
                          ({category.count})
                        </span>
                      </div>
                      <p className="text-xs text-gray-500 mt-1 group-hover:text-black transition-colors flex items-center gap-1">
                        Shop Collection{" "}
                        <ArrowRight className="w-3 h-3 -ml-2 opacity-0 group-hover:ml-0 group-hover:opacity-100 transition-all" />
                      </p>
                    </div>
                  </div>
                ))}
          </div>
        </div>

        {/* --- Footer (Unchanged) --- */}
      </main>
    </div>
  );
};

export default CollectionsPage;
