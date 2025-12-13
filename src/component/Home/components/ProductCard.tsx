"use client";
import { Heart, Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

const ProductCard = ({ product }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const router = useRouter();

  // Function to get primary image (only images, not videos)
  const getPrimaryImage = (product) => {
    if (product.colors && product.colors.length > 0) {
      const images = product.colors[0].images || [];
      // Filter only images, exclude videos
      const imageOnly = images.find(
        (img) =>
          img.isPrimary &&
          !img.url.includes("video") &&
          !img.url.endsWith(".mp4")
      );
      return (
        imageOnly?.url ||
        images.find(
          (img) => !img.url.includes("video") && !img.url.endsWith(".mp4")
        )?.url ||
        null
      );
    }
    return null;
  };

  // Function to get product price
  const getProductPrice = (product) => {
    if (product.colors && product.colors.length > 0) {
      const sizeVariants = product.colors[0].sizeVariants || [];
      if (sizeVariants.length > 0) {
        return sizeVariants[0].price || product.basePrice;
      }
    }
    return product.basePrice;
  };

  const imageUrl = getPrimaryImage(product) || product.image;
  const price = getProductPrice(product) || product.price;

  const handleSearchClick = () => {
    router.push(`/productdetails/${product.id}`);
  };

  return (
    <div className="group bg-white rounded-lg overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      <div
        className="relative overflow-hidden"
        style={{ paddingBottom: "133.33%" }}
      >
        <img
          src={imageUrl}
          alt={product.name}
          className="absolute top-0 left-0 w-full h-full object-cover transition-transform duration-400 group-hover:scale-105"
          loading="lazy"
        />
        {product.badge && (
          <span className="absolute top-3 left-3 bg-[#115e59] text-white px-3 py-1 text-xs font-semibold uppercase tracking-wider rounded z-10">
            {product.badge}
          </span>
        )}
        <button
          onClick={() => setIsFavorite(!isFavorite)}
          className="absolute top-3 right-3 w-8 h-8 bg-white rounded-full flex items-center justify-center hover:scale-110 transition-transform z-10"
        >
          <Heart
            className={`w-4 h-4 transition-all ${
              isFavorite ? "fill-[#115e59] text-[#115e59]" : ""
            }`}
          />
        </button>
        <button
          onClick={handleSearchClick}
          className="absolute bottom-3 right-3 w-9 h-9 bg-white rounded-full flex items-center justify-center opacity-0 md:group-hover:opacity-100 transition-opacity z-10"
        >
          <Search className="w-4 h-4" />
        </button>
      </div>
      <div className="p-3">
        <h3 className="text-sm md:text-base text-gray-700 mb-2 line-clamp-2 leading-snug">
          {product.name}
        </h3>
        <p className="text-base md:text-lg font-bold text-[#115e59]">
          ₹{price.toLocaleString("en-IN")}
        </p>
      </div>
    </div>
  );
};

export default ProductCard;
