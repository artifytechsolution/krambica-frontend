"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useProductList } from "@src/hooks/apiHooks";
import ProductCard from "./ProductCard";

/**
 * A Skeleton component that mimics the shape of your ProductCard.
 * This prevents layout shift during data fetching.
 */
const ProductSkeleton = () => (
  <div className="flex flex-col gap-3 animate-pulse">
    {/* Product Image Placeholder */}
    <div className="bg-gray-200 rounded-xl aspect-[3/4] w-full" />
    {/* Text Placeholders */}
    <div className="space-y-2">
      <div className="h-4 bg-gray-200 rounded w-5/6" />
      <div className="h-4 bg-gray-200 rounded w-1/2" />
    </div>
  </div>
);

const BestsellerSection = () => {
  const [productList, setProductList] = useState([]);
  const router = useRouter();

  // Destructuring necessary properties from the custom hook
  const {
    isLoading: isProductLoading,
    data: productListData,
    mutate: mutateProductList,
  } = useProductList();

  // Initial call to fetch products
  useEffect(() => {
    mutateProductList({
      limit: 8,
    });
  }, [mutateProductList]);

  // Sync the hook data with the local product list state
  useEffect(() => {
    if (productListData?.data?.data) {
      setProductList(productListData.data.data);
    }
  }, [productListData]);

  const handleViewAllClick = () => {
    router.push("/shop");
  };

  // Logic to determine if we are currently loading
  // We check isProductLoading and also if we have data yet
  const isLoading =
    isProductLoading || (!productListData && productList.length === 0);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 md:py-12 lg:py-16">
      {/* --- Section Header --- */}
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center text-[#115e59] mb-2 md:mb-3 font-serif">
        BEST SELLER KURTIS
      </h2>
      <p className="text-center text-gray-600 text-sm md:text-base mb-8 md:mb-10">
        Discover our most loved collection
      </p>

      {/* --- Grid Content --- */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4 lg:gap-5">
        {isLoading
          ? /* Show 8 Skeleton Cards while loading */
            Array.from({ length: 8 }).map((_, index) => (
              <ProductSkeleton key={`skeleton-${index}`} />
            ))
          : productList.length > 0
          ? /* Show Actual Product Cards */
            productList.map((product: any) => (
              <ProductCard key={product.id} product={product} />
            ))
          : null}
      </div>

      {/* --- Empty State --- */}
      {!isLoading && productList.length === 0 && (
        <div className="flex flex-col items-center justify-center h-64 border-2 border-dashed border-gray-100 rounded-2xl">
          <p className="text-gray-500 text-lg italic">
            No products available at the moment
          </p>
        </div>
      )}

      {/* --- Footer Action --- */}
      {!isLoading && productList.length > 0 && (
        <div className="text-center mt-8 md:mt-12">
          <button
            onClick={handleViewAllClick}
            className="bg-gradient-to-r from-[#115e59] to-[#134e4a] text-white px-8 md:px-10 py-3 rounded-lg font-semibold text-sm md:text-base transition-all duration-300 shadow-lg hover:shadow-xl active:scale-95"
          >
            View All Products
          </button>
        </div>
      )}
    </div>
  );
};

export default BestsellerSection;
