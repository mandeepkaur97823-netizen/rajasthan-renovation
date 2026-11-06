import React from 'react';
import { Phone, Grid, FileText } from 'lucide-react';
import { business } from '../config/business';
import { WhatsAppIcon } from './Navbar';

export const MobileStickyBar: React.FC = () => {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 sm:hidden bg-[#0a271b]/95 backdrop-blur-md border-t border-emerald-900/50 px-3 py-2 text-white shadow-2xl">
      <div className="grid grid-cols-4 gap-1.5 text-center text-xs items-center">
        
        {/* Services */}
        <a
          href="#services"
          className="flex flex-col items-center justify-center py-1 text-emerald-100 hover:text-white transition-colors cursor-pointer"
        >
          <Grid className="w-4 h-4 mb-0.5 text-emerald-300" />
          <span className="font-semibold text-[10px]">Services</span>
        </a>

        {/* WhatsApp Chat */}
        <a
          href={business.whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center py-1 text-[#25D366] hover:text-white transition-colors cursor-pointer"
        >
          <WhatsAppIcon className="w-4 h-4 mb-0.5" />
          <span className="font-bold text-[10px]">WhatsApp</span>
        </a>

        {/* Call Now */}
        <a
          href={business.phoneTelLink}
          className="flex items-center justify-center gap-1 py-2 px-2.5 rounded-xl bg-[#B8DC61] text-[#103F2B] font-extrabold text-xs shadow-md cursor-pointer"
        >
          <Phone className="w-3.5 h-3.5 text-[#103F2B]" />
          <span className="text-[11px]">Call</span>
        </a>

        {/* Free Quote */}
        <a
          href="#quote"
          className="flex flex-col items-center justify-center py-1 text-emerald-100 hover:text-white transition-colors cursor-pointer"
        >
          <FileText className="w-4 h-4 mb-0.5 text-emerald-300" />
          <span className="font-semibold text-[10px]">Quote</span>
        </a>

      </div>
    </div>
  );
};
