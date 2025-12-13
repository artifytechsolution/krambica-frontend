"use client";
import React, { useState } from "react";
import {
  Sparkles,
  Target,
  Eye,
  Award,
  Users,
  Heart,
  Leaf,
  TrendingUp,
  ShoppingBag,
  Store,
  Headphones,
  DollarSign,
  CheckCircle,
  Star,
  Quote,
  Zap,
  Shield,
  Globe,
  ArrowRight,
  Calendar,
  MapPin,
  Factory,
  Home,
  Package,
  ChevronRight,
  BookOpen,
  Trophy,
  Users2,
} from "lucide-react";

const AboutPage = () => {
  const [activeTimeline, setActiveTimeline] = useState(null);

  // Color constants
  const primaryTextColor =
    "bg-gradient-to-r from-teal-600 to-teal-800 bg-clip-text text-transparent";
  const secondaryTextColor = "text-gray-700";
  const accentColor = "from-teal-600 to-teal-800";
  const lightAccentColor = "from-teal-50 to-teal-100";
  const heroGradient = "from-teal-700 via-teal-600 to-teal-800";

  return (
    <div className="bg-gradient-to-b from-white via-teal-50/20 to-white min-h-screen">
      {/* Hero Section - Enhanced */}
      <div
        className={`relative bg-gradient-to-br ${heroGradient} text-white py-16 sm:py-24 md:py-32 overflow-hidden`}
      >
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.2)_1px,transparent_1px)] bg-[size:60px_60px]"></div>
        </div>

        {/* Animated Background Elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-teal-400/20 rounded-full filter blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-cyan-300/10 rounded-full filter blur-3xl animate-pulse animation-delay-2000"></div>
          <div className="absolute top-1/3 right-1/3 w-48 h-48 bg-white/5 rounded-full filter blur-2xl animate-pulse animation-delay-1000"></div>
        </div>

        {/* Hero content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            {/* Badge - Enhanced */}
            <div className="inline-flex items-center gap-3 bg-white/15 backdrop-blur-lg px-5 sm:px-7 py-2.5 sm:py-3.5 rounded-full mb-8 border border-white/20 shadow-lg hover:shadow-xl transition-shadow duration-300 group">
              <div className="relative">
                <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 animate-pulse group-hover:rotate-12 transition-transform" />
                <div className="absolute -inset-1 bg-white/10 rounded-full blur-sm"></div>
              </div>
              <span className="text-sm sm:text-base font-semibold uppercase tracking-wider">
                Our Story
              </span>
            </div>

            {/* Heading - Enhanced */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6">
              <span className="text-white drop-shadow-lg">About</span>
              <span className="block text-transparent bg-gradient-to-r from-teal-200 via-cyan-200 to-white bg-clip-text drop-shadow-lg">
                Krambica
              </span>
            </h1>

            {/* Subtitle - Enhanced */}
            <div className="relative inline-block">
              <p className="text-lg sm:text-xl md:text-2xl text-white/95 max-w-2xl mx-auto leading-relaxed px-4 backdrop-blur-sm bg-white/5 rounded-2xl py-4 border border-white/10">
                Journey of Comfort Since 2018
              </p>
              <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-24 h-0.5 bg-gradient-to-r from-transparent via-teal-300 to-transparent"></div>
            </div>

            {/* Decorative Elements */}
            <div className="flex justify-center items-center gap-8 mt-12 opacity-70">
              <div className="w-12 h-0.5 bg-teal-300/50"></div>
              <div className="flex items-center gap-4">
                <Heart className="w-5 h-5 text-teal-300 animate-pulse" />
                <BookOpen className="w-5 h-5 text-teal-300 animate-pulse delay-75" />
                <Trophy className="w-5 h-5 text-teal-300 animate-pulse delay-150" />
              </div>
              <div className="w-12 h-0.5 bg-teal-300/50"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Introduction Section - Enhanced */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 md:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="space-y-6">
            {/* Badge - Enhanced */}
            <div className="inline-flex items-center gap-3 bg-gradient-to-r from-teal-50 to-teal-100 px-5 py-2.5 rounded-full border border-teal-200 shadow-sm hover:shadow-md transition-shadow duration-300 group">
              <div className="p-1.5 bg-white rounded-full shadow-sm">
                <Sparkles className="w-4 h-4 text-teal-600 group-hover:scale-110 transition-transform" />
              </div>
              <span className="text-sm font-semibold text-teal-700 tracking-wide">
                Welcome to Krambica
              </span>
            </div>

            {/* Heading - Enhanced */}
            <div className="relative">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight mb-6">
                <span className="text-gray-900">Our</span>
                <span className={`block ${primaryTextColor} mt-2`}>
                  Comfort Journey
                </span>
              </h2>
              <div className="absolute -left-4 top-0 w-1 h-full bg-gradient-to-b from-teal-500 to-cyan-500"></div>
            </div>

            {/* Content Cards - Enhanced */}
            <div className="space-y-5">
              <div className="group flex gap-4 sm:gap-5 p-5 sm:p-6 bg-gradient-to-r from-teal-50 to-teal-100/80 rounded-2xl border border-teal-200 shadow-sm hover:shadow-lg hover:border-teal-300 transition-all duration-300 hover:-translate-y-1">
                <div className="relative">
                  <CheckCircle className="w-6 h-6 sm:w-7 sm:h-7 text-teal-600 flex-shrink-0 mt-1" />
                  <div className="absolute inset-0 bg-teal-600/10 rounded-full blur-sm group-hover:blur-md transition-all"></div>
                </div>
                <div>
                  <p className="text-gray-700 text-base sm:text-lg leading-relaxed">
                    <span className="font-bold text-teal-700">Krambica</span> is
                    built on a simple belief — giving customers the best comfort
                    and design for what they pay.
                  </p>
                </div>
              </div>
              <div className="group flex gap-4 sm:gap-5 p-5 sm:p-6 bg-gradient-to-r from-teal-50 to-teal-100/80 rounded-2xl border border-teal-200 shadow-sm hover:shadow-lg hover:border-teal-300 transition-all duration-300 hover:-translate-y-1">
                <div className="relative">
                  <Heart className="w-6 h-6 sm:w-7 sm:h-7 text-teal-600 flex-shrink-0 mt-1" />
                  <div className="absolute inset-0 bg-teal-600/10 rounded-full blur-sm group-hover:blur-md transition-all"></div>
                </div>
                <div>
                  <p className="text-gray-700 text-base sm:text-lg leading-relaxed">
                    From a small home-based boutique in Bhavnagar to becoming a
                    trusted name with stores and online presence, our journey
                    has been driven by creating soft, breathable cotton clothing
                    that truly defines comfort.
                  </p>
                </div>
              </div>
            </div>

            {/* Button - Enhanced */}
            <button className="group relative inline-flex items-center gap-3 bg-gradient-to-r from-teal-600 to-teal-800 text-white px-7 py-4 rounded-xl font-semibold text-base hover:shadow-xl hover:shadow-teal-600/25 transition-all duration-300 hover:-translate-y-0.5 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-teal-500 to-teal-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <span className="relative z-10">Discover More</span>
              <ArrowRight className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform" />
              <div className="absolute -inset-1 bg-teal-600/20 rounded-xl blur-sm group-hover:blur-md transition-all"></div>
            </button>
          </div>

          {/* Image Section - Enhanced */}
          <div className="relative">
            <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl group">
              <img
                src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=800&h=600&q=80"
                alt="Krambica Store"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-teal-900/90 via-teal-900/40 to-transparent"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-teal-900/30 to-transparent"></div>

              {/* Image Overlay Content - Enhanced */}
              <div className="absolute bottom-8 left-8 right-8 text-white">
                <div className="flex items-center gap-3 mb-3">
                  <MapPin className="w-6 h-6 text-teal-300" />
                  <span className="text-sm font-medium text-teal-200">
                    Store Location
                  </span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold mb-2 drop-shadow-lg">
                  Our Vadodara Store
                </h3>
                <p className="text-sm text-teal-100/90 drop-shadow">
                  Where comfort meets craftsmanship
                </p>
              </div>

              {/* Decorative Border */}
              <div className="absolute inset-0 border-2 border-white/20 rounded-2xl sm:rounded-3xl pointer-events-none"></div>
            </div>

            {/* Floating Elements */}
            <div className="absolute -top-4 -right-4 w-16 h-16 bg-gradient-to-br from-teal-500 to-cyan-500 rounded-2xl flex items-center justify-center shadow-2xl animate-bounce">
              <Store className="w-8 h-8 text-white" />
            </div>
            <div className="absolute -bottom-4 -left-4 w-14 h-14 bg-gradient-to-br from-amber-500 to-orange-500 rounded-xl flex items-center justify-center shadow-2xl animate-pulse delay-1000">
              <Award className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>
      </div>

      {/* Journey Timeline - Enhanced */}
      <div className="bg-gradient-to-b from-white to-teal-50/30 py-16 sm:py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            {/* Badge - Enhanced */}
            <div className="inline-flex items-center gap-3 bg-gradient-to-r from-teal-50 to-teal-100 px-5 py-2.5 rounded-full border border-teal-200 shadow-sm mb-6 group hover:shadow-md transition-shadow">
              <TrendingUp className="w-5 h-5 text-teal-600 group-hover:scale-110 transition-transform" />
              <span className="text-sm font-semibold text-teal-700">
                Our Journey
              </span>
            </div>

            {/* Heading - Enhanced */}
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
              <span className="text-gray-900">The</span>
              <span className={`block ${primaryTextColor} mt-2`}>
                Krambica Story
              </span>
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              From a home-based boutique to a comfort revolution
            </p>
          </div>

          {/* Timeline Container */}
          <div className="relative">
            {/* Timeline Line - Enhanced */}
            <div className="absolute left-4 sm:left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-teal-500 via-cyan-500 to-teal-500 transform sm:-translate-x-1/2 shadow-lg shadow-teal-500/20"></div>

            <div className="space-y-12 sm:space-y-16">
              {[
                {
                  year: "2018",
                  title: "The Beginning",
                  tag: "Foundation Year",
                  desc: "Started as a small home-based boutique from the founder's bungalow in Vijayraj Nagar, Bhavnagar — with a simple thought of giving customers the best comfort and design for what they pay.",
                  icon: <Home className="w-5 h-5" />,
                },
                {
                  year: "2019",
                  title: "The Learning Year",
                  tag: "Growth Phase",
                  desc: "Our retail grew from the same space. We started exploring and researching customer taste, understanding what real women look for in daily wear comfort. Krambica began trading in clothing to widen its reach.",
                  icon: <BookOpen className="w-5 h-5" />,
                },
                {
                  year: "2020",
                  title: "The Tough Yet Steady Year",
                  tag: "Resilience",
                  desc: "Even when COVID hit, Krambica continued its journey with steady growth and belief. The support and trust of our customers kept us moving forward.",
                  icon: <Shield className="w-5 h-5" />,
                },
                {
                  year: "2021",
                  title: "Manufacturing Milestone",
                  tag: "Production Launch",
                  desc: "We started our own manufacturing unit — creating what we couldn't find in the market, focusing on soft, breathable, high-quality cotton wear that truly defines comfort.",
                  icon: <Factory className="w-5 h-5" />,
                },
                {
                  year: "2022",
                  title: "New City, New Phase",
                  tag: "Brand Registration",
                  desc: "Krambica shifted from Bhavnagar to Vadodara and got officially registered as a brand. We began connecting directly with shop vendors, continuing our growth in manufacturing step by step.",
                  icon: <MapPin className="w-5 h-5" />,
                },
                {
                  year: "2023",
                  title: "Expanding Connections",
                  tag: "National Reach",
                  desc: "Krambica reached 100+ shops across India, dealing directly with retailers — no agents, no wholesalers, no traders — just pure connection and trust with shops who value quality.",
                  icon: <Users2 className="w-5 h-5" />,
                },
                {
                  year: "2024",
                  title: "First Brand Store",
                  tag: "Retail Launch",
                  desc: "As a manufacturer, Krambica proudly opened its first retail outlet in Vadodara, marking a big step toward bringing our creations directly to customers under one roof.",
                  icon: <Store className="w-5 h-5" />,
                },
                {
                  year: "2025",
                  title: "Back to Roots & Beyond",
                  tag: "Current",
                  desc: 'Krambica opened its second outlet — "Ambica by Krambica" — in its hometown, Bhavnagar, handled and owned by Hemanshu Sharadbhai Sarvaiya. This year also marked Krambica\'s entry on online platforms like Myntra, placing the brand on a wider stage while staying true to its soul — comfort, quality, and trust.',
                  icon: <Package className="w-5 h-5" />,
                  current: true,
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className={`relative group ${
                    i % 2 === 0
                      ? "sm:pr-1/2 sm:text-right"
                      : "sm:pl-1/2 sm:ml-auto"
                  } pl-12 sm:pl-0`}
                >
                  {/* Timeline Dot - Enhanced */}
                  <div
                    className={`absolute left-4 sm:left-1/2 w-8 h-8 rounded-full border-4 border-white shadow-xl -ml-4 sm:-ml-4 flex items-center justify-center ${
                      item.current
                        ? "bg-gradient-to-r from-teal-500 to-cyan-500 animate-pulse"
                        : "bg-gradient-to-r from-teal-600 to-teal-800"
                    }`}
                  >
                    {item.icon}
                    <div
                      className={`absolute inset-0 rounded-full animate-ping ${
                        item.current ? "bg-teal-500/75" : "bg-teal-600/50"
                      }`}
                    ></div>
                  </div>

                  {/* Content Card - Enhanced */}
                  <div
                    className={`relative rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-2 ${
                      item.current
                        ? "bg-gradient-to-br from-teal-50 to-white border-teal-300 shadow-teal-500/10"
                        : "bg-white border-gray-100"
                    } overflow-hidden`}
                  >
                    {/* Hover Background */}
                    <div className="absolute inset-0 bg-gradient-to-r from-teal-50/0 via-teal-50/0 to-teal-50/0 group-hover:from-teal-50/30 group-hover:via-teal-50/20 group-hover:to-teal-50/10 transition-all duration-500"></div>

                    <div className="relative">
                      {/* Year and Tag - Enhanced */}
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
                        <div className="flex items-center gap-3">
                          <span
                            className={`text-2xl sm:text-3xl font-bold ${
                              item.current ? "text-teal-700" : "text-gray-900"
                            }`}
                          >
                            {item.year}
                          </span>
                          <span
                            className={`text-lg sm:text-xl font-semibold ${
                              item.current ? "text-teal-800" : "text-gray-800"
                            }`}
                          >
                            {item.title}
                          </span>
                        </div>
                        <span
                          className={`inline-block px-4 py-1.5 rounded-full text-sm font-bold ${
                            item.current
                              ? "bg-gradient-to-r from-teal-500 to-cyan-500 text-white shadow-md"
                              : "bg-gray-100 text-gray-700 border border-gray-200"
                          }`}
                        >
                          {item.tag}
                        </span>
                      </div>

                      {/* Description - Enhanced */}
                      <p className="text-gray-700 leading-relaxed text-base sm:text-lg">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Mission, Vision, Values - Enhanced */}
      <div className="py-16 sm:py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            {/* Badge - Enhanced */}
            <div className="inline-flex items-center gap-3 bg-gradient-to-r from-teal-50 to-teal-100 px-5 py-2.5 rounded-full border border-teal-200 shadow-sm mb-6 group hover:shadow-md transition-shadow">
              <Target className="w-5 h-5 text-teal-600 group-hover:scale-110 transition-transform" />
              <span className="text-sm font-semibold text-teal-700">
                Our Purpose
              </span>
            </div>

            {/* Heading - Enhanced */}
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
              <span className="text-gray-900">Mission, Vision</span>
              <span className={`block ${primaryTextColor} mt-2`}>
                & Core Values
              </span>
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              The principles that guide every decision we make
            </p>
          </div>

          {/* Cards Grid - Enhanced */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-10">
            {[
              {
                icon: <Target className="w-8 h-8" />,
                title: "Our Mission",
                content:
                  "To create soft, breathable cotton clothing that gives real comfort to everyday life. We focus on quality fabrics, natural designs, and fair prices — so every woman can feel good in what she wears. Krambica stands to prove that comfort doesn't have to be costly, and simple clothing can still feel special.",
              },
              {
                icon: <Eye className="w-8 h-8" />,
                title: "Our Vision",
                content:
                  "To reach every woman who loves to wear comfortable cotton clothing but doesn't yet know that a brand like Krambica exists. What we create — soft, breathable, and high-quality cotton wear at genuine prices — is rarely found in the market. We want people to know that real comfort, quality, and value can come together in one brand.",
              },
              {
                icon: <Heart className="w-8 h-8" />,
                title: "Core Values",
                content:
                  "Comfort comes first. Pure cotton, pure feel. Fair price, true value. Simple yet stylish. Made with care. Your comfort, our goodwill.",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="group relative bg-white rounded-2xl sm:rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-2 border-gray-100 hover:border-teal-300 overflow-hidden"
              >
                {/* Card Background Effects */}
                <div className="absolute inset-0 bg-gradient-to-br from-white via-white to-teal-50/0 group-hover:to-teal-50/50 transition-all duration-500"></div>
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-teal-100 to-cyan-100 rounded-full -mr-16 -mt-16 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                <div className="relative z-10">
                  {/* Icon - Enhanced */}
                  <div className="w-16 h-16 bg-gradient-to-r from-teal-600 to-teal-800 rounded-2xl flex items-center justify-center mb-8 shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <div className="text-white">{item.icon}</div>
                  </div>

                  {/* Title - Enhanced */}
                  <h3 className="text-2xl font-bold text-gray-900 mb-5">
                    {item.title}
                  </h3>

                  {/* Content - Enhanced */}
                  <p className="text-gray-700 leading-relaxed text-base sm:text-lg">
                    {item.content}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Core Values Grid - Enhanced */}
      <div className="bg-gradient-to-b from-white to-teal-50/30 py-16 sm:py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            {/* Badge - Enhanced */}
            <div className="inline-flex items-center gap-3 bg-gradient-to-r from-teal-50 to-teal-100 px-5 py-2.5 rounded-full border border-teal-200 shadow-sm mb-6 group hover:shadow-md transition-shadow">
              <Zap className="w-5 h-5 text-teal-600 group-hover:scale-110 transition-transform" />
              <span className="text-sm font-semibold text-teal-700">
                What Drives Us
              </span>
            </div>

            {/* Heading - Enhanced */}
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
              <span className="text-gray-900">Our</span>
              <span className={`block ${primaryTextColor} mt-2`}>
                Core Values
              </span>
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              The principles that define who we are
            </p>
          </div>

          {/* Values Grid - Enhanced */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {[
              {
                icon: <Heart className="w-7 h-7" />,
                title: "Comfort First",
                desc: "Comfort comes first in everything we create — from fabric selection to final stitching.",
              },
              {
                icon: <Leaf className="w-7 h-7" />,
                title: "Pure Cotton",
                desc: "We believe in pure cotton, pure feel — natural fabrics that breathe with you.",
              },
              {
                icon: <DollarSign className="w-7 h-7" />,
                title: "Fair Value",
                desc: "Fair price, true value — quality clothing shouldn't cost a fortune.",
              },
              {
                icon: <Sparkles className="w-7 h-7" />,
                title: "Made with Care",
                desc: "Simple yet stylish, made with care — every piece reflects our dedication.",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-2 border-gray-100 hover:border-teal-300"
              >
                <div className="w-16 h-16 bg-gradient-to-r from-teal-600 to-teal-800 rounded-2xl flex items-center justify-center mb-6 text-white shadow-md group-hover:scale-110 transition-transform">
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {item.title}
                </h3>
                <p className="text-gray-700 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Achievements - Enhanced */}
      <div className="py-16 sm:py-20 md:py-28 bg-gradient-to-r from-teal-700 via-teal-600 to-teal-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6">
              <span className="text-white">Our</span>
              <span className="block text-teal-200 mt-2">Achievements</span>
            </h2>
            <p className="text-teal-100/90 text-lg max-w-2xl mx-auto">
              Milestones that reflect our commitment to comfort
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {[
              {
                number: "100+",
                label: "Retail Partners",
                icon: <Store className="w-10 h-10 sm:w-12 sm:h-12" />,
              },
              {
                number: "2",
                label: "Brand Stores",
                icon: <ShoppingBag className="w-10 h-10 sm:w-12 sm:h-12" />,
              },
              {
                number: "7+",
                label: "Years of Journey",
                icon: <Award className="w-10 h-10 sm:w-12 sm:h-12" />,
              },
              {
                number: "1000s",
                label: "Happy Customers",
                icon: <Users className="w-10 h-10 sm:w-12 sm:h-12" />,
              },
            ].map((item, i) => (
              <div
                key={i}
                className="group text-center text-white bg-white/10 backdrop-blur-lg rounded-2xl sm:rounded-3xl p-8 sm:p-10 hover:bg-white/15 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-teal-900/30"
              >
                <div className="flex justify-center mb-6">
                  <div className="p-4 bg-white/10 rounded-2xl group-hover:scale-110 transition-transform">
                    {item.icon}
                  </div>
                </div>
                <div className="text-4xl sm:text-5xl md:text-6xl font-bold mb-3 group-hover:text-teal-200 transition-colors">
                  {item.number}
                </div>
                <div className="text-teal-100/90 text-base sm:text-lg font-medium">
                  {item.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Why Choose Us - Enhanced */}
      <div className="py-16 sm:py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            {/* Badge - Enhanced */}
            <div className="inline-flex items-center gap-3 bg-gradient-to-r from-teal-50 to-teal-100 px-5 py-2.5 rounded-full border border-teal-200 shadow-sm mb-6 group hover:shadow-md transition-shadow">
              <Star className="w-5 h-5 text-teal-600 group-hover:scale-110 transition-transform" />
              <span className="text-sm font-semibold text-teal-700">
                Why Krambica
              </span>
            </div>

            {/* Heading - Enhanced */}
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
              <span className="text-gray-900">Why</span>
              <span className={`block ${primaryTextColor} mt-2`}>
                Choose Us
              </span>
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              What makes us different from the rest
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10">
            {[
              {
                icon: <Leaf className="w-8 h-8" />,
                title: "Pure Cotton Quality",
                desc: "We use only the finest cotton fabrics, ensuring every piece is soft, breathable, and comfortable for all-day wear.",
              },
              {
                icon: <Heart className="w-8 h-8" />,
                title: "Comfort-Focused Design",
                desc: "Our designs prioritize your comfort above all else, creating clothing that feels natural and moves with you.",
              },
              {
                icon: <DollarSign className="w-8 h-8" />,
                title: "Fair & Honest Pricing",
                desc: "Quality clothing at genuine prices — we believe in fair value without compromising on comfort or craftsmanship.",
              },
              {
                icon: <Shield className="w-8 h-8" />,
                title: "Direct Connection",
                desc: "No middlemen, no traders — we connect directly with our customers and retail partners, ensuring transparency and trust.",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="group flex gap-6 sm:gap-8 p-8 bg-white rounded-2xl sm:rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-2 border-gray-100 hover:border-teal-300"
              >
                <div className="w-16 h-16 bg-gradient-to-r from-teal-600 to-teal-800 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg text-white group-hover:scale-110 transition-transform">
                  {item.icon}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {item.title}
                  </h3>
                  <p className="text-gray-700 leading-relaxed text-base">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Customer Testimonials - Enhanced */}
      <div className="bg-gradient-to-b from-white to-teal-50/30 py-16 sm:py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            {/* Badge - Enhanced */}
            <div className="inline-flex items-center gap-3 bg-gradient-to-r from-teal-50 to-teal-100 px-5 py-2.5 rounded-full border border-teal-200 shadow-sm mb-6 group hover:shadow-md transition-shadow">
              <Quote className="w-5 h-5 text-teal-600 group-hover:scale-110 transition-transform" />
              <span className="text-sm font-semibold text-teal-700">
                What They Say
              </span>
            </div>

            {/* Heading - Enhanced */}
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
              <span className="text-gray-900">Customer</span>
              <span className={`block ${primaryTextColor} mt-2`}>Stories</span>
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Real experiences from our amazing customers
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-10">
            {[
              {
                name: "Priya Patel",
                role: "Homemaker",
                city: "Vadodara",
                review:
                  "The cotton quality of Krambica clothing is exceptional. Finally found comfortable daily wear that doesn't compromise on style or my budget!",
                image:
                  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&h=200&q=80",
              },
              {
                name: "Sneha Mehta",
                role: "Teacher",
                city: "Bhavnagar",
                review:
                  "I love that Krambica focuses on real comfort. The fabric breathes so well, and I can wear their clothes all day without any discomfort.",
                image:
                  "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=200&h=200&q=80",
              },
              {
                name: "Anjali Shah",
                role: "Working Professional",
                city: "Gujarat",
                review:
                  "Pure cotton at honest prices — that's rare to find these days. Krambica delivers exactly what they promise. Highly recommend!",
                image:
                  "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=200&h=200&q=80",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="group bg-white rounded-2xl sm:rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-2 border-gray-100 hover:border-teal-300"
              >
                {/* Stars - Enhanced */}
                <div className="flex gap-1 mb-6">
                  {[...Array(5)].map((_, j) => (
                    <Star
                      key={j}
                      className="w-6 h-6 fill-amber-400 text-amber-400 group-hover:scale-110 transition-transform"
                      style={{ transitionDelay: `${j * 50}ms` }}
                    />
                  ))}
                </div>

                {/* Review - Enhanced */}
                <div className="relative">
                  <Quote className="absolute -top-2 -left-2 w-8 h-8 text-teal-100 group-hover:text-teal-200 transition-colors" />
                  <p className="text-gray-700 text-lg leading-relaxed mb-8 pl-4 italic">
                    "{item.review}"
                  </p>
                </div>

                {/* Customer Info - Enhanced */}
                <div className="flex items-center gap-4 pt-6 border-t border-gray-100">
                  <div className="relative">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 rounded-full object-cover border-2 border-teal-200 group-hover:border-teal-400 transition-colors"
                    />
                    <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-teal-500 rounded-full border-2 border-white flex items-center justify-center">
                      <CheckCircle className="w-3 h-3 text-white" />
                    </div>
                  </div>
                  <div>
                    <p className="font-bold text-gray-900 text-lg">
                      {item.name}
                    </p>
                    <p className="text-gray-600">
                      {item.role}, {item.city}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section - Enhanced */}
      <div className="py-16 sm:py-20 md:py-28 bg-gradient-to-r from-teal-700 via-teal-600 to-teal-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Icon - Enhanced */}
          <div className="relative inline-block mb-8">
            <Heart className="w-20 h-20 sm:w-24 sm:h-24 text-white mx-auto animate-pulse" />
            <div className="absolute inset-0 bg-gradient-to-r from-teal-400 to-cyan-400 rounded-full blur-2xl opacity-30 animate-pulse"></div>
          </div>

          {/* Heading - Enhanced */}
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6">
            Experience True Comfort
          </h2>

          {/* Description - Enhanced */}
          <p className="text-xl text-teal-100/90 mb-10 max-w-2xl mx-auto leading-relaxed">
            Join thousands who have discovered the comfort of pure cotton
            clothing at honest prices
          </p>

          {/* Button - Enhanced */}
          <button className="group relative inline-flex items-center gap-4 bg-white text-teal-700 px-10 py-5 rounded-2xl font-bold text-lg hover:shadow-2xl hover:shadow-white/20 transition-all duration-300 hover:-translate-y-1 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-white to-teal-50 opacity-100 group-hover:opacity-0 transition-opacity"></div>
            <ShoppingBag className="w-6 h-6 relative z-10 group-hover:scale-110 transition-transform" />
            <span className="relative z-10">Shop Now</span>
            <ChevronRight className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform" />
            <div className="absolute -inset-1 bg-white/20 rounded-2xl blur-sm group-hover:blur-md transition-all"></div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
