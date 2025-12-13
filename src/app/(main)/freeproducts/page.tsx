"use client";
import React, { useState, useEffect } from "react";
import {
  Heart,
  Search,
  Star,
  ArrowLeft,
  CheckCircle,
  Tag,
  Gift,
  ShoppingBag,
  Loader2,
} from "lucide-react";
import { useRouter } from "next/navigation";

// Free Product Card Component
const FreeProductCard = ({ product, isSelected, onSelect, canSelect }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const router = useRouter();

  const productData = product?.product;
  const primaryColor = productData?.colors?.[0];
  const primaryImage = primaryColor?.images?.find(
    (img) => img.type === "image"
  );

  if (!productData) return null;

  // Navigate to product details page
  const handleNavigateToDetails = (e) => {
    e.stopPropagation();
    if (productData?.id) {
      router.push(`/productdetails/${productData.id}?isPromotion=true`);
    }
  };

  return (
    <article
      className={`relative bg-white rounded-xl sm:rounded-2xl overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl border-2 h-full flex flex-col group ${
        isSelected
          ? "border-teal-600 ring-4 ring-teal-100"
          : "border-gray-200 hover:border-teal-300"
      } ${!canSelect && !isSelected ? "opacity-60 cursor-not-allowed" : ""}`}
    >
      <div className="relative w-full aspect-[3/4] overflow-hidden bg-gray-100">
        {primaryImage && (
          <img
            src={primaryImage.url}
            alt={primaryImage.altText || productData.name}
            className="absolute inset-0 w-full h-full object-cover"
            loading="lazy"
          />
        )}

        {/* Free Badge */}
        <div className="absolute top-2 left-2 sm:top-3 sm:left-3 bg-gradient-to-br from-emerald-500 to-teal-600 text-white px-2 py-1 sm:px-3 sm:py-1.5 md:px-4 md:py-2 rounded-lg font-bold text-[10px] sm:text-xs md:text-sm shadow-lg z-10 flex items-center gap-1 animate-pulse">
          <Tag size={14} />
          FREE
        </div>

        {/* Selection Badge */}
        {isSelected && (
          <div className="absolute top-2 right-2 sm:top-3 sm:right-3 bg-teal-600 text-white rounded-full p-2 sm:p-2.5 shadow-lg animate-scale-in z-10">
            <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5" />
          </div>
        )}

        {/* Heart Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            setIsFavorite(!isFavorite);
          }}
          className={`absolute ${
            isSelected ? "top-14 sm:top-16" : "top-2 sm:top-3"
          } right-2 sm:right-3 w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-white rounded-full flex items-center justify-center hover:bg-pink-50 transition-all duration-300 hover:scale-110 shadow-lg z-10`}
        >
          <Heart
            className={`w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 ${
              isFavorite ? "fill-red-500 text-red-500" : ""
            }`}
          />
        </button>

        {/* Original Price Badge */}
        <div className="absolute bottom-2 right-2 sm:bottom-3 sm:right-3 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-lg shadow-md">
          <p className="text-gray-400 line-through text-xs">
            ₹{productData.basePrice.toLocaleString()}
          </p>
          <p className="text-teal-700 font-bold text-sm">₹0</p>
        </div>

        {/* Search Button */}
        <div className="absolute bottom-2 left-2 sm:bottom-3 sm:left-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button
            onClick={handleNavigateToDetails}
            className="bg-white/90 backdrop-blur-sm rounded-full p-2 sm:p-2.5 hover:bg-white transition-all"
          >
            <Search className="w-3 h-3 sm:w-4 sm:h-4" />
          </button>
        </div>
      </div>

      <div className="p-2.5 sm:p-3 md:p-4 lg:p-5 flex flex-col flex-grow">
        <div className="flex items-start justify-between mb-1.5 sm:mb-2">
          <h3 className="font-bold text-xs sm:text-sm md:text-base lg:text-lg text-gray-900 leading-tight flex-1 line-clamp-2">
            {productData.name}
          </h3>
          <div className="hidden sm:flex text-yellow-500 text-xs ml-2">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-3 h-3 fill-current" />
            ))}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center gap-1 mb-2 sm:mb-3">
          <span className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold text-teal-600">
            FREE
          </span>
          <span className="text-xs sm:text-sm md:text-base text-gray-400 line-through">
            ₹{productData.basePrice.toLocaleString()}
          </span>
        </div>

        {productData.category && (
          <div className="mb-2 sm:mb-3">
            <span className="text-[10px] sm:text-xs md:text-sm text-emerald-600 font-semibold bg-emerald-50 px-2 py-1 rounded-full">
              🎉 {productData.category.name}
            </span>
          </div>
        )}

        <button
          onClick={handleNavigateToDetails}
          disabled={!canSelect && !isSelected}
          className={`w-full px-3 py-2 sm:px-4 sm:py-2.5 md:px-6 md:py-3 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center gap-2 text-xs sm:text-sm md:text-base shadow-md hover:shadow-lg mt-auto group ${
            isSelected
              ? "bg-teal-600 text-white hover:bg-teal-700"
              : canSelect
              ? "bg-gradient-to-r from-teal-700 to-teal-600 text-white hover:from-teal-600 hover:to-teal-500"
              : "bg-gray-200 text-gray-500 cursor-not-allowed"
          }`}
        >
          {isSelected ? (
            <>
              <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 group-hover:scale-110 transition-transform" />
              View Details
            </>
          ) : (
            <>
              <Gift className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 group-hover:scale-110 transition-transform" />
              Select Product
            </>
          )}
        </button>
      </div>
    </article>
  );
};

