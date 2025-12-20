"use client";
import React, { useState } from "react";
import {
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaEnvelope,
  FaClock,
} from "react-icons/fa";
import { FiInstagram, FiFacebook } from "react-icons/fi";
import { FaTiktok, FaWhatsapp } from "react-icons/fa";
import { MdMessage, MdLocationOn, MdEmail } from "react-icons/md";

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

// Contact Hero Section
const ContactHero = () => {
  return (
    <section
      className="pt-8 md:pt-16 px-4 md:px-16 py-8 md:py-16"
      style={{ background: COLORS.gradients.dark }}
    >
      <div className="max-w-6xl mx-auto">
        <div className="text-center text-white">
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6"
            style={{
              background: "rgba(255, 255, 255, 0.1)",
              border: "1px solid rgba(255, 255, 255, 0.2)",
            }}
          >
            <MdMessage className="w-4 h-4" />
            <span className="text-sm font-semibold">GET IN TOUCH</span>
          </div>

          <h1 className="text-3xl md:text-5xl font-serif leading-tight mb-4 md:mb-6">
            Contact Us
          </h1>
          <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto leading-relaxed">
            We're here to help with any questions about our pure cotton clothing
            collections. Reach out and let's start a conversation about comfort.
          </p>
        </div>
      </div>
    </section>
  );
};

