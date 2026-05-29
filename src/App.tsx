/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { AppProvider } from "./context/AppContext";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { LiveChat } from "./components/LiveChat";
import { Preloader } from "./components/Preloader";

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
    <div className="relative min-h-screen flex flex-col justify-between bg-white select-none text-primary selection:bg-accent selection:text-white overflow-x-hidden">
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
  const [loading, setLoading] = useState(true);

  return (
    <AppProvider>
      {loading && <Preloader onComplete={() => setLoading(false)} />}
      {!loading && <MainContent />}
    </AppProvider>
  );
}
