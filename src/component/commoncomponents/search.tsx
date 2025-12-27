"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { Dialog, Fade, Zoom, IconButton, Backdrop } from "@mui/material";
import {
  Search,
  X,
  Loader2,
  ShoppingBag,
  ArrowRight,
  Star,
} from "lucide-react";

// ==========================================
// 1. Types & Helper Logic
// ==========================================

interface ProductImage {
  id: number;
  url: string;
  isPrimary: boolean;
  type: "image" | "video";
}

interface ProductData {
  id: string;
  product_id: number;
  name: string;
  category: { name: string };
  basePrice: number;
  slug: string;
  isVisible: boolean;
  colors: Array<{
    isAvailable: boolean;
    images: ProductImage[];
    sizeVariants: Array<{ price: number; availableStock: number }>;
  }>;
  images: ProductImage[];
}

interface SearchResult {
  id: string;
  product_id: number;
  name: string;
  category: string;
  price: number;
  originalPrice?: number;
  image: string;
  inStock: boolean;
  slug: string;
}

interface SearchPopupProps {
  open: boolean;
  onClose: () => void;
}

const transformProductData = (products: ProductData[]): SearchResult[] => {
  return products.map((product) => {
    const firstColor =
      product.colors.find((c) => c.isAvailable) || product.colors[0];
    const primaryImage =
      firstColor?.images.find((img) => img.isPrimary && img.type === "image") ||
      firstColor?.images.find((img) => img.type === "image") ||
      product.images.find((img) => img.isPrimary && img.type === "image") ||
      product.images.find((img) => img.type === "image");

    const lowestPrice =
      firstColor?.sizeVariants.reduce(
        (min, variant) => (variant.price < min ? variant.price : min),
        firstColor.sizeVariants[0]?.price || product.basePrice
      ) || product.basePrice;

    const hasStock =
      firstColor?.sizeVariants.some((v) => v.availableStock > 0) || false;

    return {
      id: product.id,
      product_id: product.product_id,
      name: product.name,
      category: product.category.name,
      price: lowestPrice,
      originalPrice:
        lowestPrice < product.basePrice ? product.basePrice : undefined,
      image: primaryImage?.url || "/placeholder.jpg",
      inStock: hasStock && product.isVisible,
      slug: product.slug,
    };
  });
};

