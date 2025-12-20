"use client";
import React, { useState, useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import {
  MapPin,
  Phone,
  Mail,
  Package,
  Clock,
  CheckCircle,
  Truck,
  CreditCard,
  ChevronRight,
  ChevronLeft,
  X,
  Download,
  Edit2,
  Save,
  Loader2,
  ShoppingBag,
  TrendingUp,
  AlertCircle,
  ArrowRight,
  Tag,
  Hash,
  Image as ImageIcon,
} from "lucide-react";

// --- REDUX IMPORTS ---
import { useAppSelector } from "@src/redux/store";
import { selectUser } from "@src/redux/reducers/authSlice";

// --- HELPER COMPONENTS ---

const StatusBadge = ({ status }) => {
  const styles = {
    PENDING: "bg-amber-50 text-amber-700 border-amber-200",
    PROCESSING: "bg-blue-50 text-blue-700 border-blue-200",
    CONFIRMED: "bg-indigo-50 text-indigo-700 border-indigo-200",
    SHIPPED: "bg-indigo-50 text-indigo-700 border-indigo-200",
    DELIVERED: "bg-emerald-50 text-emerald-700 border-emerald-200",
    CANCELLED: "bg-red-50 text-red-700 border-red-200",
  };

  const icons = {
    PENDING: <Clock className="w-3 h-3" />,
    PROCESSING: <Loader2 className="w-3 h-3 animate-spin" />,
    CONFIRMED: <CheckCircle className="w-3 h-3" />,
    SHIPPED: <Truck className="w-3 h-3" />,
    DELIVERED: <CheckCircle className="w-3 h-3" />,
    CANCELLED: <AlertCircle className="w-3 h-3" />,
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full text-[10px] sm:text-xs font-semibold border ${
        styles[status] || "bg-gray-100 text-gray-700 border-gray-200"
      }`}
    >
      {icons[status]}
      {status}
    </span>
  );
};

// --- ORDER ITEM PREVIEW COMPONENT ---
const OrderItemPreview = ({ item }) => {
  const sizeVariant = item.sizeVariant;
  const productColor = sizeVariant?.productColor;
  const primaryImage =
    productColor?.images?.find((img) => img.isPrimary) ||
    productColor?.images?.[0];

  // Get product name
  const getProductName = () => {
    if (productColor?.color_name) {
      return `${productColor.color_name} Item`;
    }
    return "Product";
  };

  return (
    <div className="flex items-center gap-2 bg-white border border-zinc-100 rounded-lg p-2">
      {/* Product Image */}
      <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-md overflow-hidden bg-zinc-100 border border-zinc-200 flex-shrink-0">
        {primaryImage?.url ? (
          <img
            src={primaryImage.url}
            alt={primaryImage.altText || getProductName()}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.style.display = "none";
              e.target.parentElement.innerHTML = `
                <div class="w-full h-full flex items-center justify-center">
                  <svg class="w-3 h-3 sm:w-4 sm:h-4 text-zinc-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                  </svg>
                </div>
              `;
            }}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <ImageIcon className="w-3 h-3 sm:w-4 sm:h-4 text-zinc-400" />
          </div>
        )}
      </div>

      {/* Product Details */}
      <div className="flex-1 min-w-0">
        <div className="flex justify-between items-center">
          <div className="min-w-0">
            {/* Product Name */}
            <p className="text-xs font-medium text-zinc-700 truncate">
              {getProductName()}
            </p>

            {/* Color, Size, and Qty */}
            <div className="flex items-center gap-1.5 mt-0.5 flex-wrap">
              {/* Color Swatch */}
              {productColor?.color_code && (
                <div
                  className="w-2.5 h-2.5 rounded-full border border-zinc-300 flex-shrink-0"
                  style={{ backgroundColor: productColor.color_code }}
                  title={productColor.color_name}
                />
              )}

              {/* Size */}
              {sizeVariant?.size && (
                <span className="text-[10px] text-zinc-600">
                  Size: {sizeVariant.size}
                </span>
              )}

              {/* Quantity */}
              <span className="text-[10px] text-zinc-600">
                Qty: {item.quantity}
              </span>
            </div>
          </div>

          {/* Price */}
          <div className="text-right ml-2 flex-shrink-0">
            <span className="text-xs font-semibold text-zinc-900">
              ₹{item.price?.toLocaleString()}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- ORDER DETAIL MODAL ---
const OrderDetailModal = ({ order, isOpen, onClose }) => {
  if (!isOpen || !order) return null;

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
    }).format(amount);
  };

  // Function to get product display details
  const getProductDisplayInfo = (item) => {
    const sizeVariant = item.sizeVariant;
    const productColor = sizeVariant?.productColor;
    const primaryImage =
      productColor?.images?.find((img) => img.isPrimary) ||
      productColor?.images?.[0];

    // Get product name - You can customize this based on your data structure
    let productName = "Product";
    if (productColor?.color_name) {
      productName = `${productColor.color_name} Item`;
    } else if (sizeVariant?.sku) {
      // Extract name from SKU if possible
      const skuParts = sizeVariant.sku.split("-");
      if (skuParts.length > 0) {
        productName =
          skuParts[0].charAt(0).toUpperCase() + skuParts[0].slice(1);
      }
    }

    return {
      imageUrl: primaryImage?.url,
      altText: primaryImage?.altText || productName,
      productName,
      colorName: productColor?.color_name,
      colorCode: productColor?.color_code,
      size: sizeVariant?.size,
      sku: sizeVariant?.sku,
      price: item.price,
      quantity: item.quantity,
      total: item.total || item.price * item.quantity,
    };
  };

  return (
    <div className="fixed inset-0 bg-zinc-900/60 backdrop-blur-sm flex items-center justify-center sm:p-4 z-50 animate-in fade-in duration-200">
      <div className="bg-white w-full h-full sm:h-auto sm:max-h-[90vh] sm:rounded-2xl sm:max-w-2xl shadow-2xl overflow-hidden flex flex-col">
        {/* Header */}
        <div className="px-4 py-4 sm:px-6 sm:py-5 border-b border-zinc-100 flex items-center justify-between bg-zinc-50/50">
          <div>
            <h2 className="text-lg sm:text-xl font-serif font-medium text-zinc-900">
              Order Receipt
            </h2>
            <p className="text-xs sm:text-sm text-zinc-500">
              ID:{" "}
              <span className="font-mono text-zinc-700">
                #{order.order_id || order.id}
              </span>
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-zinc-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-zinc-400 hover:text-zinc-700" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6 sm:space-y-8">
          {/* Status Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-zinc-50 p-4 rounded-xl border border-zinc-100">
            <div className="flex flex-col">
              <span className="text-[10px] sm:text-xs text-zinc-500 uppercase tracking-wider font-medium mb-1">
                Status
              </span>
              <div>
                <StatusBadge status={order.status} />
              </div>
            </div>
            <div className="flex flex-col sm:items-end border-t sm:border-t-0 border-zinc-200 pt-2 sm:pt-0">
              <span className="text-[10px] sm:text-xs text-zinc-500 uppercase tracking-wider font-medium mb-1">
                Date Placed
              </span>
              <span className="text-sm font-medium text-zinc-900">
                {formatDate(order.placedAt || order.createdAt)}
              </span>
            </div>
          </div>

          {/* Order Items Section - ENHANCED */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-xs sm:text-sm font-semibold text-zinc-900 uppercase tracking-wider">
                Purchased Items ({order.items?.length || 0})
              </h3>
              <span className="text-xs text-zinc-500">
                Total Items: {order.items?.length || 0}
              </span>
            </div>

            <div className="space-y-4">
              {order.items?.map((item, index) => {
                const productInfo = getProductDisplayInfo(item);

                return (
                  <div
                    key={item.id || index}
                    className="bg-white border border-zinc-200 rounded-xl p-4 hover:border-emerald-200 transition-colors"
                  >
                    <div className="flex gap-4">
                      {/* Product Image - Larger in modal */}
                      <div className="flex-shrink-0">
                        <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-lg overflow-hidden bg-zinc-100 border border-zinc-200 flex items-center justify-center">
                          {productInfo.imageUrl ? (
                            <img
                              src={productInfo.imageUrl}
                              alt={productInfo.altText}
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                e.target.style.display = "none";
                                e.target.parentElement.innerHTML = `
                                  <div class="w-full h-full flex flex-col items-center justify-center bg-zinc-100 p-2">
                                    <svg class="w-8 h-8 text-zinc-400 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                                    </svg>
                                    <span class="text-[10px] text-zinc-500 text-center">No Image</span>
                                  </div>
                                `;
                              }}
                            />
                          ) : (
                            <div className="w-full h-full flex flex-col items-center justify-center bg-zinc-100 p-2">
                              <ImageIcon className="w-8 h-8 text-zinc-400 mb-1" />
                              <span className="text-[10px] text-zinc-500 text-center">
                                No Image
                              </span>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Product Details */}
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-start gap-3 mb-2">
                          <div className="flex-1 min-w-0">
                            {/* Product Name - Prominent */}
                            <h4 className="font-semibold text-zinc-900 text-sm sm:text-base truncate mb-2">
                              {productInfo.productName}
                            </h4>

                            {/* Product Variant Details */}
                            <div className="flex flex-wrap gap-3 mb-3">
                              {/* Color */}
                              {productInfo.colorCode && (
                                <div className="flex items-center gap-1.5">
                                  <div className="flex items-center gap-1">
                                    <div
                                      className="w-4 h-4 rounded-full border border-zinc-300"
                                      style={{
                                        backgroundColor: productInfo.colorCode,
                                      }}
                                      title={productInfo.colorName}
                                    />
                                  </div>
                                  {productInfo.colorName && (
                                    <span className="text-xs text-zinc-600">
                                      {productInfo.colorName}
                                    </span>
                                  )}
                                </div>
                              )}

                              {/* Size */}
                              {productInfo.size && (
                                <div className="flex items-center gap-1.5">
                                  <Tag className="w-3 h-3 text-zinc-400" />
                                  <span className="text-xs text-zinc-600">
                                    Size: {productInfo.size}
                                  </span>
                                </div>
                              )}

                              {/* Quantity */}
                              <div className="flex items-center gap-1.5">
                                <Hash className="w-3 h-3 text-zinc-400" />
                                <span className="text-xs font-medium text-zinc-700">
                                  Quantity: {productInfo.quantity}
                                </span>
                              </div>
                            </div>

                            {/* SKU */}
                            {productInfo.sku && (
                              <div className="mt-2">
                                <span className="text-[10px] font-mono text-zinc-500 bg-zinc-100 px-2 py-1 rounded">
                                  SKU: {productInfo.sku}
                                </span>
                              </div>
                            )}
                          </div>

                          {/* Price Section */}
                          <div className="text-right flex-shrink-0">
                            <div className="mb-1">
                              <span className="text-sm sm:text-base font-bold text-emerald-700">
                                {formatCurrency(productInfo.price)}
                              </span>
                              {productInfo.quantity > 1 && (
                                <p className="text-xs text-zinc-500 mt-1">
                                  {productInfo.quantity} ×{" "}
                                  {formatCurrency(
                                    productInfo.price / productInfo.quantity
                                  )}
                                </p>
                              )}
                            </div>
                          </div>
                        </div>

                        {/* Item Total */}
                        <div className="flex justify-between items-center pt-3 border-t border-zinc-100">
                          <div className="text-sm text-zinc-600">
                            Item {index + 1} of {order.items?.length}
                          </div>
                          <div className="text-right">
                            <span className="text-xs text-zinc-500">
                              Item Total:
                            </span>
                            <p className="text-sm sm:text-base font-bold text-zinc-900">
                              {formatCurrency(productInfo.total)}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Shipping and Payment Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {/* Shipping Info */}
            {order.shippingAddress && (
              <div>
                <h3 className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-zinc-900 uppercase tracking-wider mb-3">
                  <MapPin className="w-4 h-4 text-emerald-600" /> Shipping To
                </h3>
                <div className="bg-zinc-50 p-3 sm:p-4 rounded-xl border border-zinc-100 text-sm text-zinc-600 space-y-1">
                  <p className="font-medium text-zinc-900 text-sm sm:text-base">
                    {order.shippingAddress.fullName}
                  </p>
                  <p className="text-xs sm:text-sm">
                    {order.shippingAddress.addressLine1}
                  </p>
                  {order.shippingAddress.addressLine2 && (
                    <p className="text-xs sm:text-sm">
                      {order.shippingAddress.addressLine2}
                    </p>
                  )}
                  <p className="text-xs sm:text-sm">
                    {order.shippingAddress.city}, {order.shippingAddress.state}
                  </p>
                  <p className="text-xs sm:text-sm">
                    {order.shippingAddress.zipCode},{" "}
                    {order.shippingAddress.country}
                  </p>
                  <p className="pt-2 mt-2 border-t border-zinc-200 flex items-center gap-2 text-xs sm:text-sm">
                    <Phone className="w-3 h-3" /> {order.shippingAddress.phone}
                  </p>
                </div>
              </div>
            )}

            {/* Payment Info */}
            <div>
              <h3 className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-zinc-900 uppercase tracking-wider mb-3">
                <CreditCard className="w-4 h-4 text-emerald-600" /> Payment
              </h3>
              <div className="bg-zinc-50 p-3 sm:p-4 rounded-xl border border-zinc-100 text-sm text-zinc-600 space-y-3">
                <div className="flex justify-between">
                  <span className="text-xs sm:text-sm">Method</span>
                  <span className="font-medium text-zinc-900 text-xs sm:text-sm">
                    {order.paymentMethod}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-xs sm:text-sm">Status</span>
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] sm:text-xs font-medium ${
                      order.paymentStatus === "PAID"
                        ? "bg-emerald-100 text-emerald-700"
                        : "bg-amber-100 text-amber-700"
                    }`}
                  >
                    {order.paymentStatus}
                  </span>
                </div>
                {order.paymentId && (
                  <div className="flex justify-between">
                    <span className="text-xs sm:text-sm">Payment ID</span>
                    <span className="font-mono text-[10px] text-zinc-500 truncate max-w-[120px]">
                      {order.paymentId.slice(-8)}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Financial Summary */}
          <div>
            <h3 className="text-xs sm:text-sm font-semibold text-zinc-900 uppercase tracking-wider mb-3">
              Order Summary
            </h3>
            <div className="border border-zinc-200 rounded-xl overflow-hidden">
              <div className="p-3 sm:p-4 space-y-2 bg-white">
                {/* Items Subtotal */}
                <div className="flex justify-between text-xs sm:text-sm text-zinc-600">
                  <span>Items ({order.items?.length || 0})</span>
                  <span>{formatCurrency(order.totalAmount)}</span>
                </div>

                {/* Shipping */}
                <div className="flex justify-between text-xs sm:text-sm text-zinc-600">
                  <span>Shipping</span>
                  <span>{formatCurrency(order.shippingCost)}</span>
                </div>

                {/* Tax */}
                {order.tax > 0 && (
                  <div className="flex justify-between text-xs sm:text-sm text-zinc-600">
                    <span>Tax</span>
                    <span>{formatCurrency(order.tax)}</span>
                  </div>
                )}

                {/* Discount */}
                {order.discount > 0 && (
                  <div className="flex justify-between text-xs sm:text-sm text-emerald-600">
                    <span>Discount</span>
                    <span>-{formatCurrency(order.discount)}</span>
                  </div>
                )}
              </div>

              {/* Grand Total */}
              <div className="bg-zinc-50 p-3 sm:p-4 border-t border-zinc-200 flex justify-between items-center">
                <span className="font-bold text-zinc-900 text-sm sm:text-base">
                  Grand Total
                </span>
                <span className="font-bold text-lg sm:text-xl text-emerald-700">
                  {formatCurrency(order.grandTotal)}
                </span>
              </div>
            </div>

            {/* Payment Note */}
            {order.paymentStatus === "PAID" && (
              <div className="mt-3 p-3 bg-emerald-50 border border-emerald-100 rounded-xl">
                <p className="text-xs text-emerald-700 flex items-center gap-1.5">
                  <CheckCircle className="w-3 h-3" />
                  Payment completed on {formatDate(order.updatedAt)}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-zinc-100 bg-white flex flex-col sm:flex-row justify-end gap-3 safe-area-bottom">
          <button
            onClick={onClose}
            className="w-full sm:w-auto px-4 py-3 sm:py-2 text-sm font-medium text-zinc-600 hover:bg-zinc-50 rounded-lg transition-colors border sm:border-transparent border-zinc-200 order-2 sm:order-1"
          >
            Close
          </button>
          <button
            onClick={() => alert("Invoice download functionality")}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-3 sm:py-2 text-sm font-medium text-white bg-zinc-900 hover:bg-zinc-800 rounded-lg transition-all shadow-lg shadow-zinc-200 order-1 sm:order-2"
          >
            <Download className="w-4 h-4" /> Download Invoice
          </button>
        </div>
      </div>
    </div>
  );
};

// --- MAIN PROFILE COMPONENT ---
const UserProfile = () => {
  const user = useAppSelector(selectUser);
  const apiUrl = `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL_DUMMY}/api/orders/users/${user?.user_id}/orders`;
  const updateUrl = `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL_DUMMY}/api/auth/${user?.id}`;

  const [isEditing, setIsEditing] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [updateError, setUpdateError] = useState(null);

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({
    page: 1,
    totalPages: 1,
    hasNextPage: false,
    hasPrevPage: false,
    total: 0,
  });

  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, isValid },
    reset,
  } = useForm({
    mode: "onChange",
    defaultValues: useMemo(
      () => ({
        name: user?.name || "",
        phone: user?.phone || "",
        location: user?.location || "",
      }),
      [user]
    ),
  });

  useEffect(() => {
    if (user) {
      reset({
        name: user.name || "",
        phone: user.phone || "",
        location: user.location || "",
      });
    }
  }, [user, reset]);

  const fetchOrders = async (page = 1) => {
    try {
      setLoading(true);
      if (!user?.user_id) {
        setLoading(false);
        return;
      }
      const response = await fetch(`${apiUrl}?page=${page}&limit=5`);
      if (!response.ok) {
        throw new Error("Failed to fetch orders");
      }
      const data = await response.json();
      if (data.status === "success") {
        setOrders(data.data.data);
        setPagination({
          page: data.data.meta.page,
          totalPages: data.data.meta.totalPages,
          hasNextPage: data.data.meta.hasNextPage,
          hasPrevPage: data.data.meta.hasPrevPage,
          total: data.data.meta.total,
        });
      } else {
        throw new Error(data.message || "Failed to fetch orders");
      }
    } catch (err) {
      setError(err.message);
      console.error("Error fetching orders:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders(1);
  }, [user]);

  const updateProfile = async (data) => {
    setIsSubmitting(true);
    setUpdateSuccess(false);
    setUpdateError(null);

    try {
      const response = await fetch(updateUrl, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.name,
          phone: data.phone,
          location: data.location,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to update profile");
      }

      const result = await response.json();

      if (result.status === "success") {
        setUpdateSuccess(true);
        setIsEditing(false);
        setTimeout(() => setUpdateSuccess(false), 3000);
      } else {
        throw new Error(result.message || "Failed to update profile");
      }
    } catch (err) {
      setUpdateError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= pagination.totalPages) {
      fetchOrders(newPage);
    }
  };

  const calculateStats = () => {
    const totalSpent = orders
      .filter((order) => order.status === "DELIVERED")
      .reduce((sum, order) => sum + order.grandTotal, 0);

    const activeOrders = orders.filter(
      (o) => o.status !== "DELIVERED" && o.status !== "CANCELLED"
    ).length;

    return [
      {
        label: "Total Orders",
        value: pagination.total.toString(),
        icon: ShoppingBag,
        color: "text-blue-600",
        bg: "bg-blue-50",
      },
      {
        label: "Pending",
        value: activeOrders.toString(),
        icon: Clock,
        color: "text-amber-600",
        bg: "bg-amber-50",
      },
      {
        label: "Total Spent",
        value: `₹${totalSpent.toLocaleString()}`,
        icon: TrendingUp,
        color: "text-emerald-600",
        bg: "bg-emerald-50",
      },
    ];
  };

  return (
    <div className="min-h-screen bg-zinc-50/50 pb-20">
      {/* --- HERO SECTION: Responsive Text & Padding --- */}
      <div className="relative bg-white border-b border-zinc-200 pt-20 pb-8 lg:pt-10 lg:pb-16 overflow-hidden">
        {/* Abstract Background Pattern */}
        <div className="absolute inset-0 opacity-40 pointer-events-none">
          <div className="absolute top-0 right-0 w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] bg-emerald-50/50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
          <div className="absolute bottom-0 left-0 w-[250px] sm:w-[400px] h-[250px] sm:h-[400px] bg-indigo-50/50 rounded-full blur-3xl translate-y-1/3 -translate-x-1/3"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-serif text-zinc-900 mb-2">
                Welcome back,{" "}
                <span className="text-emerald-800">
                  {user?.name?.split(" ")[0] || "User"}
                </span>
              </h1>
              <p className="text-sm sm:text-base text-zinc-500 max-w-lg leading-relaxed">
                Manage your profile details, track your orders, and view your
                purchase history all in one place.
              </p>
            </div>

            {/* Stats Row: Scrollable on mobile, Grid on desktop */}
            <div className="flex md:grid md:grid-cols-3 gap-3 overflow-x-auto pb-2 md:pb-0 -mx-4 px-4 md:mx-0 md:px-0 scrollbar-hide snap-x">
              {calculateStats().map((stat, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 bg-white/60 backdrop-blur-sm border border-zinc-200 px-4 py-3 rounded-2xl shadow-sm min-w-[150px] snap-center"
                >
                  <div className={`p-2 rounded-xl ${stat.bg} flex-shrink-0`}>
                    <stat.icon
                      className={`w-4 h-4 sm:w-5 sm:h-5 ${stat.color}`}
                    />
                  </div>
                  <div>
                    <p className="text-[10px] sm:text-xs font-medium text-zinc-500 uppercase tracking-wide">
                      {stat.label}
                    </p>
                    <p className="text-base sm:text-lg font-bold text-zinc-900">
                      {stat.value}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 sm:-mt-8 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
          {/* --- LEFT COLUMN: PROFILE --- */}
          <div className="lg:col-span-4 space-y-6">
            {/* Sticky only on Desktop */}
            <div className="bg-white rounded-2xl shadow-sm border border-zinc-200 overflow-hidden lg:sticky lg:top-24">
              {/* Profile Header */}
              <div className="h-24 sm:h-32 bg-gradient-to-r from-zinc-800 to-zinc-900 relative">
                <button
                  onClick={() => {
                    setIsEditing(!isEditing);
                    setUpdateError(null);
                    if (!isEditing) reset();
                  }}
                  className="absolute top-3 right-3 sm:top-4 sm:right-4 bg-white/10 backdrop-blur-md text-white p-2 rounded-lg hover:bg-white/20 transition-colors z-10"
                >
                  {isEditing ? (
                    <X className="w-4 h-4" />
                  ) : (
                    <Edit2 className="w-4 h-4" />
                  )}
                </button>
              </div>

              <div className="px-5 pb-5 sm:px-6 sm:pb-6 relative">
                <div className="-mt-10 sm:-mt-12 mb-4">
                  <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl border-4 border-white bg-zinc-100 flex items-center justify-center shadow-md">
                    <span className="text-2xl sm:text-3xl font-serif text-zinc-400">
                      {user?.name?.charAt(0) || "U"}
                    </span>
                  </div>
                </div>

                {updateSuccess && (
                  <div className="mb-4 p-3 bg-emerald-50 border border-emerald-100 text-emerald-700 text-xs sm:text-sm rounded-xl flex items-center gap-2 animate-in fade-in">
                    <CheckCircle className="w-4 h-4" /> Profile Updated!
                  </div>
                )}

                {updateError && (
                  <div className="mb-4 p-3 bg-red-50 border border-red-100 text-red-700 text-xs sm:text-sm rounded-xl flex items-center gap-2 animate-in fade-in">
                    <AlertCircle className="w-4 h-4" /> {updateError}
                  </div>
                )}

                {!isEditing ? (
                  <div className="space-y-4 animate-in fade-in">
                    <div>
                      <h2 className="text-lg sm:text-xl font-bold text-zinc-900">
                        {user?.name || "Guest User"}
                      </h2>
                      <p className="text-xs sm:text-sm text-zinc-500">Member</p>
                    </div>

                    <div className="space-y-3 pt-4 border-t border-zinc-100">
                      <div className="flex items-center gap-3 text-zinc-600">
                        <Mail className="w-4 h-4 text-zinc-400 flex-shrink-0" />
                        <span className="text-xs sm:text-sm break-all">
                          {user?.email || "No email"}
                        </span>
                      </div>
                      <div className="flex items-center gap-3 text-zinc-600">
                        <Phone className="w-4 h-4 text-zinc-400 flex-shrink-0" />
                        <span className="text-xs sm:text-sm">
                          {user?.phone || "No phone"}
                        </span>
                      </div>
                      <div className="flex items-center gap-3 text-zinc-600">
                        <MapPin className="w-4 h-4 text-zinc-400 flex-shrink-0" />
                        <span className="text-xs sm:text-sm">
                          {user?.location || "No location"}
                        </span>
                      </div>
                    </div>
                  </div>
                ) : (
                  /* Edit Form */
                  <form
                    onSubmit={handleSubmit(updateProfile)}
                    className="space-y-4 animate-in fade-in slide-in-from-top-2"
                  >
                    <div>
                      <label className="block text-xs font-semibold text-zinc-500 mb-1">
                        Full Name
                      </label>
                      <input
                        {...register("name", {
                          required: "Name is required",
                          minLength: { value: 2, message: "Min 2 chars" },
                        })}
                        className={`w-full px-3 py-2.5 sm:py-2 rounded-lg border ${
                          errors.name ? "border-red-300" : "border-zinc-200"
                        } focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 text-sm`}
                      />
                      {errors.name && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors.name.message}
                        </p>
                      )}
                    </div>

                    {/* Email Read-only */}
                    <div>
                      <label className="block text-xs font-semibold text-zinc-500 mb-1">
                        Email
                      </label>
                      <input
                        value={user?.email || ""}
                        disabled
                        className="w-full px-3 py-2.5 sm:py-2 rounded-lg border border-zinc-100 bg-zinc-50 text-zinc-400 text-sm cursor-not-allowed"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-zinc-500 mb-1">
                        Phone
                      </label>
                      <input
                        {...register("phone", {
                          required: "Phone is required",
                          pattern: {
                            value: /^[0-9]{10}$/,
                            message: "Valid 10-digit phone",
                          },
                        })}
                        className={`w-full px-3 py-2.5 sm:py-2 rounded-lg border ${
                          errors.phone ? "border-red-300" : "border-zinc-200"
                        } focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 text-sm`}
                      />
                      {errors.phone && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors.phone.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-zinc-500 mb-1">
                        Location
                      </label>
                      <input
                        {...register("location", {
                          required: "Location is required",
                        })}
                        className={`w-full px-3 py-2.5 sm:py-2 rounded-lg border ${
                          errors.location ? "border-red-300" : "border-zinc-200"
                        } focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 text-sm`}
                      />
                      {errors.location && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors.location.message}
                        </p>
                      )}
                    </div>

                    <div className="pt-2 flex flex-col sm:flex-row gap-3 sm:gap-2">
                      <button
                        type="button"
                        onClick={() => setIsEditing(false)}
                        className="w-full sm:flex-1 bg-white border border-zinc-200 text-zinc-600 py-2.5 sm:py-2 rounded-lg font-medium text-sm hover:bg-zinc-50 transition-colors"
                      >
                        Cancel
                      </button>
                      <button
                        disabled={!isDirty || !isValid || isSubmitting}
                        type="submit"
                        className="w-full sm:flex-1 bg-emerald-600 text-white py-2.5 sm:py-2 rounded-lg font-medium text-sm hover:bg-emerald-700 transition-colors flex justify-center items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isSubmitting ? (
                          <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                          <>
                            <Save className="w-4 h-4" /> Save
                          </>
                        )}
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>

          {/* --- RIGHT COLUMN: ORDERS --- */}
          <div className="lg:col-span-8 space-y-6">
            {/* Filter / Search Bar */}
            <div className="flex flex-col sm:flex-row gap-4 justify-between items-center bg-white p-4 rounded-2xl border border-zinc-200 shadow-sm">
              <h2 className="text-base sm:text-lg font-bold text-zinc-900 flex items-center gap-2 w-full sm:w-auto">
                Recent Orders{" "}
                <span className="bg-zinc-100 text-zinc-600 text-xs px-2 py-1 rounded-full">
                  {pagination.total}
                </span>
              </h2>

              {/* Pagination Controls */}
              <div className="flex items-center gap-2 w-full sm:w-auto justify-between sm:justify-end">
                <button
                  onClick={() => handlePageChange(pagination.page - 1)}
                  disabled={!pagination.hasPrevPage}
                  className="p-2 bg-zinc-50 border border-zinc-200 rounded-lg text-zinc-600 hover:bg-zinc-100 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <span className="text-xs sm:text-sm text-zinc-500 font-medium px-2">
                  Page {pagination.page} / {pagination.totalPages}
                </span>
                <button
                  onClick={() => handlePageChange(pagination.page + 1)}
                  disabled={!pagination.hasNextPage}
                  className="p-2 bg-zinc-50 border border-zinc-200 rounded-lg text-zinc-600 hover:bg-zinc-100 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {loading ? (
              <div className="flex justify-center py-20">
                <Loader2 className="w-8 h-8 text-emerald-600 animate-spin" />
              </div>
            ) : error ? (
              <div className="text-center py-20 bg-red-50 rounded-2xl border border-red-100 px-4">
                <AlertCircle className="w-10 h-10 sm:w-12 sm:h-12 text-red-300 mx-auto mb-4" />
                <h3 className="text-red-900 font-medium text-sm sm:text-base">
                  Failed to load orders
                </h3>
                <p className="text-red-500 text-xs sm:text-sm mt-1 mb-4">
                  {error}
                </p>
                <button
                  onClick={() => fetchOrders(1)}
                  className="text-red-700 text-sm font-semibold hover:underline bg-white px-4 py-2 rounded-lg border border-red-200"
                >
                  Try Again
                </button>
              </div>
            ) : orders.length === 0 ? (
              <div className="text-center py-20 bg-white rounded-2xl border border-zinc-200 border-dashed px-4">
                <Package className="w-10 h-10 sm:w-12 sm:h-12 text-zinc-300 mx-auto mb-4" />
                <h3 className="text-zinc-900 font-medium">No orders yet</h3>
                <p className="text-zinc-500 text-xs sm:text-sm mt-1">
                  Start shopping to see your history here.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {orders.map((order) => (
                  <div
                    key={order.id}
                    className="group bg-white rounded-2xl border border-zinc-200 hover:border-emerald-300 hover:shadow-lg hover:shadow-emerald-500/5 transition-all duration-300 overflow-hidden"
                  >
                    {/* Order Card Container: Col on mobile, Row on Desktop */}
                    <div className="p-4 sm:p-6 flex flex-col sm:flex-row gap-4 sm:gap-6">
                      {/* Order Icon/Date Section */}
                      <div className="flex flex-row sm:flex-col items-center sm:items-start gap-3 sm:gap-1 sm:w-32 flex-shrink-0">
                        <div className="w-10 h-10 sm:w-12 sm:h-12 bg-zinc-50 rounded-xl flex items-center justify-center border border-zinc-100 group-hover:bg-emerald-50 group-hover:text-emerald-600 transition-colors">
                          <ShoppingBag className="w-5 h-5 text-zinc-400 group-hover:text-emerald-600" />
                        </div>
                        <div className="sm:mt-2">
                          <p className="hidden sm:block text-xs text-zinc-400 font-medium uppercase tracking-wide">
                            Placed On
                          </p>
                          <p className="text-xs sm:text-sm font-medium text-zinc-900">
                            {new Date(
                              order.placedAt || order.createdAt
                            ).toLocaleDateString()}
                          </p>
                        </div>
                        {/* Mobile Only Status Badge moved here for space efficiency */}
                        <div className="sm:hidden ml-auto">
                          <StatusBadge status={order.status} />
                        </div>
                      </div>

                      {/* Order Info */}
                      <div className="flex-1 space-y-3">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-bold text-zinc-900 text-base sm:text-lg group-hover:text-emerald-700 transition-colors">
                              Order #{order.order_id || order.id}
                            </h3>
                            <p className="text-xs sm:text-sm text-zinc-500 mt-1 flex items-center gap-2">
                              {order.items ? order.items.length : 0} Items •{" "}
                              <span className="font-medium text-zinc-900">
                                {new Intl.NumberFormat("en-IN", {
                                  style: "currency",
                                  currency: "INR",
                                }).format(order.grandTotal)}
                              </span>
                            </p>
                          </div>
                          {/* Desktop Status Badge */}
                          <div className="hidden sm:block">
                            <StatusBadge status={order.status} />
                          </div>
                        </div>

                        {/* Order Items Preview */}
                        {/* {order.items && order.items.length > 0 && (
                          <div className="space-y-2 pt-2">
                            {order.items.slice(0, 2).map((item, index) => (
                              <OrderItemPreview
                                key={item.id || index}
                                item={item}
                              />
                            ))}
                            {order.items.length > 2 && (
                              <p className="text-xs text-zinc-500 text-center">
                                +{order.items.length - 2} more items
                              </p>
                            )}
                          </div>
                        )} */}

                        <div className="pt-3 border-t border-zinc-100 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs sm:text-sm text-zinc-500">
                          <span className="flex items-center gap-1.5">
                            <CreditCard className="w-3.5 h-3.5" />{" "}
                            {order.paymentMethod}
                          </span>
                          <span className="flex items-center gap-1.5">
                            <Truck className="w-3.5 h-3.5" />{" "}
                            {order.shippingMethod || "Standard"}
                          </span>
                        </div>
                      </div>

                      {/* Action Button */}
                      <div className="flex items-center justify-end sm:justify-center sm:pl-6 sm:border-l border-zinc-100 mt-2 sm:mt-0">
                        <button
                          onClick={() => {
                            setSelectedOrder(order);
                            setIsModalOpen(true);
                          }}
                          className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-zinc-900 text-white text-sm font-medium hover:bg-zinc-800 hover:scale-[1.02] active:scale-95 transition-all shadow-lg shadow-zinc-200"
                        >
                          View Details <ArrowRight className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <OrderDetailModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        order={selectedOrder}
      />
    </div>
  );
};

export default UserProfile;