// Contact Information Cards
const ContactInfo = () => {
  const contactMethods = [
    {
      icon: <FaPhoneAlt className="w-6 h-6" />,
      title: "Phone & WhatsApp",
      details: ["+91 98765 43210", "+91 98765 43211"],
      description: "Available 9 AM - 8 PM IST",
      action: "Call Now",
      actionLink: "tel:+919876543210",
      color: "from-blue-500 to-blue-600",
    },
    {
      icon: <MdEmail className="w-6 h-6" />,
      title: "Email Us",
      details: ["hello@purecotton.com", "support@purecotton.com"],
      description: "Response within 24 hours",
      action: "Send Email",
      actionLink: "mailto:hello@purecotton.com",
      color: "from-green-500 to-green-600",
    },
    {
      icon: <MdLocationOn className="w-6 h-6" />,
      title: "Visit Our Store",
      details: ["123 Cotton Street", "Mumbai, India 400001"],
      description: "Open 10 AM - 8 PM, Monday - Saturday",
      action: "Get Directions",
      actionLink: "https://maps.google.com",
      color: "from-orange-500 to-orange-600",
    },
    {
      icon: <FaClock className="w-6 h-6" />,
      title: "Business Hours",
      details: [
        "Monday - Friday: 9 AM - 8 PM",
        "Saturday: 10 AM - 7 PM",
        "Sunday: 11 AM - 6 PM",
      ],
      description: "Online support available 24/7",
      action: "View FAQ",
      actionLink: "#faq",
      color: "from-purple-500 to-purple-600",
    },
  ];

  return (
    <section className="px-4 md:px-16 py-12 md:py-20 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-2xl md:text-4xl font-serif text-gray-800 mb-4">
            Multiple Ways to Connect
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-sm md:text-base">
            Choose your preferred method to reach our customer support team
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {contactMethods.map((method, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-6 md:p-8 border border-gray-100"
            >
              <div
                className={`w-16 h-16 rounded-2xl flex items-center justify-center text-white mb-6 bg-gradient-to-r ${method.color}`}
              >
                {method.icon}
              </div>

              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {method.title}
              </h3>

              <div className="space-y-2 mb-4">
                {method.details.map((detail, idx) => (
                  <p key={idx} className="text-gray-700 text-sm md:text-base">
                    {detail}
                  </p>
                ))}
              </div>

              <p className="text-sm text-gray-500 mb-6">{method.description}</p>

              <a
                href={method.actionLink}
                className="inline-block px-4 py-2 rounded-lg font-medium text-sm hover:scale-105 transition-transform"
                style={{
                  background: COLORS.gradients.primary,
                  color: "white",
                }}
              >
                {method.action}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Contact Form
const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log("Form submitted:", formData);
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <section
      className="px-4 md:px-16 py-12 md:py-20"
      style={{ background: COLORS.gradients.light }}
    >
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-2xl md:text-4xl font-serif text-gray-800 mb-4">
            Send Us a Message
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-sm md:text-base">
            Fill out the form below and we'll get back to you as soon as
            possible
          </p>
        </div>

        <div className="bg-white rounded-2xl md:rounded-3xl shadow-2xl overflow-hidden">
          <div className="md:flex">
            {/* Form Side */}
            <div className="md:w-2/3 p-6 md:p-10">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-teal-500 focus:ring-2 focus:ring-teal-200 focus:outline-none transition-colors"
                      placeholder="Enter your full name"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-teal-500 focus:ring-2 focus:ring-teal-200 focus:outline-none transition-colors"
                      placeholder="Enter your email"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-teal-500 focus:ring-2 focus:ring-teal-200 focus:outline-none transition-colors"
                      placeholder="Enter your phone number"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Subject *
                    </label>
                    <select
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-teal-500 focus:ring-2 focus:ring-teal-200 focus:outline-none transition-colors"
                    >
                      <option value="">Select a subject</option>
                      <option value="order">Order Inquiry</option>
                      <option value="size">Size & Fit Help</option>
                      <option value="return">Returns & Exchange</option>
                      <option value="product">Product Question</option>
                      <option value="feedback">Feedback</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Your Message *
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-teal-500 focus:ring-2 focus:ring-teal-200 focus:outline-none transition-colors resize-none"
                    placeholder="Tell us how we can help you..."
                  />
                </div>

                <div className="flex items-center space-x-4">
                  <input
                    type="checkbox"
                    id="newsletter"
                    className="w-4 h-4 text-teal-600 rounded focus:ring-teal-500"
                  />
                  <label htmlFor="newsletter" className="text-sm text-gray-600">
                    Subscribe to our newsletter for updates on new collections
                    and offers
                  </label>
                </div>

                <PrimaryButton
                  type="submit"
                  size="lg"
                  className="w-full md:w-auto"
                >
                  Send Message
                  <span className="ml-2">→</span>
                </PrimaryButton>
              </form>
            </div>

            {/* Info Side */}
            <div
              className="md:w-1/3 p-6 md:p-10 text-white"
              style={{ background: COLORS.gradients.primary }}
            >
              <h3 className="text-xl font-semibold mb-6">Why Contact Us?</h3>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                    <span className="text-white">✓</span>
                  </div>
                  <div>
                    <h4 className="font-medium mb-1">Quick Response</h4>
                    <p className="text-white/80 text-sm">
                      Get answers within 24 hours
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                    <span className="text-white">👗</span>
                  </div>
                  <div>
                    <h4 className="font-medium mb-1">Size Guidance</h4>
                    <p className="text-white/80 text-sm">
                      Personalized fitting advice
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                    <span className="text-white">💫</span>
                  </div>
                  <div>
                    <h4 className="font-medium mb-1">Cotton Expertise</h4>
                    <p className="text-white/80 text-sm">
                      Answers about fabric & care
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                    <span className="text-white">🔄</span>
                  </div>
                  <div>
                    <h4 className="font-medium mb-1">Easy Returns</h4>
                    <p className="text-white/80 text-sm">
                      Hassle-free return process
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-8 border-t border-white/20">
                <p className="text-sm mb-4">
                  Need immediate help? WhatsApp us now:
                </p>
                <a
                  href="https://wa.me/919876543210"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-medium bg-white text-teal-700 hover:bg-teal-50 transition-colors"
                >
                  <FaWhatsapp className="w-5 h-5" />
                  Chat on WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// FAQ Section
const FAQSection = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const faqs = [
    {
      question: "What are your shipping options and delivery times?",
      answer:
        "We offer standard (5-7 business days), express (2-3 business days), and same-day delivery in major cities. Shipping charges vary based on location and delivery speed. You'll receive tracking information once your order ships.",
    },
    {
      question: "How do I choose the right size for cotton clothing?",
      answer:
        "We provide detailed size charts for each product. For the best fit, measure yourself and compare with our size guide. If you're between sizes, we recommend sizing up for cotton clothing as it provides a more comfortable fit. Our customer service team can also provide personalized size recommendations.",
    },
    {
      question: "What is your return and exchange policy?",
      answer:
        "We offer a 30-day return policy for unworn items with original tags attached. Exchanges are free for size-related issues. For returns, we provide a prepaid return label and process refunds within 5-7 business days of receiving the returned item.",
    },
    {
      question: "How should I care for pure cotton clothing?",
      answer:
        "Pure cotton should be washed in cold or lukewarm water with mild detergent. Avoid bleach and fabric softeners. Tumble dry on low heat or air dry for best results. Iron on medium heat while the garment is slightly damp for a crisp finish. Follow specific care instructions on each garment's label.",
    },
    {
      question: "Do you offer bulk or wholesale orders?",
      answer:
        "Yes, we offer special pricing for bulk orders (10+ pieces) and wholesale partnerships. Contact our business team at wholesale@purecotton.com for custom quotes, minimum order requirements, and partnership opportunities.",
    },
  ];

  return (
    <section className="px-4 md:px-16 py-12 md:py-20 bg-white">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-2xl md:text-4xl font-serif text-gray-800 mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-sm md:text-base">
            Quick answers to common questions about our cotton clothing
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="border border-gray-200 rounded-2xl overflow-hidden"
            >
              <button
                className="w-full px-6 py-5 text-left flex justify-between items-center hover:bg-gray-50 transition-colors"
                onClick={() => setOpenFaq(openFaq === index ? null : index)}
              >
                <span className="text-lg font-medium text-gray-900">
                  {faq.question}
                </span>
                <span
                  className={`transform transition-transform ${
                    openFaq === index ? "rotate-180" : ""
                  }`}
                >
                  <svg
                    className="w-5 h-5 text-gray-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </span>
              </button>

              {openFaq === index && (
                <div className="px-6 py-5 bg-gray-50">
                  <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-600 mb-6">
            Still have questions? We're here to help!
          </p>
          <a
            href="mailto:support@purecotton.com"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-medium hover:bg-gray-50 transition-colors border-2"
            style={{
              borderColor: COLORS.primary.teal,
              color: COLORS.primary.teal,
            }}
          >
            <MdEmail className="w-5 h-5" />
            Email Your Question
          </a>
        </div>
      </div>
    </section>
  );
};

// Social Connect Section
const SocialConnect = () => {
  const socialPlatforms = [
    {
      icon: <FiInstagram className="w-6 h-6" />,
      name: "Instagram",
      handle: "@purecotton",
      description: "See our latest collections & styling tips",
      link: "https://instagram.com",
      color: "from-pink-500 to-purple-600",
    },
    {
      icon: <FiFacebook className="w-6 h-6" />,
      name: "Facebook",
      handle: "Pure Cotton Clothing",
      description: "Join our community & get updates",
      link: "https://facebook.com",
      color: "from-blue-600 to-blue-700",
    },
    {
      icon: <FaTiktok className="w-6 h-6" />,
      name: "TikTok",
      handle: "@purecottonfashion",
      description: "Watch styling videos & behind the scenes",
      link: "https://tiktok.com",
      color: "from-black to-gray-800",
    },
    {
      icon: <FaWhatsapp className="w-6 h-6" />,
      name: "WhatsApp",
      handle: "+91 98765 43210",
      description: "Quick customer support & orders",
      link: "https://wa.me/919876543210",
      color: "from-green-500 to-green-600",
    },
  ];

  return (
    <section
      className="px-4 md:px-16 py-12 md:py-20"
      style={{ background: COLORS.gradients.light }}
    >
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-2xl md:text-4xl font-serif text-gray-800 mb-4">
            Connect With Us
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-sm md:text-base">
            Stay updated with our latest collections, offers, and styling tips
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {socialPlatforms.map((platform, index) => (
            <a
              key={index}
              href={platform.link}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 p-6 md:p-8 border border-gray-100"
            >
              <div
                className={`w-16 h-16 rounded-2xl flex items-center justify-center text-white mb-6 bg-gradient-to-r ${platform.color}`}
              >
                {platform.icon}
              </div>

              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {platform.name}
              </h3>

              <p className="text-gray-700 mb-2">{platform.handle}</p>

              <p className="text-sm text-gray-500">{platform.description}</p>

              <div
                className="mt-6 flex items-center text-sm font-medium"
                style={{ color: COLORS.primary.teal }}
              >
                Follow Us
                <span className="ml-2">→</span>
              </div>
            </a>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-600 mb-4">
            Sign up for exclusive updates and offers
          </p>
          <div className="max-w-md mx-auto flex gap-3">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-xl border border-gray-300 focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-200"
            />
            <PrimaryButton>Subscribe</PrimaryButton>
          </div>
        </div>
      </div>
    </section>
  );
};

// Map Section
const MapSection = () => {
  return (
    <section className="px-4 md:px-16 py-12 md:py-20 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-2xl md:text-4xl font-serif text-gray-800 mb-4">
            Visit Our Store
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-sm md:text-base">
            Come experience our pure cotton collections in person
          </p>
        </div>

        <div className="rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl">
          {/* Map Placeholder with Image */}
          <div className="relative h-64 md:h-96 bg-gray-200">
            <img
              src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&h=600&fit=crop"
              alt="Store Location"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>

            {/* Location Marker */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <div className="w-12 h-12 rounded-full bg-white shadow-xl flex items-center justify-center animate-pulse">
                <MdLocationOn
                  className="w-6 h-6"
                  style={{ color: COLORS.primary.teal }}
                />
              </div>
            </div>

            {/* Location Info Overlay */}
            <div className="absolute bottom-6 left-6 right-6 bg-white/90 backdrop-blur-sm rounded-2xl p-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    Pure Cotton Store
                  </h3>
                  <p className="text-gray-700">
                    123 Cotton Street, Mumbai, India 400001
                  </p>
                  <p className="text-gray-500 text-sm mt-1">
                    Open 10 AM - 8 PM, Monday - Saturday
                  </p>
                </div>
                <a
                  href="https://maps.google.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-medium hover:scale-105 transition-transform"
                  style={{
                    background: COLORS.gradients.primary,
                    color: "white",
                  }}
                >
                  <MdLocationOn className="w-5 h-5" />
                  Get Directions
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
          <div className="text-center">
            <div
              className="w-16 h-16 rounded-2xl mx-auto mb-4 flex items-center justify-center"
              style={{ background: COLORS.gradients.primary }}
            >
              <FaClock className="w-8 h-8 text-white" />
            </div>
            <h4 className="text-lg font-semibold text-gray-900 mb-2">
              Store Hours
            </h4>
            <p className="text-gray-600">Mon-Sat: 10 AM - 8 PM</p>
            <p className="text-gray-600">Sunday: 11 AM - 6 PM</p>
          </div>

          <div className="text-center">
            <div
              className="w-16 h-16 rounded-2xl mx-auto mb-4 flex items-center justify-center"
              style={{ background: COLORS.gradients.primary }}
            >
              <FaPhoneAlt className="w-8 h-8 text-white" />
            </div>
            <h4 className="text-lg font-semibold text-gray-900 mb-2">
              Store Contact
            </h4>
            <p className="text-gray-600">+91 98765 43210</p>
            <p className="text-gray-600">store@purecotton.com</p>
          </div>

          <div className="text-center">
            <div
              className="w-16 h-16 rounded-2xl mx-auto mb-4 flex items-center justify-center"
              style={{ background: COLORS.gradients.primary }}
            >
              <span className="text-2xl text-white">👗</span>
            </div>
            <h4 className="text-lg font-semibold text-gray-900 mb-2">
              Store Services
            </h4>
            <p className="text-gray-600">Personal Styling</p>
            <p className="text-gray-600">Alterations Available</p>
          </div>
        </div>
      </div>
    </section>
  );
};

// Footer Component
const Footer = () => {
  return (
    <footer className="bg-white px-4 md:px-16 py-8 md:py-12 border-t border-gray-200">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-12 mb-8 md:mb-12">
        <div>
          <h3 className="font-semibold mb-3 md:mb-4 text-gray-800 text-xs md:text-sm">
            Quick Links
          </h3>
          <ul className="space-y-2 text-sm text-gray-700">
            {[
              "Home",
              "Collections",
              "About Us",
              "Size Guide",
              "Care Guide",
              "Contact",
            ].map((item, index) => (
              <li key={index}>
                <a href="#" className="hover:text-gray-900">
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-semibold mb-3 md:mb-4 text-gray-800 text-xs md:text-sm">
            Customer Service
          </h3>
          <ul className="space-y-2 text-sm text-gray-700">
            {[
              "Shipping Policy",
              "Return Policy",
              "Size Exchange",
              "FAQ",
              "Track Order",
              "Privacy Policy",
            ].map((item, index) => (
              <li key={index}>
                <a href="#" className="hover:text-gray-900">
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-semibold mb-3 md:mb-4 text-gray-800 text-xs md:text-sm">
            Contact Info
          </h3>
          <div className="space-y-3 text-sm text-gray-700">
            <p className="flex items-center gap-3">
              <span
                className="w-8 h-8 rounded-full flex items-center justify-center text-white"
                style={{ background: COLORS.gradients.primary }}
              >
                <FaPhoneAlt className="w-4 h-4" />
              </span>
              +91 98765 43210
            </p>
            <p className="flex items-start gap-3">
              <span
                className="w-8 h-8 rounded-full flex items-center justify-center text-white"
                style={{ background: COLORS.gradients.primary }}
              >
                <FaMapMarkerAlt className="w-4 h-4" />
              </span>
              <span className="text-sm">
                123 Cotton Street
                <br />
                Mumbai, India 400001
              </span>
            </p>
            <p className="flex items-center gap-3">
              <span
                className="w-8 h-8 rounded-full flex items-center justify-center text-white"
                style={{ background: COLORS.gradients.primary }}
              >
                <FaEnvelope className="w-4 h-4" />
              </span>
              hello@purecotton.com
            </p>
          </div>
        </div>

        <div>
          <h3 className="font-semibold mb-3 md:mb-4 text-gray-800 text-xs md:text-sm">
            Follow Us
          </h3>
          <div className="flex gap-4 mb-6">
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
            <a
              href="#"
              className="w-10 h-10 rounded-full flex items-center justify-center text-white hover:scale-110 transition-transform"
              style={{ background: COLORS.gradients.primary }}
            >
              <FaWhatsapp className="w-5 h-5" />
            </a>
          </div>
          <p className="text-xs text-gray-500">
            Subscribe to our newsletter for exclusive offers
          </p>
        </div>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-center pt-6 md:pt-8 border-t border-gray-300 text-xs text-gray-600 gap-4 md:gap-0">
        <p className="text-center md:text-left">
          © 2024 Pure Cotton Clothing. All rights reserved.
        </p>
        <div className="flex gap-4 md:gap-6">
          <a href="#" className="hover:text-gray-900 text-xs">
            Privacy Policy
          </a>
          <a href="#" className="hover:text-gray-900 text-xs">
            Terms of Service
          </a>
          <a href="#" className="hover:text-gray-900 text-xs">
            Cotton Quality Promise
          </a>
        </div>
      </div>
    </footer>
  );
};

// Main Contact Page Component
const ContactPage = () => {
  return (
    <div className="bg-white">
      <ContactHero />
      <ContactInfo />
      <ContactForm />
      <FAQSection />
      <MapSection />
      <SocialConnect />
      <Footer />
    </div>
  );
};

export default ContactPage;
