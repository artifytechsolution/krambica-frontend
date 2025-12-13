"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import {
  Dialog,
  Box,
  InputBase,
  IconButton,
  Typography,
  Avatar,
  Fade,
  Zoom,
} from "@mui/material";
import { Search, X, Loader2, AlertCircle } from "lucide-react";
import { useRouter } from "next/navigation";

interface SearchPopupProps {
  open: boolean;
  onClose: () => void;
}

// API Response Interfaces
interface CategoryData {
  id: string;
  category_id: number;
  name: string;
  slug: string;
  description: string | null;
  createdAt: string;
  updatedAt: string;
}

interface ProductImage {
  id: number;
  product_color_id: number;
  url: string;
  altText: string;
  type: "image" | "video";
  isPrimary: boolean;
  displayOrder: number;
  createdAt: string;
  updatedAt: string;
}

interface SizeVariant {
  id: string;
  product_size_var_id: number;
  product_color_id: number;
  size: string;
  sku: string;
  price: number;
  stock: number;
  reservedStock: number;
  availableStock: number;
  lowStockThreshold: number;
  isAvailable: boolean;
  isLowStock: boolean;
  createdAt: string;
  updatedAt: string;
}

interface ColorVariant {
  id: string;
  product_color_id: number;
  product_id: number;
  color_name: string;
  color_code: string;
  isAvailable: boolean;
  displayOrder: number;
  totalStock: number;
  createdAt: string;
  updatedAt: string;
  images: ProductImage[];
  sizeVariants: SizeVariant[];
}

interface ProductData {
  id: string;
  product_id: number;
  name: string;
  slug: string;
  description: string;
  sku: string;
  basePrice: number;
  isVisible: boolean;
  isFeatured: boolean;
  category_id: number;
  gender: string;
  material: string;
  fabric: string;
  careInstructions: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  reviews: any[];
  category: CategoryData;
  colors: ColorVariant[];
  images: ProductImage[];
}

