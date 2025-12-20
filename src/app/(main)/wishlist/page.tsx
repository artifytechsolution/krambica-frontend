"use client";
import React, { useState, useEffect } from "react";
import {
  Heart,
  ShoppingBag,
  Star,
  X,
  ArrowRight,
  Loader2,
  AlertCircle,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useGetWishListByUserID, useDeleteWishList } from "@src/hooks/apiHooks";
import toast from "react-hot-toast";
import { useAppSelector } from "@src/redux/store";
import { selectUser } from "@src/redux/reducers/authSlice";

// --- COMPONENTS ---

const WishlistSkeleton = () => (
  <div className="group relative flex flex-col overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm">
    <div className="relative aspect-[3/4] bg-gray-200 animate-pulse" />
    <div className="p-4 space-y-3">
      <div className="h-4 w-3/4 bg-gray-200 rounded animate-pulse" />
      <div className="flex gap-2">
        <div className="h-3 w-1/4 bg-gray-200 rounded animate-pulse" />
        <div className="h-3 w-1/4 bg-gray-200 rounded animate-pulse" />
      </div>
      <div className="h-10 w-full bg-gray-200 rounded-lg animate-pulse mt-4" />
    </div>
  </div>
);

const EmptyState = () => (
  <div className="flex flex-col items-center justify-center py-20 px-4 text-center min-h-[50vh]">
    <div className="mb-6 rounded-full bg-gray-50 p-6">
      <Heart className="h-12 w-12 text-gray-300" />
    </div>
    <h3 className="text-xl font-bold text-gray-900 md:text-2xl">
      Your wishlist is empty
    </h3>
    <p className="mt-2 max-w-sm text-sm text-gray-500">
      Looks like you haven't added anything to your wishlist yet. Explore our
      products and find something you love.
    </p>
    <a
      href="/shop"
      className="mt-8 inline-flex items-center gap-2 rounded-full bg-slate-900 px-8 py-3 text-sm font-semibold text-white transition-transform hover:scale-105 hover:bg-slate-800 active:scale-95"
    >
      Start Shopping <ArrowRight className="h-4 w-4" />
    </a>
  </div>
);

const WishlistCard = ({ data, onRemove, onAddToCart, isCartLoading }) => {
  return (
    <div className="group relative flex flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
      <div className="relative aspect-[4/5] overflow-hidden bg-gray-100">
        <img
          src={data.image}
          alt={data.name}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
          onError={(e) => {
            (e.target as HTMLImageElement).src =
              "https://via.placeholder.com/400x500?text=No+Image";
          }}
        />

        <div className="absolute left-3 top-3 flex flex-col gap-1">
          {!data.inStock && (
            <span className="inline-flex items-center rounded-md bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/10 backdrop-blur-sm">
              Out of Stock
            </span>
          )}
          {data.inStock && data.originalPrice && (
            <span className="inline-flex items-center rounded-md bg-emerald-50 px-2 py-1 text-xs font-medium text-emerald-700 ring-1 ring-inset ring-emerald-600/10 backdrop-blur-sm">
              Sale
            </span>
          )}
        </div>

        <button
          onClick={(e) => {
            e.stopPropagation();
            onRemove(data.id, data.wishlist_id);
          }}
          className="absolute right-3 top-3 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-gray-500 shadow-sm backdrop-blur-sm transition-all hover:bg-red-50 hover:text-red-600 md:opacity-0 md:group-hover:opacity-100"
          title="Remove from wishlist"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      <div className="flex flex-1 flex-col p-4">
        <div className="mb-1 text-xs font-medium text-emerald-700">
          {data.category}
        </div>
        <h3
          className="mb-2 line-clamp-2 text-sm font-semibold text-gray-900 md:text-base"
          title={data.name}
        >
          {data.name}
        </h3>

        <div className="mb-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-gray-500">
          <div className="flex items-center gap-1">
            <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
            <span className="font-medium">
              {data.rating ? data.rating.toFixed(1) : "4.5"}
            </span>
            <span className="text-gray-400">({data.reviewCount})</span>
          </div>
          <div className="h-3 w-px bg-gray-200" />
          <div className="flex items-center gap-1">
            <span
              className="h-2.5 w-2.5 rounded-full border border-gray-200"
              style={{ backgroundColor: data.colorCode }}
            />
            <span className="truncate max-w-[80px]">{data.color}</span>
          </div>
        </div>

        <div className="mt-auto flex items-end justify-between border-t border-gray-50 pt-3">
          <div className="flex flex-col">
            <span className="text-xs text-gray-400 line-through">
              {data.originalPrice ? `₹${data.originalPrice.toFixed(2)}` : ""}
            </span>
            <span className="text-lg font-bold text-gray-900">
              ₹{data.price.toFixed(2)}
            </span>
          </div>
        </div>

        <button
          onClick={() => onAddToCart(data)}
          disabled={!data.inStock || isCartLoading}
          className={`mt-4 flex w-full items-center justify-center gap-2 rounded-lg py-2.5 text-sm font-semibold transition-all active:scale-95 ${
            !data.inStock
              ? "cursor-not-allowed bg-gray-100 text-gray-400"
              : "bg-slate-900 text-white shadow-md hover:bg-slate-800 hover:shadow-lg"
          }`}
        >
          {isCartLoading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <>
              <ShoppingBag className="h-4 w-4" />
              {data.inStock ? "Add to Cart" : "Unavailable"}
            </>
          )}
        </button>
      </div>
    </div>
  );
};

// --- MAIN PAGE COMPONENT ---

