// "use client";
// import React, { useEffect, useState } from "react";
// import {
//   Plus,
//   Minus,
//   Trash2,
//   Heart,
//   Tag,
//   CheckCircle,
//   Truck,
//   Shield,
//   RotateCcw,
//   X,
//   ShoppingBag,
//   Package,
//   AlertCircle,
//   MapPin,
//   ChevronRight,
//   Home,
//   Building,
//   Edit3,
//   Phone,
//   Mail,
//   Loader2,
// } from "lucide-react";
// import { useSelector, useDispatch } from "react-redux";
// import {
//   selectCartItems,
//   selectCartTotal,
//   removeFromCart,
//   increaseQuantity,
//   decreaseQuantity,
//   updateQuantity,
//   clearCart,
// } from "@src/redux/reducers/authSlice";
// import { useRouter } from "next/navigation";
// import {
//   useAddressList,
//   useAddAddress,
//   useCreateOrder,
// } from "@src/hooks/apiHooks";

// // ============================================
// // COUPON SERVICE
// // ============================================
// const couponService = {
//   BASE_URL:
//     process.env.NEXT_PUBLIC_COUPON_API_URL || "http://localhost:8020/api",

//   async validateCoupon(promoCode, orderValue, userId) {
//     try {
//       if (!promoCode.trim()) {
//         return {
//           success: false,
//           error: "Please enter a coupon code",
//           code: null,
//         };
//       }

//       const code = promoCode.toUpperCase().trim();
//       const apiUrl = `${this.BASE_URL}/cupon/${code}/validate`;

//       const response = await fetch(apiUrl, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           orderValue: orderValue,
//           userId: userId,
//         }),
//       });

//       const data = await response.json();

//       if (response.ok && data.status === "success" && data.data) {
//         const couponData = {
//           success: true,
//           code: code,
//           couponId: data.data.coupon?.id || data.data.couponId,
//           type: data.data.coupon?.type || data.data.type,
//           value: data.data.coupon?.value || data.data.value,
//           discountAmount: data.data.discountAmount || 0,
//           finalAmount: data.data.finalAmount || orderValue,
//           message: data.message || "Coupon applied successfully",
//         };
//         return couponData;
//       }

//       const errorMessage = this.getErrorMessage(response.status, data);
//       return {
//         success: false,
//         error: errorMessage,
//         code: code,
//       };
//     } catch (error) {
//       return {
//         success: false,
//         error:
//           "Unable to validate coupon. Please check your connection and try again.",
//         code: null,
//       };
//     }
//   },

//   getErrorMessage(statusCode, data) {
//     if (data?.message) {
//       return data.message;
//     }

//     const errorMessages = {
//       400: "Invalid coupon code or expired",
//       404: "Coupon code not found",
//       410: "This coupon has expired",
//       500: "Server error. Please try again later",
//     };

//     return (
//       errorMessages[statusCode] ||
//       "Invalid or expired coupon code. Please try a different code."
//     );
//   },
// };

// // ============================================
// // CART ITEM CARD
// // ============================================
// const CartItemCard = ({ item, onRemove, onSaveForLater }) => {
//   const [saved, setSaved] = useState(false);
//   const dispatch = useDispatch();

//   const handleSave = () => {
//     setSaved(!saved);
//     if (!saved) {
//       onSaveForLater(item.productId, item.size);
//     }
//   };

//   const discount = item.originalPrice
//     ? Math.round(((item.originalPrice - item.price) / item.originalPrice) * 100)
//     : 0;

//   const handleIncrease = () => {
//     dispatch(increaseQuantity({ productId: item.productId, size: item.size }));
//   };

//   const handleDecrease = () => {
//     dispatch(decreaseQuantity({ productId: item.productId, size: item.size }));
//   };

//   const handleRemoveItem = () => {
//     dispatch(removeFromCart({ productId: item.productId, size: item.size }));
//     onRemove(item.productId, item.size);
//   };

//   return (
//     <div className="bg-white rounded-xl md:rounded-2xl p-4 md:p-5 shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 mb-3 md:mb-4">
//       <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
//         <div className="relative flex-shrink-0 w-full sm:w-28 md:w-36">
//           <img
//             src={item.image}
//             alt={item.productName}
//             className="w-full h-32 sm:h-28 md:h-36 rounded-lg object-cover"
//           />
//           {item.availableStock > 0 && (
//             <div className="absolute top-1.5 right-1.5 bg-emerald-500 text-white px-2 py-0.5 rounded-full text-[10px] font-bold flex items-center gap-1">
//               <CheckCircle size={10} />
//               In Stock
//             </div>
//           )}
//           {discount > 0 && (
//             <div className="absolute top-1.5 left-1.5 bg-red-500 text-white px-2 py-0.5 rounded-full text-[10px] font-bold">
//               {discount}% OFF
//             </div>
//           )}
//         </div>

//         <div className="flex-1 flex flex-col justify-between min-w-0">
//           <div className="space-y-2">
//             <h3 className="text-base md:text-lg font-bold text-gray-900 truncate">
//               {item.productName}
//             </h3>

//             <div className="flex flex-wrap gap-1.5 md:gap-2 text-xs">
//               <span className="px-2 py-1 bg-gray-100 rounded-lg text-gray-700 font-medium">
//                 Size: {item.size}
//               </span>
//               <span className="px-2 py-1 bg-gray-100 rounded-lg text-gray-700 font-medium flex items-center gap-1">
//                 <span
//                   className="w-3 h-3 rounded-lg border border-gray-300"
//                   style={{ backgroundColor: item.colorCode }}
//                 ></span>
//                 {item.colorName}
//               </span>
//             </div>

//             <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
//               <div className="flex items-center gap-2 bg-gray-50 rounded-lg p-0.5 border border-gray-200">
//                 <button
//                   onClick={handleDecrease}
//                   disabled={item.quantity <= 1}
//                   className="w-7 h-7 md:w-8 md:h-8 bg-white rounded-md text-lg font-bold hover:bg-teal-700 hover:text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
//                 >
//                   <Minus size={16} />
//                 </button>
//                 <span className="w-8 text-center text-base font-bold text-gray-900">
//                   {item.quantity}
//                 </span>
//                 <button
//                   onClick={handleIncrease}
//                   disabled={item.quantity >= item.availableStock}
//                   className="w-7 h-7 md:w-8 md:h-8 bg-white rounded-md text-lg font-bold hover:bg-teal-700 hover:text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
//                 >
//                   <Plus size={16} />
//                 </button>
//               </div>

//               <div className="text-right">
//                 <div className="text-xl md:text-2xl font-bold text-teal-700">
//                   ₹{item.totalPrice.toLocaleString()}
//                 </div>
//                 <p className="text-[10px] text-gray-600 mt-0.5">
//                   ₹{item.price.toFixed(2)} each
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       <div className="border-t border-gray-100 mt-3 pt-3 flex flex-wrap gap-2">
//         <button
//           onClick={handleSave}
//           className={`flex items-center gap-1.5 px-3 py-1.5 text-xs md:text-sm font-semibold rounded-lg transition-all ${
//             saved
//               ? "text-red-500 hover:bg-red-50"
//               : "text-teal-700 hover:bg-teal-50"
//           }`}
//         >
//           <Heart size={16} fill={saved ? "currentColor" : "none"} />
//           {saved ? "Saved" : "Save"}
//         </button>
//         <button
//           onClick={handleRemoveItem}
//           className="flex items-center gap-1.5 px-3 py-1.5 text-xs md:text-sm text-red-500 font-semibold hover:bg-red-50 rounded-lg transition-all ml-auto"
//         >
//           <Trash2 size={16} />
//           Remove
//         </button>
//       </div>
//     </div>
//   );
// };

// // ============================================
// // ADDRESS CARD COMPONENT
// // ============================================
// const AddressCard = ({ address, isSelected, onSelect, isDefault = false }) => {
//   const addressType = address.addressType?.toLowerCase() || "home";
//   const typeIcon =
//     addressType === "home" ? <Home size={18} /> : <Building size={18} />;
//   const typeBgColor = addressType === "home" ? "bg-blue-100" : "bg-purple-100";
//   const typeTextColor =
//     addressType === "home" ? "text-blue-700" : "text-purple-700";

//   return (
//     <div
//       onClick={onSelect}
//       className={`p-4 rounded-xl border-2 cursor-pointer transition-all transform hover:scale-[1.01] ${
//         isSelected
//           ? "border-teal-700 bg-teal-50 scale-[1.01]"
//           : "border-gray-200 bg-white hover:border-gray-300"
//       }`}
//     >
//       <div className="flex items-start justify-between gap-3">
//         <div className="flex-1 min-w-0">
//           <div className="flex items-center gap-2 mb-3">
//             <div className={`p-2 rounded-lg ${typeBgColor}`}>
//               <div className={typeTextColor}>{typeIcon}</div>
//             </div>
//             <div>
//               <h3 className="font-bold text-gray-900 capitalize text-sm">
//                 {addressType}
//               </h3>
//               {isDefault && (
//                 <span className="text-xs bg-emerald-100 text-emerald-700 font-bold rounded px-1.5">
//                   Default
//                 </span>
//               )}
//             </div>
//           </div>
//           <p className="font-semibold text-gray-900 text-sm mb-1">
//             {address.fullName}
//           </p>
//           <p className="text-xs text-gray-600 mb-1 line-clamp-2">
//             {address.addressLine1}
//             {address.addressLine2 && `, ${address.addressLine2}`}
//           </p>
//           <p className="text-xs text-gray-600 mb-1.5">
//             {address.city}, {address.state} - {address.zipCode}
//           </p>
//           <p className="text-xs text-gray-600 flex items-center gap-1">
//             <Phone size={12} /> {address.phone}
//           </p>
//         </div>
//         {isSelected && (
//           <div className="flex-shrink-0 pt-1">
//             <div className="w-6 h-6 bg-teal-700 rounded-full flex items-center justify-center">
//               <CheckCircle
//                 size={20}
//                 className="text-white"
//                 fill="currentColor"
//               />
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// // ============================================
// // ADDRESS LOADING SKELETON
// // ============================================
// const AddressLoadingSkeleton = () => {
//   return (
//     <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
//       {[1, 2].map((i) => (
//         <div
//           key={i}
//           className="p-4 rounded-xl border-2 border-gray-200 bg-white animate-pulse"
//         >
//           <div className="flex items-start gap-3">
//             <div className="w-10 h-10 bg-gray-200 rounded-lg"></div>
//             <div className="flex-1 space-y-2">
//               <div className="h-4 bg-gray-200 rounded w-24"></div>
//               <div className="h-3 bg-gray-200 rounded w-32"></div>
//               <div className="h-3 bg-gray-200 rounded w-full"></div>
//               <div className="h-3 bg-gray-200 rounded w-3/4"></div>
//             </div>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };

// // ============================================
// // ADD NEW ADDRESS MODAL - MOBILE RESPONSIVE
// // ============================================
// const AddAddressModal = ({ isOpen, onClose, onAdd, isSubmitting }) => {
//   const [formData, setFormData] = useState({
//     addressType: "Home",
//     fullName: "",
//     phone: "",
//     email: "",
//     addressLine1: "",
//     addressLine2: "",
//     city: "",
//     state: "",
//     zipCode: "",
//     country: "India",
//   });
//   const [errors, setErrors] = useState({});

