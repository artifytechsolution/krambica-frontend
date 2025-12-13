"use client";
import React from "react";
import { Home, ArrowLeft } from "lucide-react";

export default function NotFoundPage() {
  const handleGoHome = () => {
    // In a real app, use your router navigation
    window.location.href = "/home";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-4">
      <div className="max-w-4xl w-full">
        {/* Logo */}
        <div className="mb-8 md:mb-12">
          <div className="w-12 h-12 bg-slate-700 rounded-full flex items-center justify-center">
            <div className="w-6 h-6 border-4 border-slate-100 rounded-full relative">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-2 h-2 bg-slate-100 rounded-full"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="text-center">
          {/* Ooops! Text */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-700 mb-8 md:mb-12">
            Ooops!
          </h1>

          {/* 404 with Image */}
          <div className="relative mb-8 md:mb-12">
            <div className="text-[12rem] md:text-[16rem] lg:text-[20rem] font-bold text-slate-300 leading-none select-none">
              404
            </div>

            {/* Person sitting on the 0 */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <div className="relative w-32 h-40 md:w-40 md:h-48 lg:w-48 lg:h-56">
                {/* Placeholder for person image */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-24 h-32 md:w-32 md:h-40 bg-gradient-to-b from-olive-600 to-slate-700 rounded-t-full relative shadow-lg">
                    {/* Head */}
                    <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 w-12 h-12 md:w-14 md:h-14 bg-amber-100 rounded-full border-2 border-slate-300">
                      {/* Face details */}
                      <div className="absolute top-5 left-3 w-1.5 h-1 bg-slate-800 rounded-full"></div>
                      <div className="absolute top-5 right-3 w-1.5 h-1 bg-slate-800 rounded-full"></div>
                      <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 w-3 h-1.5 bg-rose-300 rounded-full"></div>
                    </div>

                    {/* Shirt */}
                    <div className="absolute top-6 left-0 right-0 h-16 bg-olive-700 rounded-lg"></div>

                    {/* Legs */}
                    <div className="absolute bottom-0 left-1/4 w-6 h-12 md:h-16 bg-slate-800 rounded-b-lg"></div>
                    <div className="absolute bottom-0 right-1/4 w-6 h-12 md:h-16 bg-slate-800 rounded-b-lg"></div>

                    {/* Shoes */}
                    <div className="absolute -bottom-4 left-1/4 w-8 h-6 bg-slate-400 rounded-full"></div>
                    <div className="absolute -bottom-4 right-1/4 w-8 h-6 bg-slate-400 rounded-full"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Message */}
          <p className="text-lg md:text-xl lg:text-2xl text-slate-600 font-medium mb-8 md:mb-12">
            There are no stylish clothes here
          </p>

          {/* Go Home Button */}
          <button
            onClick={handleGoHome}
            className="inline-flex items-center gap-3 px-8 py-4 bg-slate-400 hover:bg-slate-500 text-white text-lg font-medium rounded-full transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            <ArrowLeft className="w-5 h-5" />
            Go home
          </button>
        </div>
      </div>

      {/* CSS for olive color */}
      <style jsx>{`
        .from-olive-600 {
          --tw-gradient-from: #7c8e3f;
        }
        .bg-olive-700 {
          background-color: #6b7a37;
        }
      `}</style>
    </div>
  );
}
