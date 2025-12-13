"use client";
import { useProductList } from "@src/hooks/apiHooks";
import { ChevronLeft, ChevronRight, ShoppingCart } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const TrendingSection = () => {
  const scrollContainerRef = useRef(null);
  const [productList, setproductList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const autoScrollIntervalRef = useRef(null);
  const router = useRouter();

  const scrollProducts = (direction) => {
    const container = scrollContainerRef.current;
    const scrollAmount = 300;

    if (direction === "left") {
      container.scrollBy({ left: -scrollAmount, behavior: "smooth" });
    } else {
      container.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  // Auto-scroll function
  const startAutoScroll = () => {
    if (autoScrollIntervalRef.current) {
      clearInterval(autoScrollIntervalRef.current);
    }

    autoScrollIntervalRef.current = setInterval(() => {
      const container = scrollContainerRef.current;
      if (container) {
        // Check if we're at the end, if so scroll back to start
        if (
          container.scrollLeft + container.clientWidth >=
          container.scrollWidth - 10
        ) {
          container.scrollTo({ left: 0, behavior: "smooth" });
        } else {
          container.scrollBy({ left: 300, behavior: "smooth" });
        }
      }
    }, 4000); // Auto-scroll every 4 seconds
  };

  // Stop auto-scroll on hover
  const handleMouseEnter = () => {
    if (autoScrollIntervalRef.current) {
      clearInterval(autoScrollIntervalRef.current);
    }
  };

  // Resume auto-scroll on mouse leave
  const handleMouseLeave = () => {
    startAutoScroll();
  };

  const {
    isError: isProductError,
    isLoading: isProductLoading,
    data: productListData,
    error: productError,
    mutate: mutateProductList,
  } = useProductList();

  useEffect(() => {
    mutateProductList({
      limit: 8,
    });
  }, [mutateProductList]);

  useEffect(() => {
    if (productListData?.data?.data) {
      setproductList(productListData.data.data);
      setIsLoading(false);
    }
  }, [productListData]);

  // Start auto-scroll when products are loaded
  useEffect(() => {
    if (productList.length > 0 && !isLoading) {
      startAutoScroll();
    }

    return () => {
      if (autoScrollIntervalRef.current) {
        clearInterval(autoScrollIntervalRef.current);
      }
    };
  }, [productList, isLoading]);

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

  // Handle cart button click - navigate to product details
  const handleCartClick = (productId) => {
    router.push(`/productdetails/${productId}`);
  };

  return (
    <div className="container mx-auto px-4 py-8 lg:py-16">
      <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-center">
        <div className="w-full lg:w-1/3 text-center lg:text-left">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-normal leading-tight mb-6 bg-gradient-to-r from-[#115e59] to-[#134e4a] bg-clip-text text-transparent">
            Shop the looks you've been waiting for.
          </h1>
          <p className="text-gray-600 text-lg mb-8">
            From catalogue to closet.
          </p>
          <button className="bg-gradient-to-r from-[#115e59] to-[#134e4a] text-white font-medium px-12 py-4 rounded-full text-sm uppercase tracking-wider transition-colors duration-300 shadow-lg hover:shadow-xl">
            Shop Now
          </button>
        </div>

        <div className="w-full lg:w-2/3 relative">
          <button
            onClick={() => scrollProducts("left")}
            className="hidden lg:block absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 bg-white rounded-full p-3 shadow-lg hover:bg-[#115e59] hover:text-white transition-all"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {isLoading || isProductLoading ? (
            <div className="flex items-center justify-center h-96">
              <p className="text-gray-600 text-lg">Loading products...</p>
            </div>
          ) : productList && productList.length > 0 ? (
            <div
              ref={scrollContainerRef}
              className="flex gap-4 overflow-x-auto scroll-smooth pb-4"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              {productList.map((product) => {
                const primaryImage = getPrimaryImage(product);
                const price = getProductPrice(product);

                return (
                  <div
                    key={product.id}
                    className="min-w-[260px] md:min-w-[280px] flex-shrink-0"
                  >
                    <div className="relative bg-gray-200 rounded-lg overflow-hidden group">
                      {primaryImage ? (
                        <img
                          src={primaryImage}
                          alt={product.name}
                          className="w-full h-[380px] md:h-[400px] object-contain bg-gray-100"
                        />
                      ) : (
                        <div className="w-full h-[380px] md:h-[400px] bg-gray-300 flex items-center justify-center">
                          <span className="text-gray-500">
                            No image available
                          </span>
                        </div>
                      )}

                      <div className="absolute bottom-4 left-4 bg-[#115e59] text-white text-xs font-semibold px-3 py-1.5 uppercase tracking-wider">
                        New
                      </div>

                      <button
                        onClick={() => handleCartClick(product.id)}
                        className="absolute bottom-4 right-4 bg-white rounded-full p-2 hover:bg-[#115e59] hover:text-white transition-colors"
                      >
                        <ShoppingCart className="w-5 h-5" />
                      </button>
                    </div>
                    <div className="mt-4">
                      <h3 className="text-sm font-medium text-gray-900 mb-2 line-clamp-2">
                        {product.name}
                      </h3>
                      <p className="text-lg font-semibold text-[#115e59]">
                        ₹{price.toLocaleString("en-IN")}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="flex items-center justify-center h-96">
              <p className="text-gray-600 text-lg">No products available</p>
            </div>
          )}

          <button
            onClick={() => scrollProducts("right")}
            className="hidden lg:block absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 bg-white rounded-full p-3 shadow-lg hover:bg-[#115e59] hover:text-white transition-all"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TrendingSection;
