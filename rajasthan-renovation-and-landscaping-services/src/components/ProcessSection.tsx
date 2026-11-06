import React from 'react';
import { MessageSquareText, Compass, FileCheck2, CheckCircle2, Phone, ArrowRight, Sparkles } from 'lucide-react';
import { PROCESS_STEPS, business } from '../config/business';
import { WhatsAppIcon } from './Navbar';

export const ProcessSection: React.FC = () => {
  const stepIcons = [
    <MessageSquareText key="1" className="w-6 h-6 text-[#245C3A]" />,
    <Compass key="2" className="w-6 h-6 text-[#245C3A]" />,
    <FileCheck2 key="3" className="w-6 h-6 text-[#245C3A]" />,
    <CheckCircle2 key="4" className="w-6 h-6 text-[#245C3A]" />
  ];

  const stepSubtitles = [
    "Direct communication with Khushkaran",
    "On-site measurements & drainage inspection",
    "Itemized scope with transparent costs",
    "Quality workmanship & spotless site clean-up"
  ];

  return (
    <section id="process" className="py-20 lg:py-28 bg-white border-b border-stone-200 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16 space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-emerald-900/10 border border-emerald-900/15 text-xs font-bold uppercase tracking-wider text-[#103F2B]">
            <Sparkles className="w-3.5 h-3.5 text-[#245C3A]" />
            <span>Clear, Honest &amp; Transparent Workflow</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#103F2B] tracking-tight">
            Our Simple 4-Step Process
          </h2>
          <p className="text-stone-600 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
            From initial enquiry to final inspection, experience transparent communication, reliable scheduling, and quality craftsmanship across Queensland.
          </p>
        </div>

        {/* 4 Process Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {PROCESS_STEPS.map((step, idx) => (
            <div
              key={step.number}
              className="relative p-7 rounded-3xl bg-[#F5F3EB] border border-stone-200/90 flex flex-col justify-between shadow-xs hover:shadow-xl hover:border-[#103F2B]/40 transition-all duration-300 group"
            >
              {/* Step Number & Icon */}
              <div className="flex items-center justify-between mb-6">
                <div className="w-12 h-12 rounded-2xl bg-white border border-stone-200 flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform">
                  {stepIcons[idx]}
                </div>
                <span className="font-mono text-3xl font-black text-stone-300 group-hover:text-[#245C3A] transition-colors">
                  {step.number}
                </span>
              </div>

              {/* Title & Description */}
              <div className="space-y-3 flex-1">
                <div className="text-[11px] font-bold text-[#245C3A] uppercase tracking-wider">
                  Step 0{idx + 1}
                </div>
                <h3 className="text-xl font-bold text-[#103F2B] leading-snug">
                  {step.title}
                </h3>
                <p className="text-stone-600 text-xs sm:text-sm leading-relaxed">
                  {step.description}
                </p>

                {/* Details Checkpoints */}
                <ul className="pt-4 border-t border-stone-200/60 space-y-2">
                  {step.details.map((detail, dIdx) => (
                    <li key={dIdx} className="flex items-start gap-2 text-xs text-stone-700">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#245C3A] shrink-0 mt-1" />
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Quality Commitment Tag (Replacing repetitive 100% guaranteed) */}
              <div className="mt-6 pt-4 border-t border-stone-200/60 flex items-center justify-between text-xs text-stone-500 font-medium">
                <span>Phase 0{idx + 1}</span>
                <span className="text-[#103F2B] font-bold text-[11px]">{stepSubtitles[idx]}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Action Strip */}
        <div className="mt-14 p-6 sm:p-8 rounded-3xl bg-[#103F2B] text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-1 text-center sm:text-left">
            <div className="text-xs font-bold uppercase tracking-wider text-[#B8DC61]">
              Step 01: Discuss Your Project Today
            </div>
            <h4 className="text-lg sm:text-xl font-bold text-white">
              Speak directly with Khushkaran to arrange your free site assessment
            </h4>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 shrink-0">
            <a
              href="#quote"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-[#B8DC61] hover:bg-[#a6cb50] text-[#103F2B] font-bold text-xs sm:text-sm shadow-md transition-all hover:scale-102 cursor-pointer"
            >
              <span>Request Free Quote</span>
              <ArrowRight className="w-4 h-4 text-[#103F2B]" />
            </a>

            <a
              href={business.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3.5 rounded-2xl bg-[#25D366]/20 hover:bg-[#25D366] text-[#25D366] hover:text-white border border-[#25D366]/40 font-semibold text-xs sm:text-sm transition-all cursor-pointer"
            >
              <WhatsAppIcon className="w-4 h-4" />
              <span>WhatsApp</span>
            </a>

            <a
              href={business.phoneTelLink}
              className="inline-flex items-center gap-2 px-5 py-3.5 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs sm:text-sm transition-all cursor-pointer"
            >
              <Phone className="w-4 h-4" />
              <span>{business.phoneDisplay}</span>
            </a>
          </div>
        </div>

      </div>
    </section>
  );
};
