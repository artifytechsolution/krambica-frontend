"use client";
import React, { useState } from "react";
import Link from "next/link"; // Imported Link for navigation
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
  const [status, setStatus] = useState("idle");

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email) return;
    setStatus("loading");
    // Simulate API call
    setTimeout(() => {
      setStatus("success");
      setEmail("");
      setTimeout(() => setStatus("idle"), 3000);
    }, 1500);
  };

  return (
    <footer className="bg-gray-50 text-gray-600 font-sans border-t border-gray-200 hidden md:block">
      {/* Top Section: Newsletter */}
      <div className="relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-64 bg-teal-500/5 blur-[100px] rounded-full pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left space-y-4">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight">
                Unlock the World of{" "}
                <span className="text-teal-600">Krambica</span>
              </h2>
              <p className="text-gray-500 max-w-md mx-auto lg:mx-0 text-lg">
                Join our exclusive community for early access to drops, styling
                guides, and a flat 10% off your first order.
              </p>
              <div className="flex flex-wrap justify-center lg:justify-start gap-6 pt-4 text-sm font-medium text-gray-500">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-teal-600" /> Secure
                  Checkout
                </div>
                <div className="flex items-center gap-2">
                  <Globe className="w-4 h-4 text-teal-600" /> Global Shipping
                </div>
              </div>
            </div>

            <div className="w-full max-w-md mx-auto lg:ml-auto">
              <form onSubmit={handleSubscribe} className="relative group">
                <div className="relative flex items-center bg-white border border-gray-200 rounded-full p-1.5 focus-within:border-teal-500/50 focus-within:ring-4 focus-within:ring-teal-500/10 shadow-sm transition-all duration-300 hover:border-gray-300">
                  <Mail className="w-5 h-5 text-gray-400 ml-4 shrink-0" />
                  <input
                    type="email"
                    placeholder="your@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-transparent border-none text-gray-900 placeholder-gray-400 focus:ring-0 px-4 py-3"
                    required
                  />
                  <button
                    type="submit"
                    disabled={status === "loading" || status === "success"}
                    className={`px-6 py-3 rounded-full font-semibold text-sm transition-all duration-300 flex items-center gap-2 shadow-sm ${
                      status === "success"
                        ? "bg-green-500 text-white"
                        : "bg-gray-900 text-white hover:bg-teal-600"
                    }`}
                  >
                    {status === "loading" ? (
                      <span className="animate-pulse">Processing...</span>
                    ) : status === "success" ? (
                      <>
                        Joined <CheckCircle className="w-4 h-4" />
                      </>
                    ) : (
                      <>
                        Subscribe <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </div>
              </form>
              <p className="text-xs text-gray-500 mt-3 text-center lg:text-left pl-4">
                By subscribing, you agree to our Privacy Policy.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />

      {/* Middle Section: Links Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-12 gap-y-12 gap-x-8">
          {/* Brand Column */}
          <div className="col-span-2 md:col-span-4 lg:col-span-4 space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-teal-600 rounded-lg flex items-center justify-center text-white font-bold text-xl font-serif shadow-sm">
                K
              </div>
              <span className="text-2xl font-bold text-gray-900 tracking-wide font-serif">
                KRAMBICA
              </span>
            </div>
            <p className="text-gray-500 text-sm leading-relaxed max-w-xs">
              Curating premium fashion that empowers individual expression.
              Designed in India, worn globally.
            </p>
            <div className="flex gap-4">
              {[Facebook, Instagram, Twitter, Youtube].map((Icon, i) => (
                <Link
                  key={i}
                  href="#"
                  className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-teal-600 hover:text-white hover:border-teal-600 transition-all duration-300 hover:-translate-y-1 shadow-sm"
                >
                  <Icon className="w-4 h-4" />
                </Link>
              ))}
            </div>
          </div>

          {/* Column 1: Explore (Shop, Collection, Offer) */}
          <div className="col-span-1 lg:col-span-2 lg:col-start-6">
            <h3 className="text-gray-900 font-semibold mb-6">Explore</h3>
            <ul className="space-y-4 text-sm">
              {[
                { name: "Shop", href: "/shop" },
                { name: "Collection", href: "/collection" },
                { name: "Offer", href: "/offer" },
                { name: "New Arrivals", href: "/shop?sort=new" }, // Added relevant extra
              ].map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-gray-500 hover:text-teal-600 transition-colors flex items-center gap-2 group"
                  >
                    <span className="w-1 h-1 rounded-full bg-gray-300 group-hover:bg-teal-600 transition-all" />
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 2: Company (Home, About, Contact) */}
          <div className="col-span-1 lg:col-span-2">
            <h3 className="text-gray-900 font-semibold mb-6">Company</h3>
            <ul className="space-y-4 text-sm">
              {[
                { name: "Home", href: "/home" },
                { name: "About Us", href: "/about" },
                { name: "Contact", href: "/contact" },
                { name: "Help Center", href: "/contact" }, // Added relevant extra
              ].map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-gray-500 hover:text-teal-600 transition-colors flex items-center gap-2 group"
                  >
                    <span className="w-1 h-1 rounded-full bg-gray-300 group-hover:bg-teal-600 transition-all" />
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Contact Details */}
          <div className="col-span-2 md:col-span-2 lg:col-span-3">
            <h3 className="text-gray-900 font-semibold mb-6">Get in Touch</h3>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3 text-gray-500">
                <MapPin className="w-5 h-5 text-teal-600 shrink-0" />
                <span>
                  123 Fashion Avenue,
                  <br />
                  Mumbai, MH 400001
                </span>
              </li>
              <li className="flex items-center gap-3 text-gray-500">
                <Phone className="w-5 h-5 text-teal-600 shrink-0" />
                <a
                  href="tel:+911234567890"
                  className="hover:text-teal-600 transition-colors"
                >
                  +91 123 456 7890
                </a>
              </li>
              <li className="flex items-center gap-3 text-gray-500">
                <Mail className="w-5 h-5 text-teal-600 shrink-0" />
                <a
                  href="mailto:hello@krambica.com"
                  className="hover:text-teal-600 transition-colors"
                >
                  hello@krambica.com
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="border-t border-gray-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-sm text-gray-500 text-center md:text-left">
              <p>© 2025 Krambica. All rights reserved.</p>
              <div className="flex gap-4 mt-2 justify-center md:justify-start">
                <Link
                  href="/privacy"
                  className="hover:text-gray-800 transition-colors"
                >
                  Privacy
                </Link>
                <Link
                  href="/terms"
                  className="hover:text-gray-800 transition-colors"
                >
                  Terms
                </Link>
                <Link
                  href="/sitemap"
                  className="hover:text-gray-800 transition-colors"
                >
                  Sitemap
                </Link>
              </div>
            </div>

            <div className="flex items-center gap-3">
              {["Visa", "Mastercard", "Amex", "UPI"].map((card) => (
                <div
                  key={card}
                  className="h-8 px-3 bg-gray-50 border border-gray-200 rounded flex items-center justify-center text-[10px] font-bold tracking-wider text-gray-500 select-none"
                >
                  {card}
                </div>
              ))}
            </div>
          </div>

          <div className="mt-8 text-center">
            <p className="text-xs text-gray-400 flex items-center justify-center gap-1">
              Made with{" "}
              <Heart className="w-3 h-3 text-gray-400 fill-gray-200" /> for
              Fashion
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
