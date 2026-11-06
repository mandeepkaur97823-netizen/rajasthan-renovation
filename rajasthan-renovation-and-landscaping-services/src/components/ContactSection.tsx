import React, { useState } from 'react';
import { Phone, Copy, Check, ArrowRight, UserCheck, Mail, Facebook } from 'lucide-react';
import { business } from '../config/business';
import { WhatsAppIcon } from './Navbar';

export const ContactSection: React.FC = () => {
  const [copied, setCopied] = useState(false);

  const handleCopyPhone = () => {
    navigator.clipboard.writeText(business.phoneDisplay);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section id="contact" className="py-20 lg:py-28 bg-[#103F2B] text-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-14 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white/10 border border-white/20 text-xs font-bold uppercase tracking-wider text-[#B8DC61]">
            Direct Owner Communication
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Contact Khushkaran Directly
          </h2>
          <p className="text-[#F5F3EB]/85 text-base sm:text-lg max-w-xl mx-auto leading-relaxed">
            Reach out via phone, WhatsApp, email, or Facebook to arrange a prompt site inspection or discuss your project specifications.
          </p>
        </div>

        {/* Contact Card */}
        <div className="bg-[#0a271b] rounded-3xl border border-emerald-800/60 p-8 sm:p-12 shadow-2xl">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            
            {/* Left Column: Business & Contact Person */}
            <div className="md:col-span-7 space-y-4">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950 border border-emerald-700/50 text-xs font-semibold text-[#B8DC61]">
                <UserCheck className="w-3.5 h-3.5" />
                <span>Primary Contact &amp; Owner</span>
              </span>

              <h3 className="text-2xl sm:text-3xl font-extrabold text-white leading-tight">
                {business.name}
              </h3>

              <div className="pt-2 space-y-2.5 text-emerald-100">
                <div className="text-base sm:text-lg">
                  <span className="text-[#B8DC61] font-medium">Contact Person: </span>
                  <span className="font-bold text-white">{business.contactName}</span>
                </div>
                <div className="text-base sm:text-lg">
                  <span className="text-[#B8DC61] font-medium">Direct Phone: </span>
                  <a
                    href={business.phoneTelLink}
                    className="font-mono font-bold text-xl sm:text-2xl text-[#B8DC61] hover:underline"
                  >
                    {business.phoneDisplay}
                  </a>
                </div>
                {business.email && (
                  <div className="text-base sm:text-lg">
                    <span className="text-[#B8DC61] font-medium">Direct Email: </span>
                    <a
                      href={`mailto:${business.email}`}
                      className="font-medium text-base sm:text-lg text-white hover:text-[#B8DC61] underline decoration-emerald-500/50 transition-colors"
                    >
                      {business.email}
                    </a>
                  </div>
                )}
                {business.facebookUrl && (
                  <div className="text-base sm:text-lg flex items-center gap-2 pt-0.5">
                    <span className="text-[#B8DC61] font-medium">Facebook: </span>
                    <a
                      href={business.facebookUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 font-medium text-white hover:text-[#B8DC61] underline decoration-emerald-500/50 transition-colors"
                    >
                      <Facebook className="w-4 h-4 text-[#1877F2]" />
                      <span>Rajasthan Renovation Profile</span>
                    </a>
                  </div>
                )}
                <div className="text-sm text-emerald-200/90 pt-1">
                  <span className="text-[#B8DC61] font-medium">Service Coverage: </span>
                  <span>{business.serviceArea}</span>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-[#F5F3EB]/75 leading-relaxed pt-2">
                Available Monday to Sunday across Brisbane, Sunshine Coast &amp; Gold Coast to discuss professional tiling, ground prep, landscape design, fencing, and complete outdoor transformations.
              </p>
            </div>

            {/* Right Column: Direct Touchpoint Cluster */}
            <div className="md:col-span-5 flex flex-col gap-3">
              {/* Call Now Button */}
              <a
                href={business.phoneTelLink}
                className="w-full inline-flex items-center justify-center gap-2.5 px-6 py-4 rounded-2xl bg-[#B8DC61] hover:bg-[#a6cb50] text-[#103F2B] font-extrabold text-base shadow-md transition-all hover:scale-[1.01] cursor-pointer"
              >
                <Phone className="w-5 h-5 text-[#103F2B]" />
                <span>Call Now — {business.phoneDisplay}</span>
              </a>

              {/* WhatsApp Button */}
              <a
                href={business.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-2xl bg-[#25D366] hover:bg-[#20ba59] text-white font-bold text-sm shadow-md transition-all hover:scale-[1.01] cursor-pointer"
              >
                <WhatsAppIcon className="w-5 h-5 text-white" />
                <span>Chat on WhatsApp ({business.whatsappDisplay})</span>
              </a>

              {/* Email Khushkaran */}
              {business.email && (
                <a
                  href={`mailto:${business.email}`}
                  className="w-full inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-2xl bg-white/10 hover:bg-white/15 border border-white/20 text-[#F5F3EB] font-semibold text-sm transition-colors cursor-pointer"
                >
                  <Mail className="w-4 h-4 text-[#B8DC61]" />
                  <span>Email: {business.email}</span>
                </a>
              )}

              {/* Copy Phone Number */}
              <button
                type="button"
                onClick={handleCopyPhone}
                className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 text-emerald-200/80 font-medium text-xs transition-colors cursor-pointer"
              >
                {copied ? <Check className="w-4 h-4 text-[#B8DC61]" /> : <Copy className="w-4 h-4 text-emerald-300" />}
                <span>{copied ? 'Phone Number Copied!' : 'Copy Phone Number'}</span>
              </button>

              {/* Request a Quote Link */}
              <a
                href="#quote"
                className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-white/15 hover:bg-white/20 border border-white/25 text-white font-bold text-sm transition-colors cursor-pointer"
              >
                <span>Request a Free Quote</span>
                <ArrowRight className="w-4 h-4 text-[#B8DC61]" />
              </a>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
