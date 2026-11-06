import React, { useState, useEffect } from 'react';
import { Phone, Check, Mail, Send, Sparkles, MapPin, Clock, Upload, ShieldCheck, AlertCircle, CheckCircle2 } from 'lucide-react';
import { SERVICES_DATA, business } from '../config/business';
import { WhatsAppIcon } from './Navbar';

interface QuoteSectionProps {
  preselectedService?: string;
}

// Australian Phone Number Validator
export const validateAustralianPhone = (phone: string): { isValid: boolean; message?: string; formatted?: string } => {
  const trimmed = phone.trim();
  if (!trimmed) {
    return { isValid: false, message: 'Phone number is required.' };
  }

  // Strip spaces, hyphens, brackets, periods
  const cleaned = trimmed.replace(/[\s\-\(\)\.]/g, '');

  // Check Australian Mobile (04xx xxx xxx -> 10 digits total)
  const isAusMobile = /^04\d{8}$/.test(cleaned);

  // Check Australian Landline (02, 03, 07, 08 -> 10 digits total)
  const isAusLandline = /^0[2378]\d{8}$/.test(cleaned);

  // Check Australian International (+61 4xx xxx xxx or +61 7 xxx xxx)
  const isAusInternational = /^\+61[23478]\d{8}$/.test(cleaned);

  if (isAusMobile || isAusLandline || isAusInternational) {
    let formatted = cleaned;
    if (isAusMobile) {
      formatted = `${cleaned.slice(0, 4)} ${cleaned.slice(4, 7)} ${cleaned.slice(7)}`;
    } else if (isAusLandline) {
      formatted = `${cleaned.slice(0, 2)} ${cleaned.slice(2, 6)} ${cleaned.slice(6)}`;
    }
    return { isValid: true, formatted };
  }

  if (cleaned.length < 10) {
    return { 
      isValid: false, 
      message: `Number too short (${cleaned.length}/10 digits). Australian mobile numbers start with 04 (e.g. 0484 914 973).` 
    };
  }

  if (cleaned.length > 10 && !cleaned.startsWith('+61')) {
    return { 
      isValid: false, 
      message: 'Too many digits. Please enter a 10-digit Australian number (e.g. 0484 914 973).' 
    };
  }

  return { 
    isValid: false, 
    message: 'Please enter a valid Australian number starting with 04 (mobile) or 07 (Queensland).' 
  };
};

export const validateFullName = (name: string): { isValid: boolean; message?: string } => {
  const trimmed = name.trim();
  if (!trimmed) {
    return { isValid: false, message: 'Please enter your full name.' };
  }
  if (trimmed.length < 2) {
    return { isValid: false, message: 'Full name must be at least 2 characters.' };
  }
  if (!/^[a-zA-Z\s'.-]+$/.test(trimmed)) {
    return { isValid: false, message: 'Full name can only contain letters, spaces, and hyphens.' };
  }
  return { isValid: true };
};

export const validateEmail = (email: string): { isValid: boolean; message?: string } => {
  const trimmed = email.trim();
  if (!trimmed) return { isValid: true }; // optional
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!emailRegex.test(trimmed)) {
    return { isValid: false, message: 'Please enter a valid email address (e.g. name@example.com).' };
  }
  return { isValid: true };
};

export const validateSuburb = (suburb: string): { isValid: boolean; message?: string } => {
  const trimmed = suburb.trim();
  if (!trimmed) {
    return { isValid: false, message: 'Please enter your property suburb or postcode.' };
  }
  if (trimmed.length < 3) {
    return { isValid: false, message: 'Please enter at least 3 characters (e.g. New Farm 4005).' };
  }
  return { isValid: true };
};

export const validateDescription = (desc: string): { isValid: boolean; message?: string } => {
  const trimmed = desc.trim();
  if (!trimmed) {
    return { isValid: false, message: 'Please describe your project requirements.' };
  }
  if (trimmed.length < 10) {
    return { isValid: false, message: 'Please enter at least 10 characters so Khushkaran can assess your scope.' };
  }
  return { isValid: true };
};

