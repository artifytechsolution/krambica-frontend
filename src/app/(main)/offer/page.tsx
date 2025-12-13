"use client";
import React, { useState, useEffect, useRef } from "react";
import { Heart, ShoppingCart, Search, Star } from "lucide-react";
import { useListEligableProduct } from "@src/hooks/apiHooks";

// Skeleton Loader Component
const ProductCardSkeleton = () => {
  return (
    <div className="relative bg-white rounded-xl sm:rounded-2xl overflow-hidden border border-gray-200 h-full flex flex-col animate-pulse">
      <div className="relative w-full aspect-[3/4] bg-gray-200"></div>
      <div className="p-2.5 sm:p-3 md:p-4 lg:p-5 flex flex-col flex-grow">
        <div className="h-4 sm:h-5 bg-gray-200 rounded mb-2 w-3/4"></div>
        <div className="h-6 sm:h-8 bg-gray-200 rounded mb-2 w-2/3"></div>
        <div className="h-5 bg-gray-200 rounded mb-3 w-1/3"></div>
        <div className="h-9 sm:h-10 bg-gray-200 rounded w-full mt-auto"></div>
      </div>
    </div>
  );
};

// Product Card Component
const ProductCard = ({ product }) => {
  const [isFavorite, setIsFavorite] = useState(false);

  const productData = product?.product;
  const primaryColor = productData?.colors?.[0];
  const primaryImage = primaryColor?.images?.find(
    (img) => img.type === "image"
  );

  const handleAddToCart = (e) => {
    e.stopPropagation();
    console.log("Added to cart:", product.id);
  };

  if (!productData) return null;

  return (
    <article className="relative bg-white rounded-xl sm:rounded-2xl overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl border border-gray-200 hover:border-[#115e59] h-full flex flex-col group">
      <div className="relative w-full aspect-[3/4] overflow-hidden bg-gray-100">
        {primaryImage && (
          <img
            src={primaryImage.url}
            alt={primaryImage.altText || productData.name}
            className="absolute inset-0 w-full h-full object-cover"
            loading="lazy"
          />
        )}

        {product.promotion && (
          <div className="absolute top-2 left-2 sm:top-3 sm:left-3 bg-gradient-to-br from-[#115e59] to-[#134e4a] text-white px-2 py-1 sm:px-3 sm:py-1.5 md:px-4 md:py-2 rounded-lg font-bold text-[10px] sm:text-xs md:text-sm shadow-lg z-10 animate-pulse">
            Sale
          </div>
        )}

        <button
          onClick={(e) => {
            e.stopPropagation();
            setIsFavorite(!isFavorite);
          }}
          className="absolute top-2 right-2 sm:top-3 sm:right-3 w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-white rounded-full flex items-center justify-center hover:bg-teal-50 transition-all duration-300 hover:scale-110 shadow-lg z-10"
        >
          <Heart
            className={`w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 ${
              isFavorite ? "fill-[#115e59] text-[#115e59]" : ""
            }`}
          />
        </button>

        <div className="absolute bottom-2 right-2 sm:bottom-3 sm:right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button className="bg-white/90 backdrop-blur-sm rounded-full p-2 sm:p-2.5 hover:bg-white transition-all hover:text-[#115e59]">
            <Search className="w-3 h-3 sm:w-4 sm:h-4" />
          </button>
        </div>
      </div>

      <div className="p-2.5 sm:p-3 md:p-4 lg:p-5 flex flex-col flex-grow">
        <div className="flex items-start justify-between mb-1.5 sm:mb-2">
          <h3 className="font-bold text-xs sm:text-sm md:text-base lg:text-lg text-gray-900 leading-tight flex-1 line-clamp-2">
            {productData.name}
          </h3>
          <div className="hidden sm:flex text-[#115e59] text-xs ml-2">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-3 h-3 fill-current" />
            ))}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center gap-1 mb-2 sm:mb-3">
          <span className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold text-[#115e59]">
            ₹{productData.basePrice.toLocaleString()}
          </span>
          {product.promotion && (
            <span className="text-xs sm:text-sm md:text-base text-gray-400 line-through">
              ₹{(productData.basePrice * 1.25).toLocaleString()}
            </span>
          )}
        </div>

        {product.promotion && (
          <div className="mb-2 sm:mb-3">
            <span className="text-[10px] sm:text-xs md:text-sm text-[#115e59] font-semibold bg-teal-50 px-2 py-1 rounded-full">
              🎉 {product.promotion.description}
            </span>
          </div>
        )}
        <button
          onClick={() =>
            (window.location.href = `/productdetails/${productData.id}`)
          }
          className="w-full bg-gradient-to-r from-[#115e59] to-[#134e4a] text-white px-3 py-2 sm:px-4 sm:py-2.5 md:px-6 md:py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2 text-xs sm:text-sm md:text-base shadow-md mt-auto group"
        >
          <ShoppingCart className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 group-hover:scale-110 transition-transform" />
          Add to Cart
        </button>
      </div>
    </article>
  );
};