interface PaginationData {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

interface ApiResponse {
  status: string;
  data: {
    success: boolean;
    data: ProductData[];
    pagination: PaginationData;
  };
}

// Display interface for search results
interface SearchResult {
  id: string;
  name: string;
  category: string;
  price: number;
  originalPrice?: number;
  image: string;
  inStock: boolean;
  slug: string;
  product_id: number;
}

export default function SearchPopup({ open, onClose }: SearchPopupProps) {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [totalResults, setTotalResults] = useState(0);

  const inputRef = useRef<HTMLInputElement>(null);
  const abortControllerRef = useRef<AbortController | null>(null);
  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Focus input when dialog opens
  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 100);
    } else {
      // Reset state when closing
      setSearchQuery("");
      setSearchResults([]);
      setError(null);
      setTotalResults(0);
    }
  }, [open]);

  // Debounced search effect
  useEffect(() => {
    // Clear previous timer
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    // Abort previous API call
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    if (searchQuery.length === 0) {
      setSearchResults([]);
      setIsSearching(false);
      setError(null);
      setTotalResults(0);
      return;
    }

    if (searchQuery.length < 2) {
      setIsSearching(false);
      return;
    }

    setIsSearching(true);
    setError(null);

    // Debounce for 400ms
    debounceTimerRef.current = setTimeout(() => {
      performSearch(searchQuery);
    }, 400);

    // Cleanup function
    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, [searchQuery]);

  // Transform API data to display format
  const transformProductData = (products: ProductData[]): SearchResult[] => {
    return products.map((product) => {
      // Get the first available color variant
      const firstColor =
        product.colors.find((c) => c.isAvailable) || product.colors[0];

      // Get primary image or first image
      const primaryImage =
        firstColor?.images.find(
          (img) => img.isPrimary && img.type === "image"
        ) ||
        firstColor?.images.find((img) => img.type === "image") ||
        product.images.find((img) => img.isPrimary && img.type === "image") ||
        product.images.find((img) => img.type === "image");

      // Get the lowest price from size variants
      const lowestPrice =
        firstColor?.sizeVariants.reduce(
          (min, variant) => (variant.price < min ? variant.price : min),
          firstColor.sizeVariants[0]?.price || product.basePrice
        ) || product.basePrice;

      // Check if any variant is in stock
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
        image: primaryImage?.url || "/placeholder-product.jpg",
        inStock: hasStock && product.isVisible,
        slug: product.slug,
      };
    });
  };

  // Perform API search
  const performSearch = async (query: string) => {
    try {
      // Create new abort controller
      abortControllerRef.current = new AbortController();

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL_DUMMY}/api/products/productlist`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            filters: [],
            globalSearch: query,
            page: 1,
            limit: 6,
          }),
          signal: abortControllerRef.current.signal,
        }
      );

      if (!response.ok) {
        throw new Error(`API error: ${response.status} ${response.statusText}`);
      }

      const data: ApiResponse = await response.json();

      if (data.status === "success" && data.data.success) {
        const transformedResults = transformProductData(data.data.data);
        setSearchResults(transformedResults);
        setTotalResults(data.data.pagination.total);
        setError(null);
      } else {
        throw new Error("Invalid API response format");
      }
    } catch (err: any) {
      // Ignore abort errors
      if (err.name === "AbortError") {
        return;
      }

      console.error("Search error:", err);
      setError(err.message || "Failed to fetch search results");
      setSearchResults([]);
      setTotalResults(0);
    } finally {
      setIsSearching(false);
    }
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
      onClose();
    }
  };

  const handleClearSearch = () => {
    setSearchQuery("");
    setSearchResults([]);
    setError(null);
    setTotalResults(0);
    inputRef.current?.focus();
  };

  // Handle product click - redirect to product details page
  const handleProductClick = (productId: string) => {
    router.push(`/productdetails/${productId}`);
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      TransitionComponent={Zoom}
      transitionDuration={400}
      PaperProps={{
        className: "rounded-3xl shadow-2xl m-4 overflow-hidden bg-white",
      }}
      BackdropProps={{
        className: "backdrop-blur-sm bg-black/40",
      }}
    >
      <Box className="relative">
        {/* Search Header */}
        <Box className="sticky top-0 z-10 bg-white border-b border-gray-100 px-6 py-5">
          <form onSubmit={handleSearchSubmit}>
            <Box className="flex items-center gap-4">
              <Search
                className="w-6 h-6 text-gray-400 flex-shrink-0"
                strokeWidth={2.5}
              />

              <InputBase
                inputRef={inputRef}
                placeholder="Search for products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 text-lg text-black placeholder:text-gray-400 font-medium"
                fullWidth
              />

              {isSearching && (
                <Loader2
                  className="w-5 h-5 text-black animate-spin"
                  strokeWidth={2.5}
                />
              )}

              {searchQuery && !isSearching && (
                <IconButton
                  size="small"
                  onClick={handleClearSearch}
                  className="text-gray-400 hover:text-black hover:bg-gray-100"
                >
                  <X className="w-5 h-5" strokeWidth={2.5} />
                </IconButton>
              )}

              <IconButton
                onClick={onClose}
                className="text-gray-500 hover:text-black hover:bg-gray-100"
                size="small"
              >
                <X className="w-6 h-6" strokeWidth={2.5} />
              </IconButton>
            </Box>
          </form>
        </Box>

        {/* Product List */}
        <Box className="max-h-[70vh] overflow-y-auto px-6 py-4">
          {/* Empty State */}
          {searchQuery.length === 0 && (
            <Fade in timeout={500}>
              <Box className="flex flex-col items-center justify-center py-20 text-center">
                <Box className="w-20 h-20 mb-6 bg-gray-100 rounded-full flex items-center justify-center">
                  <Search className="w-10 h-10 text-gray-300" strokeWidth={2} />
                </Box>
                <Typography
                  variant="h6"
                  className="font-semibold text-gray-400 mb-2"
                >
                  Start typing to search
                </Typography>
                <Typography className="text-sm text-gray-400">
                  Search for products, brands, and more
                </Typography>
              </Box>
            </Fade>
          )}

          {/* Error State */}
          {error && !isSearching && (
            <Fade in timeout={500}>
              <Box className="flex flex-col items-center justify-center py-20 text-center">
                <Box className="w-20 h-20 mb-6 bg-red-50 rounded-full flex items-center justify-center">
                  <AlertCircle
                    className="w-10 h-10 text-red-400"
                    strokeWidth={2}
                  />
                </Box>
                <Typography
                  variant="h6"
                  className="font-semibold text-gray-800 mb-2"
                >
                  Something went wrong
                </Typography>
                <Typography className="text-sm text-gray-500 mb-4">
                  {error}
                </Typography>
                <button
                  onClick={() => performSearch(searchQuery)}
                  className="px-6 py-2 bg-black text-white rounded-full hover:bg-gray-800 transition-colors font-medium"
                >
                  Try Again
                </button>
              </Box>
            </Fade>
          )}

          {/* Loading State */}
          {isSearching && searchQuery.length >= 2 && (
            <Box className="space-y-2 pb-4">
              {[1, 2, 3, 4].map((item) => (
                <Box
                  key={item}
                  className="flex items-center gap-4 p-4 rounded-2xl bg-gray-50 animate-pulse"
                >
                  <Box className="w-20 h-20 bg-gray-200 rounded-xl flex-shrink-0" />
                  <Box className="flex-1 space-y-3">
                    <Box className="h-4 bg-gray-200 rounded w-3/4" />
                    <Box className="h-3 bg-gray-200 rounded w-1/2" />
                    <Box className="h-4 bg-gray-200 rounded w-1/4" />
                  </Box>
                </Box>
              ))}
            </Box>
          )}

          {/* Results State */}
          {searchResults.length > 0 && !isSearching && !error && (
            <Box className="space-y-2 pb-4">
              {searchResults.map((product, index) => (
                <Fade
                  key={product.id}
                  in
                  timeout={300}
                  style={{ transitionDelay: `${index * 50}ms` }}
                >
                  <Box
                    onClick={() => handleProductClick(product.id)}
                    className="block"
                  >
                    <Box className="group flex items-center gap-4 p-4 rounded-2xl hover:bg-gray-50 transition-all duration-300 cursor-pointer border border-transparent hover:border-gray-200 hover:shadow-md">
                      <Box className="relative flex-shrink-0">
                        <Avatar
                          src={product.image}
                          alt={product.name}
                          variant="rounded"
                          className="w-20 h-20 shadow-sm group-hover:shadow-lg transition-all duration-300 rounded-xl"
                          sx={{ width: 80, height: 80 }}
                        />
                        {!product.inStock && (
                          <Box className="absolute inset-0 bg-black/60 rounded-xl flex items-center justify-center">
                            <Typography className="text-xs text-white font-bold px-2 py-1 bg-black rounded">
                              Out of Stock
                            </Typography>
                          </Box>
                        )}
                      </Box>

                      <Box className="flex-1 min-w-0">
                        <Typography className="font-semibold text-black group-hover:text-gray-600 transition-colors mb-1 line-clamp-2">
                          {product.name}
                        </Typography>
                        <Typography className="text-sm text-gray-500 mb-2">
                          {product.category}
                        </Typography>
                        <Box className="flex items-center gap-3 flex-wrap">
                          <Typography className="text-lg font-bold text-black">
                            ₹
                            {product.price.toLocaleString("en-IN", {
                              maximumFractionDigits: 2,
                            })}
                          </Typography>
                          {product.originalPrice &&
                            product.originalPrice > product.price && (
                              <>
                                <Typography className="text-sm text-gray-400 line-through">
                                  ₹
                                  {product.originalPrice.toLocaleString(
                                    "en-IN",
                                    { maximumFractionDigits: 2 }
                                  )}
                                </Typography>
                                <Typography className="text-xs font-bold text-white bg-black px-2 py-1 rounded">
                                  {Math.round(
                                    ((product.originalPrice - product.price) /
                                      product.originalPrice) *
                                      100
                                  )}
                                  % OFF
                                </Typography>
                              </>
                            )}
                        </Box>
                      </Box>

                      <Box className="flex-shrink-0 opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:translate-x-1">
                        <Box className="w-8 h-8 bg-black rounded-full flex items-center justify-center">
                          <svg
                            className="w-4 h-4 text-white"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={3}
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M9 5l7 7-7 7"
                            />
                          </svg>
                        </Box>
                      </Box>
                    </Box>
                  </Box>
                </Fade>
              ))}

              {/* View All Results Button */}
              {totalResults > searchResults.length && (
                <Fade
                  in
                  timeout={500}
                  style={{ transitionDelay: `${searchResults.length * 50}ms` }}
                >
                  <Box
                    onClick={() => {
                      router.push(
                        `/search?q=${encodeURIComponent(searchQuery)}`
                      );
                      onClose();
                    }}
                    className="block"
                  >
                    <Box className="mt-4 p-4 rounded-2xl bg-black hover:bg-gray-800 transition-all duration-300 text-center cursor-pointer shadow-lg hover:shadow-xl transform hover:scale-[1.02]">
                      <Typography className="text-white font-bold">
                        View All {totalResults} Results
                      </Typography>
                    </Box>
                  </Box>
                </Fade>
              )}
            </Box>
          )}

          {/* No Results State */}
          {!isSearching &&
            searchQuery.length >= 2 &&
            searchResults.length === 0 &&
            !error && (
              <Fade in timeout={500}>
                <Box className="flex flex-col items-center justify-center py-20 text-center">
                  <Box className="w-20 h-20 mb-6 bg-gray-100 rounded-full flex items-center justify-center">
                    <Search
                      className="w-10 h-10 text-gray-300"
                      strokeWidth={2}
                    />
                  </Box>
                  <Typography
                    variant="h6"
                    className="font-semibold text-black mb-2"
                  >
                    No products found
                  </Typography>
                  <Typography className="text-sm text-gray-500">
                    Try searching with different keywords
                  </Typography>
                </Box>
              </Fade>
            )}
        </Box>
      </Box>
    </Dialog>
  );
}
