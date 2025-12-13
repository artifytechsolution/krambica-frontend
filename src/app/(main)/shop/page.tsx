"use client";
import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  Heart,
  Filter,
  X,
  ChevronLeft,
  ChevronRight,
  PackageOpen,
  AlertCircle,
} from "lucide-react";
import { useInView } from "react-intersection-observer";
import {
  useProductList,
  useCategoryList,
  useAddWishList,
} from "@src/hooks/apiHooks";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import axios, { AxiosError } from "axios";
import { useAppSelector } from "@src/redux/store";
import { selectUser } from "@src/redux/reducers/authSlice";

const categoryImages: Record<string, string> = {
  all: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=200&h=200&fit=crop",
  dresses:
    "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=200&h=200&fit=crop",
  tops: "https://images.unsplash.com/photo-1618932260643-eee4a2f652a6?w=200&h=200&fit=crop",
  bottoms:
    "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=200&h=200&fit=crop",
  accessories:
    "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=200&h=200&fit=crop",
};

// Backend error response interface
interface BackendErrorResponse {
  status: "error";
  data: null;
  message: string;
  errorDetails?: string;
  stack?: string;
}

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
          // Wait for any pending pause operation
          if (playPromiseRef.current) {
            await playPromiseRef.current.catch(() => {});
          }

          // Store the play promise
          playPromiseRef.current = video.play();
          await playPromiseRef.current;
          playPromiseRef.current = null;
        } else {
          // Wait for any pending play operation before pausing
          if (playPromiseRef.current) {
            await playPromiseRef.current.catch(() => {});
          }

          if (!video.paused) {
            video.pause();
          }
          playPromiseRef.current = null;
        }
      } catch (err) {
        console.error("Video playback error:", err);
        setVideoError(true);
      }
    };

    handlePlayback();

    // Cleanup function
    return () => {
      if (playPromiseRef.current) {
        playPromiseRef.current.catch(() => {});
      }
      if (video && !video.paused) {
        video.pause();
      }
    };
  }, [inView, videoError]);

  const handleVideoError = () => {
    setVideoError(true);
    console.error("Video failed to load");
  };

  if (videoError) {
    return (
      <div className="relative w-full h-full bg-gray-200 flex items-center justify-center">
        <img
          src={poster}
          alt="Video thumbnail"
          className="w-full h-full object-cover"
          onError={(e) => {
            (e.target as HTMLImageElement).src =
              "https://via.placeholder.com/400x600?text=Image+Not+Available";
          }}
        />
      </div>
    );
  }

  return (
    <div className="relative w-full h-full">
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        loop
        muted
        playsInline
        className="w-full h-full object-cover"
        onError={handleVideoError}
      />
    </div>
  );
};

// Skeleton Product Card Component
const ProductCardSkeleton: React.FC = () => (
  <div className="bg-white overflow-hidden shadow-sm rounded-lg">
    <div className="relative overflow-hidden aspect-[3/4] bg-gray-100">
      <div className="w-full h-full bg-gray-200 animate-pulse"></div>
    </div>
    <div className="p-4">
      <div className="h-6 bg-gray-200 rounded mb-2 animate-pulse w-3/4"></div>
      <div className="h-5 bg-gray-200 rounded mb-3 animate-pulse w-1/2"></div>
      <div className="flex items-center gap-2 mb-3">
        <div className="h-8 bg-gray-200 rounded animate-pulse w-24"></div>
        <div className="h-6 bg-gray-200 rounded animate-pulse w-20"></div>
      </div>
      <div className="h-10 bg-gray-200 rounded-lg animate-pulse"></div>
    </div>
  </div>
);