//   const validateForm = () => {
//     const newErrors = {};
//     if (!formData.fullName.trim()) newErrors.fullName = "Name is required";
//     if (!formData.phone.match(/^\d{10}$/))
//       newErrors.phone = "Valid 10-digit phone required";
//     if (!formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/))
//       newErrors.email = "Valid email required";
//     if (!formData.addressLine1.trim())
//       newErrors.addressLine1 = "Address is required";
//     if (!formData.city.trim()) newErrors.city = "City is required";
//     if (!formData.state.trim()) newErrors.state = "State is required";
//     if (!formData.zipCode.match(/^\d{6}$/))
//       newErrors.zipCode = "Valid 6-digit pincode required";
//     if (!formData.country.trim()) newErrors.country = "Country is required";

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (validateForm()) {
//       onAdd(formData);
//     }
//   };

//   const resetForm = () => {
//     setFormData({
//       addressType: "Home",
//       fullName: "",
//       phone: "",
//       email: "",
//       addressLine1: "",
//       addressLine2: "",
//       city: "",
//       state: "",
//       zipCode: "",
//       country: "India",
//     });
//     setErrors({});
//   };

//   useEffect(() => {
//     if (!isOpen) {
//       resetForm();
//     }
//   }, [isOpen]);

//   if (!isOpen) return null;

//   return (
//     <>
//       <div
//         className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[100] transition-opacity"
//         onClick={onClose}
//       />

//       {/* DESKTOP MODAL */}
//       <div className="hidden md:flex fixed inset-0 z-[101] items-center justify-center p-4">
//         <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
//           {/* HEADER */}
//           <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between sticky top-0 bg-white rounded-t-2xl">
//             <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
//               <MapPin size={24} className="text-teal-700" />
//               Add New Address
//             </h2>
//             <button
//               onClick={onClose}
//               disabled={isSubmitting}
//               className="p-2 hover:bg-gray-100 rounded-full transition-all disabled:opacity-50"
//             >
//               <X size={24} />
//             </button>
//           </div>

//           {/* FORM */}
//           <form onSubmit={handleSubmit} className="p-6 space-y-5">
//             {/* ADDRESS TYPE */}
//             <div>
//               <label className="block text-sm font-semibold text-gray-700 mb-2">
//                 Address Type
//               </label>
//               <div className="flex gap-4">
//                 <label className="flex items-center gap-2 cursor-pointer">
//                   <input
//                     type="radio"
//                     value="Home"
//                     checked={formData.addressType === "Home"}
//                     onChange={(e) =>
//                       setFormData({ ...formData, addressType: e.target.value })
//                     }
//                     disabled={isSubmitting}
//                     className="w-4 h-4"
//                   />
//                   <span className="text-sm font-medium text-gray-700">
//                     <Home size={16} className="inline mr-1" />
//                     Home
//                   </span>
//                 </label>
//                 <label className="flex items-center gap-2 cursor-pointer">
//                   <input
//                     type="radio"
//                     value="Office"
//                     checked={formData.addressType === "Office"}
//                     onChange={(e) =>
//                       setFormData({ ...formData, addressType: e.target.value })
//                     }
//                     disabled={isSubmitting}
//                     className="w-4 h-4"
//                   />
//                   <span className="text-sm font-medium text-gray-700">
//                     <Building size={16} className="inline mr-1" />
//                     Office
//                   </span>
//                 </label>
//               </div>
//             </div>

//             {/* NAME & PHONE */}
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <div>
//                 <label className="block text-sm font-semibold text-gray-700 mb-1">
//                   Full Name *
//                 </label>
//                 <input
//                   type="text"
//                   value={formData.fullName}
//                   onChange={(e) =>
//                     setFormData({ ...formData, fullName: e.target.value })
//                   }
//                   disabled={isSubmitting}
//                   className={`w-full px-4 py-2.5 border rounded-lg text-sm focus:outline-none focus:ring-2 transition-all disabled:bg-gray-100 disabled:cursor-not-allowed ${
//                     errors.fullName
//                       ? "border-red-500 focus:ring-red-100"
//                       : "border-gray-300 focus:border-teal-700 focus:ring-teal-100"
//                   }`}
//                   placeholder="Recipient's full name"
//                 />
//                 {errors.fullName && (
//                   <p className="text-xs text-red-600 mt-1 flex items-center gap-1">
//                     <AlertCircle size={14} /> {errors.fullName}
//                   </p>
//                 )}
//               </div>
//               <div>
//                 <label className="block text-sm font-semibold text-gray-700 mb-1">
//                   Phone Number *
//                 </label>
//                 <input
//                   type="tel"
//                   value={formData.phone}
//                   onChange={(e) =>
//                     setFormData({ ...formData, phone: e.target.value })
//                   }
//                   maxLength={10}
//                   disabled={isSubmitting}
//                   className={`w-full px-4 py-2.5 border rounded-lg text-sm focus:outline-none focus:ring-2 transition-all disabled:bg-gray-100 disabled:cursor-not-allowed ${
//                     errors.phone
//                       ? "border-red-500 focus:ring-red-100"
//                       : "border-gray-300 focus:border-teal-700 focus:ring-teal-100"
//                   }`}
//                   placeholder="10-digit mobile number"
//                 />
//                 {errors.phone && (
//                   <p className="text-xs text-red-600 mt-1 flex items-center gap-1">
//                     <AlertCircle size={14} /> {errors.phone}
//                   </p>
//                 )}
//               </div>
//             </div>

//             {/* EMAIL */}
//             <div>
//               <label className="block text-sm font-semibold text-gray-700 mb-1">
//                 Email Address *
//               </label>
//               <input
//                 type="email"
//                 value={formData.email}
//                 onChange={(e) =>
//                   setFormData({ ...formData, email: e.target.value })
//                 }
//                 disabled={isSubmitting}
//                 className={`w-full px-4 py-2.5 border rounded-lg text-sm focus:outline-none focus:ring-2 transition-all disabled:bg-gray-100 disabled:cursor-not-allowed ${
//                   errors.email
//                     ? "border-red-500 focus:ring-red-100"
//                     : "border-gray-300 focus:border-teal-700 focus:ring-teal-100"
//                 }`}
//                 placeholder="your@email.com"
//               />
//               {errors.email && (
//                 <p className="text-xs text-red-600 mt-1 flex items-center gap-1">
//                   <AlertCircle size={14} /> {errors.email}
//                 </p>
//               )}
//             </div>

//             {/* ADDRESS LINE 1 */}
//             <div>
//               <label className="block text-sm font-semibold text-gray-700 mb-1">
//                 Address Line 1 *
//               </label>
//               <textarea
//                 value={formData.addressLine1}
//                 onChange={(e) =>
//                   setFormData({ ...formData, addressLine1: e.target.value })
//                 }
//                 rows={2}
//                 disabled={isSubmitting}
//                 className={`w-full px-4 py-2.5 border rounded-lg text-sm focus:outline-none focus:ring-2 transition-all resize-none disabled:bg-gray-100 disabled:cursor-not-allowed ${
//                   errors.addressLine1
//                     ? "border-red-500 focus:ring-red-100"
//                     : "border-gray-300 focus:border-teal-700 focus:ring-teal-100"
//                 }`}
//                 placeholder="Street, locality, area"
//               />
//               {errors.addressLine1 && (
//                 <p className="text-xs text-red-600 mt-1 flex items-center gap-1">
//                   <AlertCircle size={14} /> {errors.addressLine1}
//                 </p>
//               )}
//             </div>

//             {/* ADDRESS LINE 2 */}
//             <div>
//               <label className="block text-sm font-semibold text-gray-700 mb-1">
//                 Address Line 2
//               </label>
//               <input
//                 type="text"
//                 value={formData.addressLine2}
//                 onChange={(e) =>
//                   setFormData({ ...formData, addressLine2: e.target.value })
//                 }
//                 disabled={isSubmitting}
//                 className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-teal-700 focus:ring-2 focus:ring-teal-100 transition-all disabled:bg-gray-100 disabled:cursor-not-allowed"
//                 placeholder="Apartment, suite, unit (optional)"
//               />
//             </div>

//             {/* CITY, STATE, PINCODE */}
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//               <div>
//                 <label className="block text-sm font-semibold text-gray-700 mb-1">
//                   City *
//                 </label>
//                 <input
//                   type="text"
//                   value={formData.city}
//                   onChange={(e) =>
//                     setFormData({ ...formData, city: e.target.value })
//                   }
//                   disabled={isSubmitting}
//                   className={`w-full px-4 py-2.5 border rounded-lg text-sm focus:outline-none focus:ring-2 transition-all disabled:bg-gray-100 disabled:cursor-not-allowed ${
//                     errors.city
//                       ? "border-red-500 focus:ring-red-100"
//                       : "border-gray-300 focus:border-teal-700 focus:ring-teal-100"
//                   }`}
//                   placeholder="City name"
//                 />
//                 {errors.city && (
//                   <p className="text-xs text-red-600 mt-1 flex items-center gap-1">
//                     <AlertCircle size={14} /> {errors.city}
//                   </p>
//                 )}
//               </div>
//               <div>
//                 <label className="block text-sm font-semibold text-gray-700 mb-1">
//                   State *
//                 </label>
//                 <input
//                   type="text"
//                   value={formData.state}
//                   onChange={(e) =>
//                     setFormData({ ...formData, state: e.target.value })
//                   }
//                   disabled={isSubmitting}
//                   className={`w-full px-4 py-2.5 border rounded-lg text-sm focus:outline-none focus:ring-2 transition-all disabled:bg-gray-100 disabled:cursor-not-allowed ${
//                     errors.state
//                       ? "border-red-500 focus:ring-red-100"
//                       : "border-gray-300 focus:border-teal-700 focus:ring-teal-100"
//                   }`}
//                   placeholder="State name"
//                 />
//                 {errors.state && (
//                   <p className="text-xs text-red-600 mt-1 flex items-center gap-1">
//                     <AlertCircle size={14} /> {errors.state}
//                   </p>
//                 )}
//               </div>
//               <div>
//                 <label className="block text-sm font-semibold text-gray-700 mb-1">
//                   Pincode *
//                 </label>
//                 <input
//                   type="text"
//                   value={formData.zipCode}
//                   onChange={(e) =>
//                     setFormData({ ...formData, zipCode: e.target.value })
//                   }
//                   maxLength={6}
//                   disabled={isSubmitting}
//                   className={`w-full px-4 py-2.5 border rounded-lg text-sm focus:outline-none focus:ring-2 transition-all disabled:bg-gray-100 disabled:cursor-not-allowed ${
//                     errors.zipCode
//                       ? "border-red-500 focus:ring-red-100"
//                       : "border-gray-300 focus:border-teal-700 focus:ring-teal-100"
//                   }`}
//                   placeholder="6-digit pincode"
//                 />
//                 {errors.zipCode && (
//                   <p className="text-xs text-red-600 mt-1 flex items-center gap-1">
//                     <AlertCircle size={14} /> {errors.zipCode}
//                   </p>
//                 )}
//               </div>
//             </div>

//             {/* COUNTRY */}
//             <div>
//               <label className="block text-sm font-semibold text-gray-700 mb-1">
//                 Country *
//               </label>
//               <input
//                 type="text"
//                 value={formData.country}
//                 onChange={(e) =>
//                   setFormData({ ...formData, country: e.target.value })
//                 }
//                 disabled={isSubmitting}
//                 className={`w-full px-4 py-2.5 border rounded-lg text-sm focus:outline-none focus:ring-2 transition-all disabled:bg-gray-100 disabled:cursor-not-allowed ${
//                   errors.country
//                     ? "border-red-500 focus:ring-red-100"
//                     : "border-gray-300 focus:border-teal-700 focus:ring-teal-100"
//                 }`}
//                 placeholder="Country name"
//               />
//               {errors.country && (
//                 <p className="text-xs text-red-600 mt-1 flex items-center gap-1">
//                   <AlertCircle size={14} /> {errors.country}
//                 </p>
//               )}
//             </div>

//             {/* BUTTONS */}
//             <div className="flex gap-3 pt-4 border-t border-gray-200">
//               <button
//                 type="button"
//                 onClick={onClose}
//                 disabled={isSubmitting}
//                 className="flex-1 px-4 py-3 border-2 border-gray-300 text-gray-700 rounded-lg font-bold text-sm hover:bg-gray-50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
//               >
//                 Cancel
//               </button>
//               <button
//                 type="submit"
//                 disabled={isSubmitting}
//                 className="flex-1 px-4 py-3 bg-gradient-to-r from-teal-700 to-teal-600 text-white rounded-lg font-bold text-sm hover:shadow-lg transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
//               >
//                 {isSubmitting ? (
//                   <>
//                     <Loader2 size={18} className="animate-spin" />
//                     Adding...
//                   </>
//                 ) : (
//                   <>
//                     <CheckCircle size={18} />
//                     Add Address
//                   </>
//                 )}
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>

//       {/* MOBILE SHEET MODAL */}
//       <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white rounded-t-3xl shadow-2xl z-[101] max-h-[95vh] overflow-y-auto animate-slide-up">
//         <div className="w-12 h-1.5 bg-gray-300 rounded-full mx-auto my-3" />

//         {/* HEADER */}
//         <div className="px-4 sm:px-5 py-3 border-b border-gray-200 flex items-center justify-between sticky top-0 bg-white z-10 rounded-t-3xl">
//           <h2 className="text-lg sm:text-xl font-bold text-gray-900 flex items-center gap-2">
//             <div className="w-8 h-8 bg-teal-100 rounded-lg flex items-center justify-center flex-shrink-0">
//               <MapPin size={18} className="text-teal-700" />
//             </div>
//             <span className="truncate">Add Address</span>
//           </h2>
//           <button
//             onClick={onClose}
//             disabled={isSubmitting}
//             className="p-2 hover:bg-gray-100 rounded-full transition-all flex-shrink-0 disabled:opacity-50"
//           >
//             <X size={20} />
//           </button>
//         </div>

//         {/* MOBILE FORM */}
//         <form onSubmit={handleSubmit} className="p-4 sm:p-5 space-y-4 pb-32">
//           {/* Same form fields as desktop but with mobile styling */}
//           {/* For brevity, using same structure with mobile-optimized classes */}

//           <div>
//             <label className="block text-sm font-semibold text-gray-700 mb-2">
//               Address Type
//             </label>
//             <div className="flex gap-3">
//               <label className="flex items-center gap-2 cursor-pointer flex-1">
//                 <input
//                   type="radio"
//                   value="Home"
//                   checked={formData.addressType === "Home"}
//                   onChange={(e) =>
//                     setFormData({ ...formData, addressType: e.target.value })
//                   }
//                   disabled={isSubmitting}
//                   className="w-4 h-4"
//                 />
//                 <span className="text-sm font-medium text-gray-700 flex items-center gap-1">
//                   <Home size={16} />
//                   Home
//                 </span>
//               </label>
//               <label className="flex items-center gap-2 cursor-pointer flex-1">
//                 <input
//                   type="radio"
//                   value="Office"
//                   checked={formData.addressType === "Office"}
//                   onChange={(e) =>
//                     setFormData({ ...formData, addressType: e.target.value })
//                   }
//                   disabled={isSubmitting}
//                   className="w-4 h-4"
//                 />
//                 <span className="text-sm font-medium text-gray-700 flex items-center gap-1">
//                   <Building size={16} />
//                   Office
//                 </span>
//               </label>
//             </div>
//           </div>

//           <div>
//             <label className="block text-sm font-semibold text-gray-700 mb-1.5">
//               Full Name *
//             </label>
//             <input
//               type="text"
//               value={formData.fullName}
//               onChange={(e) =>
//                 setFormData({ ...formData, fullName: e.target.value })
//               }
//               disabled={isSubmitting}
//               className={`w-full px-3 sm:px-4 py-2.5 border rounded-lg text-sm focus:outline-none focus:ring-2 transition-all disabled:bg-gray-100 ${
//                 errors.fullName
//                   ? "border-red-500 focus:ring-red-100"
//                   : "border-gray-300 focus:border-teal-700 focus:ring-teal-100"
//               }`}
//               placeholder="Full name"
//             />
//             {errors.fullName && (
//               <p className="text-xs text-red-600 mt-1 flex items-center gap-1">
//                 <AlertCircle size={14} /> {errors.fullName}
//               </p>
//             )}
//           </div>

//           <div>
//             <label className="block text-sm font-semibold text-gray-700 mb-1.5">
//               Phone Number *
//             </label>
//             <input
//               type="tel"
//               value={formData.phone}
//               onChange={(e) =>
//                 setFormData({ ...formData, phone: e.target.value })
//               }
//               maxLength={10}
//               inputMode="numeric"
//               disabled={isSubmitting}
//               className={`w-full px-3 sm:px-4 py-2.5 border rounded-lg text-sm focus:outline-none focus:ring-2 transition-all disabled:bg-gray-100 ${
//                 errors.phone
//                   ? "border-red-500 focus:ring-red-100"
//                   : "border-gray-300 focus:border-teal-700 focus:ring-teal-100"
//               }`}
//               placeholder="10-digit number"
//             />
//             {errors.phone && (
//               <p className="text-xs text-red-600 mt-1 flex items-center gap-1">
//                 <AlertCircle size={14} /> {errors.phone}
//               </p>
//             )}
//           </div>

//           <div>
//             <label className="block text-sm font-semibold text-gray-700 mb-1.5">
//               Email Address *
//             </label>
//             <input
//               type="email"
//               value={formData.email}
//               onChange={(e) =>
//                 setFormData({ ...formData, email: e.target.value })
//               }
//               inputMode="email"
//               disabled={isSubmitting}
//               className={`w-full px-3 sm:px-4 py-2.5 border rounded-lg text-sm focus:outline-none focus:ring-2 transition-all disabled:bg-gray-100 ${
//                 errors.email
//                   ? "border-red-500 focus:ring-red-100"
//                   : "border-gray-300 focus:border-teal-700 focus:ring-teal-100"
//               }`}
//               placeholder="your@email.com"
//             />
//             {errors.email && (
//               <p className="text-xs text-red-600 mt-1 flex items-center gap-1">
//                 <AlertCircle size={14} /> {errors.email}
//               </p>
//             )}
//           </div>

//           <div>
//             <label className="block text-sm font-semibold text-gray-700 mb-1.5">
//               Address Line 1 *
//             </label>
//             <textarea
//               value={formData.addressLine1}
//               onChange={(e) =>
//                 setFormData({ ...formData, addressLine1: e.target.value })
//               }
//               rows={2}
//               disabled={isSubmitting}
//               className={`w-full px-3 sm:px-4 py-2.5 border rounded-lg text-sm focus:outline-none focus:ring-2 transition-all resize-none disabled:bg-gray-100 ${
//                 errors.addressLine1
//                   ? "border-red-500 focus:ring-red-100"
//                   : "border-gray-300 focus:border-teal-700 focus:ring-teal-100"
//               }`}
//               placeholder="Street, locality, area"
//             />
//             {errors.addressLine1 && (
//               <p className="text-xs text-red-600 mt-1 flex items-center gap-1">
//                 <AlertCircle size={14} /> {errors.addressLine1}
//               </p>
//             )}
//           </div>

//           <div>
//             <label className="block text-sm font-semibold text-gray-700 mb-1.5">
//               Address Line 2
//             </label>
//             <input
//               type="text"
//               value={formData.addressLine2}
//               onChange={(e) =>
//                 setFormData({ ...formData, addressLine2: e.target.value })
//               }
//               disabled={isSubmitting}
//               className="w-full px-3 sm:px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-teal-700 focus:ring-2 focus:ring-teal-100 transition-all disabled:bg-gray-100"
//               placeholder="Apartment, suite (optional)"
//             />
//           </div>

//           <div className="space-y-4">
//             <div>
//               <label className="block text-sm font-semibold text-gray-700 mb-1.5">
//                 City *
//               </label>
//               <input
//                 type="text"
//                 value={formData.city}
//                 onChange={(e) =>
//                   setFormData({ ...formData, city: e.target.value })
//                 }
//                 disabled={isSubmitting}
//                 className={`w-full px-3 sm:px-4 py-2.5 border rounded-lg text-sm focus:outline-none focus:ring-2 transition-all disabled:bg-gray-100 ${
//                   errors.city
//                     ? "border-red-500 focus:ring-red-100"
//                     : "border-gray-300 focus:border-teal-700 focus:ring-teal-100"
//                 }`}
//                 placeholder="City name"
//               />
//               {errors.city && (
//                 <p className="text-xs text-red-600 mt-1 flex items-center gap-1">
//                   <AlertCircle size={14} /> {errors.city}
//                 </p>
//               )}
//             </div>

//             <div>
//               <label className="block text-sm font-semibold text-gray-700 mb-1.5">
//                 State *
//               </label>
//               <input
//                 type="text"
//                 value={formData.state}
//                 onChange={(e) =>
//                   setFormData({ ...formData, state: e.target.value })
//                 }
//                 disabled={isSubmitting}
//                 className={`w-full px-3 sm:px-4 py-2.5 border rounded-lg text-sm focus:outline-none focus:ring-2 transition-all disabled:bg-gray-100 ${
//                   errors.state
//                     ? "border-red-500 focus:ring-red-100"
//                     : "border-gray-300 focus:border-teal-700 focus:ring-teal-100"
//                 }`}
//                 placeholder="State name"
//               />
//               {errors.state && (
//                 <p className="text-xs text-red-600 mt-1 flex items-center gap-1">
//                   <AlertCircle size={14} /> {errors.state}
//                 </p>
//               )}
//             </div>

//             <div>
//               <label className="block text-sm font-semibold text-gray-700 mb-1.5">
//                 Pincode *
//               </label>
//               <input
//                 type="text"
//                 value={formData.zipCode}
//                 onChange={(e) =>
//                   setFormData({ ...formData, zipCode: e.target.value })
//                 }
//                 maxLength={6}
//                 inputMode="numeric"
//                 disabled={isSubmitting}
//                 className={`w-full px-3 sm:px-4 py-2.5 border rounded-lg text-sm focus:outline-none focus:ring-2 transition-all disabled:bg-gray-100 ${
//                   errors.zipCode
//                     ? "border-red-500 focus:ring-red-100"
//                     : "border-gray-300 focus:border-teal-700 focus:ring-teal-100"
//                 }`}
//                 placeholder="6-digit pincode"
//               />
//               {errors.zipCode && (
//                 <p className="text-xs text-red-600 mt-1 flex items-center gap-1">
//                   <AlertCircle size={14} /> {errors.zipCode}
//                 </p>
//               )}
//             </div>
//           </div>

//           <div>
//             <label className="block text-sm font-semibold text-gray-700 mb-1.5">
//               Country *
//             </label>
//             <input
//               type="text"
//               value={formData.country}
//               onChange={(e) =>
//                 setFormData({ ...formData, country: e.target.value })
//               }
//               disabled={isSubmitting}
//               className={`w-full px-3 sm:px-4 py-2.5 border rounded-lg text-sm focus:outline-none focus:ring-2 transition-all disabled:bg-gray-100 ${
//                 errors.country
//                   ? "border-red-500 focus:ring-red-100"
//                   : "border-gray-300 focus:border-teal-700 focus:ring-teal-100"
//               }`}
//               placeholder="Country name"
//             />
//             {errors.country && (
//               <p className="text-xs text-red-600 mt-1 flex items-center gap-1">
//                 <AlertCircle size={14} /> {errors.country}
//               </p>
//             )}
//           </div>

//           <div className="flex gap-2 pt-4 fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 sm:p-5">
//             <button
//               type="button"
//               onClick={onClose}
//               disabled={isSubmitting}
//               className="flex-1 px-4 py-3 border-2 border-gray-300 text-gray-700 rounded-lg font-bold text-sm hover:bg-gray-50 transition-all active:scale-95 disabled:opacity-50"
//             >
//               Cancel
//             </button>
//             <button
//               type="submit"
//               disabled={isSubmitting}
//               className="flex-1 px-4 py-3 bg-gradient-to-r from-teal-700 to-teal-600 text-white rounded-lg font-bold text-sm hover:shadow-lg transition-all flex items-center justify-center gap-2 active:scale-95 disabled:opacity-50"
//             >
//               {isSubmitting ? (
//                 <>
//                   <Loader2 size={18} className="animate-spin" />
//                   Adding...
//                 </>
//               ) : (
//                 <>
//                   <CheckCircle size={18} />
//                   Add
//                 </>
//               )}
//             </button>
//           </div>
//         </form>
//       </div>
//     </>
//   );
// };

// // ============================================
// // PROMO CODE SECTION
// // ============================================
// const PromoCodeSection = ({ onApply, appliedCoupon, onRemove }) => {
//   const [promoCode, setPromoCode] = useState("");
//   const [message, setMessage] = useState({ type: "", text: "" });
//   const [isLoading, setIsLoading] = useState(false);

//   const handleApply = async () => {
//     if (!promoCode.trim()) {
//       setMessage({
//         type: "error",
//         text: "Please enter a coupon code",
//       });
//       return;
//     }

//     setIsLoading(true);
//     setMessage({ type: "", text: "" });

//     const result = await onApply(promoCode.toUpperCase());
//     setMessage(result);

//     if (result.type === "success") {
//       setPromoCode("");
//     }

//     setIsLoading(false);
//   };

//   if (appliedCoupon) {
//     return (
//       <div className="bg-white rounded-xl md:rounded-2xl p-4 md:p-5 shadow-sm border-2 border-green-300 mb-4 md:mb-6 bg-gradient-to-br from-green-50 to-emerald-50">
//         <div className="flex items-start justify-between gap-3">
//           <div className="flex items-start gap-3">
//             <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center flex-shrink-0">
//               <CheckCircle size={20} className="text-white" />
//             </div>
//             <div className="flex-1">
//               <h4 className="font-bold text-gray-900 text-base">
//                 ✓ Coupon Applied
//               </h4>
//               <div className="mt-2 space-y-1">
//                 <p className="text-sm text-gray-700">
//                   <span className="font-bold text-green-700">
//                     {appliedCoupon.code}
//                   </span>
//                   <span className="mx-2">•</span>
//                   <span className="text-gray-600">
//                     {appliedCoupon.type === "FIXED"
//                       ? `₹${appliedCoupon.value} off`
//                       : `${appliedCoupon.value}% off`}
//                   </span>
//                 </p>
//                 <p className="text-xs text-gray-600">
//                   You save{" "}
//                   <span className="font-bold text-green-600">
//                     ₹{appliedCoupon.discountAmount?.toLocaleString() || "0"}
//                   </span>
//                 </p>
//               </div>
//             </div>
//           </div>
//           <button
//             onClick={() => {
//               setPromoCode("");
//               setMessage({ type: "", text: "" });
//               onRemove();
//             }}
//             className="text-red-500 hover:bg-red-50 rounded-lg p-2 transition-all flex-shrink-0"
//           >
//             <X size={20} />
//           </button>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="bg-white rounded-xl md:rounded-2xl p-4 md:p-5 shadow-sm border border-gray-100 mb-4 md:mb-6">
//       <h4 className="text-base md:text-lg font-bold text-gray-800 mb-3 flex items-center gap-2">
//         <div className="w-7 h-7 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-lg flex items-center justify-center">
//           <Tag size={16} className="text-white" />
//         </div>
//         Have a Coupon Code?
//       </h4>

//       <div className="flex flex-col sm:flex-row gap-2 mb-3">
//         <input
//           type="text"
//           placeholder="Enter your coupon code"
//           value={promoCode}
//           onChange={(e) => setPromoCode(e.target.value.toUpperCase())}
//           onKeyPress={(e) => e.key === "Enter" && !isLoading && handleApply()}
//           disabled={isLoading}
//           className="flex-1 px-3 md:px-4 py-2 md:py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-teal-700 focus:ring-2 focus:ring-teal-100 transition-all uppercase font-medium disabled:bg-gray-50 disabled:cursor-not-allowed"
//           maxLength={20}
//         />
//         <button
//           onClick={handleApply}
//           disabled={isLoading || !promoCode.trim()}
//           className="px-5 md:px-6 py-2 md:py-2.5 bg-gradient-to-r from-teal-700 to-teal-600 text-white rounded-lg font-bold text-sm hover:shadow-lg transition-all whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 min-w-[120px]"
//         >
//           {isLoading ? (
//             <>
//               <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
//               <span>Validating...</span>
//             </>
//           ) : (
//             <>
//               <CheckCircle size={16} />
//               <span>Apply</span>
//             </>
//           )}
//         </button>
//       </div>

//       {message.text && (
//         <div
//           className={`p-3 rounded-lg text-sm flex items-start gap-2 border ${
//             message.type === "success"
//               ? "bg-green-50 text-green-800 border-green-200"
//               : "bg-red-50 text-red-800 border-red-200"
//           }`}
//         >
//           {message.type === "success" ? (
//             <CheckCircle size={16} className="flex-shrink-0 mt-0.5" />
//           ) : (
//             <AlertCircle size={16} className="flex-shrink-0 mt-0.5" />
//           )}
//           <span className="flex-1">{message.text}</span>
//         </div>
//       )}

//       <p className="text-xs text-gray-500 mt-3 flex items-center gap-1.5">
//         <Tag size={12} />
//         Enter a valid coupon code to get instant discount on your order
//       </p>
//     </div>
//   );
// };

// // ============================================
// // ADDRESS SECTION (Web/Desktop)
// // ============================================
// const AddressSection = ({
//   addresses,
//   selectedAddress,
//   onSelectAddress,
//   onAddNewClick,
//   isLoading,
//   error,
//   onRetry,
// }) => {
//   return (
//     <div className="bg-white rounded-xl md:rounded-2xl p-4 md:p-5 shadow-sm border border-gray-100 mb-4 md:mb-6">
//       <h4 className="text-base md:text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
//         <div className="w-8 h-8 bg-teal-100 rounded-lg flex items-center justify-center">
//           <MapPin size={18} className="text-teal-700" />
//         </div>
//         Delivery Address
//       </h4>

//       {isLoading ? (
//         <AddressLoadingSkeleton />
//       ) : error ? (
//         <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-center">
//           <AlertCircle size={32} className="mx-auto mb-2 text-red-500" />
//           <p className="text-sm text-red-700 font-medium mb-3">{error}</p>
//           <button
//             onClick={onRetry}
//             className="px-4 py-2 bg-red-600 text-white rounded-lg text-sm font-bold hover:bg-red-700 transition-all"
//           >
//             Retry
//           </button>
//         </div>
//       ) : !addresses || addresses.length === 0 ? (
//         <div className="bg-gray-50 border-2 border-dashed border-gray-300 rounded-xl p-6 text-center">
//           <MapPin size={48} className="mx-auto mb-3 text-gray-400" />
//           <h5 className="text-base font-bold text-gray-700 mb-2">
//             No Address Found
//           </h5>
//           <p className="text-sm text-gray-600 mb-4">
//             Add your first delivery address to continue
//           </p>
//           <button
//             onClick={onAddNewClick}
//             className="px-5 py-2.5 bg-gradient-to-r from-teal-700 to-teal-600 text-white rounded-lg font-bold text-sm hover:shadow-lg transition-all flex items-center justify-center gap-2 mx-auto"
//           >
//             <Plus size={18} />
//             Add New Address
//           </button>
//         </div>
//       ) : (
//         <>
//           <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
//             {addresses.map((addr) => (
//               <AddressCard
//                 key={addr.id}
//                 address={addr}
//                 isSelected={selectedAddress?.id === addr.id}
//                 onSelect={() => onSelectAddress(addr)}
//                 isDefault={addr.isDefault}
//               />
//             ))}
//           </div>

//           <button
//             onClick={onAddNewClick}
//             className="w-full p-3 rounded-xl border-2 border-dashed border-teal-700 text-center font-semibold text-teal-700 hover:bg-teal-50 transition-all flex items-center justify-center gap-2"
//           >
//             <Plus size={20} />
//             Add New Address
//           </button>

//           {selectedAddress && (
//             <div className="mt-4 p-4 bg-teal-50 rounded-xl border-2 border-teal-700">
//               <p className="text-xs font-semibold text-teal-700 mb-2 flex items-center gap-1">
//                 <CheckCircle size={14} /> Delivery To
//               </p>
//               <p className="font-semibold text-gray-900 text-sm mb-1">
//                 {selectedAddress.fullName}
//               </p>
//               <p className="text-xs text-gray-600">
//                 {selectedAddress.addressLine1}
//                 {selectedAddress.addressLine2 &&
//                   `, ${selectedAddress.addressLine2}`}
//               </p>
//             </div>
//           )}
//         </>
//       )}
//     </div>
//   );
// };

// // [Continue with OrderSummary, MobileCheckoutBar, MobileCheckoutDialog, Snackbar components...]
// // These remain the same as before

// // ============================================
// // ORDER SUMMARY (Web/Desktop)
// // ============================================
// const OrderSummary = ({
//   subtotal,
//   discount,
//   tax,
//   total,
//   itemCount,
//   onCheckout,
//   appliedCoupon,
// }) => {
//   return (
//     <div className="bg-white rounded-xl md:rounded-2xl p-4 md:p-5 shadow-sm border border-gray-100 sticky top-24">
//       <h2 className="text-lg md:text-xl font-bold text-gray-900 mb-4 md:mb-5 flex items-center gap-2">
//         <Package size={24} className="text-teal-700" />
//         Order Summary
//       </h2>

//       <div className="space-y-3 mb-5">
//         <div className="flex justify-between py-2 border-b border-gray-100">
//           <span className="text-sm text-gray-600 font-medium">
//             Subtotal ({itemCount} items)
//           </span>
//           <span className="text-base font-bold text-gray-900">
//             ₹{subtotal.toLocaleString()}
//           </span>
//         </div>

//         {discount > 0 && appliedCoupon && (
//           <div className="flex justify-between py-2 px-3 bg-green-50 rounded-lg border border-green-200">
//             <div className="flex items-center gap-1.5">
//               <span className="text-sm text-gray-600 font-medium">
//                 Coupon Discount
//               </span>
//               <span className="px-2 py-0.5 bg-green-500 text-white text-xs font-bold rounded">
//                 {appliedCoupon.code}
//               </span>
//             </div>
//             <span className="text-base font-bold text-green-600">
//               -₹{discount.toLocaleString()}
//             </span>
//           </div>
//         )}

//         <div className="flex justify-between py-2 border-b border-gray-100">
//           <div className="flex items-center gap-1.5">
//             <span className="text-sm text-gray-600 font-medium">Shipping</span>
//             <span className="px-1.5 py-0.5 bg-emerald-100 text-emerald-600 text-xs font-bold rounded">
//               FREE
//             </span>
//           </div>
//           <span className="text-base font-bold text-emerald-600">FREE</span>
//         </div>

//         <div className="flex justify-between py-2">
//           <span className="text-sm text-gray-600 font-medium">
//             Tax (GST 18%)
//           </span>
//           <span className="text-base font-bold text-gray-900">
//             ₹{tax.toLocaleString()}
//           </span>
//         </div>
//       </div>

//       <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl p-3 md:p-4 mb-4 border-2 border-emerald-200">
//         <div className="flex justify-between items-center">
//           <span className="text-base font-bold text-gray-900">
//             Total Amount
//           </span>
//           <div className="text-right">
//             <span className="text-2xl md:text-3xl font-extrabold text-teal-700">
//               ₹{total.toLocaleString()}
//             </span>
//             <p className="text-xs text-gray-600 mt-0.5">
//               Inclusive of all taxes
//             </p>
//           </div>
//         </div>
//       </div>

//       <button
//         onClick={onCheckout}
//         className="w-full bg-gradient-to-r from-teal-700 to-teal-600 text-white py-3 md:py-3.5 rounded-xl font-bold text-base shadow-md hover:shadow-lg hover:scale-[1.02] transition-all flex items-center justify-center gap-2 mb-2"
//       >
//         <CheckCircle size={20} />
//         Secure Checkout
//       </button>

//       <button className="w-full text-center text-teal-700 font-bold py-2.5 md:py-3 border-2 border-teal-700 rounded-xl hover:bg-teal-700 hover:text-white transition-all text-sm">
//         Continue Shopping
//       </button>

//       <div className="mt-5 pt-4 border-t border-gray-200 space-y-3">
//         <div className="flex items-start gap-2 text-emerald-600">
//           <Shield size={20} className="flex-shrink-0 mt-0.5" />
//           <div>
//             <p className="font-semibold text-sm">100% Secure Payments</p>
//             <p className="text-xs text-gray-600">SSL Encrypted Transactions</p>
//           </div>
//         </div>
//         <div className="flex items-start gap-2 text-blue-600">
//           <Truck size={20} className="flex-shrink-0 mt-0.5" />
//           <div>
//             <p className="font-semibold text-sm">Free Shipping</p>
//             <p className="text-xs text-gray-600">On orders above ₹6,225</p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// // ============================================
// // MOBILE CHECKOUT BAR
// // ============================================
// const MobileCheckoutBar = ({ total, itemCount, onOpenSummary }) => {
//   return (
//     <div className="fixed bottom-0 left-0 right-0 bg-white shadow-lg z-50 md:hidden border-t border-gray-200 pb-20">
//       <div className="p-3 flex items-center justify-between gap-3">
//         <div className="flex-1">
//           <p className="text-[10px] text-gray-600 font-medium">Total Amount</p>
//           <div className="flex items-baseline gap-1.5">
//             <span className="text-xl font-extrabold text-teal-700">
//               ₹{total.toLocaleString()}
//             </span>
//             <span className="text-[10px] text-gray-500 font-medium">
//               ({itemCount} items)
//             </span>
//           </div>
//           <p className="text-[9px] text-emerald-600 font-semibold">
//             ✓ Incl. taxes + FREE shipping
//           </p>
//         </div>
//         <button
//           onClick={onOpenSummary}
//           className="px-5 py-3 bg-gradient-to-r from-teal-700 to-teal-600 text-white rounded-lg font-bold text-sm shadow-lg whitespace-nowrap flex items-center gap-2 hover:scale-[1.02] transition-all"
//         >
//           <CheckCircle size={20} />
//           Checkout
//         </button>
//       </div>
//     </div>
//   );
// };

// // ============================================
// // MOBILE 2-STEP CHECKOUT DIALOG
// // ============================================
// const MobileCheckoutDialog = ({
//   isOpen,
//   onClose,
//   summaryData,
//   onCheckout,
//   onApplyPromo,
//   appliedCoupon,
//   onRemoveCoupon,
//   addresses,
//   selectedAddress,
//   onSelectAddress,
//   onAddNewClick,
//   isLoadingAddresses,
//   addressError,
// }) => {
//   const [step, setStep] = useState("summary");
//   const [promoCode, setPromoCode] = useState("");
//   const [promoMessage, setPromoMessage] = useState({ type: "", text: "" });
//   const [isLoadingPromo, setIsLoadingPromo] = useState(false);

//   if (!isOpen) return null;

//   const handleApplyPromo = async () => {
//     if (!promoCode.trim()) {
//       setPromoMessage({ type: "error", text: "Please enter a coupon code" });
//       return;
//     }

//     setIsLoadingPromo(true);
//     setPromoMessage({ type: "", text: "" });

//     const result = await onApplyPromo(promoCode.toUpperCase());
//     setPromoMessage(result);

//     if (result.type === "success") {
//       setPromoCode("");
//     }

//     setIsLoadingPromo(false);
//   };

//   const handleNextStep = () => {
//     if (step === "summary") {
//       setStep("address");
//     } else if (step === "address" && selectedAddress) {
//       onCheckout();
//       onClose();
//     }
//   };

//   const handlePrevStep = () => {
//     setStep("summary");
//   };

//   return (
//     <>
//       <div
//         className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[100] transition-opacity"
//         onClick={onClose}
//       />

//       <div className="fixed bottom-0 left-0 right-0 bg-white rounded-t-3xl shadow-2xl z-[101] max-h-[90vh] overflow-y-auto animate-slide-up">
//         <div className="w-12 h-1.5 bg-gray-300 rounded-full mx-auto my-3" />

//         <div className="px-4 py-3 border-b border-gray-200 sticky top-0 bg-white z-10 flex items-center justify-between">
//           <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
//             <div className="text-xs px-2.5 py-1 bg-teal-100 text-teal-700 rounded-full font-bold">
//               {step === "summary" ? "Step 1/2" : "Step 2/2"}
//             </div>
//             {step === "summary" ? "Order Summary" : "Select Address"}
//           </h2>
//           <button
//             onClick={onClose}
//             className="p-2 hover:bg-gray-100 rounded-full transition-all active:scale-95"
//           >
//             <X size={20} />
//           </button>
//         </div>

//         <div className="p-4 sm:p-5 space-y-4">
//           {step === "summary" && (
//             <>
//               <div className="space-y-3">
//                 <div className="flex justify-between items-center py-2 border-b border-gray-100">
//                   <span className="text-sm text-gray-600 font-medium">
//                     Subtotal ({summaryData.itemCount} items)
//                   </span>
//                   <span className="text-base font-bold text-gray-900">
//                     ₹{summaryData.subtotal.toLocaleString()}
//                   </span>
//                 </div>

//                 {summaryData.discount > 0 && appliedCoupon && (
//                   <div className="flex justify-between items-center py-2 px-3 bg-green-50 rounded-lg border border-green-200">
//                     <span className="text-sm text-gray-600 font-medium">
//                       Discount ({appliedCoupon.code})
//                     </span>
//                     <span className="text-base font-bold text-green-600">
//                       -₹{summaryData.discount.toLocaleString()}
//                     </span>
//                   </div>
//                 )}

//                 <div className="flex justify-between items-center py-2 border-b border-gray-100">
//                   <span className="text-sm text-gray-600 font-medium">
//                     Shipping
//                   </span>
//                   <span className="text-base font-bold text-emerald-600">
//                     FREE
//                   </span>
//                 </div>

//                 <div className="flex justify-between items-center py-2">
//                   <span className="text-sm text-gray-600 font-medium">
//                     Tax (GST 18%)
//                   </span>
//                   <span className="text-base font-bold text-gray-900">
//                     ₹{summaryData.tax.toLocaleString()}
//                   </span>
//                 </div>
//               </div>

//               {!appliedCoupon ? (
//                 <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-xl p-4 border-2 border-yellow-200">
//                   <h4 className="text-sm font-bold text-gray-800 mb-3 flex items-center gap-2">
//                     <Tag size={16} className="text-yellow-600" />
//                     Have a Coupon Code?
//                   </h4>
//                   <div className="flex gap-2 mb-2">
//                     <input
//                       type="text"
//                       placeholder="Enter code"
//                       value={promoCode}
//                       onChange={(e) =>
//                         setPromoCode(e.target.value.toUpperCase())
//                       }
//                       onKeyPress={(e) =>
//                         e.key === "Enter" &&
//                         !isLoadingPromo &&
//                         handleApplyPromo()
//                       }
//                       disabled={isLoadingPromo}
//                       className="flex-1 px-3 py-2.5 border-2 border-gray-200 rounded-lg text-sm font-medium focus:outline-none focus:border-teal-700 transition-all uppercase disabled:bg-gray-50"
//                       maxLength={20}
//                     />
//                     <button
//                       onClick={handleApplyPromo}
//                       disabled={isLoadingPromo || !promoCode.trim()}
//                       className="px-5 py-2.5 bg-gradient-to-r from-teal-700 to-teal-600 text-white rounded-lg font-bold text-sm hover:shadow-lg active:scale-95 transition-all whitespace-nowrap disabled:opacity-50 flex items-center justify-center gap-2"
//                     >
//                       {isLoadingPromo ? (
//                         <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
//                       ) : (
//                         "Apply"
//                       )}
//                     </button>
//                   </div>

//                   {promoMessage.text && (
//                     <div
//                       className={`text-sm font-semibold flex items-start gap-1.5 p-3 rounded-lg ${
//                         promoMessage.type === "success"
//                           ? "text-green-600 bg-green-50 border border-green-200"
//                           : "text-red-600 bg-red-50 border border-red-200"
//                       }`}
//                     >
//                       {promoMessage.type === "success" ? (
//                         <CheckCircle
//                           size={16}
//                           className="flex-shrink-0 mt-0.5"
//                         />
//                       ) : (
//                         <AlertCircle
//                           size={16}
//                           className="flex-shrink-0 mt-0.5"
//                         />
//                       )}
//                       <span>{promoMessage.text}</span>
//                     </div>
//                   )}
//                 </div>
//               ) : (
//                 <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-4 border-2 border-green-200">
//                   <div className="flex items-start justify-between gap-2">
//                     <div className="flex items-start gap-3">
//                       <CheckCircle
//                         size={20}
//                         className="text-green-600 flex-shrink-0 mt-0.5"
//                       />
//                       <div>
//                         <p className="font-bold text-gray-900 text-sm">
//                           Coupon Applied ✓
//                         </p>
//                         <p className="text-sm text-gray-600 mt-1">
//                           <span className="font-bold text-green-700">
//                             {appliedCoupon.code}
//                           </span>
//                           {appliedCoupon.type === "FIXED"
//                             ? ` - ₹${appliedCoupon.value} off`
//                             : ` - ${appliedCoupon.value}% off`}
//                         </p>
//                       </div>
//                     </div>
//                     <button
//                       onClick={() => {
//                         setPromoCode("");
//                         setPromoMessage({ type: "", text: "" });
//                         onRemoveCoupon();
//                       }}
//                       className="text-red-500 hover:bg-red-50 rounded-lg p-2 transition-all flex-shrink-0"
//                     >
//                       <X size={18} />
//                     </button>
//                   </div>
//                 </div>
//               )}

//               <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl p-4 border-2 border-emerald-200">
//                 <div className="flex justify-between items-center">
//                   <span className="text-base font-bold text-gray-900">
//                     Total Amount
//                   </span>
//                   <span className="text-2xl font-extrabold text-teal-700">
//                     ₹{summaryData.total.toLocaleString()}
//                   </span>
//                 </div>
//               </div>

//               <button
//                 onClick={handleNextStep}
//                 className="w-full bg-gradient-to-r from-teal-700 to-teal-600 text-white py-3 rounded-xl font-bold text-base shadow-lg hover:shadow-2xl active:scale-98 transition-all flex items-center justify-center gap-2"
//               >
//                 Proceed to Address
//                 <ChevronRight size={20} />
//               </button>
//             </>
//           )}

//           {step === "address" && (
//             <>
//               {isLoadingAddresses ? (
//                 <AddressLoadingSkeleton />
//               ) : addressError ? (
//                 <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-center">
//                   <AlertCircle
//                     size={32}
//                     className="mx-auto mb-2 text-red-500"
//                   />
//                   <p className="text-sm text-red-700 font-medium">
//                     {addressError}
//                   </p>
//                 </div>
//               ) : !addresses || addresses.length === 0 ? (
//                 <div className="bg-gray-50 border-2 border-dashed border-gray-300 rounded-xl p-6 text-center">
//                   <MapPin size={48} className="mx-auto mb-3 text-gray-400" />
//                   <h5 className="text-base font-bold text-gray-700 mb-2">
//                     No Address Found
//                   </h5>
//                   <p className="text-sm text-gray-600 mb-4">
//                     Add your first delivery address
//                   </p>
//                   <button
//                     onClick={onAddNewClick}
//                     className="px-5 py-2.5 bg-gradient-to-r from-teal-700 to-teal-600 text-white rounded-lg font-bold text-sm hover:shadow-lg transition-all flex items-center justify-center gap-2 mx-auto"
//                   >
//                     <Plus size={18} />
//                     Add New Address
//                   </button>
//                 </div>
//               ) : (
//                 <>
//                   <div className="space-y-3">
//                     {addresses.map((addr) => (
//                       <AddressCard
//                         key={addr.id}
//                         address={addr}
//                         isSelected={selectedAddress?.id === addr.id}
//                         onSelect={() => onSelectAddress(addr)}
//                         isDefault={addr.isDefault}
//                       />
//                     ))}
//                   </div>

//                   <button
//                     onClick={onAddNewClick}
//                     className="w-full p-3 rounded-xl border-2 border-dashed border-teal-700 text-center font-semibold text-teal-700 hover:bg-teal-50 transition-all flex items-center justify-center gap-2"
//                   >
//                     <Plus size={18} />
//                     Add New Address
//                   </button>

//                   {selectedAddress && (
//                     <div className="p-4 bg-teal-50 rounded-xl border-2 border-teal-700">
//                       <p className="text-xs font-semibold text-teal-700 mb-2 flex items-center gap-1">
//                         <CheckCircle size={14} /> Delivery To
//                       </p>
//                       <p className="font-semibold text-gray-900 text-sm mb-1">
//                         {selectedAddress.fullName}
//                       </p>
//                       <p className="text-xs text-gray-600 mb-1">
//                         {selectedAddress.addressLine1}
//                         {selectedAddress.addressLine2 &&
//                           `, ${selectedAddress.addressLine2}`}
//                       </p>
//                       <p className="text-xs text-gray-600 flex items-center gap-1">
//                         <Phone size={12} /> {selectedAddress.phone}
//                       </p>
//                     </div>
//                   )}
//                 </>
//               )}

//               <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
//                 <h3 className="font-bold text-gray-900 mb-3 text-sm">
//                   Order Summary
//                 </h3>
//                 <div className="space-y-2 text-sm">
//                   <div className="flex justify-between">
//                     <span className="text-gray-600">Subtotal</span>
//                     <span className="font-bold">
//                       ₹{summaryData.subtotal.toLocaleString()}
//                     </span>
//                   </div>
//                   {summaryData.discount > 0 && (
//                     <div className="flex justify-between text-green-600 font-bold">
//                       <span>Discount</span>
//                       <span>-₹{summaryData.discount.toLocaleString()}</span>
//                     </div>
//                   )}
//                   <div className="flex justify-between text-emerald-600 font-bold">
//                     <span>Shipping</span>
//                     <span>FREE</span>
//                   </div>
//                   <div className="border-t border-gray-200 pt-2 flex justify-between font-bold">
//                     <span>Total</span>
//                     <span className="text-teal-700">
//                       ₹{summaryData.total.toLocaleString()}
//                     </span>
//                   </div>
//                 </div>
//               </div>

//               <div className="flex gap-2">
//                 <button
//                   onClick={handlePrevStep}
//                   className="flex-1 px-4 py-3 border-2 border-gray-300 text-gray-700 rounded-lg font-bold text-sm hover:bg-gray-50 transition-all"
//                 >
//                   Back
//                 </button>
//                 <button
//                   onClick={handleNextStep}
//                   disabled={!selectedAddress}
//                   className="flex-1 bg-gradient-to-r from-teal-700 to-teal-600 text-white py-3 rounded-lg font-bold text-sm shadow-lg hover:shadow-2xl active:scale-98 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
//                 >
//                   <CheckCircle size={18} />
//                   Place Order
//                 </button>
//               </div>
//             </>
//           )}
//         </div>
//       </div>
//     </>
//   );
// };

// // ============================================
// // SNACKBAR
// // ============================================
// const Snackbar = ({ message, type, isOpen, onClose }) => {
//   if (!isOpen) return null;

//   return (
//     <div className="fixed bottom-24 left-1/2 -translate-x-1/2 z-[102] animate-fade-in">
//       <div
//         className={`px-4 py-3 rounded-lg shadow-lg flex items-center gap-2 ${
//           type === "success"
//             ? "bg-green-600 text-white"
//             : type === "error"
//             ? "bg-red-600 text-white"
//             : "bg-gray-800 text-white"
//         }`}
//       >
//         {type === "success" && <CheckCircle size={20} />}
//         {type === "error" && <AlertCircle size={20} />}
//         <span className="font-medium text-sm">{message}</span>
//         <button onClick={onClose} className="ml-2">
//           <X size={16} />
//         </button>
//       </div>
//     </div>
//   );
// };

// // ============================================
// // MAIN COMPONENT WITH CUSTOM HOOKS
// // ============================================
// export default function KrambicaCart() {
//   const dispatch = useDispatch();
//   const cartItems = useSelector(selectCartItems);
//   const cartTotal = useSelector(selectCartTotal);
//   const router = useRouter();

//   // ============================================
//   // CUSTOM HOOKS FOR ADDRESS MANAGEMENT
//   // ============================================
//   const {
//     isError: isAddressListError,
//     isLoading: isAddressListLoading,
//     data: AddressListData,
//     error: AddressListError,
//     mutate: AddressListMutate,
//   } = useAddressList();

//   const {
//     isError: isAddAddressError,
//     isLoading: isAddingAddress,
//     data: AddAddressData,
//     error: AddAddressError,
//     mutate: AddAddressMutate,
//   } = useAddAddress();

//   const {
//     isError: isOrderError,
//     isLoading: isorderLoading,
//     data: AddOrderData,
//     error: OrderError,
//     mutateAsync: AddOrderMutate,
//   } = useCreateOrder();

//   // ============================================
//   // STATE MANAGEMENT
//   // ============================================
//   const [appliedCoupon, setAppliedCoupon] = useState(null);
//   const [showMobileCheckout, setShowMobileCheckout] = useState(false);
//   const [showAddAddressModal, setShowAddAddressModal] = useState(false);
//   const [selectedAddress, setSelectedAddress] = useState(null);
//   const [snackbar, setSnackbar] = useState({
//     open: false,
//     message: "",
//     type: "info",
//   });

//   const [isCheckoutLoading, setIsCheckoutLoading] = useState(false);
//   // Fetch addresses on mount
//   useEffect(() => {
//     AddressListMutate({
//       emaiL: "kevalkhetani15@gmail.com", // Replace with actual user email from auth
//     });
//   }, []);

//   // Extract addresses from API response
//   const addresses = AddressListData?.data || [];
//   const addressError = isAddressListError
//     ? "Failed to load addresses. Please try again."
//     : null;

//   // Auto-select default address when addresses load
//   useEffect(() => {
//     if (addresses && addresses.length > 0 && !selectedAddress) {
//       const defaultAddr = addresses.find((addr) => addr.isDefault);
//       setSelectedAddress(defaultAddr || addresses[0]);
//     }
//   }, [addresses, selectedAddress]);

//   // Handle successful address addition
//   useEffect(() => {
//     if (AddAddressData?.status === "success" && AddAddressData?.data) {
//       // Refetch address list
//       AddressListMutate({
//         emaiL: "kevalkhetani15@gmail.com",
//       });
//       setShowAddAddressModal(false);
//       showSnackbar("Address added successfully! ✓", "success");
//     }
//   }, [AddAddressData]);

//   // Handle address addition error
//   useEffect(() => {
//     if (isAddAddressError) {
//       showSnackbar("Failed to add address. Please try again.", "error");
//     }
//   }, [isAddAddressError]);

//   const STATIC_USER_ID = "6ed3eac0-77bc-42c0-a10c-50391452f53c";

//   // ============================================
//   // CALCULATIONS
//   // ============================================
//   const subtotal = cartTotal || 0;
//   const discount = appliedCoupon?.discountAmount || 0;
//   const subtotalAfterDiscount = subtotal - discount;
//   const tax = Math.round((subtotalAfterDiscount * 18) / 100);
//   const total = subtotalAfterDiscount + tax;
//   const itemCount =
//     cartItems?.reduce((sum, item) => sum + (item.quantity || 0), 0) || 0;

//   // ============================================
//   // HANDLERS
//   // ============================================
//   const handleRemove = (productId, size) => {
//     showSnackbar("Item removed from cart", "info");
//   };

//   const handleSaveForLater = (productId, size) => {
//     showSnackbar("Item saved for later! ✓", "success");
//   };

//   const handleApplyPromo = async (code) => {
//     try {
//       const result = await couponService.validateCoupon(
//         code,
//         subtotal,
//         STATIC_USER_ID
//       );

//       if (result.success) {
//         setAppliedCoupon(result);
//         showSnackbar(
//           `Coupon "${code}" applied! You saved ₹${result.discountAmount}`,
//           "success"
//         );
//         return {
//           type: "success",
//           text: result.message || "Coupon applied successfully!",
//         };
//       } else {
//         showSnackbar(result.error, "error");
//         return {
//           type: "error",
//           text: result.error,
//         };
//       }
//     } catch (error) {
//       showSnackbar("Failed to apply coupon", "error");
//       return {
//         type: "error",
//         text: "An error occurred. Please try again.",
//       };
//     }
//   };

//   const handleRemoveCoupon = () => {
//     setAppliedCoupon(null);
//     showSnackbar("Coupon removed", "info");
//   };

//   const handleAddNewAddress = async (newAddressData) => {
//     AddAddressMutate({
//       ...newAddressData,
//       user_id: STATIC_USER_ID,
//     });
//   };

//   // const handleCheckout = () => {
//   //   if (!selectedAddress) {
//   //     showSnackbar("Please select a delivery address", "error");
//   //     return;
//   //   }
//   //   showSnackbar("Order placed successfully! ✓", "success");
//   //   console.log("📦 Checkout Data:", {
//   //     items: cartItems,
//   //     subtotal,
//   //     discount,
//   //     tax,
//   //     total,
//   //     coupon: appliedCoupon,
//   //     address: selectedAddress,
//   //   });
//   //   router.push("/checkout");
//   // };

//   const handleCheckout = async () => {
//     if (!selectedAddress) {
//       showSnackbar("Please select a delivery address", "error");
//       return;
//     }

//     if (!cartItems || cartItems.length === 0) {
//       showSnackbar("Your cart is empty", "error");
//       return;
//     }

//     setIsCheckoutLoading(true);

//     try {
//       const formattedItems = cartItems.map((item) => ({
//         product_id: item.productId,
//         variant_id: item.variantId || item.sizeVariantId,
//         quantity: item.quantity,
//       }));

//       const checkoutData = {
//         user_id: 1,
//         address_id: selectedAddress.address_id,
//         discount: discount || 0,
//         items: formattedItems,
//         shippingMethod: "STANDARD",
//         paymentMethod: "CARD",
//         ...(appliedCoupon?.code && { couponCode: appliedCoupon.code }),
//       };

//       // ✅ Wait for the backend order creation response
//       const AddOrderData = await AddOrderMutate(checkoutData);

//       if (!AddOrderData?.data) {
//         throw new Error("Order creation failed. Please try again.");
//       }

//       const razorpayOrderId = AddOrderData.data.razorpay_order_id;
//       const internalOrderId = AddOrderData.data.id;
//       const amount = AddOrderData.data.grandTotal || 0;

//       if (!razorpayOrderId || !internalOrderId || amount <= 0) {
//         throw new Error("Invalid order data received from backend.");
//       }

//       const options = {
//         key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
//         amount: amount,
//         currency: "INR",
//         name: "Your Store Name",
//         description: "Order Payment",
//         image: "/logo.png",
//         order_id: razorpayOrderId,
//         handler: async function (response) {
//           try {
//             const verifyResponse = await fetch(
//               "http://localhost:8020/api/payment/verify",
//               {
//                 method: "POST",
//                 headers: { "Content-Type": "application/json" },
//                 body: JSON.stringify({
//                   razorpay_order_id: response.razorpay_order_id,
//                   razorpay_payment_id: response.razorpay_payment_id,
//                   razorpay_signature: response.razorpay_signature,
//                   orderId: internalOrderId,
//                 }),
//               }
//             );

//             const verifyData = await verifyResponse.json();

//             if (verifyData.status === "success") {
//               showSnackbar("Payment successful! ✓", "success");
//               dispatch(clearCart());
//             } else {
//               showSnackbar("Payment verification failed", "error");
//               console.error("Payment verification failed:", verifyData);
//             }
//           } catch (error) {
//             console.error("Verification error:", error);
//             showSnackbar("Payment verification failed", "error");
//           } finally {
//             setIsCheckoutLoading(false);
//           }
//         },
//         prefill: {
//           name: selectedAddress.fullName,
//           email: selectedAddress.email || "customer@example.com",
//           contact: selectedAddress.phone,
//         },
//         notes: { address: selectedAddress.addressLine1 },
//         theme: { color: "#0d9488" },
//         modal: {
//           ondismiss: function () {
//             setIsCheckoutLoading(false);
//             showSnackbar("Payment cancelled", "info");
//           },
//         },
//       };

//       const razorpayInstance = new window.Razorpay(options);
//       razorpayInstance.on("payment.failed", function (response) {
//         console.error("Payment failed:", response.error);
//         showSnackbar(`Payment failed: ${response.error.description}`, "error");
//         setIsCheckoutLoading(false);
//       });

//       razorpayInstance.open();
//     } catch (error) {
//       console.error("Checkout error:", error);
//       showSnackbar(
//         error?.response?.data?.message ||
//           error?.message ||
//           "Failed to process checkout. Please try again.",
//         "error"
//       );
//       setIsCheckoutLoading(false);
//     }
//   };

//   const showSnackbar = (message, type) => {
//     setSnackbar({ open: true, message, type });
//     setTimeout(() => {
//       setSnackbar({ ...snackbar, open: false });
//     }, 3000);
//   };

//   const handleRetryAddresses = () => {
//     AddressListMutate({
//       emaiL: "kevalkhetani15@gmail.com",
//     });
//   };

//   const summaryData = {
//     subtotal,
//     discount,
//     tax,
//     total,
//     itemCount,
//     onCheckout: handleCheckout,
//   };

//   const gotoProduct = () => {
//     router.push("/shop");
//   };

//   // ============================================
//   // RENDER
//   // ============================================
//   return (
//     <div className="bg-gray-50 min-h-screen py-6 md:py-8 pb-32 md:pb-8">
//       <div className="max-w-7xl mx-auto px-4">
//         <div className="mb-6 md:mb-8">
//           <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-1 md:mb-2">
//             Shopping Cart
//           </h1>
//           <p className="text-sm md:text-base text-gray-600">
//             Review your items and checkout when you're ready
//           </p>
//         </div>

//         <div className="grid lg:grid-cols-3 gap-4 md:gap-6">
//           <div className="lg:col-span-2">
//             {!cartItems || cartItems.length === 0 ? (
//               <div className="bg-white border border-gray-200 rounded-2xl p-8 text-center">
//                 <ShoppingBag size={64} className="mx-auto mb-4 text-gray-300" />
//                 <h3 className="text-xl font-semibold text-gray-500 mb-2">
//                   Your cart is empty
//                 </h3>
//                 <p className="text-gray-400 mb-4">
//                   Add some items to get started
//                 </p>
//                 <button
//                   onClick={gotoProduct}
//                   className="px-6 py-3 bg-gradient-to-r from-teal-700 to-teal-600 text-white rounded-lg font-bold hover:shadow-lg transition-all"
//                 >
//                   Continue Shopping
//                 </button>
//               </div>
//             ) : (
//               <>
//                 {cartItems.map((item) => (
//                   <CartItemCard
//                     key={`${item.productId}-${item.size}`}
//                     item={item}
//                     onRemove={handleRemove}
//                     onSaveForLater={handleSaveForLater}
//                   />
//                 ))}

//                 <div className="hidden md:block">
//                   <PromoCodeSection
//                     onApply={handleApplyPromo}
//                     appliedCoupon={appliedCoupon}
//                     onRemove={handleRemoveCoupon}
//                   />
//                 </div>

//                 <div className="hidden md:block">
//                   <AddressSection
//                     addresses={addresses}
//                     selectedAddress={selectedAddress}
//                     onSelectAddress={setSelectedAddress}
//                     onAddNewClick={() => setShowAddAddressModal(true)}
//                     isLoading={isAddressListLoading}
//                     error={addressError}
//                     onRetry={handleRetryAddresses}
//                   />
//                 </div>
//               </>
//             )}
//           </div>

//           {cartItems && cartItems.length > 0 && (
//             <div className="hidden lg:block">
//               <OrderSummary {...summaryData} appliedCoupon={appliedCoupon} />
//             </div>
//           )}
//         </div>
//       </div>

//       {cartItems && cartItems.length > 0 && (
//         <MobileCheckoutBar
//           total={total}
//           itemCount={itemCount}
//           onOpenSummary={() => setShowMobileCheckout(true)}
//         />
//       )}

//       <MobileCheckoutDialog
//         isOpen={showMobileCheckout}
//         onClose={() => setShowMobileCheckout(false)}
//         summaryData={summaryData}
//         onCheckout={handleCheckout}
//         onApplyPromo={handleApplyPromo}
//         appliedCoupon={appliedCoupon}
//         onRemoveCoupon={handleRemoveCoupon}
//         addresses={addresses}
//         selectedAddress={selectedAddress}
//         onSelectAddress={setSelectedAddress}
//         onAddNewClick={() => setShowAddAddressModal(true)}
//         isLoadingAddresses={isAddressListLoading}
//         addressError={addressError}
//       />

//       <AddAddressModal
//         isOpen={showAddAddressModal}
//         onClose={() => setShowAddAddressModal(false)}
//         onAdd={handleAddNewAddress}
//         isSubmitting={isAddingAddress}
//       />

//       <Snackbar
//         message={snackbar.message}
//         type={snackbar.type}
//         isOpen={snackbar.open}
//         onClose={() => setSnackbar({ ...snackbar, open: false })}
//       />

//       <style jsx>{`
//         @keyframes slide-up {
//           from {
//             transform: translateY(100%);
//           }
//           to {
//             transform: translateY(0);
//           }
//         }

//         @keyframes fade-in {
//           from {
//             opacity: 0;
//             transform: translate(-50%, 10px);
//           }
//           to {
//             opacity: 1;
//             transform: translate(-50%, 0);
//           }
//         }

//         .animate-slide-up {
//           animation: slide-up 0.3s ease-out;
//         }

//         .animate-fade-in {
//           animation: fade-in 0.3s ease-out;
//         }
//       `}</style>
//     </div>
//   );
// }

"use client";
import React, { useEffect, useState, useCallback } from "react";
import {
  Plus,
  Minus,
  Trash2,
  Heart,
  Tag,
  CheckCircle,
  Truck,
  Shield,
  X,
  ShoppingBag,
  Package,
  AlertCircle,
  MapPin,
  ChevronRight,
  Home,
  Building,
  Phone,
  Loader2,
  Sparkles,
  Gift,
  TrendingUp,
} from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import {
  selectCartItems,
  selectCartTotal,
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
  clearCart,
} from "@src/redux/reducers/authSlice";
import { useRouter } from "next/navigation";
import {
  useAddressList,
  useAddAddress,
  useCreateOrder,
} from "@src/hooks/apiHooks";

// ============================================
// PROMOTION SERVICE
// ============================================
const promotionService = {
  BASE_URL: `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL_DUMMY}/api/promotion`,

  async validateCartData(cartData) {
    try {
      const response = await fetch(`${this.BASE_URL}/validate-cart`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(cartData),
      });
      const data = await response.json();
      console.log("validateCartData is heree-----<");
      console.log(data);
      return {
        success: response.ok,
        data: data.data || null,
        error: !response.ok ? data.message : null,
      };
    } catch (error) {
      console.error("Validate cart error:", error);
      return { success: false, error: "Failed to validate cart", data: null };
    }
  },
};

