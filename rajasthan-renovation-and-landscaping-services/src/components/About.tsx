import React from 'react';
import { Phone, CheckCircle2, Facebook, MapPin, ShieldCheck, ArrowRight, UserCheck, Clock } from 'lucide-react';
import { business } from '../config/business';
import { WhatsAppIcon } from './Navbar';

export const About: React.FC = () => {
  return (
    <section id="about" className="py-20 lg:py-28 bg-[#F5F3EB] border-b border-stone-200 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Main Introduction Column */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-emerald-900/10 border border-emerald-900/15 text-xs font-bold uppercase tracking-wider text-[#103F2B]">
              <ShieldCheck className="w-3.5 h-3.5 text-[#245C3A]" />
              <span>Direct Workmanship &amp; Owner Accountability</span>
            </div>

            {/* Suggested Heading from Master Prompt */}
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#103F2B] tracking-tight leading-tight">
              Quality Work. Honest Service. Lasting Results.
            </h2>

            <div className="space-y-4 text-stone-700 text-base leading-relaxed">
              <p>
                <strong>{business.name}</strong> delivers high-standard outdoor living solutions, property renovations, and landscaping across Brisbane, Sunshine Coast, Gold Coast, and surrounding Queensland regions.
              </p>
              <p>
                Founded and led directly by <strong>Khushkaran</strong>, the business was built on a straightforward principle: quality outdoor work executed with honest communication, transparent pricing, and meticulous attention to every level, edge, and finish.
              </p>
              <p>
                From precision bathroom, floor, and terrace tiling to laser-guided ground preparation, durable boundary fencing, garden design, and turf maintenance—we provide dependable, comprehensive property services without the stress of multiple sub-contractors or delayed callbacks.
              </p>
            </div>

            {/* Why Queensland Homeowners Choose Khushkaran */}
            <div className="pt-2 space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#103F2B]">
                Why Homeowners Choose Us:
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="flex items-start gap-2.5 text-sm font-semibold text-stone-800">
                  <CheckCircle2 className="w-4 h-4 text-[#245C3A] shrink-0 mt-0.5" />
                  <span>Direct contact with owner Khushkaran</span>
                </div>
                <div className="flex items-start gap-2.5 text-sm font-semibold text-stone-800">
                  <CheckCircle2 className="w-4 h-4 text-[#245C3A] shrink-0 mt-0.5" />
                  <span>Honest on-site assessment &amp; transparent quotes</span>
                </div>
                <div className="flex items-start gap-2.5 text-sm font-semibold text-stone-800">
                  <CheckCircle2 className="w-4 h-4 text-[#245C3A] shrink-0 mt-0.5" />
                  <span>Proven Australian standard tiling &amp; prep</span>
                </div>
                <div className="flex items-start gap-2.5 text-sm font-semibold text-stone-800">
                  <CheckCircle2 className="w-4 h-4 text-[#245C3A] shrink-0 mt-0.5" />
                  <span>Spotless work site clean-up upon completion</span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-4 flex flex-wrap items-center gap-3">
              <a
                href={business.phoneTelLink}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-[#103F2B] hover:bg-[#18533a] text-white text-xs sm:text-sm font-bold shadow-md transition-all hover:scale-102 cursor-pointer"
              >
                <Phone className="w-4 h-4 text-[#B8DC61]" />
                <span>Call Khushkaran — {business.phoneDisplay}</span>
              </a>

              <a
                href={business.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3.5 rounded-2xl bg-[#25D366] hover:bg-[#20ba59] text-white text-xs sm:text-sm font-bold shadow-md transition-all hover:scale-102 cursor-pointer"
              >
                <WhatsAppIcon className="w-4 h-4" />
                <span>Chat on WhatsApp</span>
              </a>

              {business.facebookUrl && (
                <a
                  href={business.facebookUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-3.5 rounded-2xl bg-white hover:bg-stone-50 border border-stone-300 text-stone-700 font-semibold text-xs sm:text-sm transition-colors cursor-pointer"
                >
                  <Facebook className="w-4 h-4 text-[#1877F2]" />
                  <span>Facebook Profile</span>
                </a>
              )}
            </div>
          </div>

          {/* Business Credentials Card */}
          <div className="lg:col-span-5">
            <div className="bg-white rounded-3xl border border-stone-200/90 p-8 shadow-sm space-y-6">
              <div className="border-b border-stone-100 pb-5">
                <div className="text-xs uppercase tracking-wider text-stone-400 font-bold">
                  Verified Business Information
                </div>
                <h3 className="mt-1 text-xl font-bold text-[#103F2B]">
                  {business.name}
                </h3>
              </div>

              <div className="space-y-4 text-sm">
                <div>
                  <span className="block text-xs font-semibold text-stone-400 uppercase">Primary Contact &amp; Owner</span>
                  <span className="font-bold text-stone-900 text-base">{business.contactName}</span>
                </div>

                <div>
                  <span className="block text-xs font-semibold text-stone-400 uppercase">Direct Phone</span>
                  <a
                    href={business.phoneTelLink}
                    className="font-mono font-bold text-lg text-[#103F2B] hover:text-[#245C3A] transition-colors"
                  >
                    {business.phoneDisplay}
                  </a>
                </div>

                {business.email && (
                  <div>
                    <span className="block text-xs font-semibold text-stone-400 uppercase">Direct Email</span>
                    <a
                      href={`mailto:${business.email}`}
                      className="font-medium text-sm sm:text-base text-[#103F2B] hover:text-[#245C3A] transition-colors break-all"
                    >
                      {business.email}
                    </a>
                  </div>
                )}

                <div>
                  <span className="block text-xs font-semibold text-stone-400 uppercase">Service Coverage</span>
                  <p className="text-stone-700 text-xs mt-1 font-medium leading-relaxed">
                    Brisbane, Sunshine Coast, Gold Coast, and surrounding Queensland communities.
                  </p>
                </div>

                <div>
                  <span className="block text-xs font-semibold text-stone-400 uppercase">Operating Hours</span>
                  <p className="text-stone-700 text-xs mt-1 font-medium">
                    {business.openingHours}
                  </p>
                </div>
              </div>

              <div className="pt-2">
                <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-950 leading-relaxed">
                  <strong>Personal Commitment:</strong> We visit your property, assess the terrain, listen to your exact expectations, and provide honest, competitive pricing before any work begins.
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
