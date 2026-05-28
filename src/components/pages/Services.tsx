/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { Airplane as Plane, Building, FileXls as FileSpreadsheet, ShieldCheck, Truck, Users, Briefcase, Bank as Landmark, ArrowUpRight } from "@phosphor-icons/react";
import { useApp, translations, useNavigateTo } from "../../context/AppContext";

export const Services: React.FC = () => {
  const { currentLanguage } = useApp();
  const navigateTo = useNavigateTo();
  const t = translations[currentLanguage];
  const isRTL = currentLanguage === "ar";

  const mainServicesList = [
    {
      title: currentLanguage === "ar" ? "حجز تذاكر الطيران" : "VIP Flight Air Logistics",
      desc: currentLanguage === "ar" ? "درجات أعمال وأولى مؤمنة بالكامل مع طيران الجزائر لضمان خطوط مريحة." : "First-class and executive business-class seats with global carriers, including Air Algérie, Saudia, and Emirates, complete with lounge access.",
      bullets: [
        currentLanguage === "ar" ? "تأبين فوري وتعديلات مجانية" : "Instant seating lock-in with selected classes",
        currentLanguage === "ar" ? "أسعار رحلات جماعية حصرية" : "Specially pre-allocated wholesale tariffs",
        currentLanguage === "ar" ? "دعم على مدار الساعة للتغييرات المفتوحة" : "24/7 flight monitoring & rescheduling desk"
      ],
      icon: <Plane className="text-accent" size={24} weight="thin" />
    },
    {
      title: currentLanguage === "ar" ? "فنادق ومنتجعات 5 نجوم" : "Five-Star Hotel Reservation",
      desc: currentLanguage === "ar" ? "تعاقد حصرى مع أفخم علامات الضيافة كالماريوت والموفنبيك والفيرمونت." : "Direct agreements with world-class chains (Fairmont, Marriott, Oberoi) providing front-yard access and Kaaba/sea-scenic rooms.",
      bullets: [
        currentLanguage === "ar" ? "ترقية مجانية للغرف لنادي توريفاي" : "Complementary room upgrades to suites",
        currentLanguage === "ar" ? "تسجيل خروج متأخر مجاناً" : "Convenient early check-in and late checkout",
        currentLanguage === "ar" ? "وجبات إفطار وعشاء فاخرة مدمجة" : "Gourmet open buffet breakfasts & dinners"
      ],
      icon: <Building className="text-accent" size={24} weight="thin" />
    },
    {
      title: currentLanguage === "ar" ? "مواعيد وبصمات التأشيرات" : "TLScontact & VFS Visa Assistance",
      desc: currentLanguage === "ar" ? "تنظيم وتدقيق لملفات فيزا شنغن للجزائريين لضمان قبول سريع وسلس." : "Full file engineering and fast-track appointment securement for Schengen (France, Spain, Italy) and Turkish consulates.",
      bullets: [
        currentLanguage === "ar" ? "تدقيق المستندات وحجز تامين السفر" : "Certified translation of official documents",
        currentLanguage === "ar" ? "حجز مواعيد سريعة وسحب آلي" : "Priority appointment sweeps and locks",
        currentLanguage === "ar" ? "نسبة قبول فائقة تزيد عن %96" : "Audit processes assuring >96% authorization rate"
      ],
      icon: <FileSpreadsheet className="text-accent" size={24} weight="thin" />
    },
    {
      title: currentLanguage === "ar" ? "باقات العمرة الروحية للنخبة" : "Spiritual Saudi Umrah elite",
      desc: currentLanguage === "ar" ? "أرقى رحلات العمرة الروحانية مع مرافقة شيوخ وخصم تأشيرة نسك." : "Complete luxury spiritual packages featuring hotel stays directly facing Haram courtyard and immediate Nusuk permits.",
      bullets: [
        currentLanguage === "ar" ? "طيران مباشر وباصات حديثة مكيفة" : "Direct flights from Algiers & Medina bullet trains",
        currentLanguage === "ar" ? "إرشاد فقهي وتاريخي ودعم متكامل" : "Dedicated scholar guidance for group rituals",
        currentLanguage === "ar" ? "ترتيب الكراسي والخدمات الخاصة للعائلات" : "Special wheelchair/private transfer setups for seniors"
      ],
      icon: <Landmark className="text-accent" size={24} weight="thin" />
    },
    {
      title: currentLanguage === "ar" ? "بطاقات التأمين الطبي للرحلات" : "Premium Travel Insurance",
      desc: currentLanguage === "ar" ? "بطاقة تأمين شاملة لمتطلبات فيزا شنغن بأسعار ممتازة." : "Highly competitive travel shields conforming to rigorous Schengen VFS guidelines and medical protocols globally.",
      bullets: [
        currentLanguage === "ar" ? "تأمين طبي فوري معتمد" : "Instant approved documentation",
        currentLanguage === "ar" ? "تأمين إلغاء الرحلة وفقدان الحقائب" : "Trip cancellation and luggage recovery shields",
        currentLanguage === "ar" ? "تغطية كاملة للمصاريف الطبية الطارئة" : "Emergency global medical cost assistance"
      ],
      icon: <ShieldCheck className="text-accent" size={24} weight="thin" />
    },
    {
      title: currentLanguage === "ar" ? "شحن وسيارات الدفع الرباعي" : "Transportation & Mercedes Chauffeur",
      desc: currentLanguage === "ar" ? "نقل فاخر بسيارات جي ام سي مرفهة وسيارات مرسيدس خاصة." : "VIP private transfers using luxury Mercedes executive sedans and GMC Yukon SUVs with professional local drivers.",
      bullets: [
        currentLanguage === "ar" ? "توصيل من المطار بمرافق في أي وقت" : "Baggage host handling & airport greeting",
        currentLanguage === "ar" ? "تنقل سلس عبر الكثبان والرمال" : "Sand-rugged 4x4 vehicles inside Djanet dunes",
        currentLanguage === "ar" ? "خدمات النخبة من الباب إلى الباب" : "VIP customizable day-trip chauffeuring"
      ],
      icon: <Truck className="text-accent" size={24} weight="thin" />
    },
    {
      title: currentLanguage === "ar" ? "الرحلات السياحية الجماعية والمخصصة" : "Luxury Customized Group Travel",
      desc: currentLanguage === "ar" ? "مغامرات سياحية منظمة للعائلات والمجموعات مع قادة مرشدين محترفين." : "Pre-organized group escapades for families or like-minded explorers seeking communal comfort and shared guidance.",
      bullets: [
        currentLanguage === "ar" ? "برنامج يومي غنى بالمزارات الحصرية" : "Expertly pre-planned historic itineraries",
        currentLanguage === "ar" ? "مرافق ووكيل سياحي دائم مع المجموعة" : "Permanent bilingual tour host with the block",
        currentLanguage === "ar" ? "أسعار غرف جماعية متميزة ومحفزة" : "Highly discounted group boarding packages"
      ],
      icon: <Users className="text-accent" size={24} weight="thin" />
    },
    {
      title: currentLanguage === "ar" ? "رحلات الأعمال للمؤسسات" : "Bespoke Business & Corporate Travel",
      desc: currentLanguage === "ar" ? "تنظيم وتسهيل رحلات السفر لمديري الشركات والمؤسسات الجزائرية." : "Seamless, stress-free travel schedules for Algiers corporations, foreign delegations, and executive directors.",
      bullets: [
        currentLanguage === "ar" ? "فواتير معتمدة وإثباتات الدفع السلسة" : "Consolidated monthly corporate billing",
        currentLanguage === "ar" ? "حجز قاعات المؤتمرات واللقاءات الفخمة" : "High-speed boardrooms and meeting setups",
        currentLanguage === "ar" ? "تأصيل تذاكر سريعة وتعديل مفتوح" : "Fast-track VIP airport fast lane options"
      ],
      icon: <Briefcase className="text-accent" size={24} weight="thin" />
    }
  ];

  return (
    <div className="space-y-16 pb-20 text-white bg-primary-dark font-sans">
      
      {/* Cinematic Banner */}
      <section className="relative h-[40vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-primary-dark/70 z-10" />
        <img
          src="https://images.unsplash.com/photo-1485081669829-bacb8c7bb1f3?auto=format&fit=crop&w=1920&q=80"
          alt="Bespoke services banner"
          className="absolute inset-0 w-full h-full object-cover object-center translate-y-[-10%]"
        />
        <div className="relative z-15 text-center px-4 animate-in fade-in slide-in-from-bottom-5 duration-500">
          <span className="text-xs font-bold tracking-[0.25em] text-accent uppercase bg-accent/15 px-3 py-1 rounded-full border border-accent/20">
            {currentLanguage === "ar" ? "خدمات توريفاي الشاملة" : "TOURIFY Bespoke Services"}
          </span>
          <h1 className="font-display font-black text-3xl sm:text-5xl uppercase tracking-wider text-white mt-3">
            {currentLanguage === "ar" ? "الرعاية والخدمات الاستثنائية" : " Bespoke Travel Services"}
          </h1>
          <p className="text-xs sm:text-sm text-white/70 max-w-2xl mx-auto mt-2">
            {t.servicesSub}
          </p>
        </div>
      </section>

      {/* Grid of detailed Cards */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 text-left">
          {mainServicesList.map((srv, idx) => (
            <div
              key={idx}
              className="p-8 rounded-3xl bg-primary hover:bg-[#1c4b6e] border border-white/5 hover:border-accent/10 transition-all duration-300 flex flex-col justify-between"
            >
              <div className="space-y-5">
                <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 text-accent flex items-center justify-center">
                  {srv.icon}
                </div>
                <div className="space-y-2">
                  <h4 className="font-display font-bold text-lg uppercase tracking-wider text-white">
                    {srv.title}
                  </h4>
                  <p className="text-xs text-white/55 leading-relaxed font-sans min-h-[50px]">
                    {srv.desc}
                  </p>
                </div>

                <ul className="space-y-2 border-t border-white/5 pt-4 text-[11px] font-semibold text-white/75">
                  {srv.bullets.map((b, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-accent shrink-0" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action trigger button */}
              <button
                id={`srv-action-btn-${idx}`}
                onClick={() => navigateTo("contact")}
                className="w-full mt-6 py-2.5 rounded-xl bg-white/5 group-hover:bg-accent border border-white/10 hover:border-transparent text-[11px] font-bold uppercase tracking-wider transition-all cursor-pointer flex items-center justify-center gap-1 hover:bg-accent"
              >
                <span>{currentLanguage === "ar" ? "استفسر الآن" : "Order Bespoke Solution"}</span>
                <ArrowUpRight size={14} weight="thin" />
              </button>
            </div>
          ))}
        </div>

        {/* Big CTA banner inside the services page */}
        <div className="rounded-3xl overflow-hidden relative bg-primary items-center p-8 md:p-12 border border-white/10 shadow-2xl flex flex-col md:flex-row justify-between gap-6 mt-16 max-w-5xl mx-auto text-left">
          <div className="space-y-2 max-w-xl">
            <h4 className="font-display font-black text-xl uppercase tracking-wider">
              {currentLanguage === "ar" ? "هل تحتاج لبرنامج سياحي مخصص بالكامل؟" : "DEMAND A PURE CUSTOM EXPERIENCE?"}
            </h4>
            <p className="text-xs text-white/60 font-sans leading-relaxed">
              {currentLanguage === "ar"
                ? "تحدث بوضوح مع مستشار السفر الخاص بنوميديا واشرح متطلبات رحلتك وتواريخ الفنادق والرحلات الجوية وسنقوم بصياغة برنامج استثنائي لكم."
                : "Describe your destination, exact calendar dates, and luxury accommodation parameters. We will compile a private pre-vetted itinerary in 24 hours."}
            </p>
          </div>

          <button
            id="srv-contact-concierge"
            onClick={() => navigateTo("contact")}
            className="py-3 px-8 rounded-2xl bg-accent hover:bg-accent-hover text-white text-xs font-bold uppercase tracking-wider transition-all shadow-lg shrink-0 cursor-pointer"
          >
            {currentLanguage === "ar" ? "تواصل مع مستشار السفر" : "Contact Elysian Concierge"}
          </button>
        </div>

      </section>

    </div>
  );
};
