import React, { useState } from 'react';
import { Phone, Menu, X, Home, Facebook, Lock } from 'lucide-react';
import { business } from '../config/business';

export interface NavbarProps {
  onOpenAdmin?: () => void;
}

export const WhatsAppIcon: React.FC<{ className?: string }> = ({ className = "w-4 h-4" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
  </svg>
);

export const Navbar: React.FC<NavbarProps> = ({ onOpenAdmin }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Home', href: '#home' },
    { label: 'Services', href: '#services' },
    { label: 'Our Work', href: '#work' },
    { label: 'Reviews', href: '#reviews' },
    { label: 'Process', href: '#process' },
    { label: 'About', href: '#about' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-[#103F2B]/95 backdrop-blur-md border-b border-emerald-900/60 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4 lg:gap-8 h-20">
          
          {/* Logo & Brand Identity */}
          <a
            href="#home"
            className="flex items-center gap-3 group shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#B8DC61]"
            aria-label="Rajasthan Renovation and Landscaping Services Home"
          >
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-[#B8DC61] to-[#103F2B] flex items-center justify-center shadow-md border border-[#B8DC61]/40 group-hover:scale-105 transition-transform duration-300">
              <Home className="w-5 h-5 text-[#103F2B] fill-[#103F2B]/20" />
            </div>

            <div className="flex flex-col">
              <div className="flex items-center gap-1.5 leading-none">
                <span className="text-lg sm:text-xl font-extrabold tracking-tight text-white group-hover:text-[#F5F3EB] transition-colors">
                  Rajasthan
                </span>
                <span className="text-sm sm:text-base font-bold text-[#B8DC61] tracking-tight">
                  Renovation
                </span>
              </div>
              <span className="text-[10px] sm:text-[11px] font-semibold tracking-wider text-emerald-200/90 uppercase mt-0.5">
                &amp; Landscaping Services
              </span>
            </div>
          </a>

          {/* Navigation Links */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-7 text-sm font-medium text-emerald-100/90">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="hover:text-[#B8DC61] transition-colors whitespace-nowrap py-1 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-[#B8DC61] hover:after:w-full after:transition-all"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Action Hub (Call Now + WhatsApp + Facebook) */}
          <div className="hidden sm:flex items-center gap-2.5 shrink-0">
            {/* WhatsApp Contact */}
            <a
              href={business.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-3.5 py-2.5 rounded-2xl bg-[#25D366]/20 hover:bg-[#25D366] text-[#25D366] hover:text-white border border-[#25D366]/40 text-xs sm:text-sm font-bold transition-all group shadow-xs cursor-pointer"
              aria-label="Chat with Khushkaran on WhatsApp"
            >
              <WhatsAppIcon className="w-4 h-4 shrink-0 transition-transform group-hover:scale-110" />
              <span>WhatsApp</span>
            </a>

            {/* Facebook Icon Button */}
            {business.facebookUrl && (
              <a
                href={business.facebookUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center p-2.5 rounded-2xl bg-white/10 hover:bg-[#1877F2] text-white border border-white/20 hover:border-[#1877F2] transition-colors cursor-pointer"
                aria-label="Visit Facebook Profile"
                title="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
            )}

            {/* High-Contrast Call Now Button */}
            <a
              href={business.phoneTelLink}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-[#B8DC61] hover:bg-[#a6cb50] text-[#103F2B] text-xs sm:text-sm font-extrabold shadow-md transition-all hover:scale-[1.02] whitespace-nowrap cursor-pointer"
            >
              <Phone className="w-4 h-4 text-[#103F2B]" />
              <span>Call Now</span>
            </a>
          </div>

          {/* Mobile Actions & Menu Toggle */}
          <div className="flex sm:hidden items-center gap-2">
            <a
              href={business.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-xl bg-[#25D366]/20 text-[#25D366] border border-[#25D366]/40"
              aria-label="WhatsApp"
            >
              <WhatsAppIcon className="w-4 h-4" />
            </a>

            <a
              href={business.phoneTelLink}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#B8DC61] text-[#103F2B] text-xs font-extrabold"
              aria-label="Call Khushkaran"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>Call</span>
            </a>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-emerald-100 hover:text-white hover:bg-emerald-900/60 focus:outline-hidden cursor-pointer"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-emerald-900/60 bg-[#0a271b] px-4 pt-4 pb-6 space-y-2 shadow-2xl animate-fade-in">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3.5 py-2.5 rounded-xl text-base font-semibold text-emerald-50 hover:bg-[#103F2B] hover:text-[#B8DC61] transition-colors"
            >
              {link.label}
            </a>
          ))}

          <div className="pt-3 border-t border-emerald-900/80 mt-3 space-y-2.5">
            <a
              href={business.phoneTelLink}
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-center gap-2 w-full px-4 py-3 rounded-2xl bg-[#B8DC61] text-[#103F2B] font-extrabold text-sm shadow-md"
            >
              <Phone className="w-4 h-4" />
              <span>Call Khushkaran — {business.phoneDisplay}</span>
            </a>

            <a
              href={business.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-center gap-2 w-full px-4 py-3 rounded-2xl bg-[#25D366]/20 hover:bg-[#25D366] text-[#25D366] hover:text-white border border-[#25D366]/40 font-bold text-sm transition-all"
            >
              <WhatsAppIcon className="w-4 h-4" />
              <span>Chat on WhatsApp ({business.whatsappDisplay})</span>
            </a>

            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                if (onOpenAdmin) onOpenAdmin();
                else window.location.hash = '#admin';
              }}
              className="flex items-center justify-center gap-2 w-full px-4 py-2.5 rounded-2xl bg-black/40 text-stone-300 hover:text-white border border-stone-700/60 font-semibold text-xs transition-all cursor-pointer"
            >
              <Lock className="w-3.5 h-3.5 text-[#B8DC61]" />
              <span>Admin Portal Login</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
