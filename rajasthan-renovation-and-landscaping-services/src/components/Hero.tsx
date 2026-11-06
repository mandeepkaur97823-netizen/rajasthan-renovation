import React from 'react';
import { Phone, ArrowRight, Star, ShieldCheck, MapPin, Mail } from 'lucide-react';
import { business } from '../config/business';
import { WhatsAppIcon } from './Navbar';

export const Hero: React.FC = () => {
  return (
    <section id="home" className="relative w-full overflow-hidden bg-black text-white min-h-[640px] lg:min-h-[720px] flex items-center">
      {/* Background Image Container */}
      <div className="absolute inset-0 z-0">
        <img
          src={business.luxuryHeroImageUrl || '/images/luxury-hero.jpg'}
          alt="Luxury Queensland property renovation, outdoor living, and landscaping"
          className="w-full h-full object-cover object-right lg:object-center"
        />

        {/* 1. Seamless Full-Width Dark Green + Black Gradient (No hard cut or partition) */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/80 via-[#0a271b]/65 via-transparent to-transparent hidden lg:block pointer-events-none" />

        {/* 2. Seamless Feathered Blur: smoothly fades out with ZERO partition edge */}
        <div 
          className="absolute inset-0 backdrop-blur-md hidden lg:block pointer-events-none"
          style={{
            maskImage: 'linear-gradient(to right, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 0.85) 30%, rgba(0, 0, 0, 0) 65%)',
            WebkitMaskImage: 'linear-gradient(to right, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 0.85) 30%, rgba(0, 0, 0, 0) 65%)',
          }}
        />

        {/* Mobile / Tablet vertical overlay for full text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/90 via-[#0d2d1e]/80 to-black/60 lg:hidden pointer-events-none" />

        {/* Subtle top & bottom fades for clean header & section transitions */}
        <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-black/80 to-transparent pointer-events-none" />
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#0a271b] via-[#0a271b]/40 to-transparent pointer-events-none" />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 lg:py-28">
        <div className="max-w-2xl lg:max-w-3xl space-y-7">
          
          {/* Service Area Label */}
          <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-[#B8DC61]/40 text-[11px] sm:text-sm font-semibold text-[#B8DC61] shadow-lg max-w-full">
            <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#B8DC61] shrink-0" />
            <span className="truncate">Brisbane | Sunshine Coast | Gold Coast | Queensland</span>
          </div>

          {/* Headline & Subtitle */}
          <div className="space-y-3 sm:space-y-4">
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.15] sm:leading-[1.12] drop-shadow-md">
              Complete Outdoor &amp; Property Transformations in Queensland
            </h1>
            <p className="text-sm sm:text-lg lg:text-xl text-[#F5F3EB]/90 font-normal leading-relaxed max-w-2xl drop-shadow-sm">
              Professional Landscaping, Renovation, Tiling &amp; Outdoor Solutions. Quality Workmanship, Designed Around Your Vision.
            </p>
          </div>

          {/* Two Prominent Action Buttons */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-1">
            <a
              href="#quote"
              className="inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-2xl bg-[#B8DC61] hover:bg-[#a6cb50] text-[#103F2B] font-extrabold text-base shadow-xl shadow-black/30 hover:shadow-2xl transition-all hover:scale-[1.02] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#B8DC61] cursor-pointer"
            >
              <span>Request a Free Quote</span>
              <ArrowRight className="w-5 h-5 text-[#103F2B]" />
            </a>

            <a
              href="#work"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl bg-black/50 hover:bg-black/70 backdrop-blur-md border border-white/30 text-white font-bold text-base shadow-md transition-all hover:scale-[1.02] cursor-pointer"
            >
              <span>Explore Our Projects</span>
            </a>
          </div>

          {/* Quick Contact & Multi-Channel Touchpoints Bar */}
          <div className="pt-2">
            <div className="p-4 sm:p-5 rounded-2xl bg-black/75 backdrop-blur-xl border border-[#B8DC61]/30 shadow-2xl">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs sm:text-sm">
                
                {/* Phone Link */}
                <a
                  href={business.phoneTelLink}
                  className="flex items-center gap-3 p-2.5 rounded-xl bg-white/5 hover:bg-white/10 transition-colors group cursor-pointer"
                >
                  <div className="w-9 h-9 rounded-xl bg-[#B8DC61] flex items-center justify-center text-[#103F2B] shrink-0 shadow-xs font-bold">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <span className="text-[10px] text-[#B8DC61] font-semibold uppercase block">Call Khushkaran</span>
                    <span className="font-mono font-bold text-white text-sm group-hover:text-[#B8DC61] transition-colors">{business.phoneDisplay}</span>
                  </div>
                </a>

                {/* WhatsApp Link */}
                <a
                  href={business.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-2.5 rounded-xl bg-white/5 hover:bg-white/10 transition-colors group cursor-pointer"
                >
                  <div className="w-9 h-9 rounded-xl bg-[#25D366] flex items-center justify-center text-white shrink-0 shadow-xs">
                    <WhatsAppIcon className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <span className="text-[10px] text-emerald-300 font-semibold uppercase block">Chat on WhatsApp</span>
                    <span className="font-semibold text-white text-xs truncate block group-hover:text-[#25D366] transition-colors">Instant Message</span>
                  </div>
                </a>

                {/* Direct Service Coverage */}
                <div className="flex items-center gap-3 p-2.5 rounded-xl bg-white/5">
                  <div className="w-9 h-9 rounded-xl bg-[#103F2B] border border-[#B8DC61]/30 flex items-center justify-center text-[#B8DC61] shrink-0">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <span className="text-[10px] text-emerald-300 font-semibold uppercase block">Direct Owner Service</span>
                    <span className="font-semibold text-white text-xs truncate block">All Queensland Suburbs</span>
                  </div>
                </div>

              </div>
            </div>
          </div>

          {/* Trust and Social Proof Badges */}
          <div className="pt-1 flex flex-wrap items-center gap-y-3 gap-x-6 text-xs text-[#F5F3EB]/85">
            <a
              href="#reviews"
              className="inline-flex items-center gap-1.5 hover:text-white transition-colors cursor-pointer group"
            >
              <div className="flex text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                ))}
              </div>
              <span className="font-bold text-white group-hover:underline">4.9/5.0</span>
              <span className="text-emerald-200">(48+ Verified Local Reviews)</span>
            </a>

            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-[#B8DC61]" />
              <span>Free On-Site Quotation</span>
            </div>

            <div className="flex items-center gap-1.5">
              <Mail className="w-4 h-4 text-[#B8DC61]" />
              <a href={`mailto:${business.email}`} className="hover:underline">{business.email}</a>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
