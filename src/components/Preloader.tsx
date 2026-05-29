import React, { useEffect, useState } from "react";
import logo from "../../assets/Logo.svg";

export const Preloader: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const [fadingOut, setFadingOut] = useState(false);

  useEffect(() => {
    // Keep the loading screen for a minimum duration to show off luxury branding
    const timer = setTimeout(() => {
      setFadingOut(true);
      setTimeout(() => {
        onComplete();
      }, 800); // 800ms fade-out transition duration
    }, 2000); // 2 seconds display time

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div
      className={`fixed inset-0 z-[999] flex flex-col items-center justify-center bg-white select-none transition-opacity duration-700 ease-in-out ${
        fadingOut ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#1e5b85_0%,transparent_60%)] opacity-30 animate-pulse pointer-events-none z-0" />
      
      {/* Centered Logo & Animation */}
      <div className="relative z-10 flex flex-col items-center gap-8">
        <img
          src={logo}
          alt="Tourify Luxury"
          className="w-32 h-32 md:w-40 md:h-40 object-contain drop-shadow-2xl animate-in fade-in zoom-in-75 duration-1000"
        />
        
        {/* Elegant Loading Line */}
        <div className="w-48 md:w-64 h-[1px] bg-white/10 relative overflow-hidden rounded-full">
          <div className="absolute top-0 left-0 h-full bg-accent animate-[loading_2s_ease-in-out_infinite]" />
        </div>
        
        <p className="text-[10px] uppercase tracking-[0.3em] font-bold text-accent/80 animate-pulse">
          Crafting Elite Escapades
        </p>
      </div>

      <style>{`
        @keyframes loading {
          0% { width: 0; left: 0; }
          50% { width: 100%; left: 0; }
          100% { width: 100%; left: 100%; }
        }
      `}</style>
    </div>
  );
};
