"use client";
import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  Heart,
  X,
  ChevronLeft,
  ChevronRight,
  PackageOpen,
  AlertCircle,
  SlidersHorizontal,
  Star,
  Eye,
  ArrowDown,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import { useInView } from "react-intersection-observer";
import { useProductList, useAddWishList } from "@src/hooks/apiHooks"; // Removed useCategoryList as it's static now
import toast from "react-hot-toast";
import { useParams, useRouter } from "next/navigation";
import { useAppSelector } from "@src/redux/store";
import { selectUser } from "@src/redux/reducers/authSlice";

// --- Configuration & Helpers ---

interface VideoPlayerProps {
  src: string;
  poster: string;
  inView: boolean;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ src, poster, inView }) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [videoError, setVideoError] = useState(false);
  const playPromiseRef = useRef<Promise<void> | null>(null);

  useEffect(() => {
    if (!videoRef.current) return;
    const video = videoRef.current;

    const handlePlayback = async () => {
      try {
        if (inView && !videoError) {
          if (playPromiseRef.current)
            await playPromiseRef.current.catch(() => {});
          playPromiseRef.current = video.play();
          await playPromiseRef.current;
          playPromiseRef.current = null;
        } else {
          if (playPromiseRef.current)
            await playPromiseRef.current.catch(() => {});
          if (!video.paused) video.pause();
          playPromiseRef.current = null;
        }
      } catch (err) {
        setVideoError(true);
      }
    };

    handlePlayback();
    return () => {
      if (playPromiseRef.current) playPromiseRef.current.catch(() => {});
      if (video && !video.paused) video.pause();
    };
  }, [inView, videoError]);

  if (videoError) {
    return (
      <img
        src={poster}
        alt="Video thumbnail"
        className="w-full h-full object-cover"
        onError={(e) => {
          (e.target as HTMLImageElement).src =
            "https://via.placeholder.com/400x600?text=Image+Not+Available";
        }}
      />
    );
  }

  return (
    <video
      ref={videoRef}
      src={src}
      poster={poster}
      loop
      muted
      playsInline
      className="w-full h-full object-cover"
      onError={() => setVideoError(true)}
    />
  );
};

// --- Components ---

const ProductCardSkeleton: React.FC = () => (
  <div className="bg-white rounded-none border-b border-r border-gray-100 p-4">
    <div className="relative aspect-[3/4] bg-gray-100 animate-pulse mb-4" />
    <div className="space-y-3">
      <div className="h-4 bg-gray-100 rounded w-3/4 animate-pulse" />
      <div className="h-3 bg-gray-100 rounded w-1/4 animate-pulse" />
      <div className="h-4 bg-gray-100 rounded w-1/2 animate-pulse" />
    </div>
  </div>
);

