// "use client";
// import React, { useState } from "react";
// import {
//   Sparkles,
//   Target,
//   Eye,
//   Award,
//   Users,
//   Heart,
//   Leaf,
//   TrendingUp,
//   ShoppingBag,
//   Store,
//   Headphones,
//   DollarSign,
//   CheckCircle,
//   Star,
//   Quote,
//   Zap,
//   Shield,
//   Globe,
//   ArrowRight,
//   Calendar,
//   MapPin,
//   Factory,
//   Home,
//   Package,
//   ChevronRight,
//   BookOpen,
//   Trophy,
//   Users2,
// } from "lucide-react";

// const AboutPage = () => {
//   const [activeTimeline, setActiveTimeline] = useState(null);

//   // Color constants
//   const primaryTextColor =
//     "bg-gradient-to-r from-teal-600 to-teal-800 bg-clip-text text-transparent";
//   const secondaryTextColor = "text-gray-700";
//   const accentColor = "from-teal-600 to-teal-800";
//   const lightAccentColor = "from-teal-50 to-teal-100";
//   const heroGradient = "from-teal-700 via-teal-600 to-teal-800";

//   return (
//     <div className="bg-gradient-to-b from-white via-teal-50/20 to-white min-h-screen">
//       {/* Hero Section - Enhanced */}
//       <div
//         className={`relative bg-gradient-to-br ${heroGradient} text-white py-16 sm:py-24 md:py-32 overflow-hidden`}
//       >
//         {/* Background Pattern */}
//         <div className="absolute inset-0 opacity-10">
//           <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.2)_1px,transparent_1px)] bg-[size:60px_60px]"></div>
//         </div>

//         {/* Animated Background Elements */}
//         <div className="absolute inset-0 pointer-events-none">
//           <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-teal-400/20 rounded-full filter blur-3xl animate-pulse"></div>
//           <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-cyan-300/10 rounded-full filter blur-3xl animate-pulse animation-delay-2000"></div>
//           <div className="absolute top-1/3 right-1/3 w-48 h-48 bg-white/5 rounded-full filter blur-2xl animate-pulse animation-delay-1000"></div>
//         </div>

//         {/* Hero content */}
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
//           <div className="text-center">
//             {/* Badge - Enhanced */}
//             <div className="inline-flex items-center gap-3 bg-white/15 backdrop-blur-lg px-5 sm:px-7 py-2.5 sm:py-3.5 rounded-full mb-8 border border-white/20 shadow-lg hover:shadow-xl transition-shadow duration-300 group">
//               <div className="relative">
//                 <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 animate-pulse group-hover:rotate-12 transition-transform" />
//                 <div className="absolute -inset-1 bg-white/10 rounded-full blur-sm"></div>
//               </div>
//               <span className="text-sm sm:text-base font-semibold uppercase tracking-wider">
//                 Our Story
//               </span>
//             </div>

//             {/* Heading - Enhanced */}
//             <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6">
//               <span className="text-white drop-shadow-lg">About</span>
//               <span className="block text-transparent bg-gradient-to-r from-teal-200 via-cyan-200 to-white bg-clip-text drop-shadow-lg">
//                 Krambica
//               </span>
//             </h1>

//             {/* Subtitle - Enhanced */}
//             <div className="relative inline-block">
//               <p className="text-lg sm:text-xl md:text-2xl text-white/95 max-w-2xl mx-auto leading-relaxed px-4 backdrop-blur-sm bg-white/5 rounded-2xl py-4 border border-white/10">
//                 Journey of Comfort Since 2018
//               </p>
//               <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-24 h-0.5 bg-gradient-to-r from-transparent via-teal-300 to-transparent"></div>
//             </div>

//             {/* Decorative Elements */}
//             <div className="flex justify-center items-center gap-8 mt-12 opacity-70">
//               <div className="w-12 h-0.5 bg-teal-300/50"></div>
//               <div className="flex items-center gap-4">
//                 <Heart className="w-5 h-5 text-teal-300 animate-pulse" />
//                 <BookOpen className="w-5 h-5 text-teal-300 animate-pulse delay-75" />
//                 <Trophy className="w-5 h-5 text-teal-300 animate-pulse delay-150" />
//               </div>
//               <div className="w-12 h-0.5 bg-teal-300/50"></div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Introduction Section - Enhanced */}
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 md:py-28">
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
//           <div className="space-y-6">
//             {/* Badge - Enhanced */}
//             <div className="inline-flex items-center gap-3 bg-gradient-to-r from-teal-50 to-teal-100 px-5 py-2.5 rounded-full border border-teal-200 shadow-sm hover:shadow-md transition-shadow duration-300 group">
//               <div className="p-1.5 bg-white rounded-full shadow-sm">
//                 <Sparkles className="w-4 h-4 text-teal-600 group-hover:scale-110 transition-transform" />
//               </div>
//               <span className="text-sm font-semibold text-teal-700 tracking-wide">
//                 Welcome to Krambica
//               </span>
//             </div>

//             {/* Heading - Enhanced */}
//             <div className="relative">
//               <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight mb-6">
//                 <span className="text-gray-900">Our</span>
//                 <span className={`block ${primaryTextColor} mt-2`}>
//                   Comfort Journey
//                 </span>
//               </h2>
//               <div className="absolute -left-4 top-0 w-1 h-full bg-gradient-to-b from-teal-500 to-cyan-500"></div>
//             </div>

//             {/* Content Cards - Enhanced */}
//             <div className="space-y-5">
//               <div className="group flex gap-4 sm:gap-5 p-5 sm:p-6 bg-gradient-to-r from-teal-50 to-teal-100/80 rounded-2xl border border-teal-200 shadow-sm hover:shadow-lg hover:border-teal-300 transition-all duration-300 hover:-translate-y-1">
//                 <div className="relative">
//                   <CheckCircle className="w-6 h-6 sm:w-7 sm:h-7 text-teal-600 flex-shrink-0 mt-1" />
//                   <div className="absolute inset-0 bg-teal-600/10 rounded-full blur-sm group-hover:blur-md transition-all"></div>
//                 </div>
//                 <div>
//                   <p className="text-gray-700 text-base sm:text-lg leading-relaxed">
//                     <span className="font-bold text-teal-700">Krambica</span> is
//                     built on a simple belief — giving customers the best comfort
//                     and design for what they pay.
//                   </p>
//                 </div>
//               </div>
//               <div className="group flex gap-4 sm:gap-5 p-5 sm:p-6 bg-gradient-to-r from-teal-50 to-teal-100/80 rounded-2xl border border-teal-200 shadow-sm hover:shadow-lg hover:border-teal-300 transition-all duration-300 hover:-translate-y-1">
//                 <div className="relative">
//                   <Heart className="w-6 h-6 sm:w-7 sm:h-7 text-teal-600 flex-shrink-0 mt-1" />
//                   <div className="absolute inset-0 bg-teal-600/10 rounded-full blur-sm group-hover:blur-md transition-all"></div>
//                 </div>
//                 <div>
//                   <p className="text-gray-700 text-base sm:text-lg leading-relaxed">
//                     From a small home-based boutique in Bhavnagar to becoming a
//                     trusted name with stores and online presence, our journey
//                     has been driven by creating soft, breathable cotton clothing
//                     that truly defines comfort.
//                   </p>
//                 </div>
//               </div>
//             </div>

//             {/* Button - Enhanced */}
//             <button className="group relative inline-flex items-center gap-3 bg-gradient-to-r from-teal-600 to-teal-800 text-white px-7 py-4 rounded-xl font-semibold text-base hover:shadow-xl hover:shadow-teal-600/25 transition-all duration-300 hover:-translate-y-0.5 overflow-hidden">
//               <div className="absolute inset-0 bg-gradient-to-r from-teal-500 to-teal-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
//               <span className="relative z-10">Discover More</span>
//               <ArrowRight className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform" />
//               <div className="absolute -inset-1 bg-teal-600/20 rounded-xl blur-sm group-hover:blur-md transition-all"></div>
//             </button>
//           </div>

//           {/* Image Section - Enhanced */}
//           <div className="relative">
//             <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl group">
//               <img
//                 src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=800&h=600&q=80"
//                 alt="Krambica Store"
//                 className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
//               />
//               <div className="absolute inset-0 bg-gradient-to-t from-teal-900/90 via-teal-900/40 to-transparent"></div>
//               <div className="absolute inset-0 bg-gradient-to-r from-teal-900/30 to-transparent"></div>

//               {/* Image Overlay Content - Enhanced */}
//               <div className="absolute bottom-8 left-8 right-8 text-white">
//                 <div className="flex items-center gap-3 mb-3">
//                   <MapPin className="w-6 h-6 text-teal-300" />
//                   <span className="text-sm font-medium text-teal-200">
//                     Store Location
//                   </span>
//                 </div>
//                 <h3 className="text-2xl sm:text-3xl font-bold mb-2 drop-shadow-lg">
//                   Our Vadodara Store
//                 </h3>
//                 <p className="text-sm text-teal-100/90 drop-shadow">
//                   Where comfort meets craftsmanship
//                 </p>
//               </div>

