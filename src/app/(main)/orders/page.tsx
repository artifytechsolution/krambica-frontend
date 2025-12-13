"use client";
import Footer from "@src/component/components/footer";
import Header from "@src/component/components/header";
import Link from "next/link";
import React, { useState } from "react";

const OrdersPage = () => {
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [selectedOrder, setSelectedOrder] = useState(null);

  // Sample orders data
  const orders = [
    {
      id: "ORD-2025-1234",
      orderNumber: "#1234",
      date: "October 22, 2025",
      dateTime: "2025-10-22T14:30:00",
      status: "delivered",
      statusColor: "green",
      total: 1299.0,
      itemCount: 5,
      deliveryDate: "October 23, 2025",
      paymentMethod: "UPI",
      deliveryAddress: {
        name: "John Doe",
        phone: "+91 98765 43210",
        address: "123, Green Valley Apartments",
        city: "Ahmedabad",
        state: "Gujarat",
        pincode: "380001",
      },
      items: [
        {
          id: 1,
          name: "Organic Strawberries",
          quantity: 2,
          unit: "1 lb",
          price: 299.0,
          image:
            "https://images.unsplash.com/photo-1464965911861-746a04b4bca6?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
        },
        {
          id: 2,
          name: "Hass Avocados",
          quantity: 3,
          unit: "each",
          price: 179.0,
          image:
            "https://images.unsplash.com/photo-1549476464-37392f717541?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
        },
        {
          id: 3,
          name: "Free-Range Eggs",
          quantity: 1,
          unit: "dozen",
          price: 499.0,
          image:
            "https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
        },
        {
          id: 4,
          name: "Fresh Spinach",
          quantity: 2,
          unit: "5 oz bag",
          price: 249.0,
          image:
            "https://images.unsplash.com/photo-1576045057995-568f588f82fb?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
        },
      ],
    },
    {
      id: "ORD-2025-1233",
      orderNumber: "#1233",
      date: "October 20, 2025",
      dateTime: "2025-10-20T10:15:00",
      status: "in-transit",
      statusColor: "blue",
      total: 849.0,
      itemCount: 3,
      deliveryDate: "October 24, 2025",
      paymentMethod: "Credit Card",
      deliveryAddress: {
        name: "John Doe",
        phone: "+91 98765 43210",
        address: "123, Green Valley Apartments",
        city: "Ahmedabad",
        state: "Gujarat",
        pincode: "380001",
      },
      items: [
        {
          id: 1,
          name: "Organic Bananas",
          quantity: 2,
          unit: "2 lbs",
          price: 149.0,
          image:
            "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
        },
        {
          id: 2,
          name: "Fresh Spinach",
          quantity: 3,
          unit: "5 oz bag",
          price: 249.0,
          image:
            "https://images.unsplash.com/photo-1576045057995-568f588f82fb?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
        },
        {
          id: 3,
          name: "Whole Milk",
          quantity: 1,
          unit: "1 gallon",
          price: 399.0,
          image:
            "https://images.unsplash.com/photo-1563636619-e9143da7973b?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
        },
      ],
    },
    {
      id: "ORD-2025-1232",
      orderNumber: "#1232",
      date: "October 18, 2025",
      dateTime: "2025-10-18T16:45:00",
      status: "processing",
      statusColor: "yellow",
      total: 1599.0,
      itemCount: 7,
      deliveryDate: "October 25, 2025",
      paymentMethod: "Cash on Delivery",
      deliveryAddress: {
        name: "John Doe",
        phone: "+91 98765 43210",
        address: "123, Green Valley Apartments",
        city: "Ahmedabad",
        state: "Gujarat",
        pincode: "380001",
      },
      items: [
        {
          id: 1,
          name: "Whole Milk",
          quantity: 2,
          unit: "1 gallon",
          price: 399.0,
          image:
            "https://images.unsplash.com/photo-1563636619-e9143da7973b?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
        },
        {
          id: 2,
          name: "Organic Strawberries",
          quantity: 1,
          unit: "1 lb",
          price: 299.0,
          image:
            "https://images.unsplash.com/photo-1464965911861-746a04b4bca6?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
        },
        {
          id: 3,
          name: "Hass Avocados",
          quantity: 4,
          unit: "each",
          price: 179.0,
          image:
            "https://images.unsplash.com/photo-1549476464-37392f717541?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
        },
      ],
    },
    {
      id: "ORD-2025-1231",
      orderNumber: "#1231",
      date: "October 15, 2025",
      dateTime: "2025-10-15T12:20:00",
      status: "cancelled",
      statusColor: "red",
      total: 599.0,
      itemCount: 2,
      deliveryDate: "N/A",
      paymentMethod: "UPI",
      deliveryAddress: {
        name: "John Doe",
        phone: "+91 98765 43210",
        address: "123, Green Valley Apartments",
        city: "Ahmedabad",
        state: "Gujarat",
        pincode: "380001",
      },
      items: [
        {
          id: 1,
          name: "Fresh Spinach",
          quantity: 2,
          unit: "5 oz bag",
          price: 249.0,
          image:
            "https://images.unsplash.com/photo-1576045057995-568f588f82fb?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
        },
      ],
    },
  ];

  // Filter orders based on status
  const filteredOrders = orders.filter((order) => {
    if (selectedFilter === "all") return true;
    return order.status === selectedFilter;
  });

  // Get status badge styling
  const getStatusBadge = (status) => {
    const badges = {
      delivered: {
        bg: "bg-green-100",
        text: "text-green-700",
        icon: "✓",
        label: "Delivered",
      },
      "in-transit": {
        bg: "bg-blue-100",
        text: "text-blue-700",
        icon: "🚚",
        label: "In Transit",
      },
      processing: {
        bg: "bg-yellow-100",
        text: "text-yellow-700",
        icon: "⏳",
        label: "Processing",
      },
      cancelled: {
        bg: "bg-red-100",
        text: "text-red-700",
        icon: "✗",
        label: "Cancelled",
      },
    };
    return badges[status];
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-green-50">
      <style jsx global>{`
        .order-card {
          transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }

        .order-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 20px 40px -12px rgba(22, 163, 74, 0.15);
        }

        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-slide-in {
          animation: slideIn 0.4s ease-out forwards;
        }

        @media (max-width: 640px) {
          .order-card:hover {
            transform: translateY(-2px);
          }
        }
      `}</style>
      <Header />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
        {/* Orders List */}
        {filteredOrders.length === 0 ? (
          <div className="bg-white rounded-xl sm:rounded-2xl shadow-sm border border-gray-200 p-8 sm:p-12 text-center">
            <div className="text-gray-400 mb-4">
              <svg
                className="w-16 h-16 sm:w-24 sm:h-24 mx-auto"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1"
                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                />
              </svg>
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">
              No Orders Found
            </h3>
            <p className="text-sm sm:text-base text-gray-600 mb-6">
              You haven't placed any orders in this category yet.
            </p>
            <Link href="/">
              <button className="px-6 py-3 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-xl font-semibold hover:shadow-lg transition-all duration-200 text-sm sm:text-base">
                Start Shopping
              </button>
            </Link>
          </div>
        ) : (
          <div className="space-y-3 sm:space-y-4">
            {filteredOrders.map((order, index) => (
              <div
                key={order.id}
                className="order-card bg-white rounded-xl sm:rounded-2xl shadow-sm border border-gray-200 overflow-hidden"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Order Header */}
                <div className="bg-gradient-to-r from-green-50 to-green-100 p-3 sm:p-4 lg:p-6 border-b border-green-200">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-2">
                        <h3 className="text-base sm:text-lg lg:text-xl font-black text-gray-900">
                          Order {order.orderNumber}
                        </h3>
                        <span
                          className={`px-2 sm:px-3 py-1 rounded-full text-xs font-bold ${
                            getStatusBadge(order.status).bg
                          } ${getStatusBadge(order.status).text}`}
                        >
                          {getStatusBadge(order.status).icon}{" "}
                          {getStatusBadge(order.status).label}
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-x-3 sm:gap-x-4 gap-y-2 text-xs sm:text-sm text-gray-600">
                        <span className="flex items-center space-x-1">
                          <svg
                            className="w-3 h-3 sm:w-4 sm:h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                            />
                          </svg>
                          <span className="hidden sm:inline">{order.date}</span>
                          <span className="sm:hidden">
                            {order.date.split(",")[0]}
                          </span>
                        </span>
                        <span className="flex items-center space-x-1">
                          <svg
                            className="w-3 h-3 sm:w-4 sm:h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                            />
                          </svg>
                          <span>{order.itemCount} items</span>
                        </span>
                        <span className="flex items-center space-x-1">
                          <svg
                            className="w-3 h-3 sm:w-4 sm:h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"
                            />
                          </svg>
                          <span>{order.paymentMethod}</span>
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between sm:justify-end gap-3 sm:gap-4">
                      <div className="text-left sm:text-right">
                        <p className="text-xs sm:text-sm text-gray-600">
                          Total Amount
                        </p>
                        <p className="text-lg sm:text-xl lg:text-2xl font-black text-green-600">
                          ₹{order.total.toFixed(2)}
                        </p>
                      </div>
                      <button
                        onClick={() =>
                          setSelectedOrder(
                            selectedOrder === order.id ? null : order.id
                          )
                        }
                        className="p-2 rounded-lg hover:bg-green-200 text-green-700 transition-colors"
                      >
                        <svg
                          className={`w-5 h-5 sm:w-6 sm:h-6 transition-transform duration-200 ${
                            selectedOrder === order.id ? "rotate-180" : ""
                          }`}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M19 9l-7 7-7-7"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Order Details (Expandable) */}
                {selectedOrder === order.id && (
                  <div className="p-3 sm:p-4 lg:p-6 animate-slide-in">
                    {/* Order Items */}
                    <div className="mb-4 sm:mb-6">
                      <h4 className="text-base sm:text-lg font-bold text-gray-900 mb-3 sm:mb-4 flex items-center space-x-2">
                        <svg
                          className="w-4 h-4 sm:w-5 sm:h-5 text-green-600"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                          />
                        </svg>
                        <span>Order Items</span>
                      </h4>
                      <div className="space-y-2 sm:space-y-3">
                        {order.items.map((item) => (
                          <div
                            key={item.id}
                            className="flex items-center gap-2 sm:gap-3 p-2 sm:p-3 bg-gray-50 rounded-lg sm:rounded-xl"
                          >
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 rounded-lg object-cover flex-shrink-0"
                            />
                            <div className="flex-1 min-w-0">
                              <h5 className="font-bold text-gray-900 text-sm sm:text-base truncate">
                                {item.name}
                              </h5>
                              <p className="text-xs sm:text-sm text-gray-600">
                                Qty: {item.quantity} × {item.unit}
                              </p>
                            </div>
                            <p className="font-bold text-green-600 text-sm sm:text-base whitespace-nowrap">
                              ₹{(item.price * item.quantity).toFixed(2)}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Price Breakdown */}
                    <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-lg sm:rounded-xl p-3 sm:p-4 space-y-2">
                      <div className="flex items-center justify-between text-sm sm:text-base">
                        <span className="text-gray-700">Subtotal</span>
                        <span className="font-semibold text-gray-900">
                          ₹{(order.total * 0.9).toFixed(2)}
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-sm sm:text-base">
                        <span className="text-gray-700">Delivery Charges</span>
                        <span className="font-semibold text-green-600">
                          FREE
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-sm sm:text-base">
                        <span className="text-gray-700">GST (10%)</span>
                        <span className="font-semibold text-gray-900">
                          ₹{(order.total * 0.1).toFixed(2)}
                        </span>
                      </div>
                      <div className="border-t-2 border-green-300 pt-2 mt-2">
                        <div className="flex items-center justify-between">
                          <span className="text-base sm:text-lg font-black text-gray-900">
                            Total Amount
                          </span>
                          <span className="text-xl sm:text-2xl font-black text-green-600">
                            ₹{order.total.toFixed(2)}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="mt-4 sm:mt-6 grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
                      {/* {order.status === "delivered" && (
                        <>
                          <button className="w-full px-4 py-2.5 sm:py-3 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-lg sm:rounded-xl font-semibold hover:shadow-lg transition-all duration-200 text-sm sm:text-base">
                            Download Invoice
                          </button>
                          <button className="w-full px-4 py-2.5 sm:py-3 bg-gray-100 text-gray-700 rounded-lg sm:rounded-xl font-semibold hover:bg-gray-200 transition-all duration-200 text-sm sm:text-base">
                            Leave a Review
                          </button>
                        </>
                      )}
                      {order.status === "in-transit" && (
                        <button className="w-full px-4 py-2.5 sm:py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg sm:rounded-xl font-semibold hover:shadow-lg transition-all duration-200 text-sm sm:text-base sm:col-span-2">
                          Track Live Location
                        </button>
                      )}
                      {order.status === "processing" && (
                        <button className="w-full px-4 py-2.5 sm:py-3 bg-red-100 text-red-700 rounded-lg sm:rounded-xl font-semibold hover:bg-red-200 transition-all duration-200 text-sm sm:text-base sm:col-span-2">
                          Cancel Order
                        </button>
                      )} */}
                      <Link
                        href={"/contact"}
                        className="w-full px-4 py-2.5 sm:py-3 border-2 border-gray-300 text-gray-700 rounded-lg sm:rounded-xl font-semibold hover:border-green-600 hover:text-green-600 transition-all duration-200 text-sm sm:text-base sm:col-span-2"
                      >
                        <p className="text-center">Need Help?</p>
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default OrdersPage;
