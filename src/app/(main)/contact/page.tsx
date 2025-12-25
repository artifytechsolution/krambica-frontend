"use client";
import React, { useState } from "react";
// Importing icons from 'react-icons'
// fi = Feather Icons (Clean, minimal, perfect for fashion)
// fa = Font Awesome (For brand logos)
import {
  FiMail,
  FiPhone,
  FiMapPin,
  FiArrowRight,
  FiClock,
  FiPlus,
  FiMinus,
  FiSend,
  FiCheckCircle,
  FiLoader,
  FiShield,
  FiZap,
  FiAward,
} from "react-icons/fi";
import {
  FaInstagram,
  FaTwitter,
  FaLinkedinIn,
  FaWhatsapp,
} from "react-icons/fa";
import Image from "next/image";

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
  const [activeAccordion, setActiveAccordion] = useState(0);

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
    <div className="min-h-screen bg-[#FDFBF7] text-slate-800 font-sans selection:bg-emerald-900 selection:text-white">
      {/* --- HERO SECTION: Minimalist & Editorial --- */}
      <section className="relative pt-20 pb-16 lg:pt-32 lg:pb-24 px-6 lg:px-12 border-b border-stone-200">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-end">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-stone-300 bg-white mb-6">
              <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse"></span>
              <span className="text-xs font-medium uppercase tracking-wider text-stone-500">
                Contact Us
              </span>
            </div>
            <h1 className="text-5xl lg:text-7xl font-serif text-slate-900 leading-[1.1] mb-6">
              Let's start a <br />
              <span className="italic text-emerald-800">conversation.</span>
            </h1>
            <p className="text-lg text-slate-600 max-w-md leading-relaxed">
              From Bhavnagar to Baroda, we are here to assist you with your
              fashion inquiries and orders.
            </p>
          </div>

          {/* Quick Stats / Socials */}
          <div className="flex flex-col lg:items-end gap-6">
            <div className="flex gap-4">
              {[FaInstagram, FaTwitter, FaLinkedinIn].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-12 h-12 rounded-full border border-stone-200 flex items-center justify-center text-slate-600 hover:bg-emerald-900 hover:text-white hover:border-emerald-900 transition-all duration-300"
                >
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
            <p className="text-sm font-medium text-slate-400">
              @KrambicaOfficial
            </p>
          </div>
        </div>
      </section>

      {/* --- MAIN CONTENT GRID --- */}
      <section className="max-w-7xl mx-auto px-6 lg:px-12 py-16 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">
          {/* LEFT COLUMN: Contact Info (Bento Grid Style) */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-2">
              <h2 className="text-2xl font-serif">Get in touch</h2>
              <p className="text-slate-500">
                Choose the most convenient method for you.
              </p>
            </div>

            <div className="grid gap-4">
              {/* Card 1: Email */}
              <a
                href="mailto:hello@krambica.com"
                className="group p-6 bg-white rounded-2xl border border-stone-100 shadow-sm hover:shadow-xl hover:border-emerald-100 transition-all duration-300"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 bg-stone-50 rounded-xl group-hover:bg-emerald-50 transition-colors">
                    <FiMail className="w-6 h-6 text-slate-700 group-hover:text-emerald-700" />
                  </div>
                  <FiArrowRight className="w-5 h-5 text-stone-300 group-hover:text-emerald-700 -translate-x-2 group-hover:translate-x-0 opacity-0 group-hover:opacity-100 transition-all" />
                </div>
                <h3 className="font-semibold text-lg mb-1">Email Support</h3>
                <p className="text-slate-500 text-sm mb-2">
                  For general inquiries and support.
                </p>
                <p className="font-medium text-emerald-800">
                  hello@krambica.com
                </p>
              </a>

              {/* Card 2: Phone */}
              <a
                href="tel:+911234567890"
                className="group p-6 bg-white rounded-2xl border border-stone-100 shadow-sm hover:shadow-xl hover:border-emerald-100 transition-all duration-300"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 bg-stone-50 rounded-xl group-hover:bg-emerald-50 transition-colors">
                    <FiPhone className="w-6 h-6 text-slate-700 group-hover:text-emerald-700" />
                  </div>
                  <FiArrowRight className="w-5 h-5 text-stone-300 group-hover:text-emerald-700 -translate-x-2 group-hover:translate-x-0 opacity-0 group-hover:opacity-100 transition-all" />
                </div>
                <h3 className="font-semibold text-lg mb-1">Phone Line</h3>
                <p className="text-slate-500 text-sm mb-2">
                  Mon-Fri from 10am to 8pm.
                </p>
                <p className="font-medium text-emerald-800">+91 123 456 7890</p>
              </a>

              {/* Card 3: WhatsApp */}
              <a
                href="#"
                className="group p-6 bg-[#25D366]/10 rounded-2xl border border-[#25D366]/20 hover:bg-[#25D366]/20 transition-all duration-300"
              >
                <div className="flex items-center gap-4">
                  <div className="p-2 bg-[#25D366] rounded-full text-white">
                    <FaWhatsapp className="w-5 h-5 fill-current" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-emerald-950">
                      Chat on WhatsApp
                    </h3>
                    <p className="text-xs text-emerald-800">
                      Instant response (9am - 9pm)
                    </p>
                  </div>
                </div>
              </a>
            </div>

            {/* Trust Badges */}
            <div className="pt-8 border-t border-stone-200">
              <h4 className="text-xs font-bold uppercase tracking-widest text-stone-400 mb-6">
                Our Promise
              </h4>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-3">
                  <FiShield className="w-5 h-5 text-emerald-700" />
                  <span className="text-sm font-medium text-slate-600">
                    Secure Data
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <FiZap className="w-5 h-5 text-emerald-700" />
                  <span className="text-sm font-medium text-slate-600">
                    24h Response
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <FiAward className="w-5 h-5 text-emerald-700" />
                  <span className="text-sm font-medium text-slate-600">
                    Top Rated
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: The Form */}
          <div className="lg:col-span-7">
            <div className="bg-white p-8 lg:p-12 rounded-[2rem] shadow-[0_20px_50px_rgba(8,112,184,0.07)] border border-stone-100 relative overflow-hidden">
              {/* Decorative gradient blur */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-50 rounded-full blur-3xl -z-10 opacity-60 pointer-events-none translate-x-1/2 -translate-y-1/2"></div>

              <div className="mb-10">
                <h2 className="text-3xl font-serif text-slate-900 mb-2">
                  Send us a message
                </h2>
                <p className="text-slate-500">
                  We usually respond within a few hours.
                </p>
              </div>

              {submitted ? (
                <div className="h-96 flex flex-col items-center justify-center text-center animate-in fade-in zoom-in duration-500">
                  <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mb-6">
                    <FiCheckCircle className="w-10 h-10 text-emerald-600" />
                  </div>
                  <h3 className="text-2xl font-serif text-slate-900 mb-2">
                    Message Sent!
                  </h3>
                  <p className="text-slate-500 max-w-xs">
                    Thank you for contacting Krambica. We'll be in touch
                    shortly.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-8">
                  <div className="grid md:grid-cols-2 gap-8">
                    {/* Name */}
                    <div className="group relative z-0 w-full mb-6 group">
                      <input
                        type="text"
                        name="name"
                        className="block py-3 px-0 w-full text-base text-slate-900 bg-transparent border-0 border-b border-stone-300 appearance-none focus:outline-none focus:ring-0 focus:border-emerald-600 peer"
                        placeholder=" "
                        required
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                      />
                      <label className="peer-focus:font-medium absolute text-base text-stone-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-emerald-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                        Full Name
                      </label>
                    </div>

                    {/* Email */}
                    <div className="group relative z-0 w-full mb-6 group">
                      <input
                        type="email"
                        name="email"
                        className="block py-3 px-0 w-full text-base text-slate-900 bg-transparent border-0 border-b border-stone-300 appearance-none focus:outline-none focus:ring-0 focus:border-emerald-600 peer"
                        placeholder=" "
                        required
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                      />
                      <label className="peer-focus:font-medium absolute text-base text-stone-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-emerald-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                        Email Address
                      </label>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-8">
                    {/* Phone */}
                    <div className="group relative z-0 w-full mb-6 group">
                      <input
                        type="tel"
                        name="phone"
                        className="block py-3 px-0 w-full text-base text-slate-900 bg-transparent border-0 border-b border-stone-300 appearance-none focus:outline-none focus:ring-0 focus:border-emerald-600 peer"
                        placeholder=" "
                        value={formData.phone}
                        onChange={(e) =>
                          setFormData({ ...formData, phone: e.target.value })
                        }
                      />
                      <label className="peer-focus:font-medium absolute text-base text-stone-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-emerald-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                        Phone (Optional)
                      </label>
                    </div>

                    {/* Subject */}
                    <div className="group relative z-0 w-full mb-6 group">
                      <input
                        type="text"
                        name="subject"
                        className="block py-3 px-0 w-full text-base text-slate-900 bg-transparent border-0 border-b border-stone-300 appearance-none focus:outline-none focus:ring-0 focus:border-emerald-600 peer"
                        placeholder=" "
                        required
                        value={formData.subject}
                        onChange={(e) =>
                          setFormData({ ...formData, subject: e.target.value })
                        }
                      />
                      <label className="peer-focus:font-medium absolute text-base text-stone-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-emerald-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                        Subject
                      </label>
                    </div>
                  </div>

                  {/* Message */}
                  <div className="group relative z-0 w-full mb-6 group">
                    <textarea
                      name="message"
                      rows="4"
                      className="block py-3 px-0 w-full text-base text-slate-900 bg-transparent border-0 border-b border-stone-300 appearance-none focus:outline-none focus:ring-0 focus:border-emerald-600 peer resize-none"
                      placeholder=" "
                      required
                      value={formData.message}
                      onChange={(e) =>
                        setFormData({ ...formData, message: e.target.value })
                      }
                    ></textarea>
                    <label className="peer-focus:font-medium absolute text-base text-stone-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-emerald-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                      Your Message
                    </label>
                  </div>

                  <div className="pt-4">
                    <button
                      type="submit"
                      disabled={loading}
                      className="group w-full md:w-auto px-8 py-4 bg-emerald-900 text-white rounded-full font-medium transition-all duration-300 hover:bg-emerald-800 disabled:opacity-70 disabled:cursor-not-allowed shadow-lg hover:shadow-emerald-900/20 flex items-center justify-center gap-3"
                    >
                      {loading ? (
                        <FiLoader className="w-5 h-5 animate-spin" />
                      ) : (
                        <span>Send Message</span>
                      )}
                      {!loading && (
                        <FiSend className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* --- LOCATIONS SECTION: Bhavnagar & Baroda --- */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <h2 className="text-4xl font-serif text-slate-900 mb-4">
                Our Stores
              </h2>
              <p className="text-slate-500">
                Experience our collection in Gujarat.
              </p>
            </div>
            {/* <button className="text-emerald-800 font-medium hover:text-emerald-600 flex items-center gap-2">
              View all locations <FiArrowRight className="w-4 h-4" />
            </button> */}
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Vadodara (Gotri) Store */}
            <div className="group relative h-[400px] rounded-3xl overflow-hidden cursor-pointer">
              {/* Overlay Layer */}
              <div className="absolute inset-0 bg-slate-900/30 group-hover:bg-slate-900/20 transition-colors z-10"></div>

              {/* Image Layer */}
              <div className="absolute inset-0 transition-transform duration-700 group-hover:scale-105">
                <Image
                  src="/journey/journey5.jpg"
                  alt="Vadodara Studio"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  priority={true}
                />
              </div>

              {/* Content Layer */}
              <div className="absolute bottom-0 left-0 p-8 z-20 w-full text-white">
                <div className="flex justify-between items-end">
                  <div>
                    <h3 className="text-3xl font-serif mb-2">Baroda Studio</h3>
                    <div className="flex items-center gap-2 text-white/80 text-sm mb-1">
                      <FiMapPin className="w-4 h-4" />
                      <span>
                        111, Lotus Elite, Gotri Sevasi Road,
                        <br />
                        Gotri, Vadodara 390021,
                        <br />
                        Gujarat, India
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-white/80 text-sm">
                      <FiClock className="w-4 h-4" />
                      <span>Mon-Sat: 10AM - 9PM</span>
                    </div>
                    <div className="flex items-center gap-2 text-white/80 text-sm mt-1">
                      <span>📞 7485908799</span>
                    </div>
                  </div>
                  <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center group-hover:bg-white group-hover:text-emerald-900 transition-all">
                    <FiArrowRight className="w-5 h-5 -rotate-45" />
                  </div>
                </div>
              </div>
            </div>

            {/* Bhavnagar Store */}
            <div className="group relative h-[400px] rounded-3xl overflow-hidden cursor-pointer">
              {/* Overlay Layer */}
              <div className="absolute inset-0 bg-slate-900/30 group-hover:bg-slate-900/20 transition-colors z-10"></div>

              {/* Image Layer */}
              <div className="absolute inset-0 transition-transform duration-700 group-hover:scale-105">
                <Image
                  src="/journey/journey6.png"
                  alt="Bhavnagar Studio"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  priority={true}
                />
              </div>

              {/* Content Layer */}
              <div className="absolute bottom-0 left-0 p-8 z-20 w-full text-white">
                <div className="flex justify-between items-end">
                  <div>
                    <h3 className="text-3xl font-serif mb-2">
                      Bhavnagar Studio
                    </h3>
                    <div className="flex items-center gap-2 text-white/80 text-sm mb-1">
                      <FiMapPin className="w-4 h-4" />
                      <span>
                        Shoppers Point, Parimal Chowk,
                        <br />
                        102, Waghawadi Rd., Hill Drive,
                        <br />
                        Bhavnagar, Gujarat 364001
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-white/80 text-sm">
                      <FiClock className="w-4 h-4" />
                      <span>Mon-Sat: 10AM - 9PM</span>
                    </div>
                    <div className="flex items-center gap-2 text-white/80 text-sm mt-1">
                      <span>📞 090990 96618</span>
                    </div>
                  </div>
                  <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center group-hover:bg-white group-hover:text-emerald-900 transition-all">
                    <FiArrowRight className="w-5 h-5 -rotate-45" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- FAQ SECTION: Clean Accordion --- */}
      <section className="py-20 lg:py-32 px-6 lg:px-12 bg-[#FDFBF7]">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-serif text-center mb-16">
            Common Questions
          </h2>

          <div className="space-y-4">
            {[
              {
                q: "What fabric is used in Krambica garments?",
                a: "All Krambica garments are made from premium-quality pure cotton, ensuring softness, breathability, and long-lasting comfort.",
              },
              {
                q: "Are Krambica products suitable for daily wear?",
                a: "Yes. Krambica specializes in comfortable daily wear, ideal for long hours and everyday use.",
              },
              {
                q: "Do Krambica garments have color bleeding or shrinkage?",
                a: "No. Our garments are processed to ensure no color bleeding and no shrinkage. To maintain fabric quality and color freshness, we recommend drying the garments away from direct sunlight.",
              },
              {
                q: "How do I choose the right size?",
                a: "You can refer to the size chart available on each product page. For better accuracy, we have also provided a step-by-step video guide on how to measure your size.",
              },
              {
                q: "What if the size doesn’t fit me or I receive a wrong product?",
                a: "You can request an exchange within 7 days of delivery for size issues or incorrect items.",
              },
              {
                q: "Do you deliver across India?",
                a: "Yes, Krambica delivers all over India through reliable courier partners.",
              },
              {
                q: "How long does delivery take?",
                a: "Orders are usually delivered within 4–7 working days, depending on your location.",
              },
              {
                q: "What payment methods do you accept?",
                a: "We accept UPI, debit cards, credit cards, and net banking through secure payment gateways.",
              },
              {
                q: "Is it safe to shop on the Krambica website?",
                a: "Yes. Our website uses secure and encrypted payment gateways to protect your personal and payment information.",
              },
              {
                q: "Do you offer wholesale or bulk purchase options?",
                a: "Yes. Krambica supplies directly to retailers at wholesale rates and also offers area monopoly to selected partners.",
              },
              {
                q: "What makes Krambica different from other brands?",
                a: "Krambica delivers premium pure cotton quality at wholesale pricing, supplies directly to shops, and focuses on comfort-first designs — unlike most big brands.",
              },
            ].map((faq, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl border border-stone-200 overflow-hidden"
              >
                <button
                  onClick={() =>
                    setActiveAccordion(activeAccordion === i ? null : i)
                  }
                  className="w-full p-6 text-left flex items-center justify-between"
                >
                  <span className="font-medium text-lg text-slate-800">
                    {faq.q}
                  </span>
                  <span
                    className={`p-2 rounded-full transition-colors ${
                      activeAccordion === i
                        ? "bg-emerald-100 text-emerald-800"
                        : "bg-stone-50 text-stone-400"
                    }`}
                  >
                    {activeAccordion === i ? (
                      <FiMinus className="w-4 h-4" />
                    ) : (
                      <FiPlus className="w-4 h-4" />
                    )}
                  </span>
                </button>
                <div
                  className={`transition-all duration-300 ease-in-out ${
                    activeAccordion === i
                      ? "max-h-48 opacity-100"
                      : "max-h-0 opacity-0"
                  }`}
                >
                  <p className="px-6 pb-6 text-slate-500 leading-relaxed">
                    {faq.a}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;