//               {/* Decorative Border */}
//               <div className="absolute inset-0 border-2 border-white/20 rounded-2xl sm:rounded-3xl pointer-events-none"></div>
//             </div>

//             {/* Floating Elements */}
//             <div className="absolute -top-4 -right-4 w-16 h-16 bg-gradient-to-br from-teal-500 to-cyan-500 rounded-2xl flex items-center justify-center shadow-2xl animate-bounce">
//               <Store className="w-8 h-8 text-white" />
//             </div>
//             <div className="absolute -bottom-4 -left-4 w-14 h-14 bg-gradient-to-br from-amber-500 to-orange-500 rounded-xl flex items-center justify-center shadow-2xl animate-pulse delay-1000">
//               <Award className="w-6 h-6 text-white" />
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Journey Timeline - Enhanced */}
//       <div className="bg-gradient-to-b from-white to-teal-50/30 py-16 sm:py-20 md:py-28">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="text-center mb-12 sm:mb-16">
//             {/* Badge - Enhanced */}
//             <div className="inline-flex items-center gap-3 bg-gradient-to-r from-teal-50 to-teal-100 px-5 py-2.5 rounded-full border border-teal-200 shadow-sm mb-6 group hover:shadow-md transition-shadow">
//               <TrendingUp className="w-5 h-5 text-teal-600 group-hover:scale-110 transition-transform" />
//               <span className="text-sm font-semibold text-teal-700">
//                 Our Journey
//               </span>
//             </div>

//             {/* Heading - Enhanced */}
//             <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
//               <span className="text-gray-900">The</span>
//               <span className={`block ${primaryTextColor} mt-2`}>
//                 Krambica Story
//               </span>
//             </h2>
//             <p className="text-gray-600 text-lg max-w-2xl mx-auto">
//               From a home-based boutique to a comfort revolution
//             </p>
//           </div>

//           {/* Timeline Container */}
//           <div className="relative">
//             {/* Timeline Line - Enhanced */}
//             <div className="absolute left-4 sm:left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-teal-500 via-cyan-500 to-teal-500 transform sm:-translate-x-1/2 shadow-lg shadow-teal-500/20"></div>

//             <div className="space-y-12 sm:space-y-16">
//               {[
//                 {
//                   year: "2018",
//                   title: "The Beginning",
//                   tag: "Foundation Year",
//                   desc: "Started as a small home-based boutique from the founder's bungalow in Vijayraj Nagar, Bhavnagar — with a simple thought of giving customers the best comfort and design for what they pay.",
//                   icon: <Home className="w-5 h-5" />,
//                 },
//                 {
//                   year: "2019",
//                   title: "The Learning Year",
//                   tag: "Growth Phase",
//                   desc: "Our retail grew from the same space. We started exploring and researching customer taste, understanding what real women look for in daily wear comfort. Krambica began trading in clothing to widen its reach.",
//                   icon: <BookOpen className="w-5 h-5" />,
//                 },
//                 {
//                   year: "2020",
//                   title: "The Tough Yet Steady Year",
//                   tag: "Resilience",
//                   desc: "Even when COVID hit, Krambica continued its journey with steady growth and belief. The support and trust of our customers kept us moving forward.",
//                   icon: <Shield className="w-5 h-5" />,
//                 },
//                 {
//                   year: "2021",
//                   title: "Manufacturing Milestone",
//                   tag: "Production Launch",
//                   desc: "We started our own manufacturing unit — creating what we couldn't find in the market, focusing on soft, breathable, high-quality cotton wear that truly defines comfort.",
//                   icon: <Factory className="w-5 h-5" />,
//                 },
//                 {
//                   year: "2022",
//                   title: "New City, New Phase",
//                   tag: "Brand Registration",
//                   desc: "Krambica shifted from Bhavnagar to Vadodara and got officially registered as a brand. We began connecting directly with shop vendors, continuing our growth in manufacturing step by step.",
//                   icon: <MapPin className="w-5 h-5" />,
//                 },
//                 {
//                   year: "2023",
//                   title: "Expanding Connections",
//                   tag: "National Reach",
//                   desc: "Krambica reached 100+ shops across India, dealing directly with retailers — no agents, no wholesalers, no traders — just pure connection and trust with shops who value quality.",
//                   icon: <Users2 className="w-5 h-5" />,
//                 },
//                 {
//                   year: "2024",
//                   title: "First Brand Store",
//                   tag: "Retail Launch",
//                   desc: "As a manufacturer, Krambica proudly opened its first retail outlet in Vadodara, marking a big step toward bringing our creations directly to customers under one roof.",
//                   icon: <Store className="w-5 h-5" />,
//                 },
//                 {
//                   year: "2025",
//                   title: "Back to Roots & Beyond",
//                   tag: "Current",
//                   desc: 'Krambica opened its second outlet — "Ambica by Krambica" — in its hometown, Bhavnagar, handled and owned by Hemanshu Sharadbhai Sarvaiya. This year also marked Krambica\'s entry on online platforms like Myntra, placing the brand on a wider stage while staying true to its soul — comfort, quality, and trust.',
//                   icon: <Package className="w-5 h-5" />,
//                   current: true,
//                 },
//               ].map((item, i) => (
//                 <div
//                   key={i}
//                   className={`relative group ${
//                     i % 2 === 0
//                       ? "sm:pr-1/2 sm:text-right"
//                       : "sm:pl-1/2 sm:ml-auto"
//                   } pl-12 sm:pl-0`}
//                 >
//                   {/* Timeline Dot - Enhanced */}
//                   <div
//                     className={`absolute left-4 sm:left-1/2 w-8 h-8 rounded-full border-4 border-white shadow-xl -ml-4 sm:-ml-4 flex items-center justify-center ${
//                       item.current
//                         ? "bg-gradient-to-r from-teal-500 to-cyan-500 animate-pulse"
//                         : "bg-gradient-to-r from-teal-600 to-teal-800"
//                     }`}
//                   >
//                     {item.icon}
//                     <div
//                       className={`absolute inset-0 rounded-full animate-ping ${
//                         item.current ? "bg-teal-500/75" : "bg-teal-600/50"
//                       }`}
//                     ></div>
//                   </div>

//                   {/* Content Card - Enhanced */}
//                   <div
//                     className={`relative rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-2 ${
//                       item.current
//                         ? "bg-gradient-to-br from-teal-50 to-white border-teal-300 shadow-teal-500/10"
//                         : "bg-white border-gray-100"
//                     } overflow-hidden`}
//                   >
//                     {/* Hover Background */}
//                     <div className="absolute inset-0 bg-gradient-to-r from-teal-50/0 via-teal-50/0 to-teal-50/0 group-hover:from-teal-50/30 group-hover:via-teal-50/20 group-hover:to-teal-50/10 transition-all duration-500"></div>

//                     <div className="relative">
//                       {/* Year and Tag - Enhanced */}
//                       <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
//                         <div className="flex items-center gap-3">
//                           <span
//                             className={`text-2xl sm:text-3xl font-bold ${
//                               item.current ? "text-teal-700" : "text-gray-900"
//                             }`}
//                           >
//                             {item.year}
//                           </span>
//                           <span
//                             className={`text-lg sm:text-xl font-semibold ${
//                               item.current ? "text-teal-800" : "text-gray-800"
//                             }`}
//                           >
//                             {item.title}
//                           </span>
//                         </div>
//                         <span
//                           className={`inline-block px-4 py-1.5 rounded-full text-sm font-bold ${
//                             item.current
//                               ? "bg-gradient-to-r from-teal-500 to-cyan-500 text-white shadow-md"
//                               : "bg-gray-100 text-gray-700 border border-gray-200"
//                           }`}
//                         >
//                           {item.tag}
//                         </span>
//                       </div>

//                       {/* Description - Enhanced */}
//                       <p className="text-gray-700 leading-relaxed text-base sm:text-lg">
//                         {item.desc}
//                       </p>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Mission, Vision, Values - Enhanced */}
//       <div className="py-16 sm:py-20 md:py-28">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="text-center mb-12 sm:mb-16">
//             {/* Badge - Enhanced */}
//             <div className="inline-flex items-center gap-3 bg-gradient-to-r from-teal-50 to-teal-100 px-5 py-2.5 rounded-full border border-teal-200 shadow-sm mb-6 group hover:shadow-md transition-shadow">
//               <Target className="w-5 h-5 text-teal-600 group-hover:scale-110 transition-transform" />
//               <span className="text-sm font-semibold text-teal-700">
//                 Our Purpose
//               </span>
//             </div>

