/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { AppProvider } from "./context/AppContext";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { LiveChat } from "./components/LiveChat";

import { Home } from "./components/pages/Home";
import { Destinations } from "./components/pages/Destinations";
import { DestinationDetails } from "./components/pages/DestinationDetails";
import { Offers } from "./components/pages/Offers";
import { Services } from "./components/pages/Services";
import { AboutUs } from "./components/pages/AboutUs";
import { Contact } from "./components/pages/Contact";
import { Booking } from "./components/pages/Booking";

const MainContent: React.FC = () => {
  const location = useLocation();
  const isHome = location.pathname === "/";

  return (
    <div className="relative min-h-screen flex flex-col justify-between bg-primary-dark select-none text-white selection:bg-accent selection:text-white overflow-x-hidden">
      {/* Elegant Dark Atmospheric Backdrops */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,#1e5b85_0%,transparent_60%)] opacity-35 pointer-events-none z-0" />
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1518391846015-55a9cc003b25?auto=format&fit=crop&q=80&w=1024')] bg-cover bg-center mix-blend-overlay opacity-15 pointer-events-none z-0" />

      <div className="relative z-10 flex flex-col min-h-screen justify-between">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/destinations" element={<Destinations />} />
            <Route path="/destinations/:id" element={<DestinationDetails />} />
            <Route path="/offers" element={<Offers />} />
            <Route path="/services" element={<Services />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/booking" element={<Booking />} />
            <Route path="/booking/:destinationId" element={<Booking />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
        <Footer />
      </div>
      <LiveChat />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainContent />
    </AppProvider>
  );
}
