"use client";
import React, { useState, useEffect } from "react";
import { Heart, ShoppingCart, Star, X } from "lucide-react";
import { useRouter } from "next/navigation";

const WishlistPage = () => {
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();
  const [notification, setNotification] = useState({
    show: false,
    message: "",
    type: "",
  });
  const [cartLoading, setCartLoading] = useState({});

  const STATIC_USER_ID = "6ed3eac0-77bc-42c0-a10c-50391452f53c";

  useEffect(() => {
    fetchWishlist();
  }, []);

  const fetchWishlist = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL_DUMMY}/api/products/wishlist/${STATIC_USER_ID}`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setWishlist(data.data.data || []);
    } catch (err) {
      console.error("Fetch wishlist error:", err);
      setError(err.message || "Failed to load wishlist");
      setWishlist([]);
    } finally {
      setLoading(false);
    }
  };

  // Helper function to get product display data
  const getProductDisplayData = (item) => {
    const product = item.product;
    const firstColor = product?.colors?.[0];
    const firstImage = firstColor?.images?.[0];
    const firstSize = firstColor?.sizeVariants?.[0];

    // Calculate average rating from reviews
    const avgRating =
      product?.reviews?.length > 0
        ? product.reviews.reduce((acc, r) => acc + (r.rating || 0), 0) /
          product.reviews.length
        : 4.5;

    // Check if any size variant has stock
    const hasStock =
      firstColor?.sizeVariants?.some((v) => v.availableStock > 0) || false;

    return {
      id: item.uuid,
      wishlist_id: item.wishlist_id,
      product_id: item.product_id,
      name: product?.name || "Product Name",
      category: product?.category?.name || "Category",
      image: firstImage?.url || "https://via.placeholder.com/400x500",
      price: product?.basePrice || 0,
      originalPrice: null,
      rating: avgRating,
      color: firstColor?.color_name || "Default",
      colorCode: firstColor?.color_code || "#cccccc",
      size: firstSize?.size || "N/A",
      inStock: hasStock,
      sku: product?.sku || "",
      reviewCount: product?.reviews?.length || 0,
      colorId: firstColor?.product_color_id || null,
      sizeVariantId: firstSize?.product_size_var_id || null,
    };
  };

  const showNotification = (message, type = "success") => {
    setNotification({ show: true, message, type });
    setTimeout(
      () => setNotification({ show: false, message: "", type: "" }),
      3000
    );
  };

  const removeItem = async (uuid, wishlist_id) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL_DUMMY}/api/products/wishlist/remove/${uuid}`,
        {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ user_id: STATIC_USER_ID }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to remove item");
      }

      setWishlist(wishlist.filter((item) => item.uuid !== uuid));
      showNotification("Removed from wishlist", "info");
    } catch (error) {
      console.error("Remove item error:", error);
      showNotification("Failed to remove item", "error");
    }
  };

  // Enhanced Add to Cart handler
  const handleAddToCart = async (displayData) => {
    if (!displayData.inStock) {
      showNotification(`${displayData.name} is out of stock`, "error");
      return;
    }

    if (!displayData.product_id) {
      showNotification("Invalid product", "error");
      return;
    }

    setCartLoading((prev) => ({ ...prev, [displayData.id]: true }));

    router.push(`/productdetails/${displayData.product_id}`);
  };

  // Skeleton Card Component
  const SkeletonCard = ({ index }) => (
    <div
      className="bg-white rounded-xl sm:rounded-2xl lg:rounded-3xl overflow-hidden shadow-sm animate-scale-in"
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <div className="relative overflow-hidden bg-slate-200 aspect-[3/4] skeleton-shimmer"></div>
      <div className="p-2.5 sm:p-4 lg:p-5 space-y-2 sm:space-y-3">
        <div className="h-3 sm:h-4 bg-slate-200 rounded-full w-16 sm:w-20 skeleton-shimmer"></div>
        <div className="space-y-1.5 sm:space-y-2">
          <div className="h-3.5 sm:h-4 bg-slate-200 rounded-full w-full skeleton-shimmer"></div>
          <div className="h-3.5 sm:h-4 bg-slate-200 rounded-full w-3/4 skeleton-shimmer"></div>
        </div>
        <div className="h-3 sm:h-3.5 bg-slate-200 rounded-full w-20 sm:w-24 skeleton-shimmer"></div>
        <div className="h-3 sm:h-3.5 bg-slate-200 rounded-full w-24 sm:w-28 skeleton-shimmer hidden xs:block"></div>
        <div className="h-5 sm:h-6 bg-slate-200 rounded-full w-20 sm:w-28 skeleton-shimmer"></div>
        <div className="h-8 sm:h-10 lg:h-12 bg-slate-200 rounded-lg sm:rounded-xl skeleton-shimmer"></div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br pb-28 from-slate-50 via-white to-slate-50">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
        
        * { box-sizing: border-box; }
        body { font-family: 'Inter', sans-serif; }

        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes scaleIn {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }

        @keyframes shimmer {
          0% { background-position: -1000px 0; }
          100% { background-position: 1000px 0; }
        }

        .skeleton-shimmer {
          animation: shimmer 2s infinite linear;
          background: linear-gradient(
            to right,
            #e2e8f0 0%,
            #f1f5f9 20%,
            #e2e8f0 40%,
            #e2e8f0 100%
          );
          background-size: 1000px 100%;
        }

        .animate-slide-down { animation: slideDown 0.4s ease-out; }
        .animate-fade-in { animation: fadeIn 0.3s ease-out; }
        .animate-scale-in { animation: scaleIn 0.3s ease-out; }

        .card-hover {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .card-hover:hover {
          transform: translateY(-8px);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.08);
        }

        .image-zoom {
          transition: transform 0.5s ease;
        }

        .image-container:hover .image-zoom {
          transform: scale(1.08);
        }

        .btn-primary {
          background: linear-gradient(135deg, #2E6A64 0%, #3a8077 100%);
          transition: all 0.3s ease;
        }

        .btn-primary:hover:not(:disabled) {
          box-shadow: 0 8px 20px rgba(46, 106, 100, 0.3);
          transform: translateY(-2px);
        }

        .btn-primary:active:not(:disabled) {
          transform: translateY(0);
        }

        .btn-primary:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        @media (max-width: 374px) { 
          html { font-size: 13px; }
          .mobile-card-title { font-size: 0.75rem; line-height: 1rem; }
          .mobile-price { font-size: 0.875rem; }
          .mobile-btn { font-size: 0.625rem; padding: 0.5rem 0.25rem; }
        }
        @media (min-width: 375px) and (max-width: 424px) { 
          html { font-size: 14px; }
          .mobile-card-title { font-size: 0.8125rem; line-height: 1.125rem; }
          .mobile-price { font-size: 0.9375rem; }
          .mobile-btn { font-size: 0.6875rem; padding: 0.5rem 0.375rem; }
        }
        @media (min-width: 425px) and (max-width: 639px) { 
          html { font-size: 14.5px; }
          .mobile-card-title { font-size: 0.875rem; line-height: 1.25rem; }
          .mobile-price { font-size: 1rem; }
          .mobile-btn { font-size: 0.75rem; padding: 0.5rem 0.5rem; }
        }
        @media (min-width: 640px) { 
          html { font-size: 15px; }
        }
        @media (min-width: 1024px) { 
          html { font-size: 16px; }
        }

        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: #2E6A64; border-radius: 3px; }

        .spinner {
          border: 2px solid rgba(255, 255, 255, 0.3);
          border-radius: 50%;
          border-top: 2px solid white;
          width: 16px;
          height: 16px;
          animation: spin 0.6s linear infinite;
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>

      {/* Notification Toast */}
      {notification.show && (
        <div className="fixed top-4 right-4 left-4 sm:left-auto sm:top-6 sm:right-6 z-50 animate-slide-down">
          <div
            className={`px-4 py-3 sm:px-5 sm:py-3.5 rounded-xl sm:rounded-2xl shadow-2xl max-w-sm mx-auto sm:mx-0 backdrop-blur-sm ${
              notification.type === "success"
                ? "bg-emerald-500/95"
                : notification.type === "error"
                ? "bg-red-500/95"
                : "bg-slate-500/95"
            } text-white font-medium text-sm`}
          >
            {notification.message}
          </div>
        </div>
      )}

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-6 sm:py-12 lg:py-16">
        {/* Header */}
        <div className="mb-6 sm:mb-12 text-center animate-fade-in">
          <h4 className="text-2xl sm:text-4xl lg:text-5xl font-bold text-slate-900 mb-2 sm:mb-3 tracking-tight">
            My Wishlist
          </h4>
        </div>

        {/* Skeleton Loading State */}
        {loading && (
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-2 sm:gap-4 md:gap-5 lg:gap-6 xl:gap-8">
            {[...Array(8)].map((_, index) => (
              <SkeletonCard key={index} index={index} />
            ))}
          </div>
        )}

        {/* Error State */}
        {error && !loading && (
          <div className="bg-white rounded-2xl sm:rounded-3xl p-8 sm:p-12 text-center shadow-sm animate-scale-in max-w-md mx-auto">
            <div className="w-14 h-14 sm:w-16 sm:h-16 mx-auto mb-4 bg-red-50 rounded-full flex items-center justify-center">
              <X className="w-7 h-7 sm:w-8 sm:h-8 text-red-500" />
            </div>
            <h3 className="text-lg sm:text-xl font-semibold text-slate-900 mb-2">
              Something went wrong
            </h3>
            <p className="text-sm text-slate-600 mb-6">{error}</p>
            <button
              onClick={fetchWishlist}
              className="px-5 py-2.5 sm:px-6 sm:py-3 btn-primary text-white rounded-xl font-semibold text-sm"
            >
              Try Again
            </button>
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && wishlist.length === 0 && (
          <div className="bg-white rounded-2xl sm:rounded-3xl p-8 sm:p-16 text-center shadow-sm animate-scale-in max-w-lg mx-auto">
            <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-4 sm:mb-6 bg-slate-100 rounded-full flex items-center justify-center">
              <Heart className="w-8 h-8 sm:w-10 sm:h-10 text-slate-300" />
            </div>
            <h3 className="text-xl sm:text-2xl font-semibold text-slate-900 mb-2 sm:mb-3">
              Your wishlist is empty
            </h3>
            <p className="text-sm sm:text-base text-slate-600 mb-6 sm:mb-8">
              Save items you love and shop them later
            </p>
            <a
              href="/products"
              className="inline-block px-6 py-2.5 sm:px-8 sm:py-3.5 btn-primary text-white rounded-xl font-semibold text-sm"
            >
              Explore Products
            </a>
          </div>
        )}

        {/* Product Grid */}
        {!loading && !error && wishlist.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-2 sm:gap-4 md:gap-5 lg:gap-6 xl:gap-8">
            {wishlist.map((item, index) => {
              const displayData = getProductDisplayData(item);
              const isCartLoading = cartLoading[displayData.id] || false;

              return (
                <div
                  key={displayData.id}
                  className="bg-white rounded-xl sm:rounded-2xl lg:rounded-3xl overflow-hidden shadow-sm card-hover animate-scale-in group"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {/* Image Container */}
                  <div className="relative overflow-hidden bg-slate-50 image-container aspect-[3/4]">
                    <img
                      src={displayData.image}
                      alt={displayData.name}
                      className="w-full h-full object-cover image-zoom"
                      onError={(e) => {
                        e.target.src =
                          "https://via.placeholder.com/400x500?text=No+Image";
                      }}
                    />

                    {/* Remove Button */}
                    <button
                      onClick={() =>
                        removeItem(displayData.id, displayData.wishlist_id)
                      }
                      className="absolute top-2 right-2 sm:top-3 sm:right-3 lg:top-4 lg:right-4 w-7 h-7 sm:w-9 sm:h-9 lg:w-10 lg:h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg opacity-100 sm:opacity-0 group-hover:opacity-100 transition-all hover:bg-white hover:scale-110"
                    >
                      <X className="w-3.5 h-3.5 sm:w-4 sm:h-4 lg:w-5 lg:h-5 text-slate-600" />
                    </button>

                    {/* Stock Badge */}
                    {!displayData.inStock && (
                      <div className="absolute top-2 left-2 sm:top-3 sm:left-3 lg:top-4 lg:left-4 px-2 py-1 sm:px-2.5 sm:py-1 lg:px-3 lg:py-1.5 bg-red-500/90 backdrop-blur-sm text-white text-[9px] sm:text-xs font-semibold rounded-full">
                        Out of Stock
                      </div>
                    )}

                    {/* Discount Badge */}
                    {displayData.originalPrice && displayData.inStock && (
                      <div className="absolute top-2 left-2 sm:top-3 sm:left-3 lg:top-4 lg:left-4 px-2 py-1 sm:px-2.5 sm:py-1 lg:px-3 lg:py-1.5 bg-emerald-500/90 backdrop-blur-sm text-white text-[9px] sm:text-xs font-bold rounded-full">
                        {Math.round(
                          ((displayData.originalPrice - displayData.price) /
                            displayData.originalPrice) *
                            100
                        )}
                        % OFF
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-2.5 sm:p-4 lg:p-5">
                    {/* Category */}
                    <div className="text-[9px] sm:text-xs lg:text-sm font-medium text-[#2E6A64] mb-1 sm:mb-2 truncate">
                      {displayData.category}
                    </div>

                    {/* Product Name */}
                    <h3 className="mobile-card-title sm:text-base lg:text-lg font-semibold text-slate-900 mb-1.5 sm:mb-2 line-clamp-2 leading-tight min-h-[2rem] sm:min-h-[3rem]">
                      {displayData.name}
                    </h3>

                    {/* Rating */}
                    <div className="flex items-center gap-1 mb-2 sm:mb-3">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-2.5 h-2.5 sm:w-3 sm:h-3 lg:w-3.5 lg:h-3.5 ${
                              i < Math.floor(displayData.rating)
                                ? "text-amber-400 fill-amber-400"
                                : "text-slate-200 fill-slate-200"
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-[9px] sm:text-xs text-slate-600 font-medium">
                        {displayData.rating.toFixed(1)}
                        {displayData.reviewCount > 0 &&
                          ` (${displayData.reviewCount})`}
                      </span>
                    </div>

                    {/* Variant Info */}
                    <div className="hidden xs:flex items-center gap-1.5 sm:gap-2 mb-2 sm:mb-3 lg:mb-4">
                      <div
                        className="w-3.5 h-3.5 sm:w-4 sm:h-4 lg:w-5 lg:h-5 rounded-full border-2 border-white shadow-sm flex-shrink-0"
                        style={{ backgroundColor: displayData.colorCode }}
                      ></div>
                      <span className="text-[9px] sm:text-xs text-slate-600 truncate">
                        {displayData.color} • {displayData.size}
                      </span>
                    </div>

                    {/* Price */}
                    <div className="flex items-baseline gap-1 sm:gap-1.5 mb-2 sm:mb-3 lg:mb-4">
                      <span className="mobile-price sm:text-lg lg:text-xl xl:text-2xl font-bold text-slate-900">
                        ₹{displayData.price.toFixed(2)}
                      </span>
                      {displayData.originalPrice && (
                        <span className="text-[9px] sm:text-xs lg:text-sm text-slate-400 line-through">
                          ₹{displayData.originalPrice.toFixed(2)}
                        </span>
                      )}
                    </div>

                    {/* Add to Cart Button */}
                    <button
                      onClick={() => handleAddToCart(displayData)}
                      disabled={!displayData.inStock || isCartLoading}
                      className={`mobile-btn w-full sm:py-2.5 lg:py-3 rounded-lg sm:rounded-xl font-semibold sm:text-sm flex items-center justify-center gap-1 sm:gap-2 transition-all ${
                        displayData.inStock && !isCartLoading
                          ? "btn-primary text-white"
                          : "bg-slate-100 text-slate-400 cursor-not-allowed"
                      }`}
                    >
                      {isCartLoading ? (
                        <>
                          <div className="spinner"></div>
                          <span className="hidden xs:inline">Adding...</span>
                        </>
                      ) : (
                        <>
                          <ShoppingCart className="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5" />
                          <span className="hidden xs:inline">
                            {displayData.inStock ? "Buy Now" : "Out of Stock"}
                          </span>
                          <span className="xs:hidden">
                            {displayData.inStock ? "Buy Now" : "Out of Stock"}
                          </span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default WishlistPage;