//             {/* Heading - Enhanced */}
//             <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
//               <span className="text-gray-900">Mission, Vision</span>
//               <span className={`block ${primaryTextColor} mt-2`}>
//                 & Core Values
//               </span>
//             </h2>
//             <p className="text-gray-600 text-lg max-w-2xl mx-auto">
//               The principles that guide every decision we make
//             </p>
//           </div>

//           {/* Cards Grid - Enhanced */}
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-10">
//             {[
//               {
//                 icon: <Target className="w-8 h-8" />,
//                 title: "Our Mission",
//                 content:
//                   "To create soft, breathable cotton clothing that gives real comfort to everyday life. We focus on quality fabrics, natural designs, and fair prices — so every woman can feel good in what she wears. Krambica stands to prove that comfort doesn't have to be costly, and simple clothing can still feel special.",
//               },
//               {
//                 icon: <Eye className="w-8 h-8" />,
//                 title: "Our Vision",
//                 content:
//                   "To reach every woman who loves to wear comfortable cotton clothing but doesn't yet know that a brand like Krambica exists. What we create — soft, breathable, and high-quality cotton wear at genuine prices — is rarely found in the market. We want people to know that real comfort, quality, and value can come together in one brand.",
//               },
//               {
//                 icon: <Heart className="w-8 h-8" />,
//                 title: "Core Values",
//                 content:
//                   "Comfort comes first. Pure cotton, pure feel. Fair price, true value. Simple yet stylish. Made with care. Your comfort, our goodwill.",
//               },
//             ].map((item, i) => (
//               <div
//                 key={i}
//                 className="group relative bg-white rounded-2xl sm:rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-2 border-gray-100 hover:border-teal-300 overflow-hidden"
//               >
//                 {/* Card Background Effects */}
//                 <div className="absolute inset-0 bg-gradient-to-br from-white via-white to-teal-50/0 group-hover:to-teal-50/50 transition-all duration-500"></div>
//                 <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-teal-100 to-cyan-100 rounded-full -mr-16 -mt-16 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

//                 <div className="relative z-10">
//                   {/* Icon - Enhanced */}
//                   <div className="w-16 h-16 bg-gradient-to-r from-teal-600 to-teal-800 rounded-2xl flex items-center justify-center mb-8 shadow-lg group-hover:scale-110 transition-transform duration-300">
//                     <div className="text-white">{item.icon}</div>
//                   </div>

//                   {/* Title - Enhanced */}
//                   <h3 className="text-2xl font-bold text-gray-900 mb-5">
//                     {item.title}
//                   </h3>

//                   {/* Content - Enhanced */}
//                   <p className="text-gray-700 leading-relaxed text-base sm:text-lg">
//                     {item.content}
//                   </p>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* Core Values Grid - Enhanced */}
//       <div className="bg-gradient-to-b from-white to-teal-50/30 py-16 sm:py-20 md:py-28">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="text-center mb-12 sm:mb-16">
//             {/* Badge - Enhanced */}
//             <div className="inline-flex items-center gap-3 bg-gradient-to-r from-teal-50 to-teal-100 px-5 py-2.5 rounded-full border border-teal-200 shadow-sm mb-6 group hover:shadow-md transition-shadow">
//               <Zap className="w-5 h-5 text-teal-600 group-hover:scale-110 transition-transform" />
//               <span className="text-sm font-semibold text-teal-700">
//                 What Drives Us
//               </span>
//             </div>

//             {/* Heading - Enhanced */}
//             <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
//               <span className="text-gray-900">Our</span>
//               <span className={`block ${primaryTextColor} mt-2`}>
//                 Core Values
//               </span>
//             </h2>
//             <p className="text-gray-600 text-lg max-w-2xl mx-auto">
//               The principles that define who we are
//             </p>
//           </div>

//           {/* Values Grid - Enhanced */}
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
//             {[
//               {
//                 icon: <Heart className="w-7 h-7" />,
//                 title: "Comfort First",
//                 desc: "Comfort comes first in everything we create — from fabric selection to final stitching.",
//               },
//               {
//                 icon: <Leaf className="w-7 h-7" />,
//                 title: "Pure Cotton",
//                 desc: "We believe in pure cotton, pure feel — natural fabrics that breathe with you.",
//               },
//               {
//                 icon: <DollarSign className="w-7 h-7" />,
//                 title: "Fair Value",
//                 desc: "Fair price, true value — quality clothing shouldn't cost a fortune.",
//               },
//               {
//                 icon: <Sparkles className="w-7 h-7" />,
//                 title: "Made with Care",
//                 desc: "Simple yet stylish, made with care — every piece reflects our dedication.",
//               },
//             ].map((item, i) => (
//               <div
//                 key={i}
//                 className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-2 border-gray-100 hover:border-teal-300"
//               >
//                 <div className="w-16 h-16 bg-gradient-to-r from-teal-600 to-teal-800 rounded-2xl flex items-center justify-center mb-6 text-white shadow-md group-hover:scale-110 transition-transform">
//                   {item.icon}
//                 </div>
//                 <h3 className="text-xl font-bold text-gray-900 mb-3">
//                   {item.title}
//                 </h3>
//                 <p className="text-gray-700 leading-relaxed">{item.desc}</p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* Achievements - Enhanced */}
//       <div className="py-16 sm:py-20 md:py-28 bg-gradient-to-r from-teal-700 via-teal-600 to-teal-800">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="text-center mb-12 sm:mb-16">
//             <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6">
//               <span className="text-white">Our</span>
//               <span className="block text-teal-200 mt-2">Achievements</span>
//             </h2>
//             <p className="text-teal-100/90 text-lg max-w-2xl mx-auto">
//               Milestones that reflect our commitment to comfort
//             </p>
//           </div>

//           <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
//             {[
//               {
//                 number: "100+",
//                 label: "Retail Partners",
//                 icon: <Store className="w-10 h-10 sm:w-12 sm:h-12" />,
//               },
//               {
//                 number: "2",
//                 label: "Brand Stores",
//                 icon: <ShoppingBag className="w-10 h-10 sm:w-12 sm:h-12" />,
//               },
//               {
//                 number: "7+",
//                 label: "Years of Journey",
//                 icon: <Award className="w-10 h-10 sm:w-12 sm:h-12" />,
//               },
//               {
//                 number: "1000s",
//                 label: "Happy Customers",
//                 icon: <Users className="w-10 h-10 sm:w-12 sm:h-12" />,
//               },
//             ].map((item, i) => (
//               <div
//                 key={i}
//                 className="group text-center text-white bg-white/10 backdrop-blur-lg rounded-2xl sm:rounded-3xl p-8 sm:p-10 hover:bg-white/15 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-teal-900/30"
//               >
//                 <div className="flex justify-center mb-6">
//                   <div className="p-4 bg-white/10 rounded-2xl group-hover:scale-110 transition-transform">
//                     {item.icon}
//                   </div>
//                 </div>
//                 <div className="text-4xl sm:text-5xl md:text-6xl font-bold mb-3 group-hover:text-teal-200 transition-colors">
//                   {item.number}
//                 </div>
//                 <div className="text-teal-100/90 text-base sm:text-lg font-medium">
//                   {item.label}
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* Why Choose Us - Enhanced */}
//       <div className="py-16 sm:py-20 md:py-28">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="text-center mb-12 sm:mb-16">
//             {/* Badge - Enhanced */}
//             <div className="inline-flex items-center gap-3 bg-gradient-to-r from-teal-50 to-teal-100 px-5 py-2.5 rounded-full border border-teal-200 shadow-sm mb-6 group hover:shadow-md transition-shadow">
//               <Star className="w-5 h-5 text-teal-600 group-hover:scale-110 transition-transform" />
//               <span className="text-sm font-semibold text-teal-700">
//                 Why Krambica
//               </span>
//             </div>

