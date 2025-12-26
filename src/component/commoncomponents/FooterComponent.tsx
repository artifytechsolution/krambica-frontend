"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Facebook,
  Instagram,
  Twitter,
  Youtube,
  Mail,
  Phone,
  MapPin,
  ArrowRight,
  CheckCircle,
  ShieldCheck,
  Globe,
  Heart,
} from "lucide-react";

export default function PremiumFooter() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus("loading");
    setTimeout(() => {
      setStatus("success");
      setEmail("");
      setTimeout(() => setStatus("idle"), 3000);
    }, 1500);
  };

  return (
    // CHANGE 1: Removed 'hidden md:block' so it shows on mobile too
    <footer className="bg-gray-50 text-gray-600 font-sans border-t border-gray-200 block">
      {/* ================= Newsletter Section ================= */}
      <div className="relative overflow-hidden border-b border-gray-200">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-64 bg-teal-500/5 blur-[100px] rounded-full pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            {/* Newsletter Text */}
            <div className="space-y-4 text-center lg:text-left">
              <h2 className="text-2xl md:text-4xl font-bold text-gray-900">
                Unlock the World of{" "}
                <span className="text-teal-600">Krambica</span>
              </h2>
              <p className="text-gray-500 max-w-md mx-auto lg:mx-0 text-base md:text-lg">
                Join our exclusive community for early access to drops, styling
                guides, and a flat 10% off your first order.
              </p>

              <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4 sm:gap-6 pt-2 text-sm font-medium">
                <div className="flex items-center justify-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-teal-600" />
                  Secure Checkout
                </div>
                <div className="flex items-center justify-center gap-2">
                  <Globe className="w-4 h-4 text-teal-600" />
                  Global Shipping
                </div>
              </div>
            </div>

            {/* Newsletter Form */}
            <div className="max-w-md mx-auto lg:ml-auto w-full">
              <form onSubmit={handleSubscribe}>
                <div className="flex items-center bg-white border border-gray-200 rounded-full p-1.5 focus-within:ring-4 focus-within:ring-teal-500/10 transition shadow-sm">
                  <Mail className="w-5 h-5 text-gray-400 ml-4 shrink-0" />
                  <input
                    type="email"
                    required
                    placeholder="your@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-transparent px-4 py-3 focus:ring-0 text-sm outline-none"
                  />
                  <button
                    disabled={status !== "idle"}
                    className={`px-4 sm:px-6 py-2.5 rounded-full text-sm font-semibold flex items-center gap-2 transition shrink-0 ${
                      status === "success"
                        ? "bg-green-500 text-white"
                        : "bg-gray-900 text-white hover:bg-teal-600"
                    }`}
                  >
                    {status === "loading" ? (
                      "..."
                    ) : status === "success" ? (
                      <CheckCircle className="w-4 h-4" />
                    ) : (
                      <>
                        <span className="hidden sm:inline">Subscribe</span>{" "}
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </div>
              </form>
              <p className="text-xs text-center lg:text-left text-gray-500 mt-3 pl-4">
                By subscribing, you agree to our Privacy Policy.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ================= 4 COLUMN FOOTER LINKS ================= */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        {/* CHANGE 2: Grid-cols-1 ensures single column (line by line) on mobile */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-8">
          {/* Column 1: Brand Info */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-teal-600 rounded-lg flex items-center justify-center text-white font-bold text-xl font-serif">
                K
              </div>
              <span className="text-2xl font-bold text-gray-900 font-serif">
                KRAMBICA
              </span>
            </div>

            <p className="text-sm text-gray-500 leading-relaxed max-w-xs">
              From our manufacturing unit to your wardrobe — premium cotton wear
              made with care in India.
            </p>

            <div className="flex gap-4">
              {[Facebook, Instagram, Twitter, Youtube].map((Icon, i) => (
                <Link
                  key={i}
                  href="#"
                  className="w-9 h-9 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-teal-600 hover:text-white hover:border-teal-600 transition"
                >
                  <Icon className="w-4 h-4" />
                </Link>
              ))}
            </div>
          </div>

          {/* Column 2: Explore */}
          <div>
            <h3 className="text-gray-900 font-bold text-base mb-6">Explore</h3>
            <ul className="space-y-4 text-sm">
              <li>
                <Link href="/shop" className="hover:text-teal-600 transition">
                  Shop
                </Link>
              </li>
              <li>
                <Link
                  href="/collection"
                  className="hover:text-teal-600 transition"
                >
                  Collection
                </Link>
              </li>
              <li>
                <Link href="/shop" className="hover:text-teal-600 transition">
                  New Arrivals
                </Link>
              </li>
              <li>
                <Link href="/offer" className="hover:text-teal-600 transition">
                  Offer
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Company + Legal */}
          <div>
            <h3 className="text-gray-900 font-bold text-base mb-6">Company</h3>
            <ul className="space-y-4 text-sm">
              <li>
                <Link href="/about" className="hover:text-teal-600 transition">
                  About Krambica
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="hover:text-teal-600 transition"
                >
                  Wholesale Enquire
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="hover:text-teal-600 transition"
                >
                  Help Center
                </Link>
              </li>
              {/* Separator for clarity */}
              <li className="pt-2 border-t border-dashed border-gray-200 w-3/4"></li>
              <li>
                <Link
                  href="/privacy-policy"
                  className="hover:text-teal-600 transition"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/termcondition"
                  className="hover:text-teal-600 transition"
                >
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="hover:text-teal-600 transition"
                >
                  Shipping & Return
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Get in Touch */}
          <div>
            <h3 className="text-gray-900 font-bold text-base mb-6">
              Get in Touch
            </h3>
            <ul className="space-y-5 text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-teal-600 shrink-0 mt-0.5" />
                <span className="leading-relaxed">
                  111, lotus elite, gotri sevasi road Gotri Vadodara 390021
                  Gujarat India
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-teal-600 shrink-0" />
                <span className="hover:text-gray-900">+91 7485908799</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-teal-600 shrink-0" />
                <span className="hover:text-gray-900">hello@krambica.com</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* ================= Bottom Bar ================= */}
      <div className="border-t border-gray-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 py-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-500">
            © 2025 Krambica. All rights reserved.
          </p>

          <div className="flex gap-2">
            {["Visa", "Mastercard", "Amex", "UPI"].map((card) => (
              <div
                key={card}
                className="h-7 px-3 bg-gray-50 border border-gray-200 rounded flex items-center justify-center text-[10px] font-bold tracking-wider text-gray-500"
              >
                {card}
              </div>
            ))}
          </div>
        </div>

        <p className="text-xs text-gray-400 text-center pb-6 flex justify-center items-center gap-1">
          Made with <Heart className="w-3 h-3 fill-red-400 text-red-400" /> for
          Fashion
        </p>
      </div>
    </footer>
  );
}
