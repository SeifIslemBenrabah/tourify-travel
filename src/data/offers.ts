/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Offer } from "../types";

export const offers: Offer[] = [
  {
    id: "promo-istanbul",
    title: "Cappadocia Sunrise & Sultanahmet Spring Dream",
    discountBadge: "Save 30,000 DZD",
    bgImage: "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?auto=format&fit=crop&w=1200&q=80",
    originalPriceDZD: 265000,
    discountedPriceDZD: 235000,
    countdownMinutes: 2450, // Simulated countdown
    tag: "Seasonal Spring Offer",
    description: "Experience Istanbul and Cappadocia with luxury Bosphorus Yacht cruise and sunrise hot air balloon flight at an exclusive spring discounted rate from Algiers.",
    destinationId: "turkey-istanbul"
  },
  {
    id: "promo-djanet",
    title: "Djanet Tin Merzouga Sahara Red Dunes Expedition",
    discountBadge: "Save 15,000 DZD",
    bgImage: "https://images.unsplash.com/photo-1473580044384-7ba9967e16a0?auto=format&fit=crop&w=1200&q=80",
    originalPriceDZD: 125000,
    discountedPriceDZD: 110000,
    countdownMinutes: 1140,
    tag: "Last-Minute Deal",
    description: "Escape the city and experience deep ancient silence. Special full-board camping tour with flight, 4x4, and Tuareg guides included.",
    destinationId: "djanet-sahara"
  },
  {
    id: "promo-umrah",
    title: "Exclusive Ramadan Elite Umrah Package",
    discountBadge: "Save 40,000 DZD",
    bgImage: "https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=1200&q=80",
    originalPriceDZD: 385000,
    discountedPriceDZD: 345000,
    countdownMinutes: 4850,
    tag: "Ramadan Spiritual Offer",
    description: "Secure your luxury spiritual trip in Mecca (Fairmont Clock Tower) and Medina (Oberoi) directly in front of the holy courtyards at premier off-peak rates.",
    destinationId: "umrah-luxury"
  },
  {
    id: "promo-egypt",
    title: "Grand Pyramids & Luxury Nile River Sailing Cruise",
    discountBadge: "Save 25,000 DZD",
    bgImage: "https://images.unsplash.com/photo-1503177119275-0aa32b31d468?auto=format&fit=crop&w=1200&q=80",
    originalPriceDZD: 185000,
    discountedPriceDZD: 160000,
    countdownMinutes: 3220,
    tag: "Luxury Honeymoon Deal",
    description: "Stay in historical Pyramids-view rooms and sail historical Egypt on a 5-star Nile cruise boat with private Egyptologist guidance included.",
    destinationId: "egypt-pyramids"
  }
];
