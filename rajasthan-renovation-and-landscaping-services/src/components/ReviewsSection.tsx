import React, { useState } from 'react';
import { 
  Star, 
  CheckCircle2, 
  ThumbsUp, 
  MessageSquarePlus, 
  ShieldCheck, 
  Sparkles, 
  X, 
  PhoneCall, 
  ChevronRight,
  ChevronDown,
  ChevronUp,
  Filter
} from 'lucide-react';
import { REVIEWS_DATA, ReviewItem, business } from '../config/business';

export const ReviewsSection: React.FC = () => {
  const [reviews, setReviews] = useState<ReviewItem[]>(REVIEWS_DATA);
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [visibleCount, setVisibleCount] = useState<number>(4);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [helpfulLiked, setHelpfulLiked] = useState<Record<string, boolean>>({});
  const [newReviewSuccess, setNewReviewSuccess] = useState(false);

  // New review form state
  const [formName, setFormName] = useState('');
  const [formLocation, setFormLocation] = useState('');
  const [formServiceTag, setFormServiceTag] = useState('Professional Tiling Services');
  const [formCategory, setFormCategory] = useState<'tiles' | 'lawn' | 'design' | 'tilling' | 'fencing' | 'renovation'>('tiles');
  const [formRating, setFormRating] = useState(5);
  const [formHoverRating, setFormHoverRating] = useState(0);
  const [formHighlight, setFormHighlight] = useState('');
  const [formReview, setFormReview] = useState('');

  const filterTabs = [
    { id: 'all', label: 'All Reviews' },
    { id: 'tiles', label: 'Tiling Services' },
    { id: 'lawn', label: 'Lawn & Care' },
    { id: 'design', label: 'Landscape Design' },
    { id: 'fencing', label: 'Fencing' },
    { id: 'tilling', label: 'Ground Prep & Leveling' },
  ];

  const filteredReviews = activeCategory === 'all'
    ? reviews
    : reviews.filter((r) => r.category === activeCategory);

  const displayedReviews = filteredReviews.slice(0, visibleCount);

  const handleHelpful = (id: string) => {
    if (helpfulLiked[id]) return;
    setHelpfulLiked((prev) => ({ ...prev, [id]: true }));
    setReviews((prev) =>
      prev.map((r) => (r.id === id ? { ...r, helpfulCount: r.helpfulCount + 1 } : r))
    );
  };

  const handleServiceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const val = e.target.value;
    setFormServiceTag(val);
    if (val.includes('Tiling')) setFormCategory('tiles');
    else if (val.includes('Lawn')) setFormCategory('lawn');
    else if (val.includes('Fencing')) setFormCategory('fencing');
    else if (val.includes('Design')) setFormCategory('design');
    else if (val.includes('Preparation') || val.includes('Leveling') || val.includes('Tilling')) setFormCategory('tilling');
    else setFormCategory('renovation');
  };

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName.trim() || !formReview.trim()) return;

    const initials = formName
      .trim()
      .split(' ')
      .map((n) => n[0])
      .slice(0, 2)
      .join('')
      .toUpperCase() || 'CU';

    const newReview: ReviewItem = {
      id: `rev-user-${Date.now()}`,
      name: formName.trim(),
      initials,
      location: formLocation.trim() || 'Brisbane, QLD',
      rating: formRating,
      date: 'Just now',
      serviceTag: formServiceTag,
      category: formCategory,
      highlight: formHighlight.trim() || 'Verified Client Experience',
      review: formReview.trim(),
      verified: true,
      helpfulCount: 0
    };

    setReviews([newReview, ...reviews]);
    setNewReviewSuccess(true);
    setTimeout(() => {
      setNewReviewSuccess(false);
      setIsModalOpen(false);
      // Reset form
      setFormName('');
      setFormLocation('');
      setFormHighlight('');
      setFormReview('');
    }, 1500);
  };

  return (
    <section id="reviews" className="py-20 lg:py-28 bg-[#F6F4ED] border-b border-stone-200 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-emerald-900/10 border border-emerald-900/15 text-xs font-bold uppercase tracking-wider text-[#123D2B] mb-3">
              <ShieldCheck className="w-3.5 h-3.5 text-[#76A94B]" />
              <span>Verified Client Feedback</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#123D2B] tracking-tight">
              What Homeowners Say About Khushkaran’s Work
            </h2>
            <p className="mt-3 text-stone-600 text-base leading-relaxed">
              Real testimonials from clients across Brisbane, Sunshine Coast, Gold Coast, and surrounding Queensland suburbs who trusted us with their tiling, lawn care, fencing, and outdoor projects.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <a
              href="https://www.google.com/search?q=Rajasthan+Renovation+and+Landscaping+Services"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-white border border-stone-300 text-stone-800 text-xs sm:text-sm font-bold hover:bg-stone-50 transition-all shadow-xs"
            >
              <div className="flex text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                ))}
              </div>
              <span>Google Reviews (4.9 ★)</span>
            </a>

            <button
              onClick={() => setIsModalOpen(true)}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-[#103F2B] text-white text-xs sm:text-sm font-bold hover:bg-[#18533a] transition-all shadow-sm hover:shadow-md group cursor-pointer"
            >
              <MessageSquarePlus className="w-4 h-4 text-[#B8DC61] group-hover:scale-110 transition-transform" />
              <span>Write a Review</span>
            </button>
          </div>
        </div>

        {/* Aggregate Ratings & Highlights Card */}
        <div className="mb-12 p-6 sm:p-8 rounded-2xl bg-white border border-stone-200 shadow-xs grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Big Score Block */}
          <div className="lg:col-span-4 flex flex-col items-center lg:items-start text-center lg:text-left border-b lg:border-b-0 lg:border-r border-stone-100 pb-6 lg:pb-0 lg:pr-8">
            <div className="flex items-baseline gap-2">
              <span className="text-5xl font-black text-[#152e1b] tracking-tight">4.9</span>
              <span className="text-stone-400 font-semibold text-lg">/ 5.0</span>
            </div>
            
            {/* 5 Stars */}
            <div className="flex items-center gap-1 mt-2 text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-amber-400" />
              ))}
            </div>

            <p className="mt-2 text-xs font-medium text-stone-500">
              Overall rating based on <span className="font-bold text-stone-700">{reviews.length + 42} verified local jobs</span>
            </p>

            <div className="mt-4 flex items-center gap-2 text-xs font-semibold text-emerald-800 bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-200/60">
              <Sparkles className="w-3.5 h-3.5 text-[#70b431]" />
              100% Direct owner accountability
            </div>
          </div>

          {/* Breakdown Bars */}
          <div className="lg:col-span-5 space-y-2 text-xs font-medium text-stone-600">
            <div className="flex items-center gap-3">
              <span className="w-12 shrink-0 text-stone-700 font-semibold">5 Stars</span>
              <div className="flex-1 h-2.5 bg-stone-100 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-amber-400 to-[#70b431] rounded-full w-[95%]"></div>
              </div>
              <span className="w-10 text-right text-stone-400">95%</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="w-12 shrink-0 text-stone-700 font-semibold">4 Stars</span>
              <div className="flex-1 h-2.5 bg-stone-100 rounded-full overflow-hidden">
                <div className="h-full bg-amber-400 rounded-full w-[5%]"></div>
              </div>
              <span className="w-10 text-right text-stone-400">5%</span>
            </div>
            <div className="flex items-center gap-3 opacity-40">
              <span className="w-12 shrink-0">3 Stars</span>
              <div className="flex-1 h-2.5 bg-stone-100 rounded-full overflow-hidden">
                <div className="h-full bg-amber-400 rounded-full w-0"></div>
              </div>
              <span className="w-10 text-right">0%</span>
            </div>
            <div className="flex items-center gap-3 opacity-40">
              <span className="w-12 shrink-0">2 Stars</span>
              <div className="flex-1 h-2.5 bg-stone-100 rounded-full overflow-hidden">
                <div className="h-full bg-amber-400 rounded-full w-0"></div>
              </div>
              <span className="w-10 text-right">0%</span>
            </div>
            <div className="flex items-center gap-3 opacity-40">
              <span className="w-12 shrink-0">1 Star</span>
              <div className="flex-1 h-2.5 bg-stone-100 rounded-full overflow-hidden">
                <div className="h-full bg-amber-400 rounded-full w-0"></div>
              </div>
              <span className="w-10 text-right">0%</span>
            </div>
          </div>

          {/* Quick Pillars */}
          <div className="lg:col-span-3 flex flex-col gap-3 justify-center border-t lg:border-t-0 lg:border-l border-stone-100 pt-6 lg:pt-0 lg:pl-8 text-xs">
            <div className="flex items-center gap-2.5 text-stone-700">
              <CheckCircle2 className="w-4 h-4 text-[#70b431] shrink-0" />
              <span>Prompt on-site arrival &amp; clean-up</span>
            </div>
            <div className="flex items-center gap-2.5 text-stone-700">
              <CheckCircle2 className="w-4 h-4 text-[#70b431] shrink-0" />
              <span>Clear written/verbal quotes</span>
            </div>
            <div className="flex items-center gap-2.5 text-stone-700">
              <CheckCircle2 className="w-4 h-4 text-[#70b431] shrink-0" />
              <span>High-grade waterproofing &amp; leveling</span>
            </div>
            <div className="flex items-center gap-2.5 text-stone-700">
              <CheckCircle2 className="w-4 h-4 text-[#70b431] shrink-0" />
              <span>Direct communication with Khushkaran</span>
            </div>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 no-scrollbar">
          <Filter className="w-4 h-4 text-stone-400 shrink-0 mr-1" />
          {filterTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                setActiveCategory(tab.id);
                setVisibleCount(4);
              }}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 whitespace-nowrap cursor-pointer ${
                activeCategory === tab.id
                  ? 'bg-[#123D2B] text-white shadow-xs'
                  : 'bg-white text-stone-600 hover:bg-stone-100 border border-stone-200'
              }`}
            >
              {tab.label}
              {tab.id !== 'all' && (
                <span className="ml-1.5 opacity-70 text-[11px]">
                  ({reviews.filter((r) => r.category === tab.id).length})
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Reviews Grid (Balanced 2-column grid: 4 cards = 2x2 rows) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {displayedReviews.map((item) => (
            <div
              key={item.id}
              className="p-6 sm:p-7 bg-white rounded-2xl border border-stone-200/90 shadow-2xs hover:shadow-md hover:border-emerald-700/30 transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                {/* Header: User Info & Verified */}
                <div className="flex items-start justify-between gap-3 mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#123D2B] to-[#1e543b] text-white font-extrabold text-sm flex items-center justify-center shadow-xs">
                      {item.initials}
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-sm font-bold text-[#123D2B]">{item.name}</span>
                        {item.verified && (
                          <span title="Verified Client Project">
                            <CheckCircle2 className="w-3.5 h-3.5 text-[#76A94B]" />
                          </span>
                        )}
                      </div>
                      <div className="text-[11px] text-stone-400 font-medium">
                        {item.location} • {item.date}
                      </div>
                    </div>
                  </div>

                  {/* Rating Stars */}
                  <div className="flex items-center gap-0.5 text-amber-400 shrink-0">
                    {[...Array(item.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400" />
                    ))}
                  </div>
                </div>

                {/* Service Tag */}
                <div className="mb-3">
                  <span className="inline-block px-2.5 py-0.5 rounded-md text-[11px] font-semibold bg-stone-100 text-[#123D2B] border border-stone-200/60">
                    {item.serviceTag}
                  </span>
                </div>

                {/* Highlight Quote */}
                <h4 className="text-sm font-bold text-[#123D2B] mb-2 leading-snug">
                  "{item.highlight}"
                </h4>

                {/* Review Body */}
                <p className="text-stone-600 text-xs sm:text-sm leading-relaxed">
                  {item.review}
                </p>
              </div>

              {/* Card Footer: Helpful Button */}
              <div className="mt-5 pt-3.5 border-t border-stone-100 flex items-center justify-between text-xs text-stone-400">
                <span className="text-[11px] font-medium text-emerald-800/80 bg-emerald-50 px-2 py-0.5 rounded">
                  Verified Local Project
                </span>
                <button
                  onClick={() => handleHelpful(item.id)}
                  disabled={helpfulLiked[item.id]}
                  className={`inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-md transition-colors cursor-pointer ${
                    helpfulLiked[item.id]
                      ? 'text-[#76A94B] font-semibold bg-emerald-50'
                      : 'text-stone-500 hover:text-stone-800 hover:bg-stone-100'
                  }`}
                  title="Was this review helpful?"
                >
                  <ThumbsUp className="w-3.5 h-3.5" />
                  <span>Helpful ({item.helpfulCount})</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* See More / Show Less Toggle Button */}
        {filteredReviews.length > 4 && (
          <div className="mt-10 flex flex-col items-center justify-center">
            {visibleCount < filteredReviews.length ? (
              <button
                type="button"
                onClick={() => setVisibleCount((prev) => Math.min(prev + 4, filteredReviews.length))}
                className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-xl bg-white border-2 border-[#123D2B] text-[#123D2B] font-bold text-sm hover:bg-[#123D2B] hover:text-white transition-all duration-200 shadow-xs hover:shadow-md group cursor-pointer"
              >
                <span>See More Reviews ({filteredReviews.length - visibleCount} more)</span>
                <ChevronDown className="w-4 h-4 text-[#76A94B] group-hover:text-white transition-colors animate-bounce" />
              </button>
            ) : (
              <button
                type="button"
                onClick={() => {
                  setVisibleCount(4);
                  document.getElementById('reviews')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="inline-flex items-center gap-2 px-7 py-3 rounded-xl bg-white border border-stone-300 text-stone-700 font-bold text-sm hover:bg-stone-100 transition-all duration-200 shadow-xs group cursor-pointer"
              >
                <span>Show Less</span>
                <ChevronUp className="w-4 h-4 text-stone-500 group-hover:text-stone-800 transition-colors" />
              </button>
            )}
            <p className="mt-2.5 text-xs text-stone-500 font-medium">
              Showing {displayedReviews.length} of {filteredReviews.length} verified reviews
            </p>
          </div>
        )}

        {/* Bottom Banner */}
        <div className="mt-12 p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-[#1b3b22] to-[#254f2e] text-white flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-md">
          <div className="max-w-xl">
            <h3 className="text-lg sm:text-xl font-bold">
              Ready to experience our quality workmanship firsthand?
            </h3>
            <p className="mt-1 text-sm text-emerald-100/80">
              Speak directly with Khushkaran today to discuss your project requirements or arrange an on-site visit.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <a
              href={business.phoneTelLink}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#70b431] text-white text-sm font-bold hover:bg-[#80ca39] transition-all shadow-sm group"
            >
              <PhoneCall className="w-4 h-4 group-hover:scale-110 transition-transform" />
              Call {business.phoneDisplay}
            </a>
            <a
              href="#quote"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white text-sm font-semibold transition-all backdrop-blur-xs border border-white/15"
            >
              Request a Free Quote
              <ChevronRight className="w-4 h-4" />
            </a>
          </div>
        </div>

      </div>

      {/* Write a Review Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-stone-200 relative max-h-[90vh] overflow-y-auto">
            
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-5 right-5 p-1 rounded-lg text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="mb-6">
              <div className="text-xs font-bold uppercase tracking-wider text-[#346b3e] mb-1">
                Share Your Feedback
              </div>
              <h3 className="text-xl sm:text-2xl font-extrabold text-[#152e1b]">
                Write a Customer Review
              </h3>
              <p className="text-xs sm:text-sm text-stone-500 mt-1">
                Help fellow homeowners by sharing your experience with Khushkaran.
              </p>
            </div>

            {newReviewSuccess ? (
              <div className="py-12 text-center">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-[#70b431] flex items-center justify-center mx-auto mb-4 animate-bounce">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h4 className="text-lg font-bold text-[#152e1b]">Thank You for Your Review!</h4>
                <p className="text-sm text-stone-600 mt-1">
                  Your feedback has been published and added to the testimonials list.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmitReview} className="space-y-4">
                
                {/* Rating Stars Selector */}
                <div>
                  <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1.5">
                    Your Rating *
                  </label>
                  <div className="flex items-center gap-1.5">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        type="button"
                        key={star}
                        onClick={() => setFormRating(star)}
                        onMouseEnter={() => setFormHoverRating(star)}
                        onMouseLeave={() => setFormHoverRating(0)}
                        className="p-1 text-amber-400 hover:scale-110 transition-transform cursor-pointer"
                      >
                        <Star
                          className={`w-7 h-7 ${
                            (formHoverRating || formRating) >= star
                              ? 'fill-amber-400 text-amber-400'
                              : 'text-stone-300'
                          }`}
                        />
                      </button>
                    ))}
                    <span className="ml-2 text-xs font-bold text-stone-600">
                      {formRating} of 5 Stars
                    </span>
                  </div>
                </div>

                {/* Name & Suburb */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. John S."
                      value={formName}
                      onChange={(e) => setFormName(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-sm focus:outline-hidden focus:border-[#1b3b22] focus:ring-2 focus:ring-[#70b431]/30 transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                      Suburb / City
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Kedron, Brisbane"
                      value={formLocation}
                      onChange={(e) => setFormLocation(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-sm focus:outline-hidden focus:border-[#1b3b22] focus:ring-2 focus:ring-[#70b431]/30 transition-all"
                    />
                  </div>
                </div>

                {/* Service Category */}
                <div>
                  <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                    Service Completed *
                  </label>
                  <select
                    value={formServiceTag}
                    onChange={handleServiceChange}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-sm bg-white focus:outline-hidden focus:border-[#1b3b22] focus:ring-2 focus:ring-[#70b431]/30 transition-all"
                  >
                    <option value="Professional Tiling Services">Professional Tiling Services</option>
                    <option value="Lawn Mowing & Trimming">Lawn Mowing &amp; Trimming</option>
                    <option value="Landscape Design">Landscape Design</option>
                    <option value="Ground Preparation & Leveling">Ground Preparation &amp; Leveling</option>
                    <option value="Timber Boundary Fencing">Timber Boundary Fencing</option>
                    <option value="Outdoor Renovation Services">Outdoor Renovation Services</option>
                  </select>
                </div>

                {/* Review Highlight / Headline */}
                <div>
                  <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                    Review Headline / Summary
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Spotless grouting and very reliable!"
                    value={formHighlight}
                    onChange={(e) => setFormHighlight(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-sm focus:outline-hidden focus:border-[#1b3b22] focus:ring-2 focus:ring-[#70b431]/30 transition-all"
                  />
                </div>

                {/* Detailed Review */}
                <div>
                  <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                    Your Detailed Experience *
                  </label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Describe how Khushkaran handled your project, the quality of workmanship, punctuality, and cleanup..."
                    value={formReview}
                    onChange={(e) => setFormReview(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-sm focus:outline-hidden focus:border-[#1b3b22] focus:ring-2 focus:ring-[#70b431]/30 transition-all resize-none"
                  ></textarea>
                </div>

                {/* Actions */}
                <div className="pt-2 flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-4 py-2.5 rounded-xl text-sm font-semibold text-stone-600 hover:bg-stone-100 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-xl bg-[#1b3b22] text-white text-sm font-bold hover:bg-[#254f2e] transition-colors shadow-xs"
                  >
                    Submit Review
                  </button>
                </div>

              </form>
            )}

          </div>
        </div>
      )}

    </section>
  );
};
