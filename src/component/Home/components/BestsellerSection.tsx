"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useProductList } from "@src/hooks/apiHooks";
import ProductCard from "./ProductCard";

const BestsellerSection = () => {
  const [productList, setproductList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

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

  const handleViewAllClick = () => {
    router.push("/shop");
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 md:py-12 lg:py-16">
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center text-[#115e59] mb-2 md:mb-3 font-serif">
        BEST SELLER KURTIS
      </h2>
      <p className="text-center text-gray-600 text-sm md:text-base mb-8 md:mb-10">
        Discover our most loved collection
      </p>

      {isLoading || isProductLoading ? (
        <div className="flex items-center justify-center h-96">
          <p className="text-gray-600 text-lg">Loading products...</p>
        </div>
      ) : productList && productList.length > 0 ? (
        <>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4 lg:gap-5">
            {productList.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <div className="text-center mt-8 md:mt-12">
            <button
              onClick={handleViewAllClick}
              className="bg-gradient-to-r from-[#115e59] to-[#134e4a] text-white px-8 md:px-10 py-3 rounded-lg font-semibold text-sm md:text-base transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              View All Products
            </button>
          </div>
        </>
      ) : (
        <div className="flex items-center justify-center h-96">
          <p className="text-gray-600 text-lg">No products available</p>
        </div>
      )}
    </div>
  );
};

export default BestsellerSection;