// ============================================
// COUPON SERVICE
// ============================================
const couponService = {
  BASE_URL:
    process.env.NEXT_PUBLIC_BACKEND_BASE_URL_DUMMY ||
    "http://localhost:8020/api",

  async validateCoupon(promoCode, orderValue, userId) {
    try {
      if (!promoCode.trim()) {
        return {
          success: false,
          error: "Please enter a coupon code",
          code: null,
        };
      }

      const code = promoCode.toUpperCase().trim();
      const apiUrl = `${this.BASE_URL}/cupon/${code}/validate`;

      const response = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderValue: orderValue, userId: userId }),
      });

      const data = await response.json();

      if (response.ok && data.status === "success" && data.data) {
        return {
          success: true,
          code: code,
          couponId: data.data.coupon?.id || data.data.couponId,
          type: data.data.coupon?.type || data.data.type,
          value: data.data.coupon?.value || data.data.value,
          discountAmount: data.data.discountAmount || 0,
          finalAmount: data.data.finalAmount || orderValue,
          message: data.message || "Coupon applied successfully",
        };
      }

      const errorMessage = this.getErrorMessage(response.status, data);
      return { success: false, error: errorMessage, code: code };
    } catch (error) {
      return {
        success: false,
        error:
          "Unable to validate coupon. Please check your connection and try again.",
        code: null,
      };
    }
  },

  getErrorMessage(statusCode, data) {
    if (data?.message) return data.message;
    const errorMessages = {
      400: "Invalid coupon code or expired",
      404: "Coupon code not found",
      410: "This coupon has expired",
      500: "Server error. Please try again later",
    };
    return (
      errorMessages[statusCode] ||
      "Invalid or expired coupon code. Please try a different code."
    );
  },
};

