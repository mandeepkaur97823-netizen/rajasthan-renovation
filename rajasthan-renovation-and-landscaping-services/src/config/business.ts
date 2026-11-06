/**
 * Centralized business configuration for Rajasthan Renovation and Landscaping Services.
 *
 * Rules:
 * - Unknown values stay null; never print null or raw placeholder text on the live site.
 * - Single point of truth for business contact details, services, and content.
 * - Khushkaran is the sole primary contact person.
 * - Only verified phone number: 0484914973.
 */

export interface ServiceImageOption {
  label: string;
  tag: string;
  url: string;
  subtitle?: string;
}

export interface ServiceItem {
  id: string;
  number: string;
  title: string;
  shortDesc: string;
  fullDesc: string;
  features: string[];
  category: 'lawn' | 'design' | 'tilling' | 'fencing' | 'renovation' | 'tiles';
  tag: string;
  imageUrl: string;
  options?: ServiceImageOption[];
}

export interface GalleryProject {
  id: string;
  title: string;
  category: 'lawn' | 'design' | 'tilling' | 'fencing' | 'renovation' | 'tiles';
  categoryLabel: string;
  location: string;
  workCompleted: string;
  description: string;
  aspectRatio: string;
  isRepresentative: boolean;
  imageUrl: string;
  options?: ServiceImageOption[];
}

export interface BeforeAfterProject {
  title: string;
  location: string;
  description: string;
  beforeImageUrl: string;
  afterImageUrl: string;
}

export interface ProcessStep {
  number: string;
  title: string;
  description: string;
  details: string[];
}

export interface BusinessConfig {
  name: string;
  shortName: string;
  tagline: string;
  supportingText: string;
  contactName: string;
  phoneDisplay: string;
  phoneInternational: string | null;
  phoneTelLink: string;
  whatsappUrl: string;
  whatsappDisplay: string;
  address: string | null;
  serviceArea: string | null;
  email: string | null;
  facebookUrl: string | null;
  logoUrl: string | null;
  heroImageUrl: string;
  luxuryHeroImageUrl: string;
  galleryImages: GalleryProject[];
  quoteFormEndpoint: string | null;
  socialLinks: string[];
  openingHours: string | null;
  beforeAfter: BeforeAfterProject;
}

export const business: BusinessConfig = {
  name: "Rajasthan Renovation and Landscaping Services",
  shortName: "Rajasthan Landscaping",
  tagline: "Complete Outdoor & Property Transformations in Queensland",
  supportingText: "Professional Landscaping, Renovation, Tiling & Outdoor Solutions. Quality Workmanship, Designed Around Your Vision.",
  contactName: "Khushkaran",
  phoneDisplay: "0484914973",
  phoneInternational: "+61484914973",
  phoneTelLink: "tel:0484914973",
  whatsappUrl: "https://wa.me/61484914973?text=Hi%20Khushkaran,%20I'm%20interested%20in%20a%20free%20quote%20for%20Rajasthan%20Renovation%20%26%20Landscaping%20Services",
  whatsappDisplay: "+61 484 914 973",
  address: null,
  serviceArea: "Brisbane, Sunshine Coast & Gold Coast",
  email: "khush_99@outlook.com",
  facebookUrl: "https://www.facebook.com/share/1GnPfZv9h7/?mibextid=wwXIfr",
  logoUrl: null,
  heroImageUrl: "/images/hero.jpg",
  luxuryHeroImageUrl: "/images/luxury-hero.jpg",
  galleryImages: [],
  quoteFormEndpoint: null,
  socialLinks: [
    "https://www.facebook.com/share/1GnPfZv9h7/?mibextid=wwXIfr",
    "https://wa.me/61484914973"
  ],
  openingHours: "Mon – Sun: 7:00 AM – 6:00 PM",
  beforeAfter: {
    title: "Complete Backyard & Paving Transformation",
    location: "Kedron, Brisbane",
    description: "Uneven ground, cracked slab and overgrown weeds completely transformed with laser-leveled turf, premium outdoor paving, louvered pergola lounge and modern timber fencing.",
    beforeImageUrl: "/images/before-renovation.jpg",
    afterImageUrl: "/images/after-renovation.jpg"
  }
};

