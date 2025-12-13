"use client";
import React, { useState } from "react";
import {
  Mail,
  Phone,
  MapPin,
  MessageCircle,
  Send,
  Clock,
  CheckCircle,
  ChevronDown,
  Navigation,
  Users,
  Sparkles,
  Award,
  Shield,
  Zap,
  Home,
  Globe,
  Heart,
} from "lucide-react";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [activeAccordion, setActiveAccordion] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
      setTimeout(() => setSubmitted(false), 5000);
    }, 2000);
  };

  return (
    <div className="bg-gradient-to-b from-gray-50 to-white min-h-screen">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-[#115e59] via-[#134e4a] to-[#0f766e] text-white py-16 sm:py-20 md:py-28 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-10 w-72 h-72 bg-white rounded-full mix-blend-overlay filter blur-3xl animate-pulse"></div>
          <div className="absolute top-40 right-10 w-72 h-72 bg-[#5eead4] rounded-full mix-blend-overlay filter blur-3xl animate-pulse animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-1/2 w-72 h-72 bg-[#0d9488] rounded-full mix-blend-overlay filter blur-3xl animate-pulse animation-delay-4000"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 bg-white/20 backdrop-blur-md rounded-full mb-6 sm:mb-8 animate-bounce">
              <MessageCircle className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12" />
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-normal leading-tight mb-6 bg-gradient-to-r from-[#115e59] to-[#134e4a] bg-clip-text text-transparent">
              <span className=" px-4 py-2 rounded-2xl text-white">
                Let's Connect
              </span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-white/90 max-w-2xl mx-auto leading-relaxed px-4">
              Have questions? We're here to help! Reach out and we'll respond
              within 24 hours.
            </p>
          </div>
        </div>
      </div>

      {/* Quick Contact Cards */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-12 sm:-mt-16 relative z-20 mb-12 sm:mb-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          <a
            href="tel:+911234567890"
            className="group bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100"
          >
            <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-[#115e59] to-[#134e4a] rounded-2xl flex items-center justify-center mb-4 sm:mb-6 group-hover:scale-110 transition-transform shadow-lg">
              <Phone className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">
              Call Us
            </h3>
            <p className="text-sm sm:text-base text-gray-600 font-medium">
              +91 123 456 7890
            </p>
            <p className="text-xs sm:text-sm text-[#115e59] mt-2 font-medium">
              Mon-Sat, 10AM-8PM
            </p>
          </a>

          <a
            href="mailto:info@krambica.com"
            className="group bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100"
          >
            <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-[#0d9488] to-[#0f766e] rounded-2xl flex items-center justify-center mb-4 sm:mb-6 group-hover:scale-110 transition-transform shadow-lg">
              <Mail className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">
              Email Us
            </h3>
            <p className="text-sm sm:text-base text-gray-600 font-medium">
              info@krambica.com
            </p>
            <p className="text-xs sm:text-sm text-[#0f766e] mt-2 font-medium">
              24h response time
            </p>
          </a>

          <a
            href="https://wa.me/911234567890"
            target="_blank"
            rel="noopener noreferrer"
            className="group bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100"
          >
            <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-[#10b981] to-[#059669] rounded-2xl flex items-center justify-center mb-4 sm:mb-6 group-hover:scale-110 transition-transform shadow-lg">
              <MessageCircle className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">
              WhatsApp
            </h3>
            <p className="text-sm sm:text-base text-gray-600 font-medium">
              Chat with us
            </p>
            <p className="text-xs sm:text-sm text-[#059669] mt-2 font-medium">
              Instant response
            </p>
          </a>

          <div className="group bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100">
            <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-[#0891b2] to-[#0e7490] rounded-2xl flex items-center justify-center mb-4 sm:mb-6 group-hover:scale-110 transition-transform shadow-lg">
              <MapPin className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">
              Visit Us
            </h3>
            <p className="text-sm sm:text-base text-gray-600 font-medium">
              2 Stores
            </p>
            <p className="text-xs sm:text-sm text-[#0e7490] mt-2 font-medium">
              See locations below
            </p>
          </div>
        </div>
      </div>

      {/* Contact Form */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 sm:mb-16 md:mb-20">
        <div className="bg-white rounded-3xl sm:rounded-[2.5rem] shadow-2xl p-6 sm:p-8 md:p-12 border border-gray-100">
          <div className="text-center mb-8 sm:mb-10 md:mb-12">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[#ccfbf1] to-[#99f6e4] px-4 sm:px-6 py-2 sm:py-3 rounded-full mb-4 sm:mb-6">
              <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-[#0f766e]" />
              <span className="text-xs sm:text-sm font-bold text-[#115e59]">
                Get In Touch
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-normal text-gray-900 mb-3 sm:mb-4">
              <span className="bg-gradient-to-r from-[#115e59] to-[#134e4a] bg-clip-text text-transparent">
                Send Us a Message
              </span>
            </h2>
            <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto">
              We'll respond within 24 hours
            </p>
          </div>

          {submitted && (
            <div className="mb-6 sm:mb-8 bg-gradient-to-r from-[#10b981] to-[#0d9488] text-white p-4 sm:p-6 rounded-2xl sm:rounded-3xl flex items-center gap-3 sm:gap-4 shadow-lg animate-bounce">
              <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0" />
              <p className="text-sm sm:text-base font-semibold">
                Message sent successfully! We'll get back to you soon.
              </p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[#115e59] pointer-events-none z-10">
                  <Users className="w-5 h-5" />
                </div>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full pl-12 pr-4 py-4 sm:py-5 border-2 border-gray-200 rounded-2xl text-sm sm:text-base focus:outline-none focus:border-[#115e59] focus:ring-4 focus:ring-[#ccfbf1] transition-all bg-gray-50 hover:bg-white"
                  placeholder="Full Name"
                  required
                />
              </div>

              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[#115e59] pointer-events-none z-10">
                  <Mail className="w-5 h-5" />
                </div>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="w-full pl-12 pr-4 py-4 sm:py-5 border-2 border-gray-200 rounded-2xl text-sm sm:text-base focus:outline-none focus:border-[#115e59] focus:ring-4 focus:ring-[#ccfbf1] transition-all bg-gray-50 hover:bg-white"
                  placeholder="Email Address"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[#115e59] pointer-events-none z-10">
                  <Phone className="w-5 h-5" />
                </div>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                  className="w-full pl-12 pr-4 py-4 sm:py-5 border-2 border-gray-200 rounded-2xl text-sm sm:text-base focus:outline-none focus:border-[#115e59] focus:ring-4 focus:ring-[#ccfbf1] transition-all bg-gray-50 hover:bg-white"
                  placeholder="Phone Number"
                  required
                />
              </div>

              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[#115e59] pointer-events-none z-10">
                  <MessageCircle className="w-5 h-5" />
                </div>
                <input
                  type="text"
                  value={formData.subject}
                  onChange={(e) =>
                    setFormData({ ...formData, subject: e.target.value })
                  }
                  className="w-full pl-12 pr-4 py-4 sm:py-5 border-2 border-gray-200 rounded-2xl text-sm sm:text-base focus:outline-none focus:border-[#115e59] focus:ring-4 focus:ring-[#ccfbf1] transition-all bg-gray-50 hover:bg-white"
                  placeholder="Subject"
                  required
                />
              </div>
            </div>

            <div className="relative">
              <textarea
                value={formData.message}
                onChange={(e) =>
                  setFormData({ ...formData, message: e.target.value })
                }
                className="w-full px-4 py-4 sm:py-5 border-2 border-gray-200 rounded-2xl text-sm sm:text-base focus:outline-none focus:border-[#115e59] focus:ring-4 focus:ring-[#ccfbf1] transition-all bg-gray-50 hover:bg-white resize-none"
                rows="5"
                placeholder="Your Message..."
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-[#115e59] to-[#134e4a] hover:from-[#134e4a] hover:to-[#115e59] text-white py-4 sm:py-5 px-8 rounded-2xl font-bold text-sm sm:text-base shadow-xl hover:shadow-2xl transition-all duration-300 flex items-center justify-center gap-3 disabled:opacity-70 disabled:cursor-not-allowed hover:scale-[1.02] active:scale-[0.98]"
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-3 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Sending...</span>
                </>
              ) : (
                <>
                  <Send className="w-5 h-5" />
                  <span>Send Message</span>
                </>
              )}
            </button>
          </form>
        </div>
      </div>

      {/* Store Locations */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 sm:mb-16 md:mb-20">
        <div className="text-center mb-8 sm:mb-12">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[#ccfbf1] to-[#99f6e4] px-4 sm:px-6 py-2 sm:py-3 rounded-full mb-4 sm:mb-6">
            <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-[#0f766e]" />
            <span className="text-xs sm:text-sm font-bold text-[#115e59]">
              Our Locations
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-normal text-gray-900 mb-3 sm:mb-4">
            <span className="bg-gradient-to-r from-[#115e59] to-[#134e4a] bg-clip-text text-transparent">
              Visit Our Stores
            </span>
          </h2>
          <p className="text-sm sm:text-base text-gray-600">
            Experience premium fashion in person
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
          <div className="group bg-white rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100">
            <div className="h-48 sm:h-56 bg-gradient-to-br from-[#115e59] to-[#134e4a] relative overflow-hidden">
              <div className="absolute inset-0 bg-black/20"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-white text-center">
                  <MapPin className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-2 sm:mb-4" />
                  <p className="text-xl sm:text-2xl font-bold">Mumbai Store</p>
                </div>
              </div>
            </div>
            <div className="p-6 sm:p-8">
              <h3 className="text-xl sm:text-2xl font-serif font-normal text-gray-900 mb-4 sm:mb-6">
                <span className="bg-gradient-to-r from-[#115e59] to-[#134e4a] bg-clip-text text-transparent">
                  Mumbai Flagship
                </span>
              </h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3 sm:gap-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#ccfbf1] rounded-xl flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 sm:w-6 sm:h-6 text-[#115e59]" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 text-sm sm:text-base">
                      Address
                    </p>
                    <p className="text-xs sm:text-sm text-gray-600 mt-1">
                      123 Fashion Street, Mumbai, MH 400001
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3 sm:gap-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#e0f2fe] rounded-xl flex items-center justify-center flex-shrink-0">
                    <Phone className="w-5 h-5 sm:w-6 sm:h-6 text-[#0e7490]" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 text-sm sm:text-base">
                      Phone
                    </p>
                    <a
                      href="tel:+911234567890"
                      className="text-xs sm:text-sm text-[#115e59] hover:text-[#134e4a] font-medium mt-1 block"
                    >
                      +91 123 456 7890
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-3 sm:gap-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#f0f9ff] rounded-xl flex items-center justify-center flex-shrink-0">
                    <Clock className="w-5 h-5 sm:w-6 sm:h-6 text-[#0891b2]" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 text-sm sm:text-base">
                      Hours
                    </p>
                    <p className="text-xs sm:text-sm text-gray-600 mt-1">
                      Mon-Sat: 10:00 AM - 8:00 PM
                    </p>
                  </div>
                </div>
              </div>
              <button className="mt-6 w-full bg-gradient-to-r from-[#115e59] to-[#134e4a] text-white py-3 sm:py-4 rounded-xl sm:rounded-2xl font-bold text-sm sm:text-base hover:shadow-lg transition-all flex items-center justify-center gap-2 group">
                <Navigation className="w-4 h-4 sm:w-5 sm:h-5 group-hover:rotate-45 transition-transform" />
                Get Directions
              </button>
            </div>
          </div>

          <div className="group bg-white rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100">
            <div className="h-48 sm:h-56 bg-gradient-to-br from-[#0d9488] to-[#0f766e] relative overflow-hidden">
              <div className="absolute inset-0 bg-black/20"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-white text-center">
                  <MapPin className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-2 sm:mb-4" />
                  <p className="text-xl sm:text-2xl font-bold">Delhi Store</p>
                </div>
              </div>
            </div>
            <div className="p-6 sm:p-8">
              <h3 className="text-xl sm:text-2xl font-serif font-normal text-gray-900 mb-4 sm:mb-6">
                <span className="bg-gradient-to-r from-[#115e59] to-[#134e4a] bg-clip-text text-transparent">
                  Delhi Boutique
                </span>
              </h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3 sm:gap-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#ccfbf1] rounded-xl flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 sm:w-6 sm:h-6 text-[#0f766e]" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 text-sm sm:text-base">
                      Address
                    </p>
                    <p className="text-xs sm:text-sm text-gray-600 mt-1">
                      456 Style Avenue, New Delhi, DL 110001
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3 sm:gap-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#fce7f3] rounded-xl flex items-center justify-center flex-shrink-0">
                    <Phone className="w-5 h-5 sm:w-6 sm:h-6 text-[#db2777]" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 text-sm sm:text-base">
                      Phone
                    </p>
                    <a
                      href="tel:+919876543210"
                      className="text-xs sm:text-sm text-[#0f766e] hover:text-[#134e4a] font-medium mt-1 block"
                    >
                      +91 987 654 3210
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-3 sm:gap-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#ffedd5] rounded-xl flex items-center justify-center flex-shrink-0">
                    <Clock className="w-5 h-5 sm:w-6 sm:h-6 text-[#ea580c]" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 text-sm sm:text-base">
                      Hours
                    </p>
                    <p className="text-xs sm:text-sm text-gray-600 mt-1">
                      Mon-Sat: 10:00 AM - 9:00 PM
                    </p>
                  </div>
                </div>
              </div>
              <button className="mt-6 w-full bg-gradient-to-r from-[#0d9488] to-[#0f766e] text-white py-3 sm:py-4 rounded-xl sm:rounded-2xl font-bold text-sm sm:text-base hover:shadow-lg transition-all flex items-center justify-center gap-2 group">
                <Navigation className="w-4 h-4 sm:w-5 sm:h-5 group-hover:rotate-45 transition-transform" />
                Get Directions
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 sm:mb-16 md:mb-20">
        <div className="text-center mb-8 sm:mb-12">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[#ccfbf1] to-[#99f6e4] px-4 sm:px-6 py-2 sm:py-3 rounded-full mb-4 sm:mb-6">
            <Zap className="w-4 h-4 sm:w-5 sm:h-5 text-[#0f766e]" />
            <span className="text-xs sm:text-sm font-bold text-[#115e59]">
              FAQ
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-normal text-gray-900 mb-3 sm:mb-4">
            <span className="bg-gradient-to-r from-[#115e59] to-[#134e4a] bg-clip-text text-transparent">
              Frequently Asked Questions
            </span>
          </h2>
          <p className="text-sm sm:text-base text-gray-600">
            Quick answers to common questions
          </p>
        </div>

        <div className="space-y-4">
          {[
            {
              q: "What are your store hours?",
              a: "Our stores are open Monday through Saturday from 10:00 AM to 8:00 PM. We are closed on Sundays and major holidays.",
            },
            {
              q: "Do you offer online shopping?",
              a: "Yes! You can shop our entire collection online at krambica.com with free shipping on orders over ₹999.",
            },
            {
              q: "What is your return policy?",
              a: "We accept returns within 14 days of purchase with original tags attached. Items must be unworn and in original condition.",
            },
            {
              q: "Do you offer customization?",
              a: "Yes, we offer alterations and customization services at both store locations. Contact us for details.",
            },
            {
              q: "How can I track my order?",
              a: "Once shipped, you will receive a tracking number via email and SMS. You can also track from your account.",
            },
          ].map((faq, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl sm:rounded-3xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-all"
            >
              <button
                onClick={() =>
                  setActiveAccordion(activeAccordion === i ? null : i)
                }
                className="w-full px-6 sm:px-8 py-5 sm:py-6 flex items-center justify-between gap-4 text-left hover:bg-gray-50 transition-colors"
              >
                <h3 className="text-sm sm:text-base md:text-lg font-bold text-gray-900 flex-1">
                  <span className="bg-gradient-to-r from-[#115e59] to-[#134e4a] bg-clip-text text-transparent">
                    {faq.q}
                  </span>
                </h3>
                <ChevronDown
                  className={`w-5 h-5 sm:w-6 sm:h-6 text-[#115e59] flex-shrink-0 transition-transform ${
                    activeAccordion === i ? "rotate-180" : ""
                  }`}
                />
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  activeAccordion === i ? "max-h-96" : "max-h-0"
                }`}
              >
                <div className="px-6 sm:px-8 pb-5 sm:pb-6">
                  <p className="text-xs sm:text-sm md:text-base text-gray-600 leading-relaxed">
                    {faq.a}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Trust Badges */}
      <div className="bg-gradient-to-br from-[#f0fdfa] to-[#ccfbf1] py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-normal mb-3 sm:mb-4">
              <span className="bg-gradient-to-r from-[#115e59] to-[#134e4a] bg-clip-text text-transparent">
                Why Choose Us
              </span>
            </h2>
            <p className="text-sm sm:text-base text-gray-600">
              We're committed to excellence in every detail
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            <div className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 text-center shadow-sm hover:shadow-md transition-all hover:-translate-y-1">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-[#115e59] to-[#134e4a] rounded-2xl flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <Shield className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
              </div>
              <h4 className="text-sm sm:text-base font-bold text-gray-900 mb-1 sm:mb-2">
                Secure
              </h4>
              <p className="text-xs sm:text-sm text-[#115e59]">100% Safe</p>
            </div>
            <div className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 text-center shadow-sm hover:shadow-md transition-all hover:-translate-y-1">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-[#0d9488] to-[#0f766e] rounded-2xl flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <CheckCircle className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
              </div>
              <h4 className="text-sm sm:text-base font-bold text-gray-900 mb-1 sm:mb-2">
                Quality
              </h4>
              <p className="text-xs sm:text-sm text-[#0f766e]">Premium</p>
            </div>
            <div className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 text-center shadow-sm hover:shadow-md transition-all hover:-translate-y-1">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-[#0891b2] to-[#0e7490] rounded-2xl flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <Award className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
              </div>
              <h4 className="text-sm sm:text-base font-bold text-gray-900 mb-1 sm:mb-2">
                Authentic
              </h4>
              <p className="text-xs sm:text-sm text-[#0891b2]">Verified</p>
            </div>
            <div className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 text-center shadow-sm hover:shadow-md transition-all hover:-translate-y-1">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-[#10b981] to-[#059669] rounded-2xl flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <Zap className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
              </div>
              <h4 className="text-sm sm:text-base font-bold text-gray-900 mb-1 sm:mb-2">
                Fast
              </h4>
              <p className="text-xs sm:text-sm text-[#059669]">24h Reply</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
