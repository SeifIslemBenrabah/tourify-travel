/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { BookingRecord, SearchFilters, UserSession, ChatMessage } from "../types";

// Translation dictionary for core UI elements
export const translations = {
  en: {
    brandName: "Tourify",
    tagline: "Unveiling Ancient Horizons and Modern Escapes",
    home: "Home",
    destinations: "Destinations",
    offers: "Special Offers",
    services: "Services",
    about: "About Us",
    blog: "Blog",
    contact: "Contact",
    bookNow: "Book Now",
    exploreDetail: "Explore Details",
    searchPlaceholder: "Search destinations, countries...",
    searchButton: "Find Holidays",
    categoryLabel: "Category",
    all: "All Destinations",
    local: "Local Tourism (Algeria)",
    international: "International Tours",
    priceRangeLabel: "Max Price",
    durationLabel: "Duration",
    favoritesTitle: "My Favorites",
    savedTripsTitle: "My Bookings",
    loginButton: "Sign In",
    logoutButton: "Sign Out",
    registerTitle: "Register Premium Account",
    usernameLabel: "Username",
    emailLabel: "Email Address",
    fullNameLabel: "Full Name",
    phoneLabel: "Phone Number (WhatsApp)",
    whyChooseUsTitle: "Why Elite Travelers Choose Us",
    popularDestTitle: "Most Celebrated Escapes",
    popularDestSub: "Our handpicked catalog of ultra-premium local and worldwide travel packages",
    servicesTitle: "Bespoke Travel Services",
    servicesSub: "At Tourify, we craft complete white-glove itineraries tailored for your peace of mind",
    specialOffersTitle: "Imminent Seasonal Escapes",
    specialOffersSub: "Time-limited elite promotions featuring bespoke travel schedules, luxury suites, and flights",
    countdownPromo: "Offer ends in:",
    hours: "h",
    minutes: "m",
    galleryTitle: "Through The Traveler's Lens",
    gallerySub: "Immersive snapshots of worldwide wonders captured by our clients",
    faqTitle: "Frequently Asked Questions",
    newsLetterTitle: "Join the Collector's Circle",
    newsLetterSub: "Receive exclusive notifications about unpublicized travel dates, VIP flights, and select deals.",
    newsLetterInput: "Enter your elegant email...",
    subscribeButton: "Subscribe",
    footerInfo: "Your premium gateway to unforgettable travel experiences.",
    quickLinks: "Quick Navigation",
    contactInfo: "Get In Touch",
    addressVal: "08, Boulevard Pont de Constantine, Algiers, Algeria",
    secSecure: "Secure Bookings",
    secSecureSub: "All tickets are protected with 256-bit AES encryption.",
    currency: "Currency",
    language: "Language",
    reviewsLabel: "Client Testimonials"
  },
  fr: {
    brandName: "Tourify",
    tagline: "Révéler les Horizons Antiques et les Évasions Modernes",
    home: "Accueil",
    destinations: "Destinations",
    offers: "Offres Spéciales",
    services: "Services",
    about: "À Propos",
    blog: "Blog",
    contact: "Contact",
    bookNow: "Réserver",
    exploreDetail: "Explorer les Détails",
    searchPlaceholder: "Rechercher des destinations, pays...",
    searchButton: "Trouver des Vacances",
    categoryLabel: "Catégorie",
    all: "Toutes les Destinations",
    local: "Tourisme National (Algérie)",
    international: "Circuits Internationaux",
    priceRangeLabel: "Prix Max",
    durationLabel: "Durée",
    favoritesTitle: "Mes Favoris",
    savedTripsTitle: "Mes Réservations",
    loginButton: "Connexion",
    logoutButton: "Déconnexion",
    registerTitle: "Créer un Compte Premium",
    usernameLabel: "Nom d'utilisateur",
    emailLabel: "Adresse E-mail",
    fullNameLabel: "Nom Complet",
    phoneLabel: "Numéro de Téléphone (WhatsApp)",
    whyChooseUsTitle: "Pourquoi les Voyageurs d'Élite nous Choisissent",
    popularDestTitle: "Évasions les Plus Célébrées",
    popularDestSub: "Notre catalogue sélectionné de séjours ultra-premium en Algérie et dans le monde",
    servicesTitle: "Services de Voyage Sur-Mesure",
    servicesSub: "Chez Tourify, nous concevons des itinéraires complets clé en main pour votre sérénité",
    specialOffersTitle: "Évasions Saisonnières Imminentes",
    specialOffersSub: "Promotions d'élite à durée limitée offrant vols, suites de luxe et guides inclus",
    countdownPromo: "L'offre se termine dans :",
    hours: "h",
    minutes: "m",
    galleryTitle: "À travers l'Objectif du Voyageur",
    gallerySub: "Instantanés immersifs de merveilles mondiales capturées par nos clients",
    faqTitle: "Questions Fréquentes",
    newsLetterTitle: "Rejoindre le Cercle des Collectionneurs",
    newsLetterSub: "Recevez en priorité les dates de voyage non publiées, les vols privés et les tarifs préférentiels.",
    newsLetterInput: "Entrez votre adresse e-mail...",
    subscribeButton: "S'abonner",
    footerInfo: "Votre passerelle premium vers des voyages inoubliables.",
    quickLinks: "Navigation Rapide",
    contactInfo: "Contactez-nous",
    addressVal: "08, Boulevard Pont de Constantine, Alger, Algérie",
    secSecure: "Réservations Sécurisées",
    secSecureSub: "Toutes les réservations sont cryptées en AES 256 bits.",
    currency: "Devise",
    language: "Langue",
    reviewsLabel: "Avis Clients"
  },
  ar: {
    brandName: "توريفاي",
    tagline: "كشف النقاب عن الآفاق القديمة والرحلات الحديثة",
    home: "الرئيسية",
    destinations: "الوجهات",
    offers: "العروض الخاصة",
    services: "الخدمات",
    about: "من نحن",
    blog: "المدونة",
    contact: "اتصل بنا",
    bookNow: "احجز الآن",
    exploreDetail: "استكشف التفاصيل",
    searchPlaceholder: "ابحث عن وجهات، بلدان...",
    searchButton: "البحث عن رحلات",
    categoryLabel: "التصنيف",
    all: "كل الوجهات",
    local: "السياحة المحلية (الجزائر)",
    international: "الرحلات الدولية",
    priceRangeLabel: "الحد الأقصى للسعر",
    durationLabel: "المدة",
    favoritesTitle: "مفضلتي",
    savedTripsTitle: "حجوزاتي",
    loginButton: "تسجيل الدخول",
    logoutButton: "تسجيل الخروج",
    registerTitle: "إنشاء حساب نخبة",
    usernameLabel: "اسم المستخدم",
    emailLabel: "البريد الإلكتروني",
    fullNameLabel: "الاسم الكامل",
    phoneLabel: "رقم الهاتف (واتساب)",
    whyChooseUsTitle: "لماذا يختارنا مسافرو النخبة",
    popularDestTitle: "أبرز رحلاتنا الفاخرة",
    popularDestSub: "كتالوجنا المختار بعناية من باقات السفر الفاخرة داخل الجزائر وحول العالم",
    servicesTitle: "خدمات سفر راقية ومخصصة",
    servicesSub: "في توريفاي، ننسق لك أدق تفاصيل رحلتك لتستمتع براحة بال تامة",
    specialOffersTitle: "عروض موسمية وشيكة",
    specialOffersSub: "عروض نسيجية محدودة الوقت تضم أفخر الأجنحة الفندقية، الرحلات الجوية والمزارات السياحية المتاحة",
    countdownPromo: "ينتهي العرض خلال:",
    hours: "سا",
    minutes: "د",
    galleryTitle: "من عدسة مسافرينا",
    gallerySub: "لقطات غامرة تلخص عجائب العالم من تصوير عملائنا الكرام",
    faqTitle: "الأسئلة الشائعة",
    newsLetterTitle: "انضم إلى نادي النخبة المغلق",
    newsLetterSub: "احصل على إشعارات فورية حول تواريخ الرحلات الحصرية، حجوزات الطيران الخاصة وعروض الـ VIP السنوية.",
    newsLetterInput: "أدخل بريدك الإلكتروني الراقي...",
    subscribeButton: "اشترك الآن",
    footerInfo: "بوابتك الفاخرة لتجارب سفر سياحية لا تُنسى.",
    quickLinks: "الوصول السريع",
    contactInfo: "تواصل معنا",
    addressVal: "08، شارع جسر قسنطينة، الجزائر العاصمة",
    secSecure: "حجوزات آمنة",
    secSecureSub: "جميع عمليات الحجز مشفرة ومحمية بنظام AES 256-bit عالي السرية.",
    currency: "العملة",
    language: "اللغة",
    reviewsLabel: "آراء عملائنا"
  }
};