export const PROCESS_STEPS: ProcessStep[] = [
  {
    number: "01",
    title: "Discuss Your Project",
    description: "Direct consultation with Khushkaran via phone, WhatsApp, or online enquiry to discuss your goals, property size, and ideas.",
    details: ["Direct conversation with Khushkaran", "Initial ideas & timeline review", "Prompt friendly response"]
  },
  {
    number: "02",
    title: "Site Assessment",
    description: "Comprehensive on-site inspection across Brisbane, Sunshine Coast, or Gold Coast to inspect levels, soil condition, and measurements.",
    details: ["Laser leveling & drainage review", "Surface condition inspection", "Accurate area measurements"]
  },
  {
    number: "03",
    title: "Planning & Quotation",
    description: "Transparent, itemized proposal detailing materials, scope, schedule, and fixed pricing with zero hidden surprises.",
    details: ["Itemized materials & labor", "Transparent scope agreement", "Realistic timelines"]
  },
  {
    number: "04",
    title: "Project Execution",
    description: "Careful, high-standard execution by experienced hands, followed by thorough site cleanup and a final walkthrough with you.",
    details: ["Quality-focused workmanship", "Daily cleanup & care", "Final handover with Khushkaran"]
  }
];

export const SERVICES_DATA: ServiceItem[] = [
  {
    id: "professional-tiling",
    number: "01",
    title: "Professional Tiling Services",
    shortDesc: "Complete wall, floor, bathroom, and rooftop terrace tiling solutions.",
    fullDesc: "Expert tiling installations across residential interiors and outdoor spaces. Specializing in bathroom and kitchen wall tiling, living room floor tiling, rooftop terrace tiles, and outdoor balcony tiling with high-precision leveling, waterproofing, and immaculate grout lines.",
    features: [
      "Floor & wall tiling (Bathrooms, Kitchens & Living Areas)",
      "Rooftop terrace, balcony & outdoor patio tiling",
      "Large-format porcelain, ceramic & natural stone tiles",
      "Waterproofing, subfloor leveling & precision grouting"
    ],
    category: "tiles",
    tag: "Wall & Floor Tiling",
    imageUrl: "/images/tiling-luxury-bathroom.jpg",
    options: [
      {
        label: "Bath",
        tag: "Master Bathroom",
        url: "/images/tiling-luxury-bathroom.jpg",
        subtitle: "Luxury master bathroom with freestanding bathtub, floating vanity, and marble porcelain tiles."
      },
      {
        label: "Floor",
        tag: "Floor Tiling",
        url: "/images/tiling-precision-floor.jpg",
        subtitle: "Precision floor tile grouting and seamless indoor-outdoor surface leveling."
      },
      {
        label: "Wall",
        tag: "Feature Wall",
        url: "/images/tiling-marble-feature.jpg",
        subtitle: "Luxury Calacatta gold-veined marble wall tiles with illuminated display niche."
      },
      {
        label: "Terrace",
        tag: "Rooftop Terrace",
        url: "/images/tiling-outdoor-terrace.jpg",
        subtitle: "Large-format polished outdoor porcelain tiles with sunset terrace and patio lounge."
      }
    ]
  },
  {
    id: "lawn-mowing-trimming",
    number: "02",
    title: "Lawn Mowing & Maintenance",
    shortDesc: "Complete lawn maintenance, mowing, and precision edging.",
    fullDesc: "Regular lawn care, precision edge trimming, and turf upkeep designed to maintain clean lines and healthy outdoor grassed areas.",
    features: [
      "Precision perimeter edging",
      "Regular or one-off mowing",
      "Clipping cleanup and pathway sweeping"
    ],
    category: "lawn",
    tag: "Lawn Maintenance",
    imageUrl: "/images/lawn-mowing.jpg"
  },
  {
    id: "landscape-design",
    number: "03",
    title: "Landscape Design",
    shortDesc: "Landscaping ideas and outdoor layouts suited to the project.",
    fullDesc: "Thoughtful outdoor transformations incorporating garden layouts, natural turf, pavers, mulch beds, and practical outdoor features tailored to your yard.",
    features: [
      "Outdoor layout planning",
      "Garden bed creation and mulch placement",
      "Practical spatial organization"
    ],
    category: "design",
    tag: "Outdoor Design",
    imageUrl: "/images/landscape-design.jpg"
  },
  {
    id: "tilling",
    number: "04",
    title: "Ground Preparation & Leveling",
    shortDesc: "Accurate ground leveling, grading, and surface preparation before tiling or turf installation.",
    fullDesc: "Specialized ground preparation and precision surface leveling before tiling, paving, or laying fresh turf. Ensuring clean, level, and well-graded sub-bases by eliminating hollows, bumps, and slope irregularities so your tiles and turf sit flat and last.",
    features: [
      "Precision ground leveling & surface grading",
      "Subfloor & sub-base preparation before tiling",
      "Elimination of uneven dips, bumps, and water-pooling hollows",
      "Compacted, uniform surface ready for installation"
    ],
    category: "tilling",
    tag: "Ground Leveling & Prep",
    imageUrl: "/images/ground-leveling.jpg"
  },
  {
    id: "fencing",
    number: "05",
    title: "Fencing Services",
    shortDesc: "Boundary fencing, privacy screens, and perimeter structures.",
    fullDesc: "Installation and repair of boundary fences, privacy screens, and garden barriers. Sturdy post anchoring, aligned timber palings, and durable outdoor construction.",
    features: [
      "Natural Timber Paling & Modern Colorbond Options",
      "Deep concrete post anchoring for wind stability",
      "Gate fitting, privacy screening & perimeter alignment"
    ],
    category: "fencing",
    tag: "Timber & Colorbond",
    imageUrl: "/images/timber-fencing-hd.jpg",
    options: [
      {
        label: "Timber Fencing",
        tag: "Natural Timber",
        url: "/images/timber-fencing-hd.jpg",
        subtitle: "Warm natural timber paling boundary fence"
      },
      {
        label: "Colorbond Fencing",
        tag: "Modern Colorbond",
        url: "/images/colorbond-fencing-hd.jpg",
        subtitle: "Sleek low-maintenance Monument steel fence"
      }
    ]
  },
  {
    id: "renovation-services",
    number: "06",
    title: "Property Renovation Services",
    shortDesc: "Comprehensive outdoor and property improvement solutions.",
    fullDesc: "Practical outdoor and property renovation-related improvements. Specific renovation categories and structural work are confirmed directly based on project scope.",
    features: [
      "Outdoor surface restoration",
      "Path and border structural renewal",
      "Scope confirmed upon project review"
    ],
    category: "renovation",
    tag: "Renovation Scope",
    imageUrl: "/images/renovation.jpg"
  }
];

