/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from "react";
import { MagnifyingGlass as Search, Compass, MapPin, Star, Sliders as SlidersHorizontal, Eye, Globe as Globe2, GridFour as Grid, MapTrifold as Map } from "@phosphor-icons/react";
import { useApp, translations, formatPriceString, useNavigateTo } from "../../context/AppContext";
import { destinations } from "../../data/destinations";

export const Destinations: React.FC = () => {
  const { currentLanguage, currentCurrency, favorites, toggleFavorite, setActiveDestinationId, searchFilters, updateSearchFilters } = useApp();
  const navigateTo = useNavigateTo();
  const t = translations[currentLanguage];
  const isRTL = currentLanguage === "ar";

  // Filter local overrides
  const [selectedCategory, setSelectedCategory] = useState<"all" | "local" | "international">(searchFilters.category || "all");
  const [searchTerm, setSearchTerm] = useState(searchFilters.query || "");
  const [priceCap, setPriceCap] = useState(400000); // 400k DA cap
  const [layoutMode, setLayoutMode] = useState<"grid" | "plot">("grid");

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // Filtered list
  const filteredList = useMemo(() => {
    return destinations.filter((dest) => {
      const matchQuery = dest.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         dest.country.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         dest.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchCat = selectedCategory === "all" || dest.category === selectedCategory;
      const matchPrice = dest.priceDZD <= priceCap;
      return matchQuery && matchCat && matchPrice;
    });
  }, [searchTerm, selectedCategory, priceCap]);

  // Divide into pages
  const totalPages = Math.ceil(filteredList.length / itemsPerPage) || 1;
  const paginatedList = useMemo(() => {
    const startIdx = (currentPage - 1) * itemsPerPage;
    return filteredList.slice(startIdx, startIdx + itemsPerPage);
  }, [filteredList, currentPage]);

  const handleResetFilters = () => {
    setSearchTerm("");
    setSelectedCategory("all");
    setPriceCap(400000);
    setCurrentPage(1);
    updateSearchFilters({ query: "", category: "all" });
  };

  return (
    <div className="space-y-16 pb-20 text-white bg-primary-dark font-sans">
      
      {/* Banner Area */}
      <section className="relative h-[40vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-primary-dark/70 z-10" />
        <img
          src="https://images.unsplash.com/photo-1539650116574-8efeb43e2750?auto=format&fit=crop&w=1920&q=80"
          alt="Sahara Sandstorm"
          className="absolute inset-0 w-full h-full object-cover object-center translate-y-[-10%]"
        />
        <div className="relative z-15 text-center px-4 animate-in fade-in slide-in-from-bottom-5 duration-500">
          <span className="text-xs font-bold tracking-[0.25em] text-accent uppercase bg-accent/15 px-3 py-1 rounded-full border border-accent/20">
            {currentLanguage === "ar" ? "كتالوج توريفاي" : "TOURIFY EXPEDITIONS CATALOG"}
          </span>
          <h1 className="font-display font-black text-3xl sm:text-5xl uppercase tracking-wider text-white mt-3">
            {currentLanguage === "ar" ? "الوجهات وباقات النخبة" : "EXCLUSIVE DESTINATIONS DICTIONARY"}
          </h1>
          <p className="text-xs sm:text-sm text-white/70 max-w-2xl mx-auto mt-2">
            {currentLanguage === "ar"
              ? "استكشف وتصفح الباقات الفيروزية المصممة للراحة المطلقة والخصوصية، من رمال ورسومات الصحراء إلى أفخم مدن البوسفور"
              : "Discover vacation guides customized for absolute recreation, spanning local dune deserts to European rivers"}
          </p>
        </div>
      </section>

      {/* Filter and Content section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Horizontal filter options */}
        <div className="p-6 rounded-3xl bg-primary border border-white/5 space-y-6 shadow-xl">
          <div className="flex items-center gap-2 text-accent text-xs font-bold uppercase tracking-widest border-b border-white/5 pb-3">
            <SlidersHorizontal size={16} weight="thin" />
            <span>{currentLanguage === "ar" ? "نظام تصفية متقدم" : "FILTER ENGINE"}</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            
            {/* Input keywords search */}
            <div className="space-y-1.5 text-left">
              <label className="text-[10px] font-bold uppercase tracking-wider text-white/40">{currentLanguage === "ar" ? "الكلمات الدلالية" : "Search Keyword"}</label>
              <div className="flex items-center gap-2 bg-primary-dark px-3 py-2.5 rounded-xl border border-white/5">
                <Search size={14} className="text-accent shrink-0" weight="thin" />
                <input
                  id="filter-search-term"
                  type="text"
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setCurrentPage(1);
                  }}
                  placeholder="e.g. Turkey, Djanet, Rome..."
                  className="bg-transparent text-xs w-full text-white outline-none"
                />
              </div>
            </div>

            {/* Dropdown Category select */}
            <div className="space-y-1.5 text-left">
              <label className="text-[10px] font-bold uppercase tracking-wider text-white/40">{t.categoryLabel}</label>
              <select
                id="filter-category"
                value={selectedCategory}
                onChange={(e) => {
                  setSelectedCategory(e.target.value as any);
                  setCurrentPage(1);
                }}
                className="w-full bg-primary-dark text-xs text-white rounded-xl border border-white/5 p-3.5 focus:outline-none focus:ring-1 focus:ring-focus cursor-pointer font-semibold uppercase tracking-wide"
              >
                <option value="all">{t.all}</option>
                <option value="local">{t.local}</option>
                <option value="international">{t.international}</option>
              </select>
            </div>

            {/* Slider Price range */}
            <div className="space-y-1.5 text-left">
              <div className="flex justify-between text-[10px] font-bold uppercase tracking-wider text-white/40">
                <span>{t.priceRangeLabel}</span>
                <span className="text-accent font-sans font-black">{formatPriceString(priceCap, currentCurrency, currentLanguage)}</span>
              </div>
              <div className="pt-2">
                <input
                  id="filter-price-cap"
                  type="range"
                  min="40000"
                  max="400000"
                  step="5000"
                  value={priceCap}
                  onChange={(e) => {
                    setPriceCap(Number(e.target.value));
                    setCurrentPage(1);
                  }}
                  className="w-full accent-accent bg-primary-dark rounded-lg cursor-pointer h-1.5"
                />
                <div className="flex justify-between text-[9px] text-white/30 font-mono mt-1">
                  <span>40,000 DA</span>
                  <span>400,000 DA</span>
                </div>
              </div>
            </div>

            {/* Controls actions reset & Layout togglers */}
            <div className="flex md:flex-col lg:flex-row gap-3 items-end justify-between">
              
              {/* Reset trigger */}
              <button
                id="filter-reset-btn"
                onClick={handleResetFilters}
                className="w-full py-3 px-4 rounded-xl text-center border border-white/10 hover:border-white/35 text-xs text-white bg-transparent transition-all cursor-pointer font-bold uppercase tracking-wider"
              >
                {currentLanguage === "ar" ? "إعادة الضبط" : "Reset System"}
              </button>

              {/* Layout controllers */}
              <div className="flex bg-primary-dark border border-white/5 rounded-xl p-1 shrink-0 h-11 items-center justify-center">
                <button
                  id="layout-toggle-grid"
                  onClick={() => setLayoutMode("grid")}
                  className={`p-2 rounded-lg transition-all cursor-pointer ${
                    layoutMode === "grid" ? "bg-accent text-white" : "text-white/40 hover:text-white"
                  }`}
                  title="Grid visual"
                >
                  <Grid size={15} weight="thin" />
                </button>
                <button
                  id="layout-toggle-plot"
                  onClick={() => setLayoutMode("plot")}
                  className={`p-2 rounded-lg transition-all cursor-pointer ${
                    layoutMode === "plot" ? "bg-accent text-white" : "text-white/40 hover:text-white"
                  }`}
                  title="Plot coordinates visual"
                >
                  <Map size={15} weight="thin" />
                </button>
              </div>

            </div>

          </div>
        </div>

        {layoutMode === "grid" ? (
          /* Grid Card Layout List */
          <div className="space-y-12 animate-in fade-in duration-300">
            {paginatedList.length === 0 ? (
              <div className="text-center py-20 bg-primary rounded-3xl border border-white/5 space-y-4">
                <Compass className="text-white/20 mx-auto animate-pulse" size={50} weight="thin" />
                <h3 className="font-display font-bold text-lg uppercase text-white tracking-wide">
                  {currentLanguage === "ar" ? "عفواً، لا توجد نتائج مطابقة" : "NO MATCHING TOURS DETECTED"}
                </h3>
                <p className="text-xs text-white/50 max-w-sm mx-auto">
                  {currentLanguage === "ar"
                    ? "يرجى تعديل محفزات البحث وتحديد أسعار أكبر أو التواصل مع مستشارك الخاص عبر واتساب."
                    : "Try adjusting sliders, clearing keyword queries, or chat directly with concierge for custom reservations."}
                </p>
                <button
                  id="no-match-reset"
                  onClick={handleResetFilters}
                  className="px-6 py-2.5 rounded-xl bg-accent text-white text-xs font-bold uppercase transition-transform"
                >
                  {currentLanguage === "ar" ? "عرض جميع الإجازات" : "View Entire Catalog"}
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {paginatedList.map((dest) => {
                  const isFav = favorites.includes(dest.id);
                  return (
                    <div
                      key={dest.id}
                      className="group relative rounded-3xl overflow-hidden bg-primary shadow-xl border border-white/5 flex flex-col hover:scale-[1.02] hover:-translate-y-1 transition-all duration-350"
                    >
                      {/* Product image */}
                      <div className="relative h-64 overflow-hidden">
                        <img
                          src={dest.image}
                          alt={dest.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <span className="absolute top-4 left-4 bg-primary-dark/80 backdrop-blur-sm text-white text-[10px] font-bold uppercase px-3 py-1.5 rounded-full border border-white/10 z-10">
                          {dest.category === "local" ? t.local : t.international}
                        </span>
                        
                        {/* Bookmark action triggers */}
                      </div>

                      {/* Info block */}
                      <div className={`p-6 space-y-4 flex-1 flex flex-col justify-between ${isRTL ? "text-right" : "text-left"}`}>
                        <div className="space-y-2">
                          <div className="flex items-center gap-1 text-accent text-xs font-semibold">
                            <Star size={14} className="fill-accent text-accent" weight="thin" />
                            <span>{dest.rating}</span>
                            <span className="text-white/45 font-normal">({dest.reviewsCount} {currentLanguage === "ar" ? "مراجعة" : "reviews"})</span>
                          </div>

                          <h3 className="font-display font-bold text-xl uppercase text-white tracking-wide group-hover:text-accent transition-colors line-clamp-1">
                            {dest.name}
                          </h3>
                          
                          <div className="flex items-center gap-1.5 text-xs text-white/55">
                            <MapPin size={13} className="text-accent" weight="thin" />
                            <span className="truncate">{dest.country}</span>
                          </div>
                        </div>

                        {/* Description excerpt */}
                        <p className="text-xs text-white/60 leading-relaxed font-sans line-clamp-2">
                          {dest.description}
                        </p>

                        <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                          <div>
                            <p className="text-[10px] uppercase text-white/40 font-bold">{t.durationLabel}</p>
                            <p className="text-xs font-semibold text-white">{dest.duration}</p>
                          </div>

                          <div className={`${isRTL ? "text-left" : "text-right"}`}>
                            <p className="text-[10px] uppercase text-white/40 font-bold">
                              {currentLanguage === "ar" ? "تبدأ من" : "Starting price"}
                            </p>
                            <p className="text-base font-black text-accent font-sans">
                              {formatPriceString(dest.priceDZD, currentCurrency, currentLanguage)}
                            </p>
                          </div>
                        </div>

                        {/* CTA views */}
                        <button
                          id={`explore-dest-card-${dest.id}`}
                          onClick={() => {
                            setActiveDestinationId(dest.id);
                            navigateTo("destination-details", dest.id);
                          }}
                          className="w-full mt-2 py-3 bg-white/5 hover:bg-accent text-white hover:text-white border border-white/10 hover:border-transparent rounded-2xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer flex items-center justify-center gap-1"
                        >
                          <span>{t.exploreDetail}</span>
                          <Eye size={14} weight="thin" />
                        </button>
                      </div>

                    </div>
                  );
                })}
              </div>
            )}

            {/* Pagination numbers */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 pt-6">
                {[...Array(totalPages)].map((_, index) => {
                  const pageNum = index + 1;
                  return (
                    <button
                      id={`page-btn-${pageNum}`}
                      key={pageNum}
                      onClick={() => {
                        setCurrentPage(pageNum);
                        window.scrollTo({ top: 300, behavior: "smooth" });
                      }}
                      className={`w-9 h-9 rounded-full text-xs font-semibold transition-all cursor-pointer flex items-center justify-center ${
                        currentPage === pageNum ? "bg-accent text-white font-bold" : "bg-primary text-white/70 hover:bg-white/10"
                      }`}
                    >
                      {pageNum}
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        ) : (
          /* Plot Visual Representation (Architectural Honesty Directive) */
          <div className="animate-in zoom-in-95 duration-200 p-8 rounded-3xl bg-primary border border-white/5 space-y-8 shadow-xl text-center">
            <Globe2 className="text-accent mx-auto animate-spin-slow" size={48} weight="thin" />
            <div className="space-y-2">
              <h3 className="font-display font-bold text-xl uppercase tracking-wider">{currentLanguage === "ar" ? "منظومة إحداثيات السفر الملكي" : "TOURIFY SEAMLESS COORDINATES MAP"}</h3>
              <p className="text-xs text-white/50 max-w-md mx-auto">
                {currentLanguage === "ar"
                  ? "نقاط تصفية إخبارية تعود للجزائر العاصمة لربط مسارات السفر الفاخرة بشكل مباشر."
                  : "Graphic depiction showing geographic locations of current premium itineraries."}
              </p>
            </div>

            {/* Stylized Node Coordinates Table */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
              {filteredList.map((dest) => (
                <div
                  id={`map-node-${dest.id}`}
                  key={dest.id}
                  onClick={() => {
                    setActiveDestinationId(dest.id);
                    navigateTo("destination-details", dest.id);
                  }}
                  className="p-4 rounded-2xl bg-primary-dark/65 hover:bg-primary-dark border border-white/5 hover:border-accent/40 text-left transition-all cursor-pointer group space-y-2"
                >
                  <div className="flex justify-between items-center">
                    <span className="px-2 py-0.5 rounded-md bg-accent/15 text-accent text-[9px] font-bold uppercase tracking-wide">
                      {dest.category}
                    </span>
                    <Star size={12} className="text-accent fill-accent" weight="thin" />
                  </div>
                  <h5 className="font-display font-semibold text-sm line-clamp-1 group-hover:text-accent transition-colors">
                    {dest.name}
                  </h5>
                  <p className="text-[10px] text-white/40 font-mono flex items-center gap-1">
                    <MapPin size={10} className="text-accent" weight="thin" /> {dest.country}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

      </section>

    </div>
  );
};
