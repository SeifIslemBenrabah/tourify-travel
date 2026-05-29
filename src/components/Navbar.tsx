/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Compass, Globe, List, X } from "@phosphor-icons/react";
import { useApp, translations } from "../context/AppContext";
import logo from "../../assets/Logo.svg";
export const Navbar: React.FC = () => {
  const {
    currentLanguage,
    currentCurrency,
    favorites,
    userSession,
    setLanguage,
    setCurrency
  } = useApp();

  const navigate = useNavigate();
  const location = useLocation();
  const activePath = location.pathname;

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAccountOpen, setIsAccountOpen] = useState(false);
  const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false);
  const [isCurrDropdownOpen, setIsCurrDropdownOpen] = useState(false);

  const t = translations[currentLanguage];
  const isRTL = currentLanguage === "ar";

  const navLinks = [
    { key: "home", path: "/", label: t.home },
    { key: "destinations", path: "/destinations", label: t.destinations },
    { key: "offers", path: "/offers", label: t.offers },
    { key: "services", path: "/services", label: t.services },
    { key: "contact", path: "/contact", label: t.contact }
  ];

  return (
    <>
      <header className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-11/12 max-w-7xl bg-primary/95 backdrop-blur-md border border-primary/20 rounded-full text-white shadow-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between">

          {/* Brand Logo - Styled strictly matching the luxury vibe */}
          <button
            id="nav-logo"
            onClick={() => { navigate("/"); window.scrollTo({ top: 0, behavior: "smooth" }); }}
            className="flex items-center gap-2 text-white font-display font-black text-2xl tracking-wider uppercase focus:outline-none cursor-pointer group"
          >
            <img src={logo} alt="logo" className="w-14 h-14" />
          </button>

          {/* Desktop Core Navigation Links */}
          <nav className="hidden lg:flex items-center gap-6">
            {navLinks.map((link) => {
              const active = activePath === link.path || (link.key === "destinations" && activePath.startsWith("/destinations/"));
              return (
                <button
                  id={`nav-link-${link.key}`}
                  key={link.key}
                  onClick={() => { navigate(link.path); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                  className={`relative text-xs font-semibold uppercase tracking-wider transition-colors py-2 cursor-pointer ${active ? "text-accent" : "text-white hover:text-white/70"
                    }`}
                >
                  {link.label}
                  {active && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent animate-in fade-in zoom-in-50 duration-200" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Controls Hub (Languages, Currencies, Favorites, Profile) */}
          <div className="hidden lg:flex items-center gap-4">

            {/* Language Switcher Dropdown */}
            <div className="relative">
              <button
                id="btn-lang-toggle"
                onClick={() => {
                  setIsLangDropdownOpen(!isLangDropdownOpen);
                  setIsCurrDropdownOpen(false);
                }}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-semibold cursor-pointer border border-primary/10"
              >
                <Globe size={14} className="text-accent" weight="thin" />
                <span className="uppercase">{currentLanguage}</span>
              </button>
              {isLangDropdownOpen && (
                <div className="absolute right-0 mt-2 w-32 rounded-xl bg-white border border-primary/10 shadow-xl overflow-hidden animate-in fade-in-50 slide-in-from-top-2 duration-150">
                  <button
                    id="lang-opt-en"
                    onClick={() => {
                      setLanguage("en");
                      setIsLangDropdownOpen(false);
                    }}
                    className="w-full text-left px-4 py-2 hover:bg-white/5 text-xs font-semibold block transition-colors"
                  >
                    English
                  </button>
                  <button
                    id="lang-opt-fr"
                    onClick={() => {
                      setLanguage("fr");
                      setIsLangDropdownOpen(false);
                    }}
                    className="w-full text-left px-4 py-2 hover:bg-white/5 text-xs font-semibold block transition-colors"
                  >
                    Français
                  </button>
                  <button
                    id="lang-opt-ar"
                    onClick={() => {
                      setLanguage("ar");
                      setIsLangDropdownOpen(false);
                    }}
                    className="w-full text-left px-4 py-2 hover:bg-white/5 text-xs font-semibold block transition-colors"
                  >
                    العربية
                  </button>
                </div>
              )}
            </div>

          </div>

          {/* Mobile Menu Action Toggle Button */}
          <div className="flex items-center gap-3 lg:hidden">
            <button
              id="mobile-menu-toggle"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 bg-white/5 rounded-xl hover:bg-white/10 text-primary/60 border border-primary/10 cursor-pointer"
            >
              {isMobileMenuOpen ? <X size={22} weight="thin" /> : <List size={22} weight="thin" />}
            </button>
          </div>

        </div>

        {/* Mobile menu collapsible */}
        {isMobileMenuOpen && (
          <div className="lg:hidden bg-[#11354E] border-t border-primary/10 animate-in slide-in-from-top duration-200">
            <div className="p-4 space-y-3">
              {navLinks.map((link) => (
                <button
                  id={`mob-link-${link.key}`}
                  key={link.key}
                  onClick={() => {
                    navigate(link.path);
                    window.scrollTo({ top: 0, behavior: "smooth" });
                    setIsMobileMenuOpen(false);
                  }}
                  className={`w-full text-left text-sm font-semibold uppercase tracking-wider py-2.5 px-3 rounded-lg transition-colors block ${activePath === link.path ? "bg-accent-white/ hover:bg-white/5 hover:text-primary"
                    : ""}`}
                >
                  {link.label}
                </button>
              ))}

              <div className="pt-3 border-t border-primary/10">

                {/* Languages selectors */}
                <div className="space-y-1">
                  <span className="text-[10px] text-primary/60 font-semibold uppercase tracking-wider">Language</span>
                  <div className="flex gap-1.5 max-w-xs">
                    {["en", "fr", "ar"].map((lang) => (
                      <button
                        id={`mob-lang-${lang}`}
                        key={lang}
                        onClick={() => setLanguage(lang as any)}
                        className={`flex-1 py-2 px-1 rounded-md text-center text-xs font-bold uppercase cursor-pointer ${currentLanguage === lang ? "bg-accent-white/"
                          : ""}`}
                      >
                        {lang}
                      </button>
                    ))}
                  </div>
                </div>

              </div>

            </div>
          </div>
        )}
      </header>

      {/* Account Dialog Integration */}
    </>
  );
};