// Main Free Products Page Component
const FreeProductsPage = () => {
  const router = useRouter();
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState(null);

  const maxSelection = 2; // Buy 2 Get 1 Free = 2 free items
  const promotionId = 2; // You can make this dynamic based on your needs

  // Fetch free products from API
  useEffect(() => {
    const fetchFreeProducts = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL_DUMMY}/api/promotion/admin/${promotionId}/free-products`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
            cache: "no-store",
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();

        if (result.status === "success" && result.data) {
          setProducts(result.data.data || []);
          setPagination(result.data.pagination);
        } else {
          throw new Error(result.message || "Failed to fetch products");
        }
      } catch (err) {
        console.error("Error fetching free products:", err);
        setError(err.message || "Failed to load free products");
      } finally {
        setLoading(false);
      }
    };

    fetchFreeProducts();
  }, [promotionId]);

  const handleSelectProduct = (product) => {
    if (selectedProducts.find((p) => p.id === product.id)) {
      setSelectedProducts(selectedProducts.filter((p) => p.id !== product.id));
    } else if (selectedProducts.length < maxSelection) {
      setSelectedProducts([...selectedProducts, product]);
    }
  };

  const handleConfirmSelection = () => {
    if (selectedProducts.length === 0) return;
    setShowConfirmModal(true);
  };

  const handleAddToCart = () => {
    console.log("Adding free products to cart:", selectedProducts);
    setShowConfirmModal(false);
    router.push("/cart");
  };

  const isProductSelected = (productId) => {
    return selectedProducts.some((p) => p.id === productId);
  };

  // Loading State
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-teal-600 mx-auto mb-4" />
          <p className="text-gray-600 font-semibold">
            Loading free products...
          </p>
        </div>
      </div>
    );
  }

  // Error State
  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl p-8 max-w-md w-full text-center shadow-xl">
          <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-8 h-8 text-red-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">
            Oops! Something went wrong
          </h3>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-teal-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-teal-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  // Empty State
  if (products.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl p-8 max-w-md w-full text-center shadow-xl">
          <div className="bg-gray-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <ShoppingBag className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">
            No Free Products Available
          </h3>
          <p className="text-gray-600 mb-6">
            There are no free products available for this promotion at the
            moment.
          </p>
          <button
            onClick={() => router.push("/cart")}
            className="bg-teal-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-teal-700 transition-colors"
          >
            Back to Cart
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-6 sm:py-8 md:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => router.push("/cart")}
            className="flex items-center gap-2 text-gray-700 hover:text-gray-900 font-semibold transition-colors"
          >
            <ArrowLeft size={20} />
            <span className="hidden sm:inline">Back to Cart</span>
            <span className="sm:hidden">Back</span>
          </button>

          <div className="text-sm text-gray-500">
            Selected: {selectedProducts.length} / {maxSelection}
          </div>
        </div>

        {/* Pagination Info */}
        {pagination && (
          <div className="mb-4 text-center">
            <p className="text-sm text-gray-600">
              Showing {products.length} of {pagination.total} free products
            </p>
          </div>
        )}

        {/* Products Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-5 lg:gap-6 mb-20 md:mb-8">
          {products.map((product) => (
            <FreeProductCard
              key={product.id}
              product={product}
              isSelected={isProductSelected(product.id)}
              onSelect={handleSelectProduct}
              canSelect={selectedProducts.length < maxSelection}
            />
          ))}
        </div>

        {/* Bottom Action Bar - Sticky on Mobile */}
        {selectedProducts.length > 0 && (
          <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-2xl p-4 md:relative md:mt-8 md:rounded-2xl md:border z-50">
            <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="bg-teal-50 rounded-xl p-3">
                  <ShoppingBag className="w-6 h-6 text-teal-700" />
                </div>
                <div>
                  <p className="font-bold text-gray-900 text-sm md:text-base">
                    {selectedProducts.length} of {maxSelection} selected
                  </p>
                  <p className="text-gray-600 text-xs md:text-sm">
                    Total Savings: ₹
                    {selectedProducts
                      .reduce((sum, p) => sum + (p.product?.basePrice || 0), 0)
                      .toLocaleString()}
                  </p>
                </div>
              </div>

              <button
                onClick={handleConfirmSelection}
                className="w-full sm:w-auto bg-gradient-to-r from-teal-700 to-teal-600 text-white px-8 py-4 rounded-xl font-bold text-base hover:shadow-2xl hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2"
              >
                <CheckCircle size={20} />
                Add to Cart
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Confirmation Modal */}
      {showConfirmModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 md:p-8 shadow-2xl animate-scale-in">
            <div className="text-center mb-6">
              <div className="bg-gradient-to-r from-emerald-500 to-teal-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                Confirm Your Selection
              </h3>
              <p className="text-gray-600 text-sm">
                You're about to add {selectedProducts.length} free{" "}
                {selectedProducts.length === 1 ? "product" : "products"} to your
                cart
              </p>
            </div>

            <div className="bg-gray-50 rounded-xl p-4 mb-6 max-h-60 overflow-y-auto">
              {selectedProducts.map((product) => {
                const productData = product?.product;
                const primaryColor = productData?.colors?.[0];
                const primaryImage = primaryColor?.images?.find(
                  (img) => img.type === "image"
                );

                return (
                  <div
                    key={product.id}
                    className="flex items-center gap-3 mb-3 last:mb-0"
                  >
                    <img
                      src={primaryImage?.url || "/placeholder.png"}
                      alt={productData?.name}
                      className="w-14 h-14 rounded-lg object-cover"
                    />
                    <div className="flex-1">
                      <p className="font-semibold text-gray-900 text-sm">
                        {productData?.name}
                      </p>
                      <div className="flex items-center gap-2">
                        <span className="text-gray-400 line-through text-xs">
                          ₹{productData?.basePrice?.toLocaleString()}
                        </span>
                        <span className="text-teal-700 font-bold text-sm">
                          FREE
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setShowConfirmModal(false)}
                className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-xl font-semibold hover:bg-gray-200 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleAddToCart}
                className="flex-1 bg-gradient-to-r from-teal-700 to-teal-600 text-white py-3 rounded-xl font-bold hover:shadow-lg transition-all"
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes scale-in {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        .animate-scale-in {
          animation: scale-in 0.3s ease-out;
        }

        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
};

export default FreeProductsPage;
