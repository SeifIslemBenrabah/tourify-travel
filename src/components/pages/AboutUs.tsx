/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { Compass, Target } from "@phosphor-icons/react";
import { useApp, translations } from "../../context/AppContext";

export const AboutUs: React.FC = () => {
  const { currentLanguage } = useApp();
  const t = translations[currentLanguage];
  const isRTL = currentLanguage === "ar";

  const statsList = [
    { label: currentLanguage === "ar" ? "مسافر سعيد" : "Happy Travelers", val: "10K+" },
    { label: currentLanguage === "ar" ? "رحلة سياحية فاخرة" : "Elite Escapades", val: "500+" },
    { label: currentLanguage === "ar" ? "نسبة نجاح التأشيرة" : "Visa Success Rate", val: "96%" },
    { label: currentLanguage === "ar" ? "تأسست في العاصمة" : "Established In", val: "2018" }
  ];

  const teamList = [
    {
      name: "Seif Islem Benrabah",
      role: currentLanguage === "ar" ? "المؤسس والرئيس التنفيذي" : "Founder & Executive Director",
      avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=150&q=80",
      bio: currentLanguage === "ar" ? "خبرة تفوق 12 عاماً في إدارة السياحة الروحية وخدمات النقل الفاخر واليخوت." : "12+ years of coordinating luxury Saharan expeditions, private flights, and bespoke corporate travel in Algiers."
    },
    {
      name: "Sofienne Alilou",
      role: currentLanguage === "ar" ? "مدير العمليات السياحية والرحلات" : "Head of Tourism & Saharan Expeditions",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80",
      bio: currentLanguage === "ar" ? "قائد مغامرات متمرس وخبير مسالك في عمق تاسيلي ناجر والجنوب الجزائري الكبير." : "Veteran lead coordinator for Djanet desert safaris and deep Tassili sandstone navigation."
    },
    {
      name: "Mounira Benali",
      role: currentLanguage === "ar" ? "خبيرة التأشيرات والمواعيد" : "Schengen & International Visa Specialist",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80",
      bio: currentLanguage === "ar" ? "خبيرة متفردة في تبسيط ملفات TLScontact وVFS Global لضمان سحب المواعيد سريعا." : "Expert auditor of bank ledger statements and appointments for French, Spanish, and Italian consulates."
    }
  ];

  return (
    <div className="space-y-16 pb-20 text-primary bg-white font-sans">
      
      {/* Immersive Header Banner */}
      <section className="relative h-[40vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-white/70 z-10" />
        <img
          src="https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=1920&q=80"
          alt="About us banner"
          className="absolute inset-0 w-full h-full object-cover object-center translate-y-[-10%]"
        />
        <div className="relative z-15 text-center px-4 animate-in fade-in slide-in-from-bottom-5 duration-500">
          <span className="text-xs font-bold tracking-[0.25em] text-accent uppercase bg-accent/15 px-3 py-1 rounded-full border border-accent/20">
            {currentLanguage === "ar" ? "قصة توريفاي" : "OUR HERITAGE"}
          </span>
          <h1 className="font-display font-black text-3xl sm:text-5xl uppercase tracking-wider text-primary mt-3">
            {currentLanguage === "ar" ? "الريادة، الصدق، التميز" : "ABOUT TOURIFY"}
          </h1>
          <p className="text-xs sm:text-sm text-primary/60 max-w-2xl mx-auto mt-2">
            {currentLanguage === "ar"
              ? "نصمم رحلات النخبة بلمسة جزائرية أصيلة تجمع بين الفخامة العالمية والروح التاريخية العتيقة"
              : "Crafting premium travel legacies combining local Tourify traits with elite worldwide standards"}
          </p>
        </div>
      </section>

      {/* Corporate Story and Mission/Vision */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Main story grid split */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className={`space-y-6 ${isRTL ? "text-right" : "text-left"}`}>
            <div className="flex items-center gap-2">
              <span className="h-0.5 w-8 bg-accent" />
              <span className="text-xs font-bold uppercase text-accent tracking-widest">
                {currentLanguage === "ar" ? "المسيرة المشرقة" : "THE CHRONOLOGY OF EXCELLENCE"}
              </span>
            </div>
            <h2 className="font-display font-black text-2xl sm:text-4xl uppercase leading-tight">
              {currentLanguage === "ar" ? "نصف عقد من ريادة الضيافة الجزائرية الفخمة" : "ESTABLISHING ALGERIA'S ULTIMATE TRAVEL STANDARD"}
            </h2>
            <p className="text-xs sm:text-sm text-primary/60 font-sans leading-relaxed">
              {currentLanguage === "ar"
                ? "تأسست وكالة توريفاي للأسفار الفاخرة في قلب العاصمة الجزائر بهدف سد الفراغ في سوق السياحة الملكية. أردنا ربط المسافر الجزائري بأرقى مراتب الإقامة وبوابات الترفيه العالمية، وفي نفس الوقت الكشف عن سكون تاسيلي ناجر وأودية جبال الهقار العتيقة بأعلى سبل الرفاهية والراحة."
                : "Tourify was structured in Algiers with a dynamic mission: to replace ordinary vacation agency templates with standard-setting, white-glove international execution. Spanning local expeditions to Mecca and the European Riviera, our team combines local devotion with absolute compliance to security."}
            </p>
          </div>

          <div className="relative h-72 md:h-96 rounded-3xl overflow-hidden border border-primary/10 shadow-2xl">
            <img
              src="https://images.unsplash.com/photo-1598424233772-e144d183ad8c?auto=format&fit=crop&w=800&q=80"
              alt="Algiers white structures"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Mission and Vision splits */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          
          {/* Mission */}
          <div className={`p-8 bg-[#f0f4f8] rounded-3xl border border-primary/10 space-y-4 ${isRTL ? "text-right" : "text-left"}`}>
            <div className="w-12 h-12 rounded-2xl bg-accent/15 border border-accent/25 flex items-center justify-center text-accent">
              <Target size={22} weight="thin" />
            </div>
            <h4 className="font-display font-bold text-lg uppercase tracking-wider">{currentLanguage === "ar" ? "رسالتنا السامية" : "OUR SACRED MISSION"}</h4>
            <p className="text-xs text-primary/60 leading-relaxed font-sans">
              {currentLanguage === "ar"
                ? "تقديم خدمات سفر فائقة الجودة تضمن لعملائنا الخصوصية المطلقة، الأمان التام، والذكريات التاريخية التي لا تنسى رفقة عائلاتهم."
                : "To design journeys of absolute security, ensuring our clients escape in pristine privacy and acquire life-altering experiences."}
            </p>
          </div>

          {/* Vision */}
          <div className={`p-8 bg-[#f0f4f8] rounded-3xl border border-primary/10 space-y-4 ${isRTL ? "text-right" : "text-left"}`}>
            <div className="w-12 h-12 rounded-2xl bg-accent/15 border border-accent/25 flex items-center justify-center text-accent">
              <Compass className="text-accent" size={22} weight="thin" />
            </div>
            <h4 className="font-display font-bold text-lg uppercase tracking-wider">{currentLanguage === "ar" ? "رؤيتنا المستقبلية" : "OUR CHERISHED VISION"}</h4>
            <p className="text-xs text-primary/60 leading-relaxed font-sans">
              {currentLanguage === "ar"
                ? "أن نصبح المرجع الأول للضيافة والسياحة النخبوية والروحية في شمال أفريقيا والجزائر، مع الحفاظ الدائم على الهوية المحلية."
                : "To remain the ultimate benchmark of elite, religious, and eco-tourism in North Africa, preserving local heritage standards."}
            </p>
          </div>

        </div>

        {/* Statistics Grid banner */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 p-8 rounded-3xl bg-[#f0f4f8] border border-primary/10 shadow-inner text-center">
          {statsList.map((st, idx) => (
            <div key={idx} className="space-y-1">
              <span className="block font-sans font-black text-3xl sm:text-5xl text-accent tracking-tight">{st.val}</span>
              <span className="text-[10px] text-primary/60 uppercase font-semibold">{st.label}</span>
            </div>
          ))}
        </div>

        {/* Team Section */}
        <div className="space-y-12">
          <div className="text-center space-y-3">
            <span className="text-xs font-bold tracking-[0.25em] text-accent uppercase">
              {currentLanguage === "ar" ? "طاقم النخبة" : "THE COLLECTIVE OF CONCIERGES"}
            </span>
            <h3 className="font-display font-black text-2xl sm:text-4xl uppercase">
              {currentLanguage === "ar" ? "قادة ومستشارو نوميديا للأسفار" : "EXECUTIVE OFFICERS"}
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 text-left">
            {teamList.map((m, idx) => (
              <div
                key={idx}
                className="p-6 rounded-3xl bg-[#f0f4f8] border border-primary/10 flex flex-col justify-between hover:border-accent/15 transition-all text-center md:text-left"
              >
                <div className="space-y-5">
                  <img
                    src={m.avatar}
                    alt={m.name}
                    className="w-20 h-20 rounded-full mx-auto md:mx-0 object-cover border-2 border-accent"
                  />
                  <div className="space-y-1">
                    <h5 className="font-display font-bold text-base text-primary">{m.name}</h5>
                    <p className="text-[10px] text-accent font-semibold uppercase tracking-wider">{m.role}</p>
                    <p className="text-xs text-primary/60 leading-relaxed font-sans pt-2">
                      {m.bio}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Corporate trusted partners */}
        <div className="space-y-8 max-w-5xl mx-auto border-t border-primary/10 pt-16">
          <p className="text-center text-[10px] uppercase text-primary/60 tracking-widest font-bold">
            {currentLanguage === "ar" ? "شراكات معتمدة وموثوقة" : "CERTIFIED AVIATION & HOTEL PARTNERS"}
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 items-center justify-items-center opacity-30">
            {/* Direct stylized logo tags */}
            {["Air Algérie", "Fairmont Luxury", "TLScontact", "Saudia Airlines"].map((partner, idx) => (
              <div key={idx} className="font-display font-black text-sm tracking-widest uppercase">
                {partner}
              </div>
            ))}
          </div>
        </div>

      </section>

    </div>
  );
};
