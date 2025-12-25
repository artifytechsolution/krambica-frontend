"use client";
import React from "react";
import { ArrowLeft, Shield, Globe, Clock, ChevronRight } from "lucide-react";
import Link from "next/link";

const TermsAndConditions = () => {
  const lastUpdated = "December 25, 2025";

  const legalContent = [
    {
      id: "01",
      title: "Company Identity",
      desc: "Krambica is a premium ethnic wear brand based in Vadodara, Gujarat. We specialize in cotton kurtis and artisanal apparel, blending traditional craftsmanship with modern quality standards.",
    },
    {
      id: "02",
      title: "Product Variations",
      desc: "Due to the handcrafted nature of our products, slight variations in color and texture are expected. These are characteristics of artisanal dyeing and are not considered manufacturing defects.",
    },
    {
      id: "03",
      title: "Pricing & Transactions",
      desc: "All prices are in INR. GST and applicable taxes are calculated at checkout. Wholesale pricing is confidential and reserved for registered partners only.",
    },
    {
      id: "04",
      title: "Shipping & Risk",
      desc: "Risk of loss passes to the customer upon dispatch. Krambica is not liable for delays caused by third-party courier services or unforeseen logistics disruptions.",
    },
    {
      id: "05",
      title: "Exchange Policy",
      desc: "Manufacturing defects must be reported within 48 hours. Wholesale orders are final. Retail exchanges are subject to inspection and must include original tags.",
    },
  ];

  return (
    <div className="min-h-screen bg-white font-sans text-gray-600">
      {/* --- MINIMALIST HEADER --- */}

      {/* --- HERO SECTION --- */}
      <section className="py-20 md:py-32 px-6 border-b border-gray-50">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-8xl font-serif text-gray-900 mb-8 tracking-tighter">
            Terms <span className="italic text-gray-300">&</span> Conditions
          </h1>
          <div className="flex flex-wrap justify-center gap-8 text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400">
            <span className="flex items-center gap-2">
              <Globe size={12} /> Vadodara, India
            </span>
            <span className="flex items-center gap-2">
              <Clock size={12} /> Updated: {lastUpdated}
            </span>
            <span className="flex items-center gap-2">
              <Shield size={12} /> Secure Data
            </span>
          </div>
        </div>
      </section>

      {/* --- CONTENT LAYOUT --- */}
      <main className="max-w-[1536px] mx-auto px-6 md:px-12 lg:px-24 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 md:gap-24">
          {/* INTRO SUMMARY (Hides on mobile to save space) */}
          <aside className="hidden lg:block lg:col-span-4 h-fit sticky top-32">
            <div className="space-y-6">
              <h2 className="text-xs font-bold uppercase tracking-[0.4em] text-gray-900">
                Governance
              </h2>
              <p className="text-sm leading-relaxed text-gray-500 font-light">
                This document serves as the legal framework for all transactions
                with Krambica. By placing an order, you agree to comply with our
                quality, logistics, and exchange standards.
              </p>
              <div className="pt-6 border-t border-gray-100">
                <Link
                  href="/contact"
                  className="group flex items-center justify-between py-3 border-b border-gray-100 text-[10px] font-bold uppercase tracking-widest text-gray-600 hover:text-gray-900 transition-all"
                >
                  Request clarification{" "}
                  <ChevronRight
                    size={14}
                    className="group-hover:translate-x-1 transition-transform"
                  />
                </Link>
              </div>
            </div>
          </aside>

          {/* MAIN ARTICLES */}
          <div className="lg:col-span-8 space-y-12 md:space-y-20">
            {legalContent.map((item) => (
              <section key={item.id} className="group">
                <div className="flex items-start gap-4 md:gap-10">
                  <span className="text-[10px] font-mono text-gray-300 mt-1 md:mt-2">
                    ARTICLE {item.id}
                  </span>
                  <div className="flex-1">
                    <h2 className="text-xl md:text-2xl font-serif text-gray-900 mb-4 md:mb-6">
                      {item.title}
                    </h2>
                    <p className="text-base md:text-lg leading-relaxed font-light text-gray-600">
                      {item.desc}
                    </p>
                  </div>
                </div>
              </section>
            ))}

            {/* JURISDICTION BOX */}
            <section className="bg-gray-50 p-8 md:p-12 rounded-[2rem] border border-gray-100 mt-20">
              <h2 className="text-[10px] font-bold uppercase tracking-[0.4em] text-gray-900 mb-4">
                Jurisdiction & Law
              </h2>
              <p className="text-sm leading-relaxed text-gray-500 font-light">
                These terms are governed by the laws of India. Any disputes
                arising out of the use of our services or products are subject
                to the exclusive jurisdiction of the courts in{" "}
                <span className="text-gray-900 font-medium">
                  Vadodara, Gujarat
                </span>
                .
              </p>
            </section>
          </div>
        </div>
      </main>

      {/* --- FOOTER CTA --- */}
      <footer className="py-20 bg-white border-t border-gray-100">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <p className="text-[10px] font-bold uppercase tracking-[0.5em] text-gray-300 mb-8">
            Krambica &copy; 2025 • Artisanal Excellence
          </p>
          <div className="h-[1px] w-20 bg-gray-100 mx-auto" />
        </div>
      </footer>
    </div>
  );
};

export default TermsAndConditions;