export default function CategoryOnePage() {
  // --- Logic & State ---
  const productsPerPage = 9;

  const [priceRange, setPriceRange] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [showMobileFilter, setShowMobileFilter] = useState(false);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [displayedProducts, setDisplayedProducts] = useState<any[]>([]);
  const [totalProducts, setTotalProducts] = useState(0);
  const [wishlistLoading, setWishlistLoading] = useState<
    Record<string, boolean>
  >({});
  const [globalError, setGlobalError] = useState<string | null>(null);

  const router = useRouter();
  const user = useAppSelector(selectUser);
  const { slug } = useParams();
  const STATIC_CATEGORY_ID = slug; // Defined Requirement

  const {
    isError: isProductError,
    isLoading: isProductLoading,
    data: productListData,
    mutate: mutateProductList,
  } = useProductList();

  const {
    isError: isAddWishListError,
    isLoading: isAddWishListLoading,
    data: addWishListData,
    error: addWishListError,
    mutate: mutateAddWishList,
  } = useAddWishList();

  // --- Effects ---
  useEffect(() => {
    if (addWishListData && !isAddWishListLoading)
      toast.success("Added to wishlist");
    if (isAddWishListError && addWishListError) {
      toast.error(addWishListError?.message || "Failed to add to wishlist");
    }
  }, [
    addWishListData,
    isAddWishListLoading,
    isAddWishListError,
    addWishListError,
  ]);

  // --- API Filter Construction ---
  const buildAPIFilters = useCallback(() => {
    const filters: any[] = [
      { fieldname: "isVisible", filterType: "equal", value: true },
      // STATIC FILTER as requested
      {
        fieldname: "category_id",
        filterType: "equal",
        value: STATIC_CATEGORY_ID,
      },
    ];

    if (priceRange && priceRange !== "all") {
      const [min, max] = priceRange.split("-").map(Number);
      if (!isNaN(min))
        filters.push({ fieldname: "basePrice", filterType: "gte", value: min });
      if (max && !isNaN(max))
        filters.push({ fieldname: "basePrice", filterType: "lte", value: max });
    }

    filters.push({ fieldname: "isFeatured", sort: 1 });
    filters.push({ fieldname: "createdAt", sort: 1 });
    return filters;
  }, [priceRange]);

  useEffect(() => {
    const payload = {
      filters: buildAPIFilters(),
      globalSearch: "",
      page: currentPage,
      limit: productsPerPage,
    };
    mutateProductList(payload);
  }, [priceRange, currentPage, mutateProductList, buildAPIFilters]);

  useEffect(() => {
    if (productListData?.data?.data) {
      setDisplayedProducts(productListData.data.data);
      setTotalProducts(productListData.data.pagination?.total || 0);
      setGlobalError(null);
    } else if (isProductError) {
      setGlobalError("Failed to load products");
    }
  }, [productListData, isProductError]);

  // --- Helper Functions ---
  const getPrimaryImage = (product: any): string => {
    if (product?.colors?.[0]?.images) {
      return (
        product.colors[0].images.find((i: any) => i?.isPrimary)?.url ||
        product.colors[0].images[0]?.url ||
        ""
      );
    }
    return "";
  };

  const getPrimaryVideo = (product: any): string | null => {
    if (product?.colors?.[0]?.images) {
      return (
        product.colors[0].images.find(
          (img: any) =>
            img?.url && (img.url.endsWith(".mp4") || img.url.includes("video"))
        )?.url || null
      );
    }
    return null;
  };

  const getPriceInfo = (product: any) => {
    const basePrice = Number(product?.basePrice) || 0;
    const salePrice = Number(
      product?.colors?.[0]?.sizeVariants?.[0]?.price || basePrice
    );
    const discount =
      basePrice > salePrice && basePrice > 0
        ? Math.round(((basePrice - salePrice) / basePrice) * 100)
        : 0;
    return {
      originalPrice: basePrice,
      salePrice: salePrice > 0 ? salePrice : basePrice,
      discount,
    };
  };

  const clearFilters = () => {
    setPriceRange("all");
    setCurrentPage(1);
    setGlobalError(null);
  };

  const handleAddToWishlist = async (productId: string) => {
    if (!productId) return;
    setWishlistLoading((prev) => ({ ...prev, [productId]: true }));
    try {
      if (wishlist.includes(productId)) {
        toast.error("Already in wishlist");
        return;
      }
      if (!user?.id) {
        window.location.href = "/login";
        return;
      }
      mutateAddWishList({ product_id: productId, user_id: user.id });
      setWishlist((prev) => [...prev, productId]);
    } catch (error) {
      console.error(error);
    } finally {
      setWishlistLoading((prev) => ({ ...prev, [productId]: false }));
    }
  };

  const totalPages = Math.ceil(totalProducts / productsPerPage);

  // --- Sub-Components ---

  const RatingStars = ({
    rating = 4.5,
    count = 10,
  }: {
    rating?: number;
    count?: number;
  }) => (
    <div className="flex items-center gap-1.5 mb-1.5">
      <div className="flex">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-3 h-3 ${
              star <= rating
                ? "fill-yellow-400 text-yellow-400"
                : "fill-gray-100 text-gray-200"
            }`}
          />
        ))}
      </div>
      <span className="text-[10px] text-gray-400 font-medium">({count})</span>
    </div>
  );

  const ProductCard: React.FC<{ product: any; index: number }> = ({
    product,
    index,
  }) => {
    const { ref, inView } = useInView({ threshold: 0.5 });
    const image = getPrimaryImage(product);
    const video = getPrimaryVideo(product);
    const { originalPrice, salePrice, discount } = getPriceInfo(product);
    const isWishlisted = wishlist.includes(product.id);
    const isLoading = wishlistLoading[product.id] || false;

    // Fake rating generator
    const fakeRating = 4 + (index % 10) / 10;
    const fakeCount = 20 + index * 5;

    return (
      <div
        ref={ref}
        className="group relative flex flex-col mb-10 cursor-pointer bg-white"
        onClick={() => router.push(`/productdetails/${product.id}`)}
      >
        {/* Image Container */}
        <div className="relative aspect-[3/4] overflow-hidden bg-gray-100 mb-4">
          {video ? (
            <VideoPlayer src={video} poster={image} inView={inView} />
          ) : (
            <img
              src={image || "https://via.placeholder.com/400x600?text=No+Image"}
              alt={product?.name}
              className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />
          )}

          {/* Tags */}
          <div className="absolute top-2 left-2 flex flex-col gap-1 z-10">
            {discount > 0 && (
              <span className="px-2 py-1 text-[10px] font-bold tracking-wider text-white bg-red-600 uppercase">
                -{discount}%
              </span>
            )}
            {product.isFeatured && (
              <span className="px-2 py-1 text-[10px] font-bold tracking-wider text-gray-900 bg-white uppercase shadow-sm">
                Bestseller
              </span>
            )}
          </div>

          {/* Actions */}
          <div className="absolute top-2 right-2 flex flex-col gap-2 translate-x-10 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300 z-10">
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleAddToWishlist(product.id);
              }}
              disabled={isLoading}
              className="w-9 h-9 flex items-center justify-center bg-white rounded-full shadow-md hover:bg-black hover:text-white transition-colors"
            >
              {isLoading ? (
                <div className="w-3 h-3 border-2 border-current border-t-transparent rounded-full animate-spin" />
              ) : (
                <Heart
                  className={`w-4 h-4 ${
                    isWishlisted ? "fill-red-500 text-red-500" : "currentColor"
                  }`}
                />
              )}
            </button>
            <button className="w-9 h-9 flex items-center justify-center bg-white rounded-full shadow-md hover:bg-black hover:text-white transition-colors">
              <Eye className="w-4 h-4" />
            </button>
          </div>

          {/* Quick Add Bar */}
          <div className="absolute bottom-0 left-0 right-0 bg-white/95 backdrop-blur-sm border-t border-gray-100 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300 z-10 flex items-center justify-between">
            <div className="text-xs font-medium text-gray-600">Select Size</div>
            <button className="text-xs font-bold text-black border-b border-black pb-0.5 hover:text-teal-700 hover:border-teal-700 transition-colors">
              QUICK ADD
            </button>
          </div>
        </div>

        {/* Details */}
        <div className="flex flex-col flex-1 px-1">
          <RatingStars rating={fakeRating} count={fakeCount} />

          <div className="text-[10px] uppercase tracking-wider text-gray-400 font-bold mb-1">
            {product?.category?.name || "Collection"}
          </div>

          <h3 className="text-sm font-medium text-gray-900 leading-snug group-hover:text-teal-700 transition-colors line-clamp-1 mb-1">
            {product?.name}
          </h3>

          <div className="flex items-center gap-2 mb-3">
            <span className="text-sm font-bold text-gray-900">
              ₹{salePrice.toLocaleString("en-IN")}
            </span>
            {discount > 0 && (
              <span className="text-xs text-gray-400 line-through">
                ₹{originalPrice.toLocaleString("en-IN")}
              </span>
            )}
          </div>
        </div>
      </div>
    );
  };

  const FilterSection = ({ isMobile = false }) => (
    <div
      className={isMobile ? "p-6 space-y-8" : "sticky top-32 space-y-8 pr-6"}
    >
      {/* Category selection removed since we are in a static category page */}
      <div className="space-y-4">
        <h3 className="text-sm font-bold text-gray-900 font-serif">Price</h3>
        <div className="space-y-2">
          {["all", "0-5000", "5000-10000", "10000-20000", "20000-50000"].map(
            (range) => (
              <label
                key={range}
                className="group flex items-center cursor-pointer py-1"
              >
                <input
                  type="radio"
                  name="priceRange"
                  value={range}
                  checked={priceRange === range}
                  onChange={(e) => {
                    setPriceRange(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="w-4 h-4 text-gray-900 border-gray-300 focus:ring-black accent-black"
                />
                <span
                  className={`ml-3 text-sm ${
                    priceRange === range
                      ? "text-gray-900 font-semibold"
                      : "text-gray-500 group-hover:text-gray-900"
                  }`}
                >
                  {range === "all"
                    ? "All Prices"
                    : `₹${range.replace("-", " - ₹")}`}
                </span>
              </label>
            )
          )}
        </div>
      </div>

      {priceRange !== "all" && (
        <button
          onClick={clearFilters}
          className="w-full py-3 bg-gray-100 text-gray-900 text-xs font-bold uppercase tracking-wide rounded hover:bg-gray-200 transition-colors"
        >
          Clear Filters
        </button>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-white font-sans text-gray-900">
      {/* --- NEW CATEGORY SPECIFIC HERO SECTION --- */}
      <div className="relative w-full h-[60vh] md:h-[70vh] bg-gray-50 overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 bg-gray-600">
          <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-transparent" />
        </div>

        {/* Hero Content */}
        <div className="relative h-full max-w-[1600px] mx-auto px-6 md:px-12 flex flex-col justify-center">
          <div className="max-w-xl text-white space-y-6 animate-fade-in-up">
            <div className="flex items-center gap-3">
              <span className="w-12 h-px bg-white/60"></span>
              <span className="text-xs font-bold tracking-[0.2em] uppercase text-white/90">
                Premium Selection
              </span>
            </div>

            <h1 className="text-5xl md:text-7xl font-serif leading-none">
              The Signature <br />
              <span className="italic font-light opacity-90">Edit.</span>
            </h1>

            <p className="text-sm md:text-base text-white/80 font-light leading-relaxed max-w-md">
              Discover our exclusive range of handcrafted pieces, designed to
              bring elegance and comfort to your everyday wardrobe.
            </p>

            <div className="pt-4">
              <button
                onClick={() => {
                  const el = document.getElementById("product-grid");
                  el?.scrollIntoView({ behavior: "smooth" });
                }}
                className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest border-b border-white pb-1 hover:text-gray-200 hover:border-gray-200 transition-all"
              >
                Explore Collection <ArrowDown className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* --- PRODUCT GRID SECTION --- */}
      <div
        id="product-grid"
        className="max-w-[1600px] mx-auto px-4 md:px-8 py-16"
      >
        {/* Error Banner */}
        {globalError && (
          <div className="mb-10 p-4 bg-red-50 border border-red-100 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <AlertCircle className="w-5 h-5 text-red-600" />
              <p className="text-sm text-red-800 font-medium">{globalError}</p>
            </div>
            <button onClick={() => setGlobalError(null)}>
              <X className="w-5 h-5 text-red-400 hover:text-red-600" />
            </button>
          </div>
        )}

        <div className="flex flex-col lg:flex-row gap-16">
          {/* Sidebar */}
          <aside className="hidden lg:block w-56 flex-shrink-0 pt-2">
            <FilterSection />
          </aside>

          {/* Grid Content */}
          <main className="flex-1">
            <div className="flex items-center justify-between mb-8 border-b border-gray-100 pb-4">
              <p className="text-sm text-gray-500">
                <span className="font-serif text-gray-900 text-lg italic mr-2">
                  {totalProducts} Items
                </span>{" "}
                Found
              </p>

              <button
                onClick={() => setShowMobileFilter(true)}
                className="lg:hidden flex items-center gap-2 px-4 py-2 bg-black text-white text-xs font-bold uppercase tracking-wide"
              >
                <SlidersHorizontal className="w-4 h-4" />
                Refine
              </button>
            </div>

            {isProductLoading ? (
              <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-px gap-y-px bg-gray-100 border border-gray-100">
                {Array.from({ length: 9 }).map((_, i) => (
                  <ProductCardSkeleton key={i} />
                ))}
              </div>
            ) : displayedProducts.length === 0 ? (
              <div className="py-32 text-center border border-dashed border-gray-200">
                <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
                  <PackageOpen className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-serif text-gray-900 mb-2">
                  No products found
                </h3>
                <button
                  onClick={clearFilters}
                  className="text-black text-sm font-bold underline underline-offset-4"
                >
                  Reset Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 gap-x-6 gap-y-12">
                {displayedProducts.map((product, idx) => (
                  <ProductCard
                    key={product.id || idx}
                    product={product}
                    index={idx}
                  />
                ))}
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && !isProductLoading && (
              <div className="mt-24 flex justify-center border-t border-gray-100 pt-8">
                <div className="flex gap-4 items-center">
                  <button
                    onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                    className="p-2 hover:bg-gray-100 rounded-full disabled:opacity-30 transition-all"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <span className="font-serif italic text-lg text-gray-900">
                    {currentPage} / {totalPages}
                  </span>
                  <button
                    onClick={() =>
                      setCurrentPage((p) => Math.min(totalPages, p + 1))
                    }
                    disabled={currentPage === totalPages}
                    className="p-2 hover:bg-gray-100 rounded-full disabled:opacity-30 transition-all"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            )}
          </main>
        </div>
      </div>

      {/* Mobile Drawer */}
      {showMobileFilter && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
            onClick={() => setShowMobileFilter(false)}
          />
          <div className="absolute bottom-0 left-0 right-0 bg-white h-[85vh] flex flex-col shadow-2xl animate-slide-up">
            <div className="p-6 border-b border-gray-100 flex items-center justify-between">
              <h2 className="text-xl font-serif text-gray-900">
                Refine Results
              </h2>
              <button onClick={() => setShowMobileFilter(false)}>
                <X className="w-6 h-6 text-gray-500" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto">
              <FilterSection isMobile />
            </div>
            <div className="p-4 border-t border-gray-100">
              <button
                onClick={() => setShowMobileFilter(false)}
                className="w-full py-4 bg-black text-white text-xs font-bold tracking-widest uppercase"
              >
                View {totalProducts} Products
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