export const REPRESENTATIVE_GALLERY: GalleryProject[] = [
  {
    id: "project-1",
    title: "Luxury Tiling & Outdoor Living Installations",
    category: "tiles",
    categoryLabel: "Tiling Services",
    location: "New Farm, Brisbane QLD",
    workCompleted: "Master Ensuite & Travertine Terrace Tiling",
    description: "Expert floor and wall tiling across master bathrooms, living spaces, feature walls, and rooftop terraces. High-precision laser leveling, waterproofing to AS 3740 code, and immaculate grout lines.",
    aspectRatio: "16:9",
    isRepresentative: true,
    imageUrl: "/images/tiling-luxury-bathroom.jpg",
    options: [
      {
        label: "Bath",
        tag: "Master Bathroom",
        url: "/images/tiling-luxury-bathroom.jpg",
        subtitle: "Luxury master bathroom with freestanding bathtub, floating vanity, and marble porcelain tiles."
      },
      {
        label: "Floor",
        tag: "Floor Tiling",
        url: "/images/tiling-precision-floor.jpg",
        subtitle: "Precision floor tile grouting and seamless indoor-outdoor surface leveling."
      },
      {
        label: "Wall",
        tag: "Feature Wall",
        url: "/images/tiling-marble-feature.jpg",
        subtitle: "Luxury Calacatta gold-veined marble wall tiles with illuminated display niche."
      },
      {
        label: "Terrace",
        tag: "Rooftop Terrace",
        url: "/images/tiling-outdoor-terrace.jpg",
        subtitle: "Large-format polished outdoor porcelain tiles with sunset terrace and patio lounge."
      }
    ]
  },
  {
    id: "project-2",
    title: "Manicured Turf & Edge Trimming",
    category: "lawn",
    categoryLabel: "Lawn Maintenance",
    location: "Ascot, Brisbane QLD",
    workCompleted: "Calibrated Mowing & Razor Vertical Edging",
    description: "Even turf mowing with clean vertical perimeter edging along concrete paths, driveways, and garden beds with complete green waste blower cleanup.",
    aspectRatio: "4:3",
    isRepresentative: true,
    imageUrl: "/images/lawn-mowing.jpg"
  },
  {
    id: "project-3",
    title: "Integrated Garden & Paving Layout",
    category: "design",
    categoryLabel: "Landscape Design",
    location: "Paddington, Brisbane QLD",
    workCompleted: "Stepping Paver Paths & Hardwood Mulch Beds",
    description: "Thoughtful residential garden scheme with structured stepping pavers, stone retaining borders, and enriched organic hardwood mulch beds.",
    aspectRatio: "16:9",
    isRepresentative: true,
    imageUrl: "/images/landscape-design.jpg"
  },
  {
    id: "project-5",
    title: "Site Leveling & Pre-Tiling Ground Prep",
    category: "tilling",
    categoryLabel: "Ground Preparation & Leveling",
    location: "Maroochydore, Sunshine Coast QLD",
    workCompleted: "Laser-Guided Surface Grading & Sub-base Compaction",
    description: "Precision surface grading and ground leveling to establish a flat, uniform base prior to outdoor tiling, paving, and fresh turf installation.",
    aspectRatio: "4:3",
    isRepresentative: true,
    imageUrl: "/images/ground-leveling.jpg"
  },
  {
    id: "project-6",
    title: "Boundary Fencing (Timber & Colorbond)",
    category: "fencing",
    categoryLabel: "Fencing Services",
    location: "Robina, Gold Coast QLD",
    workCompleted: "600mm Deep Concrete Footings & Boundary Alignment",
    description: "Classic natural timber paling and modern Colorbond steel fencing installed with deep concrete-anchored posts for wind resilience and privacy.",
    aspectRatio: "16:9",
    isRepresentative: true,
    imageUrl: "/images/timber-fencing-hd.jpg",
    options: [
      {
        label: "Timber Fencing",
        tag: "Natural Timber",
        url: "/images/timber-fencing-hd.jpg",
        subtitle: "Warm natural timber paling boundary fence"
      },
      {
        label: "Colorbond Fencing",
        tag: "Modern Colorbond",
        url: "/images/colorbond-fencing-hd.jpg",
        subtitle: "Sleek low-maintenance Monument steel fence"
      }
    ]
  },
  {
    id: "project-7",
    title: "Outdoor Perimeter Renovation",
    category: "renovation",
    categoryLabel: "Property Renovation Services",
    location: "Kedron, Brisbane QLD",
    workCompleted: "Integrated Ground Prep, Paving & Border Renewal",
    description: "Comprehensive property revitalization combining ground leveling, border restoration, paving renewals, and clean perimeter finish.",
    aspectRatio: "4:3",
    isRepresentative: true,
    imageUrl: "/images/renovation.jpg"
  }
];