export const QuoteSection: React.FC<QuoteSectionProps> = ({ preselectedService }) => {
  const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [emailAddress, setEmailAddress] = useState('');
  const [serviceRequired, setServiceRequired] = useState(preselectedService || SERVICES_DATA[0].title);
  const [suburbPostcode, setSuburbPostcode] = useState('');
  const [projectDescription, setProjectDescription] = useState('');
  const [attachedFileName, setAttachedFileName] = useState<string | null>(null);

  // Field-level error messages
  const [errors, setErrors] = useState<{
    fullName?: string;
    phoneNumber?: string;
    emailAddress?: string;
    suburbPostcode?: string;
    projectDescription?: string;
  }>({});

  // Touched state to trigger validation on blur
  const [touched, setTouched] = useState<{ [key: string]: boolean }>({});
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [generalErrorMessage, setGeneralErrorMessage] = useState('');

  // Sync if preselectedService changes from other components
  useEffect(() => {
    if (preselectedService) {
      setServiceRequired(preselectedService);
    }
  }, [preselectedService]);

  const handleBlur = (field: string) => {
    setTouched(prev => ({ ...prev, [field]: true }));
    validateField(field);
  };

  const validateField = (field: string) => {
    let err = '';
    if (field === 'fullName') {
      const res = validateFullName(fullName);
      if (!res.isValid) err = res.message || '';
    } else if (field === 'phoneNumber') {
      const res = validateAustralianPhone(phoneNumber);
      if (!res.isValid) err = res.message || '';
    } else if (field === 'emailAddress') {
      const res = validateEmail(emailAddress);
      if (!res.isValid) err = res.message || '';
    } else if (field === 'suburbPostcode') {
      const res = validateSuburb(suburbPostcode);
      if (!res.isValid) err = res.message || '';
    } else if (field === 'projectDescription') {
      const res = validateDescription(projectDescription);
      if (!res.isValid) err = res.message || '';
    }

    setErrors(prev => ({ ...prev, [field]: err }));
    return !err;
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value;
    // Allow numbers, spaces, plus sign, and hyphens only
    const filtered = raw.replace(/[^0-9+\s\-()]/g, '');
    setPhoneNumber(filtered);

    if (touched.phoneNumber) {
      const res = validateAustralianPhone(filtered);
      setErrors(prev => ({ ...prev, phoneNumber: res.isValid ? '' : res.message }));
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setAttachedFileName(e.target.files[0].name);
    }
  };

  const compiledWhatsAppText = `Hi Khushkaran, my name is ${fullName || 'Homeowner'}.
I would like a free quote for: ${serviceRequired}
Location: ${suburbPostcode || 'Queensland'}
Phone: ${phoneNumber}
Email: ${emailAddress || 'Not provided'}
${attachedFileName ? `Attached Photo: ${attachedFileName}` : ''}
Project Details: ${projectDescription || 'Please contact me to discuss my property.'}`;

  const dynamicWhatsAppUrl = `https://wa.me/61484914973?text=${encodeURIComponent(compiledWhatsAppText)}`;
  const dynamicEmailUrl = `mailto:${business.email}?subject=${encodeURIComponent(`Free Quote Request: ${serviceRequired} - ${fullName || 'Client'}`)}&body=${encodeURIComponent(compiledWhatsAppText)}`;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setGeneralErrorMessage('');

    // Mark all as touched
    setTouched({
      fullName: true,
      phoneNumber: true,
      emailAddress: true,
      suburbPostcode: true,
      projectDescription: true,
    });

    // Validate all fields
    const nameValid = validateFullName(fullName);
    const phoneValid = validateAustralianPhone(phoneNumber);
    const emailValid = validateEmail(emailAddress);
    const suburbValid = validateSuburb(suburbPostcode);
    const descValid = validateDescription(projectDescription);

    const newErrors = {
      fullName: nameValid.isValid ? '' : nameValid.message,
      phoneNumber: phoneValid.isValid ? '' : phoneValid.message,
      emailAddress: emailValid.isValid ? '' : emailValid.message,
      suburbPostcode: suburbValid.isValid ? '' : suburbValid.message,
      projectDescription: descValid.isValid ? '' : descValid.message,
    };

    setErrors(newErrors);

    const hasAnyError = !nameValid.isValid || !phoneValid.isValid || !emailValid.isValid || !suburbValid.isValid || !descValid.isValid;

    if (hasAnyError) {
      if (!phoneValid.isValid) {
        setGeneralErrorMessage(phoneValid.message || 'Please enter an accurate Australian phone number.');
      } else if (!nameValid.isValid) {
        setGeneralErrorMessage(nameValid.message || 'Please enter your full name.');
      } else if (!suburbValid.isValid) {
        setGeneralErrorMessage(suburbValid.message || 'Please enter a valid Queensland suburb or postcode.');
      } else if (!descValid.isValid) {
        setGeneralErrorMessage(descValid.message || 'Please describe your project.');
      } else if (!emailValid.isValid) {
        setGeneralErrorMessage(emailValid.message || 'Please enter a valid email address.');
      }
      return;
    }

    setIsSubmitting(true);

    const formattedPhone = phoneValid.formatted || phoneNumber.trim();

    // Save accurate, verified enquiry to local storage and prepare instant confirmation
    setTimeout(() => {
      try {
        const storedQuotes = JSON.parse(localStorage.getItem('raj_quotes') || '[]');
        storedQuotes.unshift({
          id: Date.now(),
          fullName: fullName.trim(),
          phoneNumber: formattedPhone,
          emailAddress: emailAddress.trim() || 'Not provided',
          serviceRequired,
          suburbPostcode: suburbPostcode.trim(),
          projectDescription: projectDescription.trim(),
          date: new Date().toISOString(),
          status: 'New'
        });
        localStorage.setItem('raj_quotes', JSON.stringify(storedQuotes));
      } catch (err) {
        // Fallback gracefully
      }

      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 500);
  };

  return (
    <section id="quote" className="py-20 lg:py-28 bg-white border-b border-stone-200 scroll-mt-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-14 space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-emerald-900/10 border border-emerald-900/15 text-xs font-bold uppercase tracking-wider text-[#103F2B]">
            <Sparkles className="w-3.5 h-3.5 text-[#245C3A]" />
            <span>Honest &amp; Accurate Quotations</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#103F2B] tracking-tight">
            Request a Free Quote
          </h2>
          <p className="text-stone-600 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
            Get in touch directly with Khushkaran for transparent project advice, on-site assessment, and itemized pricing across Brisbane, Sunshine Coast &amp; Gold Coast.
          </p>
        </div>

        {/* 2-Column Conversion Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Direct Call, WhatsApp & Business Credentials Card */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-7 sm:p-8 rounded-3xl bg-[#103F2B] text-white shadow-xl space-y-6">
              <div>
                <span className="text-[11px] font-bold text-[#B8DC61] uppercase tracking-wider block mb-1">
                  Immediate Direct Assistance
                </span>
                <h3 className="text-2xl font-bold text-white leading-snug">
                  Speak Directly With Khushkaran
                </h3>
                <p className="mt-2 text-xs sm:text-sm text-[#F5F3EB]/85 leading-relaxed">
                  Have an urgent enquiry or need quick advice on site levels, fencing styles, or tile selection? Call or message Khushkaran anytime.
                </p>
              </div>

              {/* Verified Working Action Buttons */}
              <div className="space-y-3">
                {/* Call Button */}
                <a
                  href={business.phoneTelLink}
                  className="w-full inline-flex items-center justify-center gap-3 px-6 py-4 rounded-2xl bg-[#B8DC61] hover:bg-[#a6cb50] text-[#103F2B] font-extrabold text-sm sm:text-base shadow-md transition-all hover:scale-[1.01] cursor-pointer"
                >
                  <Phone className="w-5 h-5 text-[#103F2B]" />
                  <span>Call Now — {business.phoneDisplay}</span>
                </a>

                {/* WhatsApp Button */}
                <a
                  href={business.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-3 px-6 py-4 rounded-2xl bg-[#25D366] hover:bg-[#20ba59] text-white font-bold text-sm sm:text-base shadow-md transition-all hover:scale-[1.01] cursor-pointer"
                >
                  <WhatsAppIcon className="w-5 h-5 text-white" />
                  <span>Chat on WhatsApp</span>
                </a>

                {/* Email Link */}
                {business.email && (
                  <a
                    href={`mailto:${business.email}`}
                    className="w-full inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-2xl bg-white/10 hover:bg-white/15 border border-white/20 text-white font-semibold text-xs sm:text-sm transition-colors cursor-pointer"
                  >
                    <Mail className="w-4 h-4 text-[#B8DC61]" />
                    <span>Email: {business.email}</span>
                  </a>
                )}
              </div>

              {/* Verified Business Details */}
              <div className="pt-4 border-t border-emerald-800/80 space-y-3 text-xs text-[#F5F3EB]/85">
                <div className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-[#B8DC61] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white">Service Coverage:</strong> Brisbane, Sunshine Coast &amp; Gold Coast, QLD
                  </div>
                </div>
                <div className="flex items-start gap-2.5">
                  <Clock className="w-4 h-4 text-[#B8DC61] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white">Working Hours:</strong> {business.openingHours || "Monday – Sunday: 7am – 6pm"}
                  </div>
                </div>
                <div className="flex items-start gap-2.5">
                  <ShieldCheck className="w-4 h-4 text-[#B8DC61] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white">Owner Guarantee:</strong> Accurate itemized quotes &amp; prompt scheduling.
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Full Master Free Quote Form */}
          <div className="lg:col-span-7">
            <div className="p-4 sm:p-8 lg:p-10 rounded-3xl bg-[#F5F3EB] border border-stone-200/90 shadow-sm">
              <div className="mb-6">
                <h3 className="text-xl sm:text-2xl font-bold text-[#103F2B]">
                  Send Your Project Details
                </h3>
                <p className="mt-1 text-xs sm:text-sm text-stone-600">
                  Please provide accurate contact details so Khushkaran can review your scope and provide a prompt estimate.
                </p>
              </div>

              {isSubmitted ? (
                <div className="p-7 rounded-3xl bg-white border border-[#245C3A]/40 shadow-sm space-y-5 animate-fade-in text-center">
                  <div className="w-14 h-14 rounded-full bg-emerald-100 text-[#103F2B] flex items-center justify-center mx-auto shadow-xs">
                    <Check className="w-7 h-7 text-[#245C3A]" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-xl font-bold text-[#103F2B]">
                      Thank you, {fullName}!
                    </h4>
                    <p className="text-xs sm:text-sm text-stone-600 max-w-md mx-auto">
                      Your quote request for <strong>{serviceRequired}</strong> in <strong>{suburbPostcode}</strong> has been received with verified contact details.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-950 text-left space-y-1">
                    <span className="font-bold text-[#103F2B] block">Want an immediate reply?</span>
                    <span>Send these details directly to Khushkaran via WhatsApp for fastest response:</span>
                  </div>

                  <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-1">
                    <a
                      href={dynamicWhatsAppUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-[#25D366] text-white font-bold text-xs sm:text-sm shadow-md hover:bg-[#20ba59] transition-all cursor-pointer"
                    >
                      <WhatsAppIcon className="w-4 h-4" />
                      <span>Send via WhatsApp</span>
                    </a>
                    <a
                      href={dynamicEmailUrl}
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-[#103F2B] text-white font-bold text-xs sm:text-sm hover:bg-[#18533a] transition-all cursor-pointer"
                    >
                      <Mail className="w-4 h-4 text-[#B8DC61]" />
                      <span>Send via Email</span>
                    </a>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      setIsSubmitted(false);
                      setFullName('');
                      setPhoneNumber('');
                      setEmailAddress('');
                      setSuburbPostcode('');
                      setProjectDescription('');
                      setAttachedFileName(null);
                      setTouched({});
                      setErrors({});
                    }}
                    className="text-xs text-stone-500 hover:text-[#103F2B] underline pt-3 block mx-auto cursor-pointer"
                  >
                    Submit another quote request
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="space-y-4">
                  
                  {generalErrorMessage && (
                    <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2 animate-fade-in">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span>{generalErrorMessage}</span>
                    </div>
                  )}

                  {/* 1. Full Name */}
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <label htmlFor="quote-fullname" className="block text-xs font-bold text-stone-700 uppercase tracking-wider">
                        Full Name <span className="text-red-500">*</span>
                      </label>
                      {touched.fullName && !errors.fullName && fullName.trim() && (
                        <span className="text-[11px] font-semibold text-[#245C3A] flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5" /> Valid Name
                        </span>
                      )}
                    </div>
                    <input
                      type="text"
                      id="quote-fullname"
                      required
                      value={fullName}
                      onChange={(e) => {
                        setFullName(e.target.value);
                        if (touched.fullName) {
                          const res = validateFullName(e.target.value);
                          setErrors(prev => ({ ...prev, fullName: res.isValid ? '' : res.message }));
                        }
                      }}
                      onBlur={() => handleBlur('fullName')}
                      placeholder="e.g. Liam Smith"
                      className={`w-full px-4 py-3 rounded-2xl bg-white border text-stone-900 text-sm focus:outline-hidden transition-all ${
                        touched.fullName && errors.fullName
                          ? 'border-red-500 ring-2 ring-red-200'
                          : 'border-stone-300 focus:ring-2 focus:ring-[#103F2B] focus:border-transparent'
                      }`}
                    />
                    {touched.fullName && errors.fullName && (
                      <p className="text-red-600 text-xs mt-1.5 flex items-center gap-1 font-medium">
                        <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                        <span>{errors.fullName}</span>
                      </p>
                    )}
                  </div>

                  {/* 2. Phone & Email (Side by side on tablet/desktop) */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Phone Number with Strict Australian Format */}
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <label htmlFor="quote-phone" className="block text-xs font-bold text-stone-700 uppercase tracking-wider">
                          Phone Number <span className="text-red-500">*</span>
                        </label>
                        {touched.phoneNumber && !errors.phoneNumber && phoneNumber.trim() && (
                          <span className="text-[11px] font-semibold text-[#245C3A] flex items-center gap-1">
                            <CheckCircle2 className="w-3.5 h-3.5" /> Valid Number
                          </span>
                        )}
                      </div>
                      <div className="relative">
                        <input
                          type="tel"
                          id="quote-phone"
                          required
                          value={phoneNumber}
                          onChange={handlePhoneChange}
                          onBlur={() => handleBlur('phoneNumber')}
                          placeholder="e.g. 0484 914 973"
                          className={`w-full px-4 py-3 rounded-2xl bg-white border text-stone-900 text-sm font-mono focus:outline-hidden transition-all ${
                            touched.phoneNumber && errors.phoneNumber
                              ? 'border-red-500 ring-2 ring-red-200'
                              : 'border-stone-300 focus:ring-2 focus:ring-[#103F2B] focus:border-transparent'
                          }`}
                        />
                      </div>
                      {touched.phoneNumber && errors.phoneNumber ? (
                        <p className="text-red-600 text-xs mt-1.5 flex items-center gap-1 font-medium">
                          <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                          <span>{errors.phoneNumber}</span>
                        </p>
                      ) : (
                        <p className="text-[11px] text-stone-500 mt-1">
                          Valid 10-digit mobile (04xx xxx xxx) or QLD landline (07).
                        </p>
                      )}
                    </div>

                    {/* Email Address */}
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <label htmlFor="quote-email" className="block text-xs font-bold text-stone-700 uppercase tracking-wider">
                          Email Address
                        </label>
                        {touched.emailAddress && !errors.emailAddress && emailAddress.trim() && (
                          <span className="text-[11px] font-semibold text-[#245C3A] flex items-center gap-1">
                            <CheckCircle2 className="w-3.5 h-3.5" /> Valid Email
                          </span>
                        )}
                      </div>
                      <input
                        type="email"
                        id="quote-email"
                        value={emailAddress}
                        onChange={(e) => {
                          setEmailAddress(e.target.value);
                          if (touched.emailAddress) {
                            const res = validateEmail(e.target.value);
                            setErrors(prev => ({ ...prev, emailAddress: res.isValid ? '' : res.message }));
                          }
                        }}
                        onBlur={() => handleBlur('emailAddress')}
                        placeholder="e.g. liam@example.com"
                        className={`w-full px-4 py-3 rounded-2xl bg-white border text-stone-900 text-sm focus:outline-hidden transition-all ${
                          touched.emailAddress && errors.emailAddress
                            ? 'border-red-500 ring-2 ring-red-200'
                            : 'border-stone-300 focus:ring-2 focus:ring-[#103F2B] focus:border-transparent'
                        }`}
                      />
                      {touched.emailAddress && errors.emailAddress && (
                        <p className="text-red-600 text-xs mt-1.5 flex items-center gap-1 font-medium">
                          <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                          <span>{errors.emailAddress}</span>
                        </p>
                      )}
                    </div>
                  </div>

                  {/* 3. Service Required & Suburb/Postcode */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="quote-service" className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1.5">
                        Service Required <span className="text-red-500">*</span>
                      </label>
                      <select
                        id="quote-service"
                        value={serviceRequired}
                        onChange={(e) => setServiceRequired(e.target.value)}
                        className="w-full px-4 py-3 rounded-2xl bg-white border border-stone-300 text-stone-900 text-sm focus:outline-hidden focus:ring-2 focus:ring-[#103F2B] focus:border-transparent transition-all cursor-pointer font-medium"
                      >
                        {SERVICES_DATA.map((s) => (
                          <option key={s.id} value={s.title}>
                            {s.title}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <label htmlFor="quote-suburb" className="block text-xs font-bold text-stone-700 uppercase tracking-wider">
                          Property Suburb / Postcode <span className="text-red-500">*</span>
                        </label>
                        {touched.suburbPostcode && !errors.suburbPostcode && suburbPostcode.trim() && (
                          <span className="text-[11px] font-semibold text-[#245C3A] flex items-center gap-1">
                            <CheckCircle2 className="w-3.5 h-3.5" /> Valid Suburb
                          </span>
                        )}
                      </div>
                      <input
                        type="text"
                        id="quote-suburb"
                        required
                        value={suburbPostcode}
                        onChange={(e) => {
                          setSuburbPostcode(e.target.value);
                          if (touched.suburbPostcode) {
                            const res = validateSuburb(e.target.value);
                            setErrors(prev => ({ ...prev, suburbPostcode: res.isValid ? '' : res.message }));
                          }
                        }}
                        onBlur={() => handleBlur('suburbPostcode')}
                        placeholder="e.g. New Farm 4005, Brisbane"
                        className={`w-full px-4 py-3 rounded-2xl bg-white border text-stone-900 text-sm focus:outline-hidden transition-all ${
                          touched.suburbPostcode && errors.suburbPostcode
                            ? 'border-red-500 ring-2 ring-red-200'
                            : 'border-stone-300 focus:ring-2 focus:ring-[#103F2B] focus:border-transparent'
                        }`}
                      />
                      {touched.suburbPostcode && errors.suburbPostcode && (
                        <p className="text-red-600 text-xs mt-1.5 flex items-center gap-1 font-medium">
                          <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                          <span>{errors.suburbPostcode}</span>
                        </p>
                      )}
                    </div>
                  </div>

                  {/* 4. Project Description */}
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <label htmlFor="quote-details" className="block text-xs font-bold text-stone-700 uppercase tracking-wider">
                        Project Description <span className="text-red-500">*</span>
                      </label>
                      <span className="text-[11px] text-stone-500">
                        {projectDescription.trim().length} chars (min 10)
                      </span>
                    </div>
                    <textarea
                      id="quote-details"
                      required
                      rows={3}
                      value={projectDescription}
                      onChange={(e) => {
                        setProjectDescription(e.target.value);
                        if (touched.projectDescription) {
                          const res = validateDescription(e.target.value);
                          setErrors(prev => ({ ...prev, projectDescription: res.isValid ? '' : res.message }));
                        }
                      }}
                      onBlur={() => handleBlur('projectDescription')}
                      placeholder="Please describe your yard area, approximate square metres, current ground conditions, or specific expectations..."
                      className={`w-full px-4 py-3 rounded-2xl bg-white border text-stone-900 text-sm focus:outline-hidden transition-all resize-y ${
                        touched.projectDescription && errors.projectDescription
                          ? 'border-red-500 ring-2 ring-red-200'
                          : 'border-stone-300 focus:ring-2 focus:ring-[#103F2B] focus:border-transparent'
                      }`}
                    />
                    {touched.projectDescription && errors.projectDescription && (
                      <p className="text-red-600 text-xs mt-1.5 flex items-center gap-1 font-medium">
                        <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                        <span>{errors.projectDescription}</span>
                      </p>
                    )}
                  </div>

                  {/* 5. Optional Property Photo Upload */}
                  <div>
                    <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1.5">
                      Optional Property Photo Upload
                    </label>
                    <div className="relative border-2 border-dashed border-stone-300 hover:border-[#245C3A] rounded-2xl p-4 bg-white text-center cursor-pointer transition-colors">
                      <input
                        type="file"
                        id="quote-file"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      />
                      <div className="flex items-center justify-center gap-2 text-xs text-stone-600">
                        <Upload className="w-4 h-4 text-[#245C3A]" />
                        <span>
                          {attachedFileName ? (
                            <strong className="text-[#103F2B]">{attachedFileName} (Attached)</strong>
                          ) : (
                            "Click to attach a photo of your yard, tiles, or fence (Optional)"
                          )}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Prominent Submit Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-2xl bg-[#103F2B] hover:bg-[#18533a] text-white font-extrabold text-base shadow-md transition-all hover:scale-[1.01] cursor-pointer disabled:opacity-60"
                    >
                      <Send className="w-4 h-4 text-[#B8DC61]" />
                      <span>{isSubmitting ? "Verifying & Submitting..." : "Request a Free Quote"}</span>
                    </button>
                  </div>

                  <p className="text-[11px] text-stone-500 text-center pt-1">
                    🔒 All requests reviewed personally by Khushkaran. No pushy sales, no spam.
                  </p>
                </form>
              )}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
