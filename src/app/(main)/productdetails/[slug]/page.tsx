"use client";
import React, { useState, useEffect, useCallback, useRef } from "react";
import { useAppDispatch, useAppSelector } from "@src/redux/store";
import { addToCart, selectUser } from "@src/redux/reducers/authSlice";
import { useParams, useSearchParams, useRouter } from "next/navigation";
import toast from "react-hot-toast";
import {
  Share2,
  ChevronLeft,
  ChevronRight,
  X,
  Trash2,
  Image as ImageIcon,
  CheckCircle2,
  AlertCircle,
  XCircle,
  Copy,
  Check,
  Star,
  ShoppingBag,
  Truck,
  Shield,
  Heart,
  Download,
  Eye,
  Sparkles,
  Tag,
  Package,
  Ruler,
  Info, // Added for size chart icon
} from "lucide-react";
import {
  FaFacebookF,
  FaTwitter,
  FaWhatsapp,
  FaLinkedinIn,
  FaTelegram,
  FaPinterest,
} from "react-icons/fa";
import {
  useProductList,
  useListProductwiseReviews,
  useGetProductById,
  useAddProductwiseReviews,
} from "@src/hooks/apiHooks";
import { useForm, Controller } from "react-hook-form";
import { useMutation } from "react-query";

// ============================================
// FIXED CUSTOM HOOK FOR SUBMITTING REVIEWS
// ============================================
const useSubmitReview = () => {
  return useMutation(
    async ({ productId, userId, rating, reviewText, media = [] }) => {
      try {
        console.log("Starting review submission...");

        // Step 1: Submit the review text and rating
        const reviewResponse = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL_DUMMY}/api/review/products/${productId}/reviews`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              user_id: userId,
              rating: rating,
              reviewText: reviewText,
            }),
          }
        );

        if (!reviewResponse.ok) {
          console.log(
            "Review submission failed with status:",
            reviewResponse.body
          );
        }

        const reviewData = await reviewResponse.json();
        console.log("Review submitted successfully:", reviewData);

        // Extract review ID from response
        let productReviewId = null;

        // Try different possible response structures
        if (reviewData.data?.id) {
          productReviewId = reviewData.data.product_review_id;
        } else if (reviewData.id) {
          productReviewId = reviewData.id;
        } else if (reviewData.reviewId) {
          productReviewId = reviewData.reviewId;
        } else if (reviewData.data?.reviewId) {
          productReviewId = reviewData.data.reviewId;
        }

        console.log("Product Review ID:", productReviewId);

        if (!productReviewId) {
          console.warn("Could not get review ID from response", reviewData);
          toast.error("review submission fail");
          return reviewData;
        }

        // Step 2: Upload media if exists
        if (media.length > 0) {
          console.log("Starting media upload for", media.length, "files");

          for (let i = 0; i < media.length; i++) {
            const imageData = media[i];
            const formData = new FormData();
            formData.append("product_review_id", productReviewId.toString());
            formData.append("files", imageData.file);

            console.log(`Uploading file ${i + 1}:`, imageData.file.name);

            try {
              const mediaResponse = await fetch(
                `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL_DUMMY}/api/review/upload-review-media`,
                {
                  method: "POST",
                  body: formData,
                }
              );

              if (!mediaResponse.ok) {
                const errorText = await mediaResponse.text();
                console.warn(`Failed to upload media ${i + 1}:`, errorText);
                // toast.error(`Failed to upload image: ${imageData.file.name}`);
              } else {
                const mediaResult = await mediaResponse.json();
                console.log(`Media ${i + 1} uploaded:`, mediaResult);
              }
            } catch (uploadError) {
              console.error(`Error uploading file ${i + 1}:`, uploadError);
              toast.error(`Error uploading: ${imageData.file.name}`);
            }
          }

          toast.success("Review submitted with images!");
        } else {
          toast.success("Review submitted successfully!");
        }

        return reviewData;
      } catch (error) {
        console.error("Review submission error:", error);
        throw error;
      }
    }
  );
};

// ============================================
// MOBILE-FRIENDLY SIZE CHART MODAL
// ============================================
const SizeChartModal = ({ isOpen, onClose, productCategory, productName }) => {
  const chartRef = useRef(null);

  if (!isOpen) return null;

  const getSizeChartData = () => {
    const category = (productCategory || "").toLowerCase();

    // Custom logic for Krambica (Ethnic/Kurtis focus)
    if (
      category.includes("kurti") ||
      category.includes("set") ||
      category.includes("ethnic")
    ) {
      return {
        title: "Ethnic Wear Guide (Inches)",
        measurements: ["Size", "Bust", "Waist", "Hip", "Length"],
        sizes: [
          { size: "XS", bust: "34", waist: "30", hip: "36", length: "42" },
          { size: "S", bust: "36", waist: "32", hip: "38", length: "42" },
          { size: "M", bust: "38", waist: "34", hip: "40", length: "44" },
          { size: "L", bust: "40", waist: "36", hip: "42", length: "44" },
          { size: "XL", bust: "42", waist: "38", hip: "44", length: "46" },
          { size: "XXL", bust: "44", waist: "40", hip: "46", length: "46" },
        ],
      };
    }
    // Default Fallback
    return {
      title: "Standard Guide (Inches)",
      measurements: ["Size", "Chest", "Waist", "Hip"],
      sizes: [
        { size: "S", chest: "36", waist: "30", hip: "38" },
        { size: "M", chest: "38", waist: "32", hip: "40" },
        { size: "L", chest: "40", waist: "34", hip: "42" },
        { size: "XL", chest: "42", waist: "36", hip: "44" },
      ],
    };
  };

  const sizeChart = getSizeChartData();

  const handleDownload = () => {
    const content = chartRef.current;
    const printWindow = window.open("", "_blank");
    printWindow.document.write(`
      <html>
        <head>
          <title>Size Guide - ${productName}</title>
          <style>
            body { font-family: sans-serif; padding: 40px; color: #4b5563; }
            table { width: 100%; border-collapse: collapse; margin-top: 20px; }
            th { background: #f9fafb; text-align: left; padding: 12px; border-bottom: 2px solid #e5e7eb; text-transform: uppercase; font-size: 12px; }
            td { padding: 12px; border-bottom: 1px solid #f3f4f6; }
            h1 { color: #111827; font-size: 24px; }
          </style>
        </head>
        <body>
          <h1>${productName} Size Guide</h1>
          <p>Krambica® Artisanal Excellence</p>
          ${content.querySelector("table").outerHTML}
          <p style="margin-top: 30px; font-size: 12px; color: #9ca3af;">Generated on ${new Date().toLocaleDateString()}</p>
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.print();
  };

  return (
    <>
      <div
        className="fixed inset-0 bg-stone-900/40 backdrop-blur-md z-[100] transition-opacity"
        onClick={onClose}
      />
      <div className="fixed inset-0 z-[101] flex items-center justify-center p-4">
        <div className="bg-white rounded-[2rem] max-w-2xl w-full max-h-[85vh] overflow-hidden shadow-2xl flex flex-col border border-stone-100">
          {/* Header */}
          <div className="px-8 py-6 border-b border-stone-50 flex justify-between items-center bg-white sticky top-0 z-10">
            <div>
              <h3 className="text-xl font-serif text-gray-900">
                Measurement Guide
              </h3>
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 mt-1">
                {productName || "Product"} — {sizeChart.title}
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-stone-50 rounded-full text-stone-400 hover:text-stone-900 transition-all"
            >
              <X size={20} />
            </button>
          </div>

          {/* Content */}
          <div className="overflow-y-auto p-8 custom-scrollbar" ref={chartRef}>
            {/* Measurement Tips */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-stone-50 flex items-center justify-center shrink-0">
                  <Ruler size={18} className="text-gray-600" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-gray-900 uppercase tracking-widest mb-1">
                    How to measure
                  </h4>
                  <p className="text-xs text-gray-500 leading-relaxed">
                    Measure around the fullest part of your body while keeping
                    the tape horizontal.
                  </p>
                </div>
              </div>
              <div className="bg-stone-50/50 p-4 rounded-2xl border border-stone-100">
                <div className="flex items-center gap-2 text-gray-900 mb-1">
                  <Info size={14} />
                  <span className="text-[10px] font-bold uppercase tracking-widest">
                    Size Tip
                  </span>
                </div>
                <p className="text-xs text-gray-500 font-light">
                  If you're between sizes, we suggest choosing the larger size
                  for a relaxed ethnic fit.
                </p>
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto mb-8">
              <table className="w-full text-left">
                <thead>
                  <tr>
                    {sizeChart.measurements.map((m) => (
                      <th
                        key={m}
                        className="pb-4 text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 border-b border-stone-100"
                      >
                        {m}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-50 text-gray-600">
                  {sizeChart.sizes.map((row, i) => (
                    <tr
                      key={i}
                      className="hover:bg-stone-50/50 transition-colors group"
                    >
                      {sizeChart.measurements.map((m) => (
                        <td
                          key={m}
                          className="py-4 text-sm font-light group-first:pt-6"
                        >
                          {row[m.toLowerCase()] || row.size}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Quality Note */}
            <div className="flex items-center gap-3 p-4 bg-[#F9F9F7] rounded-xl border border-stone-100">
              <Check size={16} className="text-gray-900" />
              <p className="text-[10px] text-gray-500 font-medium uppercase tracking-widest leading-loose">
                All garments are pre-washed to minimize shrinkage.
              </p>
            </div>
          </div>

          {/* Footer Actions */}
          <div className="p-8 border-t border-stone-50 bg-white grid grid-cols-2 gap-4">
            <button
              onClick={onClose}
              className="px-6 py-4 rounded-full border border-stone-200 text-[10px] font-bold uppercase tracking-widest text-gray-400 hover:text-gray-900 hover:border-gray-900 transition-all"
            >
              Close Guide
            </button>
            <button
              onClick={handleDownload}
              className="flex items-center justify-center gap-3 px-6 py-4 rounded-full bg-gray-600 text-white text-[10px] font-bold uppercase tracking-widest hover:bg-gray-800 transition-all shadow-lg shadow-stone-100"
            >
              <Download size={16} />
              Download Guide
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

// ============================================
// MOBILE-FRIENDLY SKELETON LOADERS
// ============================================
const ImageSkeleton = () => (
  <div className="relative bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl overflow-hidden aspect-square sm:aspect-[3/4] animate-pulse">
    <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 bg-[length:400%_100%] animate-shimmer"></div>
  </div>
);

const ThumbnailSkeleton = () => (
  <div className="flex space-x-2 overflow-x-auto pb-1">
    {[1, 2, 3].map((i) => (
      <div
        key={i}
        className="flex-shrink-0 w-16 h-16 sm:w-20 sm:h-20 bg-gray-100 rounded-lg animate-pulse"
      />
    ))}
  </div>
);

const ProductDetailsSkeleton = () => (
  <div className="space-y-4 sm:space-y-5 animate-pulse">
    <div className="h-3 bg-gray-100 rounded w-24"></div>
    <div className="h-7 sm:h-8 bg-gray-100 rounded w-4/5"></div>
    <div className="flex items-center gap-3">
      <div className="h-4 sm:h-5 bg-gray-100 rounded w-20"></div>
      <div className="h-7 sm:h-8 bg-gray-100 rounded w-28"></div>
    </div>
    <div className="space-y-2">
      {[1, 2, 3].map((i) => (
        <div key={i} className="h-3 bg-gray-100 rounded w-full"></div>
      ))}
    </div>
    <div className="space-y-2">
      <div className="h-4 bg-gray-100 rounded w-28"></div>
      <div className="flex gap-2">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="w-8 h-8 sm:w-10 sm:h-10 bg-gray-100 rounded-lg"
          ></div>
        ))}
      </div>
    </div>
    <div className="space-y-2">
      <div className="h-4 bg-gray-100 rounded w-28"></div>
      <div className="flex flex-wrap gap-2">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="w-12 h-9 sm:w-14 sm:h-9 bg-gray-100 rounded-lg"
          ></div>
        ))}
      </div>
    </div>
    <div className="flex flex-col sm:flex-row gap-3 pt-4">
      <div className="flex-1 h-11 bg-gray-100 rounded-xl"></div>
      <div className="flex-1 h-11 bg-gray-100 rounded-xl"></div>
    </div>
  </div>
);

const RelatedProductSkeleton = () => (
  <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow animate-pulse">
    <div className="aspect-square sm:aspect-[3/4] bg-gray-100"></div>
    <div className="p-2 sm:p-3 space-y-1.5 sm:space-y-2">
      <div className="h-3 bg-gray-100 rounded w-3/4"></div>
      <div className="h-3.5 sm:h-4 bg-gray-100 rounded w-1/2"></div>
      <div className="h-2.5 sm:h-3 bg-gray-100 rounded w-2/3"></div>
    </div>
  </div>
);

const ReviewSkeleton = () => (
  <div className="border-b border-gray-100 pb-4 sm:pb-5 animate-pulse">
    <div className="flex gap-1 mb-2">
      {[1, 2, 3, 4, 5].map((i) => (
        <div
          key={i}
          className="w-3 h-3 sm:w-4 sm:h-4 bg-gray-100 rounded"
        ></div>
      ))}
    </div>
    <div className="space-y-2 mb-3">
      <div className="h-3 bg-gray-100 rounded w-full"></div>
      <div className="h-3 bg-gray-100 rounded w-5/6"></div>
    </div>
    <div className="h-2.5 bg-gray-100 rounded w-32 mb-3"></div>
    <div className="flex items-center gap-2">
      <div className="w-6 h-6 sm:w-7 sm:h-7 bg-gray-100 rounded-full"></div>
      <div className="h-3 bg-gray-100 rounded w-24 sm:w-28"></div>
    </div>
  </div>
);

// ============================================
// MOBILE-FRIENDLY IMAGE GALLERY MODAL - OPTIMIZED
// ============================================
const GalleryModal = ({ images, onClose, initialIndex = 0 }) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") prevImage();
      if (e.key === "ArrowRight") nextImage();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
    setImageLoaded(false);
    setImageError(false);
  };

  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
    setImageLoaded(false);
    setImageError(false);
  };

  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      nextImage();
    } else if (isRightSwipe) {
      prevImage();
    }

    setTouchStart(null);
    setTouchEnd(null);
  };

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  const handleImageError = () => {
    setImageError(true);
  };

  const downloadImage = () => {
    const link = document.createElement("a");
    link.href = images[currentIndex].url;
    link.download = `product-review-${currentIndex + 1}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (!images || images.length === 0) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-2 sm:p-4">
      <div
        className="absolute inset-0 bg-black/95 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="relative z-10 w-full max-w-6xl max-h-[90vh]">
        <button
          onClick={onClose}
          className="absolute -top-10 sm:-top-12 right-2 sm:right-0 text-white hover:text-gray-300 p-2 transition-colors z-20"
        >
          <X className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>

        <div
          className="relative bg-black rounded-lg sm:rounded-xl overflow-hidden"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div className="w-full h-[60vh] sm:h-[70vh] flex items-center justify-center p-2">
            {!imageError ? (
              <>
                {!imageLoaded && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-8 h-8 sm:w-12 sm:h-12 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  </div>
                )}
                <img
                  src={images[currentIndex].url}
                  alt={`Review image ${currentIndex + 1}`}
                  className={`max-w-full max-h-full object-contain transition-opacity duration-300 ${
                    imageLoaded ? "opacity-100" : "opacity-0"
                  }`}
                  loading="lazy"
                  decoding="async"
                  onLoad={handleImageLoad}
                  onError={handleImageError}
                  style={{
                    imageRendering: "crisp-edges",
                    WebkitUserSelect: "none",
                    userSelect: "none",
                    maxHeight: "100%",
                    maxWidth: "100%",
                    width: "auto",
                    height: "auto",
                  }}
                />
              </>
            ) : (
              <div className="text-center p-4">
                <AlertCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-300 text-sm sm:text-base">
                  Failed to load image
                </p>
              </div>
            )}
          </div>

          {images.length > 1 && (
            <>
              <button
                onClick={prevImage}
                className="hidden sm:block absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black/80 text-white p-2 sm:p-3 rounded-full backdrop-blur-sm transition-all hover:scale-110 z-10"
              >
                <ChevronLeft className="w-4 h-4 sm:w-6 sm:h-6" />
              </button>
              <button
                onClick={nextImage}
                className="hidden sm:block absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black/80 text-white p-2 sm:p-3 rounded-full backdrop-blur-sm transition-all hover:scale-110 z-10"
              >
                <ChevronRight className="w-4 h-4 sm:w-6 sm:h-6" />
              </button>
            </>
          )}

          {images.length > 1 && (
            <div className="absolute bottom-2 sm:bottom-4 left-1/2 -translate-x-1/2 bg-black/60 backdrop-blur-sm text-white px-3 py-1 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-medium z-10">
              {currentIndex + 1} / {images.length}
            </div>
          )}

          {images.length > 1 && (
            <div className="sm:hidden absolute bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-1 text-white/70 text-xs z-10">
              <ChevronLeft className="w-3 h-3" />
              <span>Swipe to navigate</span>
              <ChevronRight className="w-3 h-3" />
            </div>
          )}
        </div>

        <div className="mt-4 sm:mt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-0">
          <div className="text-white text-xs sm:text-sm text-center sm:text-left">
            <span className="text-gray-400">Shared by customer</span>
          </div>

          <div className="flex items-center justify-center gap-2">
            <button
              onClick={downloadImage}
              className="flex items-center gap-1.5 sm:gap-2 bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg transition-colors text-xs sm:text-sm"
            >
              <Download className="w-3 h-3 sm:w-4 sm:h-4" />
              <span>Save</span>
            </button>
          </div>
        </div>

        {images.length > 1 && (
          <div className="mt-4 flex gap-1.5 sm:gap-2 overflow-x-auto pb-1">
            {images.map((image, index) => (
              <button
                key={index}
                onClick={() => {
                  setCurrentIndex(index);
                  setImageLoaded(false);
                  setImageError(false);
                }}
                className={`flex-shrink-0 w-12 h-12 sm:w-16 sm:h-16 rounded-lg overflow-hidden border-2 transition-all ${
                  currentIndex === index
                    ? "border-white scale-105"
                    : "border-white/30 hover:border-white/60"
                }`}
              >
                <img
                  src={image.url}
                  alt={`Thumbnail ${index + 1}`}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

// ============================================
// MOBILE-FRIENDLY REVIEW CARD - OPTIMIZED
// ============================================
const ReviewCard = ({ review, onImageClick }) => {
  const [expanded, setExpanded] = useState(false);
  const MAX_LENGTH = 120;

  const formattedDate = new Date(review.createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <div className="p-4 sm:p-6 hover:bg-gray-50/50 transition-colors border-b border-gray-100 last:border-b-0">
      <div className="flex gap-3 sm:gap-4">
        <div className="flex-shrink-0">
          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-blue-100 to-blue-50 flex items-center justify-center border border-blue-200">
            <span className="text-sm sm:text-lg font-semibold text-blue-700">
              {review.user?.name?.charAt(0) || "A"}
            </span>
          </div>
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-1.5 sm:gap-2 mb-2 sm:mb-3">
            <div className="space-y-1">
              <div className="flex items-center gap-1.5 sm:gap-2">
                <h4 className="font-semibold text-gray-900 text-sm sm:text-base truncate">
                  {review.user?.name || "Anonymous Customer"}
                </h4>
                <div className="flex items-center flex-shrink-0">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`w-3 h-3 sm:w-4 sm:h-4 ${
                        star <= review.rating
                          ? "fill-yellow-400 text-yellow-400"
                          : "text-gray-200"
                      }`}
                    />
                  ))}
                </div>
              </div>
              <div className="text-xs text-gray-500">{formattedDate}</div>
            </div>

            <div className="flex items-center gap-1 text-[10px] sm:text-xs text-green-600 bg-green-50 px-1.5 py-0.5 sm:px-2 sm:py-1 rounded-full self-start">
              <CheckCircle2 className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
              <span>Verified</span>
            </div>
          </div>

          <div className="mb-3 sm:mb-4">
            <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
              {review.reviewText &&
              review.reviewText.length > MAX_LENGTH &&
              !expanded
                ? `${review.reviewText.substring(0, MAX_LENGTH)}... `
                : review.reviewText}
              {review.reviewText && review.reviewText.length > MAX_LENGTH && (
                <button
                  onClick={() => setExpanded(!expanded)}
                  className="text-blue-600 hover:text-blue-800 font-medium text-xs sm:text-sm ml-1"
                >
                  {expanded ? "Show less" : "Read more"}
                </button>
              )}
            </p>
          </div>

          {review.media && review.media.length > 0 && (
            <div className="mb-3 sm:mb-4">
              <div className="flex gap-1.5 sm:gap-2 overflow-x-auto pb-1 sm:pb-2">
                {review.media.map((mediaItem, idx) => (
                  <button
                    key={mediaItem.id || idx}
                    onClick={() =>
                      onImageClick && onImageClick(review.media, idx)
                    }
                    className="flex-shrink-0 w-20 h-20 sm:w-24 sm:h-24 rounded-lg overflow-hidden border border-gray-200 hover:border-blue-400 transition-all group relative bg-white"
                  >
                    {mediaItem.type === "image" ? (
                      <>
                        <img
                          src={mediaItem.url}
                          alt="Review"
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          loading="lazy"
                          style={{
                            minWidth: "100%",
                            minHeight: "100%",
                          }}
                          onError={(e) => {
                            e.currentTarget.style.display = "none";
                            e.currentTarget.parentElement.innerHTML = `
                              <div class="w-full h-full flex items-center justify-center bg-gray-100">
                                <svg class="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                                  <path fill-rule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clip-rule="evenodd"/>
                                </svg>
                              </div>
                            `;
                          }}
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
                      </>
                    ) : (
                      <div className="w-full h-full bg-gray-900 flex items-center justify-center">
                        <svg
                          className="w-6 h-6 sm:w-8 sm:h-8 text-white"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" />
                        </svg>
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// ============================================
// MOBILE-FRIENDLY CUSTOMER PHOTOS GALLERY - OPTIMIZED
// ============================================
const CustomerPhotosGallery = ({ reviews, onImageClick }) => {
  const allReviewImages = reviews.flatMap(
    (review) => review.media?.filter((m) => m.type === "image") || []
  );

  if (allReviewImages.length === 0) return null;

  return (
    <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm border border-gray-100">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-0 mb-3 sm:mb-4">
        <div>
          <h3 className="text-base sm:text-lg font-semibold text-gray-900">
            Customer Photos
          </h3>
          <p className="text-xs sm:text-sm text-gray-500">
            See how it looks in real life
          </p>
        </div>
        <div className="text-xs sm:text-sm text-blue-600 font-medium">
          {allReviewImages.length} photos
        </div>
      </div>
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-2 sm:gap-3">
        {allReviewImages.slice(0, 6).map((image, index) => (
          <button
            key={`${image.id}-${index}`}
            onClick={() => onImageClick && onImageClick(allReviewImages, index)}
            className="aspect-square rounded-lg overflow-hidden border border-gray-200 hover:border-blue-400 transition-all group relative bg-white"
          >
            <img
              src={image.url}
              alt="Customer photo"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              loading="lazy"
              style={{
                minWidth: "100%",
                minHeight: "100%",
              }}
              onError={(e) => {
                e.currentTarget.style.display = "none";
                e.currentTarget.parentElement.innerHTML = `
                  <div class="w-full h-full flex items-center justify-center bg-gray-100">
                    <svg class="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clip-rule="evenodd"/>
                    </svg>
                  </div>
                `;
              }}
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <Eye className="w-4 h-4 sm:w-6 sm:h-6 text-white drop-shadow-lg" />
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

// ============================================
// MOBILE-FRIENDLY SOCIAL SHARE MODAL
// ============================================
const SocialShareModal = ({
  isOpen,
  onClose,
  productUrl,
  productName,
  productImage,
}) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const shareUrl = productUrl || window.location.href;
  const shareText = `Check out this amazing product: ${productName}`;
  const encodedUrl = encodeURIComponent(shareUrl);
  const encodedText = encodeURIComponent(shareText);

  const socialPlatforms = [
    {
      name: "Facebook",
      icon: <FaFacebookF className="w-4 h-4 sm:w-5 sm:h-5" />,
      color: "bg-blue-600 hover:bg-blue-700",
      action: () =>
        window.open(
          `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
          "_blank"
        ),
    },
    {
      name: "WhatsApp",
      icon: <FaWhatsapp className="w-4 h-4 sm:w-5 sm:h-5" />,
      color: "bg-green-500 hover:bg-green-600",
      action: () =>
        window.open(
          `https://wa.me/?text=${encodedText}%20${encodedUrl}`,
          "_blank"
        ),
    },
    {
      name: "Twitter",
      icon: <FaTwitter className="w-4 h-4 sm:w-5 sm:h-5" />,
      color: "bg-sky-500 hover:bg-sky-600",
      action: () =>
        window.open(
          `https://twitter.com/intent/tweet?text=${encodedText}&url=${encodedUrl}`,
          "_blank"
        ),
    },
    {
      name: "Copy Link",
      icon: <Copy className="w-4 h-4 sm:w-5 sm:h-5" />,
      color: copied ? "bg-green-500" : "bg-gray-700 hover:bg-gray-800",
      action: async () => {
        try {
          await navigator.clipboard.writeText(shareUrl);
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
        } catch (err) {
          const textField = document.createElement("textarea");
          textField.value = shareUrl;
          document.body.appendChild(textField);
          textField.select();
          document.execCommand("copy");
          document.body.removeChild(textField);
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
        }
      },
    },
  ];

  return (
    <>
      <div
        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 transition-opacity"
        onClick={onClose}
      />
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4">
        <div className="bg-white rounded-xl sm:rounded-2xl max-w-md w-full mx-2 sm:mx-4 shadow-2xl animate-scale-in">
          <div className="px-4 sm:px-6 py-3 sm:py-4 flex justify-between items-center">
            <div>
              <h3 className="text-base sm:text-lg font-semibold text-gray-900">
                Share Product
              </h3>
              <p className="text-xs sm:text-sm text-gray-500">
                Share with friends
              </p>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors p-1 hover:bg-gray-100 rounded-lg"
            >
              <X className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </div>

          <div className="px-4 sm:px-6 pb-4 sm:pb-6">
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 sm:gap-3 mb-4 sm:mb-6">
              {socialPlatforms.map((platform) => (
                <button
                  key={platform.name}
                  onClick={platform.action}
                  className={`flex flex-col items-center justify-center p-3 ${platform.color} text-white rounded-lg transition-all active:scale-95 sm:hover:scale-105`}
                >
                  {platform.icon}
                  <span className="text-xs mt-1.5">{platform.name}</span>
                </button>
              ))}
            </div>

            <div className="pt-4 border-t border-gray-100">
              <p className="text-sm font-medium text-gray-700 mb-2">
                Share link
              </p>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={shareUrl}
                  readOnly
                  className="flex-1 px-3 py-2 border border-gray-200 rounded-lg bg-gray-50 text-xs sm:text-sm text-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
                <button
                  onClick={socialPlatforms[3].action}
                  className={`px-3 sm:px-4 py-2 rounded-lg font-medium transition-all ${
                    copied ? "bg-green-500" : "bg-gray-900 hover:bg-gray-800"
                  } text-white text-sm`}
                >
                  {copied ? (
                    <Check className="w-4 h-4" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

// ============================================
// MOBILE-FRIENDLY RATING MODAL - FIXED VERSION
// ============================================
const RatingModal = ({
  isOpen,
  onClose,
  productName,
  productId,
  onReviewSubmitted,
}) => {
  const [uploadedImages, setUploadedImages] = useState([]);
  const [isDragging, setIsDragging] = useState(false);
  const [hoverRating, setHoverRating] = useState(0);
  const user = useAppSelector(selectUser);
  const userId = user?.id || null;
  const router = useRouter();

  const submitReviewMutation = useSubmitReview();

  const {
    register,
    handleSubmit,
    control,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      rating: 0,
      reviewText: "",
      images: [],
    },
  });

  const userRating = watch("rating");
  const reviewText = watch("reviewText");
  const isSubmitting = submitReviewMutation.isLoading;

  if (!isOpen) return null;

  const getRatingLabel = (rating) => {
    const labels = ["", "Poor", "Fair", "Good", "Very Good", "Excellent"];
    return labels[rating];
  };

  const handleFileSelect = (e) => {
    const files = Array.from(e.target.files || []);
    handleFiles(files);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const files = Array.from(e.dataTransfer.files);
    handleFiles(files);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleFiles = (files) => {
    const imageFiles = files.filter((file) => file.type.startsWith("image/"));
    const remainingSlots = 3 - uploadedImages.length;
    const filesToAdd = imageFiles.slice(0, remainingSlots);

    filesToAdd.forEach((file) => {
      if (file.size > 5 * 1024 * 1024) {
        toast.error(`${file.name} exceeds 5MB limit`);
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        const newImage = {
          id: Date.now() + Math.random(),
          file: file,
          preview: e.target.result,
          name: file.name,
        };
        setUploadedImages((prev) => [...prev, newImage]);
      };
      reader.readAsDataURL(file);
    });

    if (filesToAdd.length < imageFiles.length) {
      toast.error("Maximum 3 images allowed");
    }
  };

  const removeImage = (id) => {
    setUploadedImages((prev) => prev.filter((img) => img.id !== id));
  };

  const onSubmit = async (data) => {
    if (data.rating === 0) {
      toast.error("Please provide a rating");
      return;
    }

    if (data.reviewText.trim() === "") {
      toast.error("Please write your review");
      return;
    }

    if (!userId) {
      toast.error("Please login to submit a review");
      router.push("/login");

      return;
    }

    try {
      console.log("Submitting review with data:", {
        productId,
        userId,
        rating: data.rating,
        reviewText: data.reviewText,
        media: uploadedImages,
      });

      await submitReviewMutation.mutateAsync({
        productId: productId,
        userId: userId,
        rating: data.rating,
        reviewText: data.reviewText,
        media: uploadedImages,
      });

      // Clear form
      reset();
      setUploadedImages([]);

      // Notify parent to refresh reviews
      if (onReviewSubmitted) {
        onReviewSubmitted();
      }

      // Close modal
      onClose();
    } catch (error) {
      console.error("Review submission error in onSubmit:", error);
      // Error toast is already shown in the mutation
    }
  };

  const handleClose = () => {
    reset();
    setUploadedImages([]);
    onClose();
  };

  return (
    <>
      <div
        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50"
        onClick={handleClose}
      />
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4">
        <div className="bg-white rounded-xl sm:rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto shadow-2xl mx-2 sm:mx-0">
          <div className="sticky top-0 bg-white border-b border-gray-100 px-4 sm:px-6 py-3 sm:py-4">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-base sm:text-lg font-semibold text-gray-900">
                  Write a Review
                </h3>
                <p className="text-xs sm:text-sm text-gray-500">
                  Share your experience
                </p>
              </div>
              <button
                onClick={handleClose}
                className="text-gray-400 hover:text-gray-600 p-1 hover:bg-gray-100 rounded-lg"
              >
                <X className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            </div>
          </div>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="px-4 sm:px-6 py-4 sm:py-5 space-y-4 sm:space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 sm:mb-3">
                  Your Rating *
                </label>
                <Controller
                  name="rating"
                  control={control}
                  rules={{ required: true, min: 1 }}
                  render={({ field: { onChange, value } }) => (
                    <div className="flex justify-center space-x-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => onChange(star)}
                          onMouseEnter={() => setHoverRating(star)}
                          onMouseLeave={() => setHoverRating(0)}
                          className="p-0.5 sm:p-1 transition-transform active:scale-110"
                        >
                          <Star
                            className={`w-7 h-7 sm:w-8 sm:h-8 ${
                              star <= (hoverRating || value)
                                ? "fill-yellow-400 text-yellow-400"
                                : "text-gray-300"
                            }`}
                          />
                        </button>
                      ))}
                    </div>
                  )}
                />
                {userRating > 0 && (
                  <p className="text-center mt-2 text-sm font-medium text-gray-700">
                    {getRatingLabel(userRating)}
                  </p>
                )}
                {errors.rating && (
                  <p className="text-center mt-1 text-xs text-red-600">
                    Please select a rating
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Your Review *
                </label>
                <textarea
                  {...register("reviewText", {
                    required: "Review is required",
                    maxLength: 500,
                  })}
                  placeholder="Share your experience with this product..."
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 resize-none text-sm sm:text-base"
                  rows="4"
                />
                <div className="flex justify-between mt-1.5">
                  {errors.reviewText ? (
                    <p className="text-xs text-red-600">
                      {errors.reviewText.message}
                    </p>
                  ) : (
                    <p className="text-xs text-gray-500">
                      Be honest and specific
                    </p>
                  )}
                  <p
                    className={`text-xs ${
                      reviewText.length > 450 ? "text-red-500" : "text-gray-500"
                    }`}
                  >
                    {reviewText.length}/500
                  </p>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Add Photos (Optional)
                </label>
                <p className="text-xs text-gray-500 mb-3">
                  Up to 3 photos, 5MB each
                </p>

                {uploadedImages.length > 0 && (
                  <div className="grid grid-cols-3 gap-2 mb-3">
                    {uploadedImages.map((image) => (
                      <div
                        key={image.id}
                        className="relative aspect-square rounded-lg overflow-hidden border border-gray-200"
                      >
                        <img
                          src={image.preview}
                          alt="Preview"
                          className="w-full h-full object-cover"
                        />
                        <button
                          type="button"
                          onClick={() => removeImage(image.id)}
                          className="absolute top-1 right-1 bg-red-500 text-white p-0.5 rounded-full hover:bg-red-600"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                {uploadedImages.length < 3 && (
                  <div
                    onDrop={handleDrop}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    className={`border-2 border-dashed rounded-lg p-4 sm:p-6 text-center cursor-pointer transition-colors ${
                      isDragging
                        ? "border-blue-500 bg-blue-50"
                        : "border-gray-300 hover:border-gray-400"
                    }`}
                  >
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={handleFileSelect}
                      className="hidden"
                      id="image-upload"
                    />
                    <label htmlFor="image-upload" className="cursor-pointer">
                      <ImageIcon className="w-6 h-6 sm:w-8 sm:h-8 text-gray-400 mx-auto mb-2" />
                      <p className="text-sm text-gray-600">Tap to upload</p>
                      <p className="text-xs text-gray-500 mt-1">
                        PNG, JPG up to 5MB
                      </p>
                    </label>
                  </div>
                )}
              </div>

              <div className="bg-blue-50 border border-blue-100 rounded-lg p-3">
                <h4 className="text-xs font-medium text-blue-900 mb-1">
                  💡 Tips for a great review
                </h4>
                <ul className="text-xs text-blue-800 space-y-0.5">
                  <li>• Be specific about what you liked or didn't like</li>
                  <li>• Mention quality, fit, and value for money</li>
                  <li>• Upload clear photos showing the product</li>
                </ul>
              </div>
            </div>

            <div className="sticky bottom-0 bg-gray-50 border-t border-gray-100 px-4 sm:px-6 py-3 sm:py-4">
              <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                <button
                  type="button"
                  onClick={handleClose}
                  disabled={isSubmitting}
                  className="px-4 py-2.5 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 text-sm sm:text-base"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-4 py-2.5 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 disabled:bg-gray-400 text-sm sm:text-base flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    "Submit Review"
                  )}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

// ============================================
// MOBILE-FRIENDLY BENEFITS BADGES
// ============================================
const BenefitsBadges = () => (
  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 mb-6">
    <div className="bg-white p-3 rounded-lg border border-gray-200 flex items-center gap-2">
      <div className="p-1.5 bg-blue-100 rounded-lg">
        <Truck className="w-4 h-4 text-blue-600" />
      </div>
      <div>
        <p className="text-xs font-medium text-gray-900">Free Delivery</p>
        <p className="text-[10px] text-gray-500">Over ₹999</p>
      </div>
    </div>

    <div className="bg-white p-3 rounded-lg border border-gray-200 flex items-center gap-2">
      <div className="p-1.5 bg-green-100 rounded-lg">
        <CheckCircle2 className="w-4 h-4 text-green-600" />
      </div>
      <div>
        <p className="text-xs font-medium text-gray-900">30-Day Returns</p>
        <p className="text-[10px] text-gray-500">Easy returns</p>
      </div>
    </div>

    <div className="bg-white p-3 rounded-lg border border-gray-200 flex items-center gap-2">
      <div className="p-1.5 bg-amber-100 rounded-lg">
        <Shield className="w-4 h-4 text-amber-600" />
      </div>
      {/* <div>
        <p className="text-xs font-medium text-gray-900">1 Year Warranty</p>
        <p className="text-[10px] text-gray-500">Full coverage</p>
      </div> */}
    </div>

    <div className="bg-white p-3 rounded-lg border border-gray-200 flex items-center gap-2">
      <div className="p-1.5 bg-purple-100 rounded-lg">
        <Package className="w-4 h-4 text-purple-600" />
      </div>
      <div>
        <p className="text-xs font-medium text-gray-900">Fast Shipping</p>
        <p className="text-[10px] text-gray-500">2-4 days</p>
      </div>
    </div>
  </div>
);

// ============================================
// MAIN PRODUCT PAGE COMPONENT - OPTIMIZED FOR LARGE IMAGES
// ============================================
const ProductPage = () => {
  const { slug } = useParams();
  const dispatch = useAppDispatch();
  const searchParams = useSearchParams();
  const router = useRouter();
  const user = useAppSelector(selectUser);

  const isPromotion = searchParams.get("isPromotion") === "true";

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedSizeVariant, setSelectedSizeVariant] = useState({});
  const [selectedColor, setSelectedColor] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [productMedia, setProductMedia] = useState([]);
  const [showRatingModal, setShowRatingModal] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [showGalleryModal, setShowGalleryModal] = useState(false);
  const [galleryImages, setGalleryImages] = useState([]);
  const [galleryStartIndex, setGalleryStartIndex] = useState(0);
  const [activeReviewTab, setActiveReviewTab] = useState("all");
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [mainImageLoaded, setMainImageLoaded] = useState(false);
  const [showSizeChart, setShowSizeChart] = useState(false); // Added state for size chart

  const [reviews, setReviews] = useState([]);
  const [totalReviews, setTotalReviews] = useState(0);
  const [averageRating, setAverageRating] = useState(0);
  const [reviewCounts, setReviewCounts] = useState({
    5: 0,
    4: 0,
    3: 0,
    2: 0,
    1: 0,
  });

  const {
    isError: isRelatedProductError,
    isLoading: isRelatedProductLoading,
    data: relatedProductListData,
    mutate: mutateRelatedProductList,
  } = useProductList();

  const {
    data: productData,
    isLoading: isProductLoading,
    isError: isProductError,
    mutate: mutateProduct,
  } = useGetProductById();

  const { data: ProductReviewData, mutate: mutateProductReview } =
    useListProductwiseReviews();

  const calculateRatingStats = useCallback((items) => {
    if (!items || items.length === 0)
      return { average: 0, counts: { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 } };

    const totalRating = items.reduce((sum, review) => sum + review.rating, 0);
    const avg = Number((totalRating / items.length).toFixed(1));

    const counts = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
    items.forEach((review) => counts[review.rating]++);

    return { average: avg, counts };
  }, []);

  // Process reviews data
  useEffect(() => {
    if (
      ProductReviewData?.status === "success" &&
      ProductReviewData.data?.items
    ) {
      const items = ProductReviewData.data.items;
      setReviews(items);
      setTotalReviews(ProductReviewData.data.total || 0);
      const stats = calculateRatingStats(items);
      setAverageRating(stats.average);
      setReviewCounts(stats.counts);
    } else {
      setReviews([]);
      setTotalReviews(0);
      setAverageRating(0);
      setReviewCounts({ 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 });
    }
  }, [ProductReviewData, calculateRatingStats]);

  const filteredReviews = React.useMemo(() => {
    if (activeReviewTab === "all") return reviews;
    return reviews.filter((review) => {
      if (activeReviewTab === "media") {
        return review.media && review.media.length > 0;
      }
      if (activeReviewTab === "top") {
        return review.rating >= 4;
      }
      return true;
    });
  }, [reviews, activeReviewTab]);

  // Load related products
  useEffect(() => {
    if (product?.category?.name) {
      try {
        const payload = {
          filters: [
            { fieldname: "isVisible", filterType: "equal", value: true },
            {
              fieldname: "category.name",
              filterType: "equal",
              value: product.category.name,
            },
            { fieldname: "isFeatured", sort: 1 },
          ],
          globalSearch: "",
          page: 1,
          limit: 4,
        };
        mutateRelatedProductList(payload);
      } catch (error) {
        console.error("Error loading related products:", error);
      }
    }
  }, [product?.category?.name, mutateRelatedProductList]);

  // Process related products data
  useEffect(() => {
    if (relatedProductListData?.data?.data) {
      const products = relatedProductListData.data.data;
      if (Array.isArray(products)) {
        const filteredProducts = products.filter((p) => p.id !== product?.id);
        setRelatedProducts(filteredProducts.slice(0, 4));
      }
    }
  }, [relatedProductListData, product?.id]);

  const getPrimaryImage = (product) => {
    try {
      if (product?.colors?.[0]?.images) {
        const primaryImage = product.colors[0].images.find((i) => i?.isPrimary);
        return primaryImage?.url || product.colors[0].images[0]?.url || "";
      }
      return "https://via.placeholder.com/300x400?text=No+Image";
    } catch (error) {
      return "https://via.placeholder.com/300x400?text=No+Image";
    }
  };

  // Handle product data
  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      setError(null);

      try {
        await mutateProduct({
          productId: slug,
        });
      } catch (err) {
        setError("Failed to load product");
        console.error("Error fetching product:", err);
        setLoading(false);
      }
    };

    if (slug) {
      fetchProduct();
    }
  }, [slug, mutateProduct]);

  // Process product data when received
  useEffect(() => {
    if (productData) {
      if (productData.status === "success" && productData.data) {
        const product = productData.data;
        setProduct(product);

        if (product.colors && product.colors.length > 0) {
          const firstColor = product.colors[0];
          setSelectedColor(firstColor);

          if (firstColor.images && firstColor.images.length > 0) {
            const media = firstColor.images.map((img) => ({
              type:
                img.url.includes(".mp4") || img.type === "video"
                  ? "video"
                  : "image",
              url: img.url,
            }));
            setProductMedia(media);
          }

          if (firstColor.sizeVariants && firstColor.sizeVariants.length > 0) {
            const inStockSize = firstColor.sizeVariants.find(
              (sv) => sv.availableStock > 0
            );
            if (inStockSize) {
              setSelectedSize(inStockSize.size);
              setSelectedSizeVariant(inStockSize);
            }
          }
        }
      } else {
        setError("Product data not found in response");
      }
      setLoading(false);
    }

    if (isProductError) {
      setError("Failed to load product");
      setLoading(false);
    }
  }, [productData, isProductError]);

  // Fetch reviews
  useEffect(() => {
    if (slug) {
      mutateProductReview({ productId: slug });
    }
  }, [slug, mutateProductReview]);

  const refreshReviews = useCallback(() => {
    if (slug) {
      mutateProductReview({ productId: slug });
    }
  }, [slug, mutateProductReview]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % productMedia.length);
    setMainImageLoaded(false);
  };

  const prevSlide = () => {
    setCurrentSlide(
      (prev) => (prev - 1 + productMedia.length) % productMedia.length
    );
    setMainImageLoaded(false);
  };

  const handleColorChange = (color) => {
    setSelectedColor(color);
    setMainImageLoaded(false);

    if (color.images && color.images.length > 0) {
      const media = color.images.map((img) => ({
        type:
          img.url.includes(".mp4") || img.type === "video" ? "video" : "image",
        url: img.url,
      }));
      setProductMedia(media);
      setCurrentSlide(0);
    }

    if (color.sizeVariants && color.sizeVariants.length > 0) {
      const inStockSize = color.sizeVariants.find(
        (sv) => sv.availableStock > 0
      );
      if (inStockSize) {
        setSelectedSize(inStockSize.size);
        setSelectedSizeVariant(inStockSize);
      } else {
        setSelectedSize("");
        setSelectedSizeVariant({});
      }
    } else {
      setSelectedSize("");
      setSelectedSizeVariant({});
    }
  };

  const handleSizeClick = (sizeVariant) => {
    if (sizeVariant.availableStock === 0) {
      toast.error(`Size ${sizeVariant.size} is out of stock`);
      return;
    }

    setSelectedSize(sizeVariant.size);
    setSelectedSizeVariant(sizeVariant);
  };

  // Helper function to get current price based on size variant
  const getCurrentPrice = () => {
    if (isPromotion) return 0;
    if (selectedSizeVariant && selectedSizeVariant.price) {
      return selectedSizeVariant.price;
    }
    return product?.basePrice || 0;
  };

  const getCurrentOriginalPrice = () => {
    if (isPromotion) return product?.basePrice || 0;
    return product?.originalPrice || (product?.basePrice || 0) * 1.5;
  };

  const displayPrice = getCurrentPrice();
  const displayOriginalPrice = getCurrentOriginalPrice();

  const discountPercentage = isPromotion
    ? 100
    : Math.round(
        ((displayOriginalPrice - displayPrice) / displayOriginalPrice) * 100
      );

  const handleAddToCart = () => {
    if (!product || !selectedColor || !selectedSize) {
      toast.error("Please select color and size");
      return;
    }

    if (!selectedSizeVariant || selectedSizeVariant.availableStock === 0) {
      toast.error("This item is out of stock");
      return;
    }

    const finalPrice = isPromotion ? 0 : parseFloat(displayPrice);

    const cartObject = {
      productId: product.id,
      product_id: product.product_id,
      productName: product.name,
      colorId: selectedColor.id,
      colorName: selectedColor.color_name,
      colorCode: selectedColor.color_code,
      sizeVariantId: selectedSizeVariant.id,
      sizevariant_id: selectedSizeVariant.product_size_var_id,
      size: selectedSize,
      quantity: 1,
      price: finalPrice,
      sizeVariantPrice: selectedSizeVariant.price,
      sku: selectedSizeVariant.sku,
      image: selectedColor.images?.[0]?.url || "",
      availableStock: selectedSizeVariant.availableStock,
      timestamp: new Date().toISOString(),
      isPromotion: isPromotion,
    };

    dispatch(addToCart(cartObject));
    toast.success(`Added to cart!`);
  };

  const toggleWishlist = () => {
    if (!user) {
      toast.error("Please login to add to wishlist");
      return;
    }
    setIsWishlisted(!isWishlisted);
    toast.success(
      !isWishlisted ? "Added to wishlist" : "Removed from wishlist"
    );
  };

  const handleOpenGallery = (images, startIndex = 0) => {
    setGalleryImages(images);
    setGalleryStartIndex(startIndex);
    setShowGalleryModal(true);
  };

  const reviewTabs = [
    { id: "all", label: "All", count: totalReviews },
    {
      id: "media",
      label: "Photos",
      count: reviews.filter((r) => r.media?.length > 0).length,
    },
    {
      id: "top",
      label: "Top Rated",
      count: reviews.filter((r) => r.rating >= 4).length,
    },
  ];

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
        <div className="h-3 bg-gray-100 rounded w-32 mb-4 sm:mb-6 animate-pulse"></div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 xl:gap-12 mb-8 sm:mb-12">
          <div className="space-y-2 sm:space-y-3">
            <ImageSkeleton />
            <ThumbnailSkeleton />
          </div>
          <ProductDetailsSkeleton />
        </div>

        <div className="mb-8 sm:mb-12">
          <div className="h-5 sm:h-6 bg-gray-100 rounded w-32 mb-4 sm:mb-6 animate-pulse"></div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
            {[1, 2, 3, 4].map((i) => (
              <RelatedProductSkeleton key={i} />
            ))}
          </div>
        </div>

        <div>
          <div className="h-5 sm:h-6 bg-gray-100 rounded w-32 mb-4 sm:mb-6 animate-pulse"></div>
          <div className="bg-white p-3 sm:p-5 rounded-xl space-y-4 sm:space-y-5 animate-pulse">
            {[1, 2].map((i) => (
              <ReviewSkeleton key={i} />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center p-4">
        <div className="text-center max-w-sm">
          <AlertCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h2 className="text-lg font-semibold text-gray-900 mb-2">
            Product Not Found
          </h2>
          <p className="text-gray-600 mb-6">
            {error || "Unable to load product details"}
          </p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-gray-900 text-white rounded-lg font-medium hover:bg-gray-800 text-sm"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  const allSizes = selectedColor?.sizeVariants || [];
  const hasInStockSizes = allSizes.some((sv) => sv.availableStock > 0);

  return (
    <>
      <div className="max-w-7xl pt-16 mb-14 mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
        <div className="text-xs text-gray-500 mb-4 sm:mb-6 flex items-center overflow-x-auto pb-1">
          <button
            onClick={() => router.push("/")}
            className="hover:text-gray-900 whitespace-nowrap"
          >
            Home
          </button>
          <ChevronRight className="w-3 h-3 mx-1 sm:mx-2 flex-shrink-0" />
          <button
            onClick={() => router.push("/shop")}
            className="hover:text-gray-900 whitespace-nowrap"
          >
            Shop
          </button>
          <ChevronRight className="w-3 h-3 mx-1 sm:mx-2 flex-shrink-0" />
          <span className="text-gray-900 truncate max-w-[150px] sm:max-w-none">
            {product.name}
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 xl:gap-12 mb-8 sm:mb-12">
          <div>
            <div className="relative bg-white rounded-xl overflow-hidden aspect-square sm:aspect-[3/4] mb-2 sm:mb-3 border border-gray-200">
              {productMedia.length > 0 ? (
                productMedia[currentSlide].type === "image" ? (
                  <div className="relative w-full h-full flex items-center justify-center bg-white">
                    {!mainImageLoaded && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-8 h-8 sm:w-12 sm:h-12 border-2 border-gray-300 border-t-transparent rounded-full animate-spin"></div>
                      </div>
                    )}
                    <img
                      src={productMedia[currentSlide].url}
                      alt="Product"
                      className={`max-w-full max-h-full object-contain transition-opacity duration-300 ${
                        mainImageLoaded ? "opacity-100" : "opacity-0"
                      }`}
                      loading="eager"
                      decoding="async"
                      onLoad={() => setMainImageLoaded(true)}
                      onError={(e) => {
                        e.currentTarget.src =
                          "https://via.placeholder.com/300x400?text=No+Image";
                        setMainImageLoaded(true);
                      }}
                      style={{
                        imageRendering: "crisp-edges",
                        WebkitUserDrag: "none",
                        WebkitUserSelect: "none",
                        userSelect: "none",
                        maxHeight: "100%",
                        maxWidth: "100%",
                        width: "auto",
                        height: "auto",
                      }}
                    />
                  </div>
                ) : (
                  <video
                    src={productMedia[currentSlide].url}
                    controls
                    className="w-full h-full object-contain bg-black"
                    autoPlay
                    loop
                    playsInline
                    preload="metadata"
                    style={{
                      maxHeight: "100%",
                      maxWidth: "100%",
                    }}
                  />
                )
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center bg-gray-100">
                  <ImageIcon className="w-12 h-12 text-gray-400 mb-2" />
                  <p className="text-gray-400 text-sm">No image available</p>
                </div>
              )}

              {productMedia.length > 1 && (
                <>
                  <button
                    onClick={prevSlide}
                    className="absolute left-2 sm:left-3 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-1.5 sm:p-2 rounded-full shadow border border-gray-200"
                  >
                    <ChevronLeft className="w-3 h-3 sm:w-4 sm:h-4" />
                  </button>
                  <button
                    onClick={nextSlide}
                    className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-1.5 sm:p-2 rounded-full shadow border border-gray-200"
                  >
                    <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4" />
                  </button>
                </>
              )}

              {discountPercentage > 0 && (
                <div className="absolute top-2 sm:top-3 left-2 sm:left-3 bg-red-500 text-white px-2 py-1 rounded-md text-xs font-semibold z-10">
                  -{discountPercentage}%
                </div>
              )}

              <div className="absolute top-2 sm:top-3 right-2 sm:right-3 flex flex-col gap-1.5 sm:gap-2 z-10">
                <button
                  onClick={() => setShowShareModal(true)}
                  className="bg-white p-1.5 sm:p-2 rounded-lg shadow hover:shadow-md border border-gray-200"
                >
                  <Share2 className="w-3 h-3 sm:w-4 sm:h-4" />
                </button>
                <button
                  onClick={toggleWishlist}
                  className={`p-1.5 sm:p-2 rounded-lg shadow hover:shadow-md border ${
                    isWishlisted
                      ? "bg-red-50 text-red-500 border-red-200"
                      : "bg-white text-gray-700 border-gray-200"
                  }`}
                >
                  {/* <Heart
                    className={`w-3 h-3 sm:w-4 sm:h-4 ${
                      isWishlisted ? "fill-red-500" : ""
                    }`}
                  /> */}
                </button>
              </div>
            </div>

            {productMedia.length > 1 && (
              <div className="flex space-x-1.5 sm:space-x-2 overflow-x-auto pb-1 pt-2">
                {productMedia.map((media, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setCurrentSlide(idx);
                      setMainImageLoaded(false);
                    }}
                    className={`flex-shrink-0 w-16 h-16 sm:w-20 sm:h-20 rounded-lg overflow-hidden border-2 transition-all ${
                      currentSlide === idx
                        ? "border-gray-900"
                        : "border-gray-200 hover:border-gray-400"
                    } bg-white flex items-center justify-center`}
                  >
                    {media.type === "image" ? (
                      <img
                        src={media.url}
                        alt={`Thumbnail ${idx + 1}`}
                        className="w-full h-full object-cover"
                        loading="lazy"
                        style={{
                          minWidth: "100%",
                          minHeight: "100%",
                        }}
                        onError={(e) => {
                          e.currentTarget.src =
                            "https://via.placeholder.com/100x100?text=Image";
                        }}
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-900 flex items-center justify-center">
                        <svg
                          className="w-6 h-6 sm:w-8 sm:h-8 text-white"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" />
                        </svg>
                      </div>
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div>
            <div className="text-xs sm:text-sm text-gray-500 mb-1">
              {product.category?.name || "Category"}
            </div>
            <h1 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">
              {product.name}
            </h1>

            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
              <div className="flex items-center">
                <span className="text-xl sm:text-2xl font-bold">
                  ₹{displayPrice}
                </span>
                {displayOriginalPrice > displayPrice && (
                  <span className="text-gray-400 line-through ml-2 text-sm">
                    ₹{displayOriginalPrice}
                  </span>
                )}
              </div>
              <div className="flex items-center text-xs sm:text-sm text-gray-600">
                <div className="flex items-center mr-2">
                  <Star className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-400 fill-current" />
                  <span className="font-medium ml-1">
                    {averageRating || 4.5}
                  </span>
                </div>
                <span>•</span>
                <span className="ml-2">{totalReviews || 0} reviews</span>
              </div>
            </div>

            {/* Show price variation notice when size variant price differs from base price */}

            {isPromotion && (
              <div className="mb-4 sm:mb-6 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-lg p-2 sm:p-3">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-green-600 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-green-800 text-sm sm:text-base">
                      🎉 Special Promotion!
                    </p>
                    <p className="text-xs sm:text-sm text-green-700">
                      This product is FREE for a limited time.
                    </p>
                  </div>
                </div>
              </div>
            )}

            <div className="mb-4 sm:mb-6">
              <h3 className="font-medium mb-2 text-sm sm:text-base">
                Description
              </h3>
              <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">
                {product.description || "No description available."}
              </p>
            </div>

            {product.colors && product.colors.length > 0 && (
              <div className="mb-4 sm:mb-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-sm sm:text-base">
                    Color
                  </span>
                  <span className="text-xs sm:text-sm text-gray-600">
                    {selectedColor?.color_name}
                  </span>
                </div>
                <div className="flex flex-wrap gap-1.5 sm:gap-2">
                  {product.colors.map((color) => (
                    <button
                      key={color.id}
                      onClick={() => handleColorChange(color)}
                      className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full border-2 ${
                        selectedColor?.id === color.id
                          ? "border-gray-900"
                          : "border-gray-300"
                      }`}
                      style={{ backgroundColor: color.color_code }}
                      title={color.color_name}
                    />
                  ))}
                </div>
              </div>
            )}

            {allSizes.length > 0 && (
              <div className="mb-6 sm:mb-8">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-sm sm:text-base">Size</span>
                  <button
                    onClick={() => setShowSizeChart(true)}
                    className="text-xs sm:text-sm text-blue-600 hover:underline flex items-center gap-1"
                  >
                    <Ruler className="w-3 h-3" />
                    Size Guide
                  </button>
                </div>
                <div className="flex flex-wrap gap-1.5 sm:gap-2">
                  {allSizes.map((sizeVariant) => {
                    const isOutOfStock = sizeVariant.availableStock === 0;
                    const isSelected = selectedSize === sizeVariant.size;
                    const sizePrice = sizeVariant.price || product.basePrice;
                    const isDifferentPrice = sizePrice !== product.basePrice;

                    return (
                      <button
                        key={sizeVariant.id}
                        onClick={() => handleSizeClick(sizeVariant)}
                        disabled={isOutOfStock}
                        className={`relative px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-lg border text-xs sm:text-sm font-medium transition-all ${
                          isOutOfStock
                            ? "bg-gray-100 border-gray-200 text-gray-400 cursor-not-allowed"
                            : isSelected
                            ? "bg-gray-900 text-white border-gray-900"
                            : "bg-white border-gray-300 hover:border-gray-900"
                        }`}
                        title={isDifferentPrice ? `Price: ₹${sizePrice}` : ""}
                      >
                        {sizeVariant.size}
                        {isOutOfStock && (
                          <XCircle className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-red-400 inline-block ml-1" />
                        )}
                        {isDifferentPrice && (
                          <div className="absolute -top-1 -right-1 w-2 h-2 bg-blue-500 rounded-full"></div>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            <div className="mb-4 sm:mb-6">
              <h3 className="font-medium mb-2 text-sm sm:text-base">
                Product Details
              </h3>
              <div className="grid grid-cols-2 gap-2 sm:gap-3">
                {product.material && (
                  <div className="text-xs sm:text-sm">
                    <span className="text-gray-600">Material:</span>
                    <span className="text-gray-900 ml-1">
                      {product.material}
                    </span>
                  </div>
                )}
                {product.gender && (
                  <div className="text-xs sm:text-sm">
                    <span className="text-gray-600">Gender:</span>
                    <span className="text-gray-900 ml-1">{product.gender}</span>
                  </div>
                )}
                {product.fabric && (
                  <div className="text-xs sm:text-sm">
                    <span className="text-gray-600">Fabric:</span>
                    <span className="text-gray-900 ml-1">{product.fabric}</span>
                  </div>
                )}
                {/* {product.sku && (
                  <div className="text-xs sm:text-sm">
                    <span className="text-gray-600">SKU:</span>
                    <span className="text-gray-900 ml-1">{product.sku}</span>
                  </div>
                )} */}
              </div>
              {product.careInstructions && (
                <div className="mt-2 text-xs sm:text-sm">
                  <span className="text-gray-600">Care Instructions:</span>
                  <span className="text-gray-900 ml-1">
                    {product.careInstructions}
                  </span>
                </div>
              )}
            </div>

            <BenefitsBadges />

            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
              <button
                onClick={handleAddToCart}
                disabled={!hasInStockSizes || !selectedSize}
                className={`flex-1 py-3 px-4 sm:px-6 rounded-lg font-medium transition text-sm sm:text-base ${
                  isPromotion
                    ? "bg-gradient-to-r from-emerald-500 to-green-600 text-white hover:from-emerald-600 hover:to-green-700"
                    : "bg-gray-900 text-white hover:bg-gray-800"
                } disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center gap-2`}
              >
                <ShoppingBag className="w-4 h-4" />
                {!hasInStockSizes
                  ? "Out of Stock"
                  : !selectedSize
                  ? "Select Size"
                  : isPromotion
                  ? "Add To Cart (FREE)"
                  : "Add To Cart"}
              </button>
              <button
                disabled={!hasInStockSizes || !selectedSize}
                onClick={() =>
                  hasInStockSizes && selectedSize && router.push("/cart")
                }
                className="flex-1 py-3 px-4 sm:px-6 border border-gray-900 text-gray-900 rounded-lg font-medium hover:bg-gray-50 disabled:border-gray-300 disabled:text-gray-400 disabled:cursor-not-allowed text-sm sm:text-base"
              >
                Buy Now
              </button>
            </div>
          </div>
        </div>

        <div className="mb-8 sm:mb-12">
          <div className="flex justify-between items-center mb-4 sm:mb-6">
            <h2 className="text-lg sm:text-xl font-bold">Related Products</h2>
            <button
              onClick={() => router.push("/shop")}
              className="text-xs sm:text-sm text-blue-600 hover:underline"
            >
              View All
            </button>
          </div>

          {isRelatedProductLoading ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
              {[1, 2, 3, 4].map((i) => (
                <RelatedProductSkeleton key={i} />
              ))}
            </div>
          ) : relatedProducts.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
              {relatedProducts.map((relProduct) => (
                <div
                  key={relProduct.id}
                  onClick={() =>
                    router.push(`/productdetails/${relProduct.id}`)
                  }
                  className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow cursor-pointer active:scale-[0.98]"
                >
                  <div className="aspect-square sm:aspect-[3/4] bg-gray-100 relative">
                    <img
                      src={getPrimaryImage(relProduct)}
                      alt={relProduct.name}
                      className="w-full h-full object-contain"
                      style={{
                        maxHeight: "100%",
                        maxWidth: "100%",
                        width: "auto",
                        height: "auto",
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                      }}
                      onError={(e) => {
                        e.currentTarget.src =
                          "https://via.placeholder.com/300x400?text=No+Image";
                      }}
                    />
                  </div>
                  <div className="p-2 sm:p-3">
                    <h3 className="text-xs sm:text-sm font-medium mb-1 truncate">
                      {relProduct.name}
                    </h3>
                    <div className="text-sm sm:text-base font-bold mb-1">
                      ₹{relProduct.basePrice}
                    </div>
                    <div className="text-[10px] sm:text-xs text-gray-500">
                      {relProduct.category?.name || "Category"}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-6 sm:py-8 text-gray-500 text-sm">
              No related products found
            </div>
          )}
        </div>

        <div className="mb-8 sm:mb-12">
          <div className="flex justify-between items-center mb-4 sm:mb-6">
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-0.5">
                Customer Reviews
              </h2>
              <p className="text-xs sm:text-sm text-gray-600 hidden sm:block">
                Real experiences from our customers
              </p>
            </div>
            <button
              onClick={() => setShowRatingModal(true)}
              className="px-3 py-1.5 sm:px-4 sm:py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 text-xs sm:text-sm"
            >
              Write Review
            </button>
          </div>

          <div className="space-y-4 sm:space-y-6">
            <div className="bg-white p-3 sm:p-4 rounded-xl shadow-sm border border-gray-100">
              <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
                <div className="text-center sm:text-left">
                  <div className="flex flex-col items-center sm:items-start">
                    <div className="text-3xl sm:text-4xl font-bold text-gray-900 mb-0.5">
                      {averageRating || 4.5}
                      <span className="text-lg sm:text-xl text-gray-400">
                        /5
                      </span>
                    </div>
                    <div className="flex items-center mb-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`w-4 h-4 sm:w-5 sm:h-5 ${
                            star <= Math.round(averageRating || 4.5)
                              ? "fill-yellow-400 text-yellow-400"
                              : "text-gray-200"
                          }`}
                        />
                      ))}
                    </div>
                    <p className="text-xs sm:text-sm text-gray-500">
                      Based on{" "}
                      <span className="font-semibold">{totalReviews || 0}</span>{" "}
                      reviews
                    </p>
                  </div>
                </div>

                <div className="flex-1 w-full max-w-md space-y-1.5 sm:space-y-2">
                  {[5, 4, 3, 2, 1].map((rating) => {
                    const percentage =
                      (reviewCounts[rating] / (totalReviews || 1)) * 100 || 0;
                    return (
                      <div key={rating} className="flex items-center">
                        <div className="flex items-center w-14 sm:w-16">
                          <span className="text-xs sm:text-sm font-medium text-gray-700 w-4">
                            {rating}
                          </span>
                          <Star className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-400 fill-current ml-1 sm:ml-2" />
                          <span className="text-[10px] sm:text-xs text-gray-400 ml-1">
                            ({reviewCounts[rating] || 0})
                          </span>
                        </div>
                        <div className="flex-1 h-1.5 sm:h-2 bg-gray-100 rounded-full overflow-hidden mx-2 sm:mx-3">
                          <div
                            className="h-full bg-gradient-to-r from-yellow-400 to-amber-400 rounded-full"
                            style={{ width: `${percentage}%` }}
                          />
                        </div>
                        <span className="text-xs sm:text-sm font-medium text-gray-600 w-8 sm:w-10 text-right">
                          {percentage.toFixed(0)}%
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            <CustomerPhotosGallery
              reviews={reviews}
              onImageClick={handleOpenGallery}
            />

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="border-b border-gray-100">
                <div className="flex overflow-x-auto px-2 sm:px-4 py-2 sm:py-3">
                  {reviewTabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveReviewTab(tab.id)}
                      className={`px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-all whitespace-nowrap mx-1 ${
                        activeReviewTab === tab.id
                          ? "bg-blue-50 text-blue-600"
                          : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                      }`}
                    >
                      {tab.label}
                      {tab.count > 0 && (
                        <span
                          className={`ml-1 px-1.5 py-0.5 rounded-full text-[10px] ${
                            activeReviewTab === tab.id
                              ? "bg-blue-100 text-blue-700"
                              : "bg-gray-100 text-gray-600"
                          }`}
                        >
                          {tab.count}
                        </span>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              <div className="divide-y divide-gray-100">
                {filteredReviews.length > 0 ? (
                  filteredReviews.map((review, idx) => (
                    <ReviewCard
                      key={review.id || idx}
                      review={review}
                      onImageClick={handleOpenGallery}
                    />
                  ))
                ) : (
                  <div className="p-6 sm:p-8 text-center">
                    <div className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-3 sm:mb-4 rounded-full bg-gray-100 flex items-center justify-center">
                      <Star className="w-6 h-6 sm:w-8 sm:h-8 text-gray-400" />
                    </div>
                    <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-1.5 sm:mb-2">
                      No Reviews Yet
                    </h3>
                    <p className="text-gray-600 mb-4 sm:mb-6 text-sm max-w-xs mx-auto">
                      Be the first to share your experience
                    </p>
                    <button
                      onClick={() => setShowRatingModal(true)}
                      className="px-4 py-2 sm:px-6 sm:py-2.5 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 text-sm sm:text-base"
                    >
                      Write First Review
                    </button>
                  </div>
                )}
              </div>

              {totalReviews > 5 && (
                <div className="p-3 sm:p-4 border-t border-gray-100">
                  <div className="flex items-center justify-between">
                    <div className="text-xs text-gray-500">
                      Showing{" "}
                      <span className="font-medium">
                        1-{Math.min(5, filteredReviews.length)}
                      </span>
                    </div>
                    <button className="text-xs sm:text-sm text-blue-600 hover:text-blue-800 font-medium">
                      Load More
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <SocialShareModal
        isOpen={showShareModal}
        onClose={() => setShowShareModal(false)}
        productUrl={typeof window !== "undefined" ? window.location.href : ""}
        productName={product?.name || ""}
        productImage={selectedColor?.images?.[0]?.url || ""}
      />

      <RatingModal
        isOpen={showRatingModal}
        onClose={() => setShowRatingModal(false)}
        productName={product?.name || ""}
        productId={slug}
        onReviewSubmitted={refreshReviews}
      />

      <SizeChartModal
        isOpen={showSizeChart}
        onClose={() => setShowSizeChart(false)}
        productCategory={product?.category?.name || ""}
        productName={product?.name || ""}
      />

      {showGalleryModal && (
        <GalleryModal
          images={galleryImages}
          initialIndex={galleryStartIndex}
          onClose={() => setShowGalleryModal(false)}
        />
      )}

      <style jsx>{`
        @keyframes shimmer {
          0% {
            background-position: -200% 0;
          }
          100% {
            background-position: 200% 0;
          }
        }
        .animate-shimmer {
          animation: shimmer 2s infinite linear;
        }
        @keyframes scale-in {
          from {
            transform: scale(0.95);
            opacity: 0;
          }
          to {
            transform: scale(1);
            opacity: 1;
          }
        }
        .animate-scale-in {
          animation: scale-in 0.2s ease-out;
        }
      `}</style>
    </>
  );
};

export default ProductPage;