// ============================================
// PAYMENT SERVICE (NEW)
// ============================================
const paymentService = {
  BASE_URL:
    process.env.NEXT_PUBLIC_BACKEND_BASE_URL_DUMMY || "http://localhost:8020",

  async verifyPayment(paymentData) {
    try {
      const response = await fetch(`${this.BASE_URL}/api/payment/verify`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(paymentData),
      });

      if (!response.ok) {
        throw new Error(`Payment verification failed: ${response.status}`);
      }

      const data = await response.json();
      return {
        success: data.status === "success",
        data: data.data || null,
        message: data.message || "Payment verified successfully",
      };
    } catch (error) {
      console.error("Payment verification error:", error);
      return {
        success: false,
        error: error.message || "Failed to verify payment",
      };
    }
  },

  async verifyFreeOrder(orderData) {
    try {
      const response = await fetch(
        `${this.BASE_URL}/api/orders/verify-free-order`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(orderData),
        }
      );

      if (!response.ok) {
        throw new Error(`Free order verification failed: ${response.status}`);
      }

      const data = await response.json();
      return {
        success: data.status === "success",
        data: data.data || null,
        message: data.message || "Free order verified successfully",
      };
    } catch (error) {
      console.error("Free order verification error:", error);
      return {
        success: false,
        error: error.message || "Failed to verify free order",
      };
    }
  },
};