//             {/* Heading - Enhanced */}
//             <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
//               <span className="text-gray-900">Why</span>
//               <span className={`block ${primaryTextColor} mt-2`}>
//                 Choose Us
//               </span>
//             </h2>
//             <p className="text-gray-600 text-lg max-w-2xl mx-auto">
//               What makes us different from the rest
//             </p>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10">
//             {[
//               {
//                 icon: <Leaf className="w-8 h-8" />,
//                 title: "Pure Cotton Quality",
//                 desc: "We use only the finest cotton fabrics, ensuring every piece is soft, breathable, and comfortable for all-day wear.",
//               },
//               {
//                 icon: <Heart className="w-8 h-8" />,
//                 title: "Comfort-Focused Design",
//                 desc: "Our designs prioritize your comfort above all else, creating clothing that feels natural and moves with you.",
//               },
//               {
//                 icon: <DollarSign className="w-8 h-8" />,
//                 title: "Fair & Honest Pricing",
//                 desc: "Quality clothing at genuine prices — we believe in fair value without compromising on comfort or craftsmanship.",
//               },
//               {
//                 icon: <Shield className="w-8 h-8" />,
//                 title: "Direct Connection",
//                 desc: "No middlemen, no traders — we connect directly with our customers and retail partners, ensuring transparency and trust.",
//               },
//             ].map((item, i) => (
//               <div
//                 key={i}
//                 className="group flex gap-6 sm:gap-8 p-8 bg-white rounded-2xl sm:rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-2 border-gray-100 hover:border-teal-300"
//               >
//                 <div className="w-16 h-16 bg-gradient-to-r from-teal-600 to-teal-800 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg text-white group-hover:scale-110 transition-transform">
//                   {item.icon}
//                 </div>
//                 <div>
//                   <h3 className="text-xl font-bold text-gray-900 mb-3">
//                     {item.title}
//                   </h3>
//                   <p className="text-gray-700 leading-relaxed text-base">
//                     {item.desc}
//                   </p>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* Customer Testimonials - Enhanced */}
//       <div className="bg-gradient-to-b from-white to-teal-50/30 py-16 sm:py-20 md:py-28">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="text-center mb-12 sm:mb-16">
//             {/* Badge - Enhanced */}
//             <div className="inline-flex items-center gap-3 bg-gradient-to-r from-teal-50 to-teal-100 px-5 py-2.5 rounded-full border border-teal-200 shadow-sm mb-6 group hover:shadow-md transition-shadow">
//               <Quote className="w-5 h-5 text-teal-600 group-hover:scale-110 transition-transform" />
//               <span className="text-sm font-semibold text-teal-700">
//                 What They Say
//               </span>
//             </div>

//             {/* Heading - Enhanced */}
//             <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
//               <span className="text-gray-900">Customer</span>
//               <span className={`block ${primaryTextColor} mt-2`}>Stories</span>
//             </h2>
//             <p className="text-gray-600 text-lg max-w-2xl mx-auto">
//               Real experiences from our amazing customers
//             </p>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-10">
//             {[
//               {
//                 name: "Priya Patel",
//                 role: "Homemaker",
//                 city: "Vadodara",
//                 review:
//                   "The cotton quality of Krambica clothing is exceptional. Finally found comfortable daily wear that doesn't compromise on style or my budget!",
//                 image:
//                   "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&h=200&q=80",
//               },
//               {
//                 name: "Sneha Mehta",
//                 role: "Teacher",
//                 city: "Bhavnagar",
//                 review:
//                   "I love that Krambica focuses on real comfort. The fabric breathes so well, and I can wear their clothes all day without any discomfort.",
//                 image:
//                   "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=200&h=200&q=80",
//               },
//               {
//                 name: "Anjali Shah",
//                 role: "Working Professional",
//                 city: "Gujarat",
//                 review:
//                   "Pure cotton at honest prices — that's rare to find these days. Krambica delivers exactly what they promise. Highly recommend!",
//                 image:
//                   "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=200&h=200&q=80",
//               },
//             ].map((item, i) => (
//               <div
//                 key={i}
//                 className="group bg-white rounded-2xl sm:rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-2 border-gray-100 hover:border-teal-300"
//               >
//                 {/* Stars - Enhanced */}
//                 <div className="flex gap-1 mb-6">
//                   {[...Array(5)].map((_, j) => (
//                     <Star
//                       key={j}
//                       className="w-6 h-6 fill-amber-400 text-amber-400 group-hover:scale-110 transition-transform"
//                       style={{ transitionDelay: `${j * 50}ms` }}
//                     />
//                   ))}
//                 </div>

//                 {/* Review - Enhanced */}
//                 <div className="relative">
//                   <Quote className="absolute -top-2 -left-2 w-8 h-8 text-teal-100 group-hover:text-teal-200 transition-colors" />
//                   <p className="text-gray-700 text-lg leading-relaxed mb-8 pl-4 italic">
//                     "{item.review}"
//                   </p>
//                 </div>

//                 {/* Customer Info - Enhanced */}
//                 <div className="flex items-center gap-4 pt-6 border-t border-gray-100">
//                   <div className="relative">
//                     <img
//                       src={item.image}
//                       alt={item.name}
//                       className="w-16 h-16 rounded-full object-cover border-2 border-teal-200 group-hover:border-teal-400 transition-colors"
//                     />
//                     <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-teal-500 rounded-full border-2 border-white flex items-center justify-center">
//                       <CheckCircle className="w-3 h-3 text-white" />
//                     </div>
//                   </div>
//                   <div>
//                     <p className="font-bold text-gray-900 text-lg">
//                       {item.name}
//                     </p>
//                     <p className="text-gray-600">
//                       {item.role}, {item.city}
//                     </p>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* CTA Section - Enhanced */}
//       <div className="py-16 sm:py-20 md:py-28 bg-gradient-to-r from-teal-700 via-teal-600 to-teal-800">
//         <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
//           {/* Icon - Enhanced */}
//           <div className="relative inline-block mb-8">
//             <Heart className="w-20 h-20 sm:w-24 sm:h-24 text-white mx-auto animate-pulse" />
//             <div className="absolute inset-0 bg-gradient-to-r from-teal-400 to-cyan-400 rounded-full blur-2xl opacity-30 animate-pulse"></div>
//           </div>

//           {/* Heading - Enhanced */}
//           <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6">
//             Experience True Comfort
//           </h2>

//           {/* Description - Enhanced */}
//           <p className="text-xl text-teal-100/90 mb-10 max-w-2xl mx-auto leading-relaxed">
//             Join thousands who have discovered the comfort of pure cotton
//             clothing at honest prices
//           </p>

//           {/* Button - Enhanced */}
//           <button className="group relative inline-flex items-center gap-4 bg-white text-teal-700 px-10 py-5 rounded-2xl font-bold text-lg hover:shadow-2xl hover:shadow-white/20 transition-all duration-300 hover:-translate-y-1 overflow-hidden">
//             <div className="absolute inset-0 bg-gradient-to-r from-white to-teal-50 opacity-100 group-hover:opacity-0 transition-opacity"></div>
//             <ShoppingBag className="w-6 h-6 relative z-10 group-hover:scale-110 transition-transform" />
//             <span className="relative z-10">Shop Now</span>
//             <ChevronRight className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform" />
//             <div className="absolute -inset-1 bg-white/20 rounded-2xl blur-sm group-hover:blur-md transition-all"></div>
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AboutPage;

"use client";
import React, { useState, useEffect, useRef } from "react";
import { MdEco, MdContentCut, MdStars } from "react-icons/md";
import {
  IoPlayCircleSharp,
  IoChevronBack,
  IoChevronForward,
} from "react-icons/io5";
import {
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaEnvelope,
  FaStar,
  FaPause,
} from "react-icons/fa";
import { FiInstagram, FiFacebook } from "react-icons/fi";
import { FaTiktok } from "react-icons/fa";

// Color Constants
const COLORS = {
  primary: {
    teal: "#0d9488",
    tealDark: "#0f766e",
    tealLight: "#5eead4",
    tealLighter: "#ccfbf1",
  },
  gradients: {
    primary: "linear-gradient(135deg, #0d9488 0%, #0f766e 100%)",
    primaryHover: "linear-gradient(135deg, #0f766e 0%, #115e59 100%)",
    light: "linear-gradient(135deg, #ccfbf1 0%, #99f6e4 100%)",
    dark: "linear-gradient(135deg, #115e59 0%, #134e4a 100%)",
  },
};

// Reusable Button Component
const PrimaryButton = ({
  children,
  onClick,
  className = "",
  size = "md",
  ...props
}) => {
  const baseStyles =
    "text-white rounded-xl font-semibold hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5";
  const sizeStyles = {
    sm: "py-2 px-4 text-xs",
    md: "py-2.5 px-6 text-sm",
    lg: "py-3 px-8 text-base",
  };

  return (
    <button
      onClick={onClick}
      className={`${baseStyles} ${sizeStyles[size]} ${className}`}
      style={{
        background: COLORS.gradients.primary,
        borderRadius: "0.75rem",
        transition: "all 0.3s ease",
      }}
      onMouseEnter={(e) => {
        e.target.style.background = COLORS.gradients.primaryHover;
        e.target.style.transform = "translateY(-2px)";
      }}
      onMouseLeave={(e) => {
        e.target.style.background = COLORS.gradients.primary;
        e.target.style.transform = "translateY(0)";
      }}
      {...props}
    >
      {children}
    </button>
  );
};

