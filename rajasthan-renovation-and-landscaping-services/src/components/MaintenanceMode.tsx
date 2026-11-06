import React from 'react';
import { Phone, MapPin, Clock, Lock, ShieldCheck, Power } from 'lucide-react';
import { business } from '../config/business';
import { WhatsAppIcon } from './Navbar';

interface MaintenanceModeProps {
  onOpenAdmin: () => void;
}

export const MaintenanceMode: React.FC<MaintenanceModeProps> = ({ onOpenAdmin }) => {
  return (
    <div className="min-h-screen bg-[#07160f] text-white flex flex-col justify-between p-4 sm:p-8 relative overflow-hidden font-sans">
      {/* Ambient background glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[#B8DC61]/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute -bottom-20 -right-20 w-[400px] h-[400px] bg-[#103F2B]/60 rounded-full blur-[100px] pointer-events-none" />

      {/* Top Header */}
      <header className="relative z-10 max-w-5xl mx-auto w-full flex items-center justify-between py-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#B8DC61] to-[#103F2B] flex items-center justify-center shadow-lg border border-[#B8DC61]/40">
            <ShieldCheck className="w-5 h-5 text-[#103F2B]" />
          </div>
          <div>
            <h1 className="text-base font-extrabold text-white tracking-tight">
              Rajasthan Renovation
            </h1>
            <p className="text-[10px] text-emerald-300 uppercase tracking-wider font-semibold">
              &amp; Landscaping Services
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={onOpenAdmin}
          className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-stone-300 hover:text-white border border-white/10 text-xs font-semibold transition-colors cursor-pointer"
        >
          <Lock className="w-3.5 h-3.5 text-[#B8DC61]" />
          <span>Admin Login</span>
        </button>
      </header>

      {/* Center Notice Card */}
      <main className="relative z-10 max-w-2xl mx-auto w-full my-auto py-12 text-center space-y-6">
        
        {/* Status Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-950/80 border border-amber-600/50 text-xs sm:text-sm font-bold text-amber-300 shadow-xl">
          <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-pulse" />
          <span>Site Temporarily Offline / Maintenance Mode</span>
        </div>

        {/* Heading & Subtitle */}
        <div className="space-y-3">
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
            We Are Updating Our Systems
          </h2>
          <p className="text-sm sm:text-base text-stone-300 max-w-lg mx-auto leading-relaxed">
            Our online quotation system is temporarily offline for scheduled updates. However, our trade operations across Queensland remain fully active!
          </p>
        </div>

        {/* Direct Contact Card with Khushkaran */}
        <div className="p-6 sm:p-8 rounded-3xl bg-stone-900/90 backdrop-blur-xl border border-emerald-900/50 shadow-2xl space-y-5 text-left max-w-lg mx-auto">
          <div className="space-y-1">
            <span className="text-[11px] font-bold text-[#B8DC61] uppercase tracking-wider block">
              Speak Directly With The Owner
            </span>
            <h3 className="text-xl font-bold text-white">
              Khushkaran is Available Directly
            </h3>
            <p className="text-xs text-stone-400">
              For urgent bookings, consultations, or project enquiries across Brisbane, Sunshine Coast &amp; Gold Coast:
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
            <a
              href={business.phoneTelLink}
              className="inline-flex items-center justify-center gap-2.5 px-5 py-3.5 rounded-2xl bg-[#B8DC61] hover:bg-[#a6cb50] text-[#103F2B] font-extrabold text-xs sm:text-sm shadow-md transition-all hover:scale-[1.01] cursor-pointer"
            >
              <Phone className="w-4 h-4 text-[#103F2B]" />
              <span>Call {business.phoneDisplay}</span>
            </a>

            <a
              href={business.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2.5 px-5 py-3.5 rounded-2xl bg-[#25D366] hover:bg-[#1eb956] text-white font-bold text-xs sm:text-sm shadow-md transition-all hover:scale-[1.01] cursor-pointer"
            >
              <WhatsAppIcon className="w-4 h-4" />
              <span>WhatsApp Us</span>
            </a>
          </div>

          <div className="pt-3 border-t border-stone-800 text-[11px] text-stone-400 flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-[#B8DC61]" />
              <span>Brisbane &amp; Queensland</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-[#B8DC61]" />
              <span>7am – 6pm Daily</span>
            </div>
          </div>
        </div>

      </main>

      {/* Bottom Footer */}
      <footer className="relative z-10 max-w-5xl mx-auto w-full text-center py-4 text-xs text-stone-500 border-t border-emerald-950/60">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>&copy; {new Date().getFullYear()} Rajasthan Renovation &amp; Landscaping Services.</span>
          <button
            type="button"
            onClick={onOpenAdmin}
            className="text-stone-400 hover:text-[#B8DC61] underline transition-colors cursor-pointer"
          >
            Owner / Admin Portal Access
          </button>
        </div>
      </footer>
    </div>
  );
};

