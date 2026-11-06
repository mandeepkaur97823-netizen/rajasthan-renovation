import React, { useState } from 'react';
import { ArrowRight, Check, Phone, ChevronLeft, ChevronRight } from 'lucide-react';
import { SERVICES_DATA, ServiceItem, business } from '../config/business';

interface ServicesProps {
  onSelectServiceForEnquiry?: (serviceTitle: string) => void;
}

const ServiceCard: React.FC<{
  service: ServiceItem;
  onSelectServiceForEnquiry?: (serviceTitle: string) => void;
}> = ({ service, onSelectServiceForEnquiry }) => {
  const [optionIndex, setOptionIndex] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  const hasOptions = !!(service.options && service.options.length > 1);
  const currentOption = hasOptions ? service.options![optionIndex] : null;
  const activeImageUrl = currentOption ? currentOption.url : service.imageUrl;
  const activeTag = currentOption ? currentOption.tag : service.tag;

  const handleNext = () => {
    if (!hasOptions) return;
    setOptionIndex((prev) => (prev + 1) % service.options!.length);
  };

  const handlePrev = () => {
    if (!hasOptions) return;
    setOptionIndex((prev) => (prev - 1 + service.options!.length) % service.options!.length);
  };

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const minSwipe = 35;
    if (distance > minSwipe) {
      handleNext();
    } else if (distance < -minSwipe) {
      handlePrev();
    }
  };

  const handleExplore = () => {
    if (onSelectServiceForEnquiry) {
      onSelectServiceForEnquiry(service.title);
    }
  };

  return (
    <article className="group flex flex-col bg-white rounded-3xl border border-stone-200/90 overflow-hidden shadow-sm hover:shadow-xl hover:border-[#103F2B]/40 transition-all duration-300">
      {/* High-Resolution Service Photograph with Subtle Hover Zoom */}
      <div 
        className="relative aspect-16/11 w-full bg-stone-900 overflow-hidden select-none"
        onTouchStart={hasOptions ? onTouchStart : undefined}
        onTouchMove={hasOptions ? onTouchMove : undefined}
        onTouchEnd={hasOptions ? onTouchEnd : undefined}
      >
        <img
          key={activeImageUrl}
          src={activeImageUrl}
          alt={currentOption ? `${service.title} - ${currentOption.label}` : service.title}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/15 to-transparent pointer-events-none" />
        
        {/* Dynamic Category Tag */}
        <div className="absolute top-4 left-4 px-3.5 py-1.5 rounded-xl bg-[#103F2B]/90 backdrop-blur-md text-[11px] font-bold text-white border border-[#B8DC61]/30 shadow-xs uppercase tracking-wider transition-all">
          {activeTag}
        </div>

        {/* If options available: Selector Pills & Controls */}
        {hasOptions && (
          <>
            <div className="absolute top-4 right-4 z-10 flex items-center bg-black/75 backdrop-blur-md rounded-xl p-1 border border-white/20 shadow-sm">
              {service.options!.map((opt, idx) => (
                <button
                  key={opt.label}
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setOptionIndex(idx);
                  }}
                  className={`px-2.5 py-1 rounded-lg text-[10px] font-bold transition-all cursor-pointer ${
                    optionIndex === idx
                      ? 'bg-[#B8DC61] text-[#103F2B] shadow-xs'
                      : 'text-stone-300 hover:text-white hover:bg-white/10'
                  }`}
                >
                  {opt.label.split(' ')[0]}
                </button>
              ))}
            </div>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                handlePrev();
              }}
              aria-label="Previous style"
              className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/60 hover:bg-black/90 text-white flex items-center justify-center backdrop-blur-md transition-all hover:scale-110 cursor-pointer shadow-md z-10"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                handleNext();
              }}
              aria-label="Next style"
              className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/60 hover:bg-black/90 text-white flex items-center justify-center backdrop-blur-md transition-all hover:scale-110 cursor-pointer shadow-md z-10"
            >
              <ChevronRight className="w-4 h-4" />
            </button>

            {/* Swipe Instruction Banner */}
            <div className="absolute bottom-3 left-4 right-14 flex items-center justify-between pointer-events-none">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-md text-[10px] font-semibold text-white/95 border border-white/15">
                <span className="w-1.5 h-1.5 rounded-full bg-[#B8DC61] animate-pulse"></span>
                <span>Swipe for {service.options![(optionIndex + 1) % service.options!.length].label.split(' ')[0]}</span>
              </span>
            </div>
          </>
        )}

        {/* Service Number Accent */}
        <div className="absolute bottom-3 right-4 px-2.5 py-1 rounded-lg bg-black/60 backdrop-blur-md font-mono text-xs font-bold text-[#B8DC61]">
          {service.number}
        </div>
      </div>

      {/* Service Card Content */}
      <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between space-y-6">
        <div className="space-y-3">
          <h3 className="text-xl sm:text-2xl font-bold text-[#103F2B] group-hover:text-[#245C3A] transition-colors leading-snug">
            {service.title}
          </h3>

          <p className="text-stone-700 text-sm font-medium leading-relaxed">
            {service.shortDesc}
          </p>

          <p className="text-stone-500 text-xs leading-relaxed">
            {service.fullDesc}
          </p>

          {/* 3 to 4 Key Features Checklist */}
          <ul className="pt-3 border-t border-stone-100 space-y-2.5">
            {service.features.map((feature, i) => (
              <li key={i} className="flex items-start gap-2.5 text-xs text-stone-700 font-medium">
                <Check className="w-4 h-4 text-[#245C3A] shrink-0 mt-0.5" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Explore Service & Enquiry Actions */}
        <div className="pt-4 border-t border-stone-100 flex items-center justify-between gap-3">
          <a
            href="#quote"
            onClick={handleExplore}
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#103F2B] hover:text-[#245C3A] transition-colors group/link cursor-pointer"
          >
            <span>Explore Service</span>
            <ArrowRight className="w-4 h-4 text-[#245C3A] transition-transform group-hover/link:translate-x-1" />
          </a>

          <a
            href={business.phoneTelLink}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-emerald-50 hover:bg-[#103F2B] text-[#103F2B] hover:text-white text-xs font-bold transition-all border border-emerald-200/60"
            aria-label={`Call Khushkaran for ${service.title}`}
          >
            <Phone className="w-3.5 h-3.5" />
            <span>Call Now</span>
          </a>
        </div>

      </div>
    </article>
  );
};

export const Services: React.FC<ServicesProps> = ({ onSelectServiceForEnquiry }) => {
  return (
    <section id="services" className="py-20 lg:py-28 bg-[#F5F3EB] border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-14 sm:mb-18 space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-emerald-900/10 border border-emerald-900/15 text-xs font-bold uppercase tracking-wider text-[#103F2B]">
            Premium Queensland Outdoor Solutions
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#103F2B] tracking-tight">
            Our Renovation &amp; Landscaping Services
          </h2>
          <p className="text-stone-600 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
            High-standard residential landscaping, precision tiling, ground prep, and outdoor renovation across Brisbane, Sunshine Coast &amp; Gold Coast.
          </p>
        </div>

        {/* 6 Visual Service Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {SERVICES_DATA.map((service) => (
            <ServiceCard 
              key={service.id} 
              service={service} 
              onSelectServiceForEnquiry={onSelectServiceForEnquiry} 
            />
          ))}
        </div>

      </div>
    </section>
  );
};
