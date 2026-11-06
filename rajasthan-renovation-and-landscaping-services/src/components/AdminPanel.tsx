import React, { useState, useEffect } from 'react';
import { 
  Lock, 
  Unlock, 
  LogOut, 
  CheckCircle2, 
  Clock, 
  Phone, 
  Mail, 
  MapPin, 
  Star, 
  Trash2, 
  Plus, 
  Search, 
  Download, 
  ExternalLink, 
  ShieldCheck, 
  Save, 
  AlertCircle, 
  Eye, 
  EyeOff, 
  Home, 
  Settings, 
  Users, 
  FileText, 
  RefreshCw,
  Sparkles,
  ArrowRight,
  ChevronRight,
  TrendingUp,
  Activity,
  Layers,
  Check,
  Calendar,
  MessageSquare,
  Wrench,
  Filter,
  Power
} from 'lucide-react';
import { business } from '../config/business';
import { WhatsAppIcon } from './Navbar';

const ADMIN_PASSWORD = '12345678';

export interface StoredQuote {
  id: number;
  fullName: string;
  phoneNumber: string;
  emailAddress: string;
  serviceRequired: string;
  suburbPostcode: string;
  projectDescription: string;
  date: string;
  status?: 'New' | 'Contacted' | 'Quote Sent' | 'Completed';
}

export interface AdminReview {
  id: string;
  author: string;
  location: string;
  rating: number;
  text: string;
  date: string;
  service: string;
}

const DEFAULT_SAMPLE_QUOTES: StoredQuote[] = [
  {
    id: 1730000001,
    fullName: "David Henderson",
    phoneNumber: "0418 234 567",
    emailAddress: "david.henderson@gmail.com",
    serviceRequired: "Fencing Services",
    suburbPostcode: "Sunnybank, Brisbane QLD",
    projectDescription: "Looking to replace our old damaged boundary fence with 1.8m Monument Colorbond along back boundary (approx 26 meters). Need quote including old fence removal.",
    date: new Date(Date.now() - 3600000 * 2).toISOString(),
    status: 'New'
  },
  {
    id: 1730000002,
    fullName: "Sarah Jenkins",
    phoneNumber: "0422 891 234",
    emailAddress: "sarah.jenkins@outlook.com",
    serviceRequired: "Professional Tiling Services",
    suburbPostcode: "New Farm, Brisbane QLD",
    projectDescription: "Renovating our ground floor terrace and ensuite. Need precision floor tile leveling and outdoor large format porcelain tiles laid.",
    date: new Date(Date.now() - 3600000 * 18).toISOString(),
    status: 'Contacted'
  },
  {
    id: 1730000003,
    fullName: "Mark Williamson",
    phoneNumber: "0433 778 899",
    emailAddress: "mark.w@yahoo.com.au",
    serviceRequired: "Ground Preparation & Leveling",
    suburbPostcode: "Hope Island, Gold Coast QLD",
    projectDescription: "Uneven residential yard with high spots and dips. Need laser leveling and sub-base preparation before paving and fresh turf installation.",
    date: new Date(Date.now() - 3600000 * 36).toISOString(),
    status: 'Quote Sent'
  }
];

const DEFAULT_REVIEWS: AdminReview[] = [
  {
    id: 'rev-1',
    author: 'Michael Thornton',
    location: 'Ascot, Brisbane',
    rating: 5,
    text: 'Khushkaran did an outstanding job on our backyard renovation and tiling. Very punctual, honest pricing, and left the site spotless.',
    date: '2 weeks ago',
    service: 'Outdoor Tiling & Paving'
  },
  {
    id: 'rev-2',
    author: 'Emily & Ben Clarke',
    location: 'Sunnybank, Brisbane',
    rating: 5,
    text: 'Replaced our boundary fence with modern Colorbond. Heavy wind-resistant concrete footings and dead-straight alignment. Highly recommended!',
    date: '1 month ago',
    service: 'Colorbond Fencing'
  },
  {
    id: 'rev-3',
    author: 'Marcus Vance',
    location: 'Hope Island, Gold Coast',
    rating: 5,
    text: 'Laser ground leveling and lawn prep completed ahead of schedule. Khushkaran personally oversaw every step.',
    date: '2 months ago',
    service: 'Ground Leveling & Prep'
  }
];

export interface AdminPanelProps {
  onBackToSite: () => void;
  siteStatus?: 'online' | 'offline';
  onToggleSiteStatus?: (status: 'online' | 'offline') => void;
}