export default function ProductSection() {
  const productsPerPage = 9;
  const [category, setCategory] = useState("all");
  const [priceRange, setPriceRange] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [showMobileFilter, setShowMobileFilter] = useState(false);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [allCategories, setAllCategories] = useState<string[]>(["all"]);
  const [displayedProducts, setDisplayedProducts] = useState<any[]>([]);
  const [totalProducts, setTotalProducts] = useState(0);
  const [wishlistLoading, setWishlistLoading] = useState<
    Record<string, boolean>
  >({});
  const [globalError, setGlobalError] = useState<string | null>(null);
  const router = useRouter();
  const user = useAppSelector(selectUser);
  console.log("user:", user);

  const {
    isError: isProductError,
    isLoading: isProductLoading,
    data: productListData,
    error: productError,
    mutate: mutateProductList,
  } = useProductList();

  const {
    isError: isCategoryError,
    isLoading: isCategoryLoading,
    data: categoryListData,
    error: categoryError,
    mutate: mutateCategoryList,
  } = useCategoryList();
  const {
    isError: isAddWishListError,
    isLoading: isAddWishListLoading,
    data: addWishListData,
    error: addWishListError,
    mutate: mutateAddWishList,
  } = useAddWishList();

  useEffect(() => {
    if (addWishListData && !isAddWishListLoading) {
      toast.success("added to wishlist");
    }
    if (isAddWishListError && addWishListError) {
      console.error("Login Error:", addWishListError);
      toast.error(
        addWishListError?.message ||
          "Failed to add to wishlist. Please try again."
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    addWishListData,
    isAddWishListLoading,
    isAddWishListError,
    addWishListError,
    router,
  ]);

  useEffect(() => {
    try {
      mutateCategoryList({
        filters: [{ fieldname: "isActive", filterType: "equal", value: true }],
        globalSearch: "",
        page: 1,
        limit: 100,
      });
    } catch (error) {
      console.error("Category mutation error:", error);
      toast.error("Failed to load categories");
    }
  }, [mutateCategoryList]);

  useEffect(() => {
    try {
      if (categoryListData?.data?.data) {
        const categories = categoryListData.data.data;
        if (Array.isArray(categories)) {
          const categoryNames = categories
            .map((cat: any) => cat?.name)
            .filter(
              (name): name is string =>
                typeof name === "string" && name.length > 0
            );

          if (categoryNames.length > 0) {
            setAllCategories(["all", ...categoryNames]);
          }
        }
      }

      if (isCategoryError) {
        console.error("Category fetch error:", categoryError);
        toast.error("Unable to load categories. Using defaults.");
      }
    } catch (error) {
      console.error("Category processing error:", error);
      setAllCategories(["all"]);
    }
  }, [categoryListData, isCategoryError, categoryError]);

  const buildAPIFilters = useCallback(() => {
    try {
      const filters: any[] = [
        { fieldname: "isVisible", filterType: "equal", value: true },
      ];

      if (category && category !== "all") {
        filters.push({
          fieldname: "category.name",
          filterType: "equal",
          value: category,
        });
      }

      if (priceRange && priceRange !== "all") {
        const [min, max] = priceRange.split("-").map(Number);
        if (!isNaN(min)) {
          filters.push({
            fieldname: "basePrice",
            filterType: "gte",
            value: min,
          });
        }
        if (max && !isNaN(max)) {
          filters.push({
            fieldname: "basePrice",
            filterType: "lte",
            value: max,
          });
        }
      }

      filters.push({ fieldname: "isFeatured", sort: 1 });
      filters.push({ fieldname: "createdAt", sort: 1 });

      return filters;
    } catch (error) {
      console.error("Filter building error:", error);
      return [{ fieldname: "isVisible", filterType: "equal", value: true }];
    }
  }, [category, priceRange]);

  useEffect(() => {
    try {
      const payload = {
        filters: buildAPIFilters(),
        globalSearch: "",
        page: currentPage,
        limit: productsPerPage,
      };
      mutateProductList(payload);
    } catch (error) {
      console.error("Product mutation error:", error);
      toast.error("Failed to load products");
      setGlobalError("Unable to load products. Please try again.");
    }
  }, [category, priceRange, currentPage, mutateProductList, buildAPIFilters]);

  useEffect(() => {
    try {
      if (productListData?.data?.data) {
        const products = productListData.data.data;
        const pagination = productListData.data.pagination || {};

        if (Array.isArray(products)) {
          setDisplayedProducts(products);
          setTotalProducts(pagination.total || 0);
          setGlobalError(null);
        } else {
          setDisplayedProducts([]);
          setTotalProducts(0);
        }
      }

      if (isProductError) {
        console.error("Product fetch error:", productError);
        setGlobalError("Failed to load products. Please try again.");
        toast.error("Unable to load products");
      }
    } catch (error) {
      console.error("Product processing error:", error);
      setDisplayedProducts([]);
      setGlobalError("An error occurred while processing products");
    }
  }, [productListData, isProductError, productError]);

  const getPrimaryImage = (product: any): string => {
    try {
      if (
        product?.colors &&
        Array.isArray(product.colors) &&
        product.colors.length > 0
      ) {
        const firstColor = product.colors[0];
        if (firstColor?.images && Array.isArray(firstColor.images)) {
          const primaryImage = firstColor.images.find((i: any) => i?.isPrimary);
          return primaryImage?.url || firstColor.images[0]?.url || "";
        }
      }
      return "";
    } catch (error) {
      console.error("Get primary image error:", error);
      return "";
    }
  };

  const getPrimaryVideo = (product: any): string | null => {
    try {
      if (
        product?.colors &&
        Array.isArray(product.colors) &&
        product.colors.length > 0
      ) {
        const firstColor = product.colors[0];
        if (firstColor?.images && Array.isArray(firstColor.images)) {
          const videoImage = firstColor.images.find(
            (img: any) =>
              img?.url &&
              (img.url.endsWith(".mp4") || img.url.includes("video"))
          );
          return videoImage?.url || null;
        }
      }
      return null;
    } catch (error) {
      console.error("Get primary video error:", error);
      return null;
    }
  };

  const getPriceInfo = (product: any) => {
    try {
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
    } catch (error) {
      console.error("Get price info error:", error);
      return { originalPrice: 0, salePrice: 0, discount: 0 };
    }
  };

  const clearFilters = () => {
    try {
      setCategory("all");
      setPriceRange("all");
      setCurrentPage(1);
      setGlobalError(null);
    } catch (error) {
      console.error("Clear filters error:", error);
    }
  };

  // Enhanced wishlist handler - handles your backend error response structure
  const handleAddToWishlist = async (productId: string) => {
    if (!productId) {
      toast.error("Invalid product");
      return;
    }

    setWishlistLoading((prev) => ({ ...prev, [productId]: true }));

    try {
      // Already in wishlist? Just notify.
      if (wishlist.includes(productId)) {
        toast.error("This item is already in your wishlist");
        return;
      }
      if (!user || !user.id) {
        window.location.href = "/login";
      }

      // Use ADD mutation only
      const response = mutateAddWishList({
        product_id: productId,
        user_id: user?.id,
      });
      console.log("Wishlist add response:", response);

      // Update local wishlist
      setWishlist((prev) => [...prev, productId]);
    } catch (error) {
      console.error("Wishlist add error:", error);
    } finally {
      setWishlistLoading((prev) => ({ ...prev, [productId]: false }));
    }
  };

  const totalPages = Math.ceil(totalProducts / productsPerPage);

  interface ProductCardProps {
    product: any;
    index: number;
  }

  const ProductCard: React.FC<ProductCardProps> = ({ product, index }) => {
    if (!product || !product.id) {
      return null;
    }

    const { ref, inView } = useInView({ threshold: 0.5, triggerOnce: false });
    const image = getPrimaryImage(product);
    const video = getPrimaryVideo(product);
    const { originalPrice, salePrice, discount } = getPriceInfo(product);
    const mediaType = video ? "video" : "image";
    const isWishlisted = wishlist.includes(product.id);
    const isLoading = wishlistLoading[product.id] || false;

    const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
      e.currentTarget.src =
        "https://via.placeholder.com/400x600?text=Image+Not+Available";
    };

    const handleCardClick = () => {
      try {
        if (product?.id) {
          router.push(`/productdetails/${product.id}`);
        }
      } catch (error) {
        console.error("Navigation error:", error);
        toast.error("Unable to view product details");
      }
    };

    return (
      <div ref={ref}>
        <div className="group bg-white overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 rounded-xl border border-gray-100 cursor-pointer">
          <div
            className="relative overflow-hidden aspect-[3/4] bg-gray-100"
            onClick={handleCardClick}
          >
            {mediaType === "video" && video ? (
              <VideoPlayer src={video} poster={image} inView={inView} />
            ) : (
              <img
                src={
                  image || "https://via.placeholder.com/400x600?text=No+Image"
                }
                alt={product?.name || "Product"}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
                onError={handleImageError}
              />
            )}

            {discount > 0 && (
              <span
                className="absolute top-3 left-3 px-3 py-1 rounded-full text-white font-bold text-xs"
                style={{
                  background:
                    "linear-gradient(135deg, #ef4444 0%, #dc2626 100%)",
                  zIndex: 5,
                  boxShadow: "0 4px 12px rgba(239, 68, 68, 0.4)",
                }}
              >
                {discount}% OFF
              </span>
            )}

            <div className="absolute top-3 right-3 z-10">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleAddToWishlist(product.id);
                }}
                disabled={isLoading}
                className="w-10 h-10 flex items-center justify-center rounded-full bg-white/95 backdrop-blur-sm shadow-lg hover:bg-white hover:shadow-xl transition-all disabled:opacity-60"
                style={{
                  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
                }}
              >
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-red-500 border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <Heart
                    className={`w-5 h-5 transition-all duration-300 ${
                      isWishlisted
                        ? "fill-red-500 text-red-500"
                        : "text-red-500 hover:fill-red-100"
                    }`}
                    strokeWidth={2}
                  />
                )}
              </button>
            </div>

            {mediaType === "video" && (
              <span
                className="absolute bottom-3 left-3 px-2 py-1 rounded text-white text-xs font-semibold"
                style={{ backgroundColor: "rgba(0, 0, 0, 0.75)" }}
              >
                VIDEO
              </span>
            )}
          </div>

          <div className="p-4">
            <h3 className="font-semibold text-gray-900 text-sm md:text-base line-clamp-2 min-h-10 mb-2">
              {product?.name || "Unnamed Product"}
            </h3>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-lg md:text-xl font-bold text-teal-700">
                ₹{salePrice.toLocaleString("en-IN")}
              </span>
              {discount > 0 && originalPrice > 0 && (
                <span className="text-sm text-gray-400 line-through">
                  ₹{originalPrice.toLocaleString("en-IN")}
                </span>
              )}
            </div>
            <button
              onClick={handleCardClick}
              className="w-full py-2 md:py-2.5 text-white rounded-xl font-semibold hover:shadow-lg transition-all text-xs md:text-sm"
              style={{
                background: "linear-gradient(135deg, #0d9488 0%, #0f766e 100%)",
                borderRadius: "0.75rem",
                transition: "all 0.3s ease",
              }}
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>
    );
  };

  const EmptyState = () => (
    <div className="col-span-full flex flex-col items-center justify-center py-16 px-4">
      <div className="w-32 h-32 mb-6 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
        <PackageOpen className="w-16 h-16 text-gray-400" />
      </div>
      <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-3 text-center">
        No Products Available
      </h2>
      <p className="text-gray-600 mb-6 text-center max-w-md">
        {category !== "all" || priceRange !== "all"
          ? "We couldn't find any products matching your filters. Try adjusting your selection."
          : "There are no products available at the moment. Please check back later."}
      </p>
      {(category !== "all" || priceRange !== "all") && (
        <button
          onClick={() => {
            clearFilters();
            setShowMobileFilter(false);
          }}
          className="px-6 py-3 text-white rounded-xl font-semibold"
          style={{
            background: "linear-gradient(135deg, #0d9488 0%, #0f766e 100%)",
            borderRadius: "0.75rem",
            fontWeight: 600,
          }}
        >
          Clear All Filters
        </button>
      )}
    </div>
  );

  const FilterSection = ({ isMobile = false }: { isMobile?: boolean }) => (
    <div className={isMobile ? "p-4 md:p-6 space-y-6" : "space-y-6"}>
      {!isMobile && (
        <div className="pb-4 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-900">Refine By</h2>
        </div>
      )}
      <div className="pb-6 border-b border-gray-200">
        <h3 className="text-sm font-bold text-gray-900 mb-4 uppercase">
          Category
        </h3>
        <fieldset>
          <div className="space-y-2">
            {allCategories.map((cat) => (
              <label
                key={cat}
                className="flex items-center space-x-3 cursor-pointer"
              >
                <input
                  type="radio"
                  name="category"
                  value={cat}
                  checked={category === cat}
                  onChange={(e) => {
                    try {
                      setCategory(e.target.value);
                      setCurrentPage(1);
                    } catch (error) {
                      console.error("Category change error:", error);
                    }
                  }}
                  className="w-4 h-4 text-teal-600 focus:ring-teal-500"
                />
                <span className="text-sm text-gray-700 capitalize">
                  {cat === "all" ? "All Items" : cat}
                </span>
              </label>
            ))}
          </div>
        </fieldset>
      </div>
      <div className="pb-6 border-b border-gray-200">
        <h3 className="text-sm font-bold text-gray-900 mb-4 uppercase">
          Price Range
        </h3>
        <fieldset>
          <div className="space-y-2">
            {["all", "0-5000", "5000-10000", "10000-20000", "20000-50000"].map(
              (range) => (
                <label
                  key={range}
                  className="flex items-center space-x-3 cursor-pointer"
                >
                  <input
                    type="radio"
                    name="priceRange"
                    value={range}
                    checked={priceRange === range}
                    onChange={(e) => {
                      try {
                        setPriceRange(e.target.value);
                        setCurrentPage(1);
                      } catch (error) {
                        console.error("Price range change error:", error);
                      }
                    }}
                    className="w-4 h-4 text-teal-600 focus:ring-teal-500"
                  />
                  <span className="text-sm text-gray-700">
                    {range === "all"
                      ? "All Prices"
                      : `₹${range.replace("-", " - ₹")}`}
                  </span>
                </label>
              )
            )}
          </div>
        </fieldset>
      </div>
      <button
        onClick={clearFilters}
        className="w-full py-3 border-2 border-teal-600 text-teal-600 font-semibold rounded-lg hover:bg-teal-50 transition-colors"
      >
        Clear All Filters
      </button>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto px-3 md:px-4 lg:px-8 py-4 md:py-8 lg:py-12 mb-16 md:mb-0">
        {globalError && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
            <div className="flex-1">
              <p className="text-red-800">{globalError}</p>
            </div>
            <button
              onClick={() => setGlobalError(null)}
              className="text-red-500 hover:text-red-700"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        )}

        <div className="flex flex-col lg:flex-row gap-4 md:gap-8">
          <aside className="hidden lg:block lg:w-64 flex-shrink-0">
            <div className="sticky top-32 bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
              <FilterSection />
            </div>
          </aside>

          <main className="flex-1">
            <div className="mb-4 md:mb-8">
              <p className="text-sm text-gray-600">
                <span className="font-semibold text-gray-900">
                  {totalProducts}
                </span>{" "}
                products
              </p>
            </div>

            <div className="lg:hidden mb-6 bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
              <div
                className="flex overflow-x-auto gap-3"
                style={{
                  WebkitOverflowScrolling: "touch",
                  scrollbarWidth: "none",
                  msOverflowStyle: "none",
                }}
              >
                {allCategories.map((cat) => (
                  <div
                    key={cat}
                    onClick={() => {
                      try {
                        setCategory(cat);
                        setCurrentPage(1);
                      } catch (error) {
                        console.error("Category selection error:", error);
                      }
                    }}
                    className={`flex-none flex flex-col items-center gap-2 cursor-pointer transition ${
                      category === cat
                        ? "opacity-100"
                        : "opacity-70 hover:opacity-100"
                    }`}
                  >
                    <div
                      className={`w-20 h-20 rounded-full border-4 ${
                        category === cat
                          ? "border-teal-600"
                          : "border-transparent"
                      } bg-gray-200 overflow-hidden shadow-md`}
                    >
                      <img
                        src={categoryImages[cat] || categoryImages.all}
                        alt={cat}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src =
                            categoryImages.all;
                        }}
                      />
                    </div>
                    <span className="text-[11px] font-semibold text-gray-700 capitalize whitespace-nowrap">
                      {cat === "all" ? "All" : cat}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Skeleton Loading State */}
            {isProductLoading && (
              <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-4 md:gap-6 mb-8 md:mb-12">
                {Array.from({ length: productsPerPage }).map((_, index) => (
                  <ProductCardSkeleton key={`skeleton-${index}`} />
                ))}
              </div>
            )}

            {/* Products Grid */}
            {!isProductLoading && (
              <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-4 md:gap-6 mb-8 md:mb-12">
                {displayedProducts.length === 0 ? (
                  <EmptyState />
                ) : (
                  displayedProducts.map((product, index) => (
                    <ProductCard
                      key={product?.id || `product-${index}`}
                      product={product}
                      index={index}
                    />
                  ))
                )}
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 &&
              displayedProducts.length > 0 &&
              !isProductLoading && (
                <div className="hidden md:flex items-center justify-center gap-4 pt-8 border-t border-gray-200">
                  <button
                    onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                    className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:border-teal-600 hover:bg-teal-50 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                  >
                    <ChevronLeft className="w-5 h-5" />
                    Previous
                  </button>
                  <div className="flex gap-2">
                    {Array.from(
                      { length: Math.min(totalPages, 10) },
                      (_, i) => i + 1
                    ).map((page) => (
                      <button
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                          page === currentPage
                            ? "bg-gradient-to-br from-teal-600 to-teal-700 text-white"
                            : "border border-gray-300 text-gray-700 hover:border-teal-600 hover:bg-teal-50"
                        }`}
                      >
                        {page}
                      </button>
                    ))}
                  </div>
                  <button
                    onClick={() =>
                      setCurrentPage((p) => Math.min(totalPages, p + 1))
                    }
                    disabled={currentPage === totalPages}
                    className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:border-teal-600 hover:bg-teal-50 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                  >
                    Next
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              )}
          </main>
        </div>
      </div>

      {/* Mobile Filter Button */}
      <button
        onClick={() => setShowMobileFilter(true)}
        className="lg:hidden fixed left-4 bottom-24 z-40 px-6 py-3 text-white rounded-full font-semibold shadow-xl flex items-center gap-2"
        style={{
          background: "linear-gradient(135deg, #0d9488 0%, #0f766e 100%)",
          boxShadow: "0 25px 50px -12px rgba(13, 148, 136, 0.4)",
        }}
      >
        <Filter className="w-5 h-5" />
        Filters
      </button>

      {/* Mobile Filter Drawer */}
      {showMobileFilter && (
        <div className="lg:hidden fixed inset-0 z-50">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setShowMobileFilter(false)}
          />

          {/* Drawer */}
          <div className="absolute bottom-0 left-0 right-0 bg-white max-h-[85vh] rounded-t-2xl overflow-hidden">
            <div className="sticky top-0 bg-white border-b border-gray-200 p-4 md:p-6 z-10 flex justify-between items-center">
              <h2 className="text-lg md:text-xl font-bold">Filters</h2>
              <button
                onClick={() => setShowMobileFilter(false)}
                className="p-2 hover:bg-gray-100 rounded-lg"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="overflow-y-auto max-h-[calc(85vh-120px)]">
              <FilterSection isMobile />
            </div>
            <div className="sticky bottom-0 bg-white border-t border-gray-200 p-4 md:p-6 space-y-3">
              <button
                onClick={() => setShowMobileFilter(false)}
                className="w-full py-3 border-2 border-teal-600 text-teal-600 font-semibold rounded-lg hover:bg-teal-50"
              >
                Apply Filter
              </button>
              <button
                onClick={() => setShowMobileFilter(false)}
                className="w-full py-3 text-white font-semibold rounded-lg"
                style={{
                  background:
                    "linear-gradient(135deg, #0d9488 0%, #0f766e 100%)",
                }}
              >
                Apply Filters
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
