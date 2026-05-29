/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { Compass, Envelope as Mail, Phone, MapPin, ShieldCheck, CheckCircle as CheckCircle2, Headphones, PaperPlaneRight as Send } from "@phosphor-icons/react";
import { useApp, translations } from "../../context/AppContext";

export const Contact: React.FC = () => {
  const { currentLanguage } = useApp();
  const t = translations[currentLanguage];
  const isRTL = currentLanguage === "ar";

  // Form local state
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [topic, setTopic] = useState("Desert Expedition");
  const [message, setMessage] = useState("");
  const [formSuccess, setFormSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !email) return;

    setFormSuccess(true);
    setFullName("");
    setEmail("");
    setPhone("");
    setMessage("");
  };

  const topicsList = [
    { value: "Desert Expedition", label: currentLanguage === "ar" ? "رحلات الصحراء (جانت والجنوب)" : "Desert & Saharan Expeditions" },
    { value: "Schengen Visa", label: currentLanguage === "ar" ? "استشارات مواعيد الفيزا والترجمة" : "Schengen Visa & TLS contact" },
    { value: "Mecca Umrah", label: currentLanguage === "ar" ? "باقات العمرة الراقية" : "Mecca & Medina Elite Umrah" },
    { value: "Hotel & Flights", label: currentLanguage === "ar" ? "حجوزات طيران مخصصة وفنادق" : "Exclusive Hotels & Flight Customization" }
  ];

  return (
    <div className="space-y-16 pb-20 text-primary bg-white font-sans text-left">

      {/* Banner Space */}
      <section className="relative h-[55vh] flex items-center justify-center overflow-hidden">
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t h-full from-white via-white/95 to-white/0 z-10" />
        <img
          src="https://images.unsplash.com/photo-1598424233772-e144d183ad8c?auto=format&fit=crop&w=1920&q=80"
          alt="Contact us banner"
          className="absolute inset-0 w-full h-full object-cover object-center translate-y-[-10%]"
        />
        <div className="relative z-15 text-center px-4 animate-in fade-in slide-in-from-bottom-5 duration-500">
          <span className="text-xs font-bold tracking-[0.25em] text-accent uppercase bg-accent/15 px-3 py-1 rounded-full border border-accent/20">
            {currentLanguage === "ar" ? "قنوات الاتصال بتوريفاي" : "TOURIFY HOTLINES"}
          </span>
          <h1 className="font-display font-black text-3xl sm:text-5xl uppercase tracking-wider text-primary mt-3">
            {currentLanguage === "ar" ? "تحدث مع مستشار السفر الخاص بك" : "CONTACT OUR CONCIERGE TEAM"}
          </h1>
          <p className="text-xs sm:text-sm text-primary/60 max-w-2xl mx-auto mt-2 text-center">
            {currentLanguage === "ar"
              ? "نحن متصلون لمساعدتكم وصياغة برامج سفر وحجوزات ممتازة ومواعيد البصمات على مدار الساعة"
              : "Our Algiers advisors coordinate flight ticketing, visa appointments and custom schedules round the clock"}
          </p>
        </div>
      </section>

      {/* Main Grid: Info Cards versus Feedback Form */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">

          {/* Left Columns (Contact blocks / Coordinates Map) */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <span className="h-0.5 w-8 bg-accent" />
                <span className="text-xs font-bold text-accent uppercase tracking-widest">{currentLanguage === "ar" ? "معلومات التواصل" : "HOTLINES DIRECTORY"}</span>
              </div>
              <h2 className="font-display font-black text-2xl sm:text-3xl uppercase">
                {currentLanguage === "ar" ? "نحن بانتظارك في قلب الجزائر العاصمة" : "HEADQUARTERS & TELEPHONE HUB"}
              </h2>
              <p className="text-xs sm:text-sm text-primary/60 leading-relaxed font-sans font-medium">
                {currentLanguage === "ar"
                  ? "تفضل بزيارة وكالتنا للحصول على فنجان قهوة ومراجعة مستندات التأشيرة وجداول السفر الفاخرة رفقة الخبراء."
                  : "Drop by our physical office in Boulevard Mohamed V to review bank statements, lock airline classes or drink authentic espresso."}
              </p>
            </div>

            {/* Dialers block lists */}
            <div className="space-y-4 text-xs font-semibold text-primary/60">

              {/* Address */}
              <div className="flex items-start gap-4 p-4 rounded-2xl bg-[#f0f4f8] border border-primary/10 shadow-md">
                <MapPin className="text-accent shrink-0 mt-0.5" size={20} weight="thin" />
                <div className="space-y-1">
                  <span className="block text-[10px] text-primary/60 font-bold uppercase">{currentLanguage === "ar" ? "العنوان البريدى" : "Physical Address"}</span>
                  <p className="text-primary-80 font-sans">{t.addressVal}</p>
                </div>
              </div>

              {/* Telephone */}
              <div className="flex items-start gap-4 p-4 rounded-2xl bg-[#f0f4f8] border border-primary/10 shadow-md">
                <Phone className="text-accent shrink-0 mt-0.5" size={20} weight="thin" />
                <div className="space-y-1">
                  <span className="block text-[10px] text-primary/60 font-bold uppercase">{currentLanguage === "ar" ? "الهواتف الساخنة" : "Telephone hotlines"}</span>
                  <p className="text-primary-85 font-mono">+213 (0) 21 55 55 55</p>
                  <p className="text-primary-85 font-mono">+213 (0) 555 12 34 56 (WhatsApp Concierge)</p>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-4 p-4 rounded-2xl bg-[#f0f4f8] border border-primary/10 shadow-md">
                <Mail className="text-accent shrink-0 mt-0.5" size={20} weight="thin" />
                <div className="space-y-1">
                  <span className="block text-[10px] text-primary/60 font-bold uppercase">{currentLanguage === "ar" ? "البريد الإلكتروني للإدارة" : "Agency Email Ledger"}</span>
                  <p className="text-primary-80 font-mono">contact@tourify-luxury.com</p>
                </div>
              </div>

            </div>

            {/* Stylized Node Coordinates Map */}
            <div className="space-y-3 ">
              <div className="relative h-36 rounded-3xl overflow-hidden bg-[#f0f4f8] border border-primary/10 p-4 text-[10px] text-primary/60 font-mono flex flex-col justify-end">
                <div className="absolute top-1/2 left-1/3 -translate-y-1/2 -translate-x-1/2 flex flex-col items-center">
                  <span className="w-4 h-4 rounded-full bg-accent/30 border border-accent animate-ping" />
                  <MapPin size={16} className="text-accent -mt-4 animate-bounce" weight="thin" />
                </div>
                <div className="relative z-10 flex justify-between">
                  <span>LAT: 36.7538° N</span>
                  <span>LON: 3.0588° E</span>
                </div>
              </div>
            </div>

          </div>

          {/* Right Columns (Feedback form with beautiful interactions) */}
          <div className="lg:col-span-1" />
          <div className="lg:col-span-6">
            <div className="p-8 rounded-3xl bg-[#f0f4f8] border border-primary/10 shadow-2xl space-y-6">
              <div className="flex items-center gap-2 text-accent text-xs font-bold uppercase tracking-widest border-b border-primary/10 pb-3">
                <Headphones size={16} weight="thin" />
                <span>{currentLanguage === "ar" ? "نموذج اتصال سريع بالأخصائي" : "SUBMIT CO-ORDINATES DEED"}</span>
              </div>

              {formSuccess ? (
                <div className="p-8 rounded-2xl bg-white/5 border border-green-500/30 text-center space-y-4 animate-in zoom-in-95 duration-200">
                  <div className="w-14 h-14 rounded-full bg-green-500/20 text-green-400 border border-green-500/30 flex items-center justify-center mx-auto">
                    <CheckCircle2 size={30} weight="thin" />
                  </div>
                  <h4 className="font-display font-bold text-sm uppercase text-primary tracking-widest">
                    {currentLanguage === "ar" ? "تم إرسال طلبكم بنجاح" : "CO-ORDINATES RECEIVED"}
                  </h4>
                  <p className="text-xs text-primary/60 leading-relaxed font-sans">
                    {currentLanguage === "ar"
                      ? "أهلاً بك عميلنا العزيز. لقد استلمنا إشاراتك الفاخرة وسيقوم منسق السفر بتسيير اتصال مباشر معك عبر هاتف الاتصال/واتساب المسجل خلال 30 دقيقة."
                      : "Thank you. We have cataloged your interest. A Tourify concierge advisor will engage back with your specified coordinates within 30 minutes."}
                  </p>
                  <button
                    id="contact-confirm-reset"
                    onClick={() => setFormSuccess(false)}
                    className="py-2.5 px-6 rounded-xl bg-accent text-white text-xs font-bold uppercase cursor-pointer"
                  >
                    {currentLanguage === "ar" ? "إرسال رسالة أخرى" : "Write Another Inquiry"}
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className={`space-y-4 ${isRTL ? "text-right" : "text-left"}`}>

                  {/* Full Name */}
                  <div>
                    <label className="block text-[10px] text-primary/60 mb-1.5 font-bold uppercase">
                      {currentLanguage === "ar" ? "الاسم الكامل" : "Full Name"} *
                    </label>
                    <input
                      id="contact-fullname"
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="e.g. Seif Islem Benrabah"
                      className="w-full rounded-xl bg-white border border-primary/10 px-4 py-3 text-xs text-primary focus:outline-none focus:ring-1 focus:ring-accent"
                    />
                  </div>

                  {/* Mail and phone grids */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] text-primary/60 mb-1.5 font-bold uppercase">
                        {currentLanguage === "ar" ? "البريد الإلكتروني" : "Email Address"} *
                      </label>
                      <input
                        id="contact-email"
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="e.g. guest@tourify-luxury.com"
                        className="w-full rounded-xl bg-white border border-primary/10 px-4 py-3 text-xs text-primary focus:outline-none focus:ring-1 focus:ring-accent"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] text-primary/60 mb-1.5 font-bold uppercase">
                        {currentLanguage === "ar" ? "رقم الهاتف / واتساب" : "WhatsApp / Mobile Phone"}
                      </label>
                      <input
                        id="contact-phone"
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="e.g. +213 550 123 456"
                        className="w-full rounded-xl bg-white border border-primary/10 px-4 py-3 text-xs text-primary focus:outline-none focus:ring-1 focus:ring-accent"
                      />
                    </div>
                  </div>

                  {/* Topic Select select */}
                  <div>
                    <label className="block text-[10px] text-primary/60 mb-1.5 font-bold uppercase">
                      {currentLanguage === "ar" ? "تصنيف الاستفسار المطلوب" : "Inquiry Category"}
                    </label>
                    <select
                      id="contact-topic-select"
                      value={topic}
                      onChange={(e) => setTopic(e.target.value)}
                      className="w-full bg-white text-xs text-primary rounded-xl border border-primary/10 p-3.5 focus:outline-none cursor-pointer font-semibold"
                    >
                      {topicsList.map((tp) => (
                        <option key={tp.value} value={tp.value} className="bg-[#11354E] text-primary">
                          {tp.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Message message box */}
                  <div>
                    <label className="block text-[10px] text-primary/60 mb-1.5 font-bold uppercase">
                      {currentLanguage === "ar" ? "تفاصيل طلبك الفاخر" : "Describe your dream schedule"}
                    </label>
                    <textarea
                      id="contact-message-text"
                      rows={5}
                      required
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="e.g. I am looking to schedule a 14-day VIP family Umrah package..."
                      className="w-full rounded-xl bg-white border border-primary/10 px-4 py-3 text-xs text-primary focus:outline-none focus:ring-1 focus:ring-accent"
                    />
                  </div>

                  {/* Submit CTA */}
                  <button
                    id="contact-form-btn-submit"
                    type="submit"
                    className="w-full h-12 rounded-2xl bg-accent-white text-xs font-bold uppercase tracking-widest transition-all shadow-lg shadow-accent/20 cursor-pointer flex items-center justify-center gap-2"
                  >
                    <span>{currentLanguage === "ar" ? "اتصل بمستشار السفر" : "Transmit Inquiry Deed"}</span>
                    <Send size={14} weight="thin" />
                  </button>

                  <div className="flex gap-2 p-3.5 rounded-xl bg-white/5 border border-primary/10 items-start text-[10px] text-primary/60">
                    <ShieldCheck size={14} className="text-accent shrink-0 mt-0.5" weight="thin" />
                    <p className="leading-tight font-sans text-left">
                      {currentLanguage === "ar"
                        ? "بياناتك مؤمنة بسرية مطلقة وفق لائحة التشفير ومحمية بمجلس نوميديا للسرية المتبادلة واللوائح الدولية."
                        : "Your privacy is rigidly respected. We never distribute corporate files or coordinates to third parties."}
                    </p>
                  </div>

                </form>
              )}

            </div>
          </div>

        </div>
      </section>

    </div>
  );
};