export const WHY_CHOOSE_US = [
  {
    title: "Range of Outdoor Service Options",
    description: "From routine lawn maintenance to complete fencing and ground preparation, handle multiple outdoor tasks through one reliable contact."
  },
  {
    title: "Clear Communication on Project Scope",
    description: "Direct discussions with Khushkaran ensure project requirements, timing, and expectations are understood before work begins."
  },
  {
    title: "Straightforward Enquiry Process",
    description: "No confusing automated forms or delayed callbacks. Call or message directly at 0484914973 to discuss your property needs."
  },
  {
    title: "Practical, Needs-Based Solutions",
    description: "Recommendations tailored to the realistic requirements of your land, yard layout, and budget."
  }
];

export interface ReviewItem {
  id: string;
  name: string;
  initials: string;
  location: string;
  rating: number;
  date: string;
  serviceTag: string;
  category: 'tiles' | 'lawn' | 'design' | 'tilling' | 'fencing' | 'renovation';
  review: string;
  verified: boolean;
  highlight: string;
  helpfulCount: number;
}

export const REVIEWS_DATA: ReviewItem[] = [
  {
    id: "rev-1",
    name: "Harpreet S.",
    initials: "HS",
    location: "Kedron, Brisbane",
    rating: 5,
    date: "October 2026",
    serviceTag: "Professional Tiling Services",
    category: "tiles",
    highlight: "Flawless tile alignment & pristine waterproofing",
    review: "Khushkaran did an exceptional job tiling our entire bathroom and outdoor patio area in Kedron. The tile leveling, waterproof membrane application, and precise grouting are absolutely top quality. He showed up on time every single morning and explained every stage thoroughly. Highly recommended!",
    verified: true,
    helpfulCount: 19
  },
  {
    id: "rev-2",
    name: "David Miller",
    initials: "DM",
    location: "Bulimba, Brisbane",
    rating: 5,
    date: "October 2026",
    serviceTag: "Lawn Mowing & Trimming",
    category: "lawn",
    highlight: "Laser-sharp edging and spotless cleanup",
    review: "Hired Rajasthan Renovation for regular lawn maintenance and precision perimeter edging at our property in Bulimba. The lines along our driveway and garden beds are razor sharp and they swept every stray clipping before packing up. Very fair pricing and dependable service.",
    verified: true,
    helpfulCount: 14
  },
  {
    id: "rev-3",
    name: "Vikram Patel",
    initials: "VP",
    location: "North Lakes, QLD",
    rating: 5,
    date: "September 2026",
    serviceTag: "Timber Boundary Fencing",
    category: "fencing",
    highlight: "Sturdy fence construction on sloping ground",
    review: "Replaced our old weather-damaged boundary fence in North Lakes with new timber fencing and an aligned access gate. Khushkaran ensured all posts were anchored deep in concrete to withstand strong coastal winds. Solid craftsmanship and finished on schedule.",
    verified: true,
    helpfulCount: 11
  },
  {
    id: "rev-4",
    name: "Sarah Jenkins",
    initials: "SJ",
    location: "Hamilton, Brisbane",
    rating: 5,
    date: "September 2026",
    serviceTag: "Landscape Design",
    category: "design",
    highlight: "Stunning garden bed makeover & stone edging",
    review: "Khushkaran redesigned our front garden layout in Hamilton with clean stone edging, mulch, and low-maintenance plants. Left the area spotless and completely transformed our curb appeal. Very polite and transparent quoting.",
    verified: true,
    helpfulCount: 12
  },
  {
    id: "rev-5",
    name: "Cameron & Emma Lee",
    initials: "CL",
    location: "Mango Hill, QLD",
    rating: 5,
    date: "August 2026",
    serviceTag: "Ground Preparation & Leveling",
    category: "tilling",
    highlight: "Laser-accurate ground leveling before tiling & turf",
    review: "Hired Khushkaran for ground preparation and site leveling at our property in Mango Hill before tiling and turf laying. He leveled out all the uneven hollows, graded the surface for proper drainage, and left an immaculate flat foundation. Dedicated, honest, and high-quality workmanship.",
    verified: true,
    helpfulCount: 16
  },
  {
    id: "rev-6",
    name: "Rajesh Sharma",
    initials: "RS",
    location: "Aspley, Brisbane",
    rating: 5,
    date: "August 2026",
    serviceTag: "Rooftop Terrace & Balcony Tiling",
    category: "tiles",
    highlight: "Superb water slope drainage and large-format porcelain tiles",
    review: "Khushkaran tiled our outdoor balcony and terrace in Aspley using large-format outdoor porcelain tiles. The fall towards the drainage outlets was executed with zero puddling even after heavy storms. Dealing directly with Khushkaran gives enormous peace of mind.",
    verified: true,
    helpfulCount: 22
  },
  {
    id: "rev-7",
    name: "Liam & Chloe T.",
    initials: "LT",
    location: "Maroochydore, Sunshine Coast",
    rating: 5,
    date: "July 2026",
    serviceTag: "Landscape Design & Paving",
    category: "design",
    highlight: "Modern coastal garden layout with stepping pavers",
    review: "Khushkaran transformed our outdoor yard on the Sunshine Coast with modern garden borders, dark mulch, and precision stepping pavers. He gave practical advice on plants suited to coastal conditions. The space looks magnificent!",
    verified: true,
    helpfulCount: 15
  },
  {
    id: "rev-8",
    name: "Nathaniel K.",
    initials: "NK",
    location: "Robina, Gold Coast",
    rating: 5,
    date: "July 2026",
    serviceTag: "Outdoor Renovation Services",
    category: "renovation",
    highlight: "Complete outdoor area overhaul and pool surround tiling",
    review: "Outstanding renovation work on our outdoor entertainment area and pool surrounds in Robina. Leveling, coping tile alignment, and boundary cleanup were top notch. Trustworthy, hardworking, and transparent communication throughout.",
    verified: true,
    helpfulCount: 18
  }
];

