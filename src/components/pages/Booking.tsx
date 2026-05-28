/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from "react";
import { Compass, CheckCircle as CheckCircle2, ShieldCheck, CaretRight as ChevronRight, CaretLeft as ChevronLeft, MapPin, Calendar, Users, FileText, SealCheck as BadgeCheck, QrCode } from "@phosphor-icons/react";
import { useParams } from "react-router-dom";
import { useApp, translations, formatPriceString, useNavigateTo } from "../../context/AppContext";
import { destinations } from "../../data/destinations";

export const Booking: React.FC = () => {
  const { destinationId } = useParams<{ destinationId?: string }>();
  const navigateTo = useNavigateTo();
  const { currentLanguage, currentCurrency, bookTrip, userSession, activeDestinationId, prefilledBooking, setPrefilledBooking } = useApp();
  const t = translations[currentLanguage];
  const isRTL = currentLanguage === "ar";

  // Wizard Step State: 1 to 5
  const [step, setStep] = useState(1);

  // STEP 1 State: Destination
  const [selectedDestId, setSelectedDestId] = useState(destinationId || activeDestinationId || destinations[0].id);
  const activeDest = useMemo(() => {
    return destinations.find(d => d.id === selectedDestId) || destinations[0];
  }, [selectedDestId]);

  // STEP 2 State: Dates & Class
  const [travelDate, setTravelDate] = useState("");
  const [travelersCount, setTravelersCount] = useState(1);
  const [packageClass, setPackageClass] = useState<"Economy" | "Premium" | "Luxury Club">("Premium");

  // Load prefilled variables from Destination Details page
  React.useEffect(() => {
    if (destinationId) {
      setSelectedDestId(destinationId);
    } else if (activeDestinationId) {
      setSelectedDestId(activeDestinationId);
    }
    if (prefilledBooking) {
      if (prefilledBooking.travelDate) setTravelDate(prefilledBooking.travelDate);
      if (prefilledBooking.travelersCount) setTravelersCount(prefilledBooking.travelersCount);
      if (prefilledBooking.packageClass) setPackageClass(prefilledBooking.packageClass);
      
      // Clean after consumption
      setPrefilledBooking(null);
    }
  }, [activeDestinationId, prefilledBooking, setPrefilledBooking]);

  // Price Calculation
  const finalPrice = useMemo(() => {
    let multiplier = 1;
    if (packageClass === "Economy") multiplier = 0.8;
    if (packageClass === "Luxury Club") multiplier = 1.35;
    return Math.ceil(activeDest.priceDZD * multiplier * travelersCount);
  }, [activeDest, travelersCount, packageClass]);

  // Generate beautiful upcoming available dates dynamically for the active destination
  const availableSchedules = useMemo(() => {
    const daysString = activeDest.duration.split(" ")[0] || "7";
    const numDays = parseInt(daysString) || 7;
    
    // Custom slots for each major destination id or generic
    let baseDates = [
      { start: "2026-06-12" },
      { start: "2026-06-26" },
      { start: "2026-07-10" },
      { start: "2026-07-24" },
    ];

    if (activeDest.id.includes("constantine")) {
      baseDates = [
        { start: "2026-06-19" },
        { start: "2026-07-03" },
        { start: "2026-07-17" },
        { start: "2026-07-31" },
      ];
    } else if (activeDest.id.includes("umrah")) {
      baseDates = [
        { start: "2026-06-05" },
        { start: "2026-06-20" },
        { start: "2026-07-05" },
        { start: "2026-07-20" },
      ];
    }

    return baseDates.map((d) => {
      const startDate = new Date(d.start);
      const endDate = new Date(startDate);
      endDate.setDate(startDate.getDate() + numDays);
      
      const formattedStart = startDate.toLocaleDateString(currentLanguage === "ar" ? "ar-EG" : "en-US", {
        month: "short",
        day: "numeric",
        year: "numeric"
      });
      
      const formattedEnd = endDate.toLocaleDateString(currentLanguage === "ar" ? "ar-EG" : "en-US", {
        month: "short",
        day: "numeric",
        year: "numeric"
      });

      const label = currentLanguage === "ar" 
        ? `من ${formattedStart} إلى ${formattedEnd}`
        : `${formattedStart} to ${formattedEnd}`;

      return {
        date: d.start,
        label,
        daysNights: activeDest.duration,
        priceDZD: activeDest.priceDZD
      };
    });
  }, [activeDest, currentLanguage]);

  // Auto-select first available schedule on load or active destination change
  React.useEffect(() => {
    if (availableSchedules.length > 0 && (!travelDate || !availableSchedules.some(s => s.date === travelDate))) {
      setTravelDate(availableSchedules[0].date);
    }
  }, [availableSchedules, travelDate]);

  // STEP 3 State: Passenger Ident
  const [leadName, setLeadName] = useState(userSession?.fullName || "");
  const [leadPassport, setLeadPassport] = useState("");
  const [leadEmail, setLeadEmail] = useState(userSession?.email || "");
  const [leadPhone, setLeadPhone] = useState(userSession?.phoneNumber || "");

  // Record generation state
  const [recordedId, setRecordedId] = useState("");

  const handleNextStep = () => {
    if (step === 1 && !travelDate) {
      alert(currentLanguage === "ar" ? "يرجى اختيار تاريخ السفر لمواصلة الحجز." : "Please select your preferred departure date.");
      return;
    }
    if (step === 3 && (!leadName || !leadPassport || !leadEmail)) {
      alert(currentLanguage === "ar" ? "يرجى تعبئة جميع بيانات المسافر وجواز السفر لمواصلة الحجز." : "Please fill in lead traveler specifications & passport numbers.");
      return;
    }
    if (step === 4) {
      // Simulate confirmation & publish to Context
      const recId = `TL-${Math.floor(Math.random() * 900000) + 100000}`;
      setRecordedId(recId);

      const record = {
        id: recId,
        destinationId: activeDest.id,
        destinationName: activeDest.name,
        destinationImage: activeDest.image,
        travelDate,
        duration: activeDest.duration,
        travelersCount,
        travelerDetails: [
          {
            fullName: leadName,
            passportNumber: leadPassport,
            email: leadEmail,
            phone: leadPhone
          }
        ],
        packageClass,
        totalPriceDZD: finalPrice,
        paymentMethod: currentLanguage === "ar" ? "الدفع بالوكالة / بريد الجزائر CCP" : "Pay at Agency Office / Bank Wire (CCP)",
        status: "Confirmed" as const,
        createdAt: new Date().toLocaleDateString()
      };

      bookTrip(record);
    }
    setStep(prev => prev + 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handlePrevStep = () => {
    setStep(prev => prev - 1);
    window.scrollTo({ top: 300, behavior: "smooth" });
  };

  return (
    <div className={`space-y-16 pb-20 text-white bg-primary-dark font-sans ${isRTL ? "text-right" : "text-left"}`} dir={isRTL ? "rtl" : "ltr"}>
      
      {/* Dynamic Banner */}
      <section className="relative h-[35vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-primary-dark/70 z-10" />
        <img
          src="https://images.unsplash.com/photo-1507608616173-124cfa810a0d?auto=format&fit=crop&w=1920&q=80"
          alt="Booking wizard banner"
          className="absolute inset-0 w-full h-full object-cover object-center translate-y-[-10%]"
        />
        <div className="relative z-15 text-center px-4 animate-in fade-in slide-in-from-bottom-5 duration-500">
          <span className="text-xs font-bold tracking-[0.25em] text-accent uppercase bg-accent/15 px-3 py-1 rounded-full border border-accent/20">
            {currentLanguage === "ar" ? "حجز باقات النخبة" : "TOURIFY SYSTEM BOOKINGS"}
          </span>
          <h1 className="font-display font-black text-3xl sm:text-5xl uppercase tracking-wider text-white mt-3">
            {currentLanguage === "ar" ? "منظومة الحجز متعددة المراحل" : "ELITE RESERVATION WIZARD"}
          </h1>
          <p className="text-xs sm:text-sm text-white/70 max-w-2xl mx-auto mt-2 text-center">
            {currentLanguage === "ar"
              ? "حجز ميسر بخمسة خطوات سلسة للرحلات المحلية ومزارات العمرة والترحال الدولي"
              : "Five seamless steps specifying destination, guests count, traveler info, itemized summary review, and getting instant ticket receipt"}
          </p>
        </div>
      </section>

      {/* Progress Indicators */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="flex items-start justify-between relative max-w-3xl mx-auto pt-2 pb-6">
          {/* Timeline lines connection */}
          <div className="absolute left-5 right-5 top-7 h-0.5 bg-white/10 z-0" />
          <div 
            className={`absolute top-7 h-0.5 bg-accent z-0 transition-all duration-350 ${isRTL ? "right-5 left-auto" : "left-5 right-auto"}`} 
            style={{ width: `calc(${((step - 1) / 4) * 100}% - ${((step - 1) / 4) * 40}px)` }} 
          />

          {[1, 2, 3, 4, 5].map((s) => {
            const active = step >= s;
            const current = step === s;
            return (
              <div key={s} className="relative z-10 flex flex-col items-center">
                <span className={`w-10 h-10 rounded-full flex items-center justify-center text-xs font-black border transition-all ${
                  current ? "bg-accent text-white border-transparent ring-4 ring-accent/20" : active ? "bg-[#11354E] text-white border-accent" : "bg-primary-dark text-white/40 border-white/10"
                }`}>
                  {s}
                </span>
                <span className={`hidden md:block text-[9px] uppercase font-bold tracking-wider mt-2 ${
                  current ? "text-accent" : active ? "text-white" : "text-white/40"
                }`}>
                  {s === 1 ? (currentLanguage === "ar" ? "الوجهة" : "Destination") :
                   s === 2 ? (currentLanguage === "ar" ? "أعداد الحجز" : "Guests & Class") :
                   s === 3 ? (currentLanguage === "ar" ? "المسافرون" : "Traveler Info") :
                   s === 4 ? (currentLanguage === "ar" ? "المراجعة" : "Review") :
                   (currentLanguage === "ar" ? "تأكيد" : "Receipt")}
                </span>
              </div>
            );
          })}
        </div>
      </section>

      {/* Core Wizard Body */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Main Wizard Form Body */}
          <div className="lg:col-span-12 p-8 rounded-3xl bg-primary border border-white/10 shadow-xl space-y-6 min-h-[400px]">
            
            {/* STEP 1: DESTINATION SELECTION & SCHEDULE DATES */}
            {step === 1 && (
              <div className={`space-y-6 animate-in fade-in duration-200 ${isRTL ? "text-right" : "text-left"}`}>
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-white/5 pb-3">
                  <div>
                    <h3 className="font-display font-bold text-lg text-white uppercase tracking-wider flex items-center gap-2">
                      <Compass className="text-accent" size={20} weight="thin" />
                      <span>{currentLanguage === "ar" ? "المرحلة 1: مواعيد المغادرة المتوفرة" : "STEP 1: SELECT DEPARTURE SCHEDULE"}</span>
                    </h3>
                    <p className="text-xs text-white/50">
                      {currentLanguage === "ar" ? "اختر موعد مغادرتك المفضل مع السعر المرفق وعدد الأيام واللفتات" : "Choose preferred available slot with actual price and duration"}
                    </p>
                  </div>
                  <div className="flex flex-col gap-1 w-full sm:w-auto shrink-0">
                    <label className="text-[9px] uppercase font-bold text-white/40">{currentLanguage === "ar" ? "تغيير وجهة الرحلة" : "Switch Sanctuary"}</label>
                    <select
                      id="book-main-dest-selector"
                      value={selectedDestId}
                      onChange={(e) => setSelectedDestId(e.target.value)}
                      className="bg-primary-dark font-sans text-xs font-bold text-white rounded-xl border border-white/10 p-2.5 focus:outline-none focus:ring-1 focus:ring-accent min-w-[200px] cursor-pointer"
                    >
                      {destinations.map(d => (
                        <option key={d.id} value={d.id}>
                          {d.name} ({d.country})
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Selected Destination Summary Card */}
                <div className="relative p-5 rounded-2xl bg-primary-dark/40 border border-white/5 flex flex-col md:flex-row gap-5 items-center">
                  <img src={activeDest.image} className="w-full md:w-32 h-20 rounded-xl object-cover shrink-0" />
                  <div className="flex-1 min-w-0 text-center md:text-left">
                    <h4 className="font-display font-semibold text-white text-sm uppercase tracking-wide truncate">
                      {activeDest.name}
                    </h4>
                    <div className="flex items-center justify-center md:justify-start gap-1 text-[10px] text-white/50 font-mono mt-1">
                      <MapPin size={11} className="text-accent" weight="thin" />
                      <span>{activeDest.country}</span>
                    </div>
                    <p className="text-[11px] text-white/60 line-clamp-2 mt-2 font-sans leading-relaxed">
                      {activeDest.description}
                    </p>
                  </div>
                  <div className="shrink-0 flex md:flex-col justify-between items-center md:items-end w-full md:w-auto border-t md:border-t-0 md:border-l border-white/10 pt-3 md:pt-0 md:pl-5 gap-2">
                    <div className="text-left md:text-right">
                      <span className="block text-[8px] text-white/40 uppercase tracking-wider">{currentLanguage === "ar" ? "أيام الرحلة" : "Duration"}</span>
                      <span className="text-xs font-bold text-white font-mono bg-white/5 px-2 py-0.5 rounded border border-white/5">{activeDest.duration}</span>
                    </div>
                    <div className="text-right">
                      <span className="block text-[8px] text-white/40 uppercase tracking-wider">{currentLanguage === "ar" ? "السعر الأساسي" : "Base Price"}</span>
                      <span className="text-sm font-black text-accent font-sans">{formatPriceString(activeDest.priceDZD, currentCurrency, currentLanguage)}</span>
                    </div>
                  </div>
                </div>

                {/* Available schedules selector */}
                <div className="space-y-3">
                  <h5 className="text-[10px] font-black tracking-wider uppercase text-white/40">
                    {currentLanguage === "ar" ? "رحلات تفويج الطيران والمغامرة المتوفرة" : "GUARANTEED SCHEDULED DEPARTURES"}
                  </h5>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                    {availableSchedules.map((schedule) => {
                      const isSelected = travelDate === schedule.date;
                      return (
                        <label
                          key={schedule.date}
                          id={`book-label-schedule-${schedule.date}`}
                          className={`block p-4 rounded-xl border transition-all cursor-pointer flex items-center gap-3 ${
                            isSelected ? "border-accent bg-accent/10" : "border-white/5 bg-primary-dark/30 hover:bg-primary-dark/60"
                          }`}
                        >
                          <input
                            id={`schedule-radio-${schedule.date}`}
                            type="radio"
                            name="schedule-selection"
                            value={schedule.date}
                            checked={isSelected}
                            onChange={() => setTravelDate(schedule.date)}
                            className="accent-accent shrink-0"
                          />
                          <div className="flex-1 min-w-0">
                            <span className="block text-[11px] font-bold text-white font-mono">{schedule.label}</span>
                            <div className="flex justify-between items-center mt-2 text-[10px] text-white/55">
                              <span className="font-mono bg-white/5 px-1.5 py-0.5 rounded text-white/70">{schedule.daysNights}</span>
                              <span className="font-sans font-black text-accent">{formatPriceString(schedule.priceDZD, currentCurrency, currentLanguage)}</span>
                            </div>
                          </div>
                        </label>
                      );
                    })}
                  </div>
                </div>

                <div className="flex justify-end pt-4 border-t border-white/5">
                  <button
                    id="step1-next-btn"
                    onClick={handleNextStep}
                    className="py-3 px-8 rounded-2xl bg-accent hover:bg-accent-hover text-white text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-1 cursor-pointer"
                  >
                    {isRTL && <ChevronLeft size={14} weight="thin" />}
                    <span>{currentLanguage === "ar" ? "التالي" : "Continue"}</span>
                    {!isRTL && <ChevronRight size={14} weight="thin" />}
                  </button>
                </div>
              </div>
            )}

            {/* STEP 2: TRAVELERS COUNT & ACCOMMODATION CLASS */}
            {step === 2 && (
              <div className={`space-y-6 animate-in fade-in duration-200 ${isRTL ? "text-right" : "text-left"}`}>
                <div className="border-b border-white/5 pb-2">
                  <h3 className="font-display font-bold text-lg text-white uppercase tracking-wider flex items-center gap-2">
                    <Calendar className="text-accent" size={20} weight="thin" />
                    <span>{currentLanguage === "ar" ? "المرحلة 2: عدد حاملي التذاكر ودرجة السكن" : "STEP 2: GUESTS QUANTITY & SUITE ACCOMMODATION"}</span>
                  </h3>
                  <p className="text-xs text-white/50">{currentLanguage === "ar" ? "حدد عدد الأفراد وفئة الضيافة المفضلة لحزم الإقامة" : "Define specifications of travelers and premium suite bracket status"}</p>
                </div>

                <div className="space-y-5">
                  {/* Selected Departure Date Readonly info */}
                  <div className="p-3.5 rounded-xl bg-accent/5 border border-accent/15 max-w-sm flex items-center gap-3">
                    <Calendar size={16} className="text-accent shrink-0" weight="thin" />
                    <div>
                      <span className="block text-[8px] uppercase tracking-wider text-white/40">{currentLanguage === "ar" ? "موعد المغادرة المحدد" : "Selected Departure Date"}</span>
                      {availableSchedules.find(s => s.date === travelDate)?.label ? (
                        <span className="text-xs font-bold text-white font-mono">{availableSchedules.find(s => s.date === travelDate)?.label}</span>
                      ) : (
                        <span className="text-xs font-bold text-white font-mono">{travelDate}</span>
                      )}
                    </div>
                  </div>

                  {/* Travelers */}
                  <div className={`space-y-1.5 flex flex-col ${isRTL ? "items-start" : "items-start"}`}>
                    <label className={`block text-[10px] text-white/50 font-bold uppercase ${isRTL ? "text-right" : "text-left"}`}>{currentLanguage === "ar" ? "عدد المعتمرين / المسافرين الكلي" : "Total Traveler Specifications"}</label>
                    <div className="flex items-center gap-3">
                      <button
                        id="btn-dec-travelers"
                        type="button"
                        onClick={() => setTravelersCount(prev => Math.max(1, prev - 1))}
                        className="w-10 h-10 rounded-xl bg-primary-dark border border-white/15 flex items-center justify-center font-bold text-white hover:border-accent"
                      >
                        -
                      </button>
                      <span className="font-sans font-bold text-base px-3">{travelersCount}</span>
                      <button
                        id="btn-inc-travelers"
                        type="button"
                        onClick={() => setTravelersCount(prev => Math.min(10, prev + 1))}
                        className="w-10 h-10 rounded-xl bg-primary-dark border border-white/15 flex items-center justify-center font-bold text-white hover:border-accent"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  {/* Class selection dropdown */}
                  <div className="space-y-2">
                    <label className={`block text-[10px] text-white/50 font-bold uppercase ${isRTL ? "text-right" : "text-left"}`}>{currentLanguage === "ar" ? "فئة الإقامة والضيافة" : "Accommodation Bracket Option"}</label>
                    <div className="grid grid-cols-3 gap-3 bg-primary-dark p-1 rounded-2xl border border-white/5 text-xs font-bold text-center">
                      {[
                        { key: "Economy", title: currentLanguage === "ar" ? "اقتصادي مريح" : "Economy Class", desc: "-20% Price" },
                        { key: "Premium", title: currentLanguage === "ar" ? "درجة ممتازة" : "Premium Suite", desc: "Standard Rate" },
                        { key: "Luxury Club", title: currentLanguage === "ar" ? "كلوب الملكي" : "Luxury Club", desc: "+35% Premium" }
                      ].map((cls) => (
                        <button
                          id={`book-class-opt-${cls.key.replace(" ", "")}`}
                          key={cls.key}
                          type="button"
                          onClick={() => setPackageClass(cls.key as any)}
                          className={`p-3 rounded-xl transition-all cursor-pointer flex flex-col items-center gap-0.5 ${
                            packageClass === cls.key ? "bg-accent text-white shadow" : "text-white/60 hover:text-white hover:bg-white/5"
                          }`}
                        >
                          <span>{cls.title}</span>
                          <span className="text-[9px] text-white/40 block font-normal font-mono">{cls.desc}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex justify-between pt-6 border-t border-white/5">
                  <button
                    id="step2-prev-btn"
                    onClick={handlePrevStep}
                    className="py-3 px-6 rounded-2xl border border-white/15 hover:border-white/30 text-white text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-1 cursor-pointer"
                  >
                    {isRTL ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
                    <span>{currentLanguage === "ar" ? "السابق" : "Back"}</span>
                  </button>
                  <button
                    id="step2-next-btn"
                    onClick={handleNextStep}
                    className="py-3 px-8 rounded-2xl bg-accent hover:bg-accent-hover text-white text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-1 cursor-pointer"
                  >
                    {isRTL && <ChevronLeft size={14} weight="thin" />}
                    <span>{currentLanguage === "ar" ? "التالي" : "Continue"}</span>
                    {!isRTL && <ChevronRight size={14} weight="thin" />}
                  </button>
                </div>
              </div>
            )}

            {/* STEP 3: TRAVELER IDENTITY CREDENTIALS */}
            {step === 3 && (
              <div className={`space-y-6 animate-in fade-in duration-200 ${isRTL ? "text-right" : "text-left"}`}>
                <div className="border-b border-white/5 pb-2">
                  <h3 className="font-display font-bold text-lg text-white uppercase tracking-wider flex items-center gap-2">
                    <FileText className="text-accent" size={20} weight="thin" />
                    <span>{currentLanguage === "ar" ? "المرحلة 3: بيانات المسافر وجواز السفر" : "STEP 3: PASSENGER CREDENTIAL FILE"}</span>
                  </h3>
                  <p className="text-xs text-white/50">{currentLanguage === "ar" ? "برجاء كتابة وثائق السفر وجواز السفر لملاءمة تصاريح نسك أو تأشيرات الوجهة" : "Specify passenger details and valid travel documents"}</p>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className={`block text-[10px] text-white/50 mb-1.5 font-bold uppercase ${isRTL ? "text-right" : "text-left"}`}>{currentLanguage === "ar" ? "الاسم الكامل (مطابق للجواز)" : "Lead Traveler Full Name"} *</label>
                    <input
                      id="book-lead-name"
                      type="text"
                      required
                      value={leadName}
                      onChange={(e) => setLeadName(e.target.value)}
                      placeholder="e.g. Seif Islem Benrabah"
                      className="w-full rounded-xl bg-primary-dark border border-white/10 px-4 py-3 text-xs text-white focus:outline-none focus:ring-1 focus:ring-accent"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className={`block text-[10px] text-white/50 mb-1.5 font-bold uppercase ${isRTL ? "text-right" : "text-left"}`}>{currentLanguage === "ar" ? "رقم جواز السفر" : "Passport Reference Number"} *</label>
                      <input
                        id="book-lead-passport"
                        type="text"
                        required
                        value={leadPassport}
                        onChange={(e) => setLeadPassport(e.target.value)}
                        placeholder="e.g. 15697423"
                        className="w-full rounded-xl bg-primary-dark border border-white/10 px-4 py-3 text-xs text-white focus:outline-none focus:ring-1 focus:ring-accent font-mono"
                      />
                    </div>
                    <div>
                      <label className={`block text-[10px] text-white/50 mb-1.5 font-bold uppercase ${isRTL ? "text-right" : "text-left"}`}>{t.phoneLabel}</label>
                      <input
                        id="book-lead-phone"
                        type="tel"
                        value={leadPhone}
                        onChange={(e) => setLeadPhone(e.target.value)}
                        placeholder="e.g. +213 555 12 34 56"
                        className="w-full rounded-xl bg-primary-dark border border-white/10 px-4 py-3 text-xs text-white focus:outline-none focus:ring-1 focus:ring-accent"
                      />
                    </div>
                  </div>

                  <div>
                    <label className={`block text-[10px] text-white/50 mb-1.5 font-bold uppercase ${isRTL ? "text-right" : "text-left"}`}>{t.emailLabel} *</label>
                    <input
                      id="book-lead-email"
                      type="email"
                      required
                      value={leadEmail}
                      onChange={(e) => setLeadEmail(e.target.value)}
                      placeholder="e.g. seifislem.benrabah@gmail.com"
                      className="w-full rounded-xl bg-primary-dark border border-white/10 px-4 py-3 text-xs text-white focus:outline-none focus:ring-1 focus:ring-accent font-mono"
                    />
                  </div>
                </div>

                <div className="flex justify-between pt-6 border-t border-white/5">
                  <button
                    id="step3-prev-btn"
                    onClick={handlePrevStep}
                    className="py-3 px-6 rounded-2xl border border-white/15 hover:border-white/30 text-white text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-1 cursor-pointer"
                  >
                    {isRTL ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
                    <span>{currentLanguage === "ar" ? "السابق" : "Back"}</span>
                  </button>
                  <button
                    id="step3-next-btn"
                    onClick={handleNextStep}
                    className="py-3 px-8 rounded-2xl bg-accent hover:bg-accent-hover text-white text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-1 cursor-pointer"
                  >
                    {isRTL && <ChevronLeft size={14} weight="thin" />}
                    <span>{currentLanguage === "ar" ? "التالي: مراجعة البيانات" : "Next: Review Details"}</span>
                    {!isRTL && <ChevronRight size={14} weight="thin" />}
                  </button>
                </div>
              </div>
            )}

            {/* STEP 4: REVIEW & CONFIRM */}
            {step === 4 && (
              <div className={`space-y-6 animate-in fade-in duration-200 ${isRTL ? "text-right" : "text-left"}`}>
                <div className="border-b border-white/5 pb-2">
                  <h3 className="font-display font-bold text-lg text-white uppercase tracking-wider flex items-center gap-2">
                    <ShieldCheck className="text-accent" size={20} weight="thin" />
                    <span>{currentLanguage === "ar" ? "المرحلة 4: مراجعة وتأكيد الحجز" : "STEP 4: REVIEW & CONFIRM RESERVATION"}</span>
                  </h3>
                  <p className="text-xs text-white/50">
                    {currentLanguage === "ar"
                      ? "يرجى مراجعة تفاصيل حجزك أدناه للتأكد من تطابق المعلومات بالكامل قبل الإرسال."
                      : "Please review all selected parameters below to verify that everything matches perfectly prior to official submission."}
                  </p>
                </div>

                {/* Reservation Summary Table Card */}
                <div className="p-6 rounded-2xl bg-primary-dark/50 border border-white/5 space-y-5 text-xs font-sans">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5 leading-relaxed">
                    {/* Destination */}
                    <div className="space-y-1">
                      <span className="block text-[10px] text-white/40 uppercase tracking-wider">{currentLanguage === "ar" ? "الوجهة المطلوبة" : "Target Destination"}</span>
                      <strong className="text-white text-sm uppercase block font-display">{activeDest.name} ({activeDest.country})</strong>
                      <span className="text-[10px] text-white/50 bg-white/5 px-2 py-0.5 rounded border border-white/5 inline-block font-mono mt-0.5">{activeDest.duration}</span>
                    </div>

                    {/* Target dates */}
                    <div className="space-y-1">
                      <span className="block text-[10px] text-white/40 uppercase tracking-wider">{currentLanguage === "ar" ? "تاريخ السفر والمغادرة" : "Departure Date"}</span>
                      <strong className="text-white text-sm block font-mono">
                        {availableSchedules.find(s => s.date === travelDate)?.label || travelDate}
                      </strong>
                    </div>

                    {/* Traveler amount */}
                    <div className="space-y-1">
                      <span className="block text-[10px] text-white/40 uppercase tracking-wider">{currentLanguage === "ar" ? "عدد المجموعات والدرجة" : "Guests & Standard"}</span>
                      <strong className="text-white text-sm block">
                        {travelersCount} {currentLanguage === "ar" ? "مسافرين" : "Person(s)"} — <span className="text-accent uppercase font-mono font-bold">{packageClass === "Economy" ? (currentLanguage === "ar" ? "اقتصادي مريح" : "Economy Class") : packageClass === "Premium" ? (currentLanguage === "ar" ? "درجة ممتازة" : "Premium Suite") : (currentLanguage === "ar" ? "كلوب الملكي" : "Luxury Club")}</span>
                      </strong>
                    </div>

                    {/* Final Pricing */}
                    <div className="space-y-1">
                      <span className="block text-[10px] text-white/40 uppercase tracking-wider">{currentLanguage === "ar" ? "إجمالي القيمة المقدرة للرحلة" : "Total Booking Expense (CCP)"}</span>
                      <strong className="text-lg font-black text-accent font-sans block">
                        {formatPriceString(finalPrice, currentCurrency, currentLanguage)}
                      </strong>
                    </div>
                  </div>

                  {/* Traveler identity record details */}
                  <div className="border-t border-white/10 pt-4 space-y-3">
                    <h5 className="text-[10px] font-bold uppercase text-accent tracking-wider font-sans">{currentLanguage === "ar" ? "وثائق المسافر والاتصال" : "LEAD TRAVELER CONTACT & DOCUMENTS"}</h5>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono text-white/80">
                      <div>
                        <span className="block text-[9px] text-white/35 font-sans uppercase mb-0.5">{currentLanguage === "ar" ? "الاسم الكامل (مطابق للجواز)" : "Lead Traveler Full Name"}</span>
                        <span className="text-white font-sans font-semibold text-xs">{leadName}</span>
                      </div>
                      <div>
                        <span className="block text-[9px] text-white/35 font-sans uppercase mb-0.5">{currentLanguage === "ar" ? "رقم جواز السفر" : "Passport Reference Reference"}</span>
                        <span className="text-white font-semibold text-xs">{leadPassport}</span>
                      </div>
                      <div>
                        <span className="block text-[9px] text-white/35 font-sans uppercase mb-0.5">{t.emailLabel}</span>
                        <span className="text-white text-xs">{leadEmail}</span>
                      </div>
                      <div>
                        <span className="block text-[9px] text-white/35 font-sans uppercase mb-0.5">{t.phoneLabel}</span>
                        <span className="text-white text-xs">{leadPhone}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Core alert advisory call banner */}
                <div className="p-4 rounded-xl bg-accent/15 border border-accent/25 flex gap-3 text-xs items-start leading-relaxed text-white/95">
                  <ShieldCheck size={18} className="text-accent shrink-0 mt-0.5 animate-pulse" weight="thin" />
                  <div>
                    <h5 className="font-bold text-accent mb-0.5">
                      {currentLanguage === "ar" ? "كيف سيتم إكمال وتأكيد حجزك؟" : "Tourify Booking Consultation Process"}
                    </h5>
                    <p className="font-sans text-[11px] text-white/85">
                      {currentLanguage === "ar"
                        ? "بمجرد الضغط على إرسال، سنستلم طلبك فوراً ببياناته. سيقوم مستشارو الرحلات بالوكالة بالتواصل معك عبر الهاتف للتأكد من جاهزية جوازات السفر وتأكيد موعد السفر وإرشادك لإتمام حجزك معنا."
                        : "Upon clicking 'Submit Booking Request', our agency staff will immediately receive your request. A designated travel agent will call you directly to verify passport validity and guide you through the reservation process."}
                    </p>
                  </div>
                </div>

                {/* CTA Actions */}
                <div className="flex justify-between pt-6 border-t border-white/5">
                  <button
                    id="step4-prev-btn"
                    onClick={handlePrevStep}
                    className="py-3 px-6 rounded-2xl border border-white/15 hover:border-white/30 text-white text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-1 cursor-pointer"
                  >
                    {isRTL ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
                    <span>{currentLanguage === "ar" ? "السابق" : "Back"}</span>
                  </button>
                  <button
                    id="step4-submit-btn"
                    onClick={handleNextStep}
                    className="py-3 px-8 rounded-2xl bg-accent hover:bg-accent-hover text-white text-xs font-black uppercase tracking-widest transition-all flex items-center gap-1.5 cursor-pointer shadow-lg shadow-accent/25 animate-pulse"
                  >
                    {isRTL && <ChevronLeft size={14} weight="thin" />}
                    <span>{currentLanguage === "ar" ? "تأكيد وإرسال طلب الحجز" : "Submit Booking Request"}</span>
                    {!isRTL && <ChevronRight size={14} weight="thin" />}
                  </button>
                </div>
              </div>
            )}

            {/* STEP 5: CONFIRMATION BARCODE TICKET */}
            {step === 5 && (
              <div className="space-y-8 animate-in zoom-in-95 duration-200 text-center py-6 font-sans">
                
                <div className="space-y-3">
                  <div className="w-14 h-14 rounded-full bg-green-500/20 text-green-400 border border-green-500/30 flex items-center justify-center mx-auto animate-bounce">
                    <BadgeCheck size={30} weight="thin" />
                  </div>
                  <h3 className="font-display font-black text-2xl uppercase tracking-wider text-white">
                    {currentLanguage === "ar" ? "تم تثبيت حجزك الملكي بنجاح!" : "TOURIFY LUXURY VOYAGE CONFIRMED!"}
                  </h3>
                  <p className="text-xs text-white/60 max-w-sm mx-auto">
                    {currentLanguage === "ar"
                      ? "تم تسييل تذكرة الحجز برقم مرجع رسمي للرحلة. سيقوم ممثل تذاكر الطيران بالتنسيق معك عبر الهاتف/واتساب حالاً."
                      : "Your premium ticket record has been pushed to our Algiers booking manifest. Prepare for direct call coordinates confirmation."}
                  </p>
                </div>

                {/* Boarding pass receipt */}
                <div className={`max-w-md mx-auto rounded-3xl overflow-hidden bg-primary-dark/85 border border-white/10 p-6 space-y-4 ${isRTL ? "text-right" : "text-left"} shadow-2xl relative`} dir={isRTL ? "rtl" : "ltr"}>
                  
                  {/* Header */}
                  <div className={`flex justify-between items-center border-b border-white/10 pb-3 ${isRTL ? "flex-row" : "flex-row-reverse"}`}>
                    <div className="font-display font-black text-xs text-white flex items-center gap-1">
                      <Compass className="text-accent" size={14} weight="thin" />
                      <span>{currentLanguage === "ar" ? "توريفاي الفاخرة" : "TOURIFY VOYAGE"}</span>
                    </div>
                    <span className="text-[9px] font-mono bg-accent/25 px-2 py-0.5 rounded text-accent font-bold">
                      {recordedId}
                    </span>
                  </div>

                  {/* Body grid */}
                  <div className="grid grid-cols-2 gap-4 text-xs">
                    <div>
                      <span className="block text-[8px] text-white/40 uppercase">{currentLanguage === "ar" ? "الوجهة المعنية" : "Destination"}</span>
                      <span className="font-display font-semibold text-white uppercase truncate block">{activeDest.name}</span>
                    </div>
                    <div>
                      <span className="block text-[8px] text-white/40 uppercase">{currentLanguage === "ar" ? "المسافر الرئيسي" : "Lead Pilgrim"}</span>
                      <span className="font-semibold text-white truncate block">{leadName}</span>
                    </div>
                    <div>
                      <span className="block text-[8px] text-white/40 uppercase">{currentLanguage === "ar" ? "تاريخ الإقلاع والبدء" : "take-off Date"}</span>
                      <span className="font-semibold text-white font-mono">{travelDate}</span>
                    </div>
                    <div>
                      <span className="block text-[8px] text-white/40 uppercase">{currentLanguage === "ar" ? "الفئة والدرجة" : "Class Tier"}</span>
                      <span className="font-mono font-semibold text-accent">{packageClass === "Economy" ? (currentLanguage === "ar" ? "اقتصادي" : "Economy") : packageClass === "Premium" ? (currentLanguage === "ar" ? "ممتاز" : "Premium") : (currentLanguage === "ar" ? "ملكي فاخر" : "Luxury Club")}</span>
                    </div>
                    <div>
                      <span className="block text-[8px] text-white/40 uppercase">{currentLanguage === "ar" ? "مدة الإقامة" : "duration"}</span>
                      <span className="font-semibold text-white font-mono">{activeDest.duration}</span>
                    </div>
                    <div>
                      <span className="block text-[8px] text-white/40 uppercase">{currentLanguage === "ar" ? "عدد الأفراد" : "Travelers"}</span>
                      <span className="font-semibold text-white">{travelersCount} {currentLanguage === "ar" ? "مسافرين" : "Person(s)"}</span>
                    </div>
                  </div>

                  {/* Pricing footer */}
                  <div className="pt-4 border-t border-dashed border-white/15 flex items-center justify-between text-xs font-semibold">
                    <span className="text-white/40 uppercase">{currentLanguage === "ar" ? "قيمة تثبيت تذكرة الرحلة" : "Verified holding cost"}</span>
                    <span className="text-xl font-black text-accent font-sans">
                      {formatPriceString(finalPrice, currentCurrency, currentLanguage)}
                    </span>
                  </div>

                  {/* Barcode representation */}
                  <div className="flex flex-col items-center pt-2 gap-2 border-t border-white/10">
                    <QrCode size={45} className="text-white" weight="thin" />
                    <span className="text-[9px] font-mono text-white/30 tracking-[0.2em]">{recordedId}-{activeDest.id.toUpperCase().slice(0, 4)}</span>
                  </div>

                  {/* Ticket notch cutouts */}
                  <div className="absolute -left-3 top-2/3 -translate-y-1/2 w-6 h-6 rounded-full bg-primary" />
                  <div className="absolute -right-3 top-2/3 -translate-y-1/2 w-6 h-6 rounded-full bg-primary" />
                </div>

                <div className="pt-4 max-w-sm mx-auto">
                  <button
                    id="finish-booking-btn"
                    onClick={() => {
                      setStep(1);
                      navigateTo("home");
                    }}
                    className="w-full py-3 rounded-2xl bg-accent hover:bg-accent-hover text-white text-xs font-black uppercase tracking-wider transition-all cursor-pointer"
                  >
                    {currentLanguage === "ar" ? "العودة للرئيسية" : "Complete & Return"}
                  </button>
                </div>

              </div>
            )}

          </div>

        </div>
      </section>

    </div>
  );
};