export const AdminPanel: React.FC<AdminPanelProps> = ({ 
  onBackToSite,
  siteStatus: propSiteStatus,
  onToggleSiteStatus 
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [passwordInput, setPasswordInput] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [loginError, setLoginError] = useState<string>('');

  // Website status state ('online' | 'offline')
  const [siteStatus, setSiteStatus] = useState<'online' | 'offline'>(() => {
    if (propSiteStatus) return propSiteStatus;
    try {
      const saved = localStorage.getItem('raj_site_status');
      return saved === 'offline' ? 'offline' : 'online';
    } catch {
      return 'online';
    }
  });
  const [statusNotification, setStatusNotification] = useState<string>('');

  useEffect(() => {
    if (propSiteStatus) {
      setSiteStatus(propSiteStatus);
    }
  }, [propSiteStatus]);

  const handleToggleSiteStatus = () => {
    const nextStatus = siteStatus === 'online' ? 'offline' : 'online';
    setSiteStatus(nextStatus);
    try {
      localStorage.setItem('raj_site_status', nextStatus);
    } catch (err) {
      console.error(err);
    }
    if (onToggleSiteStatus) {
      onToggleSiteStatus(nextStatus);
    }
    setStatusNotification(
      nextStatus === 'offline'
        ? 'Website is now OFFLINE (Maintenance Mode active for public visitors).'
        : 'Website is now LIVE (Publicly accessible to customers).'
    );
    setTimeout(() => setStatusNotification(''), 4500);
  };

  const [activeTab, setActiveTab] = useState<'quotes' | 'reviews' | 'settings'>('quotes');
  const [quotes, setQuotes] = useState<StoredQuote[]>([]);
  const [reviews, setReviews] = useState<AdminReview[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [serviceFilter, setServiceFilter] = useState<string>('all');

  // Business settings state
  const [settingsSaved, setSettingsSaved] = useState<boolean>(false);
  const [contactName, setContactName] = useState<string>(business.contactName);
  const [phoneDisplay, setPhoneDisplay] = useState<string>(business.phoneDisplay);
  const [email, setEmail] = useState<string>(business.email || '');
  const [serviceArea, setServiceArea] = useState<string>(business.serviceArea || '');

  // New review form
  const [newReviewAuthor, setNewReviewAuthor] = useState('');
  const [newReviewLocation, setNewReviewLocation] = useState('');
  const [newReviewRating, setNewReviewRating] = useState(5);
  const [newReviewService, setNewReviewService] = useState('Professional Tiling Services');
  const [newReviewText, setNewReviewText] = useState('');
  const [reviewSuccess, setReviewSuccess] = useState(false);

  // Check existing session
  useEffect(() => {
    const sessionAuth = sessionStorage.getItem('raj_admin_authenticated');
    if (sessionAuth === 'true') {
      setIsAuthenticated(true);
    }
    loadData();
  }, []);

  const loadData = () => {
    try {
      const storedQuotesStr = localStorage.getItem('raj_quotes');
      if (storedQuotesStr) {
        const parsed = JSON.parse(storedQuotesStr);
        setQuotes(Array.isArray(parsed) && parsed.length > 0 ? parsed : DEFAULT_SAMPLE_QUOTES);
      } else {
        setQuotes(DEFAULT_SAMPLE_QUOTES);
        localStorage.setItem('raj_quotes', JSON.stringify(DEFAULT_SAMPLE_QUOTES));
      }
    } catch {
      setQuotes(DEFAULT_SAMPLE_QUOTES);
    }

    try {
      const storedReviewsStr = localStorage.getItem('raj_admin_reviews');
      if (storedReviewsStr) {
        setReviews(JSON.parse(storedReviewsStr));
      } else {
        setReviews(DEFAULT_REVIEWS);
        localStorage.setItem('raj_admin_reviews', JSON.stringify(DEFAULT_REVIEWS));
      }
    } catch {
      setReviews(DEFAULT_REVIEWS);
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordInput.trim() === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      sessionStorage.setItem('raj_admin_authenticated', 'true');
      setLoginError('');
      loadData();
    } else {
      setLoginError('Incorrect password! Please enter password 12345678.');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('raj_admin_authenticated');
    setPasswordInput('');
  };

  const handleUpdateStatus = (quoteId: number, newStatus: StoredQuote['status']) => {
    const updated = quotes.map(q => q.id === quoteId ? { ...q, status: newStatus } : q);
    setQuotes(updated);
    localStorage.setItem('raj_quotes', JSON.stringify(updated));
  };

  const handleDeleteQuote = (quoteId: number) => {
    if (window.confirm('Delete this customer lead?')) {
      const updated = quotes.filter(q => q.id !== quoteId);
      setQuotes(updated);
      localStorage.setItem('raj_quotes', JSON.stringify(updated));
    }
  };

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReviewAuthor.trim() || !newReviewText.trim()) return;

    const newRev: AdminReview = {
      id: `rev-${Date.now()}`,
      author: newReviewAuthor.trim(),
      location: newReviewLocation.trim() || 'Brisbane QLD',
      rating: newReviewRating,
      text: newReviewText.trim(),
      date: 'Just now',
      service: newReviewService
    };

    const updated = [newRev, ...reviews];
    setReviews(updated);
    localStorage.setItem('raj_admin_reviews', JSON.stringify(updated));
    setReviewSuccess(true);
    setNewReviewAuthor('');
    setNewReviewLocation('');
    setNewReviewText('');
    setTimeout(() => setReviewSuccess(false), 3000);
  };

  const handleDeleteReview = (reviewId: string) => {
    if (window.confirm('Delete this customer review?')) {
      const updated = reviews.filter(r => r.id !== reviewId);
      setReviews(updated);
      localStorage.setItem('raj_admin_reviews', JSON.stringify(updated));
    }
  };

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    const customSettings = {
      contactName,
      phoneDisplay,
      email,
      serviceArea
    };
    localStorage.setItem('raj_custom_settings', JSON.stringify(customSettings));
    setSettingsSaved(true);
    setTimeout(() => setSettingsSaved(false), 3000);
  };

  const exportQuotesToCSV = () => {
    const headers = ['ID', 'Full Name', 'Phone', 'Email', 'Service Required', 'Suburb/Postcode', 'Date', 'Status', 'Description'];
    const rows = quotes.map(q => [
      q.id,
      `"${q.fullName}"`,
      `"${q.phoneNumber}"`,
      `"${q.emailAddress}"`,
      `"${q.serviceRequired}"`,
      `"${q.suburbPostcode}"`,
      `"${new Date(q.date).toLocaleString()}"`,
      `"${q.status || 'New'}"`,
      `"${q.projectDescription.replace(/"/g, '""')}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `rajasthan-renovation-leads-${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const filteredQuotes = quotes.filter(q => {
    const matchesSearch = 
      q.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.phoneNumber.includes(searchQuery) ||
      q.suburbPostcode.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.serviceRequired.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || (q.status || 'New') === statusFilter;
    const matchesService = serviceFilter === 'all' || q.serviceRequired.toLowerCase().includes(serviceFilter.toLowerCase());
    return matchesSearch && matchesStatus && matchesService;
  });

  // Calculate statistics
  const newLeadsCount = quotes.filter(q => !q.status || q.status === 'New').length;
  const contactedCount = quotes.filter(q => q.status === 'Contacted').length;
  const completedCount = quotes.filter(q => q.status === 'Completed').length;

  // Helper to extract customer initials for professional avatar
  const getInitials = (name: string) => {
    const parts = name.trim().split(/\s+/);
    if (parts.length >= 2) return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
    return name.slice(0, 2).toUpperCase() || 'CU';
  };

  // If not authenticated, render Login Screen
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#07160f] flex flex-col justify-center items-center p-4 relative overflow-hidden font-sans">
        {/* Ambient atmospheric lighting */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-[#B8DC61]/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute -bottom-20 -right-20 w-[400px] h-[400px] bg-[#103F2B]/60 rounded-full blur-[100px] pointer-events-none" />

        <div className="relative w-full max-w-md bg-stone-900/95 backdrop-blur-2xl border border-emerald-900/50 rounded-3xl p-8 sm:p-10 shadow-2xl text-white">
          {/* Header */}
          <div className="text-center space-y-3 mb-8">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-[#B8DC61] to-[#103F2B] text-[#103F2B] shadow-xl border border-[#B8DC61]/40 mb-1">
              <Lock className="w-6 h-6 stroke-[2.5]" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Rajasthan Renovation
            </h1>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-800/60 text-xs font-semibold text-[#B8DC61]">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Executive CRM &amp; Lead Management Portal</span>
            </div>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-xs font-bold text-stone-300 uppercase tracking-wider mb-2">
                Administrator Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  placeholder="Enter password..."
                  required
                  autoFocus
                  className="w-full bg-black/70 border border-stone-700/80 focus:border-[#B8DC61] rounded-2xl px-4 py-3.5 text-white placeholder-stone-500 text-sm focus:outline-none focus:ring-2 focus:ring-[#B8DC61]/30 transition-all pr-12 font-mono tracking-wider"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-stone-400 hover:text-white transition-colors cursor-pointer"
                  aria-label="Toggle password visibility"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              <p className="text-[11px] text-stone-500 mt-1.5">
                Default Access Password: <span className="font-mono text-stone-400">12345678</span>
              </p>
            </div>

            {loginError && (
              <div className="p-3.5 rounded-xl bg-red-950/70 border border-red-500/50 text-red-200 text-xs flex items-center gap-2 animate-fade-in">
                <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
                <span>{loginError}</span>
              </div>
            )}

            <button
              type="submit"
              className="w-full py-4 rounded-2xl bg-[#B8DC61] hover:bg-[#a6cb50] text-[#103F2B] font-extrabold text-sm sm:text-base shadow-xl transition-all hover:scale-[1.01] cursor-pointer flex items-center justify-center gap-2"
            >
              <Unlock className="w-4 h-4" />
              <span>Unlock Admin Dashboard</span>
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-stone-800/80 text-center">
            <button
              type="button"
              onClick={onBackToSite}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-stone-400 hover:text-white transition-colors cursor-pointer"
            >
              <Home className="w-3.5 h-3.5 text-[#B8DC61]" />
              <span>Return to Public Website</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Modern Executive CRM Dashboard Layout (Sidebar + Topbar + Content Console)
  return (
    <div className="min-h-screen bg-[#F0EEE6] flex font-sans text-stone-900 antialiased">
      
      {/* 1. PROFESSIONAL DARK SIDEBAR */}
      <aside className="w-72 bg-[#091811] border-r border-emerald-950/70 flex flex-col justify-between shrink-0 hidden lg:flex text-white select-none">
        <div>
          {/* Brand Header */}
          <div className="p-6 border-b border-emerald-950/80">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#B8DC61] to-[#103F2B] flex items-center justify-center shadow-lg border border-[#B8DC61]/40">
                <ShieldCheck className="w-5 h-5 text-[#103F2B]" />
              </div>
              <div className="min-w-0">
                <h1 className="text-sm font-bold text-white truncate">
                  Rajasthan Renovation
                </h1>
                <div className="flex items-center gap-1.5 text-[11px] text-emerald-400 mt-0.5">
                  <span className="w-2 h-2 rounded-full bg-[#B8DC61] animate-pulse" />
                  <span>Localhost 3000 Active</span>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Website Power Switch Card in Sidebar */}
          <div className="mx-4 mt-4 p-3.5 rounded-2xl bg-white/5 border border-white/10 space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400">Website Status</span>
              <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-extrabold ${
                siteStatus === 'online' 
                  ? 'bg-emerald-500/20 text-[#B8DC61] border border-emerald-500/30' 
                  : 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
              }`}>
                <span className={`w-1.5 h-1.5 rounded-full ${siteStatus === 'online' ? 'bg-[#B8DC61] animate-pulse' : 'bg-rose-400'}`} />
                {siteStatus === 'online' ? 'LIVE' : 'OFFLINE'}
              </span>
            </div>

            <button
              type="button"
              onClick={handleToggleSiteStatus}
              className={`w-full py-2 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm ${
                siteStatus === 'online'
                  ? 'bg-rose-950/50 hover:bg-rose-900/70 text-rose-200 border border-rose-800/50'
                  : 'bg-[#B8DC61] hover:bg-[#a6cb50] text-[#103F2B] font-extrabold'
              }`}
            >
              <Power className="w-3.5 h-3.5" />
              <span>{siteStatus === 'online' ? 'Turn Site OFF' : 'Turn Site ON'}</span>
            </button>
          </div>

          {/* Navigation Menu */}
          <div className="p-4 space-y-1.5">
            <div className="px-3 py-2 text-[10px] font-extrabold uppercase tracking-widest text-emerald-500/80">
              Operations &amp; Leads
            </div>

            <button
              type="button"
              onClick={() => setActiveTab('quotes')}
              className={`w-full flex items-center justify-between px-3.5 py-3 rounded-2xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'quotes'
                  ? 'bg-[#103F2B] text-white shadow-md border border-[#B8DC61]/30'
                  : 'text-stone-400 hover:bg-white/5 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-3">
                <FileText className={`w-4 h-4 ${activeTab === 'quotes' ? 'text-[#B8DC61]' : 'text-stone-400'}`} />
                <span>Customer Leads</span>
              </div>
              {newLeadsCount > 0 && (
                <span className="px-2 py-0.5 rounded-full bg-[#B8DC61] text-[#103F2B] text-[10px] font-extrabold">
                  {newLeadsCount} New
                </span>
              )}
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('reviews')}
              className={`w-full flex items-center justify-between px-3.5 py-3 rounded-2xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'reviews'
                  ? 'bg-[#103F2B] text-white shadow-md border border-[#B8DC61]/30'
                  : 'text-stone-400 hover:bg-white/5 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-3">
                <Star className={`w-4 h-4 ${activeTab === 'reviews' ? 'text-[#B8DC61]' : 'text-stone-400'}`} />
                <span>Verified Reviews</span>
              </div>
              <span className="text-[11px] text-stone-500 font-normal">
                {reviews.length}
              </span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('settings')}
              className={`w-full flex items-center justify-between px-3.5 py-3 rounded-2xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'settings'
                  ? 'bg-[#103F2B] text-white shadow-md border border-[#B8DC61]/30'
                  : 'text-stone-400 hover:bg-white/5 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-3">
                <Settings className={`w-4 h-4 ${activeTab === 'settings' ? 'text-[#B8DC61]' : 'text-stone-400'}`} />
                <span>Business Settings</span>
              </div>
            </button>
          </div>
        </div>

        {/* Sidebar Footer User Profile */}
        <div className="p-4 border-t border-emerald-950/80 space-y-3">
          <div className="p-3.5 rounded-2xl bg-white/5 border border-white/5 flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#103F2B] border border-[#B8DC61]/40 flex items-center justify-center text-xs font-extrabold text-[#B8DC61]">
              K
            </div>
            <div className="min-w-0 flex-1">
              <div className="text-xs font-bold text-white truncate">Khushkaran</div>
              <div className="text-[10px] text-stone-400 truncate">Owner &amp; Super Admin</div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={onBackToSite}
              className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-white/5 hover:bg-white/10 text-[11px] font-semibold text-stone-300 hover:text-white transition-colors cursor-pointer"
            >
              <ExternalLink className="w-3.5 h-3.5 text-[#B8DC61]" />
              <span>View Site</span>
            </button>

            <button
              type="button"
              onClick={handleLogout}
              className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-red-950/30 hover:bg-red-950/60 text-[11px] font-semibold text-red-300 transition-colors cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </aside>

      {/* 2. MAIN APPLICATION CONSOLE */}
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        
        {/* Top Console Bar */}
        <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-stone-200/90 px-4 sm:px-8 py-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            {/* Mobile Tab Switcher */}
            <div className="lg:hidden flex items-center gap-1 bg-stone-100 p-1 rounded-xl">
              <button
                onClick={() => setActiveTab('quotes')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold cursor-pointer ${activeTab === 'quotes' ? 'bg-[#103F2B] text-white' : 'text-stone-600'}`}
              >
                Leads
              </button>
              <button
                onClick={() => setActiveTab('reviews')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold cursor-pointer ${activeTab === 'reviews' ? 'bg-[#103F2B] text-white' : 'text-stone-600'}`}
              >
                Reviews
              </button>
              <button
                onClick={() => setActiveTab('settings')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold cursor-pointer ${activeTab === 'settings' ? 'bg-[#103F2B] text-white' : 'text-stone-600'}`}
              >
                Settings
              </button>
            </div>

            <div className="hidden sm:block">
              <div className="flex items-center gap-2 text-xs text-stone-500 font-medium">
                <span>Rajasthan Renovation</span>
                <ChevronRight className="w-3.5 h-3.5 text-stone-400" />
                <span className="text-[#103F2B] font-bold capitalize">
                  {activeTab === 'quotes' ? 'Customer Leads Pipeline' : activeTab === 'reviews' ? 'Verified Reviews' : 'Business Settings'}
                </span>
              </div>
              <h2 className="text-lg font-extrabold text-[#103F2B] tracking-tight">
                {activeTab === 'quotes' ? 'Lead Management & CRM Hub' : activeTab === 'reviews' ? 'Client Reviews Management' : 'Business Credentials'}
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2.5 sm:gap-3">
            {/* Quick Site Power Switch */}
            <button
              type="button"
              onClick={handleToggleSiteStatus}
              className={`inline-flex items-center gap-2 px-3 sm:px-3.5 py-2 rounded-xl text-xs font-bold transition-all border cursor-pointer ${
                siteStatus === 'online'
                  ? 'bg-rose-50 hover:bg-rose-100 text-rose-700 border-rose-200 shadow-xs'
                  : 'bg-emerald-600 hover:bg-emerald-700 text-white border-emerald-700 shadow-sm'
              }`}
              title={siteStatus === 'online' ? 'Click to turn website OFF (Maintenance Mode)' : 'Click to turn website ON (Go Live)'}
            >
              <Power className="w-3.5 h-3.5 shrink-0" />
              <span className="hidden sm:inline">
                {siteStatus === 'online' ? 'Turn Site OFF' : 'Turn Site ON'}
              </span>
              <span className={`w-2 h-2 rounded-full ${siteStatus === 'online' ? 'bg-emerald-500 animate-pulse' : 'bg-rose-500'}`} />
            </button>

            <button
              type="button"
              onClick={exportQuotesToCSV}
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#103F2B] hover:bg-[#18533a] text-white text-xs font-bold shadow-xs transition-colors cursor-pointer"
            >
              <Download className="w-3.5 h-3.5 text-[#B8DC61]" />
              <span className="hidden sm:inline">Export CSV</span>
            </button>

            <button
              type="button"
              onClick={onBackToSite}
              className="lg:hidden inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-stone-100 text-stone-700 text-xs font-bold cursor-pointer"
            >
              <ExternalLink className="w-3.5 h-3.5 text-[#103F2B]" />
              <span>Site</span>
            </button>

            <button
              type="button"
              onClick={handleLogout}
              className="lg:hidden inline-flex items-center justify-center p-2 rounded-xl bg-rose-50 text-rose-600 hover:bg-rose-100 text-xs font-bold cursor-pointer"
              title="Logout"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </header>

        {/* Real-time Status Notification Toast */}
        {statusNotification && (
          <div className="mx-4 sm:mx-8 mt-4 p-3.5 rounded-2xl bg-[#091811] text-white text-xs font-semibold flex items-center justify-between shadow-xl border border-emerald-500/40 animate-fade-in">
            <div className="flex items-center gap-2.5">
              <span className={`w-2 h-2 rounded-full ${siteStatus === 'online' ? 'bg-[#B8DC61] animate-pulse' : 'bg-rose-400'}`} />
              <span className="text-stone-100">{statusNotification}</span>
            </div>
            <button 
              type="button"
              onClick={() => setStatusNotification('')}
              className="text-stone-400 hover:text-white text-xs px-2 py-0.5 cursor-pointer"
            >
              ✕
            </button>
          </div>
        )}

        {/* Offline Persistent Warning Banner */}
        {siteStatus === 'offline' && !statusNotification && (
          <div className="mx-4 sm:mx-8 mt-4 p-4 rounded-2xl bg-amber-500/15 border border-amber-500/40 text-amber-950 text-xs sm:text-sm font-medium flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-xs">
            <div className="flex items-center gap-2.5">
              <span className="w-3 h-3 rounded-full bg-amber-500 animate-pulse shrink-0" />
              <span>
                <strong>Website is currently OFFLINE (Maintenance Mode active).</strong> Public visitors see the luxury maintenance page with direct phone/WhatsApp contact links.
              </span>
            </div>
            <button
              type="button"
              onClick={handleToggleSiteStatus}
              className="inline-flex items-center justify-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold shrink-0 cursor-pointer shadow-xs transition-colors"
            >
              <Power className="w-3.5 h-3.5 text-[#B8DC61]" />
              <span>Turn Site Back Online</span>
            </button>
          </div>
        )}

        {/* Dashboard Main View Container */}
        <main className="p-4 sm:p-8 space-y-8 max-w-7xl">
          
          {/* Executive KPI Metric Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            
            {/* KPI 1 */}
            <div className="bg-white p-5 sm:p-6 rounded-3xl border border-stone-200/90 shadow-sm relative overflow-hidden group hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-stone-400">Total Enquiries</span>
                <div className="w-9 h-9 rounded-xl bg-emerald-50 text-[#103F2B] flex items-center justify-center font-bold">
                  <FileText className="w-4 h-4" />
                </div>
              </div>
              <div className="mt-3 flex items-baseline gap-2">
                <div className="text-3xl font-extrabold text-[#103F2B]">{quotes.length}</div>
                <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full flex items-center gap-0.5">
                  <TrendingUp className="w-3 h-3" /> Live
                </span>
              </div>
              <p className="text-xs text-stone-500 mt-1">Verified quotes logged</p>
            </div>

            {/* KPI 2 */}
            <div className="bg-white p-5 sm:p-6 rounded-3xl border border-stone-200/90 shadow-sm relative overflow-hidden group hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-stone-400">Action Required</span>
                <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center font-bold">
                  <Clock className="w-4 h-4" />
                </div>
              </div>
              <div className="mt-3 flex items-baseline gap-2">
                <div className="text-3xl font-extrabold text-amber-600">{newLeadsCount}</div>
                <span className="text-[11px] font-bold text-amber-800 bg-amber-50 px-2 py-0.5 rounded-full">
                  New Leads
                </span>
              </div>
              <p className="text-xs text-stone-500 mt-1">Awaiting Khushkaran's call</p>
            </div>

            {/* KPI 3 */}
            <div className="bg-white p-5 sm:p-6 rounded-3xl border border-stone-200/90 shadow-sm relative overflow-hidden group hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-stone-400">Google Reputation</span>
                <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-500 flex items-center justify-center font-bold">
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                </div>
              </div>
              <div className="mt-3 flex items-baseline gap-2">
                <div className="text-3xl font-extrabold text-[#103F2B]">4.9 ★</div>
                <span className="text-[11px] font-bold text-stone-600 bg-stone-100 px-2 py-0.5 rounded-full">
                  48+ Reviews
                </span>
              </div>
              <p className="text-xs text-stone-500 mt-1">Verified local rating</p>
            </div>

            {/* KPI 4 */}
            <div className="bg-white p-5 sm:p-6 rounded-3xl border border-stone-200/90 shadow-sm relative overflow-hidden group hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-stone-400">Direct Contact</span>
                <div className="w-9 h-9 rounded-xl bg-emerald-50 text-[#103F2B] flex items-center justify-center font-bold">
                  <Phone className="w-4 h-4" />
                </div>
              </div>
              <div className="mt-3 flex items-baseline gap-2">
                <div className="text-lg font-extrabold text-[#103F2B] font-mono">{phoneDisplay}</div>
              </div>
              <p className="text-xs text-stone-500 mt-1">Khushkaran (Direct Line)</p>
            </div>

          </div>

          {/* TAB 1: CUSTOMER LEADS PIPELINE */}
          {activeTab === 'quotes' && (
            <div className="space-y-6">
              
              {/* Filter Toolbar */}
              <div className="bg-white p-4 sm:p-5 rounded-3xl border border-stone-200/90 shadow-sm flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
                
                {/* Search Bar */}
                <div className="relative flex-1">
                  <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search by customer name, phone, suburb, or service..."
                    className="w-full bg-[#F5F3EB] border border-stone-200 rounded-2xl pl-10 pr-4 py-2.5 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#103F2B]/30"
                  />
                </div>

                {/* Filter Pills */}
                <div className="flex flex-wrap items-center gap-2">
                  <div className="flex items-center gap-1 bg-[#F5F3EB] p-1 rounded-2xl border border-stone-200 text-xs">
                    <button
                      onClick={() => setStatusFilter('all')}
                      className={`px-3 py-1.5 rounded-xl font-bold transition-all cursor-pointer ${statusFilter === 'all' ? 'bg-[#103F2B] text-white shadow-xs' : 'text-stone-600 hover:text-stone-900'}`}
                    >
                      All ({quotes.length})
                    </button>
                    <button
                      onClick={() => setStatusFilter('New')}
                      className={`px-3 py-1.5 rounded-xl font-bold transition-all cursor-pointer ${statusFilter === 'New' ? 'bg-amber-600 text-white shadow-xs' : 'text-stone-600 hover:text-stone-900'}`}
                    >
                      New ({newLeadsCount})
                    </button>
                    <button
                      onClick={() => setStatusFilter('Contacted')}
                      className={`px-3 py-1.5 rounded-xl font-bold transition-all cursor-pointer ${statusFilter === 'Contacted' ? 'bg-purple-700 text-white shadow-xs' : 'text-stone-600 hover:text-stone-900'}`}
                    >
                      Contacted ({contactedCount})
                    </button>
                    <button
                      onClick={() => setStatusFilter('Completed')}
                      className={`px-3 py-1.5 rounded-xl font-bold transition-all cursor-pointer ${statusFilter === 'Completed' ? 'bg-emerald-700 text-white shadow-xs' : 'text-stone-600 hover:text-stone-900'}`}
                    >
                      Won ({completedCount})
                    </button>
                  </div>

                  <select
                    value={serviceFilter}
                    onChange={(e) => setServiceFilter(e.target.value)}
                    className="bg-[#F5F3EB] border border-stone-200 rounded-2xl px-3 py-2 text-xs font-semibold focus:outline-none cursor-pointer"
                  >
                    <option value="all">All Services</option>
                    <option value="tiling">Tiling</option>
                    <option value="lawn">Lawn Mowing</option>
                    <option value="design">Landscape Design</option>
                    <option value="ground">Ground Prep</option>
                    <option value="fencing">Fencing</option>
                    <option value="renovation">Renovation</option>
                  </select>
                </div>

              </div>

              {/* Leads Cards Grid */}
              {filteredQuotes.length === 0 ? (
                <div className="bg-white p-16 rounded-3xl border border-stone-200 text-center space-y-3">
                  <div className="w-14 h-14 rounded-2xl bg-[#F5F3EB] text-stone-400 flex items-center justify-center mx-auto">
                    <Search className="w-6 h-6" />
                  </div>
                  <h3 className="text-base font-bold text-stone-700">No leads match your criteria</h3>
                  <p className="text-xs text-stone-500">Try adjusting your search query or status filter.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-5">
                  {filteredQuotes.map((q) => {
                    const status = q.status || 'New';
                    const initials = getInitials(q.fullName);

                    return (
                      <article
                        key={q.id}
                        className="bg-white rounded-3xl border border-stone-200/90 hover:border-[#103F2B]/40 shadow-xs hover:shadow-lg transition-all p-6 sm:p-7 space-y-5"
                      >
                        {/* Top Row: Customer Identity + Status Badge + Actions */}
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                          
                          {/* Customer Avatar & Name */}
                          <div className="flex items-center gap-3.5">
                            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#103F2B] to-[#245C3A] text-white flex items-center justify-center text-sm font-extrabold shadow-sm">
                              {initials}
                            </div>
                            <div>
                              <div className="flex items-center gap-2">
                                <h3 className="text-lg font-extrabold text-[#103F2B] tracking-tight">
                                  {q.fullName}
                                </h3>
                                <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider ${
                                  status === 'Completed'
                                    ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                                    : status === 'Quote Sent'
                                    ? 'bg-blue-100 text-blue-800 border border-blue-300'
                                    : status === 'Contacted'
                                    ? 'bg-purple-100 text-purple-800 border border-purple-300'
                                    : 'bg-amber-100 text-amber-800 border border-amber-300 animate-pulse'
                                }`}>
                                  {status}
                                </span>
                              </div>

                              <div className="flex flex-wrap items-center gap-2.5 text-xs text-stone-500 mt-1">
                                <span className="flex items-center gap-1 font-medium text-stone-700">
                                  <MapPin className="w-3.5 h-3.5 text-[#245C3A]" />
                                  <span>{q.suburbPostcode}</span>
                                </span>
                                <span>·</span>
                                <span className="flex items-center gap-1">
                                  <Clock className="w-3.5 h-3.5 text-stone-400" />
                                  <span>{new Date(q.date).toLocaleString([], { dateStyle: 'medium', timeStyle: 'short' })}</span>
                                </span>
                              </div>
                            </div>
                          </div>

                          {/* Quick Status Dropdown + Delete Button */}
                          <div className="flex items-center gap-2.5 self-end sm:self-center">
                            <div className="flex items-center gap-1.5 bg-[#F5F3EB] px-3 py-1.5 rounded-xl border border-stone-200">
                              <span className="text-[11px] font-bold text-stone-500 uppercase">Stage:</span>
                              <select
                                value={status}
                                onChange={(e) => handleUpdateStatus(q.id, e.target.value as StoredQuote['status'])}
                                className="bg-transparent text-xs font-bold text-[#103F2B] focus:outline-none cursor-pointer"
                              >
                                <option value="New">🟡 New Lead</option>
                                <option value="Contacted">🟣 Contacted</option>
                                <option value="Quote Sent">🔵 Quote Sent</option>
                                <option value="Completed">🟢 Won / Completed</option>
                              </select>
                            </div>

                            <button
                              type="button"
                              onClick={() => handleDeleteQuote(q.id)}
                              className="p-2 rounded-xl text-stone-400 hover:text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                              title="Delete enquiry"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>

                        </div>

                        {/* Project Scope & Service Badge */}
                        <div className="space-y-2">
                          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-emerald-50 text-[#103F2B] border border-emerald-200/60 text-xs font-bold">
                            <Wrench className="w-3.5 h-3.5 text-[#245C3A]" />
                            <span>Requested Scope: {q.serviceRequired}</span>
                          </div>

                          <div className="bg-[#F5F3EB] p-4 rounded-2xl border border-stone-200/80 text-stone-800 text-xs sm:text-sm leading-relaxed">
                            "{q.projectDescription}"
                          </div>
                        </div>

                        {/* Professional Contact Actions Hub */}
                        <div className="pt-2 border-t border-stone-100 flex flex-wrap items-center justify-between gap-3">
                          
                          <div className="flex flex-wrap items-center gap-2.5">
                            {/* Direct Call Button */}
                            <a
                              href={`tel:${q.phoneNumber.replace(/\s+/g, '')}`}
                              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#103F2B] hover:bg-[#18533a] text-white text-xs font-bold shadow-xs transition-all cursor-pointer"
                            >
                              <Phone className="w-3.5 h-3.5 text-[#B8DC61]" />
                              <span>Call {q.phoneNumber}</span>
                            </a>

                            {/* Direct WhatsApp Customer Button */}
                            <a
                              href={`https://wa.me/${q.phoneNumber.replace(/[^0-9]/g, '')}?text=Hi%20${encodeURIComponent(q.fullName)},%20this%20is%20Khushkaran%20from%20Rajasthan%20Renovation%20and%20Landscaping%20Services.%20I%20received%20your%20quote%20request%20for%20${encodeURIComponent(q.serviceRequired)}%20in%20${encodeURIComponent(q.suburbPostcode)}.%20When%20would%20be%20a%20convenient%20time%20to%20discuss%20your%20project?`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#25D366] hover:bg-[#1eb956] text-white text-xs font-bold shadow-xs transition-all cursor-pointer"
                            >
                              <WhatsAppIcon className="w-3.5 h-3.5" />
                              <span>WhatsApp Customer</span>
                            </a>

                            {/* Email Link */}
                            {q.emailAddress && q.emailAddress !== 'Not provided' && (
                              <a
                                href={`mailto:${q.emailAddress}?subject=Regarding%20your%20quote%20request%20-%20Rajasthan%20Renovation&body=Hi%20${encodeURIComponent(q.fullName)},%0A%0AThank%20you%20for%20contacting%20Rajasthan%20Renovation%20and%20Landscaping%20Services%20regarding%20${encodeURIComponent(q.serviceRequired)}.`}
                                className="inline-flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-semibold transition-colors cursor-pointer"
                              >
                                <Mail className="w-3.5 h-3.5" />
                                <span>{q.emailAddress}</span>
                              </a>
                            )}
                          </div>

                          <div className="text-[11px] text-stone-400 font-medium">
                            Lead #{q.id.toString().slice(-4)}
                          </div>

                        </div>

                      </article>
                    );
                  })}
                </div>
              )}

            </div>
          )}

          {/* TAB 2: VERIFIED REVIEWS MANAGEMENT */}
          {activeTab === 'reviews' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* Left Column: Reviews List */}
              <div className="lg:col-span-7 space-y-5">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-xl font-extrabold text-[#103F2B]">Verified Testimonials ({reviews.length})</h3>
                    <p className="text-xs text-stone-500">Live client reviews displayed on public website</p>
                  </div>
                  <div className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-amber-50 border border-amber-200 text-xs font-bold text-amber-900">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    <span>4.9 / 5.0 Average</span>
                  </div>
                </div>

                <div className="space-y-4">
                  {reviews.map((rev) => (
                    <div
                      key={rev.id}
                      className="bg-white p-6 rounded-3xl border border-stone-200/90 shadow-sm space-y-3"
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-extrabold text-base text-[#103F2B]">{rev.author}</div>
                          <div className="text-xs text-stone-500 flex items-center gap-1.5 mt-0.5">
                            <MapPin className="w-3.5 h-3.5 text-[#245C3A]" />
                            <span>{rev.location} · {rev.service}</span>
                          </div>
                        </div>

                        <div className="flex items-center gap-3">
                          <div className="flex text-amber-400">
                            {[...Array(rev.rating)].map((_, i) => (
                              <Star key={i} className="w-4 h-4 fill-amber-400" />
                            ))}
                          </div>
                          <button
                            type="button"
                            onClick={() => handleDeleteReview(rev.id)}
                            className="p-1.5 text-stone-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                            title="Delete review"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      <p className="text-stone-700 text-xs sm:text-sm leading-relaxed bg-[#F5F3EB] p-3.5 rounded-2xl border border-stone-100 italic">
                        "{rev.text}"
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Column: Add New Review */}
              <div className="lg:col-span-5">
                <div className="bg-white p-7 rounded-3xl border border-stone-200/90 shadow-sm space-y-5 sticky top-28">
                  <div className="space-y-1">
                    <h3 className="text-lg font-bold text-[#103F2B] flex items-center gap-2">
                      <Plus className="w-5 h-5 text-[#245C3A]" />
                      <span>Add Verified Review</span>
                    </h3>
                    <p className="text-xs text-stone-500">
                      Add a customer testimonial to publish on your website.
                    </p>
                  </div>

                  <form onSubmit={handleAddReview} className="space-y-4">
                    <div>
                      <label className="block text-xs font-bold text-stone-600 mb-1">Customer Full Name</label>
                      <input
                        type="text"
                        value={newReviewAuthor}
                        onChange={(e) => setNewReviewAuthor(e.target.value)}
                        placeholder="e.g. Robert Smith"
                        required
                        className="w-full bg-[#F5F3EB] border border-stone-200 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#103F2B]/30"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-stone-600 mb-1">Suburb / Location</label>
                      <input
                        type="text"
                        value={newReviewLocation}
                        onChange={(e) => setNewReviewLocation(e.target.value)}
                        placeholder="e.g. Kedron, Brisbane QLD"
                        required
                        className="w-full bg-[#F5F3EB] border border-stone-200 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#103F2B]/30"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-stone-600 mb-1">Service Delivered</label>
                      <select
                        value={newReviewService}
                        onChange={(e) => setNewReviewService(e.target.value)}
                        className="w-full bg-[#F5F3EB] border border-stone-200 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm focus:outline-none cursor-pointer"
                      >
                        <option value="Professional Tiling Services">Professional Tiling Services</option>
                        <option value="Lawn Mowing & Maintenance">Lawn Mowing & Maintenance</option>
                        <option value="Landscape Design">Landscape Design</option>
                        <option value="Ground Preparation & Leveling">Ground Preparation & Leveling</option>
                        <option value="Fencing Services">Fencing Services</option>
                        <option value="Property Renovation Services">Property Renovation Services</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-stone-600 mb-1">Star Rating</label>
                      <div className="flex items-center gap-2">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            key={star}
                            type="button"
                            onClick={() => setNewReviewRating(star)}
                            className="cursor-pointer"
                          >
                            <Star className={`w-5 h-5 ${star <= newReviewRating ? 'text-amber-400 fill-amber-400' : 'text-stone-300'}`} />
                          </button>
                        ))}
                        <span className="text-xs font-bold text-stone-700 ml-2">{newReviewRating} Stars</span>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-stone-600 mb-1">Review Description</label>
                      <textarea
                        value={newReviewText}
                        onChange={(e) => setNewReviewText(e.target.value)}
                        placeholder="Write genuine customer feedback..."
                        rows={3}
                        required
                        className="w-full bg-[#F5F3EB] border border-stone-200 rounded-xl p-3 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#103F2B]/30"
                      />
                    </div>

                    {reviewSuccess && (
                      <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-900 text-xs flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-[#245C3A]" />
                        <span>Review published to website!</span>
                      </div>
                    )}

                    <button
                      type="submit"
                      className="w-full py-3.5 rounded-2xl bg-[#103F2B] hover:bg-[#18533a] text-white font-bold text-xs sm:text-sm shadow-md transition-all cursor-pointer flex items-center justify-center gap-2"
                    >
                      <Plus className="w-4 h-4 text-[#B8DC61]" />
                      <span>Publish Customer Review</span>
                    </button>
                  </form>
                </div>
              </div>

            </div>
          )}

          {/* TAB 3: BUSINESS SETTINGS */}
          {activeTab === 'settings' && (
            <div className="max-w-2xl space-y-6">
              
              {/* Website Power Control Card (Turn Site ON / OFF) */}
              <div className="bg-white p-7 sm:p-8 rounded-3xl border border-stone-200/90 shadow-sm space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <Power className={`w-5 h-5 ${siteStatus === 'online' ? 'text-emerald-600' : 'text-rose-600'}`} />
                      <h3 className="text-lg font-extrabold text-[#103F2B]">Website Live Power Switch</h3>
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wide ${
                        siteStatus === 'online' 
                          ? 'bg-emerald-100 text-emerald-800 border border-emerald-200' 
                          : 'bg-rose-100 text-rose-800 border border-rose-200'
                      }`}>
                        {siteStatus === 'online' ? '● Online & Accepting Quotes' : '● Offline (Maintenance Mode)'}
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                      Turn your public website <strong>OFF</strong> into Maintenance Mode during holidays, heavy rain periods, or when fully booked. Public visitors will see a sleek branded notice with Khushkaran's direct phone and WhatsApp contact. You can always access this admin panel at <code className="bg-stone-100 px-1.5 py-0.5 rounded text-[#103F2B] font-mono text-xs">localhost:3000/#admin</code> to turn it back ON.
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={handleToggleSiteStatus}
                    className={`py-3.5 px-6 rounded-2xl text-xs sm:text-sm font-extrabold shadow-md transition-all flex items-center justify-center gap-2 shrink-0 cursor-pointer ${
                      siteStatus === 'online'
                        ? 'bg-rose-600 hover:bg-rose-700 text-white'
                        : 'bg-[#103F2B] hover:bg-[#18533a] text-[#B8DC61]'
                    }`}
                  >
                    <Power className="w-4 h-4" />
                    <span>{siteStatus === 'online' ? 'Turn Website OFF' : 'Turn Website ON (Go Live)'}</span>
                  </button>
                </div>
              </div>

              {/* Business Identity & Contact Information Form */}
              <div className="bg-white p-7 sm:p-9 rounded-3xl border border-stone-200/90 shadow-sm space-y-6">
              <div className="space-y-1">
                <h3 className="text-xl font-extrabold text-[#103F2B]">Business Identity &amp; Contact Information</h3>
                <p className="text-xs sm:text-sm text-stone-500">
                  Update primary phone, email, and service areas across your local website.
                </p>
              </div>

              <form onSubmit={handleSaveSettings} className="space-y-5">
                <div>
                  <label className="block text-xs font-bold text-stone-600 mb-1.5">Business Owner / Representative</label>
                  <input
                    type="text"
                    value={contactName}
                    onChange={(e) => setContactName(e.target.value)}
                    required
                    className="w-full bg-[#F5F3EB] border border-stone-200 rounded-2xl px-4 py-3 text-sm font-bold text-[#103F2B] focus:outline-none focus:ring-2 focus:ring-[#103F2B]/30"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-600 mb-1.5">Direct Phone Line (Verified)</label>
                  <input
                    type="text"
                    value={phoneDisplay}
                    onChange={(e) => setPhoneDisplay(e.target.value)}
                    required
                    className="w-full bg-[#F5F3EB] border border-stone-200 rounded-2xl px-4 py-3 text-sm font-mono font-bold text-[#103F2B] focus:outline-none focus:ring-2 focus:ring-[#103F2B]/30"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-600 mb-1.5">Email Address</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full bg-[#F5F3EB] border border-stone-200 rounded-2xl px-4 py-3 text-sm text-[#103F2B] focus:outline-none focus:ring-2 focus:ring-[#103F2B]/30"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-600 mb-1.5">Service Coverage Areas</label>
                  <input
                    type="text"
                    value={serviceArea}
                    onChange={(e) => setServiceArea(e.target.value)}
                    required
                    className="w-full bg-[#F5F3EB] border border-stone-200 rounded-2xl px-4 py-3 text-sm text-[#103F2B] focus:outline-none focus:ring-2 focus:ring-[#103F2B]/30"
                  />
                </div>

                {settingsSaved && (
                  <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-900 text-xs flex items-center gap-2 animate-fade-in">
                    <CheckCircle2 className="w-4 h-4 text-[#245C3A]" />
                    <span>Settings updated successfully!</span>
                  </div>
                )}

                <button
                  type="submit"
                  className="py-3.5 px-7 rounded-2xl bg-[#103F2B] hover:bg-[#18533a] text-white font-bold text-sm shadow-md transition-all cursor-pointer flex items-center gap-2"
                >
                  <Save className="w-4 h-4 text-[#B8DC61]" />
                  <span>Save Business Details</span>
                </button>
              </form>
              </div>
            </div>
          )}

        </main>

      </div>

    </div>
  );
};
