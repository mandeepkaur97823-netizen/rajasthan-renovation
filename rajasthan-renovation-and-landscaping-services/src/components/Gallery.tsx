import React, { useState } from 'react';
import { 
  ArrowRight, 
  SlidersHorizontal, 
  Sparkles, 
  Award 
} from 'lucide-react';
import { business } from '../config/business';

export interface GalleryProps {
  onSelectServiceForEnquiry?: (serviceTitle: string) => void;
}

export const Gallery: React.FC<GalleryProps> = () => {
  const [sliderPosition, setSliderPosition] = useState<number>(50);

  return (
    <section id="work" className="py-20 lg:py-28 bg-[#F5F3EB] border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-12 space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#103F2B]/10 border border-[#103F2B]/15 text-xs font-bold uppercase tracking-wider text-[#103F2B]">
            <Sparkles className="w-3.5 h-3.5 text-[#245C3A]" />
            <span>On-Site Workmanship &amp; Transformations</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#103F2B] tracking-tight">
            Before &amp; After Transformations
          </h2>
          <p className="text-stone-600 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
            Drag the interactive slider below to see authentic on-site results of our laser ground preparation, paving, and fencing across Queensland.
          </p>
        </div>

        {/* Interactive Before & After Transformation Feature */}
        {business.beforeAfter && (
          <div className="p-6 sm:p-10 rounded-3xl bg-white border border-stone-200/90 shadow-sm space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-stone-100 pb-5">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#245C3A] flex items-center gap-1.5">
                  <SlidersHorizontal className="w-3.5 h-3.5 text-[#245C3A]" />
                  <span>Interactive Before &amp; After Showcase</span>
                </span>
                <h3 className="text-2xl sm:text-3xl font-bold text-[#103F2B] mt-1">
                  {business.beforeAfter.title}
                </h3>
                <p className="text-xs sm:text-sm text-stone-600 mt-1">
                  📍 {business.beforeAfter.location} · {business.beforeAfter.description}
                </p>
              </div>

              {/* Quick Preset Buttons */}
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setSliderPosition(0)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-colors cursor-pointer ${
                    sliderPosition <= 5
                      ? 'bg-[#103F2B] text-white shadow-xs'
                      : 'bg-[#F5F3EB] text-stone-700 hover:bg-stone-200 border border-stone-200'
                  }`}
                >
                  After
                </button>
                <button
                  type="button"
                  onClick={() => setSliderPosition(50)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-colors cursor-pointer ${
                    sliderPosition > 40 && sliderPosition < 60
                      ? 'bg-[#103F2B] text-white shadow-xs'
                      : 'bg-[#F5F3EB] text-stone-700 hover:bg-stone-200 border border-stone-200'
                  }`}
                >
                  50 / 50 Split
                </button>
                <button
                  type="button"
                  onClick={() => setSliderPosition(100)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-colors cursor-pointer ${
                    sliderPosition >= 95
                      ? 'bg-[#103F2B] text-white shadow-xs'
                      : 'bg-[#F5F3EB] text-stone-700 hover:bg-stone-200 border border-stone-200'
                  }`}
                >
                  Before
                </button>
              </div>
            </div>

            {/* Interactive Drag Comparison Slider Container */}
            <div className="relative aspect-16/10 sm:aspect-16/9 w-full max-w-5xl mx-auto rounded-2xl overflow-hidden shadow-xl select-none group border border-stone-300">
              {/* After Image */}
              <img
                src={business.beforeAfter.afterImageUrl}
                alt="Renovated luxury landscaped backyard with travertine paving, laser-leveled turf, and clean timber fencing"
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute top-4 right-4 z-10 px-3.5 py-1.5 rounded-xl bg-[#103F2B]/90 backdrop-blur-md text-xs font-bold text-white border border-[#B8DC61]/30 shadow-md">
                ✨ AFTER RENOVATION
              </div>

              {/* Before Image */}
              <div
                className="absolute inset-0 overflow-hidden"
                style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
              >
                <img
                  src={business.beforeAfter.beforeImageUrl}
                  alt="Original unrenovated residential yard before ground leveling, paving, and fencing"
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute top-4 left-4 z-10 px-3.5 py-1.5 rounded-xl bg-black/80 backdrop-blur-md text-xs font-bold text-stone-200 border border-white/20 shadow-md">
                  🏚️ BEFORE WORK
                </div>
              </div>

              {/* Vertical Divider Line with Drag Handle */}
              <div
                className="absolute top-0 bottom-0 z-20 w-1 bg-white shadow-2xl cursor-ew-resize pointer-events-none"
                style={{ left: `${sliderPosition}%` }}
              >
                <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-white text-[#103F2B] shadow-2xl border-2 border-[#245C3A] flex items-center justify-center font-bold text-xs">
                  ↔
                </div>
              </div>

              <input
                type="range"
                min="0"
                max="100"
                value={sliderPosition}
                onChange={(e) => setSliderPosition(Number(e.target.value))}
                aria-label="Drag before and after renovation slider"
                className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-30 m-0 p-0"
              />
            </div>

            <p className="text-center text-xs text-stone-500 italic">
              Drag the slider to compare original yard conditions against finished laser-leveled paving and fencing.
            </p>
          </div>
        )}

        {/* Bottom Call to Action Banner */}
        <div className="mt-12 p-6 sm:p-8 rounded-3xl bg-white border border-stone-200/90 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#245C3A] uppercase tracking-wider">
              <Award className="w-3.5 h-3.5" />
              <span>Direct Owner Oversight</span>
            </div>
            <h4 className="text-xl font-bold text-[#103F2B]">
              Have a Custom Renovation or Landscaping Project?
            </h4>
            <p className="text-xs sm:text-sm text-stone-600">
              Speak directly with Khushkaran for an honest assessment and transparent quote across Brisbane &amp; Queensland.
            </p>
          </div>
          <a
            href="#quote"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-[#103F2B] hover:bg-[#18533a] text-white font-bold text-sm transition-all shadow-md shrink-0 cursor-pointer"
          >
            <span>Request a Free Quote</span>
            <ArrowRight className="w-4 h-4 text-[#B8DC61]" />
          </a>
        </div>

      </div>
    </section>
  );
};