// Hero Component
const Hero = () => {
  return (
    <section id="home" className="">
      <div className="grid md:grid-cols-2 gap-8 md:gap-12 px-4 md:px-16 py-8 md:py-16 items-center">
        <div className="text-center md:text-left">
          <h1 className="text-3xl md:text-5xl font-serif leading-tight mb-4 md:mb-6 text-gray-800">
            Curated Style for Every Occasion
          </h1>
          <p className="text-sm md:text-base leading-relaxed mb-6 md:mb-8 text-gray-600">
            We believe that style is a form of self-expression—it's how we
            present ourselves to the world. That's why we provide premium,
            sustainably made clothing for every taste and lifestyle.
          </p>
          <PrimaryButton className="mx-auto md:mx-0">
            Explore Collection
            <span className="text-xl ml-2">→</span>
          </PrimaryButton>
        </div>
        <div className="relative">
          <div className="grid grid-cols-2 gap-3 md:gap-4">
            <div className="bg-gray-300 h-40 md:h-48 rounded-xl md:rounded-2xl overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=400&h=500&fit=crop"
                alt="Casual outfit"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="bg-gray-300 h-40 md:h-48 rounded-xl md:rounded-2xl overflow-hidden mt-4 md:mt-8">
              <img
                src="https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=400&h=500&fit=crop"
                alt="Formal wear"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="bg-gray-300 h-40 md:h-48 rounded-xl md:rounded-2xl overflow-hidden -mt-2 md:-mt-4">
              <img
                src="https://images.unsplash.com/photo-1509631179647-0177331693ae?w=400&h=500&fit=crop"
                alt="Streetwear"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="bg-gray-300 h-40 md:h-48 rounded-xl md:rounded-2xl overflow-hidden mt-2 md:mt-4">
              <img
                src="https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=400&h=500&fit=crop"
                alt="Accessories"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Mission Component
const Mission = () => {
  return (
    <section
      id="mission"
      className="text-white py-12 md:py-20 px-4 md:px-16"
      style={{ background: COLORS.gradients.dark }}
    >
      <div className="text-center mb-12 md:mb-16">
        <h2 className="text-2xl md:text-4xl font-serif mb-1">
          Our mission to inspire
        </h2>
        <h2 className="text-2xl md:text-4xl font-serif">through style!</h2>
      </div>

      <div className="flex justify-center mb-12 md:mb-16 relative h-48 md:h-80">
        <div className="absolute top-4 md:top-8 left-4 md:left-1/4 w-32 h-40 md:w-56 md:h-64 bg-white rounded-xl md:rounded-2xl overflow-hidden transform -rotate-3 md:-rotate-6 shadow-lg">
          <img
            src="https://images.unsplash.com/photo-1445205170230-053b83016050?w=400&h=500&fit=crop"
            alt="Sustainable fabrics"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute top-0 right-4 md:right-1/4 w-32 h-40 md:w-56 md:h-64 bg-white rounded-xl md:rounded-2xl overflow-hidden transform rotate-3 md:rotate-6 shadow-lg">
          <img
            src="https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=400&h=500&fit=crop"
            alt="Design studio"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute top-8 md:top-16 left-1/2 transform -translate-x-1/2 w-36 h-44 md:w-64 md:h-72 bg-white rounded-xl md:rounded-2xl overflow-hidden z-10 shadow-xl">
          <img
            src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=400&h=500&fit=crop"
            alt="Model wearing collection"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 max-w-6xl mx-auto mt-8 md:mt-12">
        <div className="text-center">
          <div
            className="w-12 h-12 md:w-16 md:h-16 rounded-full mx-auto mb-2 md:mb-4 flex items-center justify-center text-xl md:text-3xl"
            style={{ background: COLORS.gradients.primary }}
          >
            <MdEco className="text-white" />
          </div>
          <p className="text-xs md:text-sm">Sustainable Materials</p>
        </div>
        <div className="text-center">
          <div
            className="w-12 h-12 md:w-16 md:h-16 rounded-full mx-auto mb-2 md:mb-4 flex items-center justify-center text-xl md:text-3xl"
            style={{ background: COLORS.gradients.primary }}
          >
            <MdContentCut className="text-white" />
          </div>
          <p className="text-xs md:text-sm">Artisan Craftsmanship</p>
        </div>
        <div className="text-center">
          <div
            className="w-12 h-12 md:w-16 md:h-16 rounded-full mx-auto mb-2 md:mb-4 flex items-center justify-center text-xl md:text-3xl"
            style={{ background: COLORS.gradients.primary }}
          >
            <MdContentCut className="text-white" />
          </div>
          <p className="text-xs md:text-sm">Eco-Friendly Packaging</p>
        </div>
        <div className="text-center">
          <div
            className="w-12 h-12 md:w-16 md:h-16 rounded-full mx-auto mb-2 md:mb-4 flex items-center justify-center text-xl md:text-3xl"
            style={{ background: COLORS.gradients.primary }}
          >
            <MdStars className="text-white" />
          </div>
          <p className="text-xs md:text-sm">Personal Styling</p>
        </div>
      </div>
    </section>
  );
};

// TextSection
const TextSection = () => {
  return (
    <section className="px-4 md:px-16 py-12 md:py-20">
      <p className="text-xl md:text-4xl font-serif text-gray-800 leading-relaxed max-w-4xl">
        Whatever you're wearing, let us provide the style. Premium quality and
        sustainable. Ethically made clothing for every lifestyle preference.
      </p>
    </section>
  );
};

// StoryImpact
const StoryImpact = () => {
  return (
    <section
      id="story"
      className="grid md:grid-cols-2 gap-8 md:gap-16 px-4 md:px-16 py-12 md:py-20"
      style={{ background: COLORS.gradients.light }}
    >
      <div className="relative flex items-center justify-center">
        <div className="w-64 h-64 md:w-96 md:h-96 rounded-full overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1445205170230-053b83016050?w=600&h=600&fit=crop"
            alt="Designer at work"
            className="w-full h-full object-cover"
          />
        </div>
        <div
          className="absolute bottom-4 right-4 md:bottom-8 md:right-8 w-40 h-40 md:w-64 md:h-64 rounded-full overflow-hidden border-4 md:border-8 shadow-xl"
          style={{ borderColor: COLORS.primary.tealLighter }}
        >
          <img
            src="https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=400&h=400&fit=crop"
            alt="Sustainable fabrics"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      <div className="flex flex-col justify-center">
        <h2 className="text-2xl md:text-4xl font-serif text-gray-800 mb-2">
          A Story Built on Impact
        </h2>
        <h2 className="text-2xl md:text-4xl font-serif text-gray-800 mb-4 md:mb-6">
          And Sustainability.
        </h2>
        <p className="text-gray-600 leading-relaxed mb-6 md:mb-10 text-sm md:text-base">
          Sourcing materials from ethical producers and supporting fair trade
          practices, we're committed to protecting our planet while dressing
          people in style.
        </p>

        <div className="space-y-6 md:space-y-8">
          <div
            className="border-l-2 pl-4 md:pl-6"
            style={{ borderColor: COLORS.primary.teal }}
          >
            <h3 className="text-base md:text-lg font-semibold text-gray-800 mb-1 md:mb-2">
              Authenticity
            </h3>
            <p className="text-xs md:text-sm text-gray-600 leading-relaxed">
              At the heart of our brand is authenticity by utilizing traditional
              craftsmanship and quality materials.
            </p>
          </div>

          <div
            className="border-l-2 pl-4 md:pl-6"
            style={{ borderColor: COLORS.primary.teal }}
          >
            <h3 className="text-base md:text-lg font-semibold text-gray-800 mb-1 md:mb-2">
              Community
            </h3>
            <p className="text-xs md:text-sm text-gray-600 leading-relaxed">
              Building connections with local artisans, ethical suppliers, and
              loyal customers who share our passion for sustainable fashion.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

// VideoSection
const VideoSection = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Handle video time updates
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const updateTime = () => setCurrentTime(video.currentTime);
    const updateDuration = () => setDuration(video.duration);
    const handleLoadedData = () => setIsLoaded(true);
    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);

    video.addEventListener("timeupdate", updateTime);
    video.addEventListener("loadedmetadata", updateDuration);
    video.addEventListener("loadeddata", handleLoadedData);
    video.addEventListener("play", handlePlay);
    video.addEventListener("pause", handlePause);

    return () => {
      video.removeEventListener("timeupdate", updateTime);
      video.removeEventListener("loadedmetadata", updateDuration);
      video.removeEventListener("loadeddata", handleLoadedData);
      video.removeEventListener("play", handlePlay);
      video.removeEventListener("pause", handlePause);
    };
  }, []);

  const handlePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
    }
  };

  const handleVideoClick = () => {
    handlePlay();
  };

  const handleEnded = () => {
    setIsPlaying(false);
    // Reset video to beginning
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
    }
  };

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    const progressBar = e.currentTarget;
    const rect = progressBar.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const percentage = clickX / rect.width;

    if (videoRef.current && duration) {
      videoRef.current.currentTime = percentage * duration;
    }
  };

  const formatTime = (seconds: number) => {
    if (!seconds || isNaN(seconds)) return "0:00";
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${String(secs).padStart(2, "0")}`;
  };

  const progress = duration ? (currentTime / duration) * 100 : 0;

  return (
    <section className="px-4 md:px-16 py-12 md:py-20 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-2xl md:text-4xl font-serif text-gray-800 mb-2 md:mb-4">
            Discover Our Craft
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto leading-relaxed text-sm md:text-base">
            Watch how we transform sustainable materials into beautiful clothing
            with passion, care, and dedication to ethical practices.
          </p>
        </div>

        <div
          ref={containerRef}
          className="relative rounded-xl md:rounded-3xl overflow-hidden shadow-lg md:shadow-2xl bg-gray-900 aspect-video cursor-pointer group"
          onClick={handleVideoClick}
        >
          {/* Video Element */}
          <video
            ref={videoRef}
            className="w-full h-full object-cover"
            poster="https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=1200&h=675&fit=crop"
            onEnded={handleEnded}
            preload="metadata"
            playsInline
            loop={false}
          >
            <source
              src="https://assets.mixkit.co/videos/preview/mixkit-hands-of-a-potter-making-a-vase-52375-large.mp4"
              type="video/mp4"
            />
            Your browser does not support the video tag.
          </video>

          {/* Overlay - Show when not playing or when video ended */}
          {!isPlaying && (
            <div className="absolute inset-0 bg-black/50 group-hover:bg-black/60 transition-all">
              {/* Thumbnail Image */}
              <img
                src="https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=1200&h=675&fit=crop"
                alt="Video thumbnail"
                className="w-full h-full object-cover opacity-80"
              />

              {/* Play Button */}
              <div className="absolute inset-0 flex items-center justify-center">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handlePlay();
                  }}
                  className="relative group/btn"
                  aria-label="Play video"
                >
                  <div
                    className="w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center shadow-xl hover:scale-110 active:scale-95 transition-all duration-300 transform group-hover:scale-105"
                    style={{
                      background:
                        "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                    }}
                  >
                    <IoPlayCircleSharp className="w-12 h-12 md:w-16 md:h-16 text-white ml-1" />
                  </div>
                </button>
              </div>

              {/* Video Info */}
              <div className="absolute bottom-4 left-4 md:bottom-8 md:left-8 text-white">
                <p className="text-xs md:text-sm font-medium mb-1">
                  Watch Our Process
                </p>
                <p className="text-xs opacity-80">
                  {duration ? formatTime(duration) : "Loading..."}
                </p>
              </div>
            </div>
          )}

          {/* Video Controls - Show when playing and on hover */}
          {isPlaying && (
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent p-3 md:p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="flex items-center gap-3 md:gap-4">
                {/* Play/Pause Button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handlePlay();
                  }}
                  className="text-white hover:text-gray-300 transition-colors flex-shrink-0"
                  aria-label={isPlaying ? "Pause" : "Play"}
                >
                  {isPlaying ? (
                    <FaPause className="w-5 h-5 md:w-6 md:h-6" />
                  ) : (
                    <IoPlayCircleSharp className="w-5 h-5 md:w-6 md:h-6" />
                  )}
                </button>

                {/* Progress Bar */}
                <div className="flex-1">
                  <div
                    className="h-1 md:h-1.5 bg-gray-600 rounded-full overflow-hidden cursor-pointer group/progress"
                    onClick={handleProgressClick}
                  >
                    <div
                      className="h-full bg-white transition-all duration-100 relative"
                      style={{ width: `${progress}%` }}
                    >
                      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full opacity-0 group-hover/progress:opacity-100 transition-opacity" />
                    </div>
                  </div>
                </div>

                {/* Time Display */}
                <div className="text-white text-xs md:text-sm font-medium flex-shrink-0">
                  <span>{formatTime(currentTime)}</span>
                  <span className="opacity-60 mx-1">/</span>
                  <span>{formatTime(duration)}</span>
                </div>
              </div>
            </div>
          )}

          {/* Loading Indicator */}
          {isPlaying && !isLoaded && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/80">
              <div className="w-12 h-12 border-4 border-white/30 border-t-white rounded-full animate-spin" />
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
// JourneyItem Component
const JourneyItem = ({
  year,
  title,
  description,
  image,
  side,
}: {
  year: string;
  title: string;
  description: string;
  image: string;
  side: string;
}) => {
  return (
    <div
      className={`grid md:grid-cols-2 gap-8 md:gap-16 items-center ${
        side === "right" ? "md:flex-row-reverse" : ""
      }`}
    >
      {side === "left" ? (
        <>
          <div className="text-center md:text-right">
            <div className="inline-block bg-white rounded-xl md:rounded-2xl shadow-lg p-6 md:p-8 hover:shadow-xl transition w-full">
              <span
                className="font-bold text-xs md:text-sm mb-2 block"
                style={{ color: COLORS.primary.teal }}
              >
                {year}
              </span>
              <h3 className="text-xl md:text-2xl font-serif text-gray-800 mb-2 md:mb-3">
                {title}
              </h3>
              <p className="text-gray-600 leading-relaxed text-sm md:text-base">
                {description}
              </p>
            </div>
          </div>
          <div className="relative">
            <div
              className="hidden md:block absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-1/2 w-4 h-4 rounded-full border-4 border-white z-10"
              style={{ background: COLORS.gradients.primary }}
            ></div>
            <img
              src={image}
              alt={title}
              className="rounded-xl md:rounded-2xl shadow-lg w-full h-48 md:h-64 object-cover"
            />
          </div>
        </>
      ) : (
        <>
          <div className="relative">
            <img
              src={image}
              alt={title}
              className="rounded-xl md:rounded-2xl shadow-lg w-full h-48 md:h-64 object-cover"
            />
            <div
              className="hidden md:block absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-1/2 w-4 h-4 rounded-full border-4 border-white z-10"
              style={{ background: COLORS.gradients.primary }}
            ></div>
          </div>
          <div>
            <div className="inline-block bg-white rounded-xl md:rounded-2xl shadow-lg p-6 md:p-8 hover:shadow-xl transition w-full">
              <span
                className="font-bold text-xs md:text-sm mb-2 block"
                style={{ color: COLORS.primary.teal }}
              >
                {year}
              </span>
              <h3 className="text-xl md:text-2xl font-serif text-gray-800 mb-2 md:mb-3">
                {title}
              </h3>
              <p className="text-gray-600 leading-relaxed text-sm md:text-base">
                {description}
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

// Journey Component
const Journey = () => {
  return (
    <section
      id="journey"
      className="px-4 md:px-16 py-12 md:py-20"
      style={{ background: COLORS.gradients.light }}
    >
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-2xl md:text-4xl font-serif text-gray-800 mb-2 md:mb-4">
            Our Journey
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-sm md:text-base">
            From a small studio to dressing thousands, here's how we grew while
            staying true to our sustainable values
          </p>
        </div>

        <div className="relative">
          <div
            className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-1 h-full"
            style={{ background: COLORS.gradients.primary }}
          ></div>

          <div className="space-y-8 md:space-y-24">
            <JourneyItem
              year="2018"
              title="The Beginning"
              description="Started with a passion for sustainable fashion and a small studio. Our first collection was born from the desire to make ethical clothing accessible."
              image="https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=500&h=350&fit=crop"
              side="left"
            />
            <JourneyItem
              year="2020"
              title="Rapid Growth"
              description="Expanded to serve 500+ customers monthly. Partnered with ethical factories to ensure fair labor practices and support artisan communities."
              image="https://images.unsplash.com/photo-1445205170230-053b83016050?w=500&h=350&fit=crop"
              side="right"
            />
            <JourneyItem
              year="2022"
              title="Sustainability Focus"
              description="Achieved 100% sustainable packaging and carbon-neutral shipping. Our commitment to the environment became stronger than ever."
              image="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=500&h=350&fit=crop"
              side="left"
            />
            <JourneyItem
              year="2025"
              title="Today & Beyond"
              description="Dressing 5,000+ happy customers with 50+ sustainable collections. Our journey continues as we innovate and grow while staying true to our roots."
              image="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=500&h=350&fit=crop"
              side="right"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

// Collections Component
const Collections = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const totalSlides = 6;

  const collections = [
    {
      image:
        "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1200&h=600&fit=crop",
      title: "Spring Collection",
      description: "Light layers & fresh colors",
    },
    {
      image:
        "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=1200&h=600&fit=crop",
      title: "Evening Wear",
      description: "Elegant styles for special occasions",
    },
    {
      image:
        "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=1200&h=600&fit=crop",
      title: "Sustainable Basics",
      description: "Everyday essentials done right",
    },
    {
      image:
        "https://images.unsplash.com/photo-1445205170230-053b83016050?w=1200&h=600&fit=crop",
      title: "Artisan Collection",
      description: "Handcrafted with care",
    },
    {
      image:
        "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=1200&h=600&fit=crop",
      title: "Street Style",
      description: "Urban looks for city life",
    },
    {
      image:
        "https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=1200&h=600&fit=crop",
      title: "Accessories",
      description: "Complete your look",
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % totalSlides);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const nextSlide = () => setCurrentIndex((prev) => (prev + 1) % totalSlides);
  const prevSlide = () =>
    setCurrentIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
  const goToSlide = (index: number) => setCurrentIndex(index);

  return (
    <section
      id="collections"
      className="px-4 md:px-16 py-12 md:py-20 bg-[#e8dfd3]"
    >
      <h2 className="text-2xl md:text-4xl font-serif text-center text-gray-800 mb-8 md:mb-12">
        Our Collections
      </h2>
      <div className="max-w-6xl mx-auto relative">
        <div className="overflow-hidden rounded-xl md:rounded-3xl">
          <div
            className="flex transition-transform duration-500 ease-out"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {collections.map((collection, index) => (
              <div
                key={index}
                className="min-w-full h-64 md:h-96 flex-shrink-0 relative"
              >
                <img
                  src={collection.image}
                  alt={collection.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-4 left-4 md:bottom-8 md:left-8 bg-white bg-opacity-90 rounded-lg md:rounded-xl p-3 md:p-4 shadow-lg">
                  <h3 className="text-lg md:text-xl font-semibold text-gray-800 mb-1">
                    {collection.title}
                  </h3>
                  <p className="text-xs md:text-sm text-gray-600">
                    {collection.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <button
          onClick={prevSlide}
          className="absolute left-2 md:left-4 top-1/2 transform -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-100 transition z-10"
        >
          <IoChevronBack className="w-5 h-5 md:w-6 md:h-6 text-gray-800" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-2 md:right-4 top-1/2 transform -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-100 transition z-10"
        >
          <IoChevronForward className="w-5 h-5 md:w-6 md:h-6 text-gray-800" />
        </button>

        <div className="flex justify-center gap-2 mt-4 md:mt-6">
          {collections.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-2 h-2 md:w-3 md:h-3 rounded-full transition ${
                index === currentIndex ? "bg-[#1a7d7d]" : "bg-gray-400"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

// Customer Reviews Slider Component
const CustomerReviews = () => {
  const [currentReview, setCurrentReview] = useState(0);

  const reviews = [
    {
      name: "Sarah Johnson",
      role: "Fashion Blogger",
      review:
        "The quality and comfort of StyleThread clothing is unmatched. Finally found sustainable fashion that doesn't compromise on style!",
      rating: 5,
      image:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&h=400&q=80",
    },
    {
      name: "Michael Chen",
      role: "Environmental Activist",
      review:
        "As someone who cares deeply about sustainability, I appreciate StyleThread's commitment to ethical production and quality materials.",
      rating: 5,
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&h=400&q=80",
    },
    {
      name: "Emma Rodriguez",
      role: "Marketing Director",
      review:
        "Every piece I've purchased from StyleThread has exceeded my expectations. The fit, comfort, and style are perfect for my professional life.",
      rating: 5,
      image:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=400&h=400&q=80",
    },
    {
      name: "David Park",
      role: "Software Engineer",
      review:
        "Comfortable, stylish, and sustainable - exactly what I was looking for. The quality is evident in every stitch.",
      rating: 5,
      image:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=400&h=400&q=80",
    },
    {
      name: "Lisa Thompson",
      role: "University Professor",
      review:
        "StyleThread understands that comfort doesn't have to be boring. Their pieces are both practical and fashionable.",
      rating: 5,
      image:
        "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=400&h=400&q=80",
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentReview((prev) => (prev + 1) % reviews.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const nextReview = () =>
    setCurrentReview((prev) => (prev + 1) % reviews.length);
  const prevReview = () =>
    setCurrentReview((prev) => (prev - 1 + reviews.length) % reviews.length);

  return (
    <section
      className="px-4 sm:px-6 md:px-16 py-12 sm:py-16 md:py-24"
      style={{ background: COLORS.gradients.light }}
    >
      <div className="max-w-6xl mx-auto">
        {/* Section Header - Mobile Optimized */}
        <div className="text-center mb-10 sm:mb-14 md:mb-20">
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 sm:px-5 sm:py-2 rounded-full mb-4 sm:mb-6 text-xs sm:text-sm"
            style={{
              background: "rgba(13, 148, 136, 0.1)",
              border: "1px solid rgba(13, 148, 136, 0.2)",
            }}
          >
            <FaStar
              className="w-3 h-3 sm:w-4 sm:h-4"
              style={{ color: COLORS.primary.teal }}
            />
            <span
              className="font-semibold"
              style={{ color: COLORS.primary.teal }}
            >
              TESTIMONIALS
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-5xl font-serif text-gray-900 mb-3 sm:mb-4">
            Loved by <span className="italic">Our Customers</span>
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-gray-600 max-w-2xl mx-auto px-2">
            Don't just take our word for it. Hear from people who've experienced
            StyleThread firsthand.
          </p>
        </div>

        {/* Main Review Card - Mobile Optimized */}
        <div className="relative mb-10 sm:mb-14 md:mb-20">
          <div className="relative">
            {/* Background Decorative Elements - Hidden on Mobile */}
            <div
              className="hidden md:block absolute -top-6 -left-6 w-32 h-32 rounded-full opacity-20"
              style={{ background: COLORS.gradients.primary }}
            ></div>
            <div
              className="hidden md:block absolute -bottom-6 -right-6 w-40 h-40 rounded-full opacity-20"
              style={{ background: COLORS.gradients.primary }}
            ></div>

            {/* Main Card - Stacked on Mobile */}
            <div className="relative bg-white rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl sm:shadow-2xl">
              {/* Mobile: Image Top, Content Bottom */}
              <div className="md:flex">
                {/* Left Side - Customer Image - Mobile Full Width */}
                <div className="md:w-2/5 relative">
                  <div className="h-48 sm:h-56 md:h-full relative overflow-hidden">
                    <img
                      src={reviews[currentReview].image}
                      alt={reviews[currentReview].name}
                      className="w-full h-full object-cover transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent md:from-black/20"></div>

                    {/* Floating Rating Badge - Mobile Smaller */}
                    <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 bg-white/90 backdrop-blur-sm rounded-xl sm:rounded-2xl px-3 py-2 sm:px-4 sm:py-3 shadow-lg">
                      <div className="flex items-center gap-1 sm:gap-2">
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <FaStar
                              key={i}
                              className="w-3 h-3 sm:w-4 sm:h-4 text-amber-400 fill-amber-400"
                            />
                          ))}
                        </div>
                        <span className="text-base sm:text-lg font-bold text-gray-900">
                          5.0
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Side - Review Content - Mobile Optimized */}
                <div className="md:w-3/5 p-5 sm:p-8 md:p-12">
                  {/* Quote Icon - Mobile Smaller */}
                  <div className="mb-4 sm:mb-6">
                    <div
                      className="w-12 h-12 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl flex items-center justify-center mb-4 sm:mb-6"
                      style={{ background: COLORS.gradients.primary }}
                    >
                      <svg
                        className="w-6 h-6 sm:w-8 sm:h-8 text-white"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                      </svg>
                    </div>
                  </div>

                  {/* Review Text - Mobile Smaller */}
                  <p className="text-lg sm:text-xl md:text-2xl leading-relaxed sm:leading-relaxed text-gray-800 mb-6 sm:mb-8 font-light">
                    "{reviews[currentReview].review}"
                  </p>

                  {/* Customer Info - Mobile Optimized */}
                  <div className="border-t border-gray-100 pt-6 sm:pt-8">
                    <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-1 sm:mb-2">
                      {reviews[currentReview].name}
                    </h3>
                    <p className="text-gray-600 text-sm sm:text-base">
                      {reviews[currentReview].role}
                    </p>
                  </div>

                  {/* Review Counter - Mobile Smaller */}
                  <div className="mt-6 text-xs sm:text-sm text-gray-500">
                    Review {currentReview + 1} of {reviews.length}
                  </div>
                </div>
              </div>
            </div>

            {/* Navigation Buttons - Mobile Optimized */}
            <button
              onClick={prevReview}
              className="absolute -left-2 sm:-left-4 md:-left-6 top-1/2 transform -translate-y-1/2 w-8 h-8 sm:w-10 sm:h-10 md:w-14 md:h-14 bg-white rounded-full shadow-lg sm:shadow-xl flex items-center justify-center hover:scale-110 active:scale-95 transition-all duration-300 z-10 group"
              style={{ border: `2px solid ${COLORS.primary.tealLight}` }}
            >
              <IoChevronBack className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-gray-700 group-hover:scale-110 transition-transform" />
            </button>
            <button
              onClick={nextReview}
              className="absolute -right-2 sm:-right-4 md:-right-6 top-1/2 transform -translate-y-1/2 w-8 h-8 sm:w-10 sm:h-10 md:w-14 md:h-14 bg-white rounded-full shadow-lg sm:shadow-xl flex items-center justify-center hover:scale-110 active:scale-95 transition-all duration-300 z-10 group"
              style={{ border: `2px solid ${COLORS.primary.tealLight}` }}
            >
              <IoChevronForward className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-gray-700 group-hover:scale-110 transition-transform" />
            </button>
          </div>
        </div>

        {/* Review Thumbnails - Mobile Optimized */}
        <div className="flex justify-center gap-3 sm:gap-4 mb-8 sm:mb-12 overflow-x-auto py-2 px-2 -mx-2">
          {reviews.map((review, index) => (
            <button
              key={index}
              onClick={() => setCurrentReview(index)}
              className={`flex-shrink-0 relative transition-all duration-300 ${
                index === currentReview
                  ? "scale-105 sm:scale-110"
                  : "opacity-70 hover:opacity-100"
              }`}
            >
              <div className="relative">
                <img
                  src={review.image}
                  alt={review.name}
                  className={`w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full object-cover border-3 sm:border-4 transition-all ${
                    index === currentReview
                      ? "border-white shadow-lg sm:shadow-xl"
                      : "border-transparent"
                  }`}
                  style={{
                    borderColor:
                      index === currentReview ? COLORS.primary.teal : undefined,
                  }}
                />
                {index === currentReview && (
                  <div
                    className="absolute inset-0 rounded-full animate-ping"
                    style={{ background: COLORS.primary.teal, opacity: 0.3 }}
                  ></div>
                )}
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

// AboutPage Component
const AboutPage = () => {
  return (
    <section id="about" className="px-4 md:px-16 py-12 md:py-20 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12 md:mb-16">
          <h1 className="text-3xl md:text-5xl font-serif text-gray-800 mb-4 md:mb-6">
            About StyleThread
          </h1>
          <p className="text-gray-600 max-w-3xl mx-auto text-sm md:text-base leading-relaxed">
            Founded on the principles of sustainability and style, StyleThread
            redefines fashion by merging ethical practices with contemporary
            design. Our journey began with a simple idea: fashion shouldn't cost
            the earth.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 md:gap-12 mb-12 md:mb-16">
          <div
            className="rounded-2xl p-6 md:p-8 border-2"
            style={{
              background: COLORS.gradients.light,
              borderColor: COLORS.primary.tealLight,
            }}
          >
            <h3 className="text-xl md:text-2xl font-serif text-gray-800 mb-4">
              Our Vision
            </h3>
            <p className="text-gray-600 text-sm md:text-base leading-relaxed">
              To create a world where sustainable fashion is the norm, not the
              exception. We envision a future where every garment tells a story
              of ethical craftsmanship and environmental responsibility.
            </p>
          </div>
          <div
            className="rounded-2xl p-6 md:p-8 border-2"
            style={{
              background: COLORS.gradients.light,
              borderColor: COLORS.primary.tealLight,
            }}
          >
            <h3 className="text-xl md:text-2xl font-serif text-gray-800 mb-4">
              Our Values
            </h3>
            <ul className="text-gray-600 text-sm md:text-base space-y-2">
              {[
                "Ethical Production",
                "Sustainable Materials",
                "Transparent Supply Chain",
                "Community Empowerment",
              ].map((value, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span style={{ color: COLORS.primary.teal }}>✓</span>
                  <span>{value}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6 md:gap-8">
          {[
            { number: "5,000+", label: "Happy Customers" },
            { number: "50+", label: "Collections" },
            { number: "100%", label: "Sustainable Packaging" },
          ].map((stat, index) => (
            <div key={index} className="text-center">
              <div
                className="text-3xl md:text-4xl font-bold mb-2"
                style={{ color: COLORS.primary.teal }}
              >
                {stat.number}
              </div>
              <p className="text-gray-600 text-sm">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// CTA Component
const CTA = () => {
  return (
    <section
      className="text-center px-4 md:px-16 py-12 md:py-24"
      style={{ background: COLORS.gradients.dark }}
    >
      <div className="flex items-center justify-center gap-2 mb-4 md:mb-6">
        <div
          className="w-8 h-8 rounded-full"
          style={{ background: COLORS.gradients.primary }}
        ></div>
        <span className="font-semibold text-white text-sm md:text-base">
          StyleThread
        </span>
      </div>
      <h2 className="text-2xl md:text-4xl font-serif text-white mb-3 md:mb-4">
        Don't Wait – Shop Now!
      </h2>
      <p className="text-white/90 mb-6 md:mb-8 max-w-2xl mx-auto leading-relaxed text-sm md:text-base">
        Elevate your wardrobe with our sustainable collections. We bring the
        quality of ethical production and the excellence of timeless design.
      </p>
      <PrimaryButton size="lg">Shop Collection →</PrimaryButton>
    </section>
  );
};

// Footer Component
const Footer = () => {
  return (
    <footer className="bg-[#f5ede3] px-4 md:px-16 py-8 md:py-12">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-12 mb-8 md:mb-12">
        <div>
          <h3 className="font-semibold mb-3 md:mb-4 text-gray-800 text-xs md:text-sm">
            Contact
          </h3>
          <div className="space-y-3 text-sm text-gray-700">
            <p className="flex items-center gap-3">
              <span
                className="w-8 h-8 rounded-full flex items-center justify-center text-white"
                style={{ background: COLORS.gradients.primary }}
              >
                <FaPhoneAlt className="w-4 h-4" />
              </span>
              +1 (800) STYLE-00
            </p>
            <p className="flex items-start gap-3">
              <span
                className="w-8 h-8 rounded-full flex items-center justify-center text-white"
                style={{ background: COLORS.gradients.primary }}
              >
                <FaMapMarkerAlt className="w-4 h-4" />
              </span>
              <span className="text-sm">
                456 Fashion Avenue Suite 890
                <br />
                New York, NY 10001
              </span>
            </p>
            <p className="flex items-center gap-3">
              <span
                className="w-8 h-8 rounded-full flex items-center justify-center text-white"
                style={{ background: COLORS.gradients.primary }}
              >
                <FaEnvelope className="w-4 h-4" />
              </span>
              style@stylethread.com
            </p>
          </div>
        </div>

        <div>
          <h3 className="font-semibold mb-3 md:mb-4 text-gray-800 text-xs md:text-sm">
            Navigate
          </h3>
          <ul className="space-y-2 text-sm text-gray-700">
            {["Home", "Collections", "About", "Contact"].map((item, index) => (
              <li key={index}>
                <a
                  href={`#${item.toLowerCase()}`}
                  className="hover:text-gray-900"
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-semibold mb-3 md:mb-4 text-gray-800 text-xs md:text-sm">
            Collections
          </h3>
          <ul className="space-y-2 text-sm text-gray-700">
            {["Men's", "Women's", "Accessories", "Sustainable"].map(
              (item, index) => (
                <li key={index}>
                  <a href="#" className="hover:text-gray-900">
                    {item}
                  </a>
                </li>
              )
            )}
          </ul>
        </div>

        <div>
          <h3 className="font-semibold mb-3 md:mb-4 text-gray-800 text-xs md:text-sm">
            Follow Us
          </h3>
          <div className="flex gap-4">
            <a
              href="#"
              className="w-10 h-10 rounded-full flex items-center justify-center text-white hover:scale-110 transition-transform"
              style={{ background: COLORS.gradients.primary }}
            >
              <FiInstagram className="w-5 h-5" />
            </a>
            <a
              href="#"
              className="w-10 h-10 rounded-full flex items-center justify-center text-white hover:scale-110 transition-transform"
              style={{ background: COLORS.gradients.primary }}
            >
              <FiFacebook className="w-5 h-5" />
            </a>
            <a
              href="#"
              className="w-10 h-10 rounded-full flex items-center justify-center text-white hover:scale-110 transition-transform"
              style={{ background: COLORS.gradients.primary }}
            >
              <FaTiktok className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-center pt-6 md:pt-8 border-t border-gray-400 text-xs text-gray-600 gap-4 md:gap-0">
        <p className="text-center md:text-left">
          © 2025 StyleThread. All rights reserved.
        </p>
        <div className="flex gap-4 md:gap-6">
          <a href="#" className="hover:text-gray-900 text-xs">
            Privacy Policy
          </a>
          <a href="#" className="hover:text-gray-900 text-xs">
            Terms of Service
          </a>
          <a href="#" className="hover:text-gray-900 text-xs">
            Sustainability
          </a>
        </div>
      </div>
    </footer>
  );
};

// Main App Component
const App = () => {
  return (
    <div className="bg-white mt-16 mb-14 md:mt-0 md:mb-0">
      <Hero />
      <Mission />
      <TextSection />
      <StoryImpact />
      <VideoSection />
      <Journey />
      <AboutPage />
      <CustomerReviews />
      <CTA />
    </div>
  );
};

export default App;