// ============================================
// HOOKS
// ============================================
const useDebounce = (value, delay = 500) => {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);
  return debouncedValue;
};

const usePromotions = (cartItems, userId) => {
  const [eligiblePromotions, setEligiblePromotions] = useState([]);
  const [appliedPromotions, setAppliedPromotions] = useState([]);
  const [freeProducts, setFreeProducts] = useState([]);
  const [isValidating, setIsValidating] = useState(false);

  const debouncedCartItems = useDebounce(cartItems, 500);

  const cartTotal = debouncedCartItems.reduce(
    (sum, item) => sum + (item.price || 0) * (item.quantity || 0),
    0
  );

  const formatCartData = useCallback(() => {
    return {
      user_id: userId,
      cartTotal,
      items: debouncedCartItems.map((item) => ({
        product_id: item.product_id,
        quantity: item.quantity,
        price: item.price,
      })),
    };
  }, [debouncedCartItems, cartTotal, userId]);

  useEffect(() => {
    const validateCart = async () => {
      if (!debouncedCartItems.length) {
        setEligiblePromotions([]);
        setAppliedPromotions([]);
        setFreeProducts([]);
        return;
      }

      setIsValidating(true);
      try {
        const cartData = formatCartData();
        const result = await promotionService.validateCartData(cartData);
        console.log("cart data result is here ------>");
        console.log(result);
        console.log("result.data.eligiblePromotions---->");
        console.log(result.data.eligiblePromotions);

        if (result.success && result.data) {
          setEligiblePromotions(result.data || []);
          setAppliedPromotions(result.data || []);
          setFreeProducts(result.data.freeProducts || []);
        }
      } catch (err) {
        console.error("Promotion validation error:", err);
      } finally {
        setIsValidating(false);
      }
    };

    validateCart();
  }, [debouncedCartItems, formatCartData]);

  const totalDiscount = appliedPromotions.reduce(
    (sum, promo) => sum + (promo.discount?.amount || 0),
    0
  );

  return {
    eligiblePromotions,
    appliedPromotions,
    freeProducts,
    isValidating,
    totalDiscount,
  };
};

