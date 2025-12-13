"use client";
import React, { useState, useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import {
  FaEdit,
  FaMapMarkerAlt,
  FaCheckCircle,
  FaShippingFast,
  FaUser,
  FaEnvelope,
  FaShoppingBag,
  FaBox,
  FaRupeeSign,
  FaClock,
  FaExclamationTriangle,
  FaTruck,
  FaCreditCard,
  FaCalendarAlt,
  FaTimes,
  FaHome,
  FaPhone,
  FaLocationArrow,
  FaReceipt,
  FaTag,
  FaInfoCircle,
  FaSave,
  FaSpinner,
} from "react-icons/fa";
import { useAppSelector } from "@src/redux/store"; // Adjust import based on your structure
import { selectUser } from "@src/redux/reducers/authSlice"; // Adjust import based on your structure

// Order Detail Modal Component
const OrderDetailModal = ({ order, isOpen, onClose }) => {
  if (!isOpen || !order) return null;

  // Status configuration
  const getStatusConfig = (status) => {
    const configs = {
      PENDING: {
        color: "bg-yellow-100 text-yellow-800",
        borderColor: "border-yellow-500",
        icon: <FaClock />,
        label: "Pending",
      },
      PROCESSING: {
        color: "bg-blue-100 text-blue-800",
        borderColor: "border-blue-500",
        icon: <FaTruck />,
        label: "Processing",
      },
      SHIPPED: {
        color: "bg-purple-100 text-purple-800",
        borderColor: "border-purple-500",
        icon: <FaShippingFast />,
        label: "Shipped",
      },
      DELIVERED: {
        color: "bg-green-100 text-green-800",
        borderColor: "border-green-500",
        icon: <FaCheckCircle />,
        label: "Delivered",
      },
      CANCELLED: {
        color: "bg-red-100 text-red-800",
        borderColor: "border-red-500",
        icon: <FaExclamationTriangle />,
        label: "Cancelled",
      },
    };

    return (
      configs[status] || {
        color: "bg-gray-100 text-gray-800",
        borderColor: "border-gray-500",
        icon: <FaInfoCircle />,
        label: status,
      }
    );
  };

  // Payment status configuration
  const getPaymentStatusConfig = (status) => {
    const configs = {
      PAID: {
        color: "bg-green-100 text-green-800",
        label: "Paid",
      },
      UNPAID: {
        color: "bg-red-100 text-red-800",
        label: "Unpaid",
      },
      PENDING: {
        color: "bg-yellow-100 text-yellow-800",
        label: "Pending",
      },
    };

    return (
      configs[status] || {
        color: "bg-gray-100 text-gray-800",
        label: status,
      }
    );
  };

  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 2,
    }).format(amount);
  };

  const statusConfig = getStatusConfig(order.status);
  const paymentConfig = getPaymentStatusConfig(order.paymentStatus);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Modal Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between rounded-t-2xl">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Order Details</h2>
            <p className="text-gray-600">Order #{order.order_id}</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <FaTimes className="text-gray-500 text-xl" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6 space-y-6">
          {/* Order Status Badges */}
          <div className="flex flex-wrap gap-4">
            <div
              className={`px-4 py-2 ${statusConfig.color} rounded-full font-semibold flex items-center gap-2`}
            >
              {statusConfig.icon}
              {statusConfig.label}
            </div>
            <div
              className={`px-4 py-2 ${paymentConfig.color} rounded-full font-semibold flex items-center gap-2`}
            >
              <FaCreditCard />
              {paymentConfig.label}
            </div>
          </div>

          {/* Order Timeline */}
          <div className="bg-gray-50 rounded-xl p-6">
            <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <FaCalendarAlt className="text-teal-600" />
              Order Timeline
            </h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-teal-100 flex items-center justify-center">
                    <FaClock className="text-teal-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Order Placed</p>
                    <p className="text-sm text-gray-500">
                      {formatDate(order.placedAt)}
                    </p>
                  </div>
                </div>
                <div className="w-2 h-2 rounded-full bg-teal-500"></div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                    <FaTruck className="text-gray-400" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Processing</p>
                    <p className="text-sm text-gray-500">In progress</p>
                  </div>
                </div>
                <div className="w-2 h-2 rounded-full bg-gray-300"></div>
              </div>

              {order.deliveredAt && (
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                      <FaCheckCircle className="text-green-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">Delivered</p>
                      <p className="text-sm text-gray-500">
                        {formatDate(order.deliveredAt)}
                      </p>
                    </div>
                  </div>
                  <div className="w-2 h-2 rounded-full bg-green-500"></div>
                </div>
              )}
            </div>
          </div>

          {/* Shipping Address */}
          {order.shippingAddress && (
            <div className="bg-gradient-to-r from-teal-50 to-teal-100 rounded-xl p-6 border border-teal-200">
              <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <FaHome className="text-teal-600" />
                Shipping Address
              </h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <FaUser className="text-teal-600 mt-1" />
                  <div>
                    <p className="font-medium text-gray-900">
                      {order.shippingAddress.fullName}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <FaPhone className="text-teal-600" />
                  <p className="text-gray-700">{order.shippingAddress.phone}</p>
                </div>
                <div className="flex items-start gap-3">
                  <FaLocationArrow className="text-teal-600 mt-1" />
                  <div>
                    <p className="text-gray-700">
                      {order.shippingAddress.addressLine1}
                    </p>
                    {order.shippingAddress.addressLine2 && (
                      <p className="text-gray-700">
                        {order.shippingAddress.addressLine2}
                      </p>
                    )}
                    <p className="text-gray-700">
                      {order.shippingAddress.city},{" "}
                      {order.shippingAddress.state}{" "}
                      {order.shippingAddress.zipCode}
                    </p>
                    <p className="text-gray-700">
                      {order.shippingAddress.country}
                    </p>
                    {order.shippingAddress.isDefault && (
                      <span className="inline-block mt-2 px-2 py-1 bg-teal-100 text-teal-800 text-xs rounded">
                        Default Address
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Order Summary */}
          <div className="bg-white border border-gray-200 rounded-xl p-6">
            <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <FaReceipt className="text-teal-600" />
              Order Summary
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-medium">
                  {formatCurrency(order.totalAmount)}
                </span>
              </div>
              {order.discount > 0 && (
                <div className="flex justify-between">
                  <span className="text-gray-600 flex items-center gap-2">
                    <FaTag className="text-green-600" />
                    Discount
                  </span>
                  <span className="font-medium text-green-600">
                    -{formatCurrency(order.discount)}
                  </span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-gray-600">Tax</span>
                <span className="font-medium">{formatCurrency(order.tax)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Shipping Cost</span>
                <span className="font-medium">
                  {formatCurrency(order.shippingCost)}
                </span>
              </div>
              <div className="border-t border-gray-200 pt-3">
                <div className="flex justify-between">
                  <span className="text-lg font-bold text-gray-900">
                    Grand Total
                  </span>
                  <span className="text-2xl font-bold text-teal-700">
                    {formatCurrency(order.grandTotal)}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Payment & Shipping Info */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-gray-50 rounded-xl p-6">
              <h4 className="font-semibold text-gray-900 mb-3">
                Payment Information
              </h4>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Method</span>
                  <span className="font-medium">{order.paymentMethod}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Status</span>
                  <span
                    className={`px-2 py-1 ${paymentConfig.color} rounded text-xs font-medium`}
                  >
                    {paymentConfig.label}
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 rounded-xl p-6">
              <h4 className="font-semibold text-gray-900 mb-3">
                Shipping Information
              </h4>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Method</span>
                  <span className="font-medium">{order.shippingMethod}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping Cost</span>
                  <span className="font-medium">
                    {formatCurrency(order.shippingCost)}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Dates */}
          <div className="grid md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-500 mb-1">Order Created</p>
              <p className="font-medium">{formatDate(order.createdAt)}</p>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-500 mb-1">Last Updated</p>
              <p className="font-medium">{formatDate(order.updatedAt)}</p>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-500 mb-1">Order ID</p>
              <p className="font-medium text-sm break-all">{order.id}</p>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="sticky bottom-0 bg-white border-t border-gray-200 p-6 flex justify-end gap-3 rounded-b-2xl">
          <button
            onClick={onClose}
            className="px-6 py-3 border border-gray-300 rounded-xl text-gray-700 hover:bg-gray-50 transition-all duration-300 font-medium"
          >
            Close
          </button>
          <button
            onClick={() => {
              alert("Invoice download functionality would go here");
            }}
            className="px-6 py-3 bg-gradient-to-r from-teal-600 to-teal-700 text-white rounded-xl hover:from-teal-700 hover:to-teal-800 transition-all duration-300 font-medium"
          >
            Download Invoice
          </button>
        </div>
      </div>
    </div>
  );
};

// Main User Profile Component
const UserProfile = () => {
  const user = useAppSelector(selectUser);
  const userId = 1;
  const apiUrl = `http://localhost:8020/api/orders/users/${user?.user_id}/orders`;
  const updateUrl = `http://localhost:8020/api/auth/${user.id}`;

  // Get user from Redux store
  console.log("User from Redux:", user);

  // Profile state
  const [isEditing, setIsEditing] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [updateError, setUpdateError] = useState(null);

  // React Hook Form
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, isValid },
    reset,
    watch,
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

  // Watch form values to detect changes
  const formValues = watch();

  // Orders state
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

  // Modal state
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Initialize form with user data
  useEffect(() => {
    if (user) {
      reset({
        name: user.name || "",
        phone: user.phone || "",
        location: user.location || "",
      });
    }
  }, [user, reset]);

  // Fetch orders from API
  const fetchOrders = async (page = 1) => {
    try {
      setLoading(true);
      const response = await fetch(`${apiUrl}?page=${page}&limit=10`);
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
  }, []);

  // Update profile API call
  const updateProfile = async (data) => {
    setIsSubmitting(true);
    setUpdateSuccess(false);
    setUpdateError(null);

    try {
      const response = await fetch(updateUrl, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
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
        // Here you might want to update the Redux store with new user data
        // dispatch(updateUserProfile(result.data));

        // Hide success message after 3 seconds
        setTimeout(() => {
          setUpdateSuccess(false);
        }, 3000);
      } else {
        throw new Error(result.message || "Failed to update profile");
      }
    } catch (err) {
      setUpdateError(err.message);
      console.error("Error updating profile:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Status configuration
  const getStatusConfig = (status) => {
    const configs = {
      PENDING: {
        color: "bg-yellow-100 text-yellow-800",
        borderColor: "border-yellow-500",
        icon: <FaClock className="text-sm" />,
        label: "Pending",
      },
      PROCESSING: {
        color: "bg-blue-100 text-blue-800",
        borderColor: "border-blue-500",
        icon: <FaTruck className="text-sm" />,
        label: "Processing",
      },
      SHIPPED: {
        color: "bg-purple-100 text-purple-800",
        borderColor: "border-purple-500",
        icon: <FaShippingFast className="text-sm" />,
        label: "Shipped",
      },
      DELIVERED: {
        color: "bg-green-100 text-green-800",
        borderColor: "border-green-500",
        icon: <FaCheckCircle className="text-sm" />,
        label: "Delivered",
      },
      CANCELLED: {
        color: "bg-red-100 text-red-800",
        borderColor: "border-red-500",
        icon: <FaExclamationTriangle className="text-sm" />,
        label: "Cancelled",
      },
    };

    return (
      configs[status] || {
        color: "bg-gray-100 text-gray-800",
        borderColor: "border-gray-500",
        icon: <FaInfoCircle className="text-sm" />,
        label: status,
      }
    );
  };

  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 2,
    }).format(amount);
  };

  // Format date to readable format
  const formatShortDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  // Calculate stats from orders
  const calculateStats = () => {
    const deliveredCount = orders.filter(
      (order) => order.status === "DELIVERED"
    ).length;
    const pendingCount = orders.filter(
      (order) => order.status === "PENDING"
    ).length;
    const totalSpent = orders
      .filter((order) => order.status === "DELIVERED")
      .reduce((sum, order) => sum + order.grandTotal, 0);

    return [
      {
        label: "Total Orders",
        value: pagination.total.toString(),
        icon: <FaShoppingBag className="text-teal-600" />,
        color: "from-teal-50 to-teal-100",
      },
      {
        label: "Pending",
        value: pendingCount.toString(),
        icon: <FaClock className="text-yellow-600" />,
        color: "from-yellow-50 to-yellow-100",
      },
      {
        label: "Delivered",
        value: deliveredCount.toString(),
        icon: <FaBox className="text-green-600" />,
        color: "from-green-50 to-green-100",
      },
      {
        label: "Total Spent",
        value: formatCurrency(totalSpent),
        icon: <FaRupeeSign className="text-teal-600" />,
        color: "from-blue-50 to-blue-100",
      },
    ];
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    reset();
    setIsEditing(false);
    setUpdateError(null);
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= pagination.totalPages) {
      fetchOrders(newPage);
    }
  };

  const handleViewOrderDetails = (order) => {
    setSelectedOrder(order);
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-3 sm:p-4 md:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Success Message */}
        {updateSuccess && (
          <div className="mb-4 sm:mb-6 p-3 sm:p-4 bg-green-50 border border-green-200 rounded-lg sm:rounded-xl">
            <div className="flex items-start sm:items-center gap-2 sm:gap-3">
              <FaCheckCircle className="text-green-600 text-lg sm:text-xl flex-shrink-0 mt-0.5 sm:mt-0" />
              <div className="flex-1 min-w-0">
                <p className="font-medium text-green-800 text-sm sm:text-base">
                  Profile updated successfully!
                </p>
                <p className="text-xs sm:text-sm text-green-600 mt-0.5">
                  Your changes have been saved.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Error Message */}
        {updateError && (
          <div className="mb-4 sm:mb-6 p-3 sm:p-4 bg-red-50 border border-red-200 rounded-lg sm:rounded-xl">
            <div className="flex items-start sm:items-center gap-2 sm:gap-3">
              <FaExclamationTriangle className="text-red-600 text-lg sm:text-xl flex-shrink-0 mt-0.5 sm:mt-0" />
              <div className="flex-1 min-w-0">
                <p className="font-medium text-red-800 text-sm sm:text-base">
                  Update failed
                </p>
                <p className="text-xs sm:text-sm text-red-600 mt-0.5 break-words">
                  {updateError}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* PROFILE SECTION - IMPROVED MOBILE RESPONSIVE */}
        <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg sm:shadow-xl overflow-hidden mb-6 sm:mb-8">
          {/* Cover with teal gradient - Reduced height on mobile */}
          <div className="h-20 sm:h-24 md:h-32 bg-gradient-to-r from-teal-600 to-teal-800 relative">
            <div className="absolute inset-0 bg-black opacity-5"></div>
          </div>

          {/* Profile Content */}
          <div className="relative px-4 sm:px-5 md:px-6 pb-4 sm:pb-5 md:pb-6">
            {/* Avatar and Basic Info Section */}
            <div className="flex flex-col sm:flex-row sm:items-end -mt-10 sm:-mt-12 gap-3 sm:gap-4">
              {/* Avatar - Smaller on mobile */}
              <div className="relative flex-shrink-0 mx-auto sm:mx-0">
                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full border-4 border-white shadow-xl bg-gradient-to-br from-teal-500 to-teal-700 flex items-center justify-center">
                  <span className="text-white text-xl sm:text-2xl font-bold">
                    {user?.name
                      ?.split(" ")
                      .map((n) => n[0])
                      .join("")
                      .toUpperCase() || "JD"}
                  </span>
                </div>
              </div>

              {/* Profile Info and Edit Button */}
              <div className="flex-1 min-w-0">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                  {/* User Details */}
                  <div className="flex-1 min-w-0">
                    {!isEditing ? (
                      <div className="space-y-2 text-center sm:text-left">
                        <h1 className="text-xl sm:text-2xl font-bold text-gray-900 truncate">
                          {user?.name || "John Doe"}
                        </h1>

                        {/* Contact Details - Stack on mobile */}
                        <div className="space-y-1.5 sm:space-y-1">
                          <div className="flex items-center justify-center sm:justify-start gap-2 text-gray-600">
                            <FaEnvelope className="text-xs sm:text-sm flex-shrink-0" />
                            <span className="text-xs sm:text-sm truncate max-w-full">
                              {user?.email || "john.doe@example.com"}
                            </span>
                          </div>

                          <div className="flex items-center justify-center sm:justify-start gap-2 text-gray-500">
                            <FaPhone className="text-teal-600 text-xs sm:text-sm flex-shrink-0" />
                            <span className="text-xs sm:text-sm">
                              {user?.phone || "9876543210"}
                            </span>
                          </div>

                          <div className="flex items-center justify-center sm:justify-start gap-2 text-gray-500">
                            <FaMapMarkerAlt className="text-teal-600 text-xs sm:text-sm flex-shrink-0" />
                            <span className="text-xs sm:text-sm line-clamp-1">
                              {user?.location || "Mumbai, Maharashtra, India"}
                            </span>
                          </div>
                        </div>
                      </div>
                    ) : (
                      // EDIT MODE - Improved Mobile Form
                      <form
                        onSubmit={handleSubmit(updateProfile)}
                        className="space-y-3 sm:space-y-4 w-full"
                      >
                        {/* Form Fields */}
                        <div className="space-y-3 sm:space-y-4">
                          {/* Name Field */}
                          <div>
                            <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                              Name *
                            </label>
                            <input
                              type="text"
                              {...register("name", {
                                required: "Name is required",
                                minLength: {
                                  value: 2,
                                  message: "Name must be at least 2 characters",
                                },
                              })}
                              className={`w-full px-3 py-2 sm:py-2.5 text-sm sm:text-base border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all ${
                                errors.name
                                  ? "border-red-300"
                                  : "border-gray-300"
                              }`}
                              placeholder="Enter your name"
                            />
                            {errors.name && (
                              <p className="mt-1 text-xs sm:text-sm text-red-600">
                                {errors.name.message}
                              </p>
                            )}
                          </div>

                          {/* Email Field (Read-only) */}
                          <div>
                            <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                              Email
                            </label>
                            <input
                              type="email"
                              value={user?.email || "john.doe@example.com"}
                              readOnly
                              disabled
                              className="w-full px-3 py-2 sm:py-2.5 text-sm sm:text-base border border-gray-300 rounded-lg bg-gray-50 text-gray-500"
                            />
                            <p className="mt-1 text-xs text-gray-500">
                              Email cannot be changed
                            </p>
                          </div>

                          {/* Phone Field */}
                          <div>
                            <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                              Phone Number *
                            </label>
                            <input
                              type="tel"
                              {...register("phone", {
                                required: "Phone number is required",
                                pattern: {
                                  value: /^[0-9]{10}$/,
                                  message:
                                    "Please enter a valid 10-digit phone number",
                                },
                              })}
                              className={`w-full px-3 py-2 sm:py-2.5 text-sm sm:text-base border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all ${
                                errors.phone
                                  ? "border-red-300"
                                  : "border-gray-300"
                              }`}
                              placeholder="Enter your phone number"
                            />
                            {errors.phone && (
                              <p className="mt-1 text-xs sm:text-sm text-red-600">
                                {errors.phone.message}
                              </p>
                            )}
                          </div>

                          {/* Location Field */}
                          <div>
                            <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                              Location *
                            </label>
                            <input
                              type="text"
                              {...register("location", {
                                required: "Location is required",
                              })}
                              className={`w-full px-3 py-2 sm:py-2.5 text-sm sm:text-base border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all ${
                                errors.location
                                  ? "border-red-300"
                                  : "border-gray-300"
                              }`}
                              placeholder="Enter your location"
                            />
                            {errors.location && (
                              <p className="mt-1 text-xs sm:text-sm text-red-600">
                                {errors.location.message}
                              </p>
                            )}
                          </div>
                        </div>

                        {/* Action Buttons - Full width on mobile */}
                        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 pt-2 sm:pt-4">
                          <button
                            type="button"
                            onClick={handleCancel}
                            className="w-full sm:w-auto px-4 py-2.5 sm:py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors font-medium text-sm"
                          >
                            Cancel
                          </button>
                          <button
                            type="submit"
                            disabled={!isDirty || !isValid || isSubmitting}
                            className={`w-full sm:w-auto px-4 py-2.5 sm:py-2 rounded-lg font-medium flex items-center justify-center gap-2 transition-all text-sm ${
                              isDirty && isValid && !isSubmitting
                                ? "bg-gradient-to-r from-teal-600 to-teal-700 text-white hover:from-teal-700 hover:to-teal-800 shadow-md hover:shadow-lg"
                                : "bg-gray-200 text-gray-500 cursor-not-allowed"
                            }`}
                          >
                            {isSubmitting ? (
                              <>
                                <FaSpinner className="animate-spin" />
                                <span>Saving...</span>
                              </>
                            ) : (
                              <>
                                <FaSave />
                                <span>Save Changes</span>
                              </>
                            )}
                          </button>
                        </div>
                      </form>
                    )}
                  </div>

                  {/* Edit Button - Full width on mobile when not editing */}
                  {!isEditing && (
                    <button
                      onClick={handleEditClick}
                      className="w-full sm:w-auto px-4 py-2.5 sm:py-2 bg-gradient-to-r from-teal-600 to-teal-700 text-white rounded-lg hover:from-teal-700 hover:to-teal-800 transition-all duration-300 shadow-md hover:shadow-lg font-medium flex items-center justify-center gap-2 text-sm flex-shrink-0"
                    >
                      <FaEdit />
                      <span>Edit Profile</span>
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Stats Section - Optimized for mobile */}
            <div className="mt-4 sm:mt-5 md:mt-6 grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3 md:gap-4">
              {calculateStats().map((stat, index) => (
                <div
                  key={index}
                  className={`bg-gradient-to-br ${stat.color} p-3 sm:p-4 rounded-lg sm:rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                    <div className="flex-1 min-w-0">
                      <p className="text-base sm:text-lg md:text-xl font-bold text-gray-900 truncate">
                        {stat.value}
                      </p>
                      <p className="text-xs sm:text-sm text-gray-600 mt-0.5 sm:mt-1 truncate">
                        {stat.label}
                      </p>
                    </div>
                    <div className="text-lg sm:text-xl flex-shrink-0 self-end sm:self-auto">
                      {stat.icon}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ORDERS SECTION - Mobile Optimized */}
        <div>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 sm:mb-6 gap-3">
            <h2 className="text-lg sm:text-xl font-bold text-gray-900 flex items-center gap-2 sm:gap-3">
              <FaShoppingBag className="text-teal-600 flex-shrink-0" />
              <span className="truncate">Recent Orders</span>
              <span className="text-xs sm:text-sm font-normal text-gray-500 whitespace-nowrap">
                ({pagination.total})
              </span>
            </h2>

            {/* Pagination - Compact on mobile */}
            {orders.length > 0 && (
              <div className="flex items-center justify-between sm:justify-end gap-2 w-full sm:w-auto">
                <button
                  onClick={() => handlePageChange(pagination.page - 1)}
                  disabled={!pagination.hasPrevPage}
                  className={`px-3 py-2 rounded-lg text-xs sm:text-sm font-medium transition-colors ${
                    pagination.hasPrevPage
                      ? "bg-teal-600 text-white hover:bg-teal-700 active:bg-teal-800"
                      : "bg-gray-200 text-gray-400 cursor-not-allowed"
                  }`}
                >
                  ← Prev
                </button>
                <span className="text-xs sm:text-sm text-gray-600 px-2 whitespace-nowrap">
                  Page {pagination.page} of {pagination.totalPages}
                </span>
                <button
                  onClick={() => handlePageChange(pagination.page + 1)}
                  disabled={!pagination.hasNextPage}
                  className={`px-3 py-2 rounded-lg text-xs sm:text-sm font-medium transition-colors ${
                    pagination.hasNextPage
                      ? "bg-teal-600 text-white hover:bg-teal-700 active:bg-teal-800"
                      : "bg-gray-200 text-gray-400 cursor-not-allowed"
                  }`}
                >
                  Next →
                </button>
              </div>
            )}
          </div>

          {/* Loading State */}
          {loading && (
            <div className="flex justify-center items-center py-8 sm:py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-teal-600"></div>
            </div>
          )}

          {/* Error State */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg sm:rounded-xl p-4 text-center">
              <FaExclamationTriangle className="text-red-500 text-xl sm:text-2xl mx-auto mb-2" />
              <p className="text-red-700 font-medium text-sm sm:text-base">
                Error loading orders
              </p>
              <p className="text-red-600 text-xs sm:text-sm mt-1 break-words px-2">
                {error}
              </p>
            </div>
          )}

          {/* Orders List - Mobile Optimized */}
          {!loading && !error && (
            <div className="space-y-3 sm:space-y-4">
              {orders.length === 0 ? (
                <div className="bg-white rounded-lg sm:rounded-xl shadow p-6 sm:p-8 text-center">
                  <FaShoppingBag className="text-gray-300 text-2xl sm:text-3xl mx-auto mb-3" />
                  <h3 className="text-base sm:text-lg font-semibold text-gray-700 mb-2">
                    No orders found
                  </h3>
                  <p className="text-sm sm:text-base text-gray-500">
                    You haven't placed any orders yet.
                  </p>
                </div>
              ) : (
                orders.map((order) => {
                  const statusConfig = getStatusConfig(order.status);

                  return (
                    <div
                      key={order.id}
                      className="bg-white rounded-lg sm:rounded-xl shadow hover:shadow-md transition-shadow duration-300 overflow-hidden"
                    >
                      <div className="p-3 sm:p-4">
                        {/* Order Header - Stack on mobile */}
                        <div className="flex flex-col gap-3">
                          {/* Order ID and Status */}
                          <div className="flex items-start justify-between gap-2">
                            <h3 className="font-semibold text-sm sm:text-base text-gray-900 truncate flex-1">
                              Order #{order.order_id}
                            </h3>
                            <span
                              className={`px-2 sm:px-3 py-1 ${statusConfig.color} rounded-full text-xs font-medium flex items-center gap-1 flex-shrink-0`}
                            >
                              {statusConfig.icon}
                              <span className="hidden xs:inline">
                                {statusConfig.label}
                              </span>
                            </span>
                          </div>

                          {/* Order Meta Info - Stack on very small screens */}
                          <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 text-xs sm:text-sm text-gray-600">
                            <div className="flex items-center gap-1">
                              <FaCalendarAlt className="text-gray-400 flex-shrink-0" />
                              <span>{formatShortDate(order.placedAt)}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <FaCreditCard className="text-gray-400 flex-shrink-0" />
                              <span className="truncate">
                                {order.paymentMethod}
                              </span>
                            </div>
                            <div className="flex items-center gap-1 text-gray-500">
                              <FaBox className="text-gray-400 flex-shrink-0" />
                              <span>
                                {order.items
                                  ? `${order.items.length} item${
                                      order.items.length > 1 ? "s" : ""
                                    }`
                                  : "1 item"}
                              </span>
                            </div>
                          </div>

                          {/* Amount and Button */}
                          <div className="flex items-center justify-between gap-3 pt-2 border-t border-gray-100">
                            <div>
                              <p className="text-base sm:text-lg font-bold text-teal-700">
                                {formatCurrency(order.grandTotal)}
                              </p>
                            </div>
                            <button
                              onClick={() => handleViewOrderDetails(order)}
                              className="px-3 sm:px-4 py-2 bg-gradient-to-r from-teal-50 to-teal-100 text-teal-700 rounded-lg hover:from-teal-100 hover:to-teal-200 active:from-teal-200 active:to-teal-300 transition-all duration-300 font-medium border border-teal-200 text-xs sm:text-sm flex-shrink-0"
                            >
                              View Details
                            </button>
                          </div>
                        </div>

                        {/* Shipping Address Preview - Compact on mobile */}
                        {order.shippingAddress && (
                          <div className="mt-3 pt-3 border-t border-gray-100">
                            <div className="flex items-start gap-2">
                              <FaMapMarkerAlt className="text-teal-600 mt-1 flex-shrink-0 text-xs sm:text-sm" />
                              <div className="flex-1 min-w-0">
                                <p className="text-xs sm:text-sm text-gray-700">
                                  <span className="font-medium">
                                    {order.shippingAddress.fullName}
                                  </span>{" "}
                                  •{" "}
                                  <span className="truncate">
                                    {order.shippingAddress.addressLine1},{" "}
                                    {order.shippingAddress.city}
                                  </span>
                                </p>
                                <p className="text-xs text-gray-500 mt-0.5">
                                  {order.shippingAddress.phone}
                                </p>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          )}
        </div>
      </div>

      {/* Order Detail Modal */}
      <OrderDetailModal
        order={selectedOrder}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default UserProfile;
