/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Destination } from "../types";

export const destinations: Destination[] = [
  {
    id: "djanet-sahara",
    name: "Tassili n'Ajjer Expedition",
    country: "Algeria (Djanet)",
    duration: "7 Days / 6 Nights",
    priceDZD: 125000,
    rating: 4.9,
    reviewsCount: 148,
    image: "https://images.unsplash.com/photo-1473580044384-7ba9967e16a0?auto=format&fit=crop&w=1200&q=80",
    images: [
      "https://images.unsplash.com/photo-1473580044384-7ba9967e16a0?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1742261628156-696186d1c9ea?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    ],
    category: "local",
    description: "Embark on an immersive spiritual journey into the heart of the Sahara. Discover the surreal rock forests of Tassili n'Ajjer, deep canyons, sand dunes of Tin Merzouga, and prehistoric cave art dating back 10,000 years, led by local Tuareg guides.",
    includedServices: [
      "Dynamic flight from Algiers to Djanet and return",
      "Full board catering (traditional meals cooked by chef)",
      "Premium 4x4 vehicles & professional drivers",
      "Tuareg guides and camp staff",
      "High-grade camping gear & tents",
      "Local authorization, security and insurance"
    ],
    excludedServices: [
      "Personal travel purchases",
      "Optional tips for drivers/cooks",
      "Single tent supplement (15,000 DZD)"
    ],
    itinerary: [
      {
        day: 1,
        title: "Algiers to Djanet - Flight and Welcome",
        description: "Board late-night flight to Djanet. Meet our Tuareg team. Settle into the initial oasis camp of Jamma under a starry desert sky."
      },
      {
        day: 2,
        title: "Entering Tadrart - Crying Cow Engravings",
        description: "Drive towards the canyons of Tadrart Rouge. Visit the famous prehistoric engraving 'Terout' (The Crying Cow) showcasing majestic Neolithic art."
      },
      {
        day: 3,
        title: "Golden Canyons of El Biredj",
        description: "Explore the striking balance of deep vertical canyon walls and sweeping red sand dunes. Sleep under a sky undisturbed by light pollution."
      },
      {
        day: 4,
        title: "The Scarlet Dunes of Tin Merzouga",
        description: "Climb the massive red sand dunes of Tin Merzouga. Enjoy a breathtaking transition of light as the sunset washes the entire landscape in liquid fire."
      },
      {
        day: 5,
        title: "Rock Formations of Moul El Naga",
        description: "Navigate surreal rock arches carved by millions of years of soft sand erosion. Enjoy authentic mint tea rituals at campfire."
      },
      {
        day: 6,
        title: "Return via Ihrir Oasis",
        description: "Discover a stunning wetland canyon hidden in the desert rocks featuring live pools of water, reeds, and ancient traditional Guelta."
      },
      {
        day: 7,
        title: "Oasis Farewell & Algiers Return",
        description: "Explore Djanet town market for authentic silver jewelry, visit local palm trees, and board flight back to Algiers."
      }
    ],
    reviews: [
      {
        id: "r1",
        user: "Amine Belkacemi",
        avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=100&q=80",
        rating: 5,
        date: "May 12, 2026",
        comment: "This is a life-changing experience. Deep Sahara has a silent wisdom, and Elysian team and local guides treated us like royalty!"
      },
      {
        id: "r2",
        user: "Fatima Zohra",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80",
        rating: 5,
        date: "April 28, 2026",
        comment: "The crimson sand dunes of Tin Merzouga were unlike anything I've ever seen. Outstanding food in the middle of nowhere."
      }
    ],
    featured: true
  },
  {
    id: "constantine-bridges",
    name: "Constantine: Imperial Bridges & Ruins",
    country: "Algeria (Constantine)",
    duration: "3 Days / 2 Nights",
    priceDZD: 23000,
    rating: 4.8,
    reviewsCount: 92,
    image: "https://images.unsplash.com/photo-1664403775784-8a0b32536a0c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    images: [
      "https://images.unsplash.com/photo-1664403775784-8a0b32536a0c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://images.unsplash.com/photo-1600118040416-89be6327ef02?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    ],
    category: "local",
    description: "Hang high above the spectacular Rhumel Gorge in Constantine, the 'City of Bridges', and explore the nearby breathtaking Roman thermal ruins of Tiddis on this ultra-premium, historical weekend getaway.",
    includedServices: [
      "Premium luxury hotel accommodation (5-star Marriott, 2 nights)",
      "All high-end traditional and gourmet meals included",
      "Private licensed local historian guide",
      "Private Mercedes-Benz executive shuttle for all tours",
      "All entry tickets to monuments and Roman archaeological park Tiddis",
      "Premium airport transfer"
    ],
    excludedServices: [
      "Flight tickets to Constantine (can be arranged separately)",
      "Personal items"
    ],
    itinerary: [
      {
        day: 1,
        title: "Bridges of Majesty & Medersa Tour",
        description: "Arrive and transfer to Marriott. Walk across Sidi M'Cid suspension bridge, 175 meters high above the canyon. Tour the elegant historical Medersa and Palace of Ahmed Bey."
      },
      {
        day: 2,
        title: "Prehistoric Red City of Tiddis",
        description: "Drive 30km north to Tiddis, the spectacular terracotta Roman mountain outpost built on dynamic tiered terraces. Stand and learn about red clay Roman structures."
      },
      {
        day: 3,
        title: "Souk Shopping & Departure",
        description: "Explore the bustling traditional markets for copper objects, taste authentic local sweets (Djouljoulia), and transfer to flight/train."
      }
    ],
    reviews: [
      {
        id: "rc1",
        user: "Yacine Benmansour",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80",
        rating: 5,
        date: "March 15, 2026",
        comment: "Spectacular tour. The guide knew everything about Constantine from Numidian times to French building eras. Tiddis is breathtaking."
      }
    ],
    featured: true
  },
  {
    id: "oran-santa-cruz",
    name: "Oran: Santa Cruz & Andalusian Heritage",
    country: "Algeria (Oran)",
    duration: "4 Days / 3 Nights",
    priceDZD: 35000,
    rating: 4.7,
    reviewsCount: 84,
    image: "https://images.unsplash.com/photo-1656978310683-d415ee895c2c?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    images: [
      "https://images.unsplash.com/photo-1656978310683-d415ee895c2c?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://images.unsplash.com/photo-1651894299519-f9604fc03cc0?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    ],
    category: "local",
    description: "Explore 'Oran la Blanche', the birthplace of Raï music, overlooking the beautiful Mediterranean. Tour the Fort of Santa Cruz, historical Spanish quarters of Sidi El Houari, and pristine ocean lookouts.",
    includedServices: [
      "Accommodation at Royal Hotel Oran MGallery (4 nights)",
      "Daily gourmet breakfasts and local seafood dinners",
      "Executive local guide and chauffeur",
      "Sailing yacht excursion along Oran bay (half-day)",
      "Entry tickets to Santa Cruz Fort and Chapel"
    ],
    excludedServices: [
      "Water extreme sports gear hire",
      "Personal shopping and tips"
    ],
    itinerary: [
      {
        day: 1,
        title: "Welcome to Oran - Santa Cruz Fort Panoramic",
        description: "Arrive in Oran. Drive up to Mount Murdjadjo. Visit the majestic Spanish-built Fort Santa Cruz and the white Chapel for panoramic sunset views over the bay."
      },
      {
        day: 2,
        title: "Spanish Sidi El Houari & Bey Palace Tours",
        description: "Explore the ancient Sidi El Houari historical sector, Spanish gates, French colonial theaters, and the private Palace of the Bey of Oran."
      },
      {
        day: 3,
        title: "Luxury Yacht Excursion & Andalusian Cuisine",
        description: "Board a premium sailing yacht for a private voyage along Oran's coast. Dine on fresh Mediterranean seafood at the renowned harbor restaurant."
      },
      {
        day: 4,
        title: "Guzman Walk & Departure",
        description: "Walk down the green cliffs of Canastel promenade, pack your bags, and prepare for your departure transfer."
      }
    ],
    reviews: [
      {
        id: "ro1",
        user: "Karim Djebbar",
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&q=80",
        rating: 5,
        date: "May 20, 2026",
        comment: "Excellent service! The MGallery Royal hotel is magnificent, and our yacht cruise felt ultra luxurious. Highly recommended!"
      }
    ]
  },
  {
    id: "turkey-istanbul",
    name: "Istanbul & Cappadocia Luxury Odyssey",
    country: "Turkey",
    duration: "8 Days / 7 Nights",
    priceDZD: 125000,
    rating: 4.9,
    reviewsCount: 310,
    image: "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?auto=format&fit=crop&w=1200&q=80",
    images: [
      "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?auto=format&fit=crop&w=1200&q=80",
      "https://plus.unsplash.com/premium_photo-1661962550248-59cf249e078b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    ],
    category: "international",
    description: "A gorgeous journey connecting the imperial Ottoman splendors of the Bosphorus to the surreal, hot-air balloon-filled skies of volcanic Cappadocia. Includes stays in cave suites and VIP Bosphorus yachts.",
    includedServices: [
      "International business-class flights from Algiers (AH/TK)",
      "Domestic luxury flights inside Turkey (Istanbul to Cappadocia)",
      "Cave hotel Boutique stay in Cappadocia (Museum Hotel)",
      "Vip luxury hotel in Istanbul Bosphorus (Shangri-La)",
      "Premium private VIP Bosphorus Yacht Cruise with live chef buffet",
      "Private local guides (fluent in French/Arabic/English)",
      "Cappadocia premium Hot Air Balloon ride at sunrise"
    ],
    excludedServices: [
      "Turkey eVisa (can be arranged for 5,000 DZD)",
      "Optional spa treatments"
    ],
    itinerary: [
      {
        day: 1,
        title: "Algiers-Istanbul VIP Arrival",
        description: "Touchdown at Istanbul Airport, VIP fast-track transition, private Mercedes S-Class chauffeured transfer to the hotel overlooking the Bosphorus."
      },
      {
        day: 2,
        title: "Historical Ottoman Heritage",
        description: "Private entry to Hagia Sophia, Blue Mosque, Topkapi Palace and the beautiful cavernous cistern. Enjoy exquisite regional dinners."
      },
      {
        day: 3,
        title: "Private Bosphorus Sailing & Grand Bazaar",
        description: "Sail on private luxury yacht under the continent-spanning bridges. In the afternoon, explore exclusive spice boutiques at the Grand Bazaar."
      },
      {
        day: 4,
        title: "Cappadocia Volcanic Valleys",
        description: "Fly to Cappadocia. Settle into the world-class Museum Hotel carved directly into mountainsides. Enjoy traditional clay-jar lamb dinner."
      },
      {
        day: 5,
        title: "Sunrise Cappadocia Ballooning",
        description: "Float gracefully in the Cappadocia sky surrounded by 150 hot air balloons at sunrise. Return for a champagne breakfast. Tour underground cities."
      },
      {
        day: 6,
        title: "Love Valley & Goreme Open-Air Museum",
        description: "Hike through geological structures, visit medieval cave churches adorned with stunning ancient frescoes."
      },
      {
        day: 7,
        title: "Return to Istanbul & Leisure",
        description: "Fly back to Istanbul. Afternoon at leisure for high-end fashion shopping at Istinye Park or relaxation at luxury Turkish Hammams."
      },
      {
        day: 8,
        title: "Farewell Ottoman Lands",
        description: "Transfer in luxury car to Istanbul airport and return flight to Algiers."
      }
    ],
    reviews: [
      {
        id: "rt1",
        user: "Sarah Slimani",
        avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=100&q=80",
        rating: 5,
        date: "May 05, 2026",
        comment: "This was absolutely magical. The cave suite in Cappadocia was spectacular and the hot air balloon ride at sunrise is a must! The services provided from Algiers were seamlessly executed."
      }
    ],
    featured: true
  },
  {
    id: "umrah-luxury",
    name: "VIP Elite Umrah Package",
    country: "Saudi Arabia (Mecca & Madinah)",
    duration: "14 Days / 13 Nights",
    priceDZD: 225000,
    rating: 5.0,
    reviewsCount: 420,
    image: "https://images.unsplash.com/photo-1513072064285-240f87fa81e8?q=80&w=2127&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    images: [
      "https://images.unsplash.com/photo-1513072064285-240f87fa81e8?q=80&w=2127&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://images.unsplash.com/photo-1565552645632-d725f8bfc19a?q=80&w=735&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    ],
    category: "international",
    description: "Perform your Umrah in ultimate comfort and quiet reflection. Features direct premium flights, stays at ultra-luxury clock tower hotels sitting directly in Haram front courtyard with Kaaba view rooms.",
    includedServices: [
      "Direct premium flights from Algiers (Air Algérie / Saudia)",
      "High-speed Haramain Express Train Tickets (Business Class)",
      "7 Nights in Mecca at Fairmont Makkah Clock Royal Tower (Kaaba View)",
      "6 Nights in Madinah at Oberoi Madinah Hotel (Front Yard)",
      "Full premium VIP visa processing & Nusuk authorization",
      "Private VIP transfers in GMC Yukon vehicles",
      "Daily open buffet gourmet breakfast and dinner",
      "Guided historical tours (Ziyarat) of religious landmarks"
    ],
    excludedServices: [
      "Wheelchair helpers (can be arranged upon request)",
      "Personal spiritual requests and laundry packages"
    ],
    itinerary: [
      {
        day: 1,
        title: "Algiers to Jeddah - Mecca VIP Transfer",
        description: "Board direct flight to Jeddah. Fast track entry. Transfer in luxury GMC Yukon to Fairmont Makkah Clock Royal Tower. Welcome drinks and check-in to Kaaba View room."
      },
      {
        day: 2,
        title: "Umrah Guided Rituals",
        description: "Begin your sacred Umrah ritual alongside our highly respectful scholar. Perform Tawaf and Sa'ee in calm guidance."
      },
      {
        day: 3,
        title: "Mecca Ziyarat Historical Tours",
        description: "Visit Mount Arafat, Mina, Muzdalifah, and Cave of Hira, tracing the roots of Islamic history in premium comfort."
      },
      {
        day: 4,
        title: "Spiritual Reflection in Haram",
        description: "Day dedicated to personal prayers, Quran recitation, and viewing beautiful spiritual transitions straight from your luxury suite."
      },
      {
        day: 8,
        title: "Mecca to Madinah - Haramain train",
        description: "Board high-speed Haramain train in bullet Business class (2 hours). Check-in to the legendary Oberoi Madinah sitting just steps from Al-Masjid an-Nabawi."
      },
      {
        day: 14,
        title: "Farewell Saudi Arabia",
        description: "Perform your farewell visits, transfer to Medina airport, and board business return flight to Algiers."
      }
    ],
    reviews: [
      {
        id: "ru1",
        user: "Hadj Mohamed El-Hadi",
        avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=100&q=80",
        rating: 5,
        date: "April 10, 2026",
        comment: "Outstanding organization. The hotels were exactly on the gates of the holy Mosques, making it incredibly restful for my elderly mother. May Allah bless the agency team."
      }
    ],
    featured: true
  },
  {
    id: "uae-dubai",
    name: "Dubai Skyline & Desert Private Oasis",
    country: "United Arab Emirates",
    duration: "6 Days / 5 Nights",
    priceDZD: 115000,
    rating: 4.8,
    reviewsCount: 195,
    image: "https://images.unsplash.com/photo-1580674684081-7617fbf3d745?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    images: [
      "https://images.unsplash.com/photo-1580674684081-7617fbf3d745?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1518684079-3c830dcef090?auto=format&fit=crop&w=1200&q=80"
    ],
    category: "international",
    description: "Soar through the cutting-edge architectural wonders of Dubai. Experience VIP entries to sky lounges, extreme luxury shopping hubs, and spend a night in exclusive private desert resort pools.",
    includedServices: [
      "Direct premium flights from Algiers with Emirates",
      "Executive hotel stay at Armani Hotel Dubai sitting in Burj Khalifa",
      "Desert resort stay at Al Maha Luxury Collection with private pools",
      "Private VIP Desert Safari with dune bashing (Rolls Royce/Range Rover)",
      "Entry tickets to Burj Khalifa 'At The Top Sky' (148th floor VIP lounge)",
      "Daily luxurious international breakfasts"
    ],
    excludedServices: [
      "UAE Tourist Visa (18,000 DZD)",
      "Dynamic activity add-ons (skydiving, indoor skiing)"
    ],
    itinerary: [
      {
        day: 1,
        title: "Arrival at Armani Hotel Burj Khalifa",
        description: "VIP welcome at Dubai International Airport. Direct check-in to Armani Hotel, enjoying ultimate automation and luxury design."
      },
      {
        day: 2,
        title: "VIP Burj Khalifa Lounge & Yacht Tour",
        description: "Skip the lines to the 148th floor. Stand above the clouds. Afternoon cruise around Dubai Marina on custom private sports yacht."
      },
      {
        day: 3,
        title: "Transition to Al Maha Desert Resort",
        description: "Journey into the sand dunes reserve. Settle into signature bedouin suites with temperature-controlled private infinity pools overlooking wild Arabian gazelles."
      },
      {
        day: 4,
        title: "Falconry & Bedouin Dining",
        description: "Witness historical falconry at sunrise, enjoy camel caravans, and dine on a private candlelit buffet carved into sand oases."
      },
      {
        day: 6,
        title: "Transfer & Return to Algiers",
        description: "Transfer in Range Rover back to Dubai Airport for return flight to Algiers with souvenirs."
      }
    ],
    reviews: [
      {
        id: "rd1",
        user: "Yasmine Othmani",
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=100&q=80",
        rating: 5,
        date: "May 18, 2026",
        comment: "Armani Hotel's location in Burj Khalifa was breathtaking, and the Al Maha desert resort was an ultimate serenity. Truly felt like a king!"
      }
    ]
  },
  {
    id: "france-paris",
    name: "Parisian Fashion & French Riviera Escape",
    country: "France",
    duration: "8 Days / 7 Nights",
    priceDZD: 210000,
    rating: 4.6,
    reviewsCount: 104,
    image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1200&q=80",
    images: [
      "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1485081669829-bacb8c7bb1f3?auto=format&fit=crop&w=1200&q=80"
    ],
    category: "international",
    description: "Experience the ultimate French art de vivre. Embark on cultural tours of Louvre with private guides, shopping guides on Champs-Élysées, followed by sun-drenched days in Monaco & Nice.",
    includedServices: [
      "Flights from Algiers to Paris, Paris to Nice, and Nice to Algiers",
      "3 Nights in Paris at Hôtel Plaza Athénée (Champs-Élysées)",
      "4 Nights in Monaco at Hôtel de Paris Monte-Carlo",
      "Private Louvre Museum VIP tour (skip-the-line)",
      "Personal luxury stylist shopper at Galeries Lafayette",
      "VIP Yacht Transfer from Nice port to Monaco"
    ],
    excludedServices: [
      "Schengen Visa fee and processing assistance",
      "Personal Michelin-starred lunches"
    ],
    itinerary: [
      {
        day: 1,
        title: "Welcome to Paris Plaza Athénée",
        description: "Arrive in Paris, drive to the world-renowned Plaza Athénée. Welcome with champagne and French macarons."
      },
      {
        day: 2,
        title: "Louvre Private Tour & Eiffel Dinner",
        description: "Walk inside Louvre with a personal art curator. Savor sunset dinner inside the Eiffel Tower's high-dining restaurants."
      },
      {
        day: 4,
        title: "Fly to Nice - Luxury Monaco Stay",
        description: "Board premium domestic flight to Nice. Helicopter transfer to Monaco, checking into Hôtel de Paris."
      },
      {
        day: 5,
        title: "French Riviera Yacht Sailing",
        description: "Sunbathe and sail alongside pristine waters of Saint-Jean-Cap-Ferrat, swimming in sapphire water pockets."
      },
      {
        day: 8,
        title: "Return to Algiers",
        description: "Board Nice to Algiers direct flight after an ultimate European experience."
      }
    ],
    reviews: [
      {
        id: "rf1",
        user: "Sofiane Rezzoug",
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&q=80",
        rating: 5,
        date: "February 24, 2026",
        comment: "Excellent service. The agency handled our Schengen visa scheduling with urgency and the hotels occupied iconic premium spots."
      }
    ]
  },
  {
    id: "tunisia-resort",
    name: "Hammamet Beach & Carthage Secrets",
    country: "Tunisia",
    duration: "6 Days / 5 Nights",
    priceDZD: 45000,
    rating: 4.5,
    reviewsCount: 165,
    image: "https://images.unsplash.com/photo-1633936478473-e75c1252cccf?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    images: [
      "https://images.unsplash.com/photo-1633936478473-e75c1252cccf?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    ],
    category: "international",
    description: "Unwind on the pristine beaches of Tunisia. Re-energize at world-class Thalassotherapy spas in Hammamet and discover the historical ruins of Carthage and beautiful Sidi Bou Said villages.",
    includedServices: [
      "Direct round-trip flights from Algiers to Tunis (AH/TU)",
      "5 Nights at luxury resort The Residence Tunis (Beachfront)",
      "Daily premium breakfast and dynamic dinner buffets",
      "Private tour of Sidi Bou Said, Carthage Ruins, and Medina Tunis",
      "Full premium thalassotherapy massage package (2 days)",
      "All private airport transfers with VIP host"
    ],
    excludedServices: [
      "Water skiing and extreme sea sports",
      "Personal items"
    ],
    itinerary: [
      {
        day: 1,
        title: "Welcome to Tunis - Hammamet Resort",
        description: "Board early morning flight to Tunis. Settle in your sea-front luxury suite. Unwind with authentic Tunisian mint tea."
      },
      {
        day: 2,
        title: "Sidi Bou Said & Ruins",
        description: "Walk inside the stunning blue-and-white clifftop neighborhood of Sidi Bou Said. Explore Carthage's Roman Antonine thermal baths."
      },
      {
        day: 3,
        title: "Gourmet Hammamet Relaxation",
        description: "Spend full leisure day enjoying white sandy private beaches and receiving custom tailored hot stone thermal treatments."
      },
      {
        day: 6,
        title: "Medina Souks & Departure",
        description: "Buy premium olive wood crafts and traditional Tunisian spices before transferring to Tunis airport for return."
      }
    ],
    reviews: [
      {
        id: "rtu1",
        user: "Meziane Lounes",
        avatar: "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?auto=format&fit=crop&w=100&q=80",
        rating: 4.8,
        date: "July 12, 2025",
        comment: "Incredible hospitality. The Residence Tunis is absolutely phenomenal for families who want to relax and enjoy the Mediterranean coastline closely."
      }
    ]
  },
  {
    id: "egypt-pyramids",
    name: "Pyramids & Luxor Nile Elite Cruise",
    country: "Egypt",
    duration: "7 Days / 6 Nights",
    priceDZD: 105000,
    rating: 4.7,
    reviewsCount: 215,
    image: "https://images.unsplash.com/photo-1539768942893-daf53e448371?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    images: [
      "https://images.unsplash.com/photo-1539768942893-daf53e448371?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    ],
    category: "international",
    description: "Fulfill your dream of standing in font of the Great Pyramids of Giza, camel ride into Egyptian histories, and float down the sacred Nile River aboard an epic private-cabin luxury cruise-ship.",
    includedServices: [
      "Flights from Algiers to Cairo and Cairo to Luxor, returning to Algiers",
      "3 Nights at Marriott Mena House Cairo (Pyramid view premium rooms)",
      "3 Nights aboard Sonesta St. George Cleopatra Luxury Nile Cruise",
      "Dedicated Egyptologist private guide (French & Arabic speaker)",
      "All entry tickets (Giza Pyramids, Sphinx, Luxor Valley of the Kings, Karnak)",
      "Felucca sunset sailing boat experience in Aswan"
    ],
    excludedServices: [
      "Egypt Entry Visa (12,000 DZD assisted or eVisa)",
      "Tomb of Tutankhamun entry add-on"
    ],
    itinerary: [
      {
        day: 1,
        title: "Settle into Marriott Mena House",
        description: "Fly from Algiers. Welcome transfer. Settle into the legendary Mena House historical resort next to the Pyramids."
      },
      {
        day: 2,
        title: "Beholding Giza Pyramids & Sphinx",
        description: "Private sunrise access with your Egyptologist guide. Camel trekking across the Giza hot sand. Visit the Solar Boat museum."
      },
      {
        day: 4,
        title: "Board luxury Nile cruise in Luxor",
        description: "Fly to Luxor. Board the 5-star Sonesta Cruise ship. Tour the breathtaking Valley of the Kings and Colossi of Memnon."
      },
      {
        day: 5,
        title: "Edfu & Kom Ombo Temples",
        description: "Sail down the Nile enjoying cocktails and pools on the outer sun deck. Step ashore to tour spectacular Ptolemaic temples."
      },
      {
        day: 7,
        title: "High Dam & Cairo Departure",
        description: "Disembark in Aswan. Transfer to Cairo and fly home with memories of pharaohs."
      }
    ],
    reviews: [
      {
        id: "re1",
        user: "Tarek Mansouri",
        avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=100&q=80",
        rating: 4.9,
        date: "May 02, 2026",
        comment: "A flawless itinerary. Sighting the Pyramids from our room's private balcony at Mena House was mind-blowing!"
      }
    ],
    featured: true
  }
];
