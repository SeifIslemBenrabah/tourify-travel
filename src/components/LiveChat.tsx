/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { WhatsappLogo } from "@phosphor-icons/react";

export const LiveChat: React.FC = () => {
  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3 pointer-events-none">
      <div className="pointer-events-auto flex flex-col md:flex-row gap-3">
        <a
          id="whatsapp-floater"
          href="https://wa.me/213555123456?text=Hello%20Tourify,%20I%20would%20like%20to%20inquire%20about%20your%20safari%20and%20luxury%20tours."
          target="_blank"
          rel="noopener noreferrer"
          className="w-14 h-14 rounded-full bg-green-500 hover:bg-green-600 text-white flex items-center justify-center shadow-xl transition-all duration-300 hover:scale-105"
          title="Direct WhatsApp Support"
        >
          <WhatsappLogo size={24} className="animate-pulse" weight="thin" />
        </a>
      </div>
    </div>
  );
};
