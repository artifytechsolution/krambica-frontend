"use client"
import React, { useState } from 'react';
import { Facebook, Instagram, Twitter, Youtube, Mail, Phone, MapPin, Send, Heart, CreditCard, Shield, Truck, RotateCcw, Award } from 'lucide-react';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 3000);
    }
  };

  return (
    <footer className="bg-gradient-to-b hidden sm:block from-gray-900 via-gray-800 to-gray-900 text-white">
      {/* Newsletter Section */}
      <div className="border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left">
              <h3 className="text-2xl md:text-3xl font-bold mb-2 bg-gradient-to-r from-teal-400 to-cyan-400 bg-clip-text text-transparent">
                Join Our Fashion Community
              </h3>
              <p className="text-gray-400 text-sm md:text-base">
                Subscribe to get exclusive offers, style tips, and early access to new collections
              </p>
            </div>
            <form onSubmit={handleSubscribe} className="w-full md:w-auto flex gap-2">
              <div className="relative flex-1 md:w-80">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 transition-all"
                  required
                />
              </div>
              <button
                type="submit"
                className="px-6 py-3 bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-500 hover:to-cyan-500 rounded-lg font-bold transition-all hover:shadow-lg hover:scale-105 flex items-center gap-2 whitespace-nowrap"
              >
                <Send className="w-5 h-5" />
                Subscribe
              </button>
            </form>
          </div>
          {subscribed && (
            <div className="mt-4 p-3 bg-green-500/20 border border-green-500/50 rounded-lg text-center">
              <p className="text-green-400 font-semibold">✓ Successfully subscribed! Check your email for exclusive offers.</p>
            </div>
          )}
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-cyan-500 rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-2xl font-serif">K</span>
              </div>
              <div>
                <h2 className="text-2xl font-bold font-serif tracking-tight">KRAMBICA</h2>
                <p className="text-xs text-teal-400">Premium Fashion</p>
              </div>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              Discover timeless elegance and contemporary style. We curate premium fashion pieces that empower you to express your unique personality with confidence and grace.
            </p>
            
            {/* Social Media */}
            <div className="mb-6">
              <h4 className="text-sm font-bold mb-3 text-gray-300">Connect With Us</h4>
              <div className="flex gap-3">
                <a href="#" className="w-10 h-10 bg-gray-800 hover:bg-gradient-to-br hover:from-teal-600 hover:to-cyan-600 rounded-lg flex items-center justify-center transition-all hover:scale-110 group">
                  <Facebook className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" />
                </a>
                <a href="#" className="w-10 h-10 bg-gray-800 hover:bg-gradient-to-br hover:from-pink-600 hover:to-purple-600 rounded-lg flex items-center justify-center transition-all hover:scale-110 group">
                  <Instagram className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" />
                </a>
                <a href="#" className="w-10 h-10 bg-gray-800 hover:bg-gradient-to-br hover:from-blue-500 hover:to-blue-600 rounded-lg flex items-center justify-center transition-all hover:scale-110 group">
                  <Twitter className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" />
                </a>
                <a href="#" className="w-10 h-10 bg-gray-800 hover:bg-gradient-to-br hover:from-red-600 hover:to-red-700 rounded-lg flex items-center justify-center transition-all hover:scale-110 group">
                  <Youtube className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" />
                </a>
              </div>
            </div>

            {/* Trust Badges */}
            <div className="flex flex-wrap gap-2">
              <div className="px-3 py-1.5 bg-gray-800 rounded-full text-xs font-medium flex items-center gap-1.5">
                <Shield className="w-3.5 h-3.5 text-green-400" />
                <span>100% Secure</span>
              </div>
              <div className="px-3 py-1.5 bg-gray-800 rounded-full text-xs font-medium flex items-center gap-1.5">
                <Award className="w-3.5 h-3.5 text-yellow-400" />
                <span>Authentic</span>
              </div>
            </div>
          </div>

          {/* Shop Links */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-white">Shop</h3>
            <ul className="space-y-3">
              {['New Arrivals', 'Dresses', 'Tops & Blouses', 'Bottoms', 'Outerwear', 'Accessories', 'Sale', 'Gift Cards'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-gray-400 hover:text-teal-400 text-sm transition-colors flex items-center group">
                    <span className="w-0 group-hover:w-2 h-0.5 bg-teal-400 mr-0 group-hover:mr-2 transition-all duration-300"></span>
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-white">Customer Care</h3>
            <ul className="space-y-3">
              {['My Account', 'Track Order', 'Shipping Info', 'Returns & Exchanges', 'Size Guide', 'FAQs', 'Contact Us', 'Store Locator'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-gray-400 hover:text-teal-400 text-sm transition-colors flex items-center group">
                    <span className="w-0 group-hover:w-2 h-0.5 bg-teal-400 mr-0 group-hover:mr-2 transition-all duration-300"></span>
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company & Contact */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-white">Company</h3>
            <ul className="space-y-3 mb-6">
              {['About Us', 'Careers', 'Sustainability', 'Press & Media', 'Affiliates', 'Blog'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-gray-400 hover:text-teal-400 text-sm transition-colors flex items-center group">
                    <span className="w-0 group-hover:w-2 h-0.5 bg-teal-400 mr-0 group-hover:mr-2 transition-all duration-300"></span>
                    {item}
                  </a>
                </li>
              ))}
            </ul>

            <div className="space-y-3">
              <h4 className="text-sm font-bold text-gray-300 mb-3">Get In Touch</h4>
              <a href="tel:+911234567890" className="flex items-center gap-2 text-gray-400 hover:text-teal-400 text-sm transition-colors group">
                <Phone className="w-4 h-4 flex-shrink-0 text-teal-500" />
                <span>+91 123 456 7890</span>
              </a>
              <a href="mailto:info@krambica.com" className="flex items-center gap-2 text-gray-400 hover:text-teal-400 text-sm transition-colors group">
                <Mail className="w-4 h-4 flex-shrink-0 text-teal-500" />
                <span>info@krambica.com</span>
              </a>
              <div className="flex items-start gap-2 text-gray-400 text-sm">
                <MapPin className="w-4 h-4 flex-shrink-0 text-teal-500 mt-0.5" />
                <span>123 Fashion Street<br />Mumbai, MH 400001<br />India</span>
              </div>
            </div>
          </div>
        </div>


        {/* Payment Methods */}
        <div className="mt-8 pt-8 border-t border-gray-700">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <h4 className="text-sm font-bold text-gray-300 mb-3">We Accept</h4>
              <div className="flex flex-wrap gap-2">
                <div className="px-4 py-2 bg-white rounded-lg">
                  <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='24' viewBox='0 0 40 24'%3E%3Crect fill='%231434CB' width='40' height='24' rx='4'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' fill='white' font-family='Arial' font-weight='bold' font-size='10'%3EVISA%3C/text%3E%3C/svg%3E" alt="Visa" className="h-6" />
                </div>
                <div className="px-4 py-2 bg-white rounded-lg">
                  <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='24' viewBox='0 0 40 24'%3E%3Crect fill='%23EB001B' width='40' height='24' rx='4'/%3E%3Ccircle cx='15' cy='12' r='7' fill='%23FF5F00'/%3E%3Ccircle cx='25' cy='12' r='7' fill='%23F79E1B'/%3E%3C/svg%3E" alt="Mastercard" className="h-6" />
                </div>
                <div className="px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-800 rounded-lg">
                  <span className="text-white text-xs font-bold">AMEX</span>
                </div>
                <div className="px-4 py-2 bg-gradient-to-r from-purple-600 to-purple-800 rounded-lg">
                  <span className="text-white text-xs font-bold">UPI</span>
                </div>
                <div className="px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-700 rounded-lg">
                  <span className="text-white text-xs font-bold">PayTM</span>
                </div>
                <div className="px-4 py-2 bg-gradient-to-r from-green-600 to-green-800 rounded-lg">
                  <span className="text-white text-xs font-bold">G Pay</span>
                </div>
              </div>
            </div>
            <div className="text-center md:text-right">
              <p className="text-xs text-gray-400 mb-2">Secured by</p>
              <div className="flex gap-2">
                <div className="px-3 py-1.5 bg-gray-800 rounded-lg text-xs font-medium">
                  <span className="text-green-400">🔒</span> SSL
                </div>
                <div className="px-3 py-1.5 bg-gray-800 rounded-lg text-xs font-medium">
                  <span className="text-blue-400">🛡️</span> PCI DSS
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-700 bg-gray-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-400">
            <div className="flex items-center gap-2">
              <p>© 2025 Krambica. All rights reserved.</p>
              <span className="hidden md:inline">|</span>
              <p className="flex items-center gap-1">
                Made with <Heart className="w-4 h-4 text-red-500 fill-red-500" /> in India
              </p>
            </div>
            <div className="flex flex-wrap justify-center gap-4 md:gap-6">
              <a href="#" className="hover:text-teal-400 transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-teal-400 transition-colors">Terms & Conditions</a>
              <a href="#" className="hover:text-teal-400 transition-colors">Cookie Policy</a>
              <a href="#" className="hover:text-teal-400 transition-colors">Accessibility</a>
              <a href="#" className="hover:text-teal-400 transition-colors">Sitemap</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}