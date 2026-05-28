/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from "react";
import { Compass, Clock, ArrowUpRight, Percent, Tag, ShieldCheck } from "@phosphor-icons/react";
import { useApp, translations, formatPriceString, useNavigateTo } from "../../context/AppContext";
import { offers } from "../../data/offers";

export const Offers: React.FC = () => {
  const { currentLanguage, currentCurrency, favorites, toggleFavorite, setActiveDestinationId } = useApp();
  const navigateTo = useNavigateTo();
  const t = translations[currentLanguage];
  const isRTL = currentLanguage === "ar";

  // Category selection local overrides
  const [activeTab, setActiveTab] = useState<"seasonal" | "luxury" | "family" | "lastminute" | "student">("seasonal");

  const tabFilters = [
    { key: "seasonal", label: currentLanguage === "ar" ? "عروض موسمية" : "Seasonal Offers" },
    { key: "luxury", label: currentLanguage === "ar" ? "عروض فاخرة VIP" : "Luxury Offers" },
    { key: "family", label: currentLanguage === "ar" ? "عروض العائلات" : "Family Packages" },
    { key: "lastminute", label: currentLanguage === "ar" ? "عروض اللحظة الأخيرة" : "Last-Minute Deals" },
    { key: "student", label: currentLanguage === "ar" ? "عروض مخصصة للطلبة" : "Student Offers" }
  ];

  // Map simulated list of items corresponding to tabs
  const classifiedOffers = useMemo(() => {
    // Return mock offers mapped based on category tab
    if (activeTab === "seasonal") {
      return offers.filter(o => o.id === "promo-istanbul" || o.id === "promo-umrah");
    }
    if (activeTab === "lastminute") {
      return offers.filter(o => o.id === "promo-djanet" || o.id === "promo-egypt");
    }
    if (activeTab === "luxury") {
      return offers.filter(o => o.id === "promo-istanbul" || o.id === "promo-umrah");
    }
    if (activeTab === "family") {
      return offers.filter(o => o.id === "promo-umrah" || o.id === "promo-egypt");
    }
    return offers; // Fallback / student packs
  }, [activeTab]);

  return (
    <div className="space-y-16 pb-20 text-white bg-primary-dark font-sans">
      
      {/* Immersive Header Banner */}
      <section className="relative h-[40vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-primary-dark/70 z-10" />
        <img
          src="https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1920&q=80"
          alt="Luxury offers banner"
          className="absolute inset-0 w-full h-full object-cover object-center translate-y-[-10%]"
        />
        <div className="relative z-15 text-center px-4 animate-in fade-in slide-in-from-bottom-5 duration-500">
          <span className="text-xs font-bold tracking-[0.25em] text-accent uppercase bg-accent/15 px-3 py-1 rounded-full border border-accent/20">
            {currentLanguage === "ar" ? "حسومات توريفاي الحصرية" : "TOURIFY CAMPAIGN VAULT"}
          </span>
          <h1 className="font-display font-black text-3xl sm:text-5xl uppercase tracking-wider text-white mt-3">
            {t.specialOffersTitle}
          </h1>
          <p className="text-xs sm:text-sm text-white/70 max-w-2xl mx-auto mt-2">
            {t.specialOffersSub}
          </p>
        </div>
      </section>

      {/* Tab Selectors and dynamic grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Horizontal scrollable tab list */}
        <div className="flex bg-primary border border-white/5 rounded-2xl p-1 overflow-x-auto no-scrollbar max-w-4xl mx-auto">
          {tabFilters.map((tab) => (
            <button
              id={`tab-btn-offer-${tab.key}`}
              key={tab.key}
              onClick={() => setActiveTab(tab.key as any)}
              className={`flex-1 min-h-[44px] px-6 py-2.5 rounded-xl text-center text-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap cursor-pointer ${
                activeTab === tab.key ? "bg-accent text-white shadow-lg" : "text-white/60 hover:text-white"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Campaign cards split list */}
        <div className="space-y-8 animate-in fade-in duration-300 max-w-5xl mx-auto">
          {classifiedOffers.map((item) => (
            <div
              key={item.id}
              className="rounded-3xl overflow-hidden bg-primary shadow-xl border border-white/5 flex flex-col md:flex-row relative hover:scale-[1.01] transition-all"
            >
              {/* Product background cover media */}
              <div className="w-full md:w-2/5 h-64 md:h-full min-h-[250px] relative">
                <img
                  src={item.bgImage}
                  alt={item.title}
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-primary via-transparent to-transparent hidden md:block" />
                <div className="absolute top-4 left-4 bg-accent text-white text-[10px] font-black uppercase px-4 py-1.5 rounded-full shadow-lg border border-accent/20 flex items-center gap-1">
                  <Percent size={12} weight="thin" />
                  <span>{item.discountBadge}</span>
                </div>
              </div>

              {/* Main parameters layout */}
              <div className={`w-full md:w-3/5 p-8 flex flex-col justify-between space-y-6 ${isRTL ? "text-right" : "text-left"}`}>
                
                {/* Headers */}
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[10px] font-bold text-accent uppercase tracking-wider">
                      {item.tag}
                    </span>
                    <span className="text-[10px] text-white/40 flex items-center gap-1 font-semibold">
                      <Clock size={12} weight="thin" />
                      {currentLanguage === "ar" ? "محدود للغاية" : "Limited Spaces Available"}
                    </span>
                  </div>

                  <h3 className="font-display font-black text-xl sm:text-2xl uppercase tracking-wider text-white">
                    {item.title}
                  </h3>
                  <p className="text-xs text-white/60 font-sans leading-relaxed">
                    {item.description}
                  </p>
                </div>

                {/* Bottom Pricing & CTA action */}
                <div className="pt-6 border-t border-white/5 flex flex-wrap items-center justify-between gap-4">
                  
                  {/* Local price displays */}
                  <div className="flex items-center gap-4">
                    <div>
                      <p className="text-[9px] uppercase text-white/40 font-bold">{currentLanguage === "ar" ? "السعر الأصلي" : "Original Rate"}</p>
                      <span className="text-sm text-white/50 line-through font-sans">
                        {formatPriceString(item.originalPriceDZD, currentCurrency, currentLanguage)}
                      </span>
                    </div>
                    <div>
                      <p className="text-[10px] uppercase text-accent font-bold">{currentLanguage === "ar" ? "سعر العرض الحصري" : "Exclusive Campaign Rate"}</p>
                      <span className="text-2xl font-black text-accent font-sans">
                        {formatPriceString(item.discountedPriceDZD, currentCurrency, currentLanguage)}
                      </span>
                    </div>
                  </div>

                  {/* Trigger links */}
                  <button
                    id={`view-offer-dest-${item.id}`}
                    onClick={() => {
                      setActiveDestinationId(item.destinationId);
                      navigateTo("destination-details", item.destinationId);
                    }}
                    className="py-3 px-6 rounded-2xl bg-white/5 hover:bg-accent hover:text-white border border-white/10 hover:border-transparent text-xs font-bold uppercase tracking-wider transition-all cursor-pointer flex items-center gap-1.5"
                  >
                    <span>{t.exploreDetail}</span>
                    <ArrowUpRight size={14} weight="thin" />
                  </button>

                </div>

              </div>

            </div>
          ))}
        </div>

        {/* Benefits badge area */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-10">
          {[
            {
              title: currentLanguage === "ar" ? "نظام حجز فوري مؤمن" : "Secure Reservation Holds",
              desc: currentLanguage === "ar" ? "تأصيل فوري للأسعار والحسومات دون أي سحب مبدئي من البطاقة المصرفية." : "We establish dynamic campaign rate locks prior to issuing flights and hotel suites.",
              icon: <ShieldCheck className="text-accent" size={20} weight="thin" />
            },
            {
              title: currentLanguage === "ar" ? "إضافات ومزايا طوارق مجاناً" : "Complementary Nomad Excursions",
              desc: currentLanguage === "ar" ? "جلسات شاي في الوديان، سهرات موسيقى، وجولات تصوير ممتازة دون رسوم إضافية." : "All discount desert tours include Tuareg music setups and hot dinners inside golden canyon circles gratis.",
              icon: <Compass className="text-accent" size={20} weight="thin" />
            },
            {
              title: currentLanguage === "ar" ? "تأشيرات وإرشاد مجاني متاح" : "Visa Appointment Sweeps",
              desc: currentLanguage === "ar" ? "جميع باقات عروض تركيا وشنغن تشمل استشارات ومراجعة ملف التأشيرة مجاناً." : "Promotion packages include free visa advisory and certified translation filing by Elysian counters.",
              icon: <Tag className="text-accent" size={20} weight="thin" />
            }
          ].map((itm, idx) => (
            <div key={idx} className="p-5 rounded-2xl bg-primary/45 border border-white/5 text-left space-y-3">
              <div className="w-10 h-10 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center text-accent">
                {itm.icon}
              </div>
              <h5 className="font-display font-semibold text-sm text-white uppercase">{itm.title}</h5>
              <p className="text-xs text-white/50 leading-relaxed font-sans">{itm.desc}</p>
            </div>
          ))}
        </div>

      </section>

    </div>
  );
};