const useProductSearch = (open: boolean) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [totalResults, setTotalResults] = useState(0);
  const abortController = useRef<AbortController | null>(null);
  const debounceTimer = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!open) {
      setTimeout(() => {
        setQuery("");
        setResults([]);
        setLoading(false);
      }, 300);
    }
  }, [open]);

  useEffect(() => {
    if (debounceTimer.current) clearTimeout(debounceTimer.current);
    if (abortController.current) abortController.current.abort();

    if (!query.trim()) {
      setResults([]);
      setLoading(false);
      return;
    }

    if (query.length < 2) return;

    setLoading(true);
    setError(null);

    debounceTimer.current = setTimeout(async () => {
      abortController.current = new AbortController();
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL_DUMMY}/api/products/productlist`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              filters: [],
              globalSearch: query,
              page: 1,
              limit: 6,
            }), // Limit 6 for grid
            signal: abortController.current.signal,
          }
        );
        const data = await response.json();
        if (data.status === "success" && data.data.success) {
          setResults(transformProductData(data.data.data));
          setTotalResults(data.data.pagination.total);
        }
      } catch (err: any) {
        if (err.name !== "AbortError") setError("Search failed");
      } finally {
        setLoading(false);
      }
    }, 400);

    return () => {
      if (debounceTimer.current) clearTimeout(debounceTimer.current);
    };
  }, [query]);

  return { query, setQuery, results, loading, error, totalResults };
};

// ==========================================
// 2. UI Components (Grid Card)
// ==========================================

const GridCard = ({
  item,
  onClick,
}: {
  item: SearchResult;
  onClick: () => void;
}) => (
  <div
    onClick={onClick}
    className="group relative flex flex-col cursor-pointer bg-white rounded-xl overflow-hidden hover:shadow-xl hover:shadow-stone-200 transition-all duration-300 transform hover:-translate-y-1"
  >
    {/* Image Area */}
    <div className="relative aspect-[4/5] overflow-hidden bg-stone-100">
      <img
        src={item.image}
        alt={item.name}
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
      />

      {/* Overlay Actions (Desktop) */}
      <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center p-3">
        <button className="w-full py-2 bg-white text-stone-900 text-xs font-bold uppercase tracking-widest rounded shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
          View Details
        </button>
      </div>

      {!item.inStock && (
        <div className="absolute top-2 right-2 bg-stone-900 text-white text-[10px] font-bold px-2 py-1 rounded">
          SOLD OUT
        </div>
      )}
    </div>

    {/* Text Area */}
    <div className="p-3 flex flex-col gap-1">
      <span className="text-[10px] text-teal-600 font-bold uppercase tracking-wider">
        {item.category}
      </span>
      <h4 className="text-sm font-medium text-stone-900 line-clamp-1 group-hover:text-teal-800 transition-colors">
        {item.name}
      </h4>
      <div className="flex items-center gap-2 mt-1">
        <span className="text-sm font-bold text-stone-900">
          ₹{item.price.toLocaleString("en-IN")}
        </span>
        {item.originalPrice && item.originalPrice > item.price && (
          <span className="text-xs text-stone-400 line-through">
            ₹{item.originalPrice.toLocaleString("en-IN")}
          </span>
        )}
      </div>
    </div>
  </div>
);

// ==========================================
// 3. Main Component
// ==========================================

export default function SearchModal({ open, onClose }: SearchPopupProps) {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const { query, setQuery, results, loading, error, totalResults } =
    useProductSearch(open);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 100);
  }, [open]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query)}`);
      onClose();
    }
  };

  const handleProductClick = (id: string) => {
    router.push(`/productdetails/${id}`);
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      TransitionComponent={Zoom}
      transitionDuration={300}
      PaperProps={{
        className: "!rounded-[24px] !max-w-4xl bg-stone-50 overflow-hidden", // Larger max-width for grid
        elevation: 0,
      }}
      BackdropComponent={Backdrop}
      BackdropProps={{
        className: "bg-stone-900/60 backdrop-blur-sm",
      }}
    >
      <div className="flex flex-col h-[80vh] max-h-[700px]">
        {/* --- Floating Header --- */}
        <div className="p-4 sm:p-6 bg-white sticky top-0 z-20 shadow-sm border-b border-stone-100">
          <form onSubmit={handleSubmit} className="relative flex items-center">
            <Search
              className={`absolute left-4 w-5 h-5 ${
                loading ? "text-teal-600" : "text-stone-400"
              }`}
            />

            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search for 'Cotton Kurti'..."
              className="w-full pl-12 pr-12 py-4 bg-stone-50 rounded-xl text-lg font-medium text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-teal-100 transition-all"
            />

            {query && !loading && (
              <button
                type="button"
                onClick={() => setQuery("")}
                className="absolute right-4 p-1 hover:bg-stone-200 rounded-full text-stone-400 transition-colors"
              >
                <X size={16} />
              </button>
            )}

            {loading && (
              <div className="absolute right-4">
                <Loader2 className="w-5 h-5 text-teal-600 animate-spin" />
              </div>
            )}
          </form>

          {/* Quick Tags underneath input */}
        </div>

        {/* --- Grid Content --- */}
        <div className="flex-1 overflow-y-auto custom-scrollbar p-4 sm:p-6">
          {/* 1. Empty State */}
          {!query && (
            <div className="h-full flex flex-col items-center justify-center opacity-40">
              <Star className="w-16 h-16 text-stone-300 mb-4" strokeWidth={1} />
              <p className="text-stone-400 font-serif text-lg">
                Type to explore our collection
              </p>
            </div>
          )}

          {/* 2. Results Grid */}
          {results.length > 0 && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <p className="text-xs font-bold text-stone-400 uppercase tracking-widest">
                  Top Results for "{query}"
                </p>
                <span className="text-xs text-stone-400">
                  {totalResults} items
                </span>
              </div>

              {/* THE GRID */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {results.map((product) => (
                  <GridCard
                    key={product.id}
                    item={product}
                    onClick={() => handleProductClick(product.id)}
                  />
                ))}
              </div>

              {totalResults > results.length && (
                <button
                  onClick={handleSubmit}
                  className="w-full py-4 bg-white border border-stone-200 rounded-xl text-sm font-bold text-stone-600 hover:text-teal-700 hover:border-teal-200 shadow-sm transition-all flex items-center justify-center gap-2"
                >
                  View All Products
                  <ArrowRight size={16} />
                </button>
              )}
            </div>
          )}

          {/* 3. No Results */}
          {!loading && query && results.length === 0 && !error && (
            <div className="flex flex-col items-center justify-center py-12">
              <ShoppingBag
                className="w-12 h-12 text-stone-200 mb-4"
                strokeWidth={1}
              />
              <p className="text-stone-900 font-medium">No results found</p>
            </div>
          )}
        </div>

        {/* --- Footer --- */}
        <div className="p-4 bg-white border-t border-stone-100 flex justify-between items-center">
          <span className="text-[10px] text-stone-400 font-bold uppercase tracking-widest">
            Krambica Search
          </span>
          <button
            onClick={onClose}
            className="text-xs font-medium text-stone-500 hover:text-stone-900"
          >
            Close
          </button>
        </div>
      </div>
    </Dialog>
  );
}
