import { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Services } from './components/Services';
import { WhyChooseUs } from './components/WhyChooseUs';
import { Gallery } from './components/Gallery';
import { ProcessSection } from './components/ProcessSection';
import { ReviewsSection } from './components/ReviewsSection';
import { About } from './components/About';
import { QuoteSection } from './components/QuoteSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { MobileStickyBar } from './components/MobileStickyBar';
import { AdminPanel } from './components/AdminPanel';
import { MaintenanceMode } from './components/MaintenanceMode';

export default function App() {
  const [selectedServiceForQuote, setSelectedServiceForQuote] = useState<string>('');

  const checkIsAdmin = (): boolean => {
    if (typeof window === 'undefined') return false;
    const path = window.location.pathname.toLowerCase().replace(/\/$/, '');
    const hash = window.location.hash.toLowerCase();
    return hash === '#admin' || path === '/admin' || path.endsWith('/admin');
  };

  const [isAdminView, setIsAdminView] = useState<boolean>(checkIsAdmin);
  const [siteStatus, setSiteStatus] = useState<'online' | 'offline'>(() => {
    try {
      const saved = localStorage.getItem('raj_site_status');
      return saved === 'offline' ? 'offline' : 'online';
    } catch {
      return 'online';
    }
  });

  useEffect(() => {
    const handleRouteCheck = () => {
      setIsAdminView(checkIsAdmin());
    };
    window.addEventListener('hashchange', handleRouteCheck);
    window.addEventListener('popstate', handleRouteCheck);
    return () => {
      window.removeEventListener('hashchange', handleRouteCheck);
      window.removeEventListener('popstate', handleRouteCheck);
    };
  }, []);

  const handleSelectService = (serviceTitle: string) => {
    setSelectedServiceForQuote(serviceTitle);
  };

  const handleOpenAdmin = () => {
    try {
      window.history.pushState(null, '', '/admin');
    } catch {}
    window.location.hash = '#admin';
    setIsAdminView(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToSite = () => {
    try {
      window.history.pushState(null, '', '/');
    } catch {}
    window.location.hash = '';
    setIsAdminView(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleToggleSiteStatus = (newStatus: 'online' | 'offline') => {
    setSiteStatus(newStatus);
    try {
      localStorage.setItem('raj_site_status', newStatus);
    } catch (e) {
      console.error(e);
    }
  };

  if (isAdminView) {
    return (
      <AdminPanel 
        onBackToSite={handleBackToSite} 
        siteStatus={siteStatus} 
        onToggleSiteStatus={handleToggleSiteStatus} 
      />
    );
  }

  // If site is turned offline by admin, show luxury Maintenance Mode screen to visitors
  if (siteStatus === 'offline') {
    return <MaintenanceMode onOpenAdmin={handleOpenAdmin} />;
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#F5F3EB] text-[#242824] font-sans antialiased pb-16 sm:pb-0">
      {/* Sticky Navigation */}
      <Navbar onOpenAdmin={handleOpenAdmin} />

      {/* Main Content Flow */}
      <main className="flex-1">
        <Hero />
        <Services onSelectServiceForEnquiry={handleSelectService} />
        <WhyChooseUs />
        <Gallery onSelectServiceForEnquiry={handleSelectService} />
        <ProcessSection />
        <ReviewsSection />
        <About />
        <QuoteSection preselectedService={selectedServiceForQuote} />
        <ContactSection />
      </main>

      {/* Footer with Admin Portal Access */}
      <Footer onOpenAdmin={handleOpenAdmin} />

      {/* Mobile Sticky Bar */}
      <MobileStickyBar />
    </div>
  );
}