// ============================================
// ADD ADDRESS MODAL COMPONENT
// ============================================
const AddAddressModal = ({ isOpen, onClose, onSubmit, isSubmitting }) => {
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    zipCode: "",
    addressType: "home",
    isDefault: false,
  });

  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.fullName.trim()) newErrors.fullName = "Full name is required";
    if (!formData.phone.trim()) newErrors.phone = "Phone number is required";
    else if (!/^\d{10}$/.test(formData.phone))
      newErrors.phone = "Enter valid 10-digit phone number";
    if (!formData.addressLine1.trim())
      newErrors.addressLine1 = "Address is required";
    if (!formData.city.trim()) newErrors.city = "City is required";
    if (!formData.state.trim()) newErrors.state = "State is required";
    if (!formData.zipCode.trim()) newErrors.zipCode = "ZIP code is required";
    else if (!/^\d{6}$/.test(formData.zipCode))
      newErrors.zipCode = "Enter valid 6-digit ZIP code";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  const handleClose = () => {
    setFormData({
      fullName: "",
      phone: "",
      addressLine1: "",
      addressLine2: "",
      city: "",
      state: "",
      zipCode: "",
      addressType: "home",
      isDefault: false,
    });
    setErrors({});
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black bg-opacity-50"
        onClick={handleClose}
      />
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 p-5 flex items-center justify-between z-10 rounded-t-2xl">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-teal-100 rounded-lg flex items-center justify-center">
              <MapPin size={20} className="text-teal-700" />
            </div>
            <h3 className="text-xl font-bold text-gray-900">Add New Address</h3>
          </div>
          <button
            onClick={handleClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-all"
          >
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Address Type
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() =>
                  setFormData({ ...formData, addressType: "home" })
                }
                className={`p-4 rounded-xl border-2 transition-all flex items-center gap-3 ${
                  formData.addressType === "home"
                    ? "border-teal-700 bg-teal-50"
                    : "border-gray-200 hover:border-gray-300"
                }`}
              >
                <Home
                  size={20}
                  className={
                    formData.addressType === "home"
                      ? "text-teal-700"
                      : "text-gray-600"
                  }
                />
                <span className="font-semibold text-gray-900">Home</span>
              </button>
              <button
                type="button"
                onClick={() =>
                  setFormData({ ...formData, addressType: "office" })
                }
                className={`p-4 rounded-xl border-2 transition-all flex items-center gap-3 ${
                  formData.addressType === "office"
                    ? "border-teal-700 bg-teal-50"
                    : "border-gray-200 hover:border-gray-300"
                }`}
              >
                <Building
                  size={20}
                  className={
                    formData.addressType === "office"
                      ? "text-teal-700"
                      : "text-gray-600"
                  }
                />
                <span className="font-semibold text-gray-900">Office</span>
              </button>
            </div>
          </div>

          <div>
            <label
              htmlFor="fullName"
              className="block text-sm font-semibold text-gray-700 mb-2"
            >
              Full Name *
            </label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              value={formData.fullName}
              onChange={handleInputChange}
              className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-100 transition-all ${
                errors.fullName
                  ? "border-red-500"
                  : "border-gray-300 focus:border-teal-700"
              }`}
              placeholder="Enter your full name"
            />
            {errors.fullName && (
              <p className="text-red-500 text-xs mt-1">{errors.fullName}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="phone"
              className="block text-sm font-semibold text-gray-700 mb-2"
            >
              Phone Number *
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-100 transition-all ${
                errors.phone
                  ? "border-red-500"
                  : "border-gray-300 focus:border-teal-700"
              }`}
              placeholder="10-digit mobile number"
              maxLength="10"
            />
            {errors.phone && (
              <p className="text-red-500 text-xs mt-1">{errors.phone}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="addressLine1"
              className="block text-sm font-semibold text-gray-700 mb-2"
            >
              Address Line 1 *
            </label>
            <input
              type="text"
              id="addressLine1"
              name="addressLine1"
              value={formData.addressLine1}
              onChange={handleInputChange}
              className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-100 transition-all ${
                errors.addressLine1
                  ? "border-red-500"
                  : "border-gray-300 focus:border-teal-700"
              }`}
              placeholder="House No, Building Name, Street"
            />
            {errors.addressLine1 && (
              <p className="text-red-500 text-xs mt-1">{errors.addressLine1}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="addressLine2"
              className="block text-sm font-semibold text-gray-700 mb-2"
            >
              Address Line 2 (Optional)
            </label>
            <input
              type="text"
              id="addressLine2"
              name="addressLine2"
              value={formData.addressLine2}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:border-teal-700 focus:ring-2 focus:ring-teal-100 transition-all"
              placeholder="Landmark, Area"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label
                htmlFor="city"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                City *
              </label>
              <input
                type="text"
                id="city"
                name="city"
                value={formData.city}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-100 transition-all ${
                  errors.city
                    ? "border-red-500"
                    : "border-gray-300 focus:border-teal-700"
                }`}
                placeholder="City"
              />
              {errors.city && (
                <p className="text-red-500 text-xs mt-1">{errors.city}</p>
              )}
            </div>

            <div>
              <label
                htmlFor="state"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                State *
              </label>
              <input
                type="text"
                id="state"
                name="state"
                value={formData.state}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-100 transition-all ${
                  errors.state
                    ? "border-red-500"
                    : "border-gray-300 focus:border-teal-700"
                }`}
                placeholder="State"
              />
              {errors.state && (
                <p className="text-red-500 text-xs mt-1">{errors.state}</p>
              )}
            </div>

            <div>
              <label
                htmlFor="zipCode"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                ZIP Code *
              </label>
              <input
                type="text"
                id="zipCode"
                name="zipCode"
                value={formData.zipCode}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-100 transition-all ${
                  errors.zipCode
                    ? "border-red-500"
                    : "border-gray-300 focus:border-teal-700"
                }`}
                placeholder="6-digit PIN"
                maxLength="6"
              />
              {errors.zipCode && (
                <p className="text-red-500 text-xs mt-1">{errors.zipCode}</p>
              )}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="isDefault"
              name="isDefault"
              checked={formData.isDefault}
              onChange={handleInputChange}
              className="w-5 h-5 text-teal-700 border-gray-300 rounded focus:ring-teal-700"
            />
            <label
              htmlFor="isDefault"
              className="text-sm font-medium text-gray-700"
            >
              Set as default delivery address
            </label>
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={handleClose}
              className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl font-bold hover:bg-gray-50 transition-all"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 px-6 py-3 bg-gradient-to-r from-teal-700 to-teal-600 text-white rounded-xl font-bold hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <Loader2 size={20} className="animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <CheckCircle size={20} />
                  Save Address
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// ============================================
// OTHER COMPONENTS (PromotionBanner, FreeProductBanner, etc.)
// ============================================
const PromotionBanner = ({
  eligiblePromotions = [],
  appliedPromotions = [],
  isValidating,
}) => {
  if (isValidating) {
    return (
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4 border border-blue-200 animate-pulse mb-4">
        <div className="flex items-center gap-2">
          <Loader2 size={18} className="text-blue-600 animate-spin" />
          <span className="text-sm font-medium text-blue-700">
            Checking for available promotions...
          </span>
        </div>
      </div>
    );
  }
  console.log("appliedPromotions --------");
  console.log(appliedPromotions);
  if (!appliedPromotions.length && !eligiblePromotions.length) return null;

  return (
    <div className="space-y-3 mb-4">
      {appliedPromotions.map((promo, index) => (
        <div
          key={index}
          className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-4 border-2 border-green-300 shadow-sm"
        >
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center flex-shrink-0">
              <CheckCircle size={20} className="text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <h4 className="font-bold text-gray-900 text-sm">
                  ✓ Promotion Applied
                </h4>
                <span className="px-1.5 py-0.5 bg-green-600 text-white text-xs font-bold rounded uppercase">
                  Active
                </span>
              </div>
              <p className="text-sm text-gray-700 font-semibold mb-1">
                {promo.name || `Promotion #${promo.id}`}
              </p>
              {promo.description && (
                <p className="text-xs text-gray-600 mb-1">
                  {promo.description}
                </p>
              )}
              <div className="flex items-center gap-3 flex-wrap">
                {promo.discount?.amount > 0 && (
                  <p className="text-xs text-gray-700 font-medium">
                    💰 You save{" "}
                    <span className="font-bold text-green-600">
                      ₹{promo.discount.amount.toLocaleString()}
                    </span>
                  </p>
                )}
                {promo.freeProducts && promo.freeProducts.length > 0 && (
                  <p className="text-xs text-emerald-700 font-bold flex items-center gap-1">
                    <Gift size={12} />
                    {promo.freeProducts.length} free product(s)
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      ))}

      {eligiblePromotions.map((promo) => (
        <div
          key={promo.id}
          className="bg-gradient-to-r from-amber-50 via-yellow-50 to-orange-50 rounded-xl p-4 border-2 border-yellow-300 shadow-sm"
        >
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-lg flex items-center justify-center flex-shrink-0">
              <Sparkles size={20} className="text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <h4 className="font-bold text-gray-900 text-sm">
                  {promo.name}
                </h4>
                <span className="px-1.5 py-0.5 bg-gradient-to-r from-yellow-400 to-orange-400 text-white text-xs font-bold rounded uppercase">
                  Available
                </span>
              </div>
              {promo.description && (
                <p className="text-xs text-gray-700 mb-1">
                  {promo.description}
                </p>
              )}
              {promo.progressMessage && (
                <div className="flex items-center gap-1 mb-1">
                  <TrendingUp size={12} className="text-amber-600" />
                  <p className="text-xs text-amber-700 font-bold">
                    {promo.progressMessage}
                  </p>
                </div>
              )}
            </div>
            <Tag size={16} className="text-yellow-600 flex-shrink-0" />
          </div>
        </div>
      ))}
    </div>
  );
};

const FreeProductBanner = ({ appliedPromotions, onNavigateToFreeProducts }) => {
  const freePromotion = appliedPromotions?.find(
    (promo) => promo.isEligible && promo.type === "BUY_X_GET_Y_FREE"
  );

  if (!freePromotion) return null;

  return (
    <div className="bg-gradient-to-r from-emerald-500 to-teal-600 rounded-xl p-4 shadow-lg mb-4 border-2 border-emerald-300">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-3 flex-1 w-full">
          <div className="bg-white rounded-full p-3 animate-pulse shrink-0">
            <CheckCircle size={24} className="text-emerald-600" />
          </div>
          <div className="flex-1">
            <h3 className="text-white font-extrabold text-lg mb-1">
              🎉 Congratulations!
            </h3>

            <p className="text-emerald-50 text-sm font-semibold">
              {freePromotion.message ||
                `You've earned ${freePromotion.freeItemsEarned} free item(s)!`}
            </p>

            <p className="text-emerald-100 text-xs mt-1">
              {freePromotion.promotionName}
            </p>
          </div>
        </div>

        <button
          onClick={onNavigateToFreeProducts}
          className="bg-white text-emerald-600 px-5 py-3 rounded-lg font-bold text-sm
                     hover:bg-emerald-50 hover:scale-105 transition-all shadow-md
                     flex items-center gap-2 whitespace-nowrap w-full md:w-auto justify-center"
        >
          <Tag size={16} />
          Claim Free Product
          <ChevronRight size={16} />
        </button>
      </div>

      <div className="mt-3 pt-3 border-t border-emerald-400 flex flex-wrap gap-2 text-xs text-emerald-50">
        <span className="bg-emerald-600 px-2 py-1 rounded">
          ✓ {freePromotion.details?.purchasedQuantity} items purchased
        </span>
        <span className="bg-emerald-600 px-2 py-1 rounded">
          ✓ {freePromotion.freeItemsEarned} free item(s) earned
        </span>
      </div>
    </div>
  );
};

const CartItemCard = ({ item, onRemove, onSaveForLater }) => {
  const [saved, setSaved] = useState(false);
  const dispatch = useDispatch();

  const discount = item.originalPrice
    ? Math.round(((item.originalPrice - item.price) / item.originalPrice) * 100)
    : 0;

  const handleIncrease = () => {
    dispatch(increaseQuantity({ productId: item.productId, size: item.size }));
  };

  const handleDecrease = () => {
    dispatch(decreaseQuantity({ productId: item.productId, size: item.size }));
  };

  const handleRemoveItem = () => {
    dispatch(removeFromCart({ productId: item.productId, size: item.size }));
    onRemove(item.productId, item.size);
  };

  return (
    <div className="bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-all border border-gray-100 mb-4">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-shrink-0 w-full sm:w-32">
          <img
            src={item.image}
            alt={item.productName}
            className="w-full h-32 rounded-lg object-cover"
          />
          {item.availableStock > 0 && (
            <div className="absolute top-1.5 right-1.5 bg-emerald-500 text-white px-2 py-0.5 rounded-full text-xs font-bold flex items-center gap-1">
              <CheckCircle size={10} />
              In Stock
            </div>
          )}
          {discount > 0 && (
            <div className="absolute top-1.5 left-1.5 bg-red-500 text-white px-2 py-0.5 rounded-full text-xs font-bold">
              {discount}% OFF
            </div>
          )}
        </div>

        <div className="flex-1 flex flex-col justify-between min-w-0">
          <div className="space-y-2">
            <h3 className="text-base font-bold text-gray-900 truncate">
              {item.productName}
            </h3>
            <div className="flex flex-wrap gap-2 text-xs">
              <span className="px-2 py-1 bg-gray-100 rounded-lg text-gray-700 font-medium">
                Size: {item.size}
              </span>
              <span className="px-2 py-1 bg-gray-100 rounded-lg text-gray-700 font-medium flex items-center gap-1">
                <span
                  className="w-3 h-3 rounded-lg border border-gray-300"
                  style={{ backgroundColor: item.colorCode }}
                ></span>
                {item.colorName}
              </span>
            </div>
            <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
              <div className="flex items-center gap-2 bg-gray-50 rounded-lg p-0.5 border border-gray-200">
                <button
                  onClick={handleDecrease}
                  disabled={item.quantity <= 1}
                  className="w-8 h-8 bg-white rounded-md hover:bg-teal-700 hover:text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                >
                  <Minus size={16} />
                </button>
                <span className="w-8 text-center text-base font-bold text-gray-900">
                  {item.quantity}
                </span>
                <button
                  onClick={handleIncrease}
                  disabled={item.quantity >= item.availableStock}
                  className="w-8 h-8 bg-white rounded-md hover:bg-teal-700 hover:text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                >
                  <Plus size={16} />
                </button>
              </div>

              <div className="text-right">
                <div className="text-xl font-bold text-teal-700">
                  ₹{item.totalPrice.toLocaleString()}
                </div>
                <p className="text-xs text-gray-600">
                  ₹{item.price.toFixed(2)} each
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-100 mt-3 pt-3 flex flex-wrap gap-2">
        <button
          onClick={() => {
            setSaved(!saved);
            if (!saved) onSaveForLater(item.productId, item.size);
          }}
          className={`flex items-center gap-1.5 px-3 py-1.5 text-sm font-semibold rounded-lg transition-all ${
            saved
              ? "text-red-500 hover:bg-red-50"
              : "text-teal-700 hover:bg-teal-50"
          }`}
        >
          <Heart size={16} fill={saved ? "currentColor" : "none"} />
          {saved ? "Saved" : "Save"}
        </button>
        <button
          onClick={handleRemoveItem}
          className="flex items-center gap-1.5 px-3 py-1.5 text-sm text-red-500 font-semibold hover:bg-red-50 rounded-lg transition-all ml-auto"
        >
          <Trash2 size={16} />
          Remove
        </button>
      </div>
    </div>
  );
};

const AddressCard = ({ address, isSelected, onSelect, isDefault = false }) => {
  const addressType = address.addressType?.toLowerCase() || "home";
  const typeIcon =
    addressType === "home" ? <Home size={18} /> : <Building size={18} />;
  const typeBgColor = addressType === "home" ? "bg-blue-100" : "bg-purple-100";
  const typeTextColor =
    addressType === "home" ? "text-blue-700" : "text-purple-700";

  return (
    <div
      onClick={onSelect}
      className={`p-4 rounded-xl border-2 cursor-pointer transition-all transform hover:scale-[1.01] ${
        isSelected
          ? "border-teal-700 bg-teal-50 scale-[1.01]"
          : "border-gray-200 bg-white hover:border-gray-300"
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-3">
            <div className={`p-2 rounded-lg ${typeBgColor}`}>
              <div className={typeTextColor}>{typeIcon}</div>
            </div>
            <div>
              <h3 className="font-bold text-gray-900 capitalize text-sm">
                {addressType}
              </h3>
              {isDefault && (
                <span className="text-xs bg-emerald-100 text-emerald-700 font-bold rounded px-1.5">
                  Default
                </span>
              )}
            </div>
          </div>
          <p className="font-semibold text-gray-900 text-sm mb-1">
            {address.fullName}
          </p>
          <p className="text-xs text-gray-600 mb-1 line-clamp-2">
            {address.addressLine1}
            {address.addressLine2 && `, ${address.addressLine2}`}
          </p>
          <p className="text-xs text-gray-600 mb-1.5">
            {address.city}, {address.state} - {address.zipCode}
          </p>
          <p className="text-xs text-gray-600 flex items-center gap-1">
            <Phone size={12} /> {address.phone}
          </p>
        </div>
        {isSelected && (
          <div className="flex-shrink-0 pt-1">
            <div className="w-6 h-6 bg-teal-700 rounded-full flex items-center justify-center">
              <CheckCircle
                size={20}
                className="text-white"
                fill="currentColor"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const PromoCodeSection = ({ onApply, appliedCoupon, onRemove }) => {
  const [promoCode, setPromoCode] = useState("");
  const [message, setMessage] = useState({ type: "", text: "" });
  const [isLoading, setIsLoading] = useState(false);

  const handleApply = async () => {
    if (!promoCode.trim()) {
      setMessage({ type: "error", text: "Please enter a coupon code" });
      return;
    }
    setIsLoading(true);
    setMessage({ type: "", text: "" });
    const result = await onApply(promoCode.toUpperCase());
    setMessage(result);
    if (result.type === "success") setPromoCode("");
    setIsLoading(false);
  };

  if (appliedCoupon) {
    return (
      <div className="bg-white rounded-xl p-4 shadow-sm border-2 border-green-300 mb-4 bg-gradient-to-br from-green-50 to-emerald-50">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center flex-shrink-0">
              <CheckCircle size={20} className="text-white" />
            </div>
            <div className="flex-1">
              <h4 className="font-bold text-gray-900 text-base">
                ✓ Coupon Applied
              </h4>
              <div className="mt-2 space-y-1">
                <p className="text-sm text-gray-700">
                  <span className="font-bold text-green-700">
                    {appliedCoupon.code}
                  </span>
                  <span className="mx-2">•</span>
                  <span className="text-gray-600">
                    {appliedCoupon.type === "FIXED"
                      ? `₹${appliedCoupon.value} off`
                      : `${appliedCoupon.value}% off`}
                  </span>
                </p>
                <p className="text-xs text-gray-600">
                  You save{" "}
                  <span className="font-bold text-green-600">
                    ₹{appliedCoupon.discountAmount?.toLocaleString() || "0"}
                  </span>
                </p>
              </div>
            </div>
          </div>
          <button
            onClick={() => {
              setPromoCode("");
              setMessage({ type: "", text: "" });
              onRemove();
            }}
            className="text-red-500 hover:bg-red-50 rounded-lg p-2 transition-all flex-shrink-0"
          >
            <X size={20} />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 mb-4">
      <h4 className="text-base font-bold text-gray-800 mb-3 flex items-center gap-2">
        <div className="w-7 h-7 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-lg flex items-center justify-center">
          <Tag size={16} className="text-white" />
        </div>
        Have a Coupon Code?
      </h4>
      <div className="flex flex-col sm:flex-row gap-2 mb-3">
        <input
          type="text"
          placeholder="Enter coupon code"
          value={promoCode}
          onChange={(e) => setPromoCode(e.target.value.toUpperCase())}
          onKeyPress={(e) => e.key === "Enter" && !isLoading && handleApply()}
          disabled={isLoading}
          className="flex-1 px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-teal-700 focus:ring-2 focus:ring-teal-100 transition-all uppercase font-medium disabled:bg-gray-50"
          maxLength={20}
        />
        <button
          onClick={handleApply}
          disabled={isLoading || !promoCode.trim()}
          className="px-6 py-2.5 bg-gradient-to-r from-teal-700 to-teal-600 text-white rounded-lg font-bold text-sm hover:shadow-lg transition-all whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 min-w-[120px]"
        >
          {isLoading ? (
            <>
              <Loader2 size={16} className="animate-spin" />
              <span>Validating...</span>
            </>
          ) : (
            <>
              <CheckCircle size={16} />
              <span>Apply</span>
            </>
          )}
        </button>
      </div>
      {message.text && (
        <div
          className={`p-3 rounded-lg text-sm flex items-start gap-2 border ${
            message.type === "success"
              ? "bg-green-50 text-green-800 border-green-200"
              : "bg-red-50 text-red-800 border-red-200"
          }`}
        >
          {message.type === "success" ? (
            <CheckCircle size={16} className="flex-shrink-0 mt-0.5" />
          ) : (
            <AlertCircle size={16} className="flex-shrink-0 mt-0.5" />
          )}
          <span className="flex-1">{message.text}</span>
        </div>
      )}
      <p className="text-xs text-gray-500 mt-3 flex items-center gap-1.5">
        <Tag size={12} />
        Enter a valid coupon code to get instant discount on your order
      </p>
    </div>
  );
};

const AddressLoadingSkeleton = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      {[1, 2].map((i) => (
        <div
          key={i}
          className="p-4 rounded-xl border-2 border-gray-200 bg-white animate-pulse"
        >
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 bg-gray-200 rounded-lg"></div>
            <div className="flex-1 space-y-2">
              <div className="h-4 bg-gray-200 rounded w-24"></div>
              <div className="h-3 bg-gray-200 rounded w-32"></div>
              <div className="h-3 bg-gray-200 rounded w-full"></div>
              <div className="h-3 bg-gray-200 rounded w-3/4"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

const AddressSection = ({
  addresses,
  selectedAddress,
  onSelectAddress,
  onAddNewClick,
  isLoading,
  error,
  onRetry,
}) => {
  return (
    <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 mb-4">
      <h4 className="text-base font-bold text-gray-800 mb-4 flex items-center gap-2">
        <div className="w-8 h-8 bg-teal-100 rounded-lg flex items-center justify-center">
          <MapPin size={18} className="text-teal-700" />
        </div>
        Delivery Address
      </h4>

      {isLoading ? (
        <AddressLoadingSkeleton />
      ) : error ? (
        <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-center">
          <AlertCircle size={32} className="mx-auto mb-2 text-red-500" />
          <p className="text-sm text-red-700 font-medium mb-3">{error}</p>
          <button
            onClick={onRetry}
            className="px-4 py-2 bg-red-600 text-white rounded-lg text-sm font-bold hover:bg-red-700 transition-all"
          >
            Retry
          </button>
        </div>
      ) : !addresses || addresses.length === 0 ? (
        <div className="bg-gray-50 border-2 border-dashed border-gray-300 rounded-xl p-6 text-center">
          <MapPin size={48} className="mx-auto mb-3 text-gray-400" />
          <h5 className="text-base font-bold text-gray-700 mb-2">
            No Address Found
          </h5>
          <p className="text-sm text-gray-600 mb-4">
            Add your first delivery address to continue
          </p>
          <button
            onClick={onAddNewClick}
            className="px-5 py-2.5 bg-gradient-to-r from-teal-700 to-teal-600 text-white rounded-lg font-bold text-sm hover:shadow-lg transition-all flex items-center justify-center gap-2 mx-auto"
          >
            <Plus size={18} />
            Add New Address
          </button>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
            {addresses.map((addr) => (
              <AddressCard
                key={addr.id}
                address={addr}
                isSelected={selectedAddress?.id === addr.id}
                onSelect={() => onSelectAddress(addr)}
                isDefault={addr.isDefault}
              />
            ))}
          </div>

          <button
            onClick={onAddNewClick}
            className="w-full p-3 rounded-xl border-2 border-dashed border-teal-700 text-center font-semibold text-teal-700 hover:bg-teal-50 transition-all flex items-center justify-center gap-2"
          >
            <Plus size={20} />
            Add New Address
          </button>

          {selectedAddress && (
            <div className="mt-4 p-4 bg-teal-50 rounded-xl border-2 border-teal-700">
              <p className="text-xs font-semibold text-teal-700 mb-2 flex items-center gap-1">
                <CheckCircle size={14} /> Delivery To
              </p>
              <p className="font-semibold text-gray-900 text-sm mb-1">
                {selectedAddress.fullName}
              </p>
              <p className="text-xs text-gray-600">
                {selectedAddress.addressLine1}
                {selectedAddress.addressLine2 &&
                  `, ${selectedAddress.addressLine2}`}
              </p>
            </div>
          )}
        </>
      )}
    </div>
  );
};

const OrderSummary = ({
  subtotal,
  discount,
  promotionDiscount = 0,
  tax,
  total,
  itemCount,
  onCheckout,
  appliedCoupon,
  appliedPromotions = [],
  isLoading = false,
}) => {
  const totalSavings = discount + promotionDiscount;

  return (
    <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 sticky top-24">
      <h2 className="text-xl font-bold text-gray-900 mb-5 flex items-center gap-2">
        <Package size={24} className="text-teal-700" />
        Order Summary
      </h2>
      <div className="space-y-3 mb-5">
        <div className="flex justify-between py-2 border-b border-gray-100">
          <span className="text-sm text-gray-600 font-medium">
            Subtotal ({itemCount} items)
          </span>
          <span className="text-base font-bold text-gray-900">
            ₹{subtotal.toLocaleString()}
          </span>
        </div>
        {discount > 0 && appliedCoupon && (
          <div className="flex justify-between py-2 px-3 bg-green-50 rounded-lg border border-green-200">
            <div className="flex items-center gap-1.5">
              <span className="text-sm text-gray-600 font-medium">
                Coupon Discount
              </span>
              <span className="px-2 py-0.5 bg-green-500 text-white text-xs font-bold rounded">
                {appliedCoupon.code}
              </span>
            </div>
            <span className="text-base font-bold text-green-600">
              -₹{discount.toLocaleString()}
            </span>
          </div>
        )}
        {promotionDiscount > 0 && appliedPromotions.length > 0 && (
          <div className="flex justify-between py-2 px-3 bg-blue-50 rounded-lg border border-blue-200">
            <div className="flex items-center gap-1.5">
              <Sparkles size={14} className="text-blue-600" />
              <span className="text-sm text-gray-600 font-medium">
                Promotion Discount
              </span>
              <span className="px-2 py-0.5 bg-blue-500 text-white text-xs font-bold rounded">
                {appliedPromotions.length}
              </span>
            </div>
            <span className="text-base font-bold text-blue-600">
              -₹{promotionDiscount.toLocaleString()}
            </span>
          </div>
        )}
        {totalSavings > 0 && (
          <div className="flex justify-between py-2 px-3 bg-gradient-to-r from-emerald-50 to-green-50 rounded-lg border-2 border-emerald-300">
            <span className="text-sm font-bold text-gray-900 flex items-center gap-1.5">
              <CheckCircle size={14} className="text-emerald-600" />
              Total Savings
            </span>
            <span className="text-base font-bold text-emerald-600">
              -₹{totalSavings.toLocaleString()}
            </span>
          </div>
        )}
        <div className="flex justify-between py-2 border-b border-gray-100">
          <div className="flex items-center gap-1.5">
            <span className="text-sm text-gray-600 font-medium">Shipping</span>
            <span className="px-1.5 py-0.5 bg-emerald-100 text-emerald-600 text-xs font-bold rounded">
              FREE
            </span>
          </div>
          <span className="text-base font-bold text-emerald-600">FREE</span>
        </div>
        <div className="flex justify-between py-2">
          <span className="text-sm text-gray-600 font-medium">
            Tax (GST 18%)
          </span>
          <span className="text-base font-bold text-gray-900">
            ₹{tax.toLocaleString()}
          </span>
        </div>
      </div>
      <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl p-4 mb-4 border-2 border-emerald-200">
        <div className="flex justify-between items-center">
          <span className="text-base font-bold text-gray-900">
            Total Amount
          </span>
          <div className="text-right">
            <span className="text-3xl font-extrabold text-teal-700">
              ₹{total.toLocaleString()}
            </span>
            <p className="text-xs text-gray-600 mt-0.5">
              Inclusive of all taxes
            </p>
          </div>
        </div>
      </div>
      <button
        onClick={onCheckout}
        disabled={isLoading}
        className="w-full bg-gradient-to-r from-teal-700 to-teal-600 text-white py-3.5 rounded-xl font-bold text-base shadow-md hover:shadow-lg hover:scale-[1.02] transition-all flex items-center justify-center gap-2 mb-2 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? (
          <>
            <Loader2 size={20} className="animate-spin" />
            Processing...
          </>
        ) : (
          <>
            <CheckCircle size={20} />
            Secure Checkout
          </>
        )}
      </button>
      <div className="mt-5 pt-4 border-t border-gray-200 space-y-3">
        <div className="flex items-start gap-2 text-emerald-600">
          <Shield size={20} className="flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold text-sm">100% Secure Payments</p>
            <p className="text-xs text-gray-600">SSL Encrypted Transactions</p>
          </div>
        </div>
        <div className="flex items-start gap-2 text-blue-600">
          <Truck size={20} className="flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold text-sm">Free Shipping</p>
            <p className="text-xs text-gray-600">On orders above ₹6,225</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const MobileCheckoutBar = ({ total, itemCount, onOpenSummary }) => {
  return (
    <div className="fixed bottom-18 left-0 right-0 bg-white shadow-lg z-50 md:hidden border-t border-gray-200">
      <div className="p-3 flex items-center justify-between gap-3">
        <div className="flex-1">
          <p className="text-xs text-gray-600 font-medium">Total Amount</p>
          <div className="flex items-baseline gap-1.5">
            <span className="text-xl font-extrabold text-teal-700">
              ₹{total.toLocaleString()}
            </span>
            <span className="text-xs text-gray-500 font-medium">
              ({itemCount} items)
            </span>
          </div>
          <p className="text-xs text-emerald-600 font-semibold">
            ✓ Incl. taxes + FREE shipping
          </p>
        </div>
        <button
          onClick={onOpenSummary}
          className="px-5 py-3 bg-gradient-to-r from-teal-700 to-teal-600 text-white rounded-lg font-bold text-sm shadow-lg whitespace-nowrap flex items-center gap-2 hover:scale-[1.02] transition-all"
        >
          <CheckCircle size={20} />
          Proceed
        </button>
      </div>
    </div>
  );
};

const MobileTwoStepCheckout = ({
  isOpen,
  onClose,
  onApplyCoupon,
  appliedCoupon,
  onRemoveCoupon,
  subtotal,
  discount,
  promotionDiscount,
  tax,
  total,
  itemCount,
  appliedPromotions,
  eligiblePromotions,
  isPromotionValidating,
  onNavigateToFreeProducts,
  addresses,
  selectedAddress,
  onSelectAddress,
  onAddNewClick,
  isAddressLoading,
  addressError,
  onRetryAddress,
  onCheckout,
  isCheckoutLoading,
}) => {
  const [currentStep, setCurrentStep] = useState(1);

  if (!isOpen) return null;

  const handleNextStep = () => {
    if (currentStep === 1) {
      setCurrentStep(2);
    }
  };

  const handleBackStep = () => {
    if (currentStep === 2) {
      setCurrentStep(1);
    }
  };

  const handleClose = () => {
    setCurrentStep(1);
    onClose();
  };

  const handleCheckoutClick = async () => {
    await onCheckout();
    setCurrentStep(1);
  };

  const freePromotion = appliedPromotions?.find(
    (promo) => promo.isEligible && promo.type === "BUY_X_GET_Y_FREE"
  );

  return (
    <div className="fixed inset-0 z-[100] md:hidden">
      <div
        className="absolute inset-0 bg-black bg-opacity-50"
        onClick={handleClose}
      />
      <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-2xl max-h-[90vh] overflow-y-auto animate-slide-up">
        <div className="sticky top-0 bg-white border-b border-gray-200 p-4 flex items-center justify-between z-10">
          <div className="flex items-center gap-3">
            {currentStep === 2 && (
              <button
                onClick={handleBackStep}
                className="p-1 hover:bg-gray-100 rounded-lg transition-all"
              >
                <ChevronRight size={24} className="rotate-180" />
              </button>
            )}
            <div>
              <h3 className="text-lg font-bold text-gray-900">
                {currentStep === 1 ? "Review Order" : "Delivery Address"}
              </h3>
              <p className="text-xs text-gray-500">Step {currentStep} of 2</p>
            </div>
          </div>
          <button
            onClick={handleClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-all"
          >
            <X size={24} />
          </button>
        </div>

        <div className="px-4 py-3 bg-gray-50">
          <div className="flex items-center justify-between mb-2">
            <span
              className={`text-xs font-semibold ${
                currentStep >= 1 ? "text-teal-700" : "text-gray-400"
              }`}
            >
              Review Order
            </span>
            <span
              className={`text-xs font-semibold ${
                currentStep >= 2 ? "text-teal-700" : "text-gray-400"
              }`}
            >
              Delivery Address
            </span>
          </div>
          <div className="relative h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="absolute top-0 left-0 h-full bg-gradient-to-r from-teal-700 to-teal-600 transition-all duration-300"
              style={{ width: `${(currentStep / 2) * 100}%` }}
            />
          </div>
        </div>

        <div className="p-4 pb-24">
          {currentStep === 1 ? (
            <div className="space-y-4">
              {freePromotion && (
                <div className="bg-gradient-to-r from-emerald-500 to-teal-600 rounded-xl p-4 shadow-lg border-2 border-emerald-300">
                  <div className="flex items-center justify-between gap-3 mb-3">
                    <div className="flex items-center gap-3 flex-1">
                      <div className="bg-white rounded-full p-2 animate-pulse">
                        <CheckCircle size={20} className="text-emerald-600" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-white font-extrabold text-base mb-1">
                          🎉 Congratulations!
                        </h3>
                        <p className="text-emerald-50 text-xs font-semibold">
                          {freePromotion.message ||
                            `You've earned ${freePromotion.freeItemsEarned} free item(s)!`}
                        </p>
                        <p className="text-emerald-100 text-xs mt-1">
                          {freePromotion.promotionName}
                        </p>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      handleClose();
                      onNavigateToFreeProducts();
                    }}
                    className="w-full bg-white text-emerald-600 px-4 py-2.5 rounded-lg font-bold text-sm hover:bg-emerald-50 transition-all shadow-md flex items-center justify-center gap-2"
                  >
                    <Tag size={16} />
                    Claim Free Product
                    <ChevronRight size={16} />
                  </button>
                  <div className="mt-3 pt-3 border-t border-emerald-400 flex flex-wrap gap-2 text-xs text-emerald-50">
                    <span className="bg-emerald-600 px-2 py-1 rounded">
                      ✓ {freePromotion.details?.purchasedQuantity} items
                      purchased
                    </span>
                    <span className="bg-emerald-600 px-2 py-1 rounded">
                      ✓ {freePromotion.freeItemsEarned} free item(s) earned
                    </span>
                  </div>
                </div>
              )}

              {isPromotionValidating && (
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-3 border border-blue-200 animate-pulse">
                  <div className="flex items-center gap-2">
                    <Loader2 size={16} className="text-blue-600 animate-spin" />
                    <span className="text-xs font-medium text-blue-700">
                      Checking for available promotions...
                    </span>
                  </div>
                </div>
              )}

              {appliedPromotions
                .filter((p) => p.type !== "BUY_X_GET_Y_FREE")
                .map((promo, index) => (
                  <div
                    key={index}
                    className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-3 border-2 border-green-300 shadow-sm"
                  >
                    <div className="flex items-start gap-2">
                      <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center flex-shrink-0">
                        <CheckCircle size={16} className="text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-bold text-gray-900 text-xs">
                            ✓ Promotion Applied
                          </h4>
                          <span className="px-1.5 py-0.5 bg-green-600 text-white text-xs font-bold rounded uppercase">
                            Active
                          </span>
                        </div>
                        <p className="text-xs text-gray-700 font-semibold mb-1">
                          {promo.name || `Promotion #${promo.id}`}
                        </p>
                        {promo.description && (
                          <p className="text-xs text-gray-600 mb-1">
                            {promo.description}
                          </p>
                        )}
                        {promo.discount?.amount > 0 && (
                          <p className="text-xs text-gray-700 font-medium">
                            💰 You save{" "}
                            <span className="font-bold text-green-600">
                              ₹{promo.discount.amount.toLocaleString()}
                            </span>
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}

              <PromoCodeSection
                onApply={onApplyCoupon}
                appliedCoupon={appliedCoupon}
                onRemove={onRemoveCoupon}
              />

              <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <Package size={20} className="text-teal-700" />
                  Order Summary
                </h2>
                <div className="space-y-3 mb-4">
                  <div className="flex justify-between py-2 border-b border-gray-100">
                    <span className="text-sm text-gray-600 font-medium">
                      Subtotal ({itemCount} items)
                    </span>
                    <span className="text-base font-bold text-gray-900">
                      ₹{subtotal.toLocaleString()}
                    </span>
                  </div>
                  {discount > 0 && appliedCoupon && (
                    <div className="flex justify-between py-2 px-3 bg-green-50 rounded-lg border border-green-200">
                      <div className="flex items-center gap-1.5">
                        <span className="text-sm text-gray-600 font-medium">
                          Coupon
                        </span>
                        <span className="px-2 py-0.5 bg-green-500 text-white text-xs font-bold rounded">
                          {appliedCoupon.code}
                        </span>
                      </div>
                      <span className="text-base font-bold text-green-600">
                        -₹{discount.toLocaleString()}
                      </span>
                    </div>
                  )}
                  {promotionDiscount > 0 && appliedPromotions.length > 0 && (
                    <div className="flex justify-between py-2 px-3 bg-blue-50 rounded-lg border border-blue-200">
                      <div className="flex items-center gap-1.5">
                        <Sparkles size={14} className="text-blue-600" />
                        <span className="text-sm text-gray-600 font-medium">
                          Promotion
                        </span>
                        <span className="px-2 py-0.5 bg-blue-500 text-white text-xs font-bold rounded">
                          {appliedPromotions.length}
                        </span>
                      </div>
                      <span className="text-base font-bold text-blue-600">
                        -₹{promotionDiscount.toLocaleString()}
                      </span>
                    </div>
                  )}
                  {discount + promotionDiscount > 0 && (
                    <div className="flex justify-between py-2 px-3 bg-gradient-to-r from-emerald-50 to-green-50 rounded-lg border-2 border-emerald-300">
                      <span className="text-sm font-bold text-gray-900 flex items-center gap-1.5">
                        <CheckCircle size={14} className="text-emerald-600" />
                        Total Savings
                      </span>
                      <span className="text-base font-bold text-emerald-600">
                        -₹{(discount + promotionDiscount).toLocaleString()}
                      </span>
                    </div>
                  )}
                  <div className="flex justify-between py-2 border-b border-gray-100">
                    <div className="flex items-center gap-1.5">
                      <span className="text-sm text-gray-600 font-medium">
                        Shipping
                      </span>
                      <span className="px-1.5 py-0.5 bg-emerald-100 text-emerald-600 text-xs font-bold rounded">
                        FREE
                      </span>
                    </div>
                    <span className="text-base font-bold text-emerald-600">
                      FREE
                    </span>
                  </div>
                  <div className="flex justify-between py-2">
                    <span className="text-sm text-gray-600 font-medium">
                      Tax (GST 18%)
                    </span>
                    <span className="text-base font-bold text-gray-900">
                      ₹{tax.toLocaleString()}
                    </span>
                  </div>
                </div>
                <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl p-4 border-2 border-emerald-200">
                  <div className="flex justify-between items-center">
                    <span className="text-base font-bold text-gray-900">
                      Total Amount
                    </span>
                    <div className="text-right">
                      <span className="text-2xl font-extrabold text-teal-700">
                        ₹{total.toLocaleString()}
                      </span>
                      <p className="text-xs text-gray-600 mt-0.5">
                        Inclusive of all taxes
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <AddressSection
                addresses={addresses}
                selectedAddress={selectedAddress}
                onSelectAddress={onSelectAddress}
                onAddNewClick={() => {
                  handleClose();
                  onAddNewClick();
                }}
                isLoading={isAddressLoading}
                error={addressError}
                onRetry={onRetryAddress}
              />
            </div>
          )}
        </div>

        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 z-10">
          {currentStep === 1 ? (
            <button
              onClick={handleNextStep}
              className="w-full bg-gradient-to-r from-teal-700 to-teal-600 text-white py-3.5 rounded-xl font-bold text-base shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2"
            >
              Continue to Address
              <ChevronRight size={20} />
            </button>
          ) : (
            <button
              onClick={handleCheckoutClick}
              disabled={isCheckoutLoading || !selectedAddress}
              className="w-full bg-gradient-to-r from-teal-700 to-teal-600 text-white py-3.5 rounded-xl font-bold text-base shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isCheckoutLoading ? (
                <>
                  <Loader2 size={20} className="animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  <CheckCircle size={20} />
                  Secure Checkout
                </>
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

const Snackbar = ({ message, type, isOpen, onClose }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed bottom-24 left-1/2 -translate-x-1/2 z-[102] animate-fade-in">
      <div
        className={`px-4 py-3 rounded-lg shadow-lg flex items-center gap-2 ${
          type === "success"
            ? "bg-green-600 text-white"
            : type === "error"
            ? "bg-red-600 text-white"
            : "bg-gray-800 text-white"
        }`}
      >
        {type === "success" && <CheckCircle size={20} />}
        {type === "error" && <AlertCircle size={20} />}
        <span className="font-medium text-sm">{message}</span>
        <button onClick={onClose} className="ml-2">
          <X size={16} />
        </button>
      </div>
    </div>
  );
};

// ============================================
// MAIN COMPONENT
// ============================================
export default function KrambicaCart() {
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);
  const cartTotal = useSelector(selectCartTotal);
  const router = useRouter();

  const {
    isError: isAddressListError,
    isLoading: isAddressListLoading,
    data: AddressListData,
    mutate: AddressListMutate,
  } = useAddressList();

  const {
    isError: isAddAddressError,
    data: AddAddressData,
    mutate: AddAddressMutate,
  } = useAddAddress();

  const { mutateAsync: AddOrderMutate } = useCreateOrder();

  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [showMobileCheckout, setShowMobileCheckout] = useState(false);
  const [showAddAddressModal, setShowAddAddressModal] = useState(false);
  const [isAddingAddress, setIsAddingAddress] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    type: "info",
  });
  const [isCheckoutLoading, setIsCheckoutLoading] = useState(false);

  const STATIC_USER_ID = "6ed3eac0-77bc-42c0-a10c-50391452f53c";

  const {
    eligiblePromotions,
    appliedPromotions,
    freeProducts,
    isValidating: isPromotionValidating,
    totalDiscount: promotionDiscount,
  } = usePromotions(cartItems, 1);

  useEffect(() => {
    AddressListMutate({ emaiL: "kevalkhetani15@gmail.com" });
  }, []);

  const addresses = AddressListData?.data || [];
  const addressError = isAddressListError
    ? "Failed to load addresses. Please try again."
    : null;

  useEffect(() => {
    if (addresses && addresses.length > 0 && !selectedAddress) {
      const defaultAddr = addresses.find((addr) => addr.isDefault);
      setSelectedAddress(defaultAddr || addresses[0]);
    }
  }, [addresses, selectedAddress]);

  useEffect(() => {
    if (AddAddressData?.status === "success" && AddAddressData?.data) {
      AddressListMutate({ emaiL: "kevalkhetani15@gmail.com" });
      setShowAddAddressModal(false);
      setIsAddingAddress(false);
      showSnackbar("Address added successfully! ✓", "success");
    }
  }, [AddAddressData]);

  useEffect(() => {
    if (isAddAddressError) {
      setIsAddingAddress(false);
      showSnackbar("Failed to add address. Please try again.", "error");
    }
  }, [isAddAddressError]);

  const subtotal = cartTotal || 0;
  const discount = appliedCoupon?.discountAmount || 0;
  const subtotalAfterDiscount = subtotal - discount - promotionDiscount;
  const tax = 0;
  const total = subtotalAfterDiscount + tax;
  const itemCount =
    cartItems?.reduce((sum, item) => sum + (item.quantity || 0), 0) || 0;

  const handleRemove = (productId, size) => {
    showSnackbar("Item removed from cart", "info");
  };

  const handleSaveForLater = (productId, size) => {
    showSnackbar("Item saved for later! ✓", "success");
  };

  const handleApplyPromo = async (code) => {
    try {
      const result = await couponService.validateCoupon(
        code,
        subtotal,
        STATIC_USER_ID
      );

      if (result.success) {
        setAppliedCoupon(result);
        showSnackbar(
          `Coupon "${code}" applied! You saved ₹${result.discountAmount}`,
          "success"
        );
        return {
          type: "success",
          text: result.message || "Coupon applied successfully!",
        };
      } else {
        showSnackbar(result.error, "error");
        return { type: "error", text: result.error };
      }
    } catch (error) {
      showSnackbar("Failed to apply coupon", "error");
      return { type: "error", text: "An error occurred. Please try again." };
    }
  };

  const handleRemoveCoupon = () => {
    setAppliedCoupon(null);
    showSnackbar("Coupon removed", "info");
  };

  const handleAddAddress = async (addressData) => {
    setIsAddingAddress(true);
    try {
      await AddAddressMutate({
        email: "kevalkhetani15@gmail.com",
        ...addressData,
      });
    } catch (error) {
      console.error("Failed to add address:", error);
      showSnackbar("Failed to add address. Please try again.", "error");
      setIsAddingAddress(false);
    }
  };

  const handleCheckout = async () => {
    if (!selectedAddress) {
      showSnackbar("Please select a delivery address", "error");
      return;
    }

    if (!cartItems || cartItems.length === 0) {
      showSnackbar("Your cart is empty", "error");
      return;
    }

    setIsCheckoutLoading(true);

    try {
      const paidItems = [];
      const freePromotionalItems = [];

      cartItems.forEach((item) => {
        const itemData = {
          product_id: item.productId || item.product_id,
          size_variant_id: item.sizeVariantId,
          quantity: item.quantity,
        };

        if (item.isPromotion === true && item.price === 0) {
          freePromotionalItems.push({
            product_id: item.product_id,
            size_variant_id: item.sizevariant_id,
            quantity: item.quantity,
          });
        } else {
          paidItems.push({
            product_id: item.product_id,
            variant_id: item.sizeVariantId,
            quantity: item.quantity,
          });
        }
      });

      const checkoutData = {
        user_id: 1,
        address_id: selectedAddress.address_id,
        discount: discount || 0,
        items: paidItems,
        shippingMethod: "STANDARD",
        paymentMethod: "CARD",
      };

      if (appliedCoupon?.code) {
        checkoutData.couponCode = appliedCoupon.code;
      }

      if (freePromotionalItems.length > 0) {
        checkoutData.appliedPromotion = {
          promotion_id: 2,
          type: "FREE_PRODUCT",
          promotionName: "Special Free Product Promotion",
          selectedFreeItems: freePromotionalItems,
        };
      }

      console.log("==========================================");
      console.log("🛒 CHECKOUT PAYLOAD:");
      console.log("==========================================");
      console.log(JSON.stringify(checkoutData, null, 2));
      console.log("==========================================");
      console.log("📦 Paid Items:", paidItems.length);
      console.log("🎁 Free Promotional Items:", freePromotionalItems.length);
      console.log("==========================================");

      const AddOrderData = await AddOrderMutate(checkoutData);

      if (!AddOrderData?.data) {
        throw new Error("Order creation failed. Please try again.");
      }

      const razorpayOrderId = AddOrderData.data.razorpay_order_id;
      const internalOrderId = AddOrderData.data.id;
      const amount = AddOrderData.data.grandTotal || 0;

      if (!razorpayOrderId || !internalOrderId) {
        throw new Error("Invalid order data received from backend.");
      }

      if (amount === 0) {
        console.log("🎉 Order is completely FREE! Skipping payment gateway.");

        const verifyResult = await paymentService.verifyFreeOrder({
          orderId: internalOrderId,
          isFreeOrder: true,
        });

        if (verifyResult.success) {
          showSnackbar("🎉 Free order placed successfully!", "success");
          dispatch(clearCart()); // Clear cart immediately
          router.push(`/home`);
        } else {
          throw new Error(verifyResult.error || "Failed to confirm free order");
        }

        setIsCheckoutLoading(false);
        return;
      }

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: amount,
        currency: "INR",
        name: "Your Store Name",
        description: "Order Payment",
        image: "/logo.png",
        order_id: razorpayOrderId,
        handler: async function (response) {
          try {
            // Call proper payment verification endpoint
            const verifyResult = await paymentService.verifyPayment({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              orderId: internalOrderId,
            });

            if (verifyResult.success) {
              showSnackbar("✅ Payment successful!", "success");
              dispatch(clearCart()); // Clear cart immediately after successful payment
              router.push(`/home`);
            } else {
              showSnackbar("Payment verification failed", "error");
              console.error("Payment verification failed:", verifyResult.error);
            }
          } catch (error) {
            console.error("Verification error:", error);
            showSnackbar("Payment verification failed", "error");
          } finally {
            setIsCheckoutLoading(false);
          }
        },
        prefill: {
          name: selectedAddress.fullName,
          email: selectedAddress.email || "customer@example.com",
          contact: selectedAddress.phone,
        },
        notes: {
          address: selectedAddress.addressLine1,
          hasFreeItems: freePromotionalItems.length > 0,
        },
        theme: { color: "#0d9488" },
        modal: {
          ondismiss: function () {
            setIsCheckoutLoading(false);
            showSnackbar("Payment cancelled", "info");
          },
        },
      };

      //@ts-ignore
      const razorpayInstance = new window.Razorpay(options);
      razorpayInstance.on("payment.failed", function (response: any) {
        console.error("Payment failed:", response.error);
        showSnackbar(`Payment failed: ${response.error.description}`, "error");
        setIsCheckoutLoading(false);
      });

      razorpayInstance.open();
    } catch (error) {
      console.error("Checkout error:", error);
      showSnackbar(
        error?.response?.data?.message ||
          error?.message ||
          "Failed to process checkout. Please try again.",
        "error"
      );
      setIsCheckoutLoading(false);
    }
  };

  const showSnackbar = (message, type) => {
    setSnackbar({ open: true, message, type });
    setTimeout(() => setSnackbar({ ...snackbar, open: false }), 3000);
  };

  const handleRetryAddresses = () => {
    AddressListMutate({ emaiL: "kevalkhetani15@gmail.com" });
  };

  const handleNavigateToFreeProducts = () => {
    const freePromotion = appliedPromotions?.find(
      (promo) => promo.isEligible && promo.type === "BUY_X_GET_Y_FREE"
    );
    if (freePromotion) {
      sessionStorage.setItem(
        "activeFreePromotion",
        JSON.stringify(freePromotion)
      );
      router.push(`/freeproducts?promotionId=${freePromotion.promotion_id}`);
    }
  };

  const summaryData = {
    subtotal,
    discount,
    promotionDiscount,
    tax,
    total,
    itemCount,
    onCheckout: handleCheckout,
    appliedCoupon,
    appliedPromotions,
    isLoading: isCheckoutLoading,
  };

  return (
    <div className="bg-gray-50 min-h-screen py-6 md:py-8 pb-32 md:pb-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="mb-6 md:mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
            Shopping Cart
          </h1>
          <p className="text-sm md:text-base text-gray-600">
            Review your items and checkout when you're ready
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            {!cartItems || cartItems.length === 0 ? (
              <div className="bg-white border border-gray-200 rounded-2xl p-8 text-center">
                <ShoppingBag size={64} className="mx-auto mb-4 text-gray-300" />
                <h3 className="text-xl font-semibold text-gray-500 mb-2">
                  Your cart is empty
                </h3>
                <p className="text-gray-400 mb-4">
                  Add some items to get started
                </p>
                <button
                  onClick={() => router.push("/shop")}
                  className="px-6 py-3 bg-gradient-to-r from-teal-700 to-teal-600 text-white rounded-lg font-bold hover:shadow-lg transition-all"
                >
                  Continue Shopping
                </button>
              </div>
            ) : (
              <>
                <FreeProductBanner
                  appliedPromotions={appliedPromotions}
                  onNavigateToFreeProducts={handleNavigateToFreeProducts}
                />

                {cartItems.map((item) => (
                  <CartItemCard
                    key={`${item.productId}-${item.size}`}
                    item={item}
                    onRemove={handleRemove}
                    onSaveForLater={handleSaveForLater}
                  />
                ))}

                <div className="hidden md:block">
                  <PromoCodeSection
                    onApply={handleApplyPromo}
                    appliedCoupon={appliedCoupon}
                    onRemove={handleRemoveCoupon}
                  />
                </div>

                <div className="hidden md:block">
                  <AddressSection
                    addresses={addresses}
                    selectedAddress={selectedAddress}
                    onSelectAddress={setSelectedAddress}
                    onAddNewClick={() => setShowAddAddressModal(true)}
                    isLoading={isAddressListLoading}
                    error={addressError}
                    onRetry={handleRetryAddresses}
                  />
                </div>
              </>
            )}
          </div>

          {cartItems && cartItems.length > 0 && (
            <div className="hidden lg:block">
              <OrderSummary {...summaryData} />
            </div>
          )}
        </div>
      </div>

      {cartItems && cartItems.length > 0 && (
        <>
          <MobileCheckoutBar
            total={total}
            itemCount={itemCount}
            onOpenSummary={() => setShowMobileCheckout(true)}
          />

          <MobileTwoStepCheckout
            isOpen={showMobileCheckout}
            onClose={() => setShowMobileCheckout(false)}
            onApplyCoupon={handleApplyPromo}
            appliedCoupon={appliedCoupon}
            onRemoveCoupon={handleRemoveCoupon}
            subtotal={subtotal}
            discount={discount}
            promotionDiscount={promotionDiscount}
            tax={tax}
            total={total}
            itemCount={itemCount}
            appliedPromotions={appliedPromotions}
            eligiblePromotions={eligiblePromotions}
            isPromotionValidating={isPromotionValidating}
            onNavigateToFreeProducts={handleNavigateToFreeProducts}
            addresses={addresses}
            selectedAddress={selectedAddress}
            onSelectAddress={setSelectedAddress}
            onAddNewClick={() => setShowAddAddressModal(true)}
            isAddressLoading={isAddressListLoading}
            addressError={addressError}
            onRetryAddress={handleRetryAddresses}
            onCheckout={handleCheckout}
            isCheckoutLoading={isCheckoutLoading}
          />
        </>
      )}

      {showAddAddressModal && (
        <AddAddressModal
          isOpen={showAddAddressModal}
          onClose={() => setShowAddAddressModal(false)}
          onSubmit={handleAddAddress}
          isSubmitting={isAddingAddress}
        />
      )}

      <Snackbar
        message={snackbar.message}
        type={snackbar.type}
        isOpen={snackbar.open}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      />

      <style jsx>{`
        @keyframes slide-up {
          from {
            transform: translateY(100%);
          }
          to {
            transform: translateY(0);
          }
        }
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translate(-50%, 10px);
          }
          to {
            opacity: 1;
            transform: translate(-50%, 0);
          }
        }
        .animate-slide-up {
          animation: slide-up 0.3s ease-out;
        }
        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}
