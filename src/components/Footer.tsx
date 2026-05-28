/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { Compass, Envelope as EnvelopeSimple, Phone, MapPin, InstagramLogo, FacebookLogo, ShieldWarning, CheckCircle } from "@phosphor-icons/react";
import { useApp, translations, useNavigateTo } from "../context/AppContext";
import logo from "../../assets/Logo.svg";
export const Footer: React.FC = () => {
  const { currentLanguage } = useApp();
  const navigateTo = useNavigateTo();
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);

  const t = translations[currentLanguage];
  const isRTL = currentLanguage === "ar";

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail.trim()) return;
    setIsSubscribed(true);
    setNewsletterEmail("");
  };

  return (
    <footer className="bg-primary border-t border-white/5 text-white">
      {/* Newsletter Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 border-b border-white/10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className={`max-w-2xl ${isRTL ? "text-right" : "text-left"}`}>
            <h4 className="font-display font-black text-2xl tracking-wide uppercase text-white">
              {t.newsLetterTitle}
            </h4>
            <p className="text-white/60 text-sm mt-1">
              {t.newsLetterSub}
            </p>
          </div>

          <div className="w-full lg:w-auto lg:min-w-[420px]">
            {isSubscribed ? (
              <div className="flex items-center gap-3 p-4 rounded-2xl bg-white/5 border border-green-500/30 text-green-400 text-sm animate-in zoom-in-95 duration-200">
                <CheckCircle size={20} className="shrink-0" weight="thin" />
                <span>
                  {currentLanguage === "ar"
                    ? "ألف مبروك! لقد انضممت لشبكة النخبة بنجاح."
                    : currentLanguage === "fr"
                      ? "Félicitations ! Vous avez rejoint notre cercle d'élite."
                      : "Congratulations! You have been enrolled in our VIP list."}
                </span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2">
                <input
                  id="email-newsletter"
                  type="email"
                  required
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder={t.newsLetterInput}
                  className={`flex-1 min-h-[48px] rounded-xl bg-white/5 border border-white/10 px-4 py-2 text-sm text-white focus:outline-none focus:ring-1 focus:ring-accent ${isRTL ? "text-right" : "text-left"
                    }`}
                />
                <button
                  id="btn-subscribe-footer"
                  type="submit"
                  className="rounded-xl bg-accent hover:bg-accent-hover text-white text-xs font-bold uppercase tracking-wider px-6 py-3 sm:py-0 transition-colors shadow-lg shadow-accent/20 cursor-pointer w-full sm:w-auto"
                >
                  {t.subscribeButton}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Main Quad Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">

        {/* Info Column */}
        <div className={`flex flex-col ${isRTL ? "text-right items-end" : "text-left items-start"}`}>
          <div className={`flex items-center font-display font-black text-xl tracking-wider ${isRTL ? "w-full justify-end" : "w-full justify-start"}`}>
            <img src={logo} alt="logo" className="w-20 h-20 cursor-pointer" onClick={() => navigateTo("home")} />
          </div>
          <p className="text-xs text-white/60 leading-relaxed font-sans">
            {t.footerInfo}
          </p>
          <div className={`flex gap-3 pt-2 ${isRTL ? "w-full justify-end" : "w-full justify-start"}`}>
            <a
              id="social-ig-link"
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-xl bg-white/5 hover:bg-white/10 flex items-center justify-center text-white/80 hover:text-white transition-all border border-white/5"
            >
              <InstagramLogo size={18} weight="thin" />
            </a>
            <a
              id="social-fb-link"
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-xl bg-white/5 hover:bg-white/10 flex items-center justify-center text-white/80 hover:text-white transition-all border border-white/5"
            >
              <FacebookLogo size={18} weight="thin" />
            </a>
          </div>
        </div>

        {/* Quick Links Column */}
        <div className={`space-y-4 ${isRTL ? "text-right" : "text-left"}`}>
          <h5 className="font-display font-bold text-sm uppercase tracking-widest text-[#FFFFFF]/90">
            {t.quickLinks}
          </h5>
          <ul className="space-y-2 text-xs font-semibold text-white/70">
            {["home", "destinations", "offers", "services", "about", "contact"].map((page) => (
              <li key={page}>
                <button
                  id={`footer-nav-${page}`}
                  onClick={() => navigateTo(page as any)}
                  className="hover:text-accent capitalize text-left cursor-pointer transition-colors"
                >
                  {page.replace("-", " ")}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact info column */}
        <div className={`space-y-4 ${isRTL ? "text-right" : "text-left"}`}>
          <h5 className="font-display font-bold text-sm uppercase tracking-widest text-[#FFFFFF]/90">
            {t.contactInfo}
          </h5>
          <ul className="space-y-3.5 text-xs text-white/75">
            <li className="flex items-start gap-2.5">
              <MapPin size={16} className="text-accent shrink-0 mt-0.5" weight="thin" />
              <span>{t.addressVal}</span>
            </li>
            <li className="flex items-center gap-2.5">
              <Phone size={16} className="text-accent shrink-0" weight="thin" />
              <span>+213 (0) 21 55 55 55</span>
            </li>
            <li className="flex items-center gap-2.5">
              <Phone size={16} className="text-accent shrink-0" weight="thin" />
              <span>+213 (0) 555 12 34 56 (WhatsApp)</span>
            </li>
            <li className="flex items-center gap-2.5">
              <EnvelopeSimple size={16} className="text-accent shrink-0" weight="thin" />
              <span>contact@tourify.com</span>
            </li>
          </ul>
        </div>

        {/* Custom Visual Luxury Map Graphic (Architectural Honesty directive) */}
        <div className={`space-y-4 ${isRTL ? "text-right" : "text-left"}`}>
          <h5 className="font-display font-bold text-sm uppercase tracking-widest text-[#FFFFFF]/90">
            {currentLanguage === "ar" ? "مقر الوكالة - الجزائر العاصمة" : "HQ Location - Algiers Bay"}
          </h5>

          <div className="relative h-32 rounded-2xl overflow-hidden bg-primary-dark border border-white/10 flex flex-col justify-end p-3 text-[10px] text-white/40 font-mono">
            {/* Grid Line Visuals */}
            <div className="absolute inset-0 bg-radial-gradient opacity-10 pointer-events-none" />
            <div className="absolute inset-0 flex flex-col justify-between p-1 opacity-25">
              <div className="border-b border-white/10 w-full" />
              <div className="border-b border-white/10 w-full" />
              <div className="border-b border-white/10 w-full" />
            </div>
            {/* Map Plot Visual representation */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
              <span className="w-5 h-5 bg-accent/20 border border-accent rounded-full flex items-center justify-center animate-ping" />
              <MapPin size={16} className="text-accent -mt-5" weight="thin" />
            </div>

            <div className="relative z-10 flex justify-between">
              <span>LAT: 36.7538° N</span>
              <span>LON: 3.0588° E</span>
            </div>
          </div>


        </div>

      </div>

      {/* Underbar Copyright */}
      <div className="bg-primary-dark py-6 border-t border-white/5 text-center text-[11px] text-white/45">
        <p>© 2026 {currentLanguage === "ar" ? "توريفاي" : "Tourify"}. {currentLanguage === "ar" ? "جميع الحقوق محفوظة." : "All rights reserved."} Licence N° 1629/S.</p>
      </div>
    </footer>
  );
};
