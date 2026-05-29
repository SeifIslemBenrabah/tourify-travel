/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from "react";
import { ArrowLeft, MapPin, Star, Calendar, Users, Warning as ShieldAlert, Check, X, Medal as Award, CaretRight as ChevronRight, ShareNetwork as Share2 } from "@phosphor-icons/react";
import { useParams } from "react-router-dom";
import { useApp, translations, formatPriceString, useNavigateTo } from "../../context/AppContext";
import { destinations } from "../../data/destinations";

export const DestinationDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigateTo = useNavigateTo();
  const { currentLanguage, currentCurrency, favorites, toggleFavorite, setPrefilledBooking, setActiveDestinationId } = useApp();
  const t = translations[currentLanguage];
  const isRTL = currentLanguage === "ar";

  // Active Destination matching
  const dest = useMemo(() => {
    return destinations.find((d) => d.id === id) || destinations[0];
  }, [id]);

  // Gallery state
  const [activeImg, setActiveImg] = useState(dest.image);

  // Timeline expanded state
  const [expandedDay, setExpandedDay] = useState<number | null>(1);

  // Related Destinations
  const relatedList = useMemo(() => {
    return destinations
      .filter((d) => d.category === dest.category && d.id !== dest.id)
      .slice(0, 3);
  }, [dest]);

  // Inline Reserve Form State
  const [travelers, setTravelers] = useState(1);
  const [selectedClass, setSelectedClass] = useState<"Economy" | "Premium" | "Luxury Club">("Premium");
  const [shareFeedback, setShareFeedback] = useState("");

  const ticketPrice = useMemo(() => {
    let multiplier = 1;
    if (selectedClass === "Economy") multiplier = 0.8;
    if (selectedClass === "Luxury Club") multiplier = 1.35;
    return Math.ceil(dest.priceDZD * multiplier * travelers);
  }, [dest, travelers, selectedClass]);

  const handleInlineReserve = (e: React.FormEvent) => {
    e.preventDefault();

    setPrefilledBooking({
      travelDate: "",
      travelersCount: travelers,
      packageClass: selectedClass
    });

    navigateTo("booking", id);
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setShareFeedback(currentLanguage === "ar" ? "تم نسخ الرابط الفاخر بنجاح!" : "Luxury link copied to clipboard!");
    setTimeout(() => setShareFeedback(""), 3000);
  };

  const isFav = favorites.includes(dest.id);

  return (
    <div className="pb-20 text-primary bg-white font-sans">

      {/* Dynamic Cinematic Header Banner */}
      <section className="relative h-[65vh] flex items-end overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-white via-white/40 to-white/30 z-10" />
        <img
          src={dest.image}
          alt={dest.name}
          className="absolute inset-0 w-full h-full object-cover object-center"
        />

        {/* Header content overlay info */}
        <div className="relative z-15 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-10 space-y-4 animate-in fade-in slide-in-from-bottom-5 duration-450">

          {/* Breadcrumb back navigation */}
          <button
            id="back-to-dest-btn"
            onClick={() => navigateTo("destinations")}
            className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-accent hover:text-primary transition-colors cursor-pointer group mb-6 bg-white/60 backdrop-blur-sm pl-3 pr-4 py-2 rounded-full border border-primary/10"
          >
            <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" weight="thin" />
            <span>{currentLanguage === "ar" ? "العودة للوجهات" : "Back to Expeditions"}</span>
          </button>

          <div className="space-y-2 text-left">
            <span className="text-xs font-bold tracking-[0.2em] text-accent uppercase px-3 py-1 bg-accent/15 border border-accent/20 rounded-full inline-block">
              {dest.category === "local" ? t.local : t.international}
            </span>
            <h1 className="font-display font-black text-3xl sm:text-5xl md:text-6xl text-primary uppercase tracking-wider max-w-4xl drop-shadow-lg">
              {dest.name}
            </h1>

            <div className="flex flex-wrap items-center gap-6 text-xs text-primary/60 pt-1">
              <div className="flex items-center gap-1">
                <MapPin size={14} className="text-accent" weight="thin" />
                <span className="font-semibold">{dest.country}</span>
              </div>
              <div className="flex items-center gap-1 bg-white/5 border border-primary/10 px-2.5 py-1 rounded-full">
                <Star size={14} className="text-accent fill-accent" weight="thin" />
                <span className="font-bold">{dest.rating}</span>
                <span className="text-primary/60">({dest.reviewsCount} reviews)</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Split Grid Column content */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">

          {/* Left Side: Long description, secondary media assets, itinerary maps, review ledgers */}
          <div className="lg:col-span-2 space-y-12 text-left">

            {/* Description block */}
            <div className="space-y-4">
              <h3 className="font-display font-bold text-xl uppercase tracking-wider border-b border-primary/10 pb-2 text-primary">
                {currentLanguage === "ar" ? "عن الرحلة الاستكشافية" : "THE ESCAPADE BLUEPRINT"}
              </h3>
              <p className="text-sm text-primary/60 leading-relaxed font-sans font-medium whitespace-pre-wrap">
                {dest.description}
              </p>
            </div>

            {/* Media Slider Assets Grid */}
            {dest.images && dest.images.length > 0 && (
              <div className="space-y-4">
                <h4 className="font-display font-semibold text-sm uppercase tracking-wider text-primary/60">
                  {currentLanguage === "ar" ? "ألبوم صور الرحلة" : "VISUAL GALLERY SLIDE"}
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="md:col-span-3 rounded-2xl overflow-hidden h-72 border border-primary/10 shadow-lg">
                    <img
                      src={activeImg}
                      alt="Active visual"
                      className="w-full h-full object-cover transition-opacity duration-300"
                    />
                  </div>
                  {dest.images.map((imgUrl, idx) => (
                    <button
                      id={`gallery-thumb-${idx}`}
                      key={idx}
                      onClick={() => setActiveImg(imgUrl)}
                      className={`rounded-xl overflow-hidden h-20 border transition-all cursor-pointer ${activeImg === imgUrl ? "border-accent ring-2 ring-accent/25" : "border-primary/10 hover:border-primary/10"
                        }`}
                    >
                      <img src={imgUrl} alt="Thumbnail" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Service inclusions & exclusions split checklist */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-[#f0f4f8]/5 p-6 rounded-3xl border border-primary/10 shadow-inner">

              {/* Included services */}
              <div className="space-y-3">
                <h5 className="font-display font-bold text-sm text-[#FFFFFF] uppercase tracking-wider border-b border-primary/10 pb-2 flex items-center gap-1.5">
                  <Award size={15} className="text-green-400" weight="thin" />
                  <span>{currentLanguage === "ar" ? "الخدمات المدمجة" : "INCLUDED COVERS"}</span>
                </h5>
                <ul className="space-y-2 text-xs text-primary/60">
                  {dest.includedServices.map((srv, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <Check size={14} className="text-green-400 shrink-0 mt-0.5" weight="thin" />
                      <span>{srv}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Excluded services */}
              <div className="space-y-3">
                <h5 className="font-display font-bold text-sm text-[#FFFFFF] uppercase tracking-wider border-b border-primary/10 pb-2 flex items-center gap-1.5">
                  <ShieldAlert size={15} className="text-accent" weight="thin" />
                  <span>{currentLanguage === "ar" ? "الخدمات غير المدمجة" : "EXCLUDED ITEMS"}</span>
                </h5>
                <ul className="space-y-2 text-xs text-primary/60">
                  {dest.excludedServices.map((srv, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <X size={14} className="text-accent shrink-0 mt-0.5" weight="thin" />
                      <span>{srv}</span>
                    </li>
                  ))}
                </ul>
              </div>

            </div>

            {/* Travel Itinerary Timeline */}
            <div className="space-y-6">
              <h3 className="font-display font-bold text-xl uppercase tracking-wider border-b border-primary/10 pb-2 text-primary">
                {currentLanguage === "ar" ? "مسار الرحلة اليومي" : "EXPEDITION DAY-BY-DAY TIMELINE"}
              </h3>

              <div className="space-y-4 relative border-l border-primary/10 ml-4 pl-6">
                {dest.itinerary.map((it) => {
                  const isOpen = expandedDay === it.day;
                  return (
                    <div key={it.day} className="relative group">

                      {/* Timeline Node icon circle */}
                      <span className={`absolute -left-[35px] top-1.5 w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-black tracking-wider transition-colors z-10 ${isOpen ? "bg-accent-white/ border border-primary/10"
                        : ""}`}>
                        {it.day}
                      </span>

                      <div className="rounded-2xl bg-[#f0f4f8] border border-primary/10 overflow-hidden text-primary shadow-md">
                        <button
                          id={`itinerary-day-btn-${it.day}`}
                          onClick={() => setExpandedDay(isOpen ? null : it.day)}
                          className="w-full p-4 flex justify-between items-center text-xs font-bold hover:text-accent transition-colors text-left cursor-pointer"
                        >
                          <span className="font-display uppercase tracking-widest text-[#FFFFFF]">
                            {currentLanguage === "ar" ? `اليوم ${it.day}: ${it.title}` : `DAY ${it.day}: ${it.title}`}
                          </span>
                          <ChevronRight size={16} className={`transform transition-transform text-primary/60 ${isOpen ? "rotate-90 text-accent" : ""}`} weight="thin" />
                        </button>
                        {isOpen && (
                          <div className="p-4 bg-white/40 border-t border-primary/10 text-xs text-primary/60 leading-relaxed font-sans">
                            {it.description}
                          </div>
                        )}
                      </div>

                    </div>
                  );
                })}
              </div>
            </div>

            {/* Reviews list */}
            <div className="space-y-6">
              <h3 className="font-display font-bold text-xl uppercase tracking-wider border-b border-primary/10 pb-2 text-primary">
                {currentLanguage === "ar" ? "أراء المغامرين والضيوف" : "PILGRIMS & EXPLORERS FEEDBACK"}
              </h3>

              <div className="space-y-4">
                {dest.reviews.map((rev) => (
                  <div key={rev.id} className="p-5 rounded-2xl bg-white/5 border border-primary/10 space-y-3">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-3">
                        <img src={rev.avatar} alt={rev.user} className="w-10 h-10 rounded-full border border-accent shrink-0" />
                        <div>
                          <h5 className="font-bold text-sm">{rev.user}</h5>
                          <span className="text-[10px] text-primary/60">{rev.date}</span>
                        </div>
                      </div>
                      <div className="flex gap-0.5">
                        {[...Array(rev.rating)].map((_, i) => (
                          <Star key={i} size={12} className="fill-accent text-accent" weight="thin" />
                        ))}
                      </div>
                    </div>
                    <p className="text-xs text-primary/60 leading-relaxed italic font-sans">
                      "{rev.comment}"
                    </p>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Right Side: Floating reservation card or quick reservation form */}
          <div className="space-y-6">
            <div className="p-6 rounded-3xl bg-[#f0f4f8] border border-primary/10 shadow-2xl space-y-6 sticky top-24">

              {/* Action buttons (Share) */}
              <div className="flex justify-center items-center bg-white/5 px-4 py-2 text-xs font-semibold rounded-xl border border-primary/10">
                <button
                  id="det-share-btn"
                  onClick={handleShare}
                  className="flex items-center gap-1.5 text-primary/60 hover:text-primary cursor-pointer"
                >
                  <Share2 size={14} className="text-accent" weight="thin" />
                  <span>{currentLanguage === "ar" ? "مشاركة هذه الرحلة" : "Share Expedition"}</span>
                </button>
              </div>

              {shareFeedback && (
                <div className="text-center p-2 rounded-xl bg-accent text-white text-[11px] font-bold animate-in zoom-in-95 duration-150">
                  {shareFeedback}
                </div>
              )}

              {/* Direct Booking Action Box */}
              <div className={`space-y-4 ${isRTL ? "text-right" : "text-left"}`}>
                <div className="border-b border-primary/10 pb-4 space-y-1">
                  <p className="text-[10px] uppercase text-primary/60 tracking-wider font-bold">
                    {currentLanguage === "ar" ? "تبدأ باقات المغامرة من" : "Expedition Cost Starts From"}
                  </p>
                  <p className="text-3xl font-black text-accent font-sans">
                    {formatPriceString(dest.priceDZD, currentCurrency, currentLanguage)}
                  </p>
                </div>

                <p className="text-xs text-primary/60 leading-relaxed font-sans">
                  {currentLanguage === "ar"
                    ? "قم بتسجيل حجزك الآن عبر نظام الحجز الفاخر الخاص بنا المكون من 5 خطوات."
                    : "Register your request instantly using our comprehensive 5-step premium booking system."}
                </p>

                {/* CTA Reserve button */}
                <button
                  id="reserve-submit-btn"
                  onClick={handleInlineReserve}
                  className="w-full h-12 rounded-2xl bg-accent-white text-xs font-black uppercase tracking-widest transition-all shadow-lg shadow-accent/20 cursor-pointer flex items-center justify-center gap-2"
                >
                  <span>{t.bookNow}</span>
                  <ChevronRight size={14} className={isRTL ? "rotate-180" : ""} weight="thin" />
                </button>

                <div className="flex gap-2 p-3 rounded-xl bg-white/5 border border-primary/10 items-start text-[10px] text-primary/60">
                  <ShieldAlert size={14} className="text-accent shrink-0 mt-0.5" weight="thin" />
                  <p className="leading-tight font-sans text-left">
                    {currentLanguage === "ar"
                      ? "لا توجد دفعات مسبقة مطلوبة هنا. ستقوم بإكمال جميع تفاصيل حجزك ومعلوماتك وجدول الدفع في معالج الحجز."
                      : "No advance payment required. You will configure and customize all itinerary preferences in the next module."}
                  </p>
                </div>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* Related destinations section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-primary/10 pt-16">
        <div className={`space-y-2 mb-10 ${isRTL ? "text-right" : "text-left"}`}>
          <span className="text-xs font-bold tracking-widest text-accent uppercase">
            {currentLanguage === "ar" ? "باقات ذات صلة" : "MATCHING VOYAGES"}
          </span>
          <h4 className="font-display font-bold text-2xl uppercase tracking-wider">
            {currentLanguage === "ar" ? "قد تعجبك أيضاً" : "YOU MAY ALSO APPRECIATE"}
          </h4>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
          {relatedList.map((item) => (
            <div
              key={item.id}
              onClick={() => {
                setActiveDestinationId(item.id);
                navigateTo("destination-details", item.id);
              }}
              className="group cursor-pointer rounded-2xl overflow-hidden bg-[#f0f4f8] border border-primary/10 hover:border-accent/15 transition-all shadow-md flex flex-col space-y-4 p-4"
            >
              <div className="h-44 rounded-xl overflow-hidden relative">
                <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition-all duration-300" />
                <span className="absolute bottom-2 left-2 px-2.5 py-1 text-[9px] font-bold bg-white/80 rounded">
                  {item.category === "local" ? t.local : t.international}
                </span>
              </div>
              <div className="space-y-1">
                <h5 className="font-display font-semibold text-sm uppercase text-primary tracking-wide truncate group-hover:text-accent transition-colors">
                  {item.name}
                </h5>
                <p className="text-[10px] text-primary/60 font-mono flex items-center gap-1">
                  <MapPin size={10} className="text-accent" weight="thin" /> {item.country}
                </p>
                <p className="text-xs font-black text-accent pt-1">{formatPriceString(item.priceDZD, currentCurrency, currentLanguage)}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
};
