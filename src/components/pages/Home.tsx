/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { Compass, Clock, MapPin, MagnifyingGlass as Search, Star, ArrowUpRight, CaretDown as ChevronDown, Medal as Award, UserCheck, ShieldCheck } from "@phosphor-icons/react";
import { useApp, translations, formatPriceString, useNavigateTo } from "../../context/AppContext";
import { destinations } from "../../data/destinations";
import { offers } from "../../data/offers";

export const Home: React.FC = () => {
  const { currentLanguage, currentCurrency, toggleFavorite, favorites, setActiveDestinationId, updateSearchFilters, searchFilters } = useApp();
  const navigateTo = useNavigateTo();
  const t = translations[currentLanguage];
  const isRTL = currentLanguage === "ar";

  // Hero Slider State
  const heroSlides = [
    {
      img: "https://images.unsplash.com/photo-1473580044384-7ba9967e16a0?auto=format&fit=crop&w=1920&q=80",
      title: currentLanguage === "ar" ? "سكون الصحراء الجزائرية الساحرة" : currentLanguage === "fr" ? "Le Silence Mystique du Sahara" : "The Mystical Silence of Deep Sahara",
      sub: currentLanguage === "ar" ? "استكشف الكثبان الحمراء العتيقة في جانت وتاسيلي ناجر مع قادة طوارق محليين" : "Explore the ancient crimson dunes of Djanet alongside noble Tuareg nomads"
    },
    {
      img: "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?auto=format&fit=crop&w=1920&q=80",
      title: currentLanguage === "ar" ? "رحلات إسطنبول وكبادوكيا الفاخرة" : currentLanguage === "fr" ? "Odyssée Royale à Istanbul" : "Royal Bosphorus & Cappadocia Odyssey",
      sub: currentLanguage === "ar" ? "حلّق فوق المناطيد الملونة واستمتع بيخوت البوسفور الخاصة من الجزائر" : "Float among hot air balloons and sail on private luxury Bosphorus yachts"
    },
    {
      img: "https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=1920&q=80",
      title: currentLanguage === "ar" ? "باقات العمرة الراقية لنخبة العائلات" : currentLanguage === "fr" ? "Omra Elite sur Mesure" : "Elite VIP Umrah Pilgrimage",
      sub: currentLanguage === "ar" ? "إقامة فاخرة قبالة الحرم المكي مباشرة وتسهيلات تصاريح نسك الكاملة" : "Stay in luxurious clock towers directly facing the Holy Haram courtyards"
    }
  ];

  const [currentSlide, setCurrentSlide] = useState(0);
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  // Search local state
  const [localQuery, setLocalQuery] = useState("");
  const [localCategory, setLocalCategory] = useState<"all" | "local" | "international">("all");

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateSearchFilters({
      query: localQuery,
      category: localCategory
    });
    navigateTo("destinations");
  };

  // Promo Countdown timer simulation
  const [timeRemaining, setTimeRemaining] = useState({ h: 40, m: 45, s: 12 });
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining(prev => {
        if (prev.s > 0) return { ...prev, s: prev.s - 1 };
        if (prev.m > 0) return { h: prev.h, m: prev.m - 1, s: 59 };
        if (prev.h > 0) return { h: prev.h - 1, m: 59, s: 59 };
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // FAQ Accordion Local State
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const faqs = [
    {
      q: currentLanguage === "ar" ? "كيف يمكنني تقديم طلب تأشيرة من خلال وكالتكم؟" : "Comment fonctionne l'assistance visa de Tourify?",
      a: currentLanguage === "ar"
        ? "نقوم باستلام ملفك بالكامل وترجمته ترجمة رسمية، وحجز موعد البصمات (VFS Global/TLScontact) وحجز الطيران المبدئي لضمان نسبة قبول قصوى تفوق 96%."
        : "Nous gérons l'intégralité de votre dossier : prise de rendez-vous (TLS/VFS), traduction certifiée, pré-réservations de vols/hôtels et audit personnalisé pour optimiser vos chances d'approbation."
    },
    {
      q: currentLanguage === "ar" ? "هل رحلات الصحراء (جانت) تشمل تذاكر الطيران وباقة الأكل؟" : "Les séjours à Djanet comprennent-ils les vols?",
      a: currentLanguage === "ar"
        ? "نعم، جميع مغامرات تاسيلي وجانت لدينا تشمل الطيران المباشر ذهاب وعودة من الجزائر العاصمة، ركوب سيارات الدفع الرباعي الفاخرة، والإقامة كاملة الأكل من طاهٍ محلي."
        : "Absolument. Nos expéditions sahariennes incluent les vols directs depuis Alger, les 4x4 climatisés, l'équipement de bivouac haut de gamme et la pension complète cuisinée sur place par notre chef nomade."
    },
    {
      q: currentLanguage === "ar" ? "ما هي طرق الدفع لضمان وتأكيد الحجز؟" : "Quels sont les modes de paiement sécurisés proposés?",
      a: currentLanguage === "ar"
        ? "نوفر الدفع عبر الحساب البنكي الرسمي، أو التحويل البريدي (CCP / BaridiMob)، أو نقداً مباشرة في مقر وكالتنا في وسط الجزائر العاصمة."
        : "Nous acceptons les virements bancaires nationaux, les transferts via BaridiMob/CCP ainsi que les règlements directs en espèces dans nos bureaux d'Alger."
    }
  ];

  // Gallery Images catalog
  const galleryImages = [
    "https://images.unsplash.com/photo-1539650116574-8efeb43e2750?auto=format&fit=crop&w=400&q=80",
    "https://images.unsplash.com/photo-1564407727371-3eece6c58961?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1584719866406-c76ddee48493?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://plus.unsplash.com/premium_photo-1718035557075-5111d9d906d2?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1720549973451-018d3623b55a?q=80&w=736&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1528702748617-c64d49f918af?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  ];

  return (
    <div className="space-y-24 pb-20 text-primary bg-white">

      {/* Immersive Hero Section - Deep Blue Ambient Fullscreen Visual */}
      <section className="relative min-h-screen w-full flex items-center pt-14 pb-16 lg:pt-10 lg:pb-10 overflow-visible bg-white">
        {/* Fullscreen Background Image with Deep Blue Atmosphere overlay */}
        <div className="absolute inset-0 w-full h-full z-0">
          <img
            src="https://images.unsplash.com/photo-1539650116574-8efeb43e2750?auto=format&fit=crop&w=1920&q=80"
            alt="Majestic Sahara dunes under deep sky"
            className="w-full h-full object-cover opacity-50"
          />
          {/* Deep Blue Gradient overlay specifically behind the text (left side for LTR, right for RTL) */}
          <div className={`absolute inset-0 bg-gradient-to-r ${isRTL ? "from-transparent via-white/35 to-white" : "from-white via-white/35 to-white/0"} pointer-events-none z-[1]`} />
          {/* Linear bottom black blend for seamless section transition */}
          <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-white to-transparent z-[2]" />
        </div>

        {/* Hero Content - Start-aligned Deluxe Presentation Layer */}
        <div className={`relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex flex-col justify-center space-y-6 lg:space-y-10 py-10 ${isRTL ? "items-start text-right" : "items-start text-left"}`}>

          <div className="space-y-4 lg:space-y-6 max-w-4xl animate-in fade-in-50 slide-in-from-bottom-8 duration-700">
            {/* Driven Tagline Badge */}
            <div className={`flex items-center gap-3 ${isRTL ? "justify-start" : "justify-start"}`}>
              <span className="w-8 h-[2px] bg-accent"></span>
              <span className="text-accent text-xs font-black tracking-[0.3em] uppercase">
                {currentLanguage === "ar" ? "تفرد مستمر" : "DRIVEN BY EXCELLENCE"}
              </span>
            </div>

            {/* Huge Condensed Heading Pair */}
            <h1 className="font-display font-black text-4xl sm:text-6xl lg:text-7xl leading-[1.0] tracking-tight uppercase text-primary drop-shadow-md">
              {currentLanguage === "ar" ? (
                <>
                  استكشف العالم <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0c2638] via-[#0c2638] to-[#0c2638]/40">بتجارب سفر مريحة</span>
                </>
              ) : currentLanguage === "fr" ? (
                <>
                  Explorez le monde <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0c2638] via-[#0c2638] to-[#0c2638]/40">avec des expériences de voyage confortables</span>
                </>
              ) : (
                <>
                  Explore the world <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0c2638] via-[#0c2638] to-[#0c2638]/40">with comfortable travel experiences</span>
                </>
              )}
            </h1>

            <p className="text-sm sm:text-base text-primary/60 font-light max-w-2xl leading-relaxed">
              {currentLanguage === "ar"
                ? "مغامرات استكشافية حصرية، رفاهية بلا حدود، وتخطيط مثالي يناسب نمط حياتك المترف من قلب رمال طاسيلي إلى عواصم العالم."
                : currentLanguage === "fr"
                  ? "Des aventures exclusives, un luxe absolu et des itinéraires intelligents façonnés pour les explorateurs algériens exigeants."
                  : "Bespoke adventures, unbridled luxury, and smarter itineraries crafted for the discerning Algerian explorer. Sahara whispers to modern marvels."}
            </p>
          </div>

          {/* Action Buttons */}
          <div className={`flex flex-col sm:flex-row gap-4 items-stretch sm:items-center w-full sm:w-auto animate-in fade-in-50 slide-in-from-bottom-8 duration-700 delay-75 ${isRTL ? "justify-start" : "justify-start"}`}>
            {/* Start Here button style */}
            <button
              id="hero-primary-cta"
              onClick={() => navigateTo("destinations")}
              className="px-8 py-4 bg-white hover:bg-neutral-100 text-black rounded-full text-xs font-bold uppercase tracking-widest transition-all duration-300 flex items-center justify-center gap-3 group shadow-xl shadow-black/20 cursor-pointer"
            >
              <span>{currentLanguage === "ar" ? "ابدأ الاستكشاف" : "START HERE"}</span>
              <span className="w-7 h-7 rounded-full bg-black text-white flex items-center justify-center group-hover:translate-x-1.5 transition-transform duration-300">
                <ArrowUpRight size={14} className={isRTL ? "rotate-90" : ""} weight="thin" />
              </span>
            </button>

            {/* Offers Button */}
            <button
              id="hero-secondary-cta"
              onClick={() => navigateTo("offers")}
              className="px-8 py-4 bg-white/5 border border-primary/10 hover:bg-white/10 text-primary rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer text-center"
            >
              {currentLanguage === "ar" ? "عروض حصرية" : "EXPLORE OFFERS"}
            </button>
          </div>

          {/* Centered Deluxe Research Search Bar */}
          <div className="max-w-5xl w-full relative z-20 animate-in fade-in-50 slide-in-from-bottom-8 duration-900 delay-150">
            <form onSubmit={handleSearchSubmit} className="p-3 bg-white/10 backdrop-blur-xl border border-primary/10 rounded-[28px] text-primary flex flex-col md:flex-row gap-4 items-center shadow-2xl">

              {/* Destination Input field */}
              <div className={`flex-1 px-4 py-2 w-full ${isRTL ? "text-right" : "text-left"}`}>
                <label className="block text-[10px] uppercase font-bold text-accent mb-1 tracking-[0.15em]">
                  {currentLanguage === "ar" ? "الوجهة المطلوبة" : "Destination"}
                </label>
                <div className="flex items-center gap-2.5">
                  <Search className="text-primary/60 shrink-0" size={16} weight="thin" />
                  <input
                    id="hero-research-query"
                    type="text"
                    value={localQuery}
                    onChange={(e) => setLocalQuery(e.target.value)}
                    placeholder={t.searchPlaceholder}
                    className={`bg-transparent text-sm w-full text-primary placeholder-white/45 outline-none font-medium ${isRTL ? "text-right" : "text-left"}`}
                  />
                </div>
              </div>

              {/* Vertical divider */}
              <div className="hidden md:block w-[1px] h-10 bg-white/20"></div>

              {/* Type Category Selection field */}
              <div className={`flex-1 px-4 py-2 w-full ${isRTL ? "text-right" : "text-left"}`}>
                <label className="block text-[10px] uppercase font-bold text-accent mb-1 tracking-[0.15em]">
                  {currentLanguage === "ar" ? "نوع الرحلة الفاخرة" : "LUXURY CATEGORY"}
                </label>
                <div className="flex items-center gap-2 justify-between cursor-pointer">
                  <Compass className="text-primary/60 shrink-0" size={16} weight="thin" />
                  <div className="relative w-full">
                    <select
                      id="hero-research-category"
                      value={localCategory}
                      onChange={(e) => setLocalCategory(e.target.value as any)}
                      className="bg-transparent text-sm text-primary font-medium outline-none w-full cursor-pointer appearance-none pr-6"
                    >
                      <option value="all" className="bg-[#11354E] text-primary font-medium">{t.all}</option>
                      <option value="local" className="bg-[#11354E] text-primary font-medium">{t.local}</option>
                      <option value="international" className="bg-[#11354E] text-primary font-medium">{t.international}</option>
                    </select>
                  </div>
                  <ChevronDown size={14} className="text-primary/60 shrink-0 pointer-events-none" weight="thin" />
                </div>
              </div>

              {/* Vertical divider */}
              <div className="hidden md:block w-[1px] h-10 bg-white/20"></div>

              {/* Quick Info status label */}
              <div className={`flex-1 px-4 py-2 w-full hidden lg:block ${isRTL ? "text-right" : "text-left"}`}>
                <label className="block text-[10px] uppercase font-bold text-accent mb-1 tracking-[0.15em]">
                  {currentLanguage === "ar" ? "حالة الحجوزات" : "BOOKING WINDOW"}
                </label>
                <span className="block text-xs font-semibold text-primary/60">
                  {currentLanguage === "ar" ? "تأشيرات سريعة وحجوزات حصرية" : "Exclusive VIP Openings"}
                </span>
              </div>

              {/* Big deluxe interactive Action Button */}
              <button
                id="hero-research-submit-btn"
                type="submit"
                className="w-full md:w-auto bg-accent hover:bg-accent-hover px-10 py-4 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all duration-300 shadow-lg shadow-accent/20 hover:scale-[1.02] cursor-pointer"
              >
                <span>{t.searchButton}</span>
                <ArrowUpRight size={16} className={isRTL ? "rotate-90" : ""} weight="thin" />
              </button>

            </form>
          </div>

        </div>

      </section>

      {/* Featured / Celeberated Destinations Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`space-y-4 mb-16 ${isRTL ? "text-right" : "text-left"}`}>
          <div className="flex items-center gap-2 justify-center lg:justify-start">
            <span className="h-0.5 w-12 bg-accent inline-block" />
            <span className="text-xs font-bold tracking-[0.25em] uppercase text-accent">
              {currentLanguage === "ar" ? "الاختيارات الملكية" : "ROYAL COLLECTIONS"}
            </span>
          </div>
          <h2 className="font-display font-black text-3xl sm:text-4xl uppercase tracking-wide">
            {t.popularDestTitle}
          </h2>
          <p className="text-primary/60 text-sm max-w-2xl font-sans">
            {t.popularDestSub}
          </p>
        </div>

        {/* Destinations grid: 3 items */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {destinations.slice(0, 3).map((dest) => {
            const isFav = favorites.includes(dest.id);
            return (
              <div
                key={dest.id}
                className="group relative rounded-3xl overflow-hidden bg-[#f0f4f8] shadow-xl border border-primary/10 flex flex-col hover:scale-[1.02] hover:-translate-y-1 transition-all duration-300"
              >
                {/* Product image */}
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={dest.image}
                    alt={dest.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute top-4 left-4 bg-white/80 backdrop-blur-sm text-primary text-[10px] font-bold uppercase px-3 py-1.5 rounded-full border border-primary/10 z-10">
                    {dest.category === "local" ? t.local : t.international}
                  </span>

                  {/* Share/Heart Bookmark btn */}
                </div>

                {/* Info block */}
                <div className={`p-6 space-y-4 flex-1 flex flex-col justify-between ${isRTL ? "text-right" : "text-left"}`}>
                  <div className="space-y-2">
                    <div className="flex items-center gap-1 text-accent text-xs font-semibold">
                      <Star size={14} className="fill-accent text-accent" weight="thin" />
                      <span>{dest.rating}</span>
                      <span className="text-primary/60 font-normal">({dest.reviewsCount} {currentLanguage === "ar" ? "مراجعة" : "reviews"})</span>
                    </div>

                    <h3 className="font-display font-bold text-xl uppercase text-primary tracking-wide group-hover:text-accent transition-colors line-clamp-1">
                      {dest.name}
                    </h3>

                    <div className="flex items-center gap-1.5 text-xs text-primary/60">
                      <MapPin size={13} className="text-accent" weight="thin" />
                      <span className="truncate">{dest.country}</span>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-primary/10 flex items-center justify-between">
                    <div>
                      <p className="text-[10px] uppercase text-primary/60 font-bold">{t.durationLabel}</p>
                      <p className="text-xs font-semibold text-primary">{dest.duration}</p>
                    </div>

                    <div className={`${isRTL ? "text-left" : "text-right"}`}>
                      <p className="text-[10px] uppercase text-primary/60 font-bold">
                        {currentLanguage === "ar" ? "تبدأ من" : "Starting price"}
                      </p>
                      <p className="text-base font-black text-accent font-sans">
                        {formatPriceString(dest.priceDZD, currentCurrency, currentLanguage)}
                      </p>
                    </div>
                  </div>

                  {/* Explore details trigger */}
                  <button
                    id={`explore-btn-home-${dest.id}`}
                    onClick={() => {
                      setActiveDestinationId(dest.id);
                      navigateTo("destination-details", dest.id);
                    }}
                    className="w-full mt-2 py-3 bg-white/5 hover:bg-accent-white border border-primary/10 hover:border-transparent rounded-2xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer flex items-center justify-center gap-1"
                  >
                    <span>{t.exploreDetail}</span>
                    <ArrowUpRight size={14} weight="thin" />
                  </button>
                </div>

              </div>
            );
          })}
        </div>
      </section>

      {/* Special Promo Section with live simulated countdown */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl overflow-hidden relative min-h-[420px] bg-[#f0f4f8] border border-primary/10 flex flex-col md:flex-row items-stretch shadow-2xl">
          {/* Background visuals */}
          <div className="absolute inset-0 bg-radial-gradient opacity-10 pointer-events-none" />

          <div className="w-full md:w-1/2 relative min-h-[250px] md:min-h-full">
            <img
              src="https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?auto=format&fit=crop&w=800&q=80"
              alt="Promo Discount Space"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-primary via-transparent to-transparent hidden md:block" />
            <div className="absolute top-4 left-4 bg-accent text-white text-[10px] font-black uppercase px-4 py-1.5 rounded-full shadow-lg border border-accent/20">
              {currentLanguage === "ar" ? "خصم خاص %15" : "Special 15% OFF"}
            </div>
          </div>

          <div className={`w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center space-y-6 relative index-10 ${isRTL ? "text-right" : "text-left"}`}>
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-accent">
              {t.countdownPromo}
            </span>
            <div className="flex gap-3 justify-start items-center">
              <div className="bg-white/80 border border-primary/10 p-3 rounded-2xl text-center min-w-[70px]">
                <span className="block font-sans text-2xl font-black text-primary">{timeRemaining.h}</span>
                <span className="text-[10px] text-primary/60 uppercase">{t.hours}</span>
              </div>
              <span className="text-2xl font-bold text-accent">:</span>
              <div className="bg-white/80 border border-primary/10 p-3 rounded-2xl text-center min-w-[70px]">
                <span className="block font-sans text-2xl font-black text-primary">{timeRemaining.m}</span>
                <span className="text-[10px] text-primary/60 uppercase">{t.minutes}</span>
              </div>
              <span className="text-2xl font-bold text-accent">:</span>
              <div className="bg-white/80 border border-primary/10 p-3 rounded-2xl text-center min-w-[70px]">
                <span className="block font-sans text-2xl font-black text-primary">{timeRemaining.s}</span>
                <span className="text-[10px] text-primary/60 uppercase">s</span>
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="font-display font-black text-2xl sm:text-3xl uppercase tracking-wider text-primary">
                {currentLanguage === "ar" ? "موسم تاسيلي-جانت الربيعي الاستثنائي" : "Ultimate Saharan Oasis Springs Code"}
              </h3>
              <p className="text-xs sm:text-sm text-primary/60 font-sans leading-relaxed">
                {currentLanguage === "ar"
                  ? "سارع بحجز رحلة السفاري الربيعية الخاصة بك إلى عمق الصحراء الجزائرية واستفد من حسم 15,000 د.ج للشخص الواحد. العرض السخي يشمل الطيران المباشر، طواقم الحراسة، الإرشاد، الوجبات، ومركبات الدفع الرباعي الفخمة."
                  : "Reserve your spring safari deep inside the red sands of Djanet, receiving an immediate 15,000 DA package reduction per traveler. Complete flights, private camp coordinators, Tuareg assistance and high board nutrition included."}
              </p>
            </div>

            <button
              id="home-promo-btn"
              onClick={() => navigateTo("offers")}
              className="py-3 px-8 rounded-2xl bg-accent-white text-xs font-bold uppercase tracking-widest transition-all shadow-lg shadow-accent/20 cursor-pointer self-start"
            >
              {currentLanguage === "ar" ? "اكتشف العروض الموسمية" : "Unlock Exclusive Passes"}
            </button>
          </div>
        </div>
      </section>

      {/* Services Overview Component */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`space-y-4 mb-16 ${isRTL ? "text-right" : "text-left"}`}>
          <div className="flex items-center gap-2 justify-center lg:justify-start">
            <span className="h-0.5 w-12 bg-accent inline-block" />
            <span className="text-xs font-bold tracking-[0.25em] uppercase text-accent">
              {currentLanguage === "ar" ? "خدمات النخبة" : "BESPOKE AMENITIES"}
            </span>
          </div>
          <h2 className="font-display font-black text-3xl sm:text-4xl uppercase tracking-wide">
            {t.servicesTitle}
          </h2>
          <p className="text-primary/60 text-sm max-w-2xl font-sans">
            {t.servicesSub}
          </p>
        </div>

        {/* Dynamic services listing cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 text-primary">
          {[
            {
              title: currentLanguage === "ar" ? "حجز تذاكر الطيران" : "Bespoke Flight Booking",
              desc: currentLanguage === "ar" ? "حجوزات طيران درجة أولى ودرجة أعمال لأي وجهة عالمية مع تأكيد فوري ومتابعة دائمة." : "First-class and boutique business travel logistics with leading carriers, ensuring priority lounges and seating.",
              icon: <Compass className="text-accent" size={26} weight="thin" />
            },
            {
              title: currentLanguage === "ar" ? "فنادق ومنتجعات فاخرة" : "Hotel Reservations",
              desc: currentLanguage === "ar" ? "نمتلك عقوداً حصرية مع أفخم الفنادق والمنتجعات العالمية كالماريوت وشنغريلا لتوفير إقامة مريحة." : "Pre-allocated inventory at prestigious international hotel houses, including Kaaba and sea-view penthouses.",
              icon: <Clock className="text-accent" size={26} weight="thin" />
            },
            {
              title: currentLanguage === "ar" ? "استشارات الملفات والتأشيرات" : "Visa & TLScontact Concierge",
              desc: currentLanguage === "ar" ? "تأصيل احترافي لملفات فيزا شنغن وتركيا، حجز مواعيد TLScontact وVFS Global سريعة، ترجمة وصياغة المستندات." : "Schengen and Turkish visa file optimization with appointment scheduling and certified translations in Alger.",
              icon: <Award className="text-accent" size={26} weight="thin" />
            }
          ].map((srv, idx) => (
            <div
              key={idx}
              className={`p-8 rounded-3xl bg-[#f0f4f8] hover:bg-[#1c4b6e] border border-primary/10 hover:border-accent/15 transition-all duration-300 ${isRTL ? "text-right" : "text-left"
                }`}
            >
              <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center mb-6 border border-primary/10">
                {srv.icon}
              </div>
              <h4 className="font-display font-bold text-lg uppercase tracking-wider text-[#FFFFFF]">
                {srv.title}
              </h4>
              <p className="text-xs text-primary/60 leading-relaxed font-sans mt-3">
                {srv.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="bg-[#f0f4f8]/5 py-20 border-y border-primary/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <span className="text-xs font-bold tracking-[0.25em] text-accent uppercase">{t.whyChooseUsTitle}</span>
            <h2 className="font-display font-black text-3xl sm:text-4xl uppercase text-primary">
              {currentLanguage === "ar" ? "الريادة المطلقة في سوق السياحة الراقية" : "Distinction Built on Trusted Standards"}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: currentLanguage === "ar" ? "أسعار منافسة مدروسة" : "Unbeaten Custom Value",
                desc: currentLanguage === "ar" ? "نوفر شراكات مباشرة مع الفنادق والخطوط الجوية لنضمن لك أسعاراً ممتازة دون أي رسوم مخفية." : "Direct vendor pricing guarantees supreme value over middleman costs, paired with zero surprise supplementals.",
                icon: <ShieldCheck className="text-accent" size={24} weight="thin" />
              },
              {
                title: currentLanguage === "ar" ? "طواقم دعم على مدار 24/7" : "Continuous Concierge Support",
                desc: currentLanguage === "ar" ? "وكيلك الشخصي على واتساب يتابع تفاصيل رحلتك وفنادقك من لحظة الإقلاع إلى العودة لبلدك." : "An executive support agent remains accessible on WhatsApp at all hours to assist with flight alterations or room upgrades.",
                icon: <UserCheck className="text-accent" size={24} weight="thin" />
              },
              {
                title: currentLanguage === "ar" ? "علاقات وموثوقية عالية" : "Elite Government Authorization",
                desc: currentLanguage === "ar" ? "وكالة معتمدة ومرخصة برقم 1629/S لضمان رحلات عائلية وروحية بسلامة تامة." : "Full licensing ensures rigid compliance with international aviation, luxury hotel chains and consulate guidelines.",
                icon: <Compass className="text-accent" size={24} weight="thin" />
              }
            ].map((card, idx) => (
              <div
                key={idx}
                className={`p-6 bg-white rounded-2xl border border-primary/10 space-y-4 ${isRTL ? "text-right" : "text-left"
                  }`}
              >
                <div className="w-12 h-12 rounded-xl bg-accent/10 border border-accent/20 text-accent flex items-center justify-center">
                  {card.icon}
                </div>
                <h4 className="font-semibold text-base text-primary font-display uppercase tracking-wide">{card.title}</h4>
                <p className="text-xs text-primary/60 leading-relaxed font-sans">{card.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Client Testimonials Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`space-y-4 mb-16 ${isRTL ? "text-right" : "text-left"}`}>
          <div className="flex items-center gap-2 justify-center lg:justify-start">
            <span className="h-0.5 w-12 bg-accent inline-block" />
            <span className="text-xs font-bold tracking-[0.25em] uppercase text-accent">
              {currentLanguage === "ar" ? "آراء نخبة عملائنا" : "ELITE VOICES"}
            </span>
          </div>
          <h2 className="font-display font-black text-3xl sm:text-4xl uppercase tracking-wide">
            {t.reviewsLabel}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              name: "Yasmine Othmani",
              role: currentLanguage === "ar" ? "سيدة أعمال - العاصمة" : "Business Owner, Algiers",
              avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80",
              review: currentLanguage === "ar"
                ? "قدمت توريفاي رعاية رائعة في فيزا شنغن فرنسا وتوفير جناح فندقي فخم في قصر باريس. الخدمة متميزة وسهلة ومحترفة للغاية."
                : "Tourify managed my executive French Schengen application, securing luxury suites at Paris Palace. Outstanding devotion to client comfort.",
              rating: 5
            },
            {
              name: "Amine Belkacemi",
              role: currentLanguage === "ar" ? "مسافر فوتوغرافي - وهران" : "Travel Photographer, Oran",
              avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=100&q=80",
              review: currentLanguage === "ar"
                ? "رحلة تاسيلي ناجر والخيام في جانت كانت ساحرة. الطهاة قدموا وجبات ممتازة وسيارات الدفع الرباعي كانت حديثة وتحركنا بسلاسة تامة."
                : "Djanet dunes camping was sublime. Local chefs made hot delicious food in canyons and the GMC vehicles took high-resolution dunes smoothly.",
              rating: 5
            },
            {
              name: "Kamel Mezrag",
              role: currentLanguage === "ar" ? "حاج معتمر - قسنطينة" : "Pilgrim Member, Constantine",
              avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=100&q=80",
              review: currentLanguage === "ar"
                ? "العمرة الراقية والإقامة بفندق الفيرمونت ببرج الساعة كانت تستحق كل دينار جزائري. شكراً جزيلاً لمرشدنا ومرافقنا شيوخ نوميديا."
                : "The Fairmont Mecca Hotel stay was excellent, and the scholar accompanied my senior mother with outstanding care. Highly recommend their VIP Umrah.",
              rating: 5
            }
          ].map((rev, idx) => (
            <div
              key={idx}
              className={`p-6 rounded-3xl bg-[#f0f4f8] border border-primary/10 space-y-4 hover:border-accent/10 transition-all ${isRTL ? "text-right" : "text-left"
                }`}
            >
              <div className="flex gap-1 justify-start">
                {[...Array(rev.rating)].map((_, i) => (
                  <Star key={i} size={15} className="fill-red-500 text-red-500" weight="fill" />
                ))}
              </div>
              <p className="text-xs text-primary/60 leading-relaxed font-sans italic">
                "{rev.review}"
              </p>
              <div className="flex items-center gap-3 pt-3 border-t border-primary/10">
                <img src={rev.avatar} alt={rev.name} className="w-10 h-10 rounded-full border border-accent" />
                <div>
                  <h5 className="font-semibold text-sm text-primary">{rev.name}</h5>
                  <p className="text-[10px] text-primary/60">{rev.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Travel Gallery - Masonry Visuals */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`space-y-4 mb-16 ${isRTL ? "text-right" : "text-left"}`}>
          <div className="flex items-center gap-2 justify-center lg:justify-start">
            <span className="h-0.5 w-12 bg-accent inline-block" />
            <span className="text-xs font-bold tracking-[0.25em] uppercase text-accent">
              {currentLanguage === "ar" ? "الألبوم الفاخر" : "VISUAL MASTERPIECES"}
            </span>
          </div>
          <h2 className="font-display font-black text-3xl sm:text-4xl uppercase tracking-wide">
            {t.galleryTitle}
          </h2>
          <p className="text-primary/60 text-sm max-w-2xl font-sans">
            {t.gallerySub}
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {galleryImages.map((img, idx) => (
            <div key={idx} className="relative rounded-2xl overflow-hidden h-44 group cursor-pointer border border-primary/10">
              <img
                src={img}
                alt="Client Gallery item"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-accent/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <Compass className="text-primary animate-spin-reverse" size={20} weight="thin" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ Accordion Component */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="text-center space-y-4 mb-16">
          <span className="text-xs font-bold tracking-[0.25em] text-accent uppercase">{t.faqTitle}</span>
          <h2 className="font-display font-black text-3xl uppercase text-primary">
            {currentLanguage === "ar" ? "كل ما تود معرفته" : "CLARITY ON OUR PROTOCOLS"}
          </h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div key={idx} className="rounded-2xl bg-[#f0f4f8] border border-primary/10 overflow-hidden transition-all text-primary">
                <button
                  id={`faq-btn-${idx}`}
                  onClick={() => setOpenFaq(isOpen ? null : idx)}
                  className={`w-full p-6 flex justify-between items-center text-sm font-semibold hover:text-accent transition-colors cursor-pointer ${isRTL ? "text-right flex-row-reverse" : "text-left"
                    }`}
                >
                  <span className="font-display uppercase tracking-wide">{faq.q}</span>
                  <ChevronDown size={18} className={`transform transition-transform ${isOpen ? "rotate-180 text-accent" : "text-primary/60"}`} weight="thin" />
                </button>
                {isOpen && (
                  <div className={`p-6 bg-white/40 border-t border-primary/10 text-xs text-primary/60 leading-relaxed font-sans whitespace-pre-line ${isRTL ? "text-right" : "text-left"
                    }`}>
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

    </div>
  );
};