// Products Grid Component with Infinite Scrolling
const ProductsGrid = () => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isFetchingMore, setIsFetchingMore] = useState(false);
  const loadMoreRef = useRef(null);
  const observerRef = useRef(null);

  const ITEMS_PER_PAGE = 10;

  const {
    isError: isListPromotionError,
    isLoading: isPromotionLoading,
    data: PromotionData,
    mutate: PromotionMutation,
  } = useListEligableProduct();

  const fetchProducts = (page) => {
    console.log(`🔄 Fetching page ${page} with limit ${ITEMS_PER_PAGE}`);
    setIsFetchingMore(true);

    PromotionMutation({
      filters: [],
      globalSearch: "",
      page: page,
      limit: ITEMS_PER_PAGE,
    });
  };

  useEffect(() => {
    console.log("🚀 Component mounted - Loading page 1");
    fetchProducts(1);
  }, []);

  useEffect(() => {
    if (PromotionData?.data?.success) {
      const newProducts = PromotionData.data.data;
      const pagination = PromotionData.data.pagination;

      console.log(
        `✅ Received ${newProducts.length} products for page ${pagination.page}`
      );

      if (pagination.page === 1) {
        setProducts(newProducts);
        setCurrentPage(1);
      } else {
        setProducts((prev) => {
          const existingIds = new Set(prev.map((p) => p.id));
          const uniqueNewProducts = newProducts.filter(
            (p) => !existingIds.has(p.id)
          );
          return [...prev, ...uniqueNewProducts];
        });
        setCurrentPage(pagination.page);
      }

      setHasMore(pagination.hasNextPage);
      setIsFetchingMore(false);
    }
  }, [PromotionData]);

  useEffect(() => {
    if (isPromotionLoading || !hasMore || isFetchingMore) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const firstEntry = entries[0];

        if (firstEntry.isIntersecting && !isFetchingMore && hasMore) {
          const nextPage = currentPage + 1;
          console.log(`👀 Intersection detected - Loading page ${nextPage}`);
          fetchProducts(nextPage);
        }
      },
      {
        threshold: 0.1,
        rootMargin: "200px",
      }
    );

    observerRef.current = observer;

    const currentRef = loadMoreRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef && observerRef.current) {
        observerRef.current.unobserve(currentRef);
      }
    };
  }, [currentPage, hasMore, isPromotionLoading, isFetchingMore]);

  return (
    <div className="min-h-screen bg-gray-50 py-6 sm:py-8 md:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-4 text-sm text-gray-500">
          Page {currentPage} | Showing {products.length} products | Limit:{" "}
          {ITEMS_PER_PAGE} per page
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-5 lg:gap-6">
          {products.map((product, index) => (
            <ProductCard key={`${product.id}-${index}`} product={product} />
          ))}

          {(isPromotionLoading || isFetchingMore) &&
            Array.from({ length: ITEMS_PER_PAGE }).map((_, index) => (
              <ProductCardSkeleton key={`skeleton-${index}`} />
            ))}
        </div>

        {hasMore && !isPromotionLoading && products.length > 0 && (
          <div
            ref={loadMoreRef}
            className="text-center mt-8 py-4"
            style={{ minHeight: "50px" }}
          >
            {isFetchingMore ? (
              <div className="inline-flex items-center gap-2 text-gray-500">
                <div className="w-2 h-2 bg-[#115e59] rounded-full animate-bounce"></div>
                <div
                  className="w-2 h-2 bg-[#115e59] rounded-full animate-bounce"
                  style={{ animationDelay: "0.2s" }}
                ></div>
                <div
                  className="w-2 h-2 bg-[#115e59] rounded-full animate-bounce"
                  style={{ animationDelay: "0.4s" }}
                ></div>
                <span className="ml-2 text-sm">Loading more...</span>
              </div>
            ) : (
              <div className="text-gray-400 text-sm">Scroll for more</div>
            )}
          </div>
        )}

        {!hasMore && products.length > 0 && (
          <div className="text-center mt-8">
            <div className="inline-block bg-gradient-to-r from-[#115e59]/10 to-[#134e4a]/10 border border-[#115e59]/20 px-6 py-3 rounded-full">
              <p className="text-[#115e59] font-semibold">
                🎉 You've seen all {products.length} amazing deals!
              </p>
            </div>
          </div>
        )}

        {isListPromotionError && (
          <div className="text-center mt-8">
            <div className="inline-block bg-red-50 border border-red-200 px-6 py-4 rounded-lg">
              <p className="text-red-600 mb-3">
                Failed to load products. Please try again.
              </p>
              <button
                onClick={() => {
                  setProducts([]);
                  setCurrentPage(1);
                  setHasMore(true);
                  fetchProducts(1);
                }}
                className="px-6 py-2 bg-gradient-to-r from-[#115e59] to-[#134e4a] text-white rounded-lg hover:shadow-lg transition-all"
              >
                Retry
              </button>
            </div>
          </div>
        )}

        {!isPromotionLoading &&
          products.length === 0 &&
          !isListPromotionError && (
            <div className="text-center mt-12">
              <p className="text-gray-500 text-lg">No products available.</p>
            </div>
          )}
      </div>
    </div>
  );
};

const App = () => {
  return <ProductsGrid />;
};

export default App;