const WishlistPage = () => {
  const router = useRouter();
  const user = useAppSelector(selectUser);
  console.log(user);
  console.log("user is commignggg");
  const STATIC_USER_ID = user?.id;

  useEffect(() => {
    if (!user) {
      router.push("/login");
    }
  }, []);

  const [notification, setNotification] = useState({
    show: false,
    message: "",
    type: "success" as "success" | "error" | "info",
  });

  const [cartLoading, setCartLoading] = useState<Record<string, boolean>>({});

  // Get wishlist
  const {
    isError: isWishlistError,
    isLoading: isWishlistLoading,
    data: wishlistData,
    error: wishlistError,
    mutate: wishlistMutate,
  } = useGetWishListByUserID();

  // Delete wishlist item hook
  const { mutate: deleteWishList, isLoading: isDeleting } = useDeleteWishList();

  const wishlist = wishlistData?.data?.data || [];

  useEffect(() => {
    wishlistMutate({ userId: STATIC_USER_ID } as any);
  }, []);

  const getProductDisplayData = (item: any) => {
    const product = item.product;
    const firstColor = product?.colors?.[0];
    const firstImage = firstColor?.images?.[0];
    const firstSize = firstColor?.sizeVariants?.[0];

    const avgRating =
      product?.reviews?.length > 0
        ? product.reviews.reduce(
            (acc: number, r: any) => acc + (r.rating || 0),
            0
          ) / product.reviews.length
        : 4.5;

    const hasStock =
      firstColor?.sizeVariants?.some((v: any) => v.availableStock > 0) || false;

    return {
      id: item.uuid,
      wishlist_id: item.wishlist_id,
      product_id: item.product_id,
      name: product?.name || "Product Name",
      category: product?.category?.name || "Category",
      image: firstImage?.url || "https://via.placeholder.com/400x500",
      price: firstSize?.price ?? product?.basePrice ?? 0,
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

  // NEW: remove handler via hook
  const handleRemove = (uuid: string, wishlist_id: number) => {
    deleteWishList(
      {
        user_id: STATIC_USER_ID,
        wishlistId: uuid,
      },
      {
        onSuccess: () => {
          // refetch wishlist
          wishlistMutate({ userId: STATIC_USER_ID } as any);
          toast.success("Removed from wishlist", "info");
        },
        onError: () => {
          toast.error("Failed to remove item", "error");
        },
      }
    );
  };

  const handleAddToCart = async (displayData: any) => {
    if (!displayData.inStock) {
      toast.error(`${displayData.name} is out of stock`, "error");
      return;
    }

    if (!displayData.product_id) {
      toast.error("Invalid product", "error");
      return;
    }

    setCartLoading((prev) => ({ ...prev, [displayData.id]: true }));
    router.push(`/productdetails/${displayData.product_id}`);
  };

  const loading = isWishlistLoading || isDeleting;
  const errorMsg = isWishlistError
    ? (wishlistError as any)?.message || "Failed to load wishlist"
    : null;

  return (
    <div className="min-h-screen bg-gray-50/50 pb-20 pt-8 font-sans">
      {notification.show && (
        <div className="fixed left-0 right-0 top-6 z-50 flex justify-center px-4 animate-in slide-in-from-top-2">
          <div
            className={`flex items-center gap-2 rounded-full px-6 py-3 text-sm font-medium text-white shadow-lg backdrop-blur-md ${
              notification.type === "error"
                ? "bg-red-500/90"
                : notification.type === "info"
                ? "bg-blue-500/90"
                : "bg-emerald-600/90"
            }`}
          >
            <span>{notification.message}</span>
          </div>
        </div>
      )}

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 flex flex-col items-center justify-between gap-4 border-b border-gray-200 pb-6 md:flex-row md:items-end">
          <div className="text-center md:text-left">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              My Wishlist
            </h1>
            <p className="mt-2 text-sm text-gray-500">
              {wishlist.length} {wishlist.length === 1 ? "item" : "items"} saved
              for later
            </p>
          </div>

          {wishlist.length > 0 && (
            <button
              onClick={() => router.push("/shop")}
              className="text-sm font-medium text-emerald-700 hover:text-emerald-800 hover:underline"
            >
              Continue Shopping
            </button>
          )}
        </div>

        {loading && (
          <div className="grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-3 lg:grid-cols-4">
            {[...Array(8)].map((_, i) => (
              <WishlistSkeleton key={i} />
            ))}
          </div>
        )}

        {errorMsg && !loading && (
          <div className="mx-auto flex max-w-md flex-col items-center rounded-2xl bg-white p-8 text-center shadow-sm">
            <div className="mb-4 rounded-full bg-red-50 p-4">
              <AlertCircle className="h-8 w-8 text-red-500" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900">
              Unable to load wishlist
            </h3>
            <p className="mt-2 text-sm text-gray-500 mb-6">{errorMsg}</p>
            <button
              onClick={() => wishlistMutate({ userId: STATIC_USER_ID } as any)}
              className="rounded-lg bg-gray-900 px-6 py-2 text-sm font-medium text-white hover:bg-gray-800"
            >
              Try Again
            </button>
          </div>
        )}

        {!loading && !errorMsg && wishlist.length === 0 && <EmptyState />}

        {!loading && !errorMsg && wishlist.length > 0 && (
          <div className="grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-3 lg:grid-cols-4">
            {wishlist.map((item: any) => {
              const displayData = getProductDisplayData(item);
              const isLoading = cartLoading[displayData.id];

              return (
                <WishlistCard
                  key={item.uuid}
                  data={displayData}
                  onRemove={handleRemove}
                  onAddToCart={handleAddToCart}
                  isCartLoading={isLoading}
                />
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default WishlistPage;
