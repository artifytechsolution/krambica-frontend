"use client";
import React, { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import {
  FaHome,
  FaTh,
  FaComments,
  FaShoppingCart,
  FaUser,
} from "react-icons/fa";

const MobileBottomFooter = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [activeNavItem, setActiveNavItem] = useState("home");

  useEffect(() => {
    if (pathname === "/") {
      setActiveNavItem("home");
    } else if (pathname.startsWith("/product")) {
      setActiveNavItem("product");
    } else if (pathname.startsWith("/contact")) {
      setActiveNavItem("contact");
    } else if (pathname.startsWith("/cart")) {
      setActiveNavItem("cart");
    } else if (pathname.startsWith("/profile")) {
      setActiveNavItem("profile");
    } else {
      setActiveNavItem(""); // default no active
    }
  }, [pathname]);

  // Navigation handler without setting activeNavItem manually
  const handleNavigation = (route) => {
    router.push(route);
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 lg:hidden z-40">
      <div className="grid grid-cols-5 h-16">
        <button
          onClick={() => handleNavigation("/")}
          className={`flex flex-col items-center justify-center space-y-1 transition-colors ${
            activeNavItem === "home" ? "text-green-600" : "text-gray-600"
          }`}
        >
          <FaHome className="w-6 h-6" />
          <span className="text-xs font-medium">Home</span>
        </button>

        <button
          onClick={() => handleNavigation("/product")}
          className={`flex flex-col items-center justify-center space-y-1 transition-colors ${
            activeNavItem === "product" ? "text-green-600" : "text-gray-600"
          }`}
        >
          <FaTh className="w-6 h-6" />
          <span className="text-xs font-medium">Products</span>
        </button>

        <button
          onClick={() => handleNavigation("/contact")}
          className={`flex flex-col items-center justify-center space-y-1 transition-colors ${
            activeNavItem === "contact" ? "text-green-600" : "text-gray-600"
          }`}
        >
          <FaComments className="w-6 h-6" />
          <span className="text-xs font-medium">Contact</span>
        </button>

        <button
          onClick={() => handleNavigation("/cart")}
          className={`flex flex-col items-center justify-center space-y-1 transition-colors ${
            activeNavItem === "cart" ? "text-green-600" : "text-gray-600"
          }`}
        >
          <div className="relative">
            <FaShoppingCart className="w-6 h-6" />
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-4 h-4 flex items-center justify-center">
              0
            </span>
          </div>
          <span className="text-xs font-medium">Cart</span>
        </button>

        <button
          onClick={() => handleNavigation("/profile")}
          className={`flex flex-col items-center justify-center space-y-1 transition-colors ${
            activeNavItem === "profile" ? "text-green-600" : "text-gray-600"
          }`}
        >
          <FaUser className="w-6 h-6" />
          <span className="text-xs font-medium">Profile</span>
        </button>
      </div>
    </nav>
  );
};

export default MobileBottomFooter;
