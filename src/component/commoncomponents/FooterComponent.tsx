"use client";
import React, { useState } from "react";
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
  CreditCard,
  ShieldCheck,
  Globe,
  Heart,
} from "lucide-react";

export default function PremiumFooter() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle"); // idle, loading, success

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
    <footer className="bg-zinc-950 text-zinc-300 font-sans border-t border-zinc-900 hidden md:block">
      {/* Top Section: Newsletter & Brand Promise */}
      <div className="relative overflow-hidden">
        {/* Decorative background glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-64 bg-teal-900/10 blur-[100px] rounded-full pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Text Content */}
            <div className="text-center lg:text-left space-y-4">
              <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
                Unlock the World of{" "}
                <span className="text-teal-500">Krambica</span>
              </h2>
              <p className="text-zinc-400 max-w-md mx-auto lg:mx-0 text-lg">
                Join our exclusive community for early access to drops, styling
                guides, and a flat 10% off your first order.
              </p>

              <div className="flex flex-wrap justify-center lg:justify-start gap-6 pt-4 text-sm font-medium text-zinc-500">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-teal-500" /> Secure
                  Checkout
                </div>
                <div className="flex items-center gap-2">
                  <Globe className="w-4 h-4 text-teal-500" /> Global Shipping
                </div>
              </div>
            </div>

            {/* Input Form */}
            <div className="w-full max-w-md mx-auto lg:ml-auto">
              <form onSubmit={handleSubscribe} className="relative group">
                <div className="relative flex items-center bg-zinc-900/50 border border-zinc-800 rounded-full p-1.5 focus-within:border-teal-500/50 focus-within:ring-4 focus-within:ring-teal-500/10 transition-all duration-300">
                  <Mail className="w-5 h-5 text-zinc-500 ml-4 shrink-0" />
                  <input
                    type="email"
                    placeholder="your@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-transparent border-none text-white placeholder-zinc-600 focus:ring-0 px-4 py-3"
                    required
                  />
                  <button
                    type="submit"
                    disabled={status === "loading" || status === "success"}
                    className={`
                      px-6 py-3 rounded-full font-semibold text-sm transition-all duration-300 flex items-center gap-2
                      ${
                        status === "success"
                          ? "bg-green-500 text-white"
                          : "bg-white text-zinc-950 hover:bg-teal-50"
                      }
                    `}
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
              <p className="text-xs text-zinc-600 mt-3 text-center lg:text-left pl-4">
                By subscribing, you agree to our Privacy Policy.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full h-px bg-gradient-to-r from-transparent via-zinc-800 to-transparent" />

      {/* Middle Section: Links Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-12 gap-y-12 gap-x-8">
          {/* Brand Column (Span 4) */}
          <div className="col-span-2 md:col-span-4 lg:col-span-4 space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-teal-500 rounded-lg flex items-center justify-center text-zinc-950 font-bold text-xl font-serif">
                K
              </div>
              <span className="text-2xl font-bold text-white tracking-wide font-serif">
                KRAMBICA
              </span>
            </div>
            <p className="text-zinc-500 text-sm leading-relaxed max-w-xs">
              Curating premium fashion that empowers individual expression.
              Designed in India, worn globally.
            </p>
            <div className="flex gap-4">
              {[Facebook, Instagram, Twitter, Youtube].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-10 h-10 rounded-full bg-zinc-900 flex items-center justify-center text-zinc-400 hover:bg-teal-500 hover:text-white transition-all duration-300 hover:-translate-y-1"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Links Column 1 */}
          <div className="col-span-1 lg:col-span-2 lg:col-start-6">
            <h3 className="text-white font-semibold mb-6">Shop</h3>
            <ul className="space-y-4 text-sm">
              {[
                "New Arrivals",
                "Best Sellers",
                "Clothing",
                "Accessories",
                "Sale",
              ].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="text-zinc-400 hover:text-teal-400 transition-colors flex items-center gap-2 group"
                  >
                    <span className="w-1 h-1 rounded-full bg-transparent group-hover:bg-teal-400 transition-all" />
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Links Column 2 */}
          <div className="col-span-1 lg:col-span-2">
            <h3 className="text-white font-semibold mb-6">Support</h3>
            <ul className="space-y-4 text-sm">
              {[
                "Track Order",
                "Returns",
                "Shipping Info",
                "Size Guide",
                "Help Center",
              ].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="text-zinc-400 hover:text-teal-400 transition-colors flex items-center gap-2 group"
                  >
                    <span className="w-1 h-1 rounded-full bg-transparent group-hover:bg-teal-400 transition-all" />
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Links Column 3 (Contact) */}
          <div className="col-span-2 md:col-span-2 lg:col-span-3">
            <h3 className="text-white font-semibold mb-6">Contact Us</h3>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3 text-zinc-400">
                <MapPin className="w-5 h-5 text-teal-500 shrink-0" />
                <span>
                  123 Fashion Avenue,
                  <br />
                  Mumbai, MH 400001
                </span>
              </li>
              <li className="flex items-center gap-3 text-zinc-400">
                <Phone className="w-5 h-5 text-teal-500 shrink-0" />
                <a
                  href="tel:+911234567890"
                  className="hover:text-white transition-colors"
                >
                  +91 123 456 7890
                </a>
              </li>
              <li className="flex items-center gap-3 text-zinc-400">
                <Mail className="w-5 h-5 text-teal-500 shrink-0" />
                <a
                  href="mailto:hello@krambica.com"
                  className="hover:text-white transition-colors"
                >
                  hello@krambica.com
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Section: Footer Utility */}
      <div className="border-t border-zinc-900 bg-zinc-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            {/* Copyright */}
            <div className="text-sm text-zinc-500 text-center md:text-left">
              <p>© 2025 Krambica. All rights reserved.</p>
              <div className="flex gap-4 mt-2 justify-center md:justify-start">
                <a href="#" className="hover:text-zinc-300 transition-colors">
                  Privacy
                </a>
                <a href="#" className="hover:text-zinc-300 transition-colors">
                  Terms
                </a>
                <a href="#" className="hover:text-zinc-300 transition-colors">
                  Sitemap
                </a>
              </div>
            </div>

            {/* Payment Methods - Using CSS styled placeholders for cleaner code */}
            <div className="flex items-center gap-3">
              {["Visa", "Mastercard", "Amex", "UPI"].map((card) => (
                <div
                  key={card}
                  className="h-8 px-3 bg-white/5 border border-white/10 rounded flex items-center justify-center text-[10px] font-bold tracking-wider text-zinc-400 select-none"
                >
                  {card}
                </div>
              ))}
            </div>
          </div>

          {/* Made with love */}
          <div className="mt-8 text-center">
            <p className="text-xs text-zinc-700 flex items-center justify-center gap-1">
              Made with{" "}
              <Heart className="w-3 h-3 text-zinc-600 fill-zinc-600" /> for
              Fashion
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