// Conversions from DZD
// (Approx rates: 1 USD = 140 DZD, 1 EUR = 150 DZD)
export const convertCurrency = (dzdAmount: number, currency: "DZD" | "USD" | "EUR"): { amount: number; symbol: string } => {
  return { amount: dzdAmount, symbol: "DA" };
};

export const formatPriceString = (dzdAmount: number, currency: "DZD" | "USD" | "EUR", lang: "en" | "fr" | "ar"): string => {
  const { amount, symbol } = convertCurrency(dzdAmount, "DZD");
  const formattedVal = new Intl.NumberFormat(lang === "ar" ? "ar-DZ" : "fr-FR").format(amount);

  if (lang === "ar") {
    return `${formattedVal} د.ج`;
  } else {
    return `${formattedVal} ${symbol}`;
  }
};

interface AppContextType {
  currentLanguage: "en" | "fr" | "ar";
  currentCurrency: "DZD" | "USD" | "EUR";
  theme: "light" | "dark";
  favorites: string[]; // destination IDs
  savedTrips: BookingRecord[];
  activeDestinationId: string | null;
  activeBlogId: string | null;
  userSession: UserSession | null;
  searchFilters: SearchFilters;
  chatMessages: ChatMessage[];
  isChatOpen: boolean;
  prefilledBooking: {
    travelDate: string;
    travelersCount: number;
    packageClass: "Economy" | "Premium" | "Luxury Club";
  } | null;

