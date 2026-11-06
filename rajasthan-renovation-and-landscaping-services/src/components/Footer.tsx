import React, { useState } from 'react';
import { Phone, Home, Mail, Facebook, MapPin, Clock, X, ShieldCheck, FileText, Lock } from 'lucide-react';
import { SERVICES_DATA, business } from '../config/business';
import { WhatsAppIcon } from './Navbar';

interface FooterProps {
  onOpenAdmin?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenAdmin }) => {
  const currentYear = new Date().getFullYear();
  const [modalType, setModalType] = useState<'privacy' | 'terms' | null>(null);

  return (
    <footer className="bg-[#0a271b] text-stone-300 border-t border-emerald-900/40 pt-16 pb-24 sm:pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 pb-12 border-b border-emerald-900/40">
          
          {/* Column 1: Brand & Description */}
          <div className="md:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-[#B8DC61] to-[#103F2B] flex items-center justify-center shadow-md border border-[#B8DC61]/30">
                <Home className="w-5 h-5 text-[#103F2B] fill-[#103F2B]/20" />
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5 leading-none">
                  <span className="text-lg font-extrabold text-white">Rajasthan</span>
                  <span className="text-sm font-bold text-[#B8DC61]">Renovation</span>
                </div>
                <span className="text-[11px] font-medium tracking-wider text-emerald-200/80 uppercase mt-0.5">
                  &amp; Landscaping Services
                </span>
              </div>
            </div>
            
            <p className="text-sm text-stone-300/80 leading-relaxed max-w-sm">
              Professional outdoor living and property transformation solutions across Brisbane, Sunshine Coast &amp; Gold Coast, Queensland. Precision tiling, lawn care, landscape design, ground preparation &amp; leveling, and boundary fencing.
            </p>

            {/* Social Links */}
            <div className="flex items-center gap-3 pt-2">
              {business.facebookUrl && (
                <a
                  href={business.facebookUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#1877F2]/20 hover:bg-[#1877F2] text-white text-xs font-semibold border border-[#1877F2]/30 transition-all group"
                  aria-label="Rajasthan Renovation Facebook Page"
                >
                  <Facebook className="w-3.5 h-3.5 text-[#1877F2] fill-[#1877F2] group-hover:text-white group-hover:fill-white" />
                  <span>Facebook</span>
                </a>
              )}
              <a
                href={business.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#25D366]/20 hover:bg-[#25D366] text-[#25D366] hover:text-white text-xs font-semibold border border-[#25D366]/30 transition-all group"
                aria-label="WhatsApp Khushkaran"
              >
                <WhatsAppIcon className="w-3.5 h-3.5" />
                <span>WhatsApp</span>
              </a>
            </div>
          </div>

          {/* Column 2: Navigation Links */}
          <div className="md:col-span-2 space-y-3">
            <div className="text-xs font-bold uppercase tracking-wider text-[#B8DC61]">
              Navigation
            </div>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li>
                <a href="#home" className="hover:text-white transition-colors">Home</a>
              </li>
              <li>
                <a href="#services" className="hover:text-white transition-colors">Services</a>
              </li>
              <li>
                <a href="#work" className="hover:text-white transition-colors">Our Work</a>
              </li>
              <li>
                <a href="#reviews" className="hover:text-white transition-colors">Reviews</a>
              </li>
              <li>
                <a href="#process" className="hover:text-white transition-colors">Process</a>
              </li>
              <li>
                <a href="#about" className="hover:text-white transition-colors">About Us</a>
              </li>
              <li>
                <a href="#quote" className="text-[#B8DC61] hover:underline font-semibold transition-colors">Free Quote</a>
              </li>
            </ul>
          </div>

          {/* Column 3: 6 Services */}
          <div className="md:col-span-3 space-y-3">
            <div className="text-xs font-bold uppercase tracking-wider text-[#B8DC61]">
              Services Offered
            </div>
            <ul className="space-y-2 text-xs sm:text-sm">
              {SERVICES_DATA.map((service) => (
                <li key={service.id}>
                  <a
                    href="#services"
                    className="hover:text-white transition-colors block text-stone-300/90 hover:translate-x-0.5 transition-transform"
                  >
                    {service.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Direct Contact & Service Areas */}
          <div className="md:col-span-3 space-y-3">
            <div className="text-xs font-bold uppercase tracking-wider text-[#B8DC61]">
              Direct Contact
            </div>
            <div className="text-xs sm:text-sm space-y-2.5">
              <div>
                <span className="text-stone-400 block text-[11px] uppercase font-semibold">Primary Contact</span>
                <span className="text-white font-bold">{business.contactName}</span>
              </div>

              <div>
                <span className="text-stone-400 block text-[11px] uppercase font-semibold">Direct Phone</span>
                <a
                  href={business.phoneTelLink}
                  className="inline-flex items-center gap-1.5 font-mono text-sm sm:text-base font-bold text-[#B8DC61] hover:underline"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>{business.phoneDisplay}</span>
                </a>
              </div>

              {business.email && (
                <div>
                  <span className="text-stone-400 block text-[11px] uppercase font-semibold">Email</span>
                  <a
                    href={`mailto:${business.email}`}
                    className="inline-flex items-center gap-1.5 text-stone-300 hover:text-[#B8DC61] transition-colors break-all"
                  >
                    <Mail className="w-3.5 h-3.5 text-[#B8DC61]" />
                    <span>{business.email}</span>
                  </a>
                </div>
              )}

              <div>
                <span className="text-stone-400 block text-[11px] uppercase font-semibold">Queensland Regions</span>
                <div className="flex items-center gap-1 text-stone-300">
                  <MapPin className="w-3.5 h-3.5 text-[#B8DC61] shrink-0" />
                  <span>{business.serviceArea}</span>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Line: Copyright, Privacy Policy & Terms */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-400 gap-4">
          <div>
            &copy; {currentYear} {business.name}. All rights reserved.
          </div>
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => setModalType('privacy')}
              className="hover:text-white transition-colors underline cursor-pointer"
            >
              Privacy Policy
            </button>
            <span>·</span>
            <button
              type="button"
              onClick={() => setModalType('terms')}
              className="hover:text-white transition-colors underline cursor-pointer"
            >
              Terms &amp; Conditions
            </button>
            <span>·</span>
            <span>Khushkaran ({business.phoneDisplay})</span>
            <span>·</span>
            <button
              type="button"
              onClick={onOpenAdmin || (() => { window.location.hash = '#admin'; })}
              className="text-[#B8DC61] hover:text-white transition-colors font-bold inline-flex items-center gap-1 cursor-pointer"
            >
              <Lock className="w-3 h-3 text-[#B8DC61]" />
              <span>Admin Portal</span>
            </button>
          </div>
        </div>
      </div>

      {/* Privacy Policy & Terms Modal */}
      {modalType && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm animate-fade-in text-stone-900">
          <div className="relative w-full max-w-2xl bg-white rounded-3xl overflow-hidden shadow-2xl border border-stone-300 max-h-[90vh] flex flex-col">
            <div className="p-6 border-b border-stone-200 bg-[#F5F3EB] flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <FileText className="w-5 h-5 text-[#245C3A]" />
                <h3 className="text-lg font-bold text-[#103F2B]">
                  {modalType === 'privacy' ? 'Privacy Policy' : 'Terms & Conditions'}
                </h3>
              </div>
              <button
                onClick={() => setModalType(null)}
                className="p-2 rounded-xl text-stone-500 hover:text-stone-900 hover:bg-stone-200 transition-colors cursor-pointer"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 sm:p-8 overflow-y-auto space-y-4 text-xs sm:text-sm text-stone-700 leading-relaxed">
              {modalType === 'privacy' ? (
                <>
                  <p>
                    <strong>1. Commitment to Privacy:</strong> {business.name} respects the privacy of all clients and website visitors. We collect personal contact details (such as your name, phone number, email address, and property location) exclusively to provide accurate quotes and deliver our services.
                  </p>
                  <p>
                    <strong>2. Use of Information:</strong> Your enquiry information is used solely by Khushkaran and our team to communicate about your project. We do not sell, rent, or distribute personal data to third parties.
                  </p>
                  <p>
                    <strong>3. Direct Contact:</strong> For any questions regarding your data or to request deletion of your enquiry details, contact Khushkaran directly at {business.phoneDisplay} or {business.email}.
                  </p>
                </>
              ) : (
                <>
                  <p>
                    <strong>1. Quotations &amp; Scope:</strong> All quotations provided by {business.name} are based on initial on-site or digital scope assessments. Any modifications or additional works requested will be clearly itemized and agreed upon before execution.
                  </p>
                  <p>
                    <strong>2. Quality Standards:</strong> We take pride in professional workmanship across tiling, ground leveling, landscaping, and fencing, observing Australian building codes and safety practices.
                  </p>
                  <p>
                    <strong>3. Payments &amp; Invoicing:</strong> Invoicing terms and milestones are specified in your project agreement. Payments are made directly to verified business accounts.
                  </p>
                </>
              )}
            </div>

            <div className="p-4 border-t border-stone-200 bg-stone-50 text-right">
              <button
                onClick={() => setModalType(null)}
                className="px-5 py-2.5 rounded-xl bg-[#103F2B] text-white text-xs font-bold hover:bg-[#18533a] transition-colors cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </footer>
  );
};
