"use client";
import React, { useState, useEffect } from "react";
import {
  ShieldCheck,
  Lock,
  Eye,
  Cookie,
  UserCheck,
  Baby,
  RefreshCcw,
  Mail,
  Phone,
  ArrowRight,
  FileText,
} from "lucide-react";

const PrivacyPolicy = () => {
  const [activeSection, setActiveSection] = useState("collect");

  // Scroll spy to update active section
  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll("section[id]");
      const scrollPosition = window.scrollY + 250; // Offset for better triggering

      sections.forEach((section) => {
        if (
          section.offsetTop <= scrollPosition &&
          section.offsetTop + section.offsetHeight > scrollPosition
        ) {
          setActiveSection(section.getAttribute("id"));
        }
      });
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { id: "collect", label: "1. Info Collection" },
    { id: "use", label: "2. How We Use It" },
    { id: "share", label: "3. Sharing Data" },
    { id: "security", label: "4. Data Security" },
    { id: "cookies", label: "5. Cookies" },
    { id: "rights", label: "6. Your Rights" },
    { id: "contact", label: "Contact Us" },
  ];

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 100; // Height of sticky header
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="min-h-screen bg-white font-sans selection:bg-emerald-50 selection:text-emerald-900">
      <style jsx global>{`
        @import url("https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;1,400;1,600&family=Plus+Jakarta+Sans:wght@300;400;500;600&display=swap");
        .font-serif {
          font-family: "Playfair Display", serif;
        }
        .font-sans {
          font-family: "Plus Jakarta Sans", sans-serif;
        }
        /* Hide scrollbar for mobile nav */
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>

      {/* --- HERO SECTION --- */}
      <header className="relative pt-24 pb-12 lg:pt-32 lg:pb-20 px-6 border-b border-gray-100 bg-white">
        <div className="max-w-[1400px] mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-gray-50 rounded-full border border-gray-100 mb-6 lg:mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse"></span>
            <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-gray-500">
              Legal Document
            </span>
          </div>

          <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl text-gray-900 mb-4 lg:mb-6 tracking-tight leading-tight">
            Privacy Policy
          </h1>

          <p className="text-gray-500 text-base md:text-lg lg:text-xl font-light max-w-2xl mx-auto leading-relaxed">
            Transparency is the foundation of our relationship. Here is how we
            protect and manage your data at Krambica.
          </p>
        </div>

        {/* Subtle Background Decor */}
        <div className="absolute top-0 right-0 w-[50%] h-full bg-gradient-to-l from-gray-50/50 to-transparent pointer-events-none -z-10" />
      </header>

      {/* --- MOBILE STICKY NAV (Visible only on < lg screens) --- */}
      <div className="lg:hidden sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-gray-200 py-3 px-4 overflow-x-auto no-scrollbar whitespace-nowrap">
        <div className="flex gap-2">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${
                activeSection === item.id
                  ? "bg-emerald-900 text-white shadow-md"
                  : "bg-gray-50 text-gray-600 border border-gray-100"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {/* --- MAIN LAYOUT --- */}
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-12 lg:py-20">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 xl:gap-28">
          {/* --- LEFT: STICKY SIDEBAR (Desktop Only) --- */}
          <aside className="hidden lg:block w-[260px] flex-shrink-0 h-full">
            <div className="sticky top-24 pl-4 border-l border-gray-200">
              <span className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-6 pl-4">
                Contents
              </span>
              <nav className="space-y-1">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className={`block w-full text-left px-4 py-2.5 text-sm transition-all duration-300 rounded-r-lg ${
                      activeSection === item.id
                        ? "text-emerald-900 font-bold bg-gray-50 border-l-2 border-emerald-900 -ml-[17px]"
                        : "text-gray-500 hover:text-gray-900 hover:bg-gray-50/50"
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </nav>
            </div>
          </aside>

          {/* --- RIGHT: CONTENT AREA --- */}
          <main className="flex-1 space-y-16 lg:space-y-24">
            {/* Intro Quote */}
            <div className="max-w-4xl">
              <p className="text-lg lg:text-xl text-gray-600 font-serif italic leading-relaxed border-l-4 border-emerald-900 pl-6">
                "We collect information to provide a better experience, not to
                sell your data. Your privacy is paramount to the Krambica
                experience."
              </p>
            </div>

            {/* 1. Collection */}
            <section id="collect" className="scroll-mt-32">
              <div className="flex items-start gap-4 lg:gap-5 mb-8">
                <span className="font-serif text-3xl lg:text-4xl text-gray-200 font-bold select-none">
                  01
                </span>
                <div>
                  <h2 className="font-serif text-2xl lg:text-3xl text-gray-900 mb-2">
                    Information We Collect
                  </h2>
                  <div className="h-0.5 w-12 bg-emerald-900"></div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
                {/* Personal Card */}
                <div className="p-6 lg:p-8 border border-gray-100 rounded-2xl hover:shadow-lg transition-shadow duration-300 bg-white">
                  <div className="w-10 h-10 bg-emerald-50 rounded-full flex items-center justify-center mb-6">
                    <UserCheck className="text-emerald-900 w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-gray-900 mb-4 text-sm uppercase tracking-wider">
                    Personal Information
                  </h3>
                  <ul className="space-y-3">
                    {[
                      "Full Name",
                      "Email & Phone Number",
                      "Shipping Address",
                      "Billing Address",
                    ].map((item) => (
                      <li
                        key={item}
                        className="flex items-center gap-3 text-gray-500 text-sm"
                      >
                        <div className="w-1.5 h-1.5 rounded-full bg-gray-300 shrink-0" />{" "}
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Technical Card */}
                <div className="p-6 lg:p-8 border border-gray-100 rounded-2xl hover:shadow-lg transition-shadow duration-300 bg-white">
                  <div className="w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center mb-6">
                    <FileText className="text-gray-900 w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-gray-900 mb-4 text-sm uppercase tracking-wider">
                    Technical Data
                  </h3>
                  <ul className="space-y-3">
                    {[
                      "IP Address",
                      "Browser Type",
                      "Device Information",
                      "Browsing History",
                    ].map((item) => (
                      <li
                        key={item}
                        className="flex items-center gap-3 text-gray-500 text-sm"
                      >
                        <div className="w-1.5 h-1.5 rounded-full bg-gray-300 shrink-0" />{" "}
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </section>

            {/* 2. Usage */}
            <section id="use" className="scroll-mt-32">
              <div className="flex items-start gap-4 lg:gap-5 mb-8">
                <span className="font-serif text-3xl lg:text-4xl text-gray-200 font-bold select-none">
                  02
                </span>
                <div>
                  <h2 className="font-serif text-2xl lg:text-3xl text-gray-900 mb-2">
                    How We Use Data
                  </h2>
                  <div className="h-0.5 w-12 bg-emerald-900"></div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
                {[
                  {
                    icon: RefreshCcw,
                    title: "Order Fulfillment",
                    text: "Processing and delivering your purchases.",
                  },
                  {
                    icon: Mail,
                    title: "Communication",
                    text: "Updates on orders and support responses.",
                  },
                  {
                    icon: ShieldCheck,
                    title: "Security",
                    text: "Fraud prevention and safe transactions.",
                  },
                ].map((card, i) => (
                  <div
                    key={i}
                    className="group p-6 bg-gray-50 rounded-2xl border border-transparent hover:bg-emerald-900 hover:text-white hover:shadow-xl transition-all duration-300"
                  >
                    <card.icon
                      className="w-8 h-8 text-gray-400 mb-4 group-hover:text-emerald-300 transition-colors"
                      strokeWidth={1.5}
                    />
                    <h4 className="font-bold mb-2 text-gray-900 group-hover:text-white">
                      {card.title}
                    </h4>
                    <p className="text-sm text-gray-500 group-hover:text-emerald-100/80 leading-relaxed">
                      {card.text}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            {/* 3. Sharing */}
            <section id="share" className="scroll-mt-32">
              <div className="flex items-start gap-4 lg:gap-5 mb-8">
                <span className="font-serif text-3xl lg:text-4xl text-gray-200 font-bold select-none">
                  03
                </span>
                <div>
                  <h2 className="font-serif text-2xl lg:text-3xl text-gray-900 mb-2">
                    Sharing & Disclosure
                  </h2>
                  <div className="h-0.5 w-12 bg-emerald-900"></div>
                </div>
              </div>

              <div className="bg-emerald-50/50 border-l-4 border-emerald-900 p-6 lg:p-8 mb-8 rounded-r-xl">
                <p className="text-lg lg:text-xl text-gray-800 font-medium leading-relaxed">
                  We do{" "}
                  <span className="underline decoration-emerald-500 underline-offset-4 decoration-2">
                    not
                  </span>{" "}
                  sell your personal data.
                </p>
                <p className="text-gray-500 mt-2 text-sm lg:text-base">
                  We only share data necessary for operations, such as:
                </p>
              </div>

              <div className="grid gap-4">
                {[
                  { title: "Logistics Partners", desc: "For Delivery" },
                  { title: "Payment Gateways", desc: "Secure Processing" },
                  { title: "Legal Authorities", desc: "If Required by Law" },
                ].map((item, i) => (
                  <div
                    key={i}
                    className="flex flex-col sm:flex-row sm:items-center justify-between p-5 border border-gray-100 rounded-xl hover:bg-gray-50 transition-colors"
                  >
                    <span className="font-bold text-gray-700 mb-1 sm:mb-0">
                      {item.title}
                    </span>
                    <span className="text-sm text-gray-400">{item.desc}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* 4. Security */}
            <section id="security" className="scroll-mt-32">
              <div className="flex items-start gap-4 lg:gap-5 mb-8">
                <span className="font-serif text-3xl lg:text-4xl text-gray-200 font-bold select-none">
                  04
                </span>
                <div>
                  <h2 className="font-serif text-2xl lg:text-3xl text-gray-900 mb-2">
                    Data Security
                  </h2>
                  <div className="h-0.5 w-12 bg-emerald-900"></div>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-6 items-start">
                <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center shrink-0">
                  <Lock
                    className="w-8 h-8 text-emerald-900"
                    strokeWidth={1.5}
                  />
                </div>
                <p className="text-gray-600 leading-relaxed text-sm lg:text-base">
                  We implement robust security measures including SSL encryption
                  and secure server infrastructure to protect your data against
                  unauthorized access. While we strive for maximum security, no
                  digital transmission is absolute. We continuously update our
                  protocols to meet industry standards.
                </p>
              </div>
            </section>

            {/* 5. Cookies */}
            <section
              id="cookies"
              className="scroll-mt-32 bg-gray-50 p-8 lg:p-12 rounded-[2rem]"
            >
              <div className="flex items-center gap-4 mb-6">
                <Cookie className="w-8 h-8 text-emerald-900" />
                <h2 className="font-serif text-2xl lg:text-3xl text-gray-900">
                  Cookies Policy
                </h2>
              </div>
              <p className="text-gray-600 mb-8 max-w-2xl text-sm lg:text-base leading-relaxed">
                We use cookies to analyze traffic, remember your preferences,
                and improve the website. You can control cookie settings in your
                browser, though this may affect site functionality.
              </p>
              <div className="flex flex-wrap gap-2">
                {["Analytics", "Functionality", "Marketing", "Essential"].map(
                  (tag) => (
                    <span
                      key={tag}
                      className="px-4 py-2 bg-white border border-gray-200 rounded-full text-xs font-bold text-gray-500 uppercase tracking-wide shadow-sm"
                    >
                      {tag} Cookies
                    </span>
                  )
                )}
              </div>
            </section>

            {/* 6. Rights & Children */}
            <section id="rights" className="scroll-mt-32">
              <div className="flex items-start gap-4 lg:gap-5 mb-10">
                <span className="font-serif text-3xl lg:text-4xl text-gray-200 font-bold select-none">
                  06
                </span>
                <div>
                  <h2 className="font-serif text-2xl lg:text-3xl text-gray-900 mb-2">
                    Your Rights & Safety
                  </h2>
                  <div className="h-0.5 w-12 bg-emerald-900"></div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-12">
                <div>
                  <h3 className="font-bold text-gray-900 mb-6 uppercase text-sm tracking-widest">
                    User Rights
                  </h3>
                  <ul className="space-y-3">
                    {[
                      "Access your personal data",
                      "Correct inaccurate information",
                      "Request data deletion",
                      "Opt-out of marketing emails",
                    ].map((right, i) => (
                      <li
                        key={i}
                        className="flex items-center justify-between p-3 border-b border-gray-100 hover:pl-2 transition-all cursor-default group"
                      >
                        <span className="text-gray-600 group-hover:text-emerald-900 transition-colors text-sm">
                          {right}
                        </span>
                        <ArrowRight className="w-4 h-4 text-gray-300 group-hover:text-emerald-900 transition-colors" />
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="font-bold text-gray-900 mb-6 uppercase text-sm tracking-widest">
                    Children's Privacy
                  </h3>
                  <div className="flex gap-4 p-6 bg-orange-50/50 rounded-2xl border border-orange-100/50">
                    <Baby className="w-8 h-8 text-orange-400 shrink-0" />
                    <p className="text-sm text-gray-600 leading-relaxed">
                      Krambica does not knowingly collect data from individuals
                      under 18. If you believe a minor has provided data, please
                      contact us for immediate removal.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* 7. Contact */}
            <section
              id="contact"
              className="scroll-mt-32 pb-20 pt-10 border-t border-gray-100"
            >
              <div className="bg-white border border-gray-200 p-8 lg:p-12 rounded-[2.5rem] text-center md:text-left shadow-lg shadow-gray-100 relative overflow-hidden">
                {/* Decorative Blur */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />

                <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8 lg:gap-12">
                  <div className="md:max-w-xs">
                    <h2 className="font-serif text-3xl text-gray-900 mb-2">
                      Questions?
                    </h2>
                    <p className="text-gray-500 text-sm leading-relaxed">
                      Our support team is available Mon-Fri, 9am - 6pm to assist
                      with any privacy concerns.
                    </p>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
                    <a
                      href="mailto:support@krambica.com"
                      className="flex items-center justify-center gap-3 px-6 py-4 bg-gray-900 text-white rounded-full hover:bg-emerald-900 transition-colors shadow-lg shadow-gray-900/10"
                    >
                      <Mail size={18} />
                      <span className="text-sm font-bold">
                        support@krambica.com
                      </span>
                    </a>
                    <a
                      href="tel:+917485908799"
                      className="flex items-center justify-center gap-3 px-6 py-4 bg-white border border-gray-200 text-gray-900 rounded-full hover:border-emerald-900 transition-colors"
                    >
                      <Phone size={18} />
                      <span className="text-sm font-bold">
                        +91 7485 908 799
                      </span>
                    </a>
                  </div>
                </div>
              </div>
            </section>
          </main>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