  toggleFavorite: (destId: string) => void;
  bookTrip: (record: BookingRecord) => void;
  login: (username: string, email: string, fullName: string, phoneNumber: string) => void;
  logout: () => void;
  setLanguage: (lang: "en" | "fr" | "ar") => void;
  setCurrency: (curr: "DZD" | "USD" | "EUR") => void;
  setTheme: (theme: "light" | "dark") => void;
  setActiveDestinationId: (id: string | null) => void;
  setActiveBlogId: (id: string | null) => void;
  updateSearchFilters: (filters: Partial<SearchFilters>) => void;
  sendChatMessage: (text: string) => void;
  setIsChatOpen: (isOpen: boolean) => void;
  setPrefilledBooking: (data: { travelDate: string; travelersCount: number; packageClass: "Economy" | "Premium" | "Luxury Club" } | null) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentLanguage, setLanguageState] = useState<"en" | "fr" | "ar">("ar");
  const [currentCurrency, setCurrencyState] = useState<"DZD" | "USD" | "EUR">("DZD");
  const [theme, setThemeState] = useState<"light" | "dark">("dark"); // Default to dark for immersive luxury look
  const [favorites, setFavorites] = useState<string[]>([]);
  const [savedTrips, setSavedTrips] = useState<BookingRecord[]>([]);

  const [activeDestinationId, setActiveDestinationIdState] = useState<string | null>(null);
  const [activeBlogId, setActiveBlogIdState] = useState<string | null>(null);
  const [userSession, setUserSession] = useState<UserSession | null>({
    username: "",
    email: "",
    fullName: "",
    avatar: "",
    phoneNumber: ""
  });
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [prefilledBooking, setPrefilledBooking] = useState<{ travelDate: string; travelersCount: number; packageClass: "Economy" | "Premium" | "Luxury Club" } | null>(null);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: "m0",
      sender: "bot",
      text: "Marhaban! Hello and welcome to Tourify. I am Tarik, your private Saharan concierge. Let me know where you dream of traveling or ask about our visa & Umrah assistance services!",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);

  const [searchFilters, setSearchFilters] = useState<SearchFilters>({
    query: "",
    category: "all",
    priceRange: 400000,
    duration: ""
  });

  // Load state on mount
  useEffect(() => {
    const cachedLang = localStorage.getItem("tourify_lang");
    if (cachedLang) setLanguageState(cachedLang as any);

    const cachedCurr = localStorage.getItem("tourify_curr");
    setCurrencyState("DZD");

    const cachedTheme = localStorage.getItem("tourify_theme");
    if (cachedTheme) setThemeState(cachedTheme as any);

    const cachedFavs = localStorage.getItem("tourify_favs");
    if (cachedFavs) setFavorites(JSON.parse(cachedFavs));

    const cachedTrips = localStorage.getItem("tourify_trips");
    if (cachedTrips) setSavedTrips(JSON.parse(cachedTrips));

    const cachedSession = localStorage.getItem("tourify_session");
    if (cachedSession) setUserSession(JSON.parse(cachedSession));
  }, []);

  // Update HTML elements for local alignment and writing direction on language change
  useEffect(() => {
    document.documentElement.dir = currentLanguage === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = currentLanguage;
  }, [currentLanguage]);

  const setLanguage = (lang: "en" | "fr" | "ar") => {
    setLanguageState(lang);
    localStorage.setItem("tourify_lang", lang);
  };

  const setCurrency = (curr: "DZD" | "USD" | "EUR") => {
    setCurrencyState("DZD");
    localStorage.setItem("tourify_curr", "DZD");
  };

  const setTheme = (t: "light" | "dark") => {
    setThemeState(t);
    localStorage.setItem("tourify_theme", t);
  };

  const setActiveDestinationId = (id: string | null) => {
    setActiveDestinationIdState(id);
  };

  const setActiveBlogId = (id: string | null) => {
    setActiveBlogIdState(id);
  };

  const toggleFavorite = (destId: string) => {
    let updated;
    if (favorites.includes(destId)) {
      updated = favorites.filter(id => id !== destId);
    } else {
      updated = [...favorites, destId];
    }
    setFavorites(updated);
    localStorage.setItem("tourify_favs", JSON.stringify(updated));
  };

  const bookTrip = (record: BookingRecord) => {
    const updated = [record, ...savedTrips];
    setSavedTrips(updated);
    localStorage.setItem("tourify_trips", JSON.stringify(updated));
  };

  const login = (username: string, email: string, fullName: string, phoneNumber: string) => {
    const session: UserSession = {
      username,
      email,
      fullName,
      avatar: `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(fullName)}&backgroundColor=11304C`,
      phoneNumber
    };
    setUserSession(session);
    localStorage.setItem("tourify_session", JSON.stringify(session));
  };

  const logout = () => {
    setUserSession(null);
    localStorage.removeItem("tourify_session");
  };

  const updateSearchFilters = (filters: Partial<SearchFilters>) => {
    setSearchFilters(prev => ({ ...prev, ...filters }));
  };

  const sendChatMessage = (text: string) => {
    if (!text.trim()) return;

    const userMsg: ChatMessage = {
      id: `u-${Date.now()}`,
      sender: "user",
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setChatMessages(prev => [...prev, userMsg]);

    // Simple bot triggers for premium feel
    setTimeout(() => {
      let responseText = "That sounds fascinating! Our tourism experts will analyze this and guide you. You can call us directly on WhatsApp at +213 555 12 34 56 for immediate custom offers.";
      const cleanText = text.toLowerCase();

      if (cleanText.includes("sahara") || cleanText.includes("djanet")) {
        responseText = "Ah, Tassili n'Ajjer and Tin Merzouga dunes are majestic! We have direct 4x4 tours starting at 125,000 DA with flights included. Would you like me to open the Booking Page for our Desert Adventure?";
      } else if (cleanText.includes("visa")) {
        responseText = "Our dedicated Visa Assistance desk has a 96% success rate for Schengen (TLScontact/VFS Global) and Turkish visas. We handle appointment sweeps, translations, and reservations. Drop your contact details and our team will call you!";
      } else if (cleanText.includes("umrah") || cleanText.includes("mecca") || cleanText.includes("medina")) {
        responseText = "Our Elite Saudi Umrah packages offer accommodations right on the sacred courtyards (Makkah Clock Tower & Oberoi). We handle biometric visa permits instantly via Nusuk. Simply visit our Booking Page to lock your dream spiritual stay!";
      } else if (cleanText.includes("constantine") || cleanText.includes("bridges")) {
        responseText = "Constantine, the City of Bridges, is stunning! We offer an exclusive 3-day weekend escape including 5-star Marriott hospitality and tours of Tiddis ruins. Let us know if you want help booking!";
      } else if (cleanText.includes("price") || cleanText.includes("cost") || cleanText.includes("discount")) {
        responseText = "Our standard catalog displays all prices in DZD. We currently have active spring promotions offering up to 40,000 DA off selected packages in Turkey, Sahara, and Mecca!";
      }

      const botMsg: ChatMessage = {
        id: `b-${Date.now()}`,
        sender: "bot",
        text: responseText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setChatMessages(prev => [...prev, botMsg]);
    }, 1000);
  };

  return (
    <AppContext.Provider value={{
      currentLanguage,
      currentCurrency,
      theme,
      favorites,
      savedTrips,
      activeDestinationId,
      activeBlogId,
      userSession,
      searchFilters,
      chatMessages,
      isChatOpen,
      prefilledBooking,
      toggleFavorite,
      bookTrip,
      login,
      logout,
      setLanguage,
      setCurrency,
      setTheme,
      setActiveDestinationId,
      setActiveBlogId,
      updateSearchFilters,
      sendChatMessage,
      setIsChatOpen,
      setPrefilledBooking
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error("useApp must be used inside an AppProvider");
  return context;
};

/** Helper hook: maps old page names to router paths */
const pageToPath: Record<string, string> = {
  home: "/",
  destinations: "/destinations",
  "destination-details": "/destinations",
  offers: "/offers",
  services: "/services",
  about: "/about",
  "about-us": "/about",
  contact: "/contact",
  booking: "/booking",
};

export const useNavigateTo = () => {
  const navigate = useNavigate();
  return (page: string, id?: string) => {
    let path = pageToPath[page] || "/";
    if (page === "destination-details" && id) path = `/destinations/${id}`;
    if (page === "booking" && id) path = `/booking/${id}`;
    navigate(path);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
};
