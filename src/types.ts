/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface ItineraryItem {
  day: number;
  title: string;
  description: string;
}

export interface Review {
  id: string;
  user: string;
  avatar: string;
  rating: number;
  date: string;
  comment: string;
}

export interface Destination {
  id: string;
  name: string;
  country: string;
  duration: string;
  priceDZD: number;
  rating: number;
  reviewsCount: number;
  image: string;
  images: string[];
  category: "local" | "international";
  description: string;
  includedServices: string[];
  excludedServices: string[];
  itinerary: ItineraryItem[];
  reviews: Review[];
  featured?: boolean;
}

export interface Offer {
  id: string;
  title: string;
  discountBadge: string;
  bgImage: string;
  originalPriceDZD: number;
  discountedPriceDZD: number;
  countdownMinutes: number;
  tag: string;
  description: string;
  destinationId: string;
}

export interface BlogComment {
  id: string;
  author: string;
  avatar?: string;
  text: string;
  date: string;
}

export interface BlogArticle {
  id: string;
  title: string;
  category: "Travel Tips" | "Destination Guides" | "Visa Information" | "Tourism News";
  author: string;
  authorAvatar: string;
  date: string;
  readTime: string;
  image: string;
  summary: string;
  content: string[];
  tags: string[];
  comments: BlogComment[];
}

export interface BookingRecord {
  id: string;
  destinationId: string;
  destinationName: string;
  destinationImage: string;
  travelDate: string;
  duration: string;
  travelersCount: number;
  travelerDetails: {
    fullName: string;
    passportNumber: string;
    email: string;
    phone: string;
  }[];
  packageClass: "Economy" | "Premium" | "Luxury Club";
  totalPriceDZD: number;
  paymentMethod: string;
  status: "Pending" | "Confirmed" | "Completed";
  createdAt: string;
}

export interface SearchFilters {
  query: string;
  category: "all" | "local" | "international";
  priceRange: number; // Max price in DZD
  duration: string;
}

export interface UserSession {
  username: string;
  email: string;
  fullName: string;
  avatar: string;
  phoneNumber?: string;
}

export interface ChatMessage {
  id: string;
  sender: "user" | "bot";
  text: string;
  timestamp: string;
}
