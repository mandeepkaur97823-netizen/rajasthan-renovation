import React from 'react';
import { Award, Compass, MessageSquareText, ShieldCheck, Sparkles, Phone, ArrowRight } from 'lucide-react';
import { business } from '../config/business';
import { WhatsAppIcon } from './Navbar';

export const WhyChooseUs: React.FC = () => {
  const pillars = [
    {
      icon: <Award className="w-5 h-5 text-[#B8DC61]" />,
      title: "Master Workmanship",
      subtitle: "Precision Outdoor Craftsmanship",
      description: "From laser-leveled subfloors and razor-sharp tile alignment to clean-edged boundary fencing, every square metre is executed with meticulous care."
    },
    {
      icon: <Sparkles className="w-5 h-5 text-[#B8DC61]" />,
      title: "Attention to Detail",
      subtitle: "Proper Falls & Drainage",
      description: "We ensure accurate water drainage slopes, secure concrete post anchoring, and spotless job site cleanup with zero stray debris left behind."
    },
    {
      icon: <Compass className="w-5 h-5 text-[#B8DC61]" />,
      title: "Practical Recommendations",
      subtitle: "Tailored to Your Terrain",
      description: "Direct, realistic advice on materials, turf varieties, and paving options designed to withstand Queensland weather without blowing your budget."
    },
    {
      icon: <MessageSquareText className="w-5 h-5 text-[#B8DC61]" />,
      title: "Direct Communication",
      subtitle: "Khushkaran is Your Single Contact",
      description: "No middlemen or call center delays. You communicate directly with Khushkaran from first inspection through to project handover."
    }
  ];

  return (
    <section className="py-20 lg:py-28 bg-[#F5F3EB] border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16 space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-emerald-900/10 border border-emerald-900/15 text-xs font-bold uppercase tracking-wider text-[#103F2B]">
            <ShieldCheck className="w-3.5 h-3.5 text-[#245C3A]" />
            <span>Why Queensland Homeowners Choose Us</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#103F2B] tracking-tight">
            Quality-Focused Execution Built On Trust
          </h2>
          <p className="text-stone-600 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
            Every project starts with understanding your property condition and personal vision—delivering high-standard outdoor solutions with transparent communication.
          </p>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((item, index) => (
            <div
              key={item.title}
              className="p-7 bg-white rounded-3xl border border-stone-200/90 flex flex-col justify-between shadow-xs hover:shadow-xl hover:border-[#103F2B]/40 transition-all duration-300"
            >
              <div>
                <div className="w-12 h-12 rounded-2xl bg-[#103F2B] flex items-center justify-center mb-5 shadow-xs">
                  {item.icon}
                </div>
                <div className="text-[11px] font-bold text-[#245C3A] uppercase tracking-wider mb-1">
                  {item.subtitle}
                </div>
                <h3 className="text-lg font-bold text-[#103F2B] leading-snug">
                  {item.title}
                </h3>
                <p className="mt-3 text-stone-600 text-xs sm:text-sm leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-stone-100 flex items-center justify-between text-xs font-semibold text-stone-400">
                <span>Core Value</span>
                <span className="font-mono text-[#103F2B] font-bold">0{index + 1}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Verified Business Stats Strip */}
        <div className="mt-12 p-6 sm:p-8 rounded-3xl bg-white border border-stone-200/90 shadow-sm">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center divide-y md:divide-y-0 md:divide-x divide-stone-100">
            <div className="pt-2 md:pt-0">
              <div className="text-3xl sm:text-4xl font-extrabold text-[#103F2B]">100%</div>
              <div className="text-xs text-stone-500 font-medium mt-1">Direct Consultation with Khushkaran</div>
            </div>
            <div className="pt-4 md:pt-0">
              <div className="text-3xl sm:text-4xl font-extrabold text-[#245C3A]">4.9 ★</div>
              <div className="text-xs text-stone-500 font-medium mt-1">Verified Client Satisfaction</div>
            </div>
            <div className="pt-4 md:pt-0">
              <div className="text-3xl sm:text-4xl font-extrabold text-[#103F2B]">6</div>
              <div className="text-xs text-stone-500 font-medium mt-1">Specialized Outdoor Services</div>
            </div>
            <div className="pt-4 md:pt-0">
              <div className="text-3xl sm:text-4xl font-extrabold text-[#245C3A]">3</div>
              <div className="text-xs text-stone-500 font-medium mt-1">Brisbane, Sunshine &amp; Gold Coast</div>
            </div>
          </div>
        </div>

        {/* Direct Action Banner */}
        <div className="mt-12 p-7 sm:p-9 rounded-3xl bg-[#103F2B] text-white flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-xl">
          <div className="space-y-1.5">
            <div className="text-xs uppercase font-bold text-[#B8DC61] tracking-wider">
              Free Site Assessment &amp; Quote
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-white">
              Ready to start your outdoor transformation?
            </h3>
            <p className="text-xs sm:text-sm text-[#F5F3EB]/85 max-w-xl">
              Call or message Khushkaran directly to review your property requirements and organize a prompt site inspection.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <a
              href={business.phoneTelLink}
              className="px-6 py-3.5 rounded-2xl bg-[#B8DC61] hover:bg-[#a6cb50] text-[#103F2B] text-xs sm:text-sm font-bold transition-all shadow-md hover:scale-102 flex items-center gap-2 cursor-pointer"
            >
              <Phone className="w-4 h-4" />
              <span>Call {business.phoneDisplay}</span>
            </a>
            <a
              href={business.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-3.5 rounded-2xl bg-[#25D366]/20 hover:bg-[#25D366] text-[#25D366] hover:text-white border border-[#25D366]/40 text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 cursor-pointer"
            >
              <WhatsAppIcon className="w-4 h-4" />
              <span>WhatsApp</span>
            </a>
          </div>
        </div>

      </div>
    </section>
  );
};
